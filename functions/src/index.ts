import { onCall, onRequest, HttpsError } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import { SYSTEM_PROMPT } from "./prompt";

if (!admin.apps.length) {
  admin.initializeApp();
}

const dbAdmin = admin.firestore();

// ==================== PII STRIPPER ====================
// Strips sensitive data before sending to DeepSeek (China-hosted LLM)
const stripPII = (text: string): string => {
  if (!text) return text;
  return text
    .replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, '[EMAIL]')
    .replace(/(\+27|0)[6-8][0-9]{8}/g, '[PHONE]')
    .replace(/\b\d{13}\b/g, '[ID_NUMBER]')
    .replace(/\b\d{10,11}\b/g, '[TAX_NUMBER]');
};

// ==================== RATE LIMITER ====================
// Prevents API abuse and Denial-of-Wallet attacks
const checkRateLimit = async (identifier: string): Promise<boolean> => {
  const ref = dbAdmin.collection('rate_limits').doc(identifier);
  const now = admin.firestore.Timestamp.now();
  
  try {
    const doc = await ref.get();

    if (!doc.exists) {
      await ref.set({ count: 1, windowStart: now });
      return true;
    }

    const data = doc.data() || {};
    const windowStart = data.windowStart?.toDate ? data.windowStart.toDate() : now.toDate();
    const diffMinutes = (now.toDate().getTime() - windowStart.getTime()) / 60000;

    // Reset window after 1 hour
    if (diffMinutes > 60) {
      await ref.set({ count: 1, windowStart: now });
      return true;
    }

    // Max 30 requests per hour per user/IP
    if ((data.count || 0) >= 30) {
      return false;
    }

    await ref.update({ count: admin.firestore.FieldValue.increment(1) });
    return true;
  } catch (error) {
    console.error("Rate limiter error:", error);
    // Fail open if rate limiter breaks (don't block legitimate users)
    return true;
  }
};

// ==================== META WHATSAPP ====================
const sendMetaMessage = async (toNumber: string, text: string) => {
  const WHATSAPP_TOKEN = (process.env.WHATSAPP_TOKEN || "").trim();
  const PHONE_NUMBER_ID = (process.env.PHONE_NUMBER_ID || "").trim();

  if (!WHATSAPP_TOKEN || !PHONE_NUMBER_ID) {
    console.error("Meta credentials missing in server environment variables.");
    return;
  }

  await fetch(`https://graph.facebook.com/v21.0/${PHONE_NUMBER_ID}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${WHATSAPP_TOKEN}`
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: toNumber,
      type: "text",
      text: { preview_url: true, body: text }
    })
  });
};

// ==================== DEEPSEEK API (PII-SAFE) ====================
const callDeepSeek = async (messages: any[]) => {
  const DEEPSEEK_API_KEY = (process.env.DEEPSEEK_API_KEY || "").trim();
  
  // SECURITY FIX: Strip PII from ALL messages before sending to DeepSeek
  const sanitizedMessages = messages.map(m => ({
    ...m,
    content: stripPII(m.content || m.text || "")
  }));

  const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${DEEPSEEK_API_KEY}`
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: sanitizedMessages,
      temperature: 0.2,
      max_tokens: 450
    })
  });

  if (!response.ok) return "PROTOCOL INTERRUPTED: DeepSeek connection failed.";
  const data = await response.json() as any;
  return data?.choices?.[0]?.message?.content || "";
};

// ==================== WEBSITE CHAT ====================
export const websiteChat = onCall({
  region: "us-central1",
  cors: true,
  secrets: ["DEEPSEEK_API_KEY"],
}, async (request) => {
  const message = request.data.message;
  const history = request.data.history;
  const uid = request.auth?.uid || 'anonymous';
  
  if (!message) throw new HttpsError("invalid-argument", "Message is required.");

  // Rate limit: 30 requests/hour per user
  const allowed = await checkRateLimit(`chat_${uid}`);
  if (!allowed) {
    throw new HttpsError("resource-exhausted", "Rate limit exceeded. Please try again later.");
  }

  try {
    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...(history || []).map((m: any) => ({
        role: (m.role === "model" || m.role === "bot" || m.role === "assistant") ? "assistant" : "user",
        content: m.text || m.content
      })),
      { role: "user", content: message }
    ];

    const reply = await callDeepSeek(messages);
    
    // Audit log (sanitized only)
    await dbAdmin.collection('ai_audit_logs').add({
      uid: request.auth?.uid || 'anonymous',
      sanitizedPreview: stripPII(message).substring(0, 200),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    return { reply: reply.trim() };
  } catch (error: any) {
    throw new HttpsError("internal", error.message || "An unexpected error occurred.");
  }
});

// ==================== WHATSAPP WEBHOOK ====================
export const whatsappWebhook = onRequest({
  region: "us-central1",
  secrets: ["DEEPSEEK_API_KEY", "WHATSAPP_TOKEN", "PHONE_NUMBER_ID", "WHATSAPP_VERIFY_TOKEN", "ADMIN_PHONE_NUMBER"],
}, async (request, response) => {
  if (request.method === "GET") {
    const mode = request.query["hub.mode"];
    const token = request.query["hub.verify_token"];
    const challenge = request.query["hub.challenge"];
    const VERIFY_TOKEN = (process.env.WHATSAPP_VERIFY_TOKEN || "").trim();

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      response.status(200).send(challenge);
      return;
    }
    response.status(403).end();
    return;
  }

  const entry = request.body.entry?.[0];
  const changes = entry?.changes?.[0];
  const value = changes?.value;
  const message = value?.messages?.[0];
  const contact = value?.contacts?.[0];

  if (!message) {
    response.status(200).end();
    return;
  }

  const fromNumber = message.from;
  const userMessage = (message.text?.body || "").trim();
  const senderName = contact?.profile?.name || "Client";

  // Rate limit: 30 messages/hour per phone number
  const allowed = await checkRateLimit(`wa_${fromNumber}`);
  if (!allowed) {
    await sendMetaMessage(fromNumber, "You have sent too many messages. Please wait before trying again.");
    response.status(429).end();
    return;
  }

  try {
    const claimsSnapshot = await dbAdmin.collection("verified_claims").get();
    let matchedClaim: any = null;
    for (const doc of claimsSnapshot.docs) {
      const data = doc.data();
      const keywords = data.keywords || [];
      if (keywords.some((k: string) => userMessage.toLowerCase().includes(k.toLowerCase()))) {
        matchedClaim = data;
        break;
      }
    }

    if (matchedClaim && matchedClaim.isHighIntent) {
      await dbAdmin.collection("prospects").add({
        phone: fromNumber,
        name: senderName,
        interest: matchedClaim.title || userMessage,
        timestamp: admin.firestore.FieldValue.serverTimestamp()
      });
      const adminPhone = (process.env.ADMIN_PHONE_NUMBER || "").trim();
      if (adminPhone) {
        await sendMetaMessage(adminPhone, `ALERT: High-intent lead engaged.\nName: ${senderName}\nPhone: ${fromNumber}\nQuery: ${stripPII(userMessage)}`);
      }
    }

    let matchedReply = "";
    if (matchedClaim) {
      matchedReply = matchedClaim.response;
    } else {
      const sessionRef = dbAdmin.collection("whatsapp_sessions").doc(fromNumber).collection("messages");
      const historySnapshot = await sessionRef.orderBy("timestamp", "desc").limit(10).get();
      const history = historySnapshot.docs.map(doc => doc.data()).reverse();

      const messages = [
        { role: "system", content: SYSTEM_PROMPT },
        ...history.map((h: any) => ({ role: h.role, content: h.content })),
        { role: "user", content: userMessage }
      ];

      const replyText = await callDeepSeek(messages);
      matchedReply = replyText;

      const timestampObj = admin.firestore.FieldValue.serverTimestamp();
      // Store sanitized versions only in session history
      await sessionRef.add({ role: "user", content: stripPII(userMessage), timestamp: timestampObj });
      await sessionRef.add({ role: "assistant", content: replyText, timestamp: timestampObj });
    }

    await send

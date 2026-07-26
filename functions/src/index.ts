import { onCall, onRequest, HttpsError } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import { SYSTEM_PROMPT } from "./prompt";

if (!admin.apps.length) {
  admin.initializeApp();
}

const dbAdmin = admin.firestore();

// ========================
// PII STRIPPER
// ========================
const stripPII = (text: string): string => {
  if (!text) return "";
  return text
    .replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, "[EMAIL]")
    .replace(/(\+27|0)[6-8][0-9]{8}/g, "[PHONE]")
    .replace(/\b\d{13}\b/g, "[ID_NUMBER]")
    .replace(/\b\d{10,11}\b/g, "[TAX_NUMBER]");
};

// ========================
// RATE LIMITER
// ========================
interface RateLimitData {
  count: number;
  windowStart: admin.firestore.Timestamp;
}

const checkRateLimit = async (
  uid: string | undefined,
  ip: string
): Promise<boolean> => {
  const docId = uid || ip.replace(/\./g, "_");
  const ref = dbAdmin.collection("rate_limits").doc(docId);
  const now = admin.firestore.Timestamp.now();

  const doc = await ref.get();
  if (!doc.exists) {
    await ref.set({ count: 1, windowStart: now });
    return true;
  }

  const data = doc.data() as RateLimitData;
  const windowStart = data.windowStart.toDate();
  const diffMinutes = (now.toDate().getTime() - windowStart.getTime()) / 60000;

  if (diffMinutes > 60) {
    await ref.set({ count: 1, windowStart: now });
    return true;
  }

  if (data.count >= 30) {
    return false;
  }

  await ref.update({ count: admin.firestore.FieldValue.increment(1) });
  return true;
};

// ========================
// META WHATSAPP HELPER
// ========================
const sendMetaMessage = async (toNumber: string, text: string): Promise<void> => {
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

// ========================
// DEEPSEEK API CALL (SANITIZED)
// ========================
interface ChatMessage {
  role: string;
  content: string;
}

const callDeepSeek = async (messages: ChatMessage[]): Promise<string> => {
  const DEEPSEEK_API_KEY = (process.env.DEEPSEEK_API_KEY || "").trim();

  const sanitizedMessages = messages.map((m) => ({
    role: m.role,
    content: stripPII(m.content || ""),
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
  const data = await response.json() as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  return data?.choices?.[0]?.message?.content || "";
};

// ========================
// WEBSITE CHAT (SECURED)
// ========================
// NOTE: No "secrets" config — uses process.env to avoid Secret Manager billing requirement
export const websiteChat = onCall({
  region: "us-central1",
  cors: true,
}, async (request) => {
  const message = request.data.message as string;
  const history = request.data.history as Array<{ role: string; text?: string; content?: string }> | undefined;
  const uid = request.auth?.uid;
  const ip = request.rawRequest.ip || "unknown";

  if (!message) throw new HttpsError("invalid-argument", "Message is required.");

  const allowed = await checkRateLimit(uid, ip);
  if (!allowed) {
    throw new HttpsError("resource-exhausted", "Rate limit exceeded. Please try again later.");
  }

  try {
    const messages: ChatMessage[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...(history || []).map((m) => ({
        role: (m.role === "model" || m.role === "bot" || m.role === "assistant") ? "assistant" : "user",
        content: m.text || m.content || ""
      })),
      { role: "user", content: message }
    ];

    const reply = await callDeepSeek(messages);

    await dbAdmin.collection("ai_audit_logs").add({
      uid: uid || "anonymous",
      ip: ip,
      sanitizedPreview: stripPII(message).substring(0, 200),
      replyPreview: stripPII(reply).substring(0, 200),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    return { reply: reply.trim() };
  } catch (error: any) {
    throw new HttpsError("internal", error.message || "An unexpected error occurred.");
  }
});

// ========================
// WHATSAPP WEBHOOK
// ========================
// NOTE: No "secrets" config — uses process.env to avoid Secret Manager billing requirement
export const whatsappWebhook = onRequest({
  region: "us-central1",
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

  const fromNumber = message.from as string;
  const userMessage = (message.text?.body || "").trim();
  const senderName = contact?.profile?.name || "Client";

  try {
    const claimsSnapshot = await dbAdmin.collection("verified_claims").get();
    let matchedClaim: admin.firestore.DocumentData | null = null;
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
        await sendMetaMessage(adminPhone, `ALERT: High-intent lead engaged.\nName: ${senderName}\nPhone: ${fromNumber}\nQuery: ${userMessage}`);
      }
    }

    let matchedReply = "";
    if (matchedClaim) {
      matchedReply = matchedClaim.response;
    } else {
      const sessionRef = dbAdmin.collection("whatsapp_sessions").doc(fromNumber).collection("messages");
      const historySnapshot = await sessionRef.orderBy("timestamp", "desc").limit(10).get();
      const history = historySnapshot.docs.map((d) => d.data() as admin.firestore.DocumentData).reverse();

      const messages: ChatMessage[] = [
        { role: "system", content: SYSTEM_PROMPT },
        ...history.map((h) => ({ role: h.role as string, content: h.content as string })),
        { role: "user", content: userMessage }
      ];

      const replyText = await callDeepSeek(messages);
      matchedReply = replyText;

      const timestampObj = admin.firestore.FieldValue.serverTimestamp();
      await sessionRef.add({ role: "user", content: userMessage, timestamp: timestampObj });
      await sessionRef.add({ role: "assistant", content: replyText, timestamp: timestampObj });
    }

    await sendMetaMessage(fromNumber, matchedReply);
    response.status(200).end();
  } catch (error) {
    console.error("Meta WhatsApp Webhook Execution Error:", error);
    response.status(500).end();
  }
});

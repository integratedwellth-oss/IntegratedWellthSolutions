import { onCall, onRequest, HttpsError } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import * as crypto from "crypto";
import { SYSTEM_PROMPT } from "./prompt";

interface ChatMessage {
  role: string;
  content: string;
}

if (!admin.apps.length) {
  admin.initializeApp();
}

const dbAdmin = admin.firestore();

const stripPII = (text: string): string => {
  if (!text) return "";
  return text
    .replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, "[EMAIL]")
    .replace(/(\+27|0)[6-8][0-9]{8}/g, "[PHONE]")
    .replace(/\b\d{13}\b/g, "[ID_NUMBER]")
    .replace(/\b\d{10,11}\b/g, "[TAX_NUMBER]");
};

interface RateLimitData {
  count: number;
  windowStart: admin.firestore.Timestamp;
}

const sanitizeDocId = (id: string): string => {
  // Firestore doc IDs cannot contain / and cannot be . or ..
  return id.replace(/[./:#\[\]]/g, "_").substring(0, 1500);
};

const checkRateLimit = async (uid: string | undefined, ip: string): Promise<boolean> => {
  const docId = sanitizeDocId(uid || ip);
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
  if (data.count >= 30) return false;
  await ref.update({ count: admin.firestore.FieldValue.increment(1) });
  return true;
};

const sendMetaMessage = async (toNumber: string, text: string): Promise<void> => {
  const WHATSAPP_TOKEN = (process.env.WHATSAPP_TOKEN || "").trim();
  const PHONE_NUMBER_ID = (process.env.PHONE_NUMBER_ID || "").trim();
  if (!WHATSAPP_TOKEN || !PHONE_NUMBER_ID) {
    console.error("Meta credentials missing.");
    return;
  }
  await fetch(`https://graph.facebook.com/v21.0/${PHONE_NUMBER_ID}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${WHATSAPP_TOKEN}` },
    body: JSON.stringify({ messaging_product: "whatsapp", recipient_type: "individual", to: toNumber, type: "text", text: { preview_url: false, body: text } })
  });
};

const callDeepSeek = async (messages: ChatMessage[]): Promise<string> => {
  const DEEPSEEK_API_KEY = (process.env.DEEPSEEK_API_KEY || "").trim();
  const sanitizedMessages = messages.map((m) => ({ role: m.role, content: stripPII(m.content || "") }));
  const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${DEEPSEEK_API_KEY}` },
    body: JSON.stringify({ model: "deepseek-chat", messages: sanitizedMessages, temperature: 0.2, max_tokens: 450 })
  });
  if (!response.ok) return "PROTOCOL INTERRUPTED: DeepSeek connection failed.";
  const data = await response.json() as { choices?: Array<{ message?: { content?: string } }> };
  return data?.choices?.[0]?.message?.content || "";
};

// SECURITY FIX: Verify Meta webhook signature using APP_SECRET
const verifyMetaSignature = (body: string, signature: string | undefined, appSecret: string): boolean => {
  if (!signature || !appSecret) return false;
  const expected = crypto.createHmac('sha256', appSecret).update(body, 'utf8').digest('hex');
  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature.replace('sha256=', '')),
      Buffer.from(expected)
    );
  } catch {
    return false;
  }
};

// SECURITY FIX: cors: false — Firebase Hosting rewrite handles same-origin calls
export const websiteChat = onCall({ region: "us-central1", cors: false }, async (request) => {
  const message = request.data.message as string;
  const history = request.data.history as Array<{ role: string; text?: string; content?: string }> | undefined;
  const uid = request.auth?.uid;
  const ip = request.rawRequest.ip || "unknown";
  
  if (!message) throw new HttpsError("invalid-argument", "Message is required.");
  if (message.length > 2000) throw new HttpsError("invalid-argument", "Message exceeds maximum length of 2000 characters.");
  
  const allowed = await checkRateLimit(uid, ip);
  if (!allowed) throw new HttpsError("resource-exhausted", "Rate limit exceeded. Please try again later.");
  
  try {
    const messages: ChatMessage[] = [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: message }
    ];
    const reply = await callDeepSeek(messages);
    await dbAdmin.collection("ai_audit_logs").add({ 
      uid: uid || "anonymous", 
      ip, 
      sanitizedPreview: stripPII(message).substring(0, 200), 
      replyPreview: stripPII(reply).substring(0, 200), 
      timestamp: admin.firestore.FieldValue.serverTimestamp() 
    });
    return { reply: reply.trim() };
  } catch (error: any) {
    throw new HttpsError("internal", error.message || "An unexpected error occurred.");
  }
});

export const whatsappWebhook = onRequest({ region: "us-central1" }, async (request, response) => {
  const ip = request.ip || "unknown";
  
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
  
  // SECURITY FIX: Rate limit webhook by IP (prevents endpoint flooding)
  const webhookAllowed = await checkRateLimit(undefined, ip);
  if (!webhookAllowed) {
    console.warn("Webhook rate limit exceeded for IP:", ip);
    response.status(429).end();
    return;
  }
  
  // SECURITY FIX: Verify Meta webhook signature for POST requests
  if (request.method === "POST") {
    const signature = request.get('X-Hub-Signature-256');
    const APP_SECRET = (process.env.META_APP_SECRET || "").trim();
    const rawBody = request.rawBody?.toString('utf8') || '';
    if (!verifyMetaSignature(rawBody, signature, APP_SECRET)) {
      console.warn('Invalid webhook signature from IP:', ip);
      response.status(403).end();
      return;
    }
  }
  
  const entry = request.body.entry?.[0];
  const changes = entry?.changes?.[0];
  const value = changes?.value;
  const message = value?.messages?.[0];
  const contact = value?.contacts?.[0];
  if (!message) { response.status(200).end(); return; }
  
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
      if (adminPhone) await sendMetaMessage(adminPhone, `ALERT: High-intent lead engaged.\nName: ${senderName}\nPhone: ${fromNumber}\nQuery: ${userMessage}`);
    }
    let matchedReply = "";
    if (matchedClaim) {
      matchedReply = matchedClaim.response;
    } else {
      const sessionRef = dbAdmin.collection("whatsapp_sessions").doc(fromNumber).collection("messages");
      const historySnapshot = await sessionRef.orderBy("timestamp", "desc").limit(10).get();
      const history = historySnapshot.docs.map((d) => d.data()).reverse();
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

export * from "./monitoring";

import { onCall, onRequest, HttpsError } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import { SYSTEM_PROMPT } from "./prompt";

if (!admin.apps.length) {
  admin.initializeApp();
}

const dbAdmin = admin.firestore();

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

const callDeepSeek = async (messages: any[]) => {
  const DEEPSEEK_API_KEY = (process.env.DEEPSEEK_API_KEY || "").trim();
  const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${DEEPSEEK_API_KEY}`
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages,
      temperature: 0.2,
      max_tokens: 450
    })
  });

  if (!response.ok) return "PROTOCOL INTERRUPTED: DeepSeek connection failed.";
  const data = await response.json() as any;
  return data?.choices?.[0]?.message?.content || "";
};

export const websiteChat = onCall({
  region: "us-central1",
  cors: true,
  secrets: ["DEEPSEEK_API_KEY"],
}, async (request) => {
  const message = request.data.message;
  const history = request.data.history;

  if (!message) throw new HttpsError("invalid-argument", "Message is required.");

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
    return { reply: reply.trim() };
  } catch (error: any) {
    throw new HttpsError("internal", error.message || "An unexpected error occurred.");
  }
});

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
        await sendMetaMessage(adminPhone, `ALERT: High-intent lead engaged.\nName: ${senderName}\nPhone: ${fromNumber}\nQuery: ${userMessage}`);
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

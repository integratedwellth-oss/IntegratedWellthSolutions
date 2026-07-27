"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.whatsappWebhook = exports.websiteChat = void 0;
const https_1 = require("firebase-functions/v2/https");
const admin = __importStar(require("firebase-admin"));
const prompt_1 = require("./prompt");
if (!admin.apps.length) {
    admin.initializeApp();
}
const dbAdmin = admin.firestore();
const sendMetaMessage = async (toNumber, text) => {
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
const callDeepSeek = async (messages) => {
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
    if (!response.ok)
        return "PROTOCOL INTERRUPTED: DeepSeek connection failed.";
    const data = await response.json();
    return data?.choices?.[0]?.message?.content || "";
};
exports.websiteChat = (0, https_1.onCall)({
    region: "us-central1",
    cors: true,
    secrets: ["DEEPSEEK_API_KEY"],
}, async (request) => {
    const message = request.data.message;
    const history = request.data.history;
    if (!message)
        throw new https_1.HttpsError("invalid-argument", "Message is required.");
    try {
        const messages = [
            { role: "system", content: prompt_1.SYSTEM_PROMPT },
            ...(history || []).map((m) => ({
                role: (m.role === "model" || m.role === "bot" || m.role === "assistant") ? "assistant" : "user",
                content: m.text || m.content
            })),
            { role: "user", content: message }
        ];
        const reply = await callDeepSeek(messages);
        return { reply: reply.trim() };
    }
    catch (error) {
        throw new https_1.HttpsError("internal", error.message || "An unexpected error occurred.");
    }
});
exports.whatsappWebhook = (0, https_1.onRequest)({
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
        let matchedClaim = null;
        for (const doc of claimsSnapshot.docs) {
            const data = doc.data();
            const keywords = data.keywords || [];
            if (keywords.some((k) => userMessage.toLowerCase().includes(k.toLowerCase()))) {
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
        }
        else {
            const sessionRef = dbAdmin.collection("whatsapp_sessions").doc(fromNumber).collection("messages");
            const historySnapshot = await sessionRef.orderBy("timestamp", "desc").limit(10).get();
            const history = historySnapshot.docs.map(doc => doc.data()).reverse();
            const messages = [
                { role: "system", content: prompt_1.SYSTEM_PROMPT },
                ...history.map((h) => ({ role: h.role, content: h.content })),
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
    }
    catch (error) {
        console.error("Meta WhatsApp Webhook Execution Error:", error);
        response.status(500).end();
    }
});
//# sourceMappingURL=index.js.map
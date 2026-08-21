import { SYSTEM_PROMPT } from "./prompt";

export interface ExecutionContext {
  waitUntil(promise: Promise<any>): void;
  passThroughOnException?(): void;
}

export interface Env {
  WHATSAPP_VERIFY_TOKEN: string;
  META_APP_SECRET?: string;
  WHATSAPP_TOKEN: string;
  WHATSAPP_PHONE_NUMBER_ID: string;
  GEMINI_API_KEY?: string;
  DEEPSEEK_API_KEY?: string;
  ADMIN_WHATSAPP_NUMBER?: string;
}

// ─── HMAC-SHA256 Signature Verification via Web Crypto API ───
async function verifyMetaSignature(rawBody: string, signatureHeader: string | null, appSecret?: string): Promise<boolean> {
  if (!appSecret || !signatureHeader) return true; // allow if secret is not set yet
  const parts = signatureHeader.split("=");
  if (parts.length !== 2 || parts[0] !== "sha256") return false;
  const expectedHash = parts[1];

  try {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(appSecret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(rawBody));
    const hashHex = Array.from(new Uint8Array(signature))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex.toLowerCase() === expectedHash.toLowerCase();
  } catch (err) {
    console.error("Signature verification error:", err);
    return false;
  }
}

// ─── Meta Graph API Sender ───
async function sendMetaMessage(env: Env, toNumber: string, text: string): Promise<void> {
  const token = env.WHATSAPP_TOKEN;
  const phoneId = env.WHATSAPP_PHONE_NUMBER_ID;
  if (!token || !phoneId) {
    console.error("Missing WHATSAPP_TOKEN or WHATSAPP_PHONE_NUMBER_ID");
    return;
  }

  const res = await fetch(`https://graph.facebook.com/v21.0/${phoneId}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: toNumber,
      type: "text",
      text: { preview_url: false, body: text }
    })
  });

  if (!res.ok) {
    console.error("Failed to send WhatsApp message:", await res.text());
  }
}

// ─── AI Generation via Gemini / DeepSeek ───
async function generateAIResponse(env: Env, userMessage: string, senderName: string): Promise<string> {
  const geminiKey = env.GEMINI_API_KEY;
  const deepseekKey = env.DEEPSEEK_API_KEY;

  if (geminiKey) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  { text: SYSTEM_PROMPT },
                  { text: `The user's name is ${senderName}. User says: "${userMessage}"` }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.4,
              maxOutputTokens: 800
            }
          })
        }
      );

      if (response.ok) {
        const data: any = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text.trim();
      }
    } catch (e) {
      console.error("Gemini call failed:", e);
    }
  }

  if (deepseekKey) {
    try {
      const response = await fetch("https://api.deepseek.com/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${deepseekKey}`
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: `User name: ${senderName}. Query: ${userMessage}` }
          ],
          temperature: 0.4,
          max_tokens: 800
        })
      });

      if (response.ok) {
        const data: any = await response.json();
        const text = data.choices?.[0]?.message?.content;
        if (text) return text.trim();
      }
    } catch (e) {
      console.error("DeepSeek call failed:", e);
    }
  }

  // Fallback if AI keys are not configured yet
  return `Hello ${senderName}! Thank you for contacting Integrated Wellth Solutions (IWS).\n\nWe specialize in accounting, tax compliance (SARS/CIPC), and executive coaching.\n\nTo schedule a 30-minute discovery call directly with Marcia Kgaphola, please visit:\nhttps://calendly.com/marcia-kgaphola/new-meeting\n\nOr explore our services at https://integratedwellth.co.za`;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // ─── Meta Webhook Verification (GET) ───
    if (request.method === "GET") {
      const mode = url.searchParams.get("hub.mode");
      const token = url.searchParams.get("hub.verify_token");
      const challenge = url.searchParams.get("hub.challenge");

      if (mode === "subscribe") {
        const expectedToken = (env.WHATSAPP_VERIFY_TOKEN || "IntegratedWellth_Secure_Token_2026!").trim();
        if (token === expectedToken) {
          return new Response(challenge, {
            status: 200,
            headers: { "Content-Type": "text/plain" }
          });
        }
        return new Response("Forbidden: Invalid Token", { status: 403 });
      }

      // Plain browser visit / Health Check
      return new Response("IWS WhatsApp Bot Worker is active.", { status: 200 });
    }

    // ─── Meta Webhook Event Handler (POST) ───
    if (request.method === "POST") {
      const signature = request.headers.get("X-Hub-Signature-256");
      const rawBody = await request.text();

      if (env.META_APP_SECRET && !await verifyMetaSignature(rawBody, signature, env.META_APP_SECRET)) {
        console.warn("Invalid signature received");
        return new Response("Invalid Signature", { status: 403 });
      }

      let payload: any;
      try {
        payload = JSON.parse(rawBody);
      } catch {
        return new Response("Bad JSON", { status: 400 });
      }

      const entry = payload.entry?.[0];
      const changes = entry?.changes?.[0];
      const value = changes?.value;
      const message = value?.messages?.[0];
      const contact = value?.contacts?.[0];

      // Acknowledge Meta immediately
      if (!message || message.type !== "text") {
        return new Response("OK", { status: 200 });
      }

      const fromNumber = message.from;
      const userMessage = (message.text?.body || "").trim();
      const senderName = contact?.profile?.name || "Client";

      // Process message in the background
      ctx.waitUntil(
        (async () => {
          try {
            // Check for checklist query
            const isChecklist = /(checklist|self-care|self care|guide|download|pdf)/i.test(userMessage);

            const aiReply = await generateAIResponse(env, userMessage, senderName);
            await sendMetaMessage(env, fromNumber, aiReply);

            // Notify Admin if lead
            const adminNumber = env.ADMIN_WHATSAPP_NUMBER;
            if (adminNumber && isChecklist) {
              await sendMetaMessage(
                env,
                adminNumber,
                `🔔 Lead Alert from WhatsApp!\nName: ${senderName}\nPhone: ${fromNumber}\nQuery: ${userMessage}`
              );
            }
          } catch (err) {
            console.error("Error processing message:", err);
          }
        })()
      );

      return new Response("EVENT_RECEIVED", { status: 200 });
    }

    return new Response("Method not allowed", { status: 405 });
  }
};

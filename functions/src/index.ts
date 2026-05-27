import { onCall, HttpsError } from "firebase-functions/v2/https";

const SYSTEM_PROMPT = `You are the official digital advisor for Integrated Wellth Solutions (IWS).
YOUR KNOWLEDGE BASE:
- We are a strategic business consultancy founded by Marcia Kgaphola, merging accounting precision (IQ) with behavioral psychology (EQ).
- We help startups, existing businesses, NPOs, and individuals decouple their identity from operational friction.
- Core Services: Accountability Partnership, Existing Business Solutions, NPO compliance, and Individual Wealth Mapping.
- Primary Call to Action: Guide users to book a strategic audit or discovery call at www.integratedwellth.co.za.
RULES:
1. NEVER hallucinate or make up information. Use ONLY the Knowledge Base.
2. Be direct, professional, and highly strategic. Keep answers concise (2-4 sentences max).`;

export const websiteChat = onCall({
  region: "us-central1",
  cors: [
    "https://integratedwellth.co.za",
    "https://www.integratedwellth.co.za",
    "http://localhost:5173",
    "http://localhost:3000"
  ],
  secrets: ["DEEPSEEK_API_KEY"],
}, async (request) => {
  const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
  const message = request.data.message;
  const history = request.data.history;

  if (!message) {
    throw new HttpsError("invalid-argument", "Message is required.");
  }
  if (!DEEPSEEK_API_KEY) {
    console.error("DEEPSEEK_API_KEY secret not found");
    throw new HttpsError("failed-precondition", "API key not configured.");
  }

  try {
    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...(history || []).map((m: any) => ({
        role: (m.role === 'model' || m.role === 'bot' || m.role === 'assistant') ? 'assistant' : 'user',
        content: m.text || m.content
      })),
      { role: "user", content: message }
    ];

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
        max_tokens: 500
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("DeepSeek API error:", response.status, errorText);
      throw new Error(`DeepSeek API error: ${response.status}`);
    }

    const data = await response.json() as any;
    const replyText = data?.choices?.[0]?.message?.content;

    if (!replyText) {
      throw new Error("Invalid response structure from DeepSeek");
    }

    return { reply: replyText.trim() };
  } catch (error: any) {
    console.error("Chatbot Error:", error);
    throw new HttpsError("internal", error.message || "Failed to process message.");
  }
});

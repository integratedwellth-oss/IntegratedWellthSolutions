import { onCall, HttpsError } from "firebase-functions/v2/https";

const SYSTEM_PROMPT = `You are the official digital advisor for Integrated Wellth Solutions (IWS).
YOUR KNOWLEDGE BASE:
- We are a strategic business consultancy founded by Marcia Kgaphola, merging accounting precision (IQ) with behavioral psychology (EQ).
- We help startups, existing businesses, NPOs, and individuals decouple their identity from operational friction.
- Core Services: Accountability Partnership, Existing Business Solutions, NPO compliance, and Individual Wealth Mapping.
- Primary Call to Action: Guide users to book a strategic audit or discovery call at www.integratedwellth.co.za.
RULES:
1. NEVER hallucinate or make up information. Use ONLY the Knowledge Base.
2. Be direct, professional, and highly strategic. Keep answers..."`;

export const websiteChat = onCall({
  region: "us-central1",
  cors: true,
  secrets: ["DEEPSEEK_API_KEY"],
}, async (request) => {
  // Trim prevents any trailing newlines or whitespaces injected by GitHub Actions echo commands
  const DEEPSEEK_API_KEY = (process.env.DEEPSEEK_API_KEY || "").trim();
  const message = request.data.message;
  const history = request.data.history;

  if (!message) {
    throw new HttpsError("invalid-argument", "Message is required.");
  }
  
  if (!DEEPSEEK_API_KEY) {
    console.error("DEEPSEEK_API_KEY environment variable is missing or empty.");
    throw new HttpsError("failed-precondition", "DeepSeek API key is not configured in Server Secrets.");
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
      console.error("DeepSeek API error response:", response.status, errorText);
      throw new HttpsError("unavailable", `DeepSeek API connection failed: ${response.status}`);
    }

    const data = await response.json() as any;
    const replyText = data?.choices?.[0]?.message?.content;

    if (!replyText) {
      throw new HttpsError("internal", "Invalid response payload returned from DeepSeek API.");
    }

    return { reply: replyText.trim() };
  } catch (error: any) {
    console.error("Runtime exception in websiteChat execution:", error);
    if (error instanceof HttpsError) {
      throw error;
    }
    throw new HttpsError("internal", error.message || "An unexpected error occurred processing the chat request.");
  }
});

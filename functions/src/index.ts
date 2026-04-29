import { onCall, HttpsError } from "firebase-functions/v2/https";

const AI_MODEL = "gemini-3.1-flash-lite-preview";

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
  cors: true,
  secrets: ["GEMINI_API_KEY"],
}, async (request) => {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  
  const message = request.data.message;
  const history = request.data.history;

  if (!message) {
    throw new HttpsError("invalid-argument", "Message is required.");
  }

  if (!GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY not configured in Firebase Secrets Manager");
    throw new HttpsError("failed-precondition", "API key not configured.");
  }

  try {
    const formattedHistory = history ? history.map((m: any) => ({
      role: m.role === 'bot' ? 'model' : 'user',
      parts: [{ text: m.text }]
    })) : [];

    formattedHistory.push({ role: 'user', parts: [{ text: message }] });

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${AI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
    
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: formattedHistory,
        generationConfig: { temperature: 0.1, maxOutputTokens: 500 }
      })
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Gemini API error:", res.status, errorText);
      throw new Error(`Gemini API error: ${res.status}`);
    }

    const data = await res.json() as any;
    const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!replyText) {
      throw new Error("Invalid response structure from Gemini");
    }

    return { reply: replyText.trim() };
  } catch (error) {
    console.error("Chatbot Error:", error);
    throw new HttpsError("internal", "Failed to process message. Please try again later.");
  }
});

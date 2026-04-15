import { onCall, HttpsError } from "firebase-functions/v2/https";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY; 
const AI_MODEL = "gemini-1.5-flash"; // Updated to stable model

export const websiteChat = onCall({
  region: "us-central1",
  cors: ["https://integratedwellth.co.za", "https://www.integratedwellth.co.za", "http://localhost:5173", "http://localhost:3000"],
}, async (request) => {
  const { message, history } = request.data;

  if (!message) {
    throw new HttpsError("invalid-argument", "Message is required.");
  }
  
  if (!GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY not configured");
    throw new HttpsError("failed-precondition", "API key not configured.");
  }

  const SYSTEM_PROMPT = `You are the official digital advisor for Integrated Wellth Solutions (IWS).
YOUR KNOWLEDGE BASE:
- We are a strategic business consultancy founded by Marcia Kgaphola, merging accounting precision (IQ) with behavioral psychology (EQ).
- We help startups, existing businesses, NPOs, and individuals decouple their identity from operational friction.
- Core Services: Accountability Partnership, Existing Business Solutions, NPO compliance, and Individual Wealth Mapping.
- Primary Call to Action: Guide users to book a strategic audit or discovery call at www.integratedwellth.co.za.

RULES:
1. NEVER hallucinate or make up information. Use ONLY the Knowledge Base.
2. Be direct, professional, and highly strategic. Keep answers concise (2-4 sentences max).`;

  try {
    const formattedHistory = history ? history.map((m: any) => ({
      role: m.role === 'bot' ? 'model' : 'user',
      parts: [{ text: m.text }]
    })) : [];
    
    formattedHistory.push({ role: 'user', parts: [{ text: message }] });

    // ✅ FIXED: Removed space in URL
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${AI_MODEL}:generateContent?key=${GEMINI_API_KEY}`, {
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

    const data = await res.json();
    const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!replyText) {
      console.error("Empty response from Gemini:", data);
      return { reply: "I apologize, but I'm having trouble processing your request right now." };
    }

    return { reply: replyText.trim() };
  } catch (error) {
    console.error("Chatbot Error:", error);
    throw new HttpsError("internal", "Failed to process message. Please try again later.");
  }
});

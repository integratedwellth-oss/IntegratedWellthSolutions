import { onCall, HttpsError } from "firebase-functions/v2/https";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY; 
const AI_MODEL = "gemini-3.1-flash-lite-preview"; 

export const websiteChat = onCall({
  region: "us-central1",
  cors: true, 
}, async (request: any) => {
  const { message, history } = request.data;

  if (!message || !GEMINI_API_KEY) {
    throw new HttpsError("failed-precondition", "Missing message or API key.");
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

    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${AI_MODEL}:generateContent?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: formattedHistory,
        generationConfig: { temperature: 0.1, maxOutputTokens: 500 } 
      })
    });

    if (!res.ok) throw new Error("Failed to fetch from Gemini");

    const data = await res.json();
    const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    return { reply: replyText ? replyText.trim() : "I am currently offline." };
  } catch (error) {
    console.error("Chatbot Error:", error);
    return { reply: "Systems are currently offline. Please try again later." };
  }
});

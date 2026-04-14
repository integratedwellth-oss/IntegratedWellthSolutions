// functions/src/index.ts
import { onCall, HttpsError } from "firebase-functions/v2/https";

// We use the GenAI endpoint directly via fetch
const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // Ensure this is set in your Firebase secrets/env
const AI_MODEL = "gemini-1.5-flash"; // Or gemini-1.5-pro

export const websiteChat = onCall({
  region: "us-central1",
  cors: true, // Crucial for calling from a different frontend domain
}, async (request) => {
  const { message, history } = request.data;

  if (!message || !GEMINI_API_KEY) {
    throw new HttpsError("failed-precondition", "Missing message or API key.");
  }

  // --- CUSTOMIZE YOUR NEW BOT HERE ---
  const SYSTEM_PROMPT = `You are the official digital assistant for [New Website Name].
  YOUR KNOWLEDGE BASE:
  - [Fact 1 about the business]
  - [Fact 2 about pricing or services]
  - [Primary Call to Action]
  
  RULES:
  1. NEVER hallucinate or make up information. Use ONLY the Knowledge Base.
  2. Be direct, professional, and helpful. Keep answers concise (2-4 sentences max).`;

  try {
    // Format history for the Gemini API
    const formattedHistory = history ? history.map((m: any) => ({
      role: m.role === 'bot' ? 'model' : 'user',
      parts: [{ text: m.text }]
    })) : [];
    
    // Append the new user message
    formattedHistory.push({ role: 'user', parts: [{ text: message }] });

    // Call Gemini
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${AI_MODEL}:generateContent?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: formattedHistory,
        generationConfig: { temperature: 0.1, maxOutputTokens: 500 } // Keep temperature low for factual accuracy
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

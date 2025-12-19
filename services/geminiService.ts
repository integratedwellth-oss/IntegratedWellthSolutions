import { GoogleGenerativeAI, ChatSession } from "@google/generative-ai";

export const createChatSession = (): ChatSession => {
  // 🔒 SECURITY FIX: Load key from Environment Variables (Vite)
  // This reads the VITE_API_KEY injected by your deploy.yml
  const apiKey = import.meta.env.VITE_API_KEY;

  // Safety check to debug deployment issues
  if (!apiKey || apiKey === "undefined") {
    console.error("FATAL: Gemini API Key is missing. Ensure VITE_API_KEY is set in GitHub Secrets.");
    throw new Error("Gemini API Key is missing.");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  
  // ⚡ PERFORMANCE: Switched to 'gemini-1.5-flash' (Faster/Better for chat)
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    // System instructions are now native to the model config
    systemInstruction: "You are the 'Wellth Advisor' for Integrated Wellth Solutions (IWS). You are helpful, professional, and empathetic. You answer questions about financial planning, tax compliance (especially for South African NPOs), and psychological well-being. Keep answers concise."
  });

  return model.startChat({
    history: [
      // History is now clean, system instructions are handled above
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1000,
    },
  });
};

export const sendMessageStream = async (chat: ChatSession, message: string) => {
  try {
    const result = await chat.sendMessageStream(message);
    return result.stream;
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    throw error;
  }
};

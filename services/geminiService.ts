import { GoogleGenAI, Chat } from "@google/genai";
import { COMPANY_CONTEXT } from "../constants";

export const createChatSession = (): Chat => {
  // Use Vite's native env handling ONLY
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';

  if (!apiKey) {
    console.error("Gemini API Key is missing");
  }

  const ai = new GoogleGenAI({ apiKey });

  return ai.chats.create({
    model: 'gemini-2.0-flash', 
    config: {
      systemInstruction: COMPANY_CONTEXT,
      temperature: 0.7,
      topP: 0.95,
      topK: 40,
    },
  });
};

export const sendMessageStream = async (chat: Chat, message: string) => {
  try {
    return await chat.sendMessageStream({ message });
  } catch (error) {
    console.error("Critical: Wellth Advisor Connection Failure:", error);
    throw error;
  }
};


import { GoogleGenAI, Chat } from "@google/genai";
import { COMPANY_CONTEXT } from "../constants";

/**
 * Creates a new chat session with the Wellth Advisor model.
 * Strictly follows the SDK requirement for production-grade initialization.
 */
export const createChatSession = (): Chat => {
  // Safe environment access
  const env = typeof process !== 'undefined' ? process.env : {};
  const apiKey = env.API_KEY || '';
  
  // Accessing the API key from the environment variable provided by the platform
  const ai = new GoogleGenAI({ apiKey });
  
  return ai.chats.create({
    model: 'gemini-3-flash-preview', // High-speed model optimized for production chat
    config: {
      systemInstruction: COMPANY_CONTEXT,
      temperature: 0.7,
      topP: 0.95,
      topK: 40,
    },
  });
};

/**
 * Secure stream handler for production environments
 */
export const sendMessageStream = async (chat: Chat, message: string) => {
  try {
    // Standard message stream request
    return await chat.sendMessageStream({ message });
  } catch (error) {
    console.error("Critical: Wellth Advisor Connection Failure:", error);
    throw error;
  }
};

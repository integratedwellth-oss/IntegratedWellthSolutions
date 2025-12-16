import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { COMPANY_CONTEXT } from "../constants";

let ai: GoogleGenAI | null = null;

const getAI = () => {
  if (!ai) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }
  return ai;
};

export const createChatSession = (): Chat => {
  const client = getAI();
  return client.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction: COMPANY_CONTEXT,
      temperature: 0.7,
    },
  });
};

export const sendMessageStream = async (chat: Chat, message: string) => {
  try {
    return await chat.sendMessageStream({ message });
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
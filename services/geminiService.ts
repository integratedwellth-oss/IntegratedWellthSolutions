import { GoogleGenerativeAI } from "@google/generative-ai";

// ⚠️ MAKE SURE THIS VARIABLE MATCHES YOUR SECRETS
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY; 

const genAI = new GoogleGenerativeAI(API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export const createChatSession = () => {
  return model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "You are the 'Wellth Advisor' for Integrated Wellth Solutions (IWS). You are helpful, professional, and empathetic. You answer questions about financial planning, tax compliance (especially for South African NPOs), and psychological well-being. Keep answers concise." }]
      },
      {
        role: "model",
        parts: [{ text: "Understood. I am ready to assist as the Wellth Advisor." }]
      }
    ],
  });
};

export const sendMessageStream = async (chat: any, message: string) => {
  try {
    const result = await chat.sendMessageStream(message);
    return result.stream;
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    throw error;
  }
};

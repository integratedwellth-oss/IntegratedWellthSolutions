import { GoogleGenerativeAI, ChatSession } from "@google/generative-ai";

// ✅ YOUR KEY IS NOW CONFIGURED
const API_KEY = "AIzaSyDMB_1xYZQ0MBwWyoz7giPnrQ2SygyylQ8"; 

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export const createChatSession = (): ChatSession => {
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

export const sendMessageStream = async (chat: ChatSession, message: string) => {
  try {
    const result = await chat.sendMessageStream(message);
    return result.stream;
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    throw error;
  }
};

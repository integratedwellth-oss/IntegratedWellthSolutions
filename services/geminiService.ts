import { GoogleGenerativeAI, ChatSession } from "@google/generative-ai";
import { COMPANY_CONTEXT } from "../constants";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';

export const createChatSession = (): any => {
  if (!apiKey) {
    console.error("Gemini API Key is missing. Set VITE_GEMINI_API_KEY in GitHub Secrets.");
    return null;
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

  const chatSession = model.startChat({
    history: [
      { role: "user", parts: [{ text: "System Context: " + COMPANY_CONTEXT }] },
      { role: "model", parts: [{ text: "Understood. I am the Integrated Wellth Advisor. I am ready to assist." }] },
    ],
  });

  return chatSession;
};

export const sendMessageStream = async (chat: any, message: string) => {
  if (!chat) {
    throw new Error("Chat session unavailable. Please check your API key configuration.");
  }

  try {
    const result = await chat.sendMessageStream(message);

    return {
      [Symbol.asyncIterator]: async function* () {
        for await (const chunk of result.stream) {
          const chunkText = chunk.text();
          if (chunkText) {
            yield { text: chunkText };
          }
        }
      },
    };
  } catch (error) {
    console.error("Critical: Wellth Advisor Connection Failure:", error);
    throw error;
  }
};

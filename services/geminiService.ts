import { GoogleGenerativeAI, ChatSession } from "@google/generative-ai";
import { COMPANY_CONTEXT } from "../constants";

let chatSession: ChatSession | null = null;

export const createChatSession = (): any => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';

  if (!apiKey) {
    console.error("Gemini API Key is missing");
    throw new Error("API Key Missing");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  chatSession = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "System Context: " + COMPANY_CONTEXT }],
      },
      {
        role: "model",
        parts: [{ text: "Understood. I am the Integrated Wellth Advisor. I am ready to assist." }],
      },
    ],
    generationConfig: {
      maxOutputTokens: 1000,
    },
  });

  return chatSession;
};

export const sendMessageStream = async (chat: any, message: string) => {
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
      }
    };
  } catch (error) {
    console.error("Critical: Wellth Advisor Connection Failure:", error);
    throw error;
  }
};

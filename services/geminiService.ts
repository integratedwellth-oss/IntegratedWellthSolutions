import { GoogleGenerativeAI } from "@google/generative-ai";
import { COMPANY_CONTEXT } from "../constants";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';

const MODEL_NAME = "gemini-3.1-flash-lite-preview";

export const createChatSession = (): any => {
  if (!apiKey) {
    console.error("Gemini API Key is missing. Set VITE_GEMINI_API_KEY in GitHub Secrets.");
    return null;
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel(
    { model: MODEL_NAME },
    { apiVersion: "v1beta" }
  );

  const chatSession = model.startChat({
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
  });

  return chatSession;
};

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const sendMessageStream = async (chat: any, message: string, attempt = 1): Promise<any> => {
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
  } catch (error: any) {
    const is429 = error?.status === 429 || error?.message?.includes('429');

    if (is429 && attempt <= 3) {
      const delay = attempt * 2000;
      console.warn(`Rate limited. Retrying in ${delay / 1000}s (attempt ${attempt}/3)...`);
      await sleep(delay);
      return sendMessageStream(chat, message, attempt + 1);
    }

    if (is429) {
      throw new Error("The Wellth Advisor is temporarily at capacity. Please try again in a moment.");
    }

    console.error("Critical: Wellth Advisor Connection Failure:", error);
    throw error;
  }
};

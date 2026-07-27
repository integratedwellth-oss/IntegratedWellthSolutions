import { getFunctions, httpsCallable } from "firebase/functions";

// ─── SECURITY FIX: Strip HTML and enforce length limits before sending to AI ───
const sanitizeInput = (text: string): string => {
  return text
    .replace(/[<>]/g, '')      // Remove angle brackets (XSS prevention)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '') // Remove control chars
    .substring(0, 2000);       // Enforce max length
};

export const createChatSession = (): { history: Array<{role: string, text: string}> } => {
  return {
    history: []
  };
};

export const sendMessageStream = async (
  chat: { history: Array<{role: string, text: string}> },
  message: string
): Promise<{ [Symbol.asyncIterator]: () => AsyncGenerator<{text: string}> }> => {
  if (!chat) {
    throw new Error("Chat session unavailable. Please check your configuration.");
  }

  const cleanMessage = sanitizeInput(message);
  if (!cleanMessage.trim()) {
    throw new Error("Message cannot be empty.");
  }

  try {
    const functions = getFunctions();
    // ─── SECURITY FIX: Call the correct function name ───
    // The backend exports 'websiteChat', not 'geminiChat'
    const chatCall = httpsCallable(functions, "websiteChat");

    const response = await chatCall({
      message: cleanMessage,
      history: chat.history
    });

    const data = response.data as { reply?: string };
    const replyText = data?.reply || "";

    chat.history.push({ role: "user", text: cleanMessage });
    chat.history.push({ role: "model", text: replyText });

    return {
      [Symbol.asyncIterator]: async function* () {
        if (replyText) {
          yield { text: replyText };
        }
      },
    };
  } catch (error: any) {
    console.error("Critical: Wellth Advisor Connection Failure:", error);
    throw error;
  }
};

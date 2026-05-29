import { getFunctions, httpsCallable } from "firebase/functions";

export const createChatSession = (): any => {
  return {
    history: []
  };
};

export const sendMessageStream = async (chat: any, message: string, attempt = 1): Promise<any> => {
  if (!chat) {
    throw new Error("Chat session unavailable. Please check your configuration.");
  }

  try {
    const functions = getFunctions();
    const geminiChatCall = httpsCallable(functions, "geminiChat");

    const response = await geminiChatCall({
      message,
      history: chat.history
    });

    const data = response.data as any;
    const replyText = data?.reply || "";

    chat.history.push({ role: "user", text: message });
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

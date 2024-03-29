import { USER } from "~/enums/AI";
import { useMessageStore } from "~/stores/message-store";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function useGeminiAI() {
  const { geminiAILogs, isGeminiAITyping } = storeToRefs(useMessageStore());
  const { updateTypingStatus, addMessageList, addConversationLog, isTyping } =
    useMessageStore();

  // Access your API key as an environment variable (see "Set up your API key" above)
  const genAI = new GoogleGenerativeAI(
    useRuntimeConfig().public.GEMINI_API_KEY
  );

  async function submitGeminiAI(newMessage: string) {
    if (!newMessage) {
      addMessageList(USER.SYSTEM, "invalid input");
      return;
    }
    addMessageList(USER.ME_GEMINI, newMessage);
    updateTypingStatus(USER.GEMINI, true);

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const chat = model.startChat();
    const prompt = newMessage;
    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();

    updateTypingStatus(USER.GEMINI, false);
    addMessageList(USER.GEMINI, text);
  }

  async function talkToGemini(message: string): Promise<string> {
    const { $mdRenderer: mdRenderer } = useNuxtApp();

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const chat = model.startChat();
    const prompt = message;
    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();

    isTyping(false);
    addConversationLog(USER.GEMINI, mdRenderer.render(text));
    return text;
  }

  return {
    geminiAILogs,
    isGeminiAITyping,
    submitGeminiAI,
    talkToGemini,
  };
}

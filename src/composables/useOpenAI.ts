import { USER } from "~/enums/AI";
import { useMessageStore } from "~/stores/message-store";

export default function useOpenAI() {
  const { openAILogs, isOpenAITyping } = storeToRefs(useMessageStore());
  const { updateTypingStatus, addMessageList, addConversationLog, isTyping } =
    useMessageStore();

  async function submitOpenAI(newMessage: string) {
    if (!newMessage) {
      addMessageList(USER.SYSTEM, "invalid input");
      return;
    }
    addMessageList(USER.ME_OPENAI, newMessage);
    updateTypingStatus(USER.OPENAI, true);

    useFetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `${useRuntimeConfig().public.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: USER.ME_OPENAI, content: newMessage }],
      }),
    })
      .then((response) => response.data.value)
      .then((data: any) => {
        updateTypingStatus(USER.OPENAI, false);
        console.log(data.choices[0].message);
        if (data.error != null) {
          addMessageList(USER.OPENAI, data.error.message);
        } else {
          const formattedResponse = data.choices[0].message.content;
          addMessageList(USER.OPENAI, formattedResponse);
        }
      });
  }

  async function talkToOpenAI(message: string): Promise<string> {
    console.log("openai message" + message);
    const response = useFetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `${useRuntimeConfig().public.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: USER.ME_OPENAI, content: message }],
      }),
    })
      .then((response) => response.data.value)
      .then((data: any) => {
        isTyping(false);
        console.log(data.choices[0].message);
        if (data.error != null) {
          addConversationLog(USER.OPENAI, data.error.message);
          return data.error.message;
        } else {
          const formattedResponse = data.choices[0].message.content;
          addConversationLog(USER.OPENAI, formattedResponse);
          return formattedResponse;
        }
      });

    return response;
  }

  return {
    openAILogs,
    isOpenAITyping,
    submitOpenAI,
    talkToOpenAI,
  };
}

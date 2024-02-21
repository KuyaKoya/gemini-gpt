import { USER } from "~/enums/AI";

export default function useTalkAI() {
  const { talkToOpenAI } = useOpenAI();
  const { talkToGemini } = useGeminiAI();
  const { AILogs, isAITyping } = storeToRefs(useMessageStore());
  const { isTyping, addConversationLog } = useMessageStore();

  let iteration = 0;

  function startTalking(message: string) {
    if (!message) {
      addConversationLog(USER.SYSTEM, "invalid input");
      return;
    }
    addConversationLog(USER.OPENAI, message);
    isTyping(true);
    talk(USER.OPENAI, message);
  }

  //initiate convo -> openai -> gemini -> openai -> ...

  async function talk(ai: string, message: string) {
    iteration++;
    console.log(ai + " is talking");
    while (iteration < 5) {
      if (ai === USER.OPENAI) {
        //call gemini
        talk(USER.GEMINI, await talkToGemini(message));
      }
      if (ai === USER.GEMINI) {
        //call openai
        talk(USER.OPENAI, await talkToOpenAI(message));
      }
    }
  }

  return { AILogs, isAITyping, startTalking };
}

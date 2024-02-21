<template>
  <div class="chat-container">
    <div class="message-area">
      <talk :messages="AILogs" :isTyping="isAITyping" />
    </div>

    <input
      type="text"
      onkeydown="if (event.keyCode === 13 && event.shiftKey) this.value += '\n';"
      @keydown.enter="submit"
      v-model="newMessage"
      placeholder="Type your message..."
    />
    <button type="submit" @click="submit" @keyup.enter="submit">Send</button>
  </div>
</template>

<script setup lang="ts">
const { AILogs, isAITyping, startTalking } = useTalkAI();
const newMessage = ref("how is your day?");

function submit() {
  startTalking(newMessage.value);
  newMessage.value = "";
}
</script>

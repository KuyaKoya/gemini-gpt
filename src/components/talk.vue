<template>
  <div class="talk-area">
    <div
      v-for="(message, index) in messages"
      :key="index"
      class="bubble-container"
    >
      <div v-if="message.sender === USER.OPENAI" class="sender-bubble">
        <p v-html="message.content"></p>
      </div>
      <div v-else class="receiver-bubble">
        <p v-html="message.content"></p>
      </div>
    </div>
    <typing-bubble :isTyping="isTyping" />
  </div>
</template>

<script setup>
import { USER } from "~/enums/AI";
defineProps(["messages", "isTyping"]);
</script>

<template>
  <div v-if="isTyping" class="flex content-center items-center">
    <div class="dot" :class="{ 'dot-animated': isTyping }"></div>
    <div class="dot" :class="{ 'dot-animated': isTyping }"></div>
    <div class="dot" :class="{ 'dot-animated': isTyping }"></div>
  </div>
</template>

<script setup>
defineProps(["isTyping"]);
</script>

<style scoped>
.dot-animated {
  animation: dot-animation 1s infinite ease-in-out;
}

@keyframes dot-animation {
  0% {
    opacity: 0.3;
    transform: translate(0, 0);
  }
  50% {
    opacity: 1;
    transform: translate(0, -10px);
  }
  100% {
    opacity: 0.3;
    transform: translate(0, 0);
  }
}
</style>

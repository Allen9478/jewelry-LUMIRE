<script setup>
// import DefaultLayout from './layouts/DefaultLayout.vue'
import LoginPromptModal from './components/ui/LoginPromptModal.vue'
</script>

<template>
  <RouterView />
  <LoginPromptModal />
  <!-- 全域一個就夠，Pinia 控制開關 -->
</template>

<style scoped></style>

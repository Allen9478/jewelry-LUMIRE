<script setup>
import BaseButton from '@/components/ui/BaseButton.vue'
</script>
<template>
  <div class="pt-[80px]">
    <p>我是about</p>
    <BaseButton v-fade-in="{ delay: 80, y: 16 }" variant="ghost">test</BaseButton>
  </div>
</template>

<style scoped></style>

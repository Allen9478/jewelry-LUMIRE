<script setup>
import BaseButton from '@/components/ui/BaseButton.vue'
</script>
<template>
  <div class="page-wrapper">
    <p>我是home</p>
    <BaseButton variant="primary">button</BaseButton>
    <BaseButton variant="ghost" tag="RouterLink" to="/works">ghost</BaseButton>
  </div>
</template>

<style scoped></style>

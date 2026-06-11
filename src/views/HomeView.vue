<script setup>
import BaseButton from '../components/layout/ui/BaseButton.vue'
</script>
<template>
  <p>我是home</p>
  <BaseButton variant="primary">button</BaseButton>
  <BaseButton variant="ghost" tag="RouterLink" to="/works">ghost</BaseButton>
</template>

<style scoped></style>

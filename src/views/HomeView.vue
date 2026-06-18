<script setup>
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import { testWork } from '@/data/testWork.js'
</script>
<template>
  <div class="page-wrapper">
    <p>我是home</p>
    <BaseButton variant="primary">button</BaseButton>
    <BaseButton variant="ghost" tag="RouterLink" to="/works">ghost</BaseButton>
    <div class="grid grid-cols-2 gap-4 desktop:gap-5 desktop:grid-cols-4 mx-auto">
      <BaseCard v-for="item in testWork" :key="item.id" :product="item"></BaseCard>
    </div>
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import breathing from '@/assets/images/home/breathing-bg.webp'
</script>

<template>
  <section
    class="relative w-screen breathing-height overflow-hidden ml-[calc(50%-50vw)] mr-[calc(50%-50vw)]"
  >
    <img
      :src="breathing"
      alt=""
      width="1774"
      height="887"
      loading="lazy"
      class="absolute inset-0 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/3 min-w-full h-full object-cover animate-shimmer"
      aria-hidden="true"
    />

    <!-- 手機版暗化遮罩 -->
    <div class="absolute inset-0 bg-black/20" />
  </section>
</template>

<style scoped>
/* 呼吸留白高度 */
.breathing-height {
  height: clamp(140px, 8.6cqw + 108px, 240px);
}

/* 呼吸留白動畫 */
.animate-shimmer {
  animation-duration: 3s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: shimmer;
  animation-timing-function: ease-in-out;
}

@keyframes shimmer {
  0% {
    opacity: 0.85;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.85;
  }
}
</style>

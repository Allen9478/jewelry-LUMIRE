<!-- components/ui/ScrollHint.vue -->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(true)

const handleScroll = () => {
  isVisible.value = window.scrollY === 0
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div
    class="scroll-hint transition-opacity duration-300"
    :class="isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'"
    aria-hidden="true"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="size-8"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
  </div>
</template>

<style scoped>
.scroll-hint {
  animation: scroll-hint-bounce 2.2s ease-in-out infinite;
}

@keyframes scroll-hint-bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(8px);
  }
}
</style>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useScopedI18n } from '@/composables/useScopedI18n'
import BaseButton from '@/components/ui/BaseButton.vue'

const router = useRouter()
const { tx } = useScopedI18n('page.notFound')

function goHome(): void {
  void router.push('/')
}
</script>

<template>
  <div
    class="header-offset not-found relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-6 py-16 text-center"
  >
    <span aria-hidden="true" class="not-found__code">404</span>
    <div class="not-found__info-group flex flex-col items-center gap-6">
      <h1 class="text-heading-sm text-white">{{ tx('title') }}</h1>
      <p class="max-w-md text-label-lg text-white/60">{{ tx('body') }}</p>
      <BaseButton @click="goHome">{{ tx('cta') }}</BaseButton>
    </div>
  </div>
</template>

<style scoped>
.not-found__code {
  font-size: clamp(9rem, 32vw, 26rem);
  line-height: 1;
  color: var(--color-gold-500);
  opacity: 0.28;
  user-select: none;
  pointer-events: none;
}
</style>

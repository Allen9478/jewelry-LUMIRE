<script setup lang="ts">
import { useRouter } from 'vue-router'
import BaseButton from '@/components/ui/BaseButton.vue'
import { useLocalized } from '@/composables/useLocalized'
import type { LocalizedText } from '@/type/work'

const router = useRouter()
const { localized } = useLocalized()

const copy: Record<'title' | 'body' | 'hint' | 'cta', LocalizedText> = {
  title: { 'zh-TW': '這顆寶石，我們也找不到了', en: 'This gem has gone missing' },
  body: {
    'zh-TW': '你要找的頁面不存在，或已移到別處。',
    en: "The page you're looking for doesn't exist or has moved.",
  },
  hint: {
    'zh-TW': '移動游標讓光落在寶石上，點一下看看。',
    en: 'Move your cursor to catch the light. Try a click.',
  },
  cta: { 'zh-TW': '回到首頁', en: 'Back to home' },
}

function goHome(): void {
  void router.push('/')
}
</script>

<template>
  <main
    class="header-offset not-found relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-6 py-16 text-center"
  >
    <p class="sr-only">404</p>
    <span aria-hidden="true" class="not-found__code">404</span>

    <h1 class="relative mt-2 text-heading-sm text-white">
      {{ localized(copy.title) }}
    </h1>
    <p class="relative mt-3 max-w-md text-label-lg text-white/60">
      {{ localized(copy.body) }}
    </p>
    <BaseButton class="relative mt-8" @click="goHome">
      {{ localized(copy.cta) }}
    </BaseButton>
    <p class="relative mt-6 text-label text-white/40">
      {{ localized(copy.hint) }}
    </p>
  </main>
</template>

<style scoped>
.not-found {
  background-image: radial-gradient(60% 50% at 50% 40%, rgb(120 10 25 / 0.28), transparent 70%);
}

.not-found__code {
  font-size: clamp(9rem, 32vw, 26rem);
  line-height: 1;
  color: rgb(255 255 255 / 0.15);
  user-select: none;
  pointer-events: none;
}

.gem-stage {
  position: relative;
  width: 100%;
  max-width: 40rem;
  aspect-ratio: 4 / 3;
  touch-action: pan-y;
}

.gem-stage :deep(canvas) {
  display: block;
  width: 100%;
  height: 100%;
}
</style>

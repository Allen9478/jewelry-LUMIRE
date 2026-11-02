<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useUiStore } from '@/stores/useUiStore'

const { t } = useI18n()
const uiStore = useUiStore()
</script>

<template>
  <div
    role="status"
    aria-live="polite"
    class="pointer-events-none fixed inset-x-0 bottom-6 z-[80] flex justify-center"
  >
    <p
      v-if="uiStore.toastKey"
      class="bg-black-soft border border-gold-500 text-cream px-4 py-3 text-label-lg"
    >
      {{ t(uiStore.toastKey) }}
    </p>
  </div>
</template>

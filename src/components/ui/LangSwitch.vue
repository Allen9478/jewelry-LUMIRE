<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCommonI18n } from '@/composables/useScopedI18n'
import type { LocalizedText } from '@/types/work'

type Variant = 'desktop' | 'mobile'
type Locale = keyof LocalizedText

withDefaults(
  defineProps<{
    variant?: Variant
  }>(),
  {
    variant: 'desktop',
  },
)

const isOpen = ref(false)
const rootRef = ref<HTMLElement | null>(null)
const { locale } = useI18n()
const { tx: txCommon } = useCommonI18n()

function switchLocale(lang: Locale) {
  locale.value = lang
  isOpen.value = false
}

function onPointerDown(e: PointerEvent) {
  if (rootRef.value && e.target instanceof Node && !rootRef.value.contains(e.target)) {
    isOpen.value = false // 點到選單外面就收起
  }
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') isOpen.value = false
}

onMounted(() => {
  document.addEventListener('pointerdown', onPointerDown)
  document.addEventListener('keydown', onKeydown)
})
onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onPointerDown)
  document.removeEventListener('keydown', onKeydown)
})
</script>
<template>
  <div
    ref="rootRef"
    v-if="variant === 'desktop'"
    class="relative group hidden tablet:flex items-center cursor-pointer"
  >
    <!-- 顯示目前選項 -->
    <button
      type="button"
      @click="isOpen = !isOpen"
      class="flex items-center group-hover:text-gold-500 group-focus-within:text-gold-500 transition-colors"
    >
      <span class="text-label laptop:text-label-lg px-2 py-2">
        {{ locale === 'zh-TW' ? '中文' : 'EN' }}
      </span>

      <!-- 箭頭 -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-4 pointer-events-none text-white transition-colors duration-300 group-hover:text-gold-500"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
      </svg>
    </button>
    <!-- 自訂下拉 -->
    <!-- group-focus-within 意思是 group 容器裡只要有任何元素拿到焦點，就套用這組樣式。 -->
    <div
      :class="isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'"
      class="absolute left-0 top-full mt-2 w-20 bg-[#1a1a1a] border border-[#3a3530] group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200"
    >
      <button
        type="button"
        @click="switchLocale('en')"
        class="w-full px-4 py-2 text-left text-label-lg hover:text-gold-500"
        :aria-label="txCommon('aria.langEn')"
      >
        EN
      </button>
      <button
        type="button"
        @click="switchLocale('zh-TW')"
        class="w-full px-4 py-2 text-left text-label-lg hover:text-gold-500"
        :aria-label="txCommon('aria.langZh')"
      >
        中文
      </button>
    </div>
  </div>
  <div v-else class="flex items-center gap-3">
    <button
      type="button"
      @click="switchLocale('en')"
      class="text-label-lg px-1 py-2 transition-colors"
      :aria-label="txCommon('aria.langEn')"
      :class="
        locale === 'en'
          ? 'text-gold-500 border-b border-gold-500'
          : 'text-white hover:text-gold-500'
      "
    >
      EN
    </button>
    <span class="text-white/40">|</span>
    <button
      type="button"
      @click="switchLocale('zh-TW')"
      class="text-label-lg px-1 py-2 transition-colors"
      :aria-label="txCommon('aria.langZh')"
      :class="
        locale === 'zh-TW'
          ? 'text-gold-500 border-b border-gold-500'
          : 'text-white hover:text-gold-500'
      "
    >
      中文
    </button>
  </div>
</template>

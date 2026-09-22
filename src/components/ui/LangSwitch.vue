<script setup>
import { useI18n } from 'vue-i18n'

const props = defineProps({
  variant: {
    type: String,
    default: 'desktop', // 'desktop' 或 'mobile'
  },
})
const { locale } = useI18n()

function switchLocale(lang) {
  locale.value = lang
}
</script>
<template>
  <div
    v-if="variant === 'desktop'"
    class="relative group hidden tablet:flex items-center cursor-pointer"
  >
    <!-- 顯示目前選項 -->
    <span class="text-xs lg:text-sm px-2 py-2 group-hover:text-gold-500 transition-colors">
      {{ locale === 'zh-TW' ? '中文' : 'EN' }}
    </span>

    <!-- 箭頭 -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="size-4 pointer-events-none text-white transition-colors duration-300 group-hover:text-gold-500"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
    <!-- 自訂下拉 -->
    <div
      class="absolute left-0 top-full mt-2 w-20 bg-[#1a1a1a] border border-[#3a3530] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
    >
      <button
        @click="switchLocale('en')"
        class="w-full px-4 py-2 text-left text-sm hover:text-gold-500"
      >
        EN
      </button>
      <button
        @click="switchLocale('zh-TW')"
        class="w-full px-4 py-2 text-left text-sm hover:text-gold-500"
      >
        中文
      </button>
    </div>
  </div>
  <div v-else class="flex items-center gap-3">
    <button
      @click="switchLocale('zh-TW')"
      class="text-sm px-1 py-2 transition-colors"
      :class="locale === 'zh-TW' ? 'text-gold-500' : 'text-white hover:text-gold-500'"
    >
      中文
    </button>
    <span class="text-white/40">|</span>
    <button
      @click="switchLocale('en')"
      class="text-sm px-1 py-2 transition-colors"
      :class="locale === 'en' ? 'text-gold-500' : 'text-white hover:text-gold-500'"
    >
      EN
    </button>
  </div>
</template>

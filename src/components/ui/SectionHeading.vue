<!-- 區塊eyebrow加標題加button重複所以拆分出這元件,有帶判斷是否必要 -->
<script setup>
import GoldDivider from '@/components/ui/GoldDivider.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
defineProps({
  eyebrow: { type: String, required: true },
  title: { type: String, required: true },
  desc: { type: String, default: null },
  linkTo: { type: String, default: null },
  linkText: { type: String, default: null },
})
</script>
<template>
  <div class="section-heading__container flex flex-col items-start">
    <div v-fade-in="{ delay: 0, y: 12 }" class="inline-flex flex-col items-start">
      <p class="section-heading__eyebrow tablet:block uppercase text-eyebrow text-gold-500">
        {{ eyebrow }}
      </p>
      <GoldDivider variant="fade" class="mt-2" />
    </div>
    <div
      class="section-heading__group flex flex-col tablet:flex-row tablet:justify-between tablet:items-center tablet:py-8 w-full"
    >
      <h2
        v-fade-in="{ delay: 80, y: 16 }"
        class="section-heading__title text-heading my-4 tablet:my-0 font-serif"
      >
        {{ title }}
      </h2>

      <!-- 都有值btn才會出現 -->
      <BaseButton
        v-if="linkTo && linkText"
        tag="RouterLink"
        :to="linkTo"
        v-fade-in="{ delay: 80, y: 16 }"
        variant="ghost"
        class="section-heading__view-all inline-flex justify-start items-center text-body-sm"
        ><span class="text-btn tablet:text-btn-lg"> {{ linkText }} </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6 ml-2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
          /></svg
      ></BaseButton>
    </div>
    <p v-if="desc" class="text-subtext text-gray-muted">{{ desc }}</p>
  </div>
</template>

<style scoped></style>

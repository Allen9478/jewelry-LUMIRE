<script setup>
import BaseJewelryCard from '@/components/ui/BaseJewelryCard.vue'
import BaseArtistAvatar from '@/components/ui/BaseArtistAvatar.vue'
import breathing from '@/assets/images/breathing-bg.png'
import { testWork } from '@/data/testWork.js'
</script>
<template>
  <div class="page-wrapper">
    <div class="mt-25"></div>

    <div
      class="grid grid-cols-1 gap-4 pb-10 tablet:pb-14 tablet:grid-cols-3 desktop:gap-5 desktop:grid-cols-4 place-items-center"
    >
      <BaseJewelryCard v-for="item in testWork" :key="item.id" :product="item"></BaseJewelryCard>
    </div>
    <!-- 呼吸空間留白測試高度數值要調整 -->
    <section class="relative w-full h-64 tablet:h-64 overflow-hidden">
      <img
        :src="breathing"
        alt="breathing-bg"
        class="absolute inset-0 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/3 min-w-full h-full object-cover animate-shimmer"
        aria-hidden="true"
      />

      <!-- 手機版暗化遮罩 -->
      <div class="absolute inset-0 bg-black/20" />

      <!-- 文字疊層 -->
      <div class="absolute inset-0 flex flex-col items-center justify-center gap-1.5">
        <p
          class="font-display text-gold-400 text-sm md:text-base lg:text-xl tracking-[0.12em] italic"
        >
          Where Art Becomes Timeless
        </p>
        <p class="text-stone-500 text-[9px] md:text-[10px] lg:text-xs tracking-[0.15em] uppercase">
          — Lumière Jewelry Gallery —
        </p>
      </div>
    </section>
    <div
      class="artists grid grid-cols-2 gap-3 pt-10 tablet:pt-14 tablet:grid-cols-4 tablet:gap-5 desktop:gap-7"
    >
      <BaseArtistAvatar
        v-for="item in testWork"
        :key="item.id"
        :product="item"
        class="flex flex-col items-center"
      ></BaseArtistAvatar>
    </div>
    <div class="mt-25"></div>
  </div>
</template>

<style scoped>
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

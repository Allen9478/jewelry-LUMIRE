<script setup>
import BaseJewelryCard from '@/components/ui/BaseJewelryCard.vue'
import BaseArtistCard from '@/components/ui/BaseArtistCard.vue'
import { testWork } from '@/data/testWork.js'
</script>
<template>
  <div class="page-wrapper">
    <div class="mt-25"></div>

    <div
      class="grid grid-cols-1 gap-4 tablet:grid-cols-3 desktop:gap-5 desktop:grid-cols-4 place-items-center"
    >
      <BaseJewelryCard v-for="item in testWork" :key="item.id" :product="item"></BaseJewelryCard>
    </div>
    <div class="mt-25"></div>
    <div class="artists grid grid-cols-2 gap-3 tablet:grid-cols-4 tablet:gap-5 desktop:gap-7">
      <BaseArtistCard
        v-for="item in testWork"
        :key="item.id"
        :product="item"
        class="flex flex-col items-center"
      ></BaseArtistCard>
    </div>
    <div class="mt-25"></div>
  </div>
</template>

<style scoped></style>

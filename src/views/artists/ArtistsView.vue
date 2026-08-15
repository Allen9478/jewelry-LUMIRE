<script setup>
import BaseArtistCard from '@/components/ui/BaseArtistCard.vue'
import GoldDivider from '@/components/ui/GoldDivider.vue'
import artists from '@/data/artists.json'
</script>
<template>
  <div class="page-container my-8 space-y-6 tablet:my-12">
    <div class="text__group flex flex-col items-start">
      <div v-fade-in="{ delay: 0, y: 12 }" class="inline-flex flex-col items-start">
        <p class="text-eyebrow text-gold-500">VOICES IN GOLD AND STONE</p>
        <GoldDivider variant="fade" class="mt-2" />
      </div>

      <h1 class="text-heading font-serif my-2 laptop:my-4">The Artists</h1>
      <div class="text-body text-cream/70 mt-2 artist-subtitle max-w-xs tablet:max-w-full">
        Exceptional craftsmanship and a shared pursuit of timeless design.
      </div>
    </div>
    <div class="mt-6 grid grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-4 gap-4 tablet:gap-8">
      <RouterLink
        v-for="item in artists"
        :key="item.id"
        :to="{ name: 'artists-detail', params: { id: item.id } }"
      >
        <BaseArtistCard :artist="item"></BaseArtistCard
      ></RouterLink>
    </div>
  </div>
  <GoldDivider variant="full" class="my-12" />
</template>

<style scoped></style>

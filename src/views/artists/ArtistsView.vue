<script setup>
import BaseArtistCard from '@/components/ui/BaseArtistCard.vue'
import artists from '@/data/artists.json'
</script>
<template>
  <div class="page-container my-14">
    <div class="text__group">
      <h2 class="text-5xl tracking-wider">The Artists</h2>
      <div class="text-body text-cream/70 mt-5 artist-subtitle max-w-xs tablet:max-w-sm">
        Exceptional craftsmanship and a shared pursuit of timeless design.
      </div>
    </div>
    <div class="mt-6 grid grid-cols-2 gap-3 tablet:grid-cols-3 laptop:grid-cols-4">
      <RouterLink
        v-for="item in artists"
        :key="item.id"
        :to="{ name: 'artists-detail', params: { id: item.id } }"
      >
        <BaseArtistCard :artist="item"></BaseArtistCard
      ></RouterLink>
    </div>
  </div>
</template>

<style scoped></style>

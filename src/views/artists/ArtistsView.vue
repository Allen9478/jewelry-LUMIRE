<script setup>
import BaseArtistCard from '@/components/ui/BaseArtistCard.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import GoldDivider from '@/components/ui/GoldDivider.vue'
import artists from '@/data/artists.json'
</script>
<template>
  <div class="page-container header-offset my-8 space-y-6 tablet:my-12">
    <SectionHeading
      eyebrow="VOICES IN GOLD AND STONE"
      title="The Artists"
      titleTag="h1"
      titleClass="py-4"
      desc="Exceptional craftsmanship and a shared pursuit of timeless design."
      descClass="max-w-3/4 tablet:max-w-full"
    />
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

<script setup>
import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'
import artists from '@/data/artists.json'
import works from '@/data/works.json'
import BaseWorkCard from '@/components/ui/BaseWorkCard.vue'
import ArtistHero from '@/components/artist-detail/ArtistHero.vue'
import ArtistInfo from '@/components/artist-detail/ArtistInfo.vue'
import ArtistQuote from '@/components/artist-detail/ArtistQuote.vue'

const route = useRoute()

const artist = computed(() => artists.find((a) => a.id === route.params.id))
const work = computed(() => works.filter((w) => w.designer === artist.value.name))
const collectionTitles = computed(() => {
  return artist.value.collections.map((item) => item.split(' — ')[0].trim())
})

// 父層自己拿子元件實例
const artistInfoRef = ref(null)

const scrollToInfo = () => {
  artistInfoRef.value?.infoSectionRef?.scrollIntoView({ behavior: 'smooth' })
}
</script>
<template>
  <div v-if="artist">
    <ArtistHero :artist="artist" @scroll-to-info="scrollToInfo" />

    <div
      class="relative page-container artist-detail__heading space-y-16 tablet:space-y-24 tablet:-mt-32"
    >
      <div class="artist-detail__heading-group space-y-2">
        <h1 class="text-display font-italic italic">{{ artist.name }}</h1>
        <p class="text-eyebrow text-gold-500">{{ artist.current_residence }}</p>
      </div>
    </div>
    <ArtistInfo ref="artistInfoRef" :artist="artist" :collection-titles="collectionTitles" />
    <div class="page-container workdetail-related-works my-8 tablet:my-10 tablet:mb-6">
      <p
        v-fade-in="{ delay: 460, y: 16, mobile: { delay: 0, y: 12 } }"
        class="text-eyebrow text-gold-500 py-4 tablet:py-8"
      >
        SELECTED WORKS
      </p>
      <div
        class="grid grid-cols-1 tablet:grid-cols-3 desktop:grid-cols-4 tablet:justify-items-center py-8 tablet:py-16 gap-6 tablet:gap-6"
      >
        <div
          v-for="(w, i) in work"
          v-fade-in="{ delay: i * 100, y: 24, mobile: { delay: i * 60, y: 16 } }"
          :key="w.id"
          class="flex w-full justify-center"
        >
          <BaseWorkCard :work="w" />
        </div>
      </div>
    </div>
    <ArtistQuote :artist="artist" />
  </div>
</template>

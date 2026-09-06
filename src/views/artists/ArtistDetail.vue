<script setup>
import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'
import artists from '@/data/artists.json'
import works from '@/data/works.json'
import BaseWorkCard from '@/components/ui/BaseWorkCard.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import ItemGrid from '@/components/ui/ItemGrid.vue'
import ArtistHero from '@/components/artist-detail/ArtistHero.vue'
import ArtistInfo from '@/components/artist-detail/ArtistInfo.vue'
import QuoteBlock from '@/components/ui/QuoteBlock.vue'

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
  <div v-if="artist" class="flex flex-col gap-8 tablet:gap-12">
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

    <section class="page-container space-y-8 tablet:space-y-12">
      <SectionHeading eyebrow="SELECTED WORKS" title="Pieces of Distinction" />
      <ItemGrid :items="work" grid-class="grid-cols-1 tablet:grid-cols-3 desktop:grid-cols-4">
        <template #default="{ item }">
          <BaseWorkCard :work="item" />
        </template>
      </ItemGrid>
    </section>
    <QuoteBlock variant="artist" :quote="artist.quote" :author="artist.name" />
  </div>
</template>

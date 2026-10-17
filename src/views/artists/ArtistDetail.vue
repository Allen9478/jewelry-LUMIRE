<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocalized } from '@/composables/useLocalized'
import { getArtistById, getWorksByDesigner } from '@/data'
import BaseWorkCard from '@/components/ui/BaseWorkCard.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import ItemGrid from '@/components/ui/ItemGrid.vue'
import ArtistHero from '@/components/artist-detail/ArtistHero.vue'
import ArtistInfo from '@/components/artist-detail/ArtistInfo.vue'
import QuoteBlock from '@/components/ui/QuoteBlock.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const route = useRoute()
const { t } = useI18n()
const { localized } = useLocalized()
const artist = computed(() => getArtistById(String(route.params.id)))
const work = computed(() => (artist.value ? getWorksByDesigner(artist.value.name) : []))
const collectionTitles = computed(
  () =>
    artist.value?.collections.map((item) => {
      const text = localized(item)
      return text.split(/\s*[—–]\s*/)[0]?.trim() ?? text
    }) ?? [],
)

const artistInfoRef = ref<InstanceType<typeof ArtistInfo> | null>(null)

const scrollToInfo = () => {
  artistInfoRef.value?.infoSectionRef?.scrollIntoView({ behavior: 'smooth' })
}
</script>
<template>
  <div v-if="artist" class="flex flex-col gap-8 tablet:gap-12">
    <ArtistHero :artist="artist" @scroll-to-info="scrollToInfo" />

    <div
      class="relative page-container artist-detail__heading space-y-16 tablet:space-y-24 tablet:-mt-40"
    >
      <div class="artist-detail__heading-group space-y-2">
        <h1
          v-fade-in="{ delay: 0, y: 20, duration: 900, mobile: { y: 14 } }"
          class="text-display font-italic italic"
        >
          {{ artist.name }}
        </h1>
        <p
          v-fade-in="{ delay: 100, y: 12, mobile: { delay: 80, y: 10 } }"
          class="text-eyebrow text-gold-500"
        >
          {{ localized(artist.current_residence) }}
        </p>
      </div>
    </div>
    <ArtistInfo ref="artistInfoRef" :artist="artist" :collection-titles="collectionTitles" />

    <section class="page-container space-y-8 tablet:space-y-12">
      <SectionHeading
        :eyebrow="t('page.artistDetail.selectedWorks')"
        :title="t('page.artistDetail.selectedWorksSubtitle')"
      />
      <ItemGrid :items="work" grid-class="grid-cols-1 tablet:grid-cols-3 desktop:grid-cols-4">
        <template #default="{ item }">
          <BaseWorkCard :work="item" />
        </template>
      </ItemGrid>
    </section>
    <QuoteBlock variant="artist" :quote="localized(artist.quote)" :author="artist.name" />
  </div>
  <NotFoundView v-else />
</template>

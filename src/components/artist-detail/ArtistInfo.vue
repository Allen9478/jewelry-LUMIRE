<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocalized } from '@/composables/useLocalized'
import type { ArtistItem } from '@/types/artist'

const { t } = useI18n()
const { localized } = useLocalized()
const infoSectionRef = ref<HTMLElement | null>(null)

defineProps<{
  artist: ArtistItem
  collectionTitles: string[]
}>()

defineExpose({ infoSectionRef })
</script>
<template>
  <div
    ref="infoSectionRef"
    class="page-container artist-detail__info mt-12 tablet:mt-24 space-y-6 tablet:grid tablet:grid-cols-[minmax(0,600px)_1fr] tablet:max-w-[1200px] tablet:mx-auto tablet:gap-24 desktop:gap-48"
  >
    <div
      v-fade-in="{ delay: 0, y: 16, mobile: { delay: 0, y: 12 } }"
      class="artist-detail__info-content space-y-4"
    >
      <p class="text-eyebrow text-gold-500">{{ t('page.artistDetail.biography') }}</p>
      <p v-html="localized(artist.biography)"></p>
    </div>
    <div class="artist-detail__info-group space-y-6 tablet:max-w-xs">
      <div
        v-fade-in="{ delay: 80, y: 12, mobile: { delay: 0, y: 12 } }"
        class="artist-detail__info-group-born space-y-2"
      >
        <p class="text-eyebrow text-gold-500">{{ t('page.artistDetail.born') }}</p>
        <p>{{ localized(artist.birth_year_and_nationality) }}</p>
      </div>
      <div
        v-fade-in="{ delay: 140, y: 12, mobile: { delay: 40, y: 12 } }"
        class="artist-detail__info-group-based space-y-2"
      >
        <p class="text-eyebrow text-gold-500">{{ t('page.artistDetail.based') }}</p>
        <p>{{ localized(artist.current_residence) }}</p>
      </div>
      <div
        v-fade-in="{ delay: 200, y: 12, mobile: { delay: 80, y: 12 } }"
        class="artist-detail__info-group-style space-y-2"
      >
        <p class="text-eyebrow text-gold-500">{{ t('page.artistDetail.medium') }}</p>
        <p v-for="(item, index) in artist.medium" :key="index">{{ localized(item) }}</p>
      </div>
      <div
        v-fade-in="{ delay: 260, y: 12, mobile: { delay: 120, y: 12 } }"
        class="artist-detail__info-group-collections space-y-2"
      >
        <p class="text-eyebrow text-gold-500">{{ t('page.artistDetail.collections') }}</p>
        <p v-for="(item, index) in collectionTitles" :key="index">{{ item }}</p>
      </div>
    </div>
  </div>
</template>

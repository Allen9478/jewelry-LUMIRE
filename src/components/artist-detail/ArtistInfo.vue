<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useLocalized } from '@/composables/useLocalized'
import type { ArtistItem } from '@/types/artist'

const { t } = useI18n()
const { localized } = useLocalized()

defineProps<{
  artist: ArtistItem
  collectionTitles: string[]
}>()
</script>
<template>
  <div
    class="page-container artist-detail__info mt-12 tablet:mt-24 space-y-6 tablet:grid tablet:grid-cols-[minmax(0,500px)_1fr] tablet:justify-items-center tablet:max-w-[1200px] tablet:gap-20"
  >
    <div
      v-fade-in="{ delay: 0, y: 16, mobile: { delay: 0, y: 12 } }"
      class="artist-detail__info-content space-y-4"
    >
      <h2 class="text-eyebrow text-gold-500">{{ t('page.artistDetail.biography') }}</h2>
      <p v-html="localized(artist.biography)"></p>
    </div>

    <dl class="artist-detail__info-group space-y-6 tablet:max-w-[180px]">
      <div
        v-fade-in="{ delay: 80, y: 12, mobile: { delay: 0, y: 12 } }"
        class="artist-detail__info-group-born space-y-2"
      >
        <dt class="text-eyebrow text-gold-500">{{ t('page.artistDetail.born') }}</dt>
        <dd>{{ localized(artist.birth_year_and_nationality) }}</dd>
      </div>
      <div
        v-fade-in="{ delay: 140, y: 12, mobile: { delay: 40, y: 12 } }"
        class="artist-detail__info-group-based space-y-2"
      >
        <dt class="text-eyebrow text-gold-500">{{ t('page.artistDetail.based') }}</dt>
        <dd>{{ localized(artist.current_residence) }}</dd>
      </div>
      <div
        v-fade-in="{ delay: 200, y: 12, mobile: { delay: 80, y: 12 } }"
        class="artist-detail__info-group-style space-y-2"
      >
        <dt class="text-eyebrow text-gold-500">{{ t('page.artistDetail.medium') }}</dt>
        <dd v-for="(item, index) in artist.medium" :key="index">{{ localized(item) }}</dd>
      </div>
      <div
        v-fade-in="{ delay: 260, y: 12, mobile: { delay: 120, y: 12 } }"
        class="artist-detail__info-group-collections space-y-2"
      >
        <dl class="text-eyebrow text-gold-500">{{ t('page.artistDetail.collections') }}</dl>
        <dd v-for="(item, index) in collectionTitles" :key="index">{{ item }}</dd>
      </div>
    </dl>
  </div>
</template>

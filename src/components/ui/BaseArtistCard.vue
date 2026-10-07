<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useLocalized } from '@/composables/useLocalized'
import getImageUrl from '@/utils/getImageUrl'
import BaseArrowIcon from '@/components/ui/BaseArrowIcon.vue'
import type { ArtistItem } from '@/types/artist'

const { t } = useI18n()
const { localized } = useLocalized()

defineProps<{
  artist: ArtistItem
}>()
</script>
<template>
  <div
    class="card w-full overflow-hidden border border-gold-500/40 hover:border-gold-500 hover:-translate-y-2 hover:shadow-gold-glow active:border-gold-500 active:shadow-gold-glow duration-300 transition-all group"
  >
    <div class="aspect-[4/5] tablet:aspect-[3/4]">
      <img
        :src="getImageUrl(`artists/${artist.image}`)"
        :alt="artist.name"
        fetchpriority="high"
        width="1122"
        height="1402"
        class="object-cover object-top w-full h-full group-hover:scale-105 transition-all duration-300"
      />
    </div>
    <div class="card__body px-4 py-2 tablet:px-8">
      <h2
        class="text-xl ipad:text-2xl desktop:text-3xl ipad:tracking-normal font-serif text-gold-500 tablet:text-cream group-hover:text-gold-500 group-active:text-gold-500 duration-200 transition-all"
      >
        {{ artist.name }}
      </h2>
      <div
        class="flex flex-col tablet:flex-row tablet:items-center mt-1 laptop:mt-2 tracking-wider group-hover:text-gold-500 duration-200 transition-all"
      >
        <p class="text-label laptop:text-label-lg">{{ localized(artist.current_residence) }}</p>
        <span class="text-3xl hidden tablet:inline tablet:mx-1 desktop:mx-3">·</span>
        <p class="text-label laptop:text-label-lg py-1">{{ localized(artist.works) }}</p>
      </div>
      <div
        class="mt-2 hidden tablet:mb-3 tablet:flex items-center group-hover:text-gold-500 duration-200 transition-all"
      >
        <p class="text-label desktop:text-label-lg tracking-wider">
          {{ t('page.artists.viewProfile') }}
        </p>
        <BaseArrowIcon class="tablet:ml-2 desktop:mr-15" sizeClass="size-6" />
      </div>
    </div>
  </div>
</template>

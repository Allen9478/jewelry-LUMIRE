<script setup lang="ts">
import { computed } from 'vue'
import { useScopedI18n, useCommonI18n } from '@/composables/useScopedI18n'
import { artists } from '@/data'
import artistPortrait from '@/assets/images/artists/yu_an_lin-profilesmall.webp'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseArrowIcon from '@/components/ui/BaseArrowIcon.vue'

const { tx, txList } = useScopedI18n('page.exhibitions')
const { tx: txCommon } = useCommonI18n()
const artistExample = artists.find((a) => a.id === 'yu_an_lin')
const artistBio = computed(() => txList('featuredArtist.bio'))
</script>

<template>
  <section
    v-fade-in="{ delay: 0, y: 20, mobile: { delay: 0, y: 14 } }"
    class="exhibitions__artist page-container space-y-4"
  >
    <p class="tablet:hidden text-subhead text-gold-500">
      {{ tx('featuredArtistLabel') }}
    </p>
    <div
      v-if="artistExample"
      class="exhibitions__artist-grid grid justify-items-center grid-cols-[40%_60%] tablet:grid-cols-[50%_50%] laptop:grid-cols-[40%_60%] desktop:grid-cols-[30%_70%]"
    >
      <div
        class="exhibitions__artist-photo aspect-[3/4] max-h-[350px] tablet:max-h-[500px] overflow-hidden"
      >
        <img
          :src="artistPortrait"
          :alt="tx('alt.artistPortrait')"
          class="w-full h-full object-cover"
        />
      </div>

      <div
        class="exhibitions__artist-info flex flex-col justify-center gap-6 tablet:gap-8 tablet:px-4 laptop:gap-10"
      >
        <p class="hidden tablet:block text-subhead text-gold-500">
          {{ tx('featuredArtistLabel') }}
        </p>

        <h2 class="exhibitions__artist-name text-heading-sm font-serif">
          {{ tx('featuredArtist.name') }}
        </h2>
        <div class="exhibitions__artist-meta flex text-body text-cream/85">
          <p class="pr-2 border-r border-gold-500/60 text-body-sm tablet:text-body">
            {{ tx('featuredArtist.country') }}
          </p>
          <p class="pl-2 text-body-sm tablet:text-body">{{ tx('featuredArtist.title') }}</p>
        </div>
        <p
          v-for="(bio, index) in artistBio"
          :key="index"
          class="exhibitions__artist-bio hidden tablet:block text-label tablet:text-label-lg text-gray-muted"
        >
          {{ bio }}
        </p>
        <BaseButton
          tag="RouterLink"
          :to="`/artists/${artistExample.id}`"
          variant="ghost"
          class="exhibitions__artist-link inline-flex justify-start items-center text-body-sm"
          ><span class="text-btn tablet:text-btn-lg normal-case">
            {{ txCommon('viewArtistProfile') }}
          </span>
          <BaseArrowIcon />
        </BaseButton>
      </div>
    </div>
  </section>
</template>

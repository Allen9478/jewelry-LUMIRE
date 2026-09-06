<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import works from '@/data/works.json'
import artists from '@/data/artists.json'
import BaseAvatar from '@/components/ui/BaseAvatar.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseWorkCard from '@/components/ui/BaseWorkCard.vue'
import getImageUrl from '@/utils/getImageUrl'

const route = useRoute()
const work = computed(() => works.find((w) => w.id === route.params.id))
const artist = computed(() => artists.find((a) => a.name === work.value.designer))

function getOtherWorks() {
  return works.filter((w) => w.designer === artist.value.name && w.id !== work.value.id).slice(0, 3)
}
</script>
<template>
  <div
    v-if="work"
    class="page-container workdetail-hero tablet:grid tablet:grid-cols-[50%_1fr] tablet:h-[90dvh] header-offset tablet:mt-2 gap-6"
  >
    <div
      v-fade-in="{ delay: 0, y: 24, mobile: { delay: 0, y: 16 } }"
      class="workdetail-hero__image tablet:w-full tablet:h-full tablet:min-h-0 aspect-[4/5]"
    >
      <!-- 前景:完整圖片 -->
      <img
        :src="getImageUrl(`jewelry/${work.image}`)"
        :alt="work.name"
        class="w-full h-full object-cover"
      />
    </div>
    <div class="workdetail-hero__info tablet:h-full tablet:min-h-0 overflow-hidden">
      <div class="workdetail-hero__info-heading-group flex flex-col gap-6 mt-2 tablet:mt-2">
        <div
          v-fade-in="{ delay: 80, y: 12, mobile: { delay: 40, y: 8 } }"
          class="workdetail-hero__info-eyebrow text-eyebrow text-gold-500"
        >
          WORK DETAIL
        </div>
        <h1
          v-fade-in="{ delay: 140, y: 16, mobile: { delay: 80, y: 12 } }"
          class="workdetail-hero__info-heading text-heading-sm font-serif italic"
        >
          {{ work.name }}
        </h1>
        <dl
          v-fade-in="{ delay: 220, y: 16, mobile: { delay: 120, y: 12 } }"
          class="workdetail-hero__info-specs flex flex-col gap-2 text-label tablet:text-label-lg border-t border-gold-500/10"
        >
          <div class="flex justify-between items-center gap-4 py-2 border-b border-gold-500/10">
            <dt class="text-white/50 uppercase tracking-wide shrink-0">Materials</dt>
            <dd class="text-white text-right">{{ work.materials }}</dd>
          </div>
          <div class="flex justify-between gap-4 py-2 border-b border-gold-500/10">
            <dt class="text-white/50 uppercase tracking-wide shrink-0">Year</dt>
            <dd class="text-white text-right">2026</dd>
          </div>
          <div class="flex justify-between gap-4 py-2 border-b border-gold-500/10">
            <dt class="text-white/50 uppercase tracking-wide shrink-0">Collection</dt>
            <dd class="text-white text-right">Nature's Forms</dd>
          </div>
        </dl>
        <p
          v-fade-in="{ delay: 300, y: 16, mobile: { delay: 160, y: 12 } }"
          class="workdetail-hero__info-description text-label tablet:text-body-sm tablet:pt-4 text-cream/80 tablet:line-clamp-4"
        >
          {{ work.description }}
        </p>
      </div>

      <div
        v-fade-in="{ delay: 380, y: 20, mobile: { delay: 200, y: 14 } }"
        class="workdetail-hero__artist my-8"
      >
        <p class="text-eyebrow text-gold-500">ABOUT THE ARTIST</p>
        <div v-if="artist" class="workdetail-hero__artist-grid grid grid-cols-[35%_65%] mt-4">
          <BaseAvatar :artist="artist" :show-name="false" class="justify-center" />
          <div class="workdetail-hero__artist-info flex flex-col tablet:justify-center gap-4 pl-6">
            <h2 class="workdetail-hero__artist-name text-subhead tablet:text-[24px] font-serif">
              {{ artist.name }}
            </h2>
            <p
              class="workdetail-hero__artist-bio text-label tablet:text-label-lg tablet:line-clamp-3"
            >
              {{ artist.short_bio }}
            </p>
            <BaseButton
              tag="RouterLink"
              :to="`/artists/${artist.id}`"
              v-fade-in="{ delay: 460, y: 16, mobile: { delay: 240, y: 12 } }"
              variant="ghost"
              class="workdetail-hero__artist-link inline-flex justify-start items-center text-body-sm"
              ><span class="text-btn tablet:text-btn-lg normal-case"> View Artist Profile </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6 ml-2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                /></svg
            ></BaseButton>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    class="page-container workdetail-related-works border-y border-gold-500/20 my-8 tablet:my-10 tablet:mb-6"
  >
    <p
      v-fade-in="{ delay: 460, y: 16, mobile: { delay: 0, y: 12 } }"
      class="text-eyebrow text-gold-500 py-4 tablet:py-8"
    >
      RELATED WORKS
    </p>
    <div
      class="grid grid-cols-1 tablet:grid-cols-3 tablet:justify-items-center py-8 tablet:py-16 gap-6 tablet:gap-4"
    >
      <div
        v-for="(work, i) in getOtherWorks()"
        v-fade-in="{ delay: i * 100, y: 24, mobile: { delay: i * 60, y: 16 } }"
        :key="work.id"
        class="flex w-full justify-center"
      >
        <BaseWorkCard :work="work" />
      </div>
    </div>
  </div>
</template>
<style scoped></style>

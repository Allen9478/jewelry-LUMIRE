<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import works from '@/data/works.json'
import artists from '@/data/artists.json'
import BaseArtistAvatar from '@/components/ui/BaseArtistAvatar.vue'
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
    class="page-wrapper workdetail-hero tablet:grid grid-cols-[60%_1fr] tablet:h-[80vh] tablet:mt-4 gap-6"
  >
    <img
      :src="getImageUrl(`jewelry/${work.image}`)"
      :alt="work.name"
      class="workdetail-hero_image tablet:w-full tablet:h-full object-contain overflow-hidden"
    />
    <div class="workdetail-hero__info tablet:h-full">
      <div class="workdeatail-hero__info__heading-group flex flex-col gap-5">
        <div class="workdetail-hero__info__eyebrow text-eyebrow text-gold-500">WORK DETAIL</div>
        <h1 class="workdetail-hero__info__heading text-heading-sm">{{ work.name }}</h1>
        <dl
          class="workdetail-hero__specs flex flex-col gap-2 text-[12px] border-t border-gold-500/10"
        >
          <div class="flex justify-between items-center gap-4 py-2 border-b border-gold-500/10">
            <dt class="text-white/50 uppercase tracking-wide shrink-0">Materials</dt>
            <dd class="text-white text-right">{{ work.materials }}</dd>
          </div>
          <div class="flex justify-between gap-4 py-2 border-b border-gold-500/10">
            <dt class="text-white/50 uppercase tracking-wide shrink-0">Year</dt>
            <dd class="text-white text-left">2026</dd>
          </div>
          <div class="flex justify-between gap-4 py-2 border-b border-gold-500/10">
            <dt class="text-white/50 uppercase tracking-wide shrink-0">Collection</dt>
            <dd class="text-white text-right">Nature's Forms</dd>
          </div>
        </dl>
        <p class="workdetail-hero__info__description">{{ work.description }}</p>
      </div>

      <div class="workdetail-hero__artist my-5">
        <p class="text-eyebrow text-gold-500">ABOUT THE ARTIST</p>
        <div
          v-if="artist"
          class="workdetail-hero__artist__info-group grid grid-cols-[35%_65%] mt-2"
        >
          <BaseArtistAvatar :artist="artist" :show-name="false" class="justify-center" />
          <div class="artist__info flex flex-col gap-3 pl-6">
            <h2 class="artist__info__name text-heading-sm">{{ artist.name }}</h2>
            <p class="artist__info__bio text-[12px]">{{ artist.short_bio }}</p>
            <BaseButton
              tag="RouterLink"
              :to="`/artists/${artist.id}`"
              v-fade-in="{ delay: 80, y: 16 }"
              variant="ghost"
              class="home-artists-section__view-all inline-flex justify-start items-center text-body-sm"
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
  <div class="page-wrapper workdetail-related-works">
    <p class="text-eyebrow text-gold-500">Related Works</p>
    <div class="grid grid-cols-1 tablet:grid-cols-3 tablet:justify-items-center gap-6">
      <BaseWorkCard v-for="work in getOtherWorks()" :key="work.id" :work="work" />
    </div>
  </div>
</template>

<style scoped></style>

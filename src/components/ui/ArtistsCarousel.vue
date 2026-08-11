<script setup>
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import getImageUrl from '@/utils/getImageUrl'
import artists from '@/data/artists.json'
import works from '@/data/works.json'
import GoldDivider from '@/components/ui/GoldDivider.vue'

function getArtistWorks(artistName) {
  return works.filter((w) => w.designer === artistName).slice(0, 3)
}
</script>

<template>
  <section class="@container artists-carousel relative w-full mb-5 overflow-hidden">
    <GoldDivider variant="full" />
    <Carousel
      :items-to-show="1"
      :wrap-around="true"
      :autoplay="5000"
      :pause-autoplay-on-hover="true"
      :transition="600"
    >
      <Slide v-for="artist in artists" :key="artist.id">
        <div
          class="artists-carousel__slide grid grid-cols-[50%_50%] tablet:grid-cols-[25%_30%_45%] w-full"
        >
          <div
            class="artists-carousel__image-wrap relative aspect-[3/5] tablet:aspect-[4/5] overflow-hidden"
          >
            <img
              :src="getImageUrl(`artists/${artist.image_detail}`)"
              :alt="artist.name"
              class="artists-carousel__image w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <div class="artists-carousel__content flex flex-col p-8 tablet:p-12 bg-black">
            <div class="artists-carousel__text flex flex-col gap-4 my-auto">
              <p
                class="artists-carousel__eyebrow uppercase text-gold-500 text-[11px] tablet:text-eyebrow"
              >
                FEATURED ARTIST
              </p>

              <h2
                class="artists-carousel__name font-serif text-white text-[18px] tablet:text-heading-sm"
              >
                {{ artist.name }}
              </h2>

              <p
                class="artists-carousel__bio text-gray-muted text-[13px] tablet:text-subtext line-clamp-3 leading-relaxed tablet:max-w-md"
              >
                {{ artist.short_bio }}
              </p>
            </div>
            <RouterLink
              :to="{ name: 'artists-detail', params: { id: artist.id } }"
              class="artists-carousel__link inline-flex items-center text-gold-500 hover:text-gold-300 transition-colors"
            >
              <span class="text-[11px] tablet:text-btn whitespace-nowrap">VIEW PROFILE</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-5 ml-2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                />
              </svg>
            </RouterLink>
          </div>
          <div
            class="hidden tablet:flex flex-col justify-center gap-3 border-l border-gold-500/20 p-8"
          >
            <p class="text-eyebrow uppercase text-gold-500">Signature pieces</p>
            <div class="hidden tablet:flex gap-3">
              <RouterLink
                v-for="work in getArtistWorks(artist.name)"
                :key="work.id"
                :to="{ name: 'work-detail', params: { id: work.id } }"
                class="flex-1 aspect-square overflow-hidden border border-gold-500/20 hover:border-gold-500/60 transition-colors"
              >
                <img
                  :src="getImageUrl(`jewelry/${work.image}`)"
                  :alt="work.name"
                  class="w-full h-full object-cover"
                  loading="lazy"
                />
              </RouterLink>
            </div>
          </div>
        </div>
      </Slide>

      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>
    <GoldDivider variant="full" />
  </section>
</template>

<style scoped>
/* ---------- 覆蓋 vue3-carousel 預設樣式，改成符合金色主題 ---------- */

/* 左右箭頭：預設隱藏，hover 到整個輪播區塊才淡入 */
.artists-carousel :deep(.carousel__prev),
.artists-carousel :deep(.carousel__next) {
  opacity: 0;
  transition: opacity 0.3s ease;
  color: var(--color-gold-500, #c9a24b);
  background: rgba(0, 0, 0, 0.35);
  border-radius: 9999px;
  width: 44px;
  height: 44px;
}

.artists-carousel:hover :deep(.carousel__prev),
.artists-carousel:hover :deep(.carousel__next) {
  opacity: 1;
}

.artists-carousel :deep(.carousel__prev:hover),
.artists-carousel :deep(.carousel__next:hover) {
  color: #fff;
  background: rgba(0, 0, 0, 0.55);
}

/* 底部小圓點：改成細線條風格，貼合設計語彙（跟 GoldDivider 呼應） */
.artists-carousel :deep(.carousel__pagination) {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  gap: 8px;
}

.artists-carousel :deep(.carousel__pagination-button) {
  width: 24px;
  height: 2px;
  background: rgba(201, 162, 75, 0.3);
  border-radius: 0;
  transition: background 0.3s ease;
}

.artists-carousel :deep(.carousel__pagination-button--active) {
  background: var(--color-gold-500, #c9a24b);
}
</style>

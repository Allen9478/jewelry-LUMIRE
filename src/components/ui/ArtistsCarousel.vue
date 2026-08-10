<script setup>
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import getImageUrl from '@/utils/getImageUrl'
import artists from '@/data/artists.json'
</script>

<template>
  <section class="artists-carousel relative w-full overflow-hidden">
    <Carousel
      :items-to-show="1"
      :wrap-around="true"
      :autoplay="5000"
      :pause-autoplay-on-hover="true"
      :transition="600"
    >
      <Slide v-for="artist in artists" :key="artist.id">
        <div
          class="artists-carousel__slide grid grid-cols-[50%_50%] tablet:grid-cols-[30%_70%] w-full"
        >
          <div
            class="artists-carousel__image-wrap relative aspect-[4/5] tablet:aspect-[4/5] overflow-hidden"
          >
            <img
              :src="getImageUrl(`artists/${artist.image_detail}`)"
              :alt="artist.name"
              class="artists-carousel__image w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <div
            class="artists-carousel__content flex flex-col justify-center gap-2 p-8 tablet:p-12 bg-black"
          >
            <p
              class="artists-carousel__eyebrow uppercase text-gold-500"
              style="
                font-size: var(--text-eyebrow);
                letter-spacing: var(--text-eyebrow--letter-spacing);
              "
            >
              FEATURED ARTIST
            </p>

            <h2 class="artists-carousel__name font-serif text-white text-heading-sm">
              {{ artist.name }}
            </h2>

            <p
              class="artists-carousel__bio text-gray-muted"
              style="font-size: var(--text-subtext); line-height: var(--text-subtext--line-height)"
            >
              {{ artist.design_style }}
            </p>

            <RouterLink
              class="artists-carousel__link inline-flex items-center mt-3 text-gold-500 hover:text-gold-300 transition-colors"
            >
              <span class="text-btn">VIEW ARTIST PROFILE</span>
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
        </div>
      </Slide>

      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>
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
  bottom: 20px;
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

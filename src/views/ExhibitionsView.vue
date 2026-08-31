<script setup>
import heroImage from '@/assets/images/exhibition/exhibition-hero拷貝.webp'
import visitImage from '@/assets/images/exhibition/exhibition-location拷貝.webp'
import ItemGrid from '@/components/ui/ItemGrid.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import BaseWorkCard from '@/components/ui/BaseWorkCard.vue'
import BaseArtistAvatar from '@/components/ui/BaseArtistAvatar.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import getImageUrl from '@/utils/getImageUrl'
import GoldDivider from '@/components/ui/GoldDivider.vue'
import exhibitions from '@/data/exhibitions.json'
import works from '@/data/works.json'
import artists from '@/data/artists.json'

console.log('artists 原始資料:', artists)
console.log('第一筆資料長相:', artists[0])

const artistExample = artists.find((a) => a.id === 'yu_an_lin')
console.log('找到的結果:', artistExample)

function randomWorks(arr, count) {
  const work = [...arr]
  let i = arr.length
  const min = i - count

  while (i-- > min) {
    const index = Math.floor((i + 1) * Math.random())

    const temp = work[index]
    work[index] = work[i]
    work[i] = temp
  }

  return work.slice(min)
}
const fuckData = randomWorks(works, 3)
</script>
<template>
  <div class="exhibitions space-y-10">
    <div class="exhibitions__hero relative w-full h-[250px] md:h-[600px] overflow-hidden">
      <img
        :src="heroImage"
        :alt="natural"
        class="absolute inset-0 w-full h-full object-cover object-center"
      />

      <div
        class="absolute inset-0 bg-gradient-to-t from-black/100 via-black/20 to-transparent"
      ></div>
      <SectionHeading
        :eyebrow="exhibitions.status"
        :title="exhibitions.title"
        :desc="exhibitions.subtitle"
        class="page-container absolute bottom-0 tablet:bottom-12 tablet:left-12 z-10"
      />
      <!-- <div class="page-container absolute bottom-0 tablet:bottom-12 tablet:left-12 z-10 text-white">
        <p class="text-gold-500 text-sm tracking-widest">CURRENT EXHIBITION</p>
        <h1 class="font-serif italic text-heading">{{ exhibitions.title }}</h1>
        <p class="text-gray-300">International Jewelry Exhibition 2026</p>
      </div> -->
    </div>
    <div
      class="exhibitions__info page-container flex flex-col tablet:flex-row my-6 space-y-4 text-cream/80"
    >
      <p class="flex space-x-4 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6 text-gold-500"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
          />
        </svg>
        <span>{{ exhibitions.date }}</span>
      </p>
      <p class="flex space-x-4 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6 text-gold-500"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>
        <span>{{ exhibitions.location }}</span>
      </p>
      <p class="flex space-x-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6 text-gold-500"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>

        <span>{{ exhibitions.hours }}</span>
      </p>
    </div>
    <div class="exhibitions__quote page-container">
      <p class="relative texttt text-heading-sm text-gold-500 p-8 italic">
        {{ exhibitions.quote }}
      </p>
      <p v-for="(description, index) in exhibitions.description" :key="index">
        {{ description }}
      </p>
    </div>
    <section class="exhibitions__works page-container">
      <p class="text-subhead text-gold-500 my-4">WORK IN EXHIBITIONS</p>
      <ItemGrid :items="fuckData" grid-class="grid-cols-1 tablet:grid-cols-3 desktop:grid-cols-4">
        <template #default="{ item }">
          <BaseWorkCard :work="item" />
        </template>
      </ItemGrid>
    </section>
    <!-- 從別的頁面搬過來的看看樣式先 -->
    <div
      v-fade-in="{ delay: 380, y: 20, mobile: { delay: 200, y: 14 } }"
      class="exhibitions__artist page-container"
    >
      <p class="text-subhead text-gold-500">ABOUT THE ARTIST</p>
      <div v-if="artistExample" class="workdetail-hero__artist-grid grid grid-cols-[35%_65%] mt-4">
        <BaseArtistAvatar :artist="artistExample" :show-name="false" class="justify-center" />
        <div class="workdetail-hero__artist-info flex flex-col tablet:justify-center gap-4 pl-6">
          <h2 class="workdetail-hero__artist-name text-subhead tablet:text-[24px] font-serif">
            {{ artistExample.name }}
          </h2>
          <p
            class="workdetail-hero__artist-bio text-label tablet:text-label-lg tablet:line-clamp-3"
          >
            {{ artistExample.short_bio }}
          </p>
          <BaseButton
            tag="RouterLink"
            :to="`/artists/${artistExample.id}`"
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
    <!-- 先寫股價樣式明天記得條 -->
    <section class="exhibitions__visit flex flex-col">
      <h2 class="text-gold-500 text-subhead page-container">VISIT</h2>
      <div class="exhibitions__visit-group flex flex-col tablet:grid tablet:grid-cols-[3fr_4fr]">
        <div
          class="exhibitions__visit-info page-container flex flex-col gap-8 p-10 tablet:justify-center tablet:p-16"
        >
          <div class="flex space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-10 text-gold-500"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>
            <div class="flex flex-col">
              <span>{{ exhibitions.visit.name }}</span>
              <span>{{ exhibitions.visit.address }}</span>
            </div>
          </div>
          <div class="flex space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-10 text-gold-500"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>

            <div class="flex flex-col">
              <span>{{ exhibitions.visit.viewing }}</span>
              <span>{{ exhibitions.visit.description }}</span>
            </div>
          </div>
          <BaseButton>
            <span class="text-btn tablet:text-btn-lg">{{ exhibitions.visit.button }}</span>
          </BaseButton>
        </div>
        <div
          class="exhibitions__visit-img-wrap relative aspect-[16/7] tablet:aspect-auto tablet:h-full"
        >
          <img
            :src="visitImage"
            :alt="visit"
            class="exhibitions__visit-img w-full h-full object-cover object-center tablet:absolute tablet:inset-0"
          />
        </div>
      </div>
    </section>
    <section class="exhibitions__pastExhibitions page-container">
      <h2 class="text-gold-500 text-subhead my-4">PAST EXHIBITIONS</h2>
      <div class="exhibitions__pastExhibitions-group flex flex-col space-y-2">
        <div
          v-for="(pastExhibitions, index) in exhibitions.pastExhibitions"
          :key="index"
          class="pastExhibitions__item flex border border-gold-500/20"
        >
          <img :src="getImageUrl(`exhibition/${pastExhibitions.img}`)" class="w-1/4 object-cover" />
          <div class="pastExhibitions__item-info w-3/4 px-12">
            <p>{{ pastExhibitions.title }}</p>
            <span class="text-label">{{ pastExhibitions.subtitle }}</span>
          </div>
        </div>
      </div>
    </section>
    <GoldDivider class="mb-10" />
  </div>
</template>

<style scoped>
/* 大引號通用設定 */
.texttt::before,
.texttt::after {
  color: #d4af37;
  font-size: 60px;
  font-family: 'Georgia', serif;
  position: absolute;
  line-height: 0;
}

/* 左引號（開頭） */
.texttt::before {
  content: '“';
  top: 30px;
  left: 0;
}

/* 右引號（結尾） */
.texttt::after {
  content: '”';
  bottom: 0;
  right: 8px;
}
</style>

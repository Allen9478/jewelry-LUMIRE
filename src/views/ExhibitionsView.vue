<script setup>
import heroImage from '@/assets/images/exhibition/exhibition-hero拷貝.webp'
import visitImage from '@/assets/images/exhibition/exhibition-location拷貝.webp'
import ItemGrid from '@/components/ui/ItemGrid.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import BaseWorkCard from '@/components/ui/BaseWorkCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import getImageUrl from '@/utils/getImageUrl'
import GoldDivider from '@/components/ui/GoldDivider.vue'
import exhibitions from '@/data/exhibitions.json'
import works from '@/data/works.json'
import artists from '@/data/artists.json'

const artistExample = artists.find((a) => a.id === 'yu_an_lin')

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
const fuckData = randomWorks(works, 6)
</script>
<template>
  <div class="exhibitions flex flex-col gap-8 desktop:gap-12">
    <div class="exhibitions__hero relative w-full h-[350px] md:h-[600px] overflow-hidden">
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
        class="page-container absolute bottom-0 tablet:bottom-12 tablet:left-4 z-1"
      />
    </div>
    <div
      class="exhibitions__info page-container flex flex-col tablet:flex-row tablet:justify-around space-y-4 tablet:space-y-0 text-cream/80"
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
      <div class="hidden laptop:block w-px h-6 bg-gold-500/60"></div>
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
      <div class="hidden laptop:block w-px h-6 bg-gold-500/60"></div>

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
            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>

        <span>{{ exhibitions.hours }}</span>
      </p>
    </div>
    <div
      class="exhibitions__quote page-container grid tablet:grid-cols-[50%_50%] laptop:grid-cols-[40%_60%] desktop:grid-cols-[35%_65%] wide:grid-cols-[30%_70%] space-y-4 tablet:space-y-0 tablet:space-x-4 wide:mt-24"
    >
      <div class="exhibitions__quote-main relative flex items-center">
        <p
          class="exhibitions__quote-text text-2xl tablet:text-3xl text-gold-500 p-10 tablet:px-8 desktop:px-12 wide:px-16 italic"
        >
          {{ exhibitions.quote }}
        </p>
      </div>
      <div
        class="laptop:w-[90%] flex flex-col tablet:justify-center tablet:border-l tablet:border-gold-500/60 space-y-4 tablet:px-8"
      >
        <p v-for="(description, index) in exhibitions.description" :key="index">
          {{ description }}
        </p>
      </div>
    </div>
    <section
      class="exhibitions__works page-container space-y-6 tablet:space-y-10 desktop:space-y-16"
    >
      <p class="text-subhead text-gold-500">WORK IN EXHIBITIONS</p>
      <ItemGrid
        :items="fuckData"
        grid-class="grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 "
        class=""
      >
        <template #default="{ item }">
          <BaseWorkCard :work="item" />
        </template>
      </ItemGrid>
    </section>
    <section
      v-fade-in="{ delay: 380, y: 20, mobile: { delay: 200, y: 14 } }"
      class="exhibitions__artist page-container"
    >
      <p class="tablet:hidden text-subhead text-gold-500">FEATURED ARTIST</p>
      <div
        v-if="artistExample"
        class="exhibitions__artist-grid grid grid-cols-[40%_60%] tablet:grid-cols-[50%_50%] laptop:grid-cols-[40%_60%] desktop:grid-cols-[30%_70%]"
      >
        <div class="exhibitions__artist-photo aspect-[3/4] max-h-[500px] overflow-hidden">
          <img
            src="../assets/images/artists/yu_an_lin-profilesmall.webp"
            alt="#"
            class="w-full h-full object-cover"
          />
        </div>
        <div class="exhibitions__artist-info flex flex-col justify-center">
          <div class="space-y-4 mt-10 tablet:ml-8 laptop:ml-12 desktop:ml-16">
            <p class="hidden tablet:block text-subhead text-gold-500">FEATURED ARTIST</p>

            <h2 class="exhibitions__artist-name text-heading font-serif">
              {{ artistExample.name }}
            </h2>
            <div class="exhibitions__artist-meta flex text-body text-cream/85">
              <p class="pr-2 border-r border-gold-500/60">
                {{ exhibitions.featuredArtist.country }}
              </p>
              <p class="pl-2">{{ exhibitions.featuredArtist.title }}</p>
            </div>
            <p
              v-for="(bio, index) in exhibitions.featuredArtist.bio"
              :key="index"
              class="exhibitions__artist-bio hidden tablet:block text-label tablet:text-label-lg text-gray-muted"
            >
              {{ bio }}
            </p>
            <BaseButton
              tag="RouterLink"
              :to="`/artists/${artistExample.id}`"
              v-fade-in="{ delay: 460, y: 16, mobile: { delay: 240, y: 12 } }"
              variant="ghost"
              class="exhibitions__artist-link inline-flex justify-start items-center text-body-sm"
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
    </section>
    <!-- 先寫股價樣式明天記得條 -->
    <section class="exhibitions__visit flex flex-col mt-6">
      <h2 class="text-gold-500 text-subhead page-container">VISIT</h2>
      <div
        class="exhibitions__visit-group flex flex-col tablet:grid tablet:grid-cols-[50%_50%] laptop:grid-cols-[45%_55%] desktop:grid-cols-[35%_65%]"
      >
        <div
          class="exhibitions__visit-info page-container flex flex-col justify-center gap-8 p-8 tablet:p-16"
        >
          <div class="flex items-start space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="shrink-0 size-8 text-gold-500"
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
          <div class="flex items-start space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="shrink-0 size-8 text-gold-500"
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
          <BaseButton class="w-72 mx-auto laptop:ml-0">
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

    <section class="exhibitions__past-exhibitions page-container mt-6">
      <h2 class="text-gold-500 text-subhead py-8 tablet:py-10">PAST EXHIBITIONS</h2>
      <div
        class="exhibitions__past-exhibitions-group flex flex-col tablet:flex-row space-y-4 tablet:space-y-0 tablet:space-x-4"
      >
        <div
          v-for="(pastExhibitions, index) in exhibitions.pastExhibitions"
          :key="index"
          class="exhibitions__past-exhibitions-item block relative border border-gold-500/20 tablet:w-1/3 h-[140px] tablet:h-[220px] overflow-hidden transition-all hover:border-gold-500 active:border-gold-500 duration-300 group"
        >
          <img
            :src="getImageUrl(`exhibition/${pastExhibitions.img}`)"
            class="object-cover absolute inset-0 w-full h-full"
          />
          <!-- 桌機版加一層漸層遮罩,讓文字在圖片上更好讀 -->
          <div
            class="block absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
          ></div>

          <div
            class="exhibitions__past-exhibitions-item-info absolute bottom-6 left-6 z-10 w-auto px-0 space-y-2"
          >
            <p
              class="text-subhead group-hover:text-gold-500 group-active:text-gold-500 duration-300"
            >
              {{ pastExhibitions.title }}
            </p>
            <span
              class="text-label text-gray-muted group-hover:text-cream group-active:text-cream duration-300"
              >{{ pastExhibitions.subtitle }}</span
            >
          </div>
        </div>
      </div>
    </section>
    <GoldDivider class="mb-10" />
  </div>
</template>

<style scoped>
.exhibitions__quote-text {
  min-height: calc(1.6em * 3);
  line-height: 1.5;
}

.exhibitions__quote-text::before,
.exhibitions__quote-text::after {
  position: absolute;
  font-size: clamp(36px, 6vw, 60px);
  font-family: 'Georgia', serif;
  line-height: 0;
  color: var(--color-gold-500);
}

.exhibitions__quote-text::before {
  content: '“';
  top: 30px;
  left: 0;
}

.exhibitions__quote-text::after {
  content: '”';
  bottom: 0;
  right: 8px;
}
</style>

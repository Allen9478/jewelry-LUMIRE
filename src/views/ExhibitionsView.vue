<script setup>
import heroImage from '@/assets/images/exhibition/exhibition-hero拷貝.webp'
import ItemGrid from '@/components/ui/ItemGrid.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import BaseWorkCard from '@/components/ui/BaseWorkCard.vue'
import exhibitions from '@/data/exhibitions.json'
import works from '@/data/works.json'
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
  <div class="exhibitions">
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
    <div class="exhibitions__quote page-container space-y-4">
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

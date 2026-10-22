<script setup lang="ts">
import { computed } from 'vue'
import { useScopedI18n, type RtInput } from '@/composables/useScopedI18n'
import getImageUrl from '@/utils/getImageUrl'

// i18n 裡取回來的原始形狀
interface PastExhibitionRaw {
  title: RtInput
  subtitle: RtInput
  img: RtInput
}

// 轉換後給 template 用的形狀
interface PastExhibition {
  title: string
  subtitle: string
  img: string
}

const { tx, txItems } = useScopedI18n('page.exhibitions')
const pastExhibitions = computed(() =>
  txItems<PastExhibitionRaw, PastExhibition>('pastExhibitions', (item, rt) => ({
    title: rt(item.title),
    subtitle: rt(item.subtitle),
    img: rt(item.img),
  })),
)
</script>

<template>
  <section class="exhibitions__past-exhibitions page-container flex flex-col gap-12 tablet:gap-18">
    <h2 v-fade-in="{ delay: 0, y: 12 }" class="text-gold-500 text-subhead">
      {{ tx('pastExhibitionsLabel') }}
    </h2>
    <div
      class="exhibitions__past-exhibitions-group grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-10 tablet:gap-12"
    >
      <div
        v-for="(pastExhibition, index) in pastExhibitions"
        v-fade-in="{
          delay: Math.min(index, 2) * 150,
          y: 24,
          mobile: { delay: 0, y: 16 },
        }"
        :key="index"
        class="exhibitions__past-exhibitions-item block relative border border-gold-500/20 w-full h-[160px] tablet:h-[220px] max-w-[400px] tablet:max-w-[500px] mx-auto overflow-hidden transition-md hover:border-gold-500 active:border-gold-500 duration-500 group"
      >
        <img
          :src="getImageUrl(`exhibition/${pastExhibition.img}`)"
          :alt="pastExhibition.title"
          loading="lazy"
          width="1774"
          height="887"
          class="object-cover absolute inset-0 w-full h-full group-hover:scale-105 transition-all duration-500"
        />
        <!-- 桌機版加一層漸層遮罩,讓文字在圖片上更好讀 -->
        <div
          class="block absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
        ></div>

        <div
          class="exhibitions__past-exhibitions-item-info absolute bottom-6 left-6 z-10 w-auto px-0 space-y-2"
        >
          <p class="text-subhead group-hover:text-gold-500 group-active:text-gold-500 duration-500">
            {{ pastExhibition.title }}
          </p>
          <span
            class="text-label text-gray-muted group-hover:text-cream group-active:text-cream duration-500"
            >{{ pastExhibition.subtitle }}</span
          >
        </div>
      </div>
    </div>
  </section>
</template>

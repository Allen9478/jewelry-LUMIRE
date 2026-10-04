<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocalized } from '@/composables/useLocalized'
import artists from '@/data/artists.json'
import works from '@/data/works.json'
import BaseWorkCard from '@/components/ui/BaseWorkCard.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import ItemGrid from '@/components/ui/ItemGrid.vue'
import ArtistHero from '@/components/artist-detail/ArtistHero.vue'
import ArtistInfo from '@/components/artist-detail/ArtistInfo.vue'
import QuoteBlock from '@/components/ui/QuoteBlock.vue'

const route = useRoute()
const { t, locale } = useI18n()
const { localized } = useLocalized()
const artist = computed(() => artists.find((a) => a.id === route.params.id))
const work = computed(() => works.filter((w) => w.designer === artist.value?.name))
const collectionTitles = computed(() => {
  const lang = locale.value as 'zh-TW' | 'en'
  return (
    artist.value?.collections.map((item) => {
      const text = item[lang]
      // 以破折號（— 或 –）切開，只取前面的系列名稱
      return text.split(/\s*[—–]\s*/)[0]?.trim() ?? text
    }) ?? []
  )
})

// 父層用 ref 拿到子元件 ArtistInfo 的實例（對應模板裡的 ref="artistInfoRef"）
// - typeof ArtistInfo：取得元件本身的型別（建構函式）
// - InstanceType<...>：把它轉成「元件實例」的型別，才能存取實例上公開的屬性
// - | null：元件還沒掛載完成前，ref 的初始值是 null
// 注意：子元件必須用 defineExpose 公開 infoSectionRef，父層才拿得到
const artistInfoRef = ref<InstanceType<typeof ArtistInfo> | null>(null)

const scrollToInfo = () => {
  artistInfoRef.value?.infoSectionRef?.scrollIntoView({ behavior: 'smooth' })
}
</script>
<template>
  <div v-if="artist" class="flex flex-col gap-8 tablet:gap-12">
    <ArtistHero :artist="artist" @scroll-to-info="scrollToInfo" />

    <div
      class="relative page-container artist-detail__heading space-y-16 tablet:space-y-24 tablet:-mt-32"
    >
      <div class="artist-detail__heading-group space-y-2">
        <h1
          v-fade-in="{ delay: 0, y: 20, duration: 900, mobile: { y: 14 } }"
          class="text-display font-italic italic"
        >
          {{ artist.name }}
        </h1>
        <p
          v-fade-in="{ delay: 100, y: 12, mobile: { delay: 80, y: 10 } }"
          class="text-eyebrow text-gold-500"
        >
          {{ localized(artist.current_residence) }}
        </p>
      </div>
    </div>
    <ArtistInfo ref="artistInfoRef" :artist="artist" :collection-titles="collectionTitles" />

    <section class="page-container space-y-8 tablet:space-y-12">
      <SectionHeading
        :eyebrow="t('page.artistDetail.selectedWorks')"
        :title="t('page.artistDetail.selectedWorksSubtitle')"
      />
      <ItemGrid :items="work" grid-class="grid-cols-1 tablet:grid-cols-3 desktop:grid-cols-4">
        <template #default="{ item }">
          <BaseWorkCard :work="item" />
        </template>
      </ItemGrid>
    </section>
    <QuoteBlock variant="artist" :quote="localized(artist.quote)" :author="artist.name" />
  </div>
</template>

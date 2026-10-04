<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import BaseArtistCard from '@/components/ui/BaseArtistCard.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import GoldDivider from '@/components/ui/GoldDivider.vue'
import artists from '@/data/artists.json'

const { t } = useI18n()
</script>
<template>
  <div class="page-container header-offset my-8 space-y-6 tablet:my-12">
    <SectionHeading
      :eyebrow="t('page.artists.heading.eyebrow')"
      :title="t('page.artists.heading.title')"
      titleTag="h1"
      titleClass="py-4"
      :desc="t('page.artists.heading.desc')"
      descClass="max-w-3/4 tablet:max-w-full"
    />
    <div class="mt-6 grid grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-4 gap-4 tablet:gap-8">
      <RouterLink
        v-for="(item, i) in artists"
        v-fade-in="{
          delay: 160 + Math.min(i, 3) * 80,
          y: 24,
          mobile: { delay: 160 + Math.min(i, 3) * 60, y: 16 },
        }"
        :key="item.id"
        :to="{ name: 'artists-detail', params: { id: item.id } }"
      >
        <BaseArtistCard :artist="item"></BaseArtistCard
      ></RouterLink>
    </div>
  </div>
  <GoldDivider variant="full" class="my-12" />
</template>

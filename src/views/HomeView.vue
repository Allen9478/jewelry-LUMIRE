<script setup lang="ts">
import { useScopedI18n } from '@/composables/useScopedI18n'
import HomeHero from '@/components/home/HomeHero.vue'
import HomeBreathing from '@/components/home/HomeBreathing.vue'
import HomeFeaturedWorks from '@/components/home/HomeFeaturedWorks.vue'
import HomeFeaturedArtists from '@/components/home/HomeFeaturedArtists.vue'
import HomeExhibition from '@/components/home/HomeExhibition.vue'
import QuoteBlock from '@/components/ui/QuoteBlock.vue'
import GoldDivider from '@/components/ui/GoldDivider.vue'

const { tx } = useScopedI18n('page.home')
</script>
<template>
  <HomeHero />
  <HomeBreathing class="my-48" />
  <HomeFeaturedWorks />
  <GoldDivider variant="full" class="w-full my-20 tablet:my-40" />
  <HomeFeaturedArtists />
  <GoldDivider class="w-full my-20 tablet:my-40" />
  <HomeExhibition />
  <QuoteBlock variant="home" :quote="tx('quote.text')" :author="tx('quote.author')" />
</template>

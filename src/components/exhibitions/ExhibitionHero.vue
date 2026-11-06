<script setup lang="ts">
import { useScopedI18n } from '@/composables/useScopedI18n'
import heroImage from '@/assets/images/exhibition/exhibition-hero.webp'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import BaseImage from '@/components/common/BaseImage.vue'
const { tx } = useScopedI18n('page.exhibitions')
</script>

<template>
  <div class="exhibitions__hero relative w-full h-[350px] tablet:h-[600px] overflow-hidden">
    <BaseImage
      :src="heroImage"
      alt=""
      fetchpriority="high"
      width="1534"
      height="1024"
      class="absolute inset-0 w-full h-full object-cover object-center"
    />

    <div class="absolute inset-0 bg-gradient-to-t from-black/100 via-black/20 to-transparent"></div>
    <SectionHeading
      :eyebrow="tx('status')"
      :title="tx('title')"
      :desc="tx('subtitle')"
      titleTag="h1"
      class="page-container absolute bottom-0 tablet:bottom-12 tablet:left-4 z-1"
    />
  </div>
</template>

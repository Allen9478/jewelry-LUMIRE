<script setup>
import { ref } from 'vue'

const infoSectionRef = ref(null)

defineProps({
  artist: { type: Object, required: true },
  collectionTitles: { type: Array, required: true },
})

defineExpose({ infoSectionRef })
</script>
<template>
  <div
    ref="infoSectionRef"
    class="page-container artist-detail__info mt-12 tablet:mt-24 space-y-6 tablet:grid tablet:grid-cols-[minmax(0,600px)_1fr] tablet:max-w-[1200px] tablet:mx-auto tablet:gap-24 desktop:gap-48"
  >
    <div class="artist-detail__info-content space-y-4">
      <p class="text-eyebrow text-gold-500">BIOGRAPHY</p>
      <p v-html="artist.biography"></p>
    </div>
    <div class="artist-detail__info-group space-y-6 tablet:max-w-xs">
      <div class="artist-detail__info-group-born space-y-2">
        <p class="text-eyebrow text-gold-500">BORN</p>
        <p>{{ artist.birth_year_and_nationality }}</p>
      </div>
      <div class="artist-detail__info-group-based space-y-2">
        <p class="text-eyebrow text-gold-500">BASED</p>
        <p>{{ artist.current_residence }}</p>
      </div>
      <div class="artist-detail__info-group-style space-y-2">
        <p class="text-eyebrow text-gold-500">MEDIUM</p>
        <p v-for="(item, index) in artist.medium" :key="index">{{ item }}</p>
      </div>
      <div class="artist-detail__info-group-collections space-y-2">
        <p class="text-eyebrow text-gold-500">COLLECTIONS</p>
        <p v-for="(item, index) in collectionTitles" :key="index">{{ item }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

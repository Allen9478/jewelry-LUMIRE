<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import artists from '@/data/artists.json'

const route = useRoute()
const artist = computed(() => artists.find((a) => a.id === route.params.id))
const getImageUrl = (imgname) => {
  return new URL(`../../assets/images/${imgname}`, import.meta.url).href
}
</script>
<!-- 測試而已要回來改 -->
<template>
  <div v-if="artist" class="page-wrapper max-w-[666px]">
    <img :src="getImageUrl(artist.image_detail)" :alt="artist.name" />
    <h1>{{ artist.name }}</h1>
    <p>{{ artist.current_residence }}</p>
    <p>{{ artist.works }} WORKS</p>
  </div>
</template>

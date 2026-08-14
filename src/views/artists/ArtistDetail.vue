<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import artists from '@/data/artists.json'
import getImageUrl from '@/utils/getImageUrl'

const route = useRoute()
const artist = computed(() => artists.find((a) => a.id === route.params.id))
</script>
<!-- 測試而已要回來改 -->
<template>
  <div v-if="artist" class="page-container max-w-[666px]">
    <img :src="getImageUrl(`artists/${artist.image_detail}`)" :alt="artist.name" />
    <h1>{{ artist.name }}</h1>
    <p>{{ artist.current_residence }}</p>
    <p>{{ artist.works }} WORKS</p>
  </div>
</template>

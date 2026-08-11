<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import works from '@/data/works.json'
import getImageUrl from '@/utils/getImageUrl'

const route = useRoute()
const work = computed(() => works.find((w) => w.id === route.params.id))
</script>
<template>
  <div v-if="work" class="page-wrapper max-w-[666px]">
    <img :src="getImageUrl(`jewelry/${work.image}`)" :alt="work.name" />
    <h1>{{ work.name }}</h1>
    <p>{{ work.materials }}</p>
    <p>{{ work.description }} WORKS</p>
  </div>
</template>

<style scoped></style>

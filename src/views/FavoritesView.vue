<script setup>
import { ref } from 'vue'
import { useFavoriteStore } from '@/stores/useFavoriteStore'
const favoriteStore = useFavoriteStore()
const isFavorites = favoriteStore.isFavorites
const favorites = favoriteStore.favorites
</script>
<template>
  <button @click="isFavorites">click me</button>
  <p>{{ favorites }}</p>
</template>

<style scoped></style>

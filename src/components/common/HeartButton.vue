<script setup lang="ts">
import { useFavoriteStore } from '@/stores/useFavoriteStore'
import HeartIcon from '@/components/common/HeartIcon.vue'
const favoriteStore = useFavoriteStore()
const props = defineProps<{
  workId: string
}>()
function getUserFavorites() {
  favoriteStore.toggleFavorite(props.workId)
}
</script>

<template>
  <button
    @click.prevent="getUserFavorites"
    aria-label="我的最愛收藏"
    class="nav__icon absolute top-3 right-3 mobile:right-4 opacity-100 tablet:top-3 tablet:right-3 tablet:opacity-0 tablet:group-hover:opacity-100 transition-none tablet:group-hover:transition-opacity tablet:group-hover:duration-300 hover:scale-90 active:scale-90 z-10"
  >
    <HeartIcon :filled="favoriteStore.isFavorite(workId)"></HeartIcon>
  </button>
</template>

<script setup>
import { useFavoriteStore } from '@/stores/useFavoriteStore'
import HeartIcon from '@/components/common/HeartIcon.vue'
const favoriteStore = useFavoriteStore()
const props = defineProps({
  productId: String,
})
function getUserFavorites() {
  favoriteStore.toggleFavorite(props.productId)
}
</script>

<template>
  <button
    @click.prevent="getUserFavorites"
    aria-label="我的最愛收藏"
    class="nav__icon absolute top-3 right-3 mobile:right-4 opacity-100 tablet:top-2 tablet:right-2 desktop:opacity-0 desktop:group-hover:opacity-100 transition-opacity duration-300 z-10"
  >
    <HeartIcon :filled="favoriteStore.isFavorite(props.productId)"></HeartIcon>
  </button>
</template>

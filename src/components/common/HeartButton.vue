<script setup>
import { useFavoriteStore } from '@/stores/useFavoriteStore'
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
    class="nav__icon absolute top-1 right-1 mobile:right-4 opacity-100 tablet:top-2 tablet:right-2 desktop:opacity-0 desktop:group-hover:opacity-100 transition-opacity duration-300 z-10"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      class="size-6 transition-colors duration-200"
      :class="
        favoriteStore.isFavorites(props.productId)
          ? 'fill-gold-500 stroke-gold-500'
          : 'fill-none stroke-current hover:fill-gold-500 hover:stroke-gold-500 active:fill-gold-500 active:stroke-gold-500'
      "
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
      />
    </svg>
  </button>
</template>

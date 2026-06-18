<script setup>
import { useFavoriteStore } from '@/stores/useFavoriteStore'
const favoriteStore = useFavoriteStore()

defineProps({
  product: Object,
})
const getImageUrl = (imgname) => {
  return new URL(`../../assets/images/${imgname}`, import.meta.url).href
}
</script>
<template>
  <RouterLink
    to="/works"
    class="card relative border border-transparent hover:border-gold-500/40 hover:shadow-gold-glow transition-all group"
  >
    <button
      aria-label="我的最愛收藏"
      class="nav__icon absolute top-2 right-2 opacity-100 desktop:opacity-0 desktop:group-hover:opacity-100 transition-opacity duration-300 z-10"
      @click="favoriteStore.toggleFavorite('test')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6 transition-colors duration-200 hover:fill-gold-500 hover:stroke-gold-500"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
        />
      </svg>
    </button>
    <div class="relative over-hidden">
      <img
        class="aspect-[3/4] w-full object-cover max-h-[200px] desktop:max-h-[300px]"
        :src="getImageUrl(product.image)"
        :alt="product.name"
      />
      <div
        class="card__overlay absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      ></div>
    </div>
    <div
      class="card__body absolute bottom-0 left-0 right-0 p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
    >
      <p class="text-xs tracking-widest text-gold-500 mb-3">View →</p>
      <h2 class="card__name text-white">{{ product.name }}</h2>
      <p class="card__artist text-white/50 mt-1">{{ product.artist }}</p>
    </div>
  </RouterLink>
</template>

<style scoped>
.card__overlay {
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.85) 0%,
    rgba(0, 0, 0, 0.3) 80%,
    transparent 100%
  );
}
</style>

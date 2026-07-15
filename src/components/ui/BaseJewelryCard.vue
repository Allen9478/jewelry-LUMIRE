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
    class="card w-full max-w-[300px] mobile:max-w-[360px] tablet:max-w-[430px] relative border border-transparent hover:border-gold-500/40 hover:shadow-gold-glow group:hover:scale-105 active:border-gold-500/40 active:shadow-gold-glow transition-all group"
  >
    <button
      aria-label="我的最愛收藏"
      class="nav__icon absolute top-1 right-1 mobile:right-4 opacity-100 tablet:top-2 tablet:right-2 desktop:opacity-0 desktop:group-hover:opacity-100 transition-opacity duration-300 z-10"
      @click.prevent="favoriteStore.toggleFavorite('test')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6 transition-colors duration-200 hover:fill-gold-500 hover:stroke-gold-500 active:fill-gold-500 active:stroke-gold-500"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
        />
      </svg>
    </button>
    <div class="card__body flex items-center tablet:flex-col">
      <div class="relative over-hidden w-auto tablet:max-w-full">
        <img
          class="aspect-[3/4] max-w-full object-cover max-h-[180px] tablet:max-h-[250px] laptop:max-h-[300px] laptop:object-contain"
          :src="getImageUrl(product.jewelryimg)"
          :alt="product.name"
        />
        <div
          class="card__overlay tablet:absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        ></div>
      </div>
      <div
        class="flex flex-col pl-4 tablet:absolute tablet:bottom-0 tablet:left-0 tablet:right-0 tablet:p-5 tablet:translate-y-2 tablet:hidden tablet:group-hover:flex tablet:opacity-0 tablet:group-hover:translate-y-0 tablet:group-hover:opacity-100 tablet:transition-all tablet:duration-300"
      >
        <p
          class="text-xs order-last mt-2 tablet:order-first tracking-widest text-gold-500 tablet:mb-3"
        >
          View →
        </p>
        <h2 class="card__name text-white text-body mb-3">{{ product.name }}</h2>
        <p class="card__artist text-white/50 mb-3 text-body-sm">{{ product.artist }}</p>
      </div>
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
/* @media (max-width: 520px) {
  .card {
    width: 90%;
    margin: auto;
  }
} */
</style>

<script setup>
import HeartButton from '@/components/common/HeartButton.vue'

const props = defineProps({
  product: Object,
})

const jewelryId = props.product.id
const getImageUrl = (imgName) => {
  return new URL(`../../assets/images/${imgName}`, import.meta.url).href
}
</script>
<template>
  <RouterLink
    to="/works"
    class="card w-full max-w-[300px] mobile:max-w-[360px] relative border border-transparent hover:border-gold-500/40 hover:shadow-gold-glow active:border-gold-500/40 active:shadow-gold-glow transition-all group"
  >
    <HeartButton :productId="jewelryId" />

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
      <!-- 分開寫兩個的原因是解決 mobile切換tablet瞬間文字出現消失的問題,用css能解決就不用js並且這裡code沒很多  -->
      <div class="flex flex-col pl-4 tablet:hidden">
        <h2 class="card__name text-white text-body my-2">{{ product.name }}</h2>
        <p class="card__artist text-white/50 mb-3 text-body-sm">{{ product.artist }}</p>
        <p class="text-xs order-last mb-3 tracking-widest text-gold-500">View →</p>
      </div>

      <div
        class="hidden tablet:flex flex-col tablet:absolute tablet:bottom-0 tablet:left-0 tablet:right-0 tablet:p-5 translate-y-2 pointer-events-none opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
      >
        <p class="text-xs tracking-widest text-gold-500 mb-3">View →</p>
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

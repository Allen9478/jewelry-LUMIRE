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
    class="card w-full max-w-[300px] mobile:max-w-[360px] relative border border-gold-500/20 hover:border-gold-500/60 hover:shadow-gold-glow active:border-gold-500/40 active:shadow-gold-glow transition-all duration-500 ease-out group"
  >
    <HeartButton :productId="jewelryId" />
    <div class="card__inner">
      <div class="card__body flex items-center tablet:flex-col">
        <div class="relative overflow-hidden w-auto tablet:max-w-full">
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
          <p class="text-white/30 text-xs mb-3">{{ product.material }}</p>
          <p class="text-xs order-last mb-3 tracking-widest text-gold-500">View →</p>
        </div>

        <div
          class="hidden tablet:flex flex-col tablet:absolute tablet:bottom-0 tablet:left-0 tablet:right-0 tablet:p-5 translate-y-2 pointer-events-none opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
        >
          <h2 class="card__name text-white text-body mb-3">{{ product.name }}</h2>
          <p class="card__artist text-white/90 mb-3 text-body-sm">{{ product.artist }}</p>
          <p class="text-white/60 text-xs mb-3">{{ product.material }}</p>
          <p class="text-xs tracking-widest text-gold-500 mb-3">View →</p>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.card {
  padding: 6px;
}

/* 內層線筐 */
.card__inner {
  border: 1px solid rgb(212 175 55 / 0.15);
  transition: border-color 0.5s ease;
  transition-delay: 50ms; /*比外筐延遲一點的效果*/
  height: 100%;
}

.card:hover .card__inner,
.card:active .card__inner {
  border-color: rgb(212 175 55 / 0.6);
}

.card__overlay {
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.85) 0%,
    rgba(0, 0, 0, 0.3) 80%,
    transparent 100%
  );
}
</style>

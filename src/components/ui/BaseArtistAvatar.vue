<script setup>
defineProps({
  product: Object,
})

const getImageUrl = (imgname) => {
  return new URL(`../../assets/images/${imgname}`, import.meta.url).href
}
</script>
<template>
  <RouterLink to="/artists" class="artistscard">
    <img
      :src="getImageUrl(product.artistsimg)"
      :alt="product.name"
      class="border border-gray-800 object-contain rounded-full w-[150px] h-[150px] tablet:w-[200px] tablet:h-[200px] desktop:w-[250px] desktop:h-[250px]"
    />
    <h2 class="mt-3 text-cream/80 text-label tablet:text-body desktop:text-subhead-sm">
      {{ product.artist }}
    </h2>
  </RouterLink>
</template>

<style scoped></style>

<script setup>
defineProps({
  product: Object,
})

const getImageUrl = (imgname) => {
  return new URL(`../../assets/images/${imgname}`, import.meta.url).href
}
</script>
<template>
  <RouterLink to="/artists" class="@container artists-card rounded-full object-cover">
    <img
      :src="getImageUrl(product.artistsimg)"
      :alt="product.name"
      class="artists-avatar border border-gray-800 object-cover object-[center_20%] rounded-full"
    />
    <h2 class="mt-3 text-cream/80 text-label tablet:text-body desktop:text-subhead">
      {{ product.artist }}
    </h2>
  </RouterLink>
</template>

<style scoped>
/* 該元件的 <style> 或全域 css 檔 */
.artists-avatar {
  width: clamp(100px, 85cqw, 250px);
  height: clamp(100px, 85cqw, 250px);
}
</style>

<script setup>
defineProps({
  artist: { type: Object, required: true },
})
</script>
<template>
  <div
    class="artist-detail__quote-group border-y border-gold-500/20 flex flex-col items-center justify-center text-center gap-4 px-6 py-16 my-10 tablet:my-0 tablet:mb-5 tablet:py-20 laptop:py-24 w-screen ml-[calc(50%_-_50vw)] mr-[calc(50%_-_50vw)] bg-cover bg-center"
  >
    <span
      class="artist-detail__quote-mark text-gold-500 text-4xl leading-none font-serif tablet:text-5xl laptop:text-6xl"
      aria-hidden="true"
      >"</span
    >
    <p class="artist-detail__quote text-body-lg font-italic italic">
      {{ artist.quote }}
    </p>
    <div class="w-12 h-px bg-gold-500 my-4" aria-hidden="true"></div>
    <p
      class="artist-detail__author text-xs uppercase tracking-wider text-gold-300 tablet:mt-5 tablet:text-sm"
    >
      {{ artist.name }}
    </p>
  </div>
</template>

<style scoped>
/* 768px以上出現背景圖 */
@media (min-width: 768px) {
  .artist-detail__quote-group {
    position: relative;
    background-image: url('../../assets/images/textures/texture-forward.webp');
    background-size: cover;
    background-position: center;
  }
}
</style>

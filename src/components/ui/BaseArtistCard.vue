<script setup>
import getImageUrl from '@/utils/getImageUrl'

defineProps({
  artist: Object,
})
</script>
<template>
  <div
    class="card w-full overflow-hidden rounded-lg border border-gold-500/40 hover:border-gold-500 hover:shadow-gold-glow active:border-gold-500 active:shadow-gold-glow duration-200 transition-all group"
  >
    <div class="aspect-[4/5] tablet:aspect-[3/4]">
      <img
        :src="getImageUrl(`artists/${artist.image}`)"
        :alt="artist.name"
        class="object-cover object-top w-full h-full"
      />
    </div>
    <div class="card__body px-4 py-2 tablet:px-8">
      <h2
        class="text-xl ipad:text-2xl desktop:text-3xl ipad:tracking-normal font-serif text-cream group-hover:text-gold-500 group-active:text-gold-500 duration-200 transition-all"
      >
        {{ artist.name }}
      </h2>
      <div
        class="flex flex-col tablet:flex-row tablet:items-center mt-1 laptop:mt-2 tracking-wider"
      >
        <p class="text-xs laptop:text-sm">{{ artist.current_residence }}</p>
        <span class="text-3xl hidden tablet:inline tablet:mx-1 desktop:mx-3">·</span>
        <p class="text-xs laptop:text-sm py-1">{{ artist.works }} WORKS</p>
      </div>
      <div class="mt-2 hidden tablet:mb-3 tablet:flex">
        <p class="text-xs desktop:text-sm tracking-wider">VIEW PROFILE</p>
        <span
          class="text-gold-500 tablet:text-lg tablet:ml-5 laptop:text-xl translate-y-[-8px] desktop:translate-y-[-5px] desktop:mr-15"
          >→</span
        >
      </div>
    </div>
  </div>
</template>

<style scoped></style>

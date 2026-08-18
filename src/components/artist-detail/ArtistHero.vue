<script setup>
import getImageUrl from '@/utils/getImageUrl'
import ScrollHint from '@/components/ui/ScrollHint.vue'

defineProps({
  artist: { type: Object, required: true },
})

const emit = defineEmits(['scroll-to-info'])
</script>
<template>
  <div
    class="relative artist-detail__hero max-w-full tablet:h-[90vh] tablet:w-full tablet:max-h-[900px] overflow-hidden"
  >
    <img
      :src="getImageUrl(`artists/${artist.image_detail}`)"
      :alt="artist.name"
      class="object-cover object-[center_10%] h-full w-full"
    />
    <div
      class="hidden tablet:block absolute bottom-4 left-1/2 -translate-x-1/2 text-gold-500 z-10"
      aria-hidden="true"
    >
      <ScrollHint />
    </div>
  </div>
</template>

<style scoped>
.artist-detail__hero::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40%;
  background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.85) 90%);
  pointer-events: none;
}
</style>

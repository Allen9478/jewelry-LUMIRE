<script setup>
import getImageUrl from '@/utils/getImageUrl'

defineProps({
  artist: { type: Object, required: true },
})

const emit = defineEmits(['scroll-to-info'])
</script>
<template>
  <div
    class="relative artist-detail__hero max-w-full tablet:h-[85vh] tablet:w-full tablet:max-h-[900px] overflow-hidden"
  >
    <img
      :src="getImageUrl(`artists/${artist.image_detail}`)"
      :alt="artist.name"
      class="object-cover object-[center_0%] h-full w-full"
    />
    <button
      class="animate-bounce-slow absolute bottom-8 left-1/2 -translate-x-1/2 text-gold-500 z-50"
      aria-hidden="true"
      @click="emit('scroll-to-info')"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
      >
        <path d="M12 4v14m0 0l-6-6m6 6l6-6" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
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
@keyframes bounce-slow {
  0%,
  100% {
    transform: translate(-50%, 0);
  }
  50% {
    transform: translate(-50%, 8px);
  }
}
.animate-bounce-slow {
  animation: bounce-slow 2.2s ease-in-out infinite;
}
</style>

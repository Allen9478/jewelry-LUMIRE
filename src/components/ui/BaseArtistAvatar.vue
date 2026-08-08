<script setup>
import getImageUrl from '@/utils/getImageUrl'
defineProps({
  artist: Object,
})
</script>
<template>
  <RouterLink
    to="/artists"
    class="@container artists-card group inline-flex flex-col items-center focus-visible:outline-none"
  >
    <div
      class="artists-avatar rounded-full overflow-hidden border border-gray-800 mx-auto transition-shadow duration-400 ease-out"
    >
      <img
        :src="getImageUrl(`artists/${artist.image}`)"
        :alt="artist.name"
        loading="lazy"
        width="1122"
        height="1402"
        class="w-full h-full object-cover object-[center_10%] transition-transform duration-500 ease-out group-hover:scale-[1.08] group-active:scale-[1.03] group-active:duration-150"
      />
    </div>
    <h2
      class="mt-3 text-cream/80 text-label tablet:text-body desktop:text-subhead transition-colors duration-300 ease-out group-hover:text-gold-500"
    >
      {{ artist.name }}
    </h2>
  </RouterLink>
</template>

<style scoped>
/* Hover：細金色描邊 */
.artists-card:hover .artists-avatar {
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--color-gold-500) 50%, transparent);
}

/* Active：描邊加深，反應更快 */
.artists-card:active .artists-avatar {
  box-shadow: 0 0 0 1px var(--color-gold-500);
  transition-duration: 150ms;
}

/* Focus-visible：雙層光環，鍵盤導覽用 */
.artists-card:focus-visible .artists-avatar {
  box-shadow:
    0 0 0 2px var(--color-gold-500),
    0 0 0 5px color-mix(in srgb, var(--color-gold-500) 25%, transparent);
}
.artists-avatar {
  width: clamp(100px, 85cqw, 350px);
  height: clamp(100px, 85cqw, 350px);
}
</style>

<script setup>
import { computed } from 'vue'
import getImageUrl from '@/utils/getImageUrl'
// defineProps({
//   artist: Object,
//   showName: {
//     type: Boolean,
//     default: true, // 沒傳入時預設會顯示名字
//   },
// })
const props = defineProps({
  artist: Object,
  variant: {
    type: String,
    default: 'artist', // 'artist' | 'team'
    validator: (val) => ['artist', 'team'].includes(val),
  },
  folder: {
    type: String,
    default: 'artists', // 圖片資料夾,team 使用時傳 'team'
  },
})
const imageSrc = computed(() => getImageUrl(`${props.folder}/${props.artist.image}`))
// team 版本不需要連結,artist 版本連去該藝術家的頁面
const linkTo = computed(() => `/artists/${props.artist.id ?? ''}`)
</script>
<template>
  <component
    :is="variant === 'artist' ? 'RouterLink' : 'div'"
    :to="variant === 'artist' ? linkTo : undefined"
    class="@container artists-card w-full inline-flex flex-col items-center gap-2 focus-visible:outline-none group"
  >
    <div
      class="artists-avatar rounded-full overflow-hidden mx-auto transition-shadow duration-400 ease-out p-[1px]"
    >
      <img
        :src="imageSrc"
        :alt="artist.name"
        loading="lazy"
        width="1122"
        height="1402"
        class="w-full h-full object-cover object-[center_10%] transition-transform duration-500 ease-out group-hover:scale-[1.08] group-active:scale-[1.03] group-active:duration-150"
      />
    </div>
    <h2
      class="mt-3 text-cream/80 text-label-lg tablet:text-body desktop:text-subhead transition-colors duration-300 ease-out group-hover:text-gold-500"
    >
      {{ artist.name }}
    </h2>
    <p
      v-if="variant === 'team' && artist.title"
      class="mt-1 text-xs tracking-wider text-gray-muted/60"
    >
      {{ artist.title }}
    </p>
  </component>
</template>

<style scoped>
/* Hover：細金色描邊 */
.artists-card:hover .artists-avatar {
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--color-gold-500) 50%, transparent);
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

<script setup lang="ts">
import { ref } from 'vue'
import { useFavoriteStore } from '@/stores/useFavoriteStore'
import { useScopedI18n } from '@/composables/useScopedI18n'
import HeartIcon from '@/components/common/HeartIcon.vue'

const favoriteStore = useFavoriteStore()
const { tx } = useScopedI18n('common')
const props = defineProps<{
  workId: string
}>()
const button = ref<HTMLButtonElement | null>(null)

function handleToggle() {
  const before = favoriteStore.isFavorite(props.workId)
  favoriteStore.toggleFavorite(props.workId)
  if (favoriteStore.isFavorite(props.workId) === before) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  button.value
    ?.querySelector('svg')
    ?.animate(
      [
        { transform: 'scale(1)' },
        { transform: `scale(${before ? 0.8 : 1.3})` },
        { transform: 'scale(1)' },
      ],
      { duration: 500, easing: 'ease-out' },
    )
}
</script>

<template>
  <button
    ref="button"
    @click="handleToggle"
    :aria-label="favoriteStore.isFavorite(workId) ? tx('removeFavorite') : tx('addFavorite')"
    class="nav__icon absolute top-3 right-3 opacity-100 tablet:[@media(hover:hover)]:opacity-0 tablet:group-hover:opacity-100 tablet:group-has-[:focus-visible]:opacity-100 transition-none tablet:group-hover:transition-opacity tablet:group-hover:duration-300 hover:scale-90 active:scale-90 z-10"
  >
    <HeartIcon :filled="favoriteStore.isFavorite(workId)" />
  </button>
</template>

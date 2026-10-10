<script setup lang="ts">
import { useFavoriteStore } from '@/stores/useFavoriteStore'
import { useScopedI18n } from '@/composables/useScopedI18n'
import HeartIcon from '@/components/common/HeartIcon.vue'

const favoriteStore = useFavoriteStore()
const { tx } = useScopedI18n('common')
const props = defineProps<{
  workId: string
}>()
function handleToggle() {
  favoriteStore.toggleFavorite(props.workId)
}
</script>

<template>
  <button
    @click.prevent="handleToggle"
    :aria-label="favoriteStore.isFavorite(workId) ? tx('removeFavorite') : tx('addFavorite')"
    class="nav__icon absolute top-3 right-3 mobile:right-4 opacity-100 tablet:top-3 tablet:right-3 tablet:opacity-0 tablet:group-hover:opacity-100 transition-none tablet:group-hover:transition-opacity tablet:group-hover:duration-300 hover:scale-90 active:scale-90 z-10"
  >
    <HeartIcon :filled="favoriteStore.isFavorite(workId)"></HeartIcon>
  </button>
</template>

<script setup>
import { useFavoriteStore } from '@/stores/useFavoriteStore'
import HeartIcon from '@/components/common/HeartIcon.vue'
const favoriteStore = useFavoriteStore()
const props = defineProps({
  workId: String,
})
function getUserFavorites() {
  favoriteStore.toggleFavorite(props.workId)
}
</script>

<template>
  <!-- 先把動畫相關關掉在桌機再寫出來解決rwd切換icon瞬間閃爍 -->
  <button
    @click.prevent="getUserFavorites"
    aria-label="我的最愛收藏"
    class="nav__icon absolute top-3 right-3 mobile:right-4 opacity-100 tablet:top-2 tablet:right-2 tablet:opacity-0 tablet:group-hover:opacity-100 transition-none tablet:group-hover:transition-opacity tablet:group-hover:duration-300 z-10"
  >
    <HeartIcon :filled="favoriteStore.isFavorite(props.workId)"></HeartIcon>
  </button>
</template>

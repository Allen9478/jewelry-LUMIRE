import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './useAuthStore'

export const useFavoriteStore = defineStore('favorite', () => {
  const authStore = useAuthStore()
  const favorites = ref<string[]>([])
  const showLoginModal = ref(false)

  function toggleFavorite(id: string) {
    if (!authStore.isLoggedIn) {
      showLoginModal.value = true // 未登入就開 Modal
      return
    }
    // 已登入才執行收藏邏輯
    const index = favorites.value.indexOf(id)
    if (index === -1) {
      favorites.value.push(id)
    } else {
      favorites.value.splice(index, 1)
    }
  }

  function isFavorited(id: string) {
    return favorites.value.includes(id)
  }

  return { favorites, showLoginModal, toggleFavorite, isFavorited }
})

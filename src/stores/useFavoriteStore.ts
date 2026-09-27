import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './useAuthStore'
import { useUiStore } from './useUiStore'
import { doc, getDoc, getDocs, collection, setDoc, deleteDoc } from 'firebase/firestore'
import { db } from '@/firebase'
export const useFavoriteStore = defineStore('favorite', () => {
  const authStore = useAuthStore()
  const uiStore = useUiStore()

  const favorites = ref<string[]>([])

  const isLoading = ref(true) //避免還沒載好時被判斷沒資料

  async function toggleFavorite(id: string) {
    if (!authStore.isLoggedIn) {
      uiStore.openLoginModal()
      return
    }
    //防呆
    if (!id || typeof id !== 'string') {
      console.warn('toggleFavorite: invalid id', id)
      return
    }
    const userId = authStore.user.uid // Firebase Auth 的使用者 id
    const docRef = doc(db, 'favorites', userId, 'items', id)
    const alreadyFavorited = favorites.value.includes(id)

    if (alreadyFavorited) {
      favorites.value = favorites.value.filter((f) => f !== id)
    } else {
      favorites.value.push(id)
    }
    try {
      if (alreadyFavorited) {
        await deleteDoc(docRef)
      } else {
        await setDoc(docRef, { workId: id, addedAt: new Date() })
      }
    } catch (err) {
      console.error('toggle failed', err)
      if (alreadyFavorited) {
        favorites.value.push(id)
      } else {
        favorites.value = favorites.value.filter((f) => f !== id)
      }
    }
  }
  async function fetchFavorites() {
    if (!authStore.isLoggedIn || !authStore.user?.uid) {
      favorites.value = []
      isLoading.value = false
      return
    }
    isLoading.value = true
    try {
      const userId = authStore.user.uid
      const colRef = collection(db, 'favorites', userId, 'items')
      const snapshot = await getDocs(colRef)
      favorites.value = snapshot.docs.map((doc) => doc.id)
    } catch (err) {
      console.error('fetch favorites failed:', err)
    } finally {
      isLoading.value = false
    }
  }
  function isFavorite(id: string) {
    return favorites.value.includes(id)
  }
  function resetFavorites() {
    favorites.value = []
    isLoading.value = false
  }
  return {
    favorites,
    isLoading,
    toggleFavorite,
    isFavorite,
    fetchFavorites,
    resetFavorites,
  }
})

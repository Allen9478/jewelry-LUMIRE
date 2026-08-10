import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './useAuthStore'
import { doc, getDoc, getDocs, collection, setDoc, deleteDoc } from 'firebase/firestore'
import { db } from '@/firebase'
export const useFavoriteStore = defineStore('favorite', () => {
  const authStore = useAuthStore()
  const favorites = ref<string[]>([])
  const showLoginModal = ref(false)

  async function toggleFavorite(id: string) {
    if (!authStore.isLoggedIn) {
      showLoginModal.value = true
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
    if (!authStore.isLoggedIn) return

    const userId = authStore.user.uid
    const colRef = collection(db, 'favorites', userId, 'items')

    const snapshot = await getDocs(colRef)
    favorites.value = snapshot.docs.map((doc) => doc.id)
  }
  function isFavorite(id: string) {
    return favorites.value.includes(id)
  }

  return { favorites, showLoginModal, toggleFavorite, isFavorite, fetchFavorites }
})

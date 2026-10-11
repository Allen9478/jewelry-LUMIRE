import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useAuthStore } from './useAuthStore'
import { useUiStore } from './useUiStore'
import {
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  collection,
  setDoc,
  deleteDoc,
} from 'firebase/firestore'
import { db } from '@/firebase'
export const useFavoriteStore = defineStore('favorite', () => {
  const authStore = useAuthStore()
  const uiStore = useUiStore()
  //加入時間舊到新，toggle 時用加在最後面，與讀取的順序語意一致
  const favorites = ref<string[]>([])
  //狀態順序是：載入中 → 錯誤 → 空 → 有資料
  const isLoading = ref(true)
  const loadError = ref(false)

  async function toggleFavorite(id: string) {
    //沒登入都不用談
    if (!authStore.isLoggedIn) {
      uiStore.openLoginModal()
      return
    }
    const uid = authStore.user?.uid // Firebase Auth 的使用者 id
    if (!uid || !id) return

    // 如果離現時 Firestore 寫入不會失敗只會排隊，所以先擋下並告知
    // 不黨的話，畫面顯示已收藏但其實還沒寫入
    if (!navigator.onLine) {
      uiStore.showToast('common.toast.offline')
      return
    }

    const willFavorite = !favorites.value.includes(id)

    // 先趕畫面在等網路，也就是所謂的樂觀更新
    favorites.value = willFavorite
      ? [...favorites.value, id]
      : favorites.value.filter((f) => f !== id)
    const docRef = doc(db, 'favorites', uid, 'items', id)
    try {
      if (willFavorite) {
        await setDoc(docRef, { workId: id, addedAt: serverTimestamp() })
      } else {
        await deleteDoc(docRef)
      }
    } catch (err) {
      console.error('toggle failed', err)
      // 只有畫面狀態仍停在這次操作的結果時才回滾，避免蓋掉使用者後來的操作
      if (favorites.value.includes(id) === willFavorite) {
        favorites.value = willFavorite
          ? favorites.value.filter((f) => f !== id)
          : [...favorites.value, id]
      }
      uiStore.showToast('common.toast.favoriteFailed')
    }
  }
  async function fetchFavorites() {
    const uid = authStore.user?.uid
    if (!uid) {
      resetFavorites()
      return
    }
    isLoading.value = true
    loadError.value = false
    try {
      // orderBy 讓順序以資料為準。沒指定的話 Firestore 預設依文件 ID 排，
      const q = query(collection(db, 'favorites', uid, 'items'), orderBy('addedAt'))
      const snapshot = await getDocs(q)
      if (authStore.user?.uid !== uid) return // 期間換了帳號，丟棄這次結果
      favorites.value = snapshot.docs.map((d) => d.id)
    } catch (err) {
      console.error('fetch favorites failed:', err)
      if (authStore.user?.uid === uid) loadError.value = true
    } finally {
      if (authStore.user?.uid === uid) isLoading.value = false
    }
  }
  function isFavorite(id: string) {
    return favorites.value.includes(id)
  }
  function resetFavorites() {
    favorites.value = []
    isLoading.value = false
    loadError.value = false
  }

  // 由 favorite 監聽 auth，而不是 auth 呼叫 favorite，
  // 依賴方向單向（favorite → auth），避免循環依賴。
  watch(
    () => authStore.user?.uid,
    (uid) => {
      if (uid) void fetchFavorites()
      else resetFavorites()
    },
    { immediate: true, flush: 'sync' },
  )

  return {
    favorites,
    isLoading,
    loadError,
    toggleFavorite,
    isFavorite,
    fetchFavorites,
    resetFavorites,
  }
})

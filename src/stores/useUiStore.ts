// stores/useUiStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  const showLoginModal = ref(false)
  const showSearchModal = ref(false)
  const pendingRedirect = ref<string | null>(null)
  const toastKey = ref<string | null>(null) // 存 i18n key

  //不寫ref是因為這只有內部用沒有畫面依賴
  let toastTimer: ReturnType<typeof setTimeout> | null = null

  function showToast(key: string, duration = 3000) {
    toastKey.value = key
    //新的提示出現前如果有舊的提示就把舊的先刪掉
    if (toastTimer) clearTimeout(toastTimer)
    toastTimer = setTimeout(() => {
      toastKey.value = null
    }, duration)
  }

  function openLoginModal() {
    showLoginModal.value = true
  }
  function closeLoginModal() {
    showLoginModal.value = false
    clearPendingRedirect()
  }
  function openSearchModal() {
    showSearchModal.value = true
  }
  function closeSearchModal() {
    showSearchModal.value = false
  }
  function setPendingRedirect(path: string | null) {
    pendingRedirect.value = path
  }
  function clearPendingRedirect() {
    pendingRedirect.value = null
  }

  return {
    showLoginModal,
    openLoginModal,
    pendingRedirect,
    closeLoginModal,
    showSearchModal,
    openSearchModal,
    closeSearchModal,
    setPendingRedirect,
    clearPendingRedirect,
    toastKey,
    showToast,
  }
})

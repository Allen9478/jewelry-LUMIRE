// stores/useUiStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  const showLoginModal = ref(false)
  const showSearchModal = ref(false)
  const pendingRedirect = ref<string | null>(null)
  function openLoginModal() {
    showLoginModal.value = true
  }
  function closeLoginModal() {
    showLoginModal.value = false
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
  }
})

// stores/useUiStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  const showLoginModal = ref(false)
  const showSearchModal = ref(false)

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

  return {
    showLoginModal,
    openLoginModal,
    closeLoginModal,
    showSearchModal,
    openSearchModal,
    closeSearchModal,
  }
})

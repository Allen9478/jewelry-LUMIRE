import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false) // 之後串接真實登入邏輯

  return { isLoggedIn }
})

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from 'firebase/auth'
import { auth } from '@/firebase'
import { useFavoriteStore } from '@/stores/useFavoriteStore'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isLoading = ref(false)
  const isAuthReady = ref(false) // Firebase 是否已回報過
  const error = ref('')
  const isLoggedIn = computed(() => !!user.value)
  const favoriteStore = useFavoriteStore()

  function initAuthListener() {
    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        user.value = firebaseUser
        favoriteStore.fetchFavorites() // 登入時載入收藏
      } else {
        user.value = null
        favoriteStore.resetFavorites() // 登出時清空,並標記為「已載入完成、空清單」
      }
      isAuthReady.value = true // 關鍵:不管有沒有登入,只要 Firebase 回報過一次就設為 true
    })
  }
  const displayName = computed(() => {
    const email = user.value?.email
    if (!email) return ''
    return email.split('@')[0]
  })
  async function register(fullname, email, password) {
    error.value = ''
    isLoading.value = true
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      user.value = result.user
    } catch (err) {
      error.value = mapErrorMessage(err.code)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function login(email, password) {
    error.value = ''
    isLoading.value = true
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      user.value = result.user
    } catch (err) {
      error.value = mapErrorMessage(err.code)
      throw err
    } finally {
      isLoading.value = false
    }
  }
  async function logout() {
    await signOut(auth)
    user.value = null
    favoriteStore.resetFavorites() //主動清空資料不等 onAuthStateChanged
  }

  async function resetPassword(email) {
    error.value = ''
    isLoading.value = true
    try {
      await sendPasswordResetEmail(auth, email)
    } catch (err) {
      error.value = mapErrorMessage(err.code)
      throw err
    } finally {
      isLoading.value = false
    }
  }
  function mapErrorMessage(code) {
    const map = {
      'auth/email-already-in-use': 'This email is already registered.',
      'auth/invalid-email': 'Please enter a valid email address.',
      'auth/weak-password': 'Password should be at least 6 characters.',
      'auth/user-not-found': 'No account found with this email.',
      'auth/wrong-password': 'Incorrect password.',
      'auth/invalid-credential': 'Incorrect email or password.',
    }
    return map[code] || 'Something went wrong. Please try again.'
  }

  return {
    user,
    displayName,
    isLoggedIn,
    isLoading,
    isAuthReady,
    error,
    initAuthListener,
    register,
    login,
    logout,
    resetPassword,
  }
})

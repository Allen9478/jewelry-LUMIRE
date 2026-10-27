import { defineStore } from 'pinia'
import { ref, shallowRef, computed, triggerRef } from 'vue'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile,
  type User,
  type Unsubscribe,
} from 'firebase/auth'
import { auth } from '@/firebase'

export const useAuthStore = defineStore('auth', () => {
  const user = shallowRef<User | null>(null)
  const isLoading = ref(false)
  const isAuthReady = ref(false) // Firebase 是否已回報過
  const isLoggedIn = computed(() => user.value !== null)

  const displayName = computed(() => {
    const name = user.value?.displayName
    if (name) return name

    const email = user.value?.email
    return email ? email.split('@')[0] : ''
  })

  let unsubscribe: Unsubscribe | null = null

  function initAuthListener(): void {
    if (unsubscribe) return
    unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      user.value = firebaseUser
      isAuthReady.value = true
    })
  }

  async function withLoading<T>(action: () => Promise<T>): Promise<T> {
    isLoading.value = true
    try {
      return await action()
    } finally {
      isLoading.value = false
    }
  }

  function register(fullname: string, email: string, password: string): Promise<void> {
    return withLoading(async () => {
      const { user: newUser } = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(newUser, { displayName: fullname })
      user.value = newUser
      triggerRef(user)
    })
  }

  function login(email: string, password: string): Promise<void> {
    return withLoading(async () => {
      const { user: signedIn } = await signInWithEmailAndPassword(auth, email, password)
      user.value = signedIn
    })
  }

  async function logout(): Promise<void> {
    await signOut(auth)
    user.value = null
  }

  function resetPassword(email: string): Promise<void> {
    return withLoading(() => sendPasswordResetEmail(auth, email))
  }

  return {
    user,
    displayName,
    isLoggedIn,
    isLoading,
    isAuthReady,
    initAuthListener,
    register,
    login,
    logout,
    resetPassword,
  }
})

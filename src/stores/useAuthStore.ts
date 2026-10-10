import { defineStore } from 'pinia'
import { ref, shallowRef, computed } from 'vue'
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
import { FirebaseError } from 'firebase/app'
import { auth } from '@/firebase'

const DEFAULT_ERROR = 'Something went wrong. Please try again.'

const ERROR_MESSAGES: Readonly<Record<string, string>> = {
  'auth/email-already-in-use': 'This email is already registered.',
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/weak-password': 'Password should be at least 6 characters.',
  'auth/user-not-found': 'No account found with this email.',
  'auth/wrong-password': 'Incorrect password.',
  'auth/invalid-credential': 'Incorrect email or password.',
}

function mapErrorMessage(err: unknown): string {
  if (err instanceof FirebaseError) {
    return ERROR_MESSAGES[err.code] ?? DEFAULT_ERROR
  }
  return DEFAULT_ERROR
}

export const useAuthStore = defineStore('auth', () => {
  const user = shallowRef<User | null>(null)
  const isLoading = ref(false)
  const isAuthReady = ref(false) // Firebase 是否已回報過
  const error = ref('')
  const isLoggedIn = computed(() => user.value !== null)

  const displayName = computed(() => {
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
    error.value = ''
    isLoading.value = true
    try {
      return await action()
    } catch (err) {
      error.value = mapErrorMessage(err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  function register(fullname: string, email: string, password: string): Promise<void> {
    return withLoading(async () => {
      const { user: newUser } = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(newUser, { displayName: fullname })
      user.value = newUser
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
    error,
    initAuthListener,
    register,
    login,
    logout,
    resetPassword,
  }
})

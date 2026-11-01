import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import type { MockInstance } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useFavoriteStore } from '@/stores/useFavoriteStore'
import { useUiStore } from '@/stores/useUiStore'
import { useAuthStore } from '@/stores/useAuthStore'
import { doc, setDoc, getDocs } from 'firebase/firestore'
import type { User } from 'firebase/auth'

vi.mock('@/firebase', () => ({ auth: {}, db: {} }))
vi.mock('firebase/firestore', () => ({
  doc: vi.fn(() => ({})),
  collection: vi.fn(),
  query: vi.fn(),
  orderBy: vi.fn(),
  getDocs: vi.fn(),
  setDoc: vi.fn(),
  deleteDoc: vi.fn(),
  serverTimestamp: vi.fn(() => 'SERVER_TIMESTAMP'),
}))

const USER_A = { uid: 'user-a' } as User

function snapshotOf(ids: string[]) {
  return { docs: ids.map((id) => ({ id })) } as never
}

async function setupLoggedIn(initialIds: string[] = []) {
  vi.mocked(getDocs).mockResolvedValue(snapshotOf(initialIds))
  const authStore = useAuthStore()
  authStore.user = USER_A
  const store = useFavoriteStore()
  await vi.waitFor(() => expect(store.isLoading).toBe(false))
  return { store, authStore, uiStore: useUiStore() }
}
describe('useFavoriteStore', () => {
  let errorSpy: MockInstance
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
    vi.mocked(getDocs).mockResolvedValue(snapshotOf([]))
    vi.mocked(setDoc).mockResolvedValue(undefined)
    vi.stubGlobal('navigator', { onLine: true })
    errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
  })
  afterEach(() => {
    errorSpy.mockRestore()
    vi.unstubAllGlobals()
  })
  describe('toggleFavorite', () => {
    test('未登入時,應開啟登入視窗且不寫入', async () => {
      const store = useFavoriteStore()
      const uiStore = useUiStore()

      await store.toggleFavorite('work-1')

      expect(uiStore.showLoginModal).toBe(true)
      expect(store.isFavorite('work-1')).toBe(false)
      expect(setDoc).not.toHaveBeenCalled()
    })
    test('加入收藏時,應先更新畫面,並寫入正確路徑與資料', async () => {
      const { store } = await setupLoggedIn()
      const pending = store.toggleFavorite('work-1')
      expect(store.isFavorite('work-1')).toBe(true)
      await pending

      expect(store.isFavorite('work-1')).toBe(true)
      expect(doc).toHaveBeenCalledWith(expect.anything(), 'favorites', 'user-a', 'items', 'work-1')
      expect(setDoc).toHaveBeenCalledWith(expect.anything(), {
        workId: 'work-1',
        addedAt: 'SERVER_TIMESTAMP',
      })
    })
    test('加入失敗時,應回滾並顯示提示', async () => {
      vi.mocked(setDoc).mockRejectedValueOnce(new Error('network error'))
      const { store, uiStore } = await setupLoggedIn()

      await store.toggleFavorite('work-1')

      expect(store.isFavorite('work-1')).toBe(false)
      expect(uiStore.toastKey).toBe('common.toast.favoriteFailed')
    })
  })
  describe('fetchFavorites', () => {
    test('成功時,應依回傳順序填入收藏並結束載入', async () => {
      const { store } = await setupLoggedIn(['work-2', 'work-1'])

      expect(store.favorites).toEqual(['work-2', 'work-1'])
      expect(store.isLoading).toBe(false)
      expect(store.loadError).toBe(false)
    })

    test('失敗時,應標記 loadError 並結束載入', async () => {
      vi.mocked(getDocs).mockRejectedValue(new Error('network error'))
      const authStore = useAuthStore()
      authStore.user = USER_A

      const store = useFavoriteStore()
      await vi.waitFor(() => expect(store.isLoading).toBe(false))

      expect(store.loadError).toBe(true)
      expect(store.favorites).toEqual([])
    })
  })
})

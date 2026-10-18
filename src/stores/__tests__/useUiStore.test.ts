import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useUiStore } from '@/stores/useUiStore'

describe('useUiStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('登入視窗', () => {
    test('關閉視窗時,同時清掉 pendingRedirect', () => {
      const ui = useUiStore()
      ui.setPendingRedirect('/favorites')
      ui.openLoginModal()
      ui.closeLoginModal()
      expect(ui.showLoginModal).toBe(false)
      expect(ui.pendingRedirect).toBe(null)
    })
  })

  describe('showToast', () => {
    test('顯示提示後,經過指定時間會自動消失', () => {
      const ui = useUiStore()
      ui.showToast('test')
      expect(ui.toastKey).toBe('test')
      vi.advanceTimersByTime(3000)
      expect(ui.toastKey).toBe(null)
    })
    test('連續顯示兩次時,舊計時器不會提前關掉新的提示', () => {
      const ui = useUiStore()
      ui.showToast('test')
      vi.advanceTimersByTime(2000)
      ui.showToast('testAgain')
      vi.advanceTimersByTime(2000)
      expect(ui.toastKey).toBe('testAgain')
      vi.advanceTimersByTime(1000)
      expect(ui.toastKey).toBe(null)
    })
  })
})

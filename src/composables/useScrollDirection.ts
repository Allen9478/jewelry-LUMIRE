import { ref, onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'

interface UseScrollDirectionReturn {
  isHeaderVisible: Ref<boolean>
}

export function useScrollDirection(): UseScrollDirectionReturn {
  const isHeaderVisible = ref(true)
  let lastScrollY = 0
  let ticking = false

  function updateScroll(): void {
    if (typeof window === 'undefined') return
    const currentScrollY = window.scrollY

    isHeaderVisible.value = currentScrollY <= 0 || currentScrollY <= lastScrollY

    lastScrollY = currentScrollY
    ticking = false
  }

  function handleScroll(): void {
    if (!ticking) {
      // requestAnimationFrame是效能節流,告訴browser下一針之前我只計算一次
      window.requestAnimationFrame(updateScroll)
      ticking = true
    }
  }

  // passive 代表不會呼叫 preventDefault，瀏覽器不用等 handler 執行完就能捲動，避免延遲
  onMounted(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll, { passive: true })
    }
  })

  onUnmounted(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  return { isHeaderVisible }
}

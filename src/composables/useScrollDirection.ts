import { ref, onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'

export function useScrollDirection(): { isHeaderVisible: Ref<boolean> } {
  const isHeaderVisible = ref(true)
  let lastScrollY = 0

  function updateScroll(): void {
    const currentScrollY = window.scrollY
    isHeaderVisible.value = currentScrollY <= 0 || currentScrollY <= lastScrollY
    lastScrollY = currentScrollY
  }

  onMounted(() => {
    lastScrollY = window.scrollY
    window.addEventListener('scroll', updateScroll, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', updateScroll)
  })

  return { isHeaderVisible }
}

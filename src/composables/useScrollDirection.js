import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollDirection() {
  const isHeaderVisible = ref(true)
  let lastScrollY = 0

  function handleScroll() {
    const currentScrollY = window.scrollY
    if (currentScrollY <= 0) {
      isHeaderVisible.value = true
    } else if (currentScrollY > lastScrollY) {
      isHeaderVisible.value = false
    } else {
      isHeaderVisible.value = true
    }

    lastScrollY = currentScrollY
  }
  //   passive代表不會叫preventDefault,也就是不用等任何東西就執行避免延遲
  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return { isHeaderVisible }
}

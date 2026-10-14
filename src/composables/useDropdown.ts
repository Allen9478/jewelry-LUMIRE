import { ref, useTemplateRef, onMounted, onBeforeUnmount } from 'vue'

export function useDropdown(refKey: string) {
  const isOpen = ref(false)
  const rootRef = useTemplateRef<HTMLElement>(refKey)

  const toggle = () => (isOpen.value = !isOpen.value)
  const close = () => (isOpen.value = false)

  function onPointerDown(e: PointerEvent) {
    if (rootRef.value && e.target instanceof Node && !rootRef.value.contains(e.target)) close()
  }
  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') close()
  }

  onMounted(() => {
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeydown)
  })
  onBeforeUnmount(() => {
    document.removeEventListener('pointerdown', onPointerDown)
    document.removeEventListener('keydown', onKeydown)
  })

  return { isOpen, toggle, close }
}

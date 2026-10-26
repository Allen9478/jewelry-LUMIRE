<script setup lang="ts">
import { ref, watch, nextTick, onBeforeUnmount } from 'vue'

const props = defineProps<{
  isOpen: boolean
  label: string // 對話框的名稱，螢幕閱讀器開啟時會朗讀
}>()

const emit = defineEmits<{ close: [] }>()

const dialogRef = ref<HTMLElement | null>(null)
let previouslyFocused: HTMLElement | null = null

function toggleScrollLock(isLock: boolean) {
  if (isLock) {
    // height是不讓捲軸滾action是防止手機端
    document.body.style.overflow = 'hidden'
    document.body.style.height = '100vh'
    document.body.style.touchAction = 'none'
  } else {
    document.body.style.overflow = ''
    document.body.style.height = ''
    document.body.style.touchAction = ''
  }
}

function setBackgroundInert(inert: boolean) {
  document.getElementById('app')?.toggleAttribute('inert', inert)
  document.getElementById('hamburger-menu-root')?.toggleAttribute('inert', inert)
}

watch(
  () => props.isOpen,
  async (open) => {
    if (open) {
      previouslyFocused = document.activeElement as HTMLElement | null

      toggleScrollLock(true)
      setBackgroundInert(true)
      await nextTick()
      // 內容若已自行聚焦（例如搜尋輸入框）就不要搶；否則聚焦對話框本身
      if (!dialogRef.value?.contains(document.activeElement)) dialogRef.value?.focus()
    } else {
      toggleScrollLock(false)
      setBackgroundInert(false) // 要先解除，焦點才回得去
      previouslyFocused?.focus()
      previouslyFocused = null
    }
  },
)

// 元件被卸載時也要解除，避免背景被鎖住
onBeforeUnmount(() => {
  toggleScrollLock(false)
  setBackgroundInert(false)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-70 flex items-center justify-center"
        @keydown.esc="emit('close')"
      >
        <!-- 背景遮罩 -->
        <div class="absolute inset-0 bg-black/70" @click="emit('close')" />
        <!-- Modal 內容 -->
        <div
          ref="dialogRef"
          role="dialog"
          aria-modal="true"
          :aria-label="label"
          tabindex="-1"
          class="relative z-60 bg-black-soft border border-gold-500 shadow-card-neon p-8 max-w-lg w-full mx-4"
        >
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

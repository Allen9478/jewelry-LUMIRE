// directives/vFadeIn.ts
// 用法：v-fade-in  或  v-fade-in="{ delay: 200, duration: 700 }"

import type { Directive } from 'vue'

interface FadeOptions {
  delay?: number // ms，stagger 時傳入 index * 100
  duration?: number // ms，預設 600
  y?: number // 位移距離 px，預設 28
  mobile?: {
    delay?: number
    duration?: number
    y?: number
  }
}

export const vFadeIn: Directive<HTMLElement, FadeOptions> = {
  mounted(el, binding) {
    //手機端判斷
    const isTablet = window.innerWidth < 768

    const base = binding.value ?? {}
    const mobileOverride = base.mobile ?? {}
    const resolved = isTablet ? { ...base, ...mobileOverride } : base
    const { delay = 0, duration = 700, y = 28 } = resolved

    // 初始狀態：隱藏並位移
    el.style.setProperty('--fade-duration', `${duration}ms`)
    el.style.setProperty('--fade-y', `${y}px`)
    el.classList.add('fade-in-init')

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        const timer = window.setTimeout(() => {
          el.classList.add('fade-in-visible')
        }, delay)
        ;(el as any)._fadeTimer = timer
        observer.unobserve(el)
      },
      { threshold: 0.15 },
    )
    observer.observe(el)
    ;(el as any)._fadeObserver = observer
  },

  unmounted(el) {
    ;(el as any)._fadeObserver?.disconnect()
    clearTimeout((el as any)._fadeTimer)
  },
}

// directives/vFadeIn.ts
// 用法：v-fade-in  或  v-fade-in="{ delay: 200, duration: 700 }"

import type { Directive } from 'vue'

interface FadeOptions {
  delay?: number // ms，stagger 時傳入 index * 100
  duration?: number // ms，預設 600
  y?: number // 位移距離 px，預設 28
}

export const vFadeIn: Directive<HTMLElement, FadeOptions> = {
  mounted(el, binding) {
    const { delay = 0, duration = 600, y = 28 } = binding.value ?? {}

    // 初始狀態：隱藏並位移
    el.style.opacity = '0'
    el.style.transform = `translateY(${y}px)`
    el.style.transition = `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setTimeout(() => {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
        }, delay)
        observer.unobserve(el)
      },
      { threshold: 0.15 },
    )
    observer.observe(el)

    // 把 observer 存在 el 上，unmounted 時清理
    ;(el as any)._fadeObserver = observer
  },

  unmounted(el) {
    ;(el as any)._fadeObserver?.disconnect()
  },
}

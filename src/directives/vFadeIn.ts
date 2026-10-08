import type { Directive } from 'vue'

export interface FadeOptions {
  delay?: number // ms，stagger 時傳入 index * 100
  duration?: number // ms，預設 700
  y?: number // 位移距離 px，預設 28
  mobile?: {
    delay?: number
    duration?: number
    y?: number
  }
}

// 在元素上暫存 observer 與 timer，供 unmounted 時清理
interface FadeElement extends HTMLElement {
  _fadeObserver?: IntersectionObserver
  _fadeTimer?: number
}

export const vFadeIn: Directive<FadeElement, FadeOptions | undefined> = {
  mounted(el, binding) {
    // 手機端判斷
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
      (entries, obs) => {
        const entry = entries[0]
        if (!entry?.isIntersecting) return
        el._fadeTimer = window.setTimeout(() => {
          el.classList.add('fade-in-visible')
        }, delay)
        obs.unobserve(el)
      },
      { threshold: 0.15 },
    )
    observer.observe(el)
    el._fadeObserver = observer
  },

  unmounted(el) {
    el._fadeObserver?.disconnect()
    clearTimeout(el._fadeTimer)
  },
}

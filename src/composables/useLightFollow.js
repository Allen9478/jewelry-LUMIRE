import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue'
export function useLightFollow({ tiltStrength = 6, zoomOnLit = 1.06 } = {}) {
  const frameEl = ref(null)
  const isLit = ref(false)
  const cursor = reactive({
    x: 50, // 滑鼠的 X 像素座標(給光源圓心用)
    y: 50, // 滑鼠的 Y 像素座標(給光源圓心用)
    px: 0, // 滑鼠 X 位置換算成 -0.5 ~ 0.5 的比例(給傾斜角度用)
    py: 0, // 滑鼠 Y 位置換算成 -0.5 ~ 0.5 的比例(給傾斜角度用)
  })

  let userInteracted = false
  let rafId = null
  let demoTimeoutId = null

  onMounted(() => {
    if (!frameEl.value) return //防呆

    demoTimeoutId = setTimeout(() => {
      //  800ms期間就動過滑鼠的話直接不要開始
      if (userInteracted || !frameEl.value) return

      const rect = frameEl.value.getBoundingClientRect()
      const endYRatio = 0.75
      const duration = 2200 // 動畫總長
      const startTime = performance.now()

      isLit.value = true

      function tick(now) {
        //先檢查如果互動過直接 return
        if (userInteracted) return

        const elapsed = now - startTime
        const rawProgress = Math.min(elapsed / duration, 1)

        const eased = 1 - Math.pow(1 - rawProgress, 3)

        cursor.x = rect.width * eased
        cursor.y = rect.height * eased * endYRatio
        cursor.px = eased - 0.5
        cursor.py = eased * endYRatio - 0.5

        if (rawProgress < 1) {
          rafId = requestAnimationFrame(tick)
        } else {
          // 動畫走完之後稍微停留再淡出
          setTimeout(() => {
            if (!userInteracted) isLit.value = false
          }, 20)
        }
      }

      rafId = requestAnimationFrame(tick)
    }, 800)
  })

  // 元件卸載時清掉還沒觸發的計時器
  onBeforeUnmount(() => {
    if (demoTimeoutId) clearTimeout(demoTimeoutId)
    if (rafId) cancelAnimationFrame(rafId)
  })
  // ---- 事件處理 ----
  function onMouseMove(e) {
    // 新增:順手取消還在跑的示範動畫迴圈,不用等 tick() 自己發現
    if (rafId) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
    if (demoTimeoutId) {
      clearTimeout(demoTimeoutId)
      demoTimeoutId = null
    }

    if (!frameEl.value) return

    const rect = frameEl.value.getBoundingClientRect()

    cursor.x = e.clientX - rect.left
    cursor.y = e.clientY - rect.top
    cursor.px = cursor.x / rect.width - 0.5
    cursor.py = cursor.y / rect.height - 0.5

    isLit.value = true
  }
  function onMouseLeave() {
    userInteracted = true //滑鼠離開也算互動過,避免之後又被onmounted蓋掉
    isLit.value = false
  }

  // ---- 衍生樣式 ----
  // 把目前的滑鼠(或onmounted)座標寫成 CSS 變數 --lx / --ly
  const lightStyle = computed(() => ({
    '--lx': `${cursor.x}px`,
    '--ly': `${cursor.y}px`,
  }))

  const imageTransform = computed(() => {
    if (!isLit.value) {
      return { transform: 'scale(1) rotateX(0deg) rotateY(0deg)' }
    }

    const rotateX = (-cursor.py * tiltStrength).toFixed(2)
    const rotateY = (cursor.px * tiltStrength).toFixed(2)

    return {
      transform: `scale(${zoomOnLit}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
    }
  })

  return {
    frameEl, // 綁定到容器 DOM,template 寫 ref="frameEl"
    isLit, // 目前是否點亮
    onMouseMove,
    onMouseLeave,
    lightStyle, // 綁定到容器的 :style
    imageTransform, // 綁定到 <img> 的 :style
  }
}

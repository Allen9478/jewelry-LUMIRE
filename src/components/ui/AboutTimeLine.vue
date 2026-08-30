<template>
  <div ref="timelineRef" class="w-full py-12 px-4 md:px-8">
    <!-- ========== 桌機版：橫向時間軸 (md 以上顯示) ========== -->
    <div class="hidden md:grid grid-cols-5 relative">
      <!-- 背景基準線（貫穿整條，永遠存在） -->
      <div class="absolute top-[6px] left-0 right-0 h-px bg-white/10"></div>

      <!-- 動畫金色線（由左往右展開） -->
      <div
        class="absolute top-[6px] left-0 h-px bg-gold-500/60 transition-all duration-[1500ms] ease-out"
        :class="isVisible ? 'w-full' : 'w-0'"
      ></div>

      <!-- 每個時間點 -->
      <div
        v-for="(item, index) in timeline"
        :key="item.year"
        class="relative flex flex-col items-center text-center gap-2 px-2"
      >
        <!-- 圓點：固定在線條的高度上，並依序延遲變色 -->
        <span
          class="w-3 h-3 rounded-full relative z-10 transition-colors duration-500"
          :class="isVisible ? 'bg-gold-500' : 'bg-white/20'"
          :style="{ transitionDelay: isVisible ? `${index * 200}ms` : '0ms' }"
        ></span>

        <span class="text-sm text-gray-400 mt-2">{{ item.year }}</span>
        <h3 class="font-serif italic text-white text-base">{{ item.title }}</h3>
        <p class="text-xs text-gray-400 italic">{{ item.subtitle }}</p>
      </div>
    </div>

    <!-- ========== 手機版：縱向時間軸 (md 以下顯示) ========== -->
    <div class="flex md:hidden flex-col relative pl-6">
      <!-- 背景基準線 -->
      <div class="absolute top-4 bottom-0 left-[5.5px] w-px bg-white/10"></div>

      <!-- 動畫金色線（由上往下展開，用 scaleY 取代 height 動畫） -->
      <div
        class="absolute top-4 bottom-0 left-[5.5px] w-px h-[88%] bg-gold-500/60 origin-top transition-transform duration-[1500ms] ease-out"
        :class="isVisible ? 'scale-y-100' : 'scale-y-0'"
      ></div>

      <div v-for="(item, index) in timeline" :key="item.year" class="relative pb-10 last:pb-0">
        <span
          class="absolute -left-6 top-4 w-3 h-3 rounded-full transition-colors duration-500"
          :class="isVisible ? 'bg-amber-500' : 'bg-white/20'"
          :style="{ transitionDelay: isVisible ? `${index * 200}ms` : '0ms' }"
        ></span>

        <span class="text-sm text-gray-400">{{ item.year }}</span>
        <h3 class="font-serif italic text-white text-base">{{ item.title }}</h3>
        <p class="text-xs text-gray-400 italic">{{ item.subtitle }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 共用同一份資料，桌機/手機兩套 DOM 都吃這裡
const timeline = ref([
  { year: '2018', title: 'Founding Exhibition', subtitle: 'Origins' },
  { year: '2019', title: 'Forms of Devotion', subtitle: 'Group Exhibition' },
  { year: '2021', title: 'Natural Expressions', subtitle: 'Curated by Lumière' },
  { year: '2022', title: 'Beyond Ornament', subtitle: 'Solo Focus' },
  { year: '2024', title: 'Memory, Transformed', subtitle: 'Anniversary Exhibition' },
])

const timelineRef = ref(null)
const isVisible = ref(false)
let observer = null

onMounted(() => {
  // 判斷使用者是否偏好減少動態效果（無障礙）
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReducedMotion) {
    isVisible.value = true // 直接顯示最終狀態，不播放動畫
    return
  }

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        observer.disconnect() // 只觸發一次，滑出滑入不重播
      }
    },
    { threshold: 0.3 },
  )
  observer.observe(timelineRef.value)
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue'

const props = withDefaults(
  defineProps<{
    src: string
    alt?: string
  }>(),
  { alt: '' },
)

const loaded = ref(false)
const imgEl = ref<HTMLImageElement | null>(null)

// 圖片已在快取時 load 事件可能來不及觸發,這裡補判斷
function checkComplete() {
  if (imgEl.value?.complete) loaded.value = true
}

onMounted(checkComplete)

// src 換掉時(例如切換商品)要重新跑一次淡入
watch(
  () => props.src,
  async () => {
    loaded.value = false
    await nextTick()
    checkComplete()
  },
)
</script>

<template>
  <img
    ref="imgEl"
    :src="src"
    :alt="alt"
    decoding="async"
    class="base-image"
    :class="{ 'is-loaded': loaded }"
    @load="loaded = true"
    @error="loaded = true"
  />
</template>

<style scoped>
.base-image:not(.is-loaded) {
  opacity: 0;
}

.base-image.is-loaded {
  animation: base-image-in 0.5s ease;
}

@keyframes base-image-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .base-image.is-loaded {
    animation: none;
  }
}
</style>

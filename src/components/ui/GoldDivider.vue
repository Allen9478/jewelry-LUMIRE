<script setup>
import { computed } from 'vue'
const props = defineProps({
  variant: {
    type: String,
    default: 'full',
    validator: (val) => ['full', 'short', 'fade'].includes(val),
  },
  tag: {
    type: String,
    default: 'div',
  },
})
const variantClass = computed(
  () =>
    ({
      full: 'w-full bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent',
      short: 'w-12 bg-[#C9A84C]',
      fade: 'w-full bg-gradient-to-r from-[#C9A84C] to-transparent',
    })[props.variant],
)
</script>
<template>
  <component :is="tag" :class="['h-px w-full', `${variantClass}`]" />
</template>

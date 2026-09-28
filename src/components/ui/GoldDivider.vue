<script setup lang="ts">
import { computed } from 'vue'

type Variant = 'full' | 'short' | 'fade'

const props = withDefaults(
  defineProps<{
    variant?: Variant
    tag?: string
  }>(),
  {
    variant: 'full',
    tag: 'div',
  },
)

const variantClasses: Record<Variant, string> = {
  full: 'w-full bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent',
  short: 'w-12 bg-[#C9A84C]',
  fade: 'w-full bg-gradient-to-r from-[#C9A84C] to-transparent',
}

const variantClass = computed(() => variantClasses[props.variant])
</script>
<template>
  <!-- hr時不寫無障礙 -->
  <component
    :is="tag"
    :class="['h-px ', `${variantClass}`]"
    :aria-hidden="tag !== 'hr' ? true : undefined"
  />
</template>

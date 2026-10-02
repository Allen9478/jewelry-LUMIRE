<script setup lang="ts">
import { computed } from 'vue'

type Variant = 'primary' | 'ghost'

const props = withDefaults(
  defineProps<{
    variant?: Variant
    tag?: string
  }>(),
  {
    variant: 'primary',
    tag: 'button',
  },
)

const variantClasses: Record<Variant, string> = {
  primary:
    'border border-gold-500 text-gold-500 px-6 py-3 text-label tracking-[0.2em] uppercase font-sans transition-all duration-300 hover:bg-gold-500 hover:text-black',
  ghost:
    'text-gold-500 text-label tracking-luxury uppercase font-sans transition-opacity duration-300 hover:opacity-70',
}

const variantClass = computed(() => variantClasses[props.variant])
</script>

<template>
  <!-- :is是我在tag裡寫button或a改變相對應html -->
  <component :is="tag" :class="['btn', 'group', variantClass]">
    <slot />
  </component>
</template>

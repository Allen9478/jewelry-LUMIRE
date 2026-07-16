<script setup>
import { computed } from 'vue'
const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (val) => ['primary', 'ghost', 'icon'].includes(val),
  },
  tag: {
    type: String,
    default: 'button',
  },
})
const variantClass = computed(
  () =>
    ({
      primary:
        'border border-gold-500 text-gold-500 px-6 py-3 text-xs tracking-[0.2em] uppercase font-sans transition-all duration-300 hover:bg-gold-500 hover:text-black',
      ghost:
        'text-gold-500 text-xs tracking-luxury uppercase font-sans transition-opacity duration-300 hover:opacity-70',
    })[props.variant],
)
</script>

<template>
  <!-- :is是我在tag裡寫button或a改變相對應html -->
  <component :is="tag" :class="['btn', `${variantClass}`]">
    <slot />
  </component>
</template>

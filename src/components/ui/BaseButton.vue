<script setup>
defineProps({
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
</script>

<template>
  <!-- :is是我在tag裡寫button或a改變相對應html -->
  <component :is="tag" :class="['btn', `btn--${variant}`]">
    <slot />
  </component>
</template>

<!-- BaseUnderlineTab.vue -->
<script setup>
const baseClass =
  'relative inline-block py-3 whitespace-nowrap transition-colors duration-300 hover:text-gold-500 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-gold-500 after:transition-all after:duration-300 hover:after:w-full'
defineProps({
  to: { type: [String, Object], default: null },
  active: { type: Boolean, default: false },
})

defineEmits(['click'])
</script>

<template>
  <!-- exact-active-class是router完全符合連結時的樣式 -->
  <RouterLink v-if="to" :to="to" :class="baseClass" exact-active-class="after:w-full text-gold-500">
    <slot />
  </RouterLink>

  <a
    v-else
    href="#"
    :class="[baseClass, active ? 'font-bold text-gold-500 after:w-full' : 'text-cream']"
    @click.prevent="$emit('click')"
  >
    <slot />
  </a>
</template>

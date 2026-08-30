<!-- BaseUnderlineTab.vue -->
<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  to: String,
  active: Boolean,
  matchNames: {
    type: Array,
    default: () => [],
  },
})
defineEmits(['click'])

const route = useRoute()

const isActive = computed(() => {
  if (!props.matchNames.length) return false
  return route.matched.some((r) => props.matchNames.includes(r.name))
})

const baseClass =
  'relative inline-block py-3 whitespace-nowrap transition-colors duration-300 hover:text-gold-500 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-gold-500 after:transition-all after:duration-300 hover:after:w-full'
</script>

<template>
  <!-- exact-active-class是router完全符合連結時的樣式 -->
  <RouterLink
    v-if="to"
    :to="to"
    :class="[baseClass, isActive ? 'after:w-full text-gold-500' : 'text-cream']"
    exact-active-class="after:w-full text-gold-500"
  >
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

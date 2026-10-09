<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

defineProps<{
  to: RouteLocationRaw
  index: number
  label: string
  active: boolean
}>()

const emit = defineEmits<{ navigate: [] }>()
</script>

<template>
  <RouterLink
    :to="to"
    class="menu__link"
    :class="{ 'menu__link--active': active }"
    :aria-current="active ? 'page' : undefined"
    @click="emit('navigate')"
  >
    <span class="menu__link-number" aria-hidden="true">0{{ index + 1 }}</span>
    <span class="menu__link-name">{{ label }}</span>
    <span class="menu__link-arrow" aria-hidden="true">→</span>
  </RouterLink>
</template>

<style scoped>
.menu__link {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 16px 0;
  text-decoration: none;
  color: var(--color-cream);
  position: relative;
  overflow: hidden;
  transition: color 0.3s ease;
}

.menu__link::before {
  content: '';
  position: absolute;
  left: -100%;
  top: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(214, 180, 106, 0.05), transparent);
  transition: left 0.5s ease;
}

.menu__link:hover::before {
  left: 100%;
}

.menu__link:hover {
  color: var(--color-gold-500);
}

.menu__link:active {
  color: var(--color-gold-500);
  transform: translateX(4px);
}

.menu__link-number {
  font-family: var(--font-sans);
  font-size: 9px;
  letter-spacing: 0.15em;
  color: var(--color-gold-500);
  opacity: 0.6;
  width: 24px;
  flex-shrink: 0;
}

.menu__link-name {
  font-family: var(--font-serif);
  font-size: 24px;
  font-weight: 400;
  letter-spacing: 0.02em;
  line-height: 1;
  flex: 1;
  transition: transform 0.3s var(--ease-luxury);
}

.menu__link--active .menu__link-name {
  color: var(--color-gold-500);
}

.menu__link:hover .menu__link-name {
  transform: translateX(8px);
}

.menu__link-arrow {
  font-size: 14px;
  color: var(--color-gold-500);
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s var(--ease-luxury);
}

.menu__link:hover .menu__link-arrow {
  opacity: 1;
  transform: translateX(0);
}
</style>

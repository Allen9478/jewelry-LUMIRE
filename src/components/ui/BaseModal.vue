<script setup>
defineProps({
  isOpen: Boolean,
})
defineEmits(['close'])
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isOpen" class="fixed inset-0 z-70 flex items-center justify-center">
        <!-- 背景遮罩 -->
        <div class="absolute inset-0 bg-black/70" @click="$emit('close')" />
        <!-- Modal 內容 -->
        <div class="relative z-60 bg-black-soft border border-gold-400/20 p-8 max-w-md w-full mx-4">
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

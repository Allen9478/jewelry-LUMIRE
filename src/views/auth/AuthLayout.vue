<!-- views/auth/AuthLayout.vue -->
<template>
  <div class="auth flex flex-col tablet:flex-row tablet:h-[calc(100dvh-80px)] overflow-hidden">
    <!-- 圖片：固定不變 -->
    <div class="auth__hero h-[45dvh] tablet:h-full tablet:w-1/2">
      <img
        src="../../assets/images/ui/auth-hero-ring.webp"
        alt="auth-bg"
        class="w-full h-full object-cover object-[center_35%] tablet:object-[center_25%]"
      />
    </div>

    <!-- 表單區：用 Transition 切換 -->
    <div class="auth__form-wrap tablet:flex-1 tablet:flex tablet:flex-col tablet:justify-center">
      <RouterView v-slot="{ Component }">
        <Transition name="flip" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </div>
  </div>
</template>

<style scoped>
.flip-enter-active,
.flip-leave-active {
  transition:
    transform 0.5s ease,
    opacity 0.4s ease;
}
.flip-enter-from {
  transform: rotateY(-90deg);
  opacity: 0;
}
.flip-leave-to {
  transform: rotateY(90deg);
  opacity: 0;
}
@media (orientation: landscape) and (max-width: 926px) {
  .auth {
    flex-direction: row;
    height: auto;
    overflow-y: auto;
  }
  .auth__hero {
    width: 50%;
    height: auto;
    align-self: stretch;
  }
  .auth__form--wrap {
    flex: 1;
    padding-top: 5rem;
    padding-bottom: 2rem;
  }
}
</style>

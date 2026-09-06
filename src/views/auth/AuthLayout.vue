<!-- views/auth/AuthLayout.vue -->
<template>
  <div class="auth flex flex-col tablet:flex-row tablet:h-screen overflow-hidden">
    <!-- 圖片：固定不變 -->
    <div class="auth__hero h-[45svh] tablet:h-full tablet:w-1/2">
      <img
        src="../../assets/images/ui/auth-hero-ring.webp"
        alt="auth-bg"
        class="w-full h-full object-cover object-[center_35%] tablet:object-[center_25%]"
      />
      <div class="hidden tablet:block">
        <span
          class="dust"
          style="
            width: 5px;
            height: 5px;
            left: 32%;
            top: 60%;
            animation-duration: 8s;
            animation-delay: 0s;
          "
        ></span>
        <span
          class="dust"
          style="
            width: 4px;
            height: 4px;
            left: 40%;
            top: 70%;
            animation-duration: 10s;
            animation-delay: 2s;
          "
        ></span>
        <span
          class="dust"
          style="
            width: 3px;
            height: 3px;
            left: 28%;
            top: 50%;
            animation-duration: 9s;
            animation-delay: 4s;
          "
        ></span>
        <span
          class="dust"
          style="
            width: 4px;
            height: 4px;
            left: 45%;
            top: 55%;
            animation-duration: 11s;
            animation-delay: 1s;
          "
        ></span>
        <span
          class="dust"
          style="
            width: 3px;
            height: 3px;
            left: 36%;
            top: 75%;
            animation-duration: 7s;
            animation-delay: 3s;
          "
        ></span>
        <span
          class="dust"
          style="
            width: 5px;
            height: 5px;
            left: 25%;
            top: 65%;
            animation-duration: 9.5s;
            animation-delay: 5s;
          "
        ></span>
        <span
          class="dust"
          style="
            width: 3px;
            height: 3px;
            left: 38%;
            top: 45%;
            animation-duration: 8.5s;
            animation-delay: 6s;
          "
        ></span>
      </div>
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
.dust {
  position: absolute;
  border-radius: 50%;
  background: rgba(201, 168, 76, 0.9);
  filter: blur(1px);
  z-index: 10;
  pointer-events: none;
  animation: float-up linear infinite;
}

@keyframes float-up {
  0% {
    transform: translateY(0) translateX(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 0.3;
  }
  100% {
    transform: translateY(-180px) translateX(15px);
    opacity: 0;
  }
}
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

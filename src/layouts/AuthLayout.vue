<script setup lang="ts">
interface Dust {
  size: number
  x: number
  y: number
  duration: number
  delay: number
}
const dusts: Dust[] = [
  { size: 5, x: 28, y: 24, duration: 7.5, delay: 0 },
  { size: 5, x: 32, y: 60, duration: 8, delay: 0 },
  { size: 4, x: 16, y: 32, duration: 5.5, delay: 0 },
  { size: 3, x: 22, y: 20, duration: 6.5, delay: 0 },
  { size: 4, x: 40, y: 70, duration: 10, delay: 2 },
  { size: 3, x: 28, y: 50, duration: 9, delay: 4 },
  { size: 4, x: 45, y: 55, duration: 11, delay: 1 },
  { size: 5, x: 25, y: 65, duration: 9.5, delay: 5 },
]
</script>
<template>
  <div
    class="auth flex flex-col tablet:flex-row tablet:h-screen max-w-[540px] mx-auto tablet:max-w-full overflow-hidden"
  >
    <!-- 圖片：固定不變 -->
    <div class="auth__hero h-[clamp(240px,50svh,420px)] tablet:h-full tablet:w-1/2 wide:w-[45%]">
      <img
        src="../assets/images/auth/auth-hero-ring.webp"
        alt=""
        fetchpriority="high"
        class="w-full h-full object-cover object-[center_30%] tablet:object-[center_20%]"
      />
      <div class="hidden tablet:block">
        <span
          v-for="(d, i) in dusts"
          :key="i"
          class="dust"
          :style="{
            width: `${d.size}px`,
            height: `${d.size}px`,
            left: `${d.x}%`,
            top: `${d.y}%`,
            animationDuration: `${d.duration}s`,
            animationDelay: `${d.delay}s`,
          }"
        />
      </div>
    </div>

    <!-- 表單區：用 Transition 切換 -->
    <div
      class="auth__form-wrap tablet:flex-1 tablet:flex tablet:flex-col tablet:justify-center header-offset-mobile-only"
    >
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

/* 加上高度限制解決在桌機版也會觸發的問題*/
@media (orientation: landscape) and (max-width: 926px) and (max-height: 500px) {
  .auth {
    flex-direction: row;
    height: auto;
    min-height: 100svh;
    overflow-y: auto;
  }
  .auth__hero {
    width: 50%;
    height: auto;
    align-self: stretch;
  }
  .auth__form-wrap {
    flex: 1;
    padding-top: 5rem;
    padding-bottom: 2rem;
  }
}
</style>

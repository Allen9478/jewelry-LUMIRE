<script setup lang="ts">
import { computed } from 'vue'
import ringImg from '@/assets/images/home/home-hero-ring.webp'

const props = defineProps<{
  variant: 'mobile' | 'desktop'
}>()

const config = {
  mobile: {
    wrapper:
      'home-hero__visual-mobile @container relative w-full aspect-square overflow-hidden block mx-auto tablet:hidden',
    img: 'w-full h-full object-cover',
    circle:
      'absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[150cqw] h-[110cqw] rounded-full pointer-events-none',
    fade: { delay: 120, y: 24 },
  },
  desktop: {
    wrapper:
      'home-hero__visual-desktop @container relative hidden tablet:flex tablet:items-center rounded-t-full tablet:aspect-square tablet:self-center overflow-hidden tablet:-mr-10 laptop:-mr-14 wide:mt-12',
    img: 'absolute top-0 left-0 w-full h-full object-cover object-bottom',
    circle:
      'absolute tablet:top-[47%] tablet:left-[50%] -translate-x-1/2 -translate-y-1/2 tablet:w-[140cqw] tablet:h-[120cqw] rounded-full pointer-events-none',
    fade: { delay: 120, y: 8 },
  },
} as const

const cfg = computed(() => config[props.variant])
</script>

<template>
  <div v-fade-in="cfg.fade" :class="cfg.wrapper">
    <img
      :src="ringImg"
      alt=""
      fetchpriority="high"
      width="1254"
      height="1254"
      class="home-hero__visual-img"
      :class="cfg.img"
    />
    <div class="home-hero__visual-circle" :class="cfg.circle">
      <div class="home-hero__visual-circle-ring absolute inset-0 rounded-full"></div>
    </div>
  </div>
</template>

<style scoped>
/* 外層負責裁掉下方靠岩石那段 */
.home-hero__visual-circle {
  clip-path: inset(0 0 29.5% 0); /* 依實際畫面微調這個 29.5% */
}

/* 內層負責畫出漸層光圈本身 */
.home-hero__visual-circle-ring {
  background: conic-gradient(
    from 0deg,
    rgba(184, 145, 64, 0.18) 0%,
    rgba(128, 91, 35, 0.85) 25%,
    rgba(184, 145, 64, 0.18) 50%,
    rgba(128, 91, 35, 0.85) 75%,
    rgba(184, 145, 64, 0.18) 100%
  );
  mask: radial-gradient(
    circle,
    transparent calc(50% - 1.5px),
    #000 calc(50% - 1.5px),
    #000 50%,
    transparent calc(50% + 1.5px)
  );
  -webkit-mask: radial-gradient(
    circle,
    transparent calc(50% - 1.5px),
    #000 calc(50% - 1.5px),
    #000 50%,
    transparent calc(50% + 1.5px)
  );

  animation: ring-rotate 5s linear infinite;
}

@keyframes ring-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

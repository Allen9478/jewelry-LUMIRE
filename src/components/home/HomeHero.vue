<script setup lang="ts">
import { useScopedI18n } from '@/composables/useScopedI18n'
import ScrollHint from '@/components/ui/ScrollHint.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseArrowIcon from '@/components/ui/BaseArrowIcon.vue'
import GoldDivider from '@/components/ui/GoldDivider.vue'
import PlayCircleIcon from '@/components/ui/PlayCircleIcon.vue'
import HeroRingVisual from '@/components/home/HeroRingVisual.vue'

const { tx } = useScopedI18n('page.home')
</script>

<template>
  <section class="relative page-container home-hero h-auto tablet:h-[95dvh] header-offset">
    <div
      class="home-hero__container tablet:grid tablet:grid-cols-[50%_50%] mt-2 tablet:mt-0 tablet:h-full"
    >
      <div
        class="home-hero__content w-full tablet:flex tablet:flex-col tablet:justify-center tablet:gap-8 items-start"
      >
        <div v-fade-in="{ delay: 0, y: 12 }" class="inline-flex flex-col items-start">
          <p class="home-hero__eyebrow uppercase pt-5 tablet:pt-0 text-eyebrow text-gold-500">
            {{ tx('hero.eyebrow') }}
          </p>
          <GoldDivider variant="fade" class="mt-2" />
        </div>

        <h1
          v-fade-in="{ delay: 100, y: 24 }"
          class="home-hero__heading flex flex-col tablet:block tablet:tracking-wider text-display font-serif mt-6 tablet:mt-4"
        >
          <span class="block tablet:whitespace-nowrap">{{ tx('hero.headingLineFirst') }} </span>
          <span class="block wide:whitespace-nowrap">
            {{ tx('hero.headingLineSecondPrefix') }}
            <em class="home-hero__heading-accent text-gold-500">{{ tx('hero.headingAccent') }}</em>
          </span>
        </h1>

        <!-- 手機版視覺 -->
        <HeroRingVisual variant="mobile" />

        <p
          v-fade-in="{ delay: 180, y: 16 }"
          class="home-hero__subtext text-subtext pt-3 tablet:pt-0 tablet:w-[85%]"
        >
          {{ tx('hero.subtext') }}
        </p>

        <div
          v-fade-in="{ delay: 250, y: 16 }"
          class="home-hero__actions flex flex-col tablet:justify-start laptop:flex-row laptop:grid laptop:grid-cols-2 flex-wrap mt-7 tablet:mt-15 w-full"
        >
          <BaseButton
            tag="RouterLink"
            :to="{ name: 'works' }"
            class="home-hero__actions-item flex items-center w-[60vw] tablet:w-fit laptop:w-fit laptop:mr-0"
          >
            <span class="text-btn tablet:text-btn-lg">{{ tx('hero.exploreWorks') }}</span>
            <BaseArrowIcon />
          </BaseButton>

          <!-- noopener noreferrer 功能是避免頁面透過 window.opener 控制原本的頁面 -->
          <BaseButton
            tag="a"
            href="https://www.youtube.com/watch?v=ZOIspsrbiZs&pp=ygUUamV3ZWxyeSDlvaLosaHlvbHniYc%3D"
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
            class="home-hero__actions-item flex justify-start items-center mt-6 laptop:mt-0 w-fit group"
          >
            <PlayCircleIcon />
            <span
              class="ml-2 text-btn tablet:text-btn-lg text-cream group-hover:text-gold-500 group-active:text-gold-500 transition-colors"
              >{{ tx('hero.watchStory') }}</span
            >
          </BaseButton>
        </div>
      </div>

      <!-- 桌機版視覺 -->
      <HeroRingVisual variant="desktop" />
    </div>

    <div
      class="hidden tablet:block absolute bottom-4 left-1/2 -translate-x-1/2 text-gold-500 z-10"
      aria-hidden="true"
    >
      <ScrollHint />
    </div>
  </section>
</template>

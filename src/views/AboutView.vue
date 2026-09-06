<script setup>
import aboutData from '@/data/about.json'
import ItemGrid from '@/components/ui/ItemGrid.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import AboutTimeLine from '@/components/ui/AboutTimeLine.vue'
import GoldDivider from '@/components/ui/GoldDivider.vue'
import BaseAvatar from '@/components/ui/BaseAvatar.vue'
import QuoteBlock from '@/components/ui/QuoteBlock.vue'
import { useLightFollow } from '@/composables/useLightFollow'

const { frameEl, isLit, onMouseMove, onMouseLeave, lightStyle, imageTransform } = useLightFollow({
  tiltStrength: 6,
  zoomOnLit: 1.06,
})
</script>

<template>
  <div class="about header-offset-mobile-only flex flex-col gap-8 tablet:gap-20">
    <!-- 原本的 hero + philosophy 改成一個 grid wrapper -->
    <section class="about__intro grid grid-cols-1 tablet:grid-cols-2 gap-8 tablet:gap-16">
      <!-- 左欄:標題 + philosophy 疊在一起,當作一個 grid item -->
      <div
        class="about__intro-text page-container flex flex-col gap-8 tablet:gap-20 mt-8 tablet:mt-32"
      >
        <SectionHeading :eyebrow="aboutData.hero.subtitle" :title="aboutData.hero.title" />

        <div class="about__philosophy space-y-8">
          <h2 class="about__philosophy-title text-gold-500">
            {{ aboutData.philosophy.sectionTitle }}
          </h2>
          <div class="space-y-6">
            <p
              v-for="(paragraph, index) in aboutData.philosophy.paragraphs"
              :key="index"
              class="about__philosophy-paragraph"
            >
              {{ paragraph }}
            </p>
          </div>
        </div>
      </div>

      <!-- 右欄:互動圖片,h-full 撐滿跟左欄一樣高 -->

      <div class="about__intro-image hidden tablet:block h-full min-h-[400px]">
        <div
          ref="frameEl"
          class="frame relative h-full overflow-hidden"
          :class="{ 'is-lit': isLit }"
          :style="lightStyle"
          @mousemove="onMouseMove"
          @mouseleave="onMouseLeave"
        >
          <!-- 底層:永遠黑白 -->
          <img
            src="../assets/images/about/about-craft-detail.webp"
            alt="#"
            class="frame__image frame__image--base w-full h-full object-cover"
          />

          <!-- 上層:彩色,用 mask 做出跟隨游標的圓形視窗 -->
          <img
            src="../assets/images/about/about-craft-detail.webp"
            alt="#"
            class="frame__image frame__image--color absolute inset-0 w-full h-full object-cover"
          />

          <div class="frame__light absolute inset-0 pointer-events-none"></div>
          <div class="frame__bezel absolute inset-0 pointer-events-none"></div>
        </div>
      </div>
    </section>

    <section class="about__exhibition-highlights page-container">
      <h2 class="about__exhibition-highlights-title text-gold-500">EXHIBITION HIGHLIGHTS</h2>
      <AboutTimeLine :timelineData="aboutData.exhibitionHighlights" />
    </section>

    <section class="about__pillars page-container space-y-10">
      <h2 class="about__pillars-title text-gold-500">OUR PILLARS</h2>
      <div
        class="about__pillars-content w-4/5 tablet:w-full flex flex-col tablet:flex-row items-center tablet:items-stretch gap-8 mx-auto desktop:gap-12"
      >
        <div
          v-for="(pillar, index) in aboutData.pillars"
          :key="index"
          class="flex flex-col p-8 border border-gold-500/20 gap-8"
        >
          <h3 class="text-heading-sm font-serif">{{ pillar.title }}</h3>
          <p class="flex-1 text-gray-muted">{{ pillar.description }}</p>
          <GoldDivider variant="short" />
        </div>
      </div>
    </section>

    <section class="about__gallery">
      <img
        src="../assets/images/about/about-hero.webp"
        alt="Lumière Jewelry Gallery 展場空間"
        class="about__gallery-image w-full h-[250px] object-cover"
      />
    </section>

    <section class="about__team page-container space-y-8">
      <h2 class="about__team-title text-gold-500">OUR TEAM</h2>
      <ItemGrid :items="aboutData.team" grid-class="grid-cols-2 laptop:grid-cols-4">
        <template #default="{ item }">
          <BaseAvatar :artist="item" variant="team" folder="about" />
        </template>
      </ItemGrid>
    </section>

    <QuoteBlock
      variant="about"
      quote="Jewelry is what remains when the moment has passed, and what gives that moment its meaning."
    />
  </div>
</template>

<style scoped>
.about__quote-text::before {
  position: absolute;
  font-size: clamp(64px, 6vw, 96px);
  font-family: 'Georgia', serif;
  line-height: 0;
  color: var(--color-gold-500);
  content: '“';
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
}

.frame {
  cursor:
    url('/cursors/loupe-icon.svg') 16 16,
    crosshair;
  perspective: 900px;
  box-shadow:
    0 0 0 1px rgba(201, 162, 74, 0.18),
    0 40px 80px -30px rgba(0, 0, 0, 0.8);
}

.frame__image {
  transition:
    filter 0.5s ease,
    transform 0.4s ease,
    opacity 0.4s ease;
  will-change: transform;
}

/* 底層:黑白,一直存在 */
.frame__image--base {
  filter: grayscale(100%) brightness(0.75);
}

/* 上層:彩色,預設完全隱藏 */
.frame__image--color {
  filter: brightness(1) saturate(1);
  opacity: 0;

  /* 用 radial-gradient 當作 mask,--lx/--ly 就是游標位置 */
  -webkit-mask-image: radial-gradient(
    circle 180px at var(--lx, 50%) var(--ly, 50%),
    black 0%,
    black 35%,
    transparent 75%
  );
  mask-image: radial-gradient(
    circle 180px at var(--lx, 50%) var(--ly, 50%),
    black 0%,
    black 35%,
    transparent 75%
  );
}

/* 滑鼠移入時,彩色圖層才淡入 */
.frame.is-lit .frame__image--color {
  opacity: 1;
}

.frame__light {
  background: radial-gradient(
    circle 220px at var(--lx, 50%) var(--ly, 50%),
    rgba(255, 231, 180, 0.4),
    rgba(255, 214, 130, 0.12) 40%,
    rgba(0, 0, 0, 0) 70%
  );
  mix-blend-mode: soft-light;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.frame.is-lit .frame__light {
  opacity: 1;
}

.frame.is-lit .frame__bezel {
  border-color: rgba(201, 162, 74, 0.55);
}
</style>

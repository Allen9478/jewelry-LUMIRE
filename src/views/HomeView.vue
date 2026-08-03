<script setup>
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseJewelryCard from '@/components/ui/BaseJewelryCard.vue'
import BaseArtistAvatar from '@/components/ui/BaseArtistAvatar.vue'
import GoldDivider from '@/components/ui/GoldDivider.vue'
import breathing from '@/assets/images/breathing-bg.png'
import { testWork } from '@/data/testWork.js'
</script>
<template>
  <section class="relative page-container hero h-auto tablet:h-[95dvh]">
    <div
      class="hero__container tablet:grid tablet:grid-cols-[50%_50%] mt-2 tablet:mt-0 tablet:h-full"
    >
      <div
        class="hero__content w-full tablet:flex tablet:flex-col tablet:justify-center tablet:gap-8 items-start"
      >
        <div v-fade-in="{ delay: 0, y: 12 }" class="inline-flex flex-col items-start">
          <p
            class="hero__eyebrow uppercase pt-5 tablet:pt-0 text-label tablet:text-label-lg text-gold-500"
          >
            Extraordinary by Nature
          </p>
          <GoldDivider variant="fade" class="mt-2" />
        </div>
        <h1
          v-fade-in="{ delay: 100, y: 24 }"
          class="hero__heading flex flex-col tablet:block tablet:tracking-wider text-heading-1 font-serif mt-6 tablet:mt-4"
        >
          <span class="block tablet:whitespace-nowrap">Where Art </span>
          <span class="block wide:whitespace-nowrap"
            >Becomes
            <em class="hero__heading-accent text-gold-500">Timeless</em>
          </span>
        </h1>
        <div
          v-fade-in="{ delay: 120, y: 24 }"
          class="@container hero__visual-mobile relative w-full aspect-square overflow-hidden block mx-auto tablet:hidden"
        >
          <img
            src="../assets/images/home/home-hero-ring.webp"
            alt="ring on rock"
            fetchpriority="high"
            width="1254"
            height="1254"
            class="hero_visual-img w-full h-full object-cover"
          />
          <div
            class="hero__visual-circle absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[150cqw] h-[110cqw] rounded-full pointer-events-none"
          >
            <div class="hero__visual-circle-ring absolute inset-0 rounded-full"></div>
          </div>
        </div>
        <p
          v-fade-in="{ delay: 180, y: 16 }"
          class="hero__subtext text-body-sm tablet:text-body-lg tracking-wider pt-3 tablet:pt-0 tablet:w-[85%]"
        >
          We showcase exceptional jewelry by visionary artists who transform precious materials into
          timeless stories.
        </p>
        <div
          v-fade-in="{ delay: 250, y: 16 }"
          class="hero__actions flex flex-col tablet:justify-start laptop:flex-row laptop:grid laptop:grid-cols-2 flex-wrap mt-7 tablet:mt-15 w-full"
        >
          <BaseButton
            tag="RouterLink"
            to="works"
            class="hero__actions-item flex items-center w-[60vw] tablet:w-fit laptop:w-fit laptop:mr-0"
          >
            <span class="text-btn tablet:text-btn-lg">Explore Works</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6 ml-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </BaseButton>
          <BaseButton
            variant="ghost"
            class="hero__actions-item flex justify-start items-center mt-6 laptop:mt-0 w-fit group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="0.75"
              stroke="currentColor"
              class="size-10"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                class="fill-gold-500"
                d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
              />
            </svg>

            <span
              class="ml-2 text-btn tablet:text-btn-lg text-cream group-hover:text-gold-500 group-active:text-gold-500 transition-colors"
              >WATCH THE STORY</span
            >
          </BaseButton>
        </div>
      </div>
      <div
        v-fade-in="{ delay: 120, y: 8 }"
        class="@container hero__visual-desktop relative hidden tablet:flex tablet:items-center tablet:h-full overflow-hidden tablet:-mr-10 laptop:-mr-14"
      >
        <img
          src="../assets/images/home/home-hero-ring.webp"
          alt="ring on rock"
          fetchpriority="high"
          width="1254"
          height="1254"
          class="hero__visual-img w-[100cqw] tablet:h-[100cqw] laptop:h-[110cqw] desktop:h-[100cqw] wide:w-[100cqw] object-cover"
        />
        <div
          class="hero__visual-circle absolute tablet:top-[48%] tablet:left-[50%] -translate-x-1/2 -translate-y-1/2 tablet:w-[140cqw] tablet:h-[120cqw] wide:w-[140cqw] wide:h-[110cqw] rounded-full pointer-events-none"
        >
          <div class="hero__visual-circle-ring absolute inset-0 rounded-full"></div>
        </div>
      </div>
    </div>
  </section>

  <!-- 呼吸空間留白測試高度數值要調整 -->
  <section
    class="relative w-screen breathing-height my-16 overflow-hidden ml-[calc(50%-50vw)] mr-[calc(50%-50vw)]"
  >
    <img
      :src="breathing"
      alt="breathing-bg"
      width="1774"
      height="887"
      loading="lazy"
      class="absolute inset-0 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/3 min-w-full h-full object-cover animate-shimmer"
      aria-hidden="true"
    />

    <!-- 手機版暗化遮罩 -->
    <div class="absolute inset-0 bg-black/20" />
  </section>
  <section class="page-container works-section">
    <div class="works-section__container flex flex-col items-start">
      <div v-fade-in="{ delay: 0, y: 12 }" class="inline-flex flex-col items-start">
        <p
          class="works-section__eyebrow tablet:block uppercase text-label tablet:text-label-lg text-gold-500"
        >
          FEATURED WORKS
        </p>
        <GoldDivider variant="fade" class="mt-2" />
      </div>
      <div
        class="works-section__heading-group flex flex-col tablet:flex-row tablet:justify-between tablet:items-center tablet:py-8 w-full"
      >
        <h2
          v-fade-in="{ delay: 80, y: 16 }"
          class="works-section__heading text-heading-2 my-4 tablet:my-0 font-serif"
        >
          Curated Pieces
        </h2>

        <BaseButton
          tag="RouterLink"
          to="works"
          v-fade-in="{ delay: 80, y: 16 }"
          variant="ghost"
          class="works-section__view-all inline-flex justify-start items-center"
          ><span class="text-btn tablet:text-btn-lg"> VIEW ALL WORKS </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6 ml-2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            /></svg
        ></BaseButton>
      </div>
    </div>
    <div
      class="works-section__grid grid gap-4 tablet:gap-5 laptop:gap-6 grid-cols-1 tablet:grid-cols-3 laptop:grid-cols-4 pt-10 tablet:pt-15 desktop:pt-20 place-items-center"
    >
      <BaseJewelryCard
        v-for="(item, i) in testWork"
        v-fade-in="{
          delay: 200 + i * 100,
          y: 28,
          mobile: { delay: 100 + i * 60, y: 16 },
        }"
        :key="item.id"
        :product="item"
      ></BaseJewelryCard>
    </div>
  </section>
  <GoldDivider class="w-full my-20 tablet:my-40" />

  <section class="page-container artists-section">
    <div v-fade-in class="artists-section__container">
      <div v-fade-in="{ delay: 0, y: 12 }" class="inline-flex flex-col items-start">
        <p
          class="artists-section__eyebrow tablet:block uppercase text-label tablet:text-label-lg text-gold-500"
        >
          ARTISTS
        </p>
        <GoldDivider variant="fade" class="mt-2" />
      </div>
      <div
        class="artists-section__heading-group flex flex-col tablet:flex-row tablet:justify-between tablet:items-center tablet:py-8"
      >
        <h2
          v-fade-in="{ delay: 80, y: 16 }"
          class="artists-section__heading text-heading-2 my-4 tablet:my-0 font-serif"
        >
          Visionaries Behind Beauty
        </h2>

        <BaseButton
          tag="RouterLink"
          to="artists"
          v-fade-in="{ delay: 80, y: 16 }"
          variant="ghost"
          class="artists-section__view-all inline-flex justify-start items-center text-body-sm"
          ><span class="text-btn tablet:text-btn-lg"> VIEW ALL ARTISTS </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6 ml-2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            /></svg
        ></BaseButton>
      </div>
    </div>
    <div
      v-fade-in="{ delay: 300 }"
      class="artists-section__grid grid grid-cols-2 gap-3 tablet:grid-cols-4 tablet:gap-5 desktop:gap-7 pt-10 tablet:pt-15 desktop:pt-20"
    >
      <BaseArtistAvatar
        v-for="(item, i) in testWork"
        v-fade-in="{
          delay: 200 + i * 100,
          y: 28,
          mobile: { delay: 100 + i * 60, y: 16 },
        }"
        :key="item.id"
        :product="item"
        class="flex flex-col items-center"
      ></BaseArtistAvatar>
    </div>
  </section>
  <GoldDivider class="w-full my-20 tablet:my-40" />

  <section
    class="page-container exhibition-section tablet:grid tablet:grid-cols-[35%_65%] tablet:mb-5"
  >
    <div class="flex justify-start items-center">
      <div class="exhibition-section__container flex flex-col items-start">
        <div v-fade-in="{ delay: 0, y: 10 }" class="inline-flex flex-col items-start">
          <p
            class="exhibition-section__eyebrow tablet:block uppercase text-label tablet:text-label-lg text-gold-500"
          >
            CURRENT EXHIBITION
          </p>
          <GoldDivider variant="fade" class="mt-2" />
        </div>
        <h2
          v-fade-in="{ delay: 100, y: 20 }"
          class="exhibition-section__heading text-heading-2 font-serif my-3 tablet:mt-5"
        >
          Nature's Forms
        </h2>
        <p
          v-fade-in="{ delay: 180, y: 16 }"
          class="exhibition-section__subtext text-gray-muted text-body-sm tablet:text-body-lg tracking-wider leading-loose tablet:w-[85%]"
        >
          International Jewelry Exhibition 2026
        </p>
        <div class="exhibition-section__cta-group mt-3 tablet:mt-5">
          <p v-fade-in="{ delay: 260, y: 16 }" class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6 text-gold-500"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
              />
            </svg>
            <span class="ml-2 text-gray-muted text-body-sm tracking-wider"
              >MAY 18 - AUG 25. 2026</span
            >
          </p>
          <p v-fade-in="{ delay: 260, y: 16 }" class="flex items-center mt-2 tablet:mt-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6 text-gold-500"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>
            <span class="ml-2 text-gray-muted text-body-sm tracking-wider"
              >LUMIERE GALLERY. TAIPEI</span
            >
          </p>
        </div>
        <BaseButton
          tag="RouterLink"
          to="exhibitions"
          v-fade-in="{ delay: 340, y: 16 }"
          class="hero__actions-item flex items-center w-full tablet:w-fit mt-5 tablet:mt-10"
        >
          <span class="text-btn tablet:text-btn-lg">VIEW EXHIBITION</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6 ml-2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            />
          </svg>
        </BaseButton>
      </div>
    </div>
    <div
      class="exhibition-section__visual hidden tablet:block relative tablet:items-center tablet:h-full overflow-hidden tablet:-mr-10 laptop:-mr-14"
    >
      <img
        v-fade-in="{ delay: 200, y: 0 }"
        src="../assets/images/home/home-exhibition.webp"
        alt="Molten Flow Ring"
        loading="lazy"
        width="1470"
        height="1070"
        class="w-full h-full object-cover"
      />
    </div>
  </section>

  <section
    class="newsletter-section border-y border-gold-400/20 flex flex-col items-center justify-center gap-8 px-6 py-16 my-10 tablet:my-0 tablet:mb-5 tablet:py-20 laptop:py-24 w-screen ml-[calc(50%_-_50vw)] mr-[calc(50%_-_50vw)] bg-cover bg-center"
  >
    <div
      v-fade-in="{ delay: 200, y: 20 }"
      class="newsletter-section__quote-group flex flex-col items-center justify-center text-center text-gold-500 z-10"
    >
      <span
        class="newsletter-section__quote-mark text-4xl leading-none font-serif tablet:text-5xl laptop:text-6xl"
        aria-hidden="true"
        >"</span
      >

      <p
        class="newsletter-section__quote mx-auto mt-2 max-w-[280px] text-lg italic font-serif leading-relaxed [text-wrap:balance] ipad:max-w-md ipad:text-xl tablet:max-w-xl tablet:text-2xl laptop:text-[1.75rem]"
      >
        Jewelry is not just an ornament, it is a story, a memory, a work of art.
      </p>

      <p
        class="newsletter-section__author mt-4 text-xs uppercase tracking-wider text-gold-300 tablet:mt-5 tablet:text-sm"
      >
        — Lumière Jewelry Gallery
      </p>
    </div>

    <form
      v-fade-in="{ delay: 240, y: 20 }"
      class="newsletter-section__form flex w-full max-w-xs ipad:max-w-sm tablet:max-w-md z-10"
    >
      <label for="newsletter-email" class="sr-only">Email address</label>
      <input
        id="newsletter-email"
        name="email"
        type="email"
        autocomplete="email"
        required
        placeholder="Enter email to get news"
        class="newsletter-section__input min-w-0 flex-1 border border-gold-600 border-r-0 bg-transparent p-3 text-sm text-white placeholder:text-gold-200/50 focus:outline-none focus:ring-1 focus:ring-gold-400"
      />
      <button
        type="submit"
        aria-label="Subscribe to newsletter"
        class="newsletter-section__submit flex h-[46px] w-[46px] shrink-0 items-center justify-center bg-gold-600 text-black transition-colors hover:bg-gold-500 tablet:h-[50px] tablet:w-[50px]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-5"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
          />
        </svg>
      </button>
    </form>
  </section>
</template>

<style scoped>
.breathing-height {
  height: clamp(140px, 8.6vw + 108px, 240px);
}
.animate-shimmer {
  animation-duration: 3s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: shimmer;
  animation-timing-function: ease-in-out;
}
@keyframes shimmer {
  0% {
    opacity: 0.85;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.85;
  }
}
/* 外層：負責裁掉下方靠岩石那段 */
.hero__visual-circle {
  clip-path: inset(0 0 29.5% 0); /* 依實際畫面微調這個 29.5% */
}
/* 內層：負責畫出漸層光圈本身 */
.hero__visual-circle-ring {
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

@media (min-width: 768px) {
  .newsletter-section {
    position: relative;
    background-image: url('../assets/images/textures/texture2.webp');
    background-size: cover;
    background-position: center;
  }
}
</style>

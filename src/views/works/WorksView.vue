<script setup>
import GoldDivider from '@/components/ui/GoldDivider.vue'
</script>

<template>
  <div class="hero @container">
    <div class="text-container">
      <div v-fade-in="{ delay: 0, y: 12 }" class="inline-flex flex-col items-start">
        <p
          class="works-section__eyebrow tablet:block uppercase text-label tablet:text-label-lg text-gold-500"
        >
          FEATURED WORKS
        </p>
        <GoldDivider variant="fade" class="mt-2" />
      </div>
      <h2
        v-fade-in="{ delay: 80, y: 16 }"
        class="works-section__heading text-[24px] tablet:text-heading-2 my-4 font-serif"
      >
        Curated Collection
      </h2>
      <p class="works-section__desc">
        We showcase exceptional jewelry by visionary artists who transform precious materials into
        timeless stories.
      </p>
    </div>
    <div class="hero__image w-full overflow-hidden hidden tablet:block">
      <img src="../../assets/images/works/rrrr.png" alt="jewelry on rock" />
    </div>
  </div>
</template>

<style scoped>
.hero {
  --heading-size: clamp(24px, 6.5cqw, 40px);
  --desc-size: clamp(13px, 3.2cqw, 16px);
  display: flex;
  align-items: stretch; /* 讓圖片欄「拉伸」去符合文字欄的高度 */
  min-height: 460px; /* 保底高度，避免文字太短時 hero 太扁 */
}

.text-container {
  flex: 1 1 50%; /* 這一欄的內容量決定整個 hero 的高度 */
  display: flex;
  flex-direction: column;
  justify-content: center; /* 內容在自然高度內垂直置中 */
  padding: 88px 64px;
}

.works-section__desc {
  font-size: var(--desc-size);
  max-width: 55cqw;
  line-height: 1.6;
  color: var(--color-text-muted, #c9c2b3);
}

.hero__image {
  flex: 1 1 50%;
  min-height: 0;
  overflow: hidden;
}

.hero__image img {
  width: 100%;
  height: 100%; /* 完全交給 .text-container 決定，不會反過來撐高 hero */
  object-fit: cover;
  object-position: 80% center;
}

/* ---------- Responsive ---------- */
@media (max-width: 768px) {
  .hero {
    width: 100%;
    aspect-ratio: 3 / 2;
    min-height: 250px;
    position: relative;
    background-image: url('../../assets/images/works/rrrr.png');
    background-size: cover;
    background-position: left -10% center;
    background-repeat: no-repeat;
  }
  .text-container {
    justify-content: start;
    padding: 20px;
  }
  .hero__image {
    flex: none;
    /* 手機版圖片給固定高度 */
  }
}
</style>

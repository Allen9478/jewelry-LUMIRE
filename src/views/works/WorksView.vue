<script setup>
import works from '@/data/works.json'
import BaseWorkCard from '@/components/ui/BaseWorkCard.vue'
import BaseUnderlineTab from '@/components/common/BaseUnderlineTab.vue'
import ArtistsCarousel from '@/components/ui/ArtistsCarousel.vue'
import GoldDivider from '@/components/ui/GoldDivider.vue'
import { ref, computed } from 'vue'

const currentCategory = ref(null)

const availableCategories = computed(() => {
  return [...new Set(works.map((item) => item.category))]
})

const filteredWorks = computed(() => {
  if (!currentCategory.value) return works
  return works.filter((item) => item.category === currentCategory.value)
})

// 計算每個作品卡片的淡入延遲時間,還不確定要不要全站套用
function getFadeDelay(index, base, step) {
  return base + index * step
}
//TODO: 邏輯測試完成,把這頁排版css寫好再整理js
</script>

<template>
  <section class="work-hero">
    <!-- //hero要滿版所以page-container寫在文字區塊即可 -->
    <div class="page-container text-container mt-4 flex flex-col items-start">
      <div v-fade-in="{ delay: 0, y: 12 }" class="inline-flex flex-col items-start">
        <p class="works-section__eyebrow tablet:block text-eyebrow text-gold-500 uppercase">
          WORKS GALLERY
        </p>
        <GoldDivider variant="fade" class="mt-2" />
      </div>
      <h2
        v-fade-in="{ delay: 80, y: 16 }"
        class="works-section__heading text-heading laptop:my-4 my-2 font-serif whitespace-nowrap italic"
      >
        Curated Collection
      </h2>
      <p class="works-section__desc text-subtext">
        We showcase exceptional jewelry by visionary artists who transform precious materials into
        timeless stories.
      </p>
    </div>
    <div class="work-hero__image tablet:block hidden w-full overflow-hidden">
      <img
        src="../../assets/images/works/works_hero.webp"
        alt="jewelry on rock"
        fetchpriority="high"
        width="1704"
        height="923"
      />
    </div>
  </section>
  <div class="work-main page-container">
    <nav aria-label="依作品類別篩選作品" class="py-3">
      <ul
        class="tablet:overflow-visible justify-around no-scrollbar tablet:gap-10 flex items-center gap-6 overflow-x-auto tablet:pr-8 whitespace-nowrap"
      >
        <!-- 1. 新增：手動加入「全部」按鈕 -->
        <li class="text-eyebrow shrink-0">
          <BaseUnderlineTab :active="currentCategory === null" @click="currentCategory = null">
            ALL 全部
          </BaseUnderlineTab>
        </li>

        <!-- 2. 原本的作家迴圈 -->
        <li v-for="category in availableCategories" :key="category" class="text-eyebrow shrink-0">
          <BaseUnderlineTab
            :active="currentCategory === category"
            @click="currentCategory = category"
            :aria-current="currentCategory === category ? 'true' : undefined"
          >
            {{ category }}
          </BaseUnderlineTab>
        </li>
      </ul>
    </nav>

    <div
      class="works-section__grid tablet:grid tablet:grid-cols-3 laptop:grid-cols-4 tablet:h-auto tablet:overflow-visible tablet:gap-5 laptop:gap-6 flex h-[70vh] flex-col place-items-center gap-4 overflow-y-auto py-4 no-scrollbar"
    >
      <div
        v-for="(work, i) in filteredWorks"
        v-fade-in="{
          delay: getFadeDelay(i, 50, 80),
          y: 28,
          mobile: { delay: getFadeDelay(i, 100, 30), y: 16 },
        }"
        :key="work.id"
        class="flex w-full justify-center"
      >
        <BaseWorkCard :work="work" :loading="i < 4 ? 'eager' : 'lazy'"></BaseWorkCard>
      </div>
    </div>
  </div>
  <ArtistsCarousel class="page-container mt-16" />
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.work-hero {
  display: flex;
  align-items: stretch; /* 讓圖片欄「拉伸」去符合文字欄的高度 */
  min-height: 460px; /* 保底高度，避免文字太短時 hero 太扁 */
}

.text-container {
  flex: 1 1 50%; /* 這一欄的內容量決定整個 hero 的高度 */
  display: flex;
  flex-direction: column;
  justify-content: center; /* 內容在自然高度內垂直置中 */
  /* padding: 88px 64px; */
}

.works-section__desc {
  max-width: 55cqw;
  color: var(--color-text-muted, #c9c2b3);
}

.work-hero__image {
  flex: 1 1 50%;
  min-height: 0;
  overflow: hidden;
}

.work-hero__image img {
  width: 100%;
  height: 100%; /* 完全交給 .text-container 決定，不會反過來撐高 work-hero */
  object-fit: cover;
  object-position: 80% center;
}

/* ---------- Responsive ---------- */
@media (max-width: 768px) {
  .work-hero {
    width: 100%;
    aspect-ratio: 3 / 2;
    min-height: 250px;
    position: relative;
    background-image: url('../../assets/images/works/works_hero.webp');
    background-size: cover;
    background-position: left -10% center;
    background-repeat: no-repeat;
  }
  .text-container {
    justify-content: start;
    /* padding: 20px; */
  }
  .work-hero__image {
    flex: none;
    /* 手機版圖片給固定高度 */
  }
}
</style>

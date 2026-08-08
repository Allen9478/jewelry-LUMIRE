<script setup>
import works from '@/data/works.json'
import BaseWorkCard from '@/components/ui/BaseWorkCard.vue'
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

function getCategoryClass(category) {
  return currentCategory.value === category
    ? 'font-bold text-gold-500'
    : 'text-gray-500 transition-colors'
}
// 計算每個作品卡片的淡入延遲時間,還不確定要不要全站套用
function getFadeDelay(index, base, step) {
  return base + Math.min(index, 8) * step
}
//TODO: 邏輯測試完成,把這頁排版css寫好再整理js
</script>

<template>
  <div class="hero page-container">
    <div class="text-container flex flex-col items-start">
      <div v-fade-in="{ delay: 0, y: 12 }" class="inline-flex flex-col items-start">
        <p class="works-section__eyebrow tablet:block uppercase text-eyebrow text-gold-500">
          WORKS GALLERY
        </p>
        <GoldDivider variant="fade" class="mt-2" />
      </div>
      <h2
        v-fade-in="{ delay: 80, y: 16 }"
        class="works-section__heading text-heading whitespace-nowrap my-4 font-serif italic"
      >
        Curated Collection
      </h2>
      <p class="works-section__desc text-subtext">
        We showcase exceptional jewelry by visionary artists who transform precious materials into
        timeless stories.
      </p>
    </div>
    <div class="hero__image w-full overflow-hidden hidden tablet:block">
      <img src="../../assets/images/works/works_hero.webp" alt="jewelry on rock" />
    </div>
  </div>
  <div class="work-main page-container">
    <nav aria-label="依作品類別篩選作品">
      <ul class="flex items-center gap-6 overflow-x-auto whitespace-nowrap no-scrollbar">
        <!-- 1. 新增：手動加入「全部」按鈕 -->
        <li class="shrink-0">
          <a
            href="#"
            @click.prevent="currentCategory = null"
            class="hover:text-gold-500 transition-colors"
            :class="getCategoryClass(null)"
          >
            ALL 全部
          </a>
        </li>

        <!-- 2. 原本的作家迴圈 -->
        <li v-for="category in availableCategories" :key="category" class="shrink-0">
          <button
            href="#"
            @click.prevent="currentCategory = category"
            class="hover:text-gold-500 transition-colors"
            :class="getCategoryClass(category)"
            :aria-current="currentCategory === category ? 'true' : undefined"
          >
            {{ category }}
          </button>
        </li>
      </ul>
    </nav>

    <div
      class="home-works-section__grid grid gap-4 tablet:gap-5 laptop:gap-6 grid-cols-1 tablet:grid-cols-3 laptop:grid-cols-4 pt-10 tablet:pt-15 desktop:pt-20 place-items-center"
    >
      <!-- 3. 資料來源保持使用篩選後的 filteredWorks -->
      <BaseWorkCard
        v-for="(work, i) in filteredWorks"
        v-fade-in="{
          delay: getFadeDelay(i, 200, 80),
          y: 28,
          mobile: { delay: getFadeDelay(i, 100, 50), y: 16 },
        }"
        :key="work.id"
        :work="work"
      ></BaseWorkCard>
    </div>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.hero {
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
    background-image: url('../../assets/images/works/works_hero.webp');
    background-size: cover;
    background-position: left -10% center;
    background-repeat: no-repeat;
  }
  .text-container {
    justify-content: start;
    /* padding: 20px; */
  }
  .hero__image {
    flex: none;
    /* 手機版圖片給固定高度 */
  }
}
</style>

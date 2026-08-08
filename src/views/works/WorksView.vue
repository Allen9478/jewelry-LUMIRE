<script setup>
import works from '@/data/works.json'
import BaseWorkCard from '@/components/ui/BaseWorkCard.vue'
import GoldDivider from '@/components/ui/GoldDivider.vue'
import { ref, computed } from 'vue'
const categoryarr = ref(['Wei Chen', 'Elena Volkov', 'Marco Bianchi', 'Yu An Lin'])
const currentCategory = ref(null)
const categoryClass = computed(() => {
  return currentCategory.value === null
    ? 'font-bold text-gold-500 '
    : 'text-gray-500 transition-colors'
})

const filteredWork = computed(() => {
  if (!currentCategory.value) return works
  console.log(currentCategory.value)
  return works.filter((item) => item.designer === currentCategory.value)
})
//TODO: 邏輯測試完成,把這頁排版css寫好再整理js
</script>

<template>
  <div class="hero">
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
  <div class="work-main">
    <nav>
      <ul class="flex justify-center items-center gap-4">
        <!-- 1. 新增：手動加入「全部」按鈕 -->
        <li>
          <a
            href="#"
            @click.prevent="currentCategory = null"
            class="hover:text-gold-500 transition-colors"
            :class="categoryClass"
          >
            ALL 全部
          </a>
        </li>

        <!-- 2. 原本的作家迴圈 -->
        <li v-for="name in categoryarr" :key="name">
          <a
            href="#"
            @click.prevent="currentCategory = name"
            class="hover:text-gold-500 transition-colors"
            :class="
              currentCategory === name
                ? 'font-bold text-gold-500 '
                : 'text-gray-500 transition-colors'
            "
          >
            {{ name }}
          </a>
        </li>
      </ul>
    </nav>

    <div
      class="home-works-section__grid grid gap-4 tablet:gap-5 laptop:gap-6 grid-cols-1 tablet:grid-cols-3 laptop:grid-cols-4 pt-10 tablet:pt-15 desktop:pt-20 place-items-center"
    >
      <!-- 3. 資料來源保持使用篩選後的 filteredWork -->
      <BaseWorkCard
        v-for="(item, i) in filteredWork"
        v-fade-in="{
          delay: 200 + i * 100,
          y: 28,
          mobile: { delay: 100 + i * 60, y: 16 },
        }"
        :key="item.id"
        :work="item"
      ></BaseWorkCard>
    </div>
  </div>
</template>

<style scoped>
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
  padding: 88px 64px;
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
    padding: 20px;
  }
  .hero__image {
    flex: none;
    /* 手機版圖片給固定高度 */
  }
}
</style>

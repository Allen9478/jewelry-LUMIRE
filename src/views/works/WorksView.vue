<script setup lang="ts">
import { works } from '@/data'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import BaseWorkCard from '@/components/ui/BaseWorkCard.vue'
import BaseUnderlineTab from '@/components/common/BaseUnderlineTab.vue'
import ArtistsCarousel from '@/components/ui/ArtistsCarousel.vue'
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCommonI18n } from '@/composables/useScopedI18n'

const { t } = useI18n()
const { tx: txCommon } = useCommonI18n()
const currentCategory = ref<string | null>(null)

const availableCategories = computed(() => {
  return [...new Set(works.map((item) => item.category))]
})

const filteredWorks = computed(() => {
  if (!currentCategory.value) return works
  return works.filter((item) => item.category === currentCategory.value)
})

function getFadeDelay(index: number, base: number, step: number) {
  return base + index * step
}
</script>

<template>
  <section class="work-hero flex items-stretch tablet:min-h-[460px]">
    <div
      class="page-container mt-4 header-offset flex flex-col items-start flex-1 basis-1/2 justify-center"
    >
      <SectionHeading
        :eyebrow="t('page.works.heading.eyebrow')"
        :title="t('page.works.heading.title')"
        titleTag="h1"
        titleClass="whitespace-nowrap italic py-2 tablet:py-4"
      />
      <p
        v-fade-in="{ delay: 120, y: 20 }"
        class="works-section__desc max-w-[55cqw] text-subtext text-gray-muted"
      >
        {{ t('page.works.heading.desc') }}
      </p>
    </div>

    <div
      v-fade-in="{ delay: 160, y: 12, duration: 900 }"
      class="work-hero__image-desktop hidden tablet:block tablet:flex-1 tablet:basis-1/2 min-h-0 overflow-hidden"
    >
      <img
        src="../../assets/images/works/works_hero.webp"
        alt="jewelry on rock"
        fetchpriority="high"
        width="1704"
        height="923"
        class="w-full h-full object-cover object-[80%_center]"
      />
    </div>
  </section>
  <div class="work-main page-container relative">
    <nav
      v-fade-in="{ delay: 0, y: 12, mobile: { delay: 200, y: 12 } }"
      :aria-label="txCommon('aria.filterWorks')"
      class="py-3 overflow-x-auto no-scrollbar tablet:overflow-visible"
    >
      <ul
        class="flex w-max items-center tablet:w-full tablet:justify-around gap-8 tablet:gap-10 mx-auto pr-4 tablet:pr-8 whitespace-nowrap"
      >
        <li class="text-eyebrow shrink-0">
          <BaseUnderlineTab :active="currentCategory === null" @click="currentCategory = null">
            {{ t('category.all') }}
          </BaseUnderlineTab>
        </li>

        <li v-for="category in availableCategories" :key="category" class="text-eyebrow shrink-0">
          <BaseUnderlineTab
            :active="currentCategory === category"
            @click="currentCategory = category"
            :aria-current="currentCategory === category ? 'true' : undefined"
          >
            {{ t('category.' + category.toLowerCase()) }}
          </BaseUnderlineTab>
        </li>
      </ul>
    </nav>
    <!-- 這是給navbar的漸層遮罩 -->
    <div
      class="tablet:hidden pointer-events-none absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-black to-transparent"
      aria-hidden="true"
    ></div>
    <div
      class="works-section__grid tablet:grid tablet:grid-cols-3 laptop:grid-cols-4 h-[80vh] tablet:h-auto tablet:overflow-visible tablet:gap-5 laptop:gap-6 flex flex-col place-items-center gap-4 overflow-y-auto py-4 no-scrollbar"
    >
      <div
        v-for="(work, i) in filteredWorks"
        v-fade-in="{
          delay: getFadeDelay(i, 50, 80),
          y: 28,
          mobile: { delay: getFadeDelay(i, 100, 30), y: 16 },
        }"
        :key="`${currentCategory}-${work.id}`"
        class="flex w-full justify-center"
      >
        <BaseWorkCard :work="work" :loading="i < 4 ? 'eager' : 'lazy'"></BaseWorkCard>
      </div>
    </div>
    <!-- 這是給item捲動的漸層遮罩 -->
    <div
      class="tablet:hidden pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent"
      aria-hidden="true"
    ></div>
  </div>
  <ArtistsCarousel v-fade-in="{ delay: 0, y: 20 }" class="mt-16" />
</template>

<style scoped>
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
  overscroll-behavior-x: contain; /* 避免捲到底時把手勢傳給外層 body 造成連動抖動或觸發返回手勢 */
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>

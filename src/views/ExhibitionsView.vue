<script setup lang="ts">
import { computed } from 'vue'
import { useScopedI18n, useCommonI18n, type RtInput } from '@/composables/useScopedI18n'
import heroImage from '@/assets/images/exhibition/exhibition-hero.webp'
import visitImage from '@/assets/images/exhibition/exhibition-location.webp'
import ItemGrid from '@/components/ui/ItemGrid.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import BaseWorkCard from '@/components/ui/BaseWorkCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseArrowIcon from '@/components/ui/BaseArrowIcon.vue'
import getImageUrl from '@/utils/getImageUrl'
import GoldDivider from '@/components/ui/GoldDivider.vue'
import works from '@/data/works.json'
import artists from '@/data/artists.json'
import { CalendarDaysIcon, MapPinIcon, ClockIcon } from '@heroicons/vue/24/outline'

// i18n 裡取回來的原始形狀
interface PastExhibitionRaw {
  title: RtInput
  subtitle: RtInput
  img: RtInput
}

// 轉換後給 template 用的形狀
interface PastExhibition {
  title: string
  subtitle: string
  img: string
}

const { tx, txList, txItems } = useScopedI18n('page.exhibitions')
const { tx: txCommon } = useCommonI18n()
const artistExample = artists.find((a) => a.id === 'yu_an_lin')
const descriptions = computed(() => txList('description'))
const artistBio = computed(() => txList('featuredArtist.bio'))
const pastExhibitions = computed(() =>
  txItems<PastExhibitionRaw, PastExhibition>('pastExhibitions', (item, rt) => ({
    title: rt(item.title),
    subtitle: rt(item.subtitle),
    img: rt(item.img),
  })),
)

function randomWorks<T>(arr: readonly T[], count: number): T[] {
  const pool = [...arr]
  const result: T[] = []
  const n = Math.min(count, pool.length)

  for (let k = 0; k < n; k++) {
    const index = Math.floor(Math.random() * pool.length)
    const [picked] = pool.splice(index, 1)
    if (picked !== undefined) result.push(picked)
  }

  return result
}
const featuredWorks = randomWorks(works, 6)
</script>
<template>
  <div class="exhibitions flex flex-col gap-8 desktop:gap-12">
    <div class="exhibitions__hero relative w-full h-[350px] md:h-[600px] overflow-hidden">
      <img
        :src="heroImage"
        alt="Natural Form Exhibition"
        fetchpriority="high"
        width="1536"
        height="1024"
        class="absolute inset-0 w-full h-full object-cover object-center"
      />

      <div
        class="absolute inset-0 bg-gradient-to-t from-black/100 via-black/20 to-transparent"
      ></div>
      <SectionHeading
        :eyebrow="tx('status')"
        :title="tx('title')"
        :desc="tx('subtitle')"
        titleTag="h1"
        class="page-container absolute bottom-0 tablet:bottom-12 tablet:left-4 z-1"
      />
    </div>
    <div
      v-fade-in="{ delay: 0, y: 12 }"
      class="exhibitions__info page-container flex flex-col tablet:flex-row tablet:justify-around space-y-4 tablet:space-y-0 text-cream/80"
    >
      <p class="flex space-x-4 items-center">
        <CalendarDaysIcon class="size-7 text-gold-500 -translate-y-[2px]" />
        <span>{{ tx('date') }}</span>
      </p>
      <div class="hidden laptop:block w-px h-6 bg-gold-500/60"></div>
      <p class="flex space-x-4 items-center">
        <MapPinIcon class="size-7 text-gold-500 -translate-y-[2px]" />
        <span>{{ tx('location') }}</span>
      </p>
      <div class="hidden laptop:block w-px h-6 bg-gold-500/60"></div>

      <p class="flex space-x-4 items-center">
        <ClockIcon class="size-7 text-gold-500 -translate-y-[2px]" />
        <span>{{ tx('hours') }}</span>
      </p>
    </div>
    <div
      class="exhibitions__quote page-container grid tablet:grid-cols-[50%_50%] laptop:grid-cols-[40%_60%] desktop:grid-cols-[35%_65%] wide:grid-cols-[30%_70%] space-y-4 tablet:space-y-0 tablet:space-x-4 wide:mt-24"
    >
      <div
        v-fade-in="{ delay: 0, y: 16, mobile: { delay: 0, y: 12 } }"
        class="exhibitions__quote-main relative flex items-center"
      >
        <p
          class="exhibitions__quote-text text-quote text-gold-500 p-10 tablet:px-8 desktop:px-12 wide:px-16 italic"
        >
          {{ tx('quote') }}
        </p>
      </div>
      <div
        v-fade-in="{ delay: 100, y: 16, mobile: { delay: 0, y: 12 } }"
        class="laptop:w-[90%] flex flex-col tablet:justify-center tablet:border-l tablet:border-gold-500/60 space-y-4 tablet:px-8"
      >
        <p v-for="(description, index) in descriptions" :key="index">
          {{ description }}
        </p>
      </div>
    </div>
    <section
      class="exhibitions__works page-container space-y-6 tablet:space-y-10 desktop:space-y-16"
    >
      <p v-fade-in="{ delay: 0, y: 12 }" class="text-subhead text-gold-500">
        {{ tx('workInExhibitions') }}
      </p>
      <ItemGrid
        :items="featuredWorks"
        grid-class="grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 "
        class=""
      >
        <template #default="{ item }">
          <BaseWorkCard v-fade-in="{ delay: 0, y: 28, mobile: { delay: 0, y: 16 } }" :work="item" />
        </template>
      </ItemGrid>
    </section>
    <section
      v-fade-in="{ delay: 0, y: 20, mobile: { delay: 0, y: 14 } }"
      class="exhibitions__artist page-container"
    >
      <p class="tablet:hidden text-subhead text-gold-500">
        {{ tx('featuredArtistLabel') }}
      </p>
      <div
        v-if="artistExample"
        class="exhibitions__artist-grid grid grid-cols-[40%_60%] tablet:grid-cols-[50%_50%] laptop:grid-cols-[40%_60%] desktop:grid-cols-[30%_70%]"
      >
        <div class="exhibitions__artist-photo aspect-[3/4] max-h-[500px] overflow-hidden">
          <img
            src="../assets/images/artists/yu_an_lin-profilesmall.webp"
            alt="artist-YU An Lin"
            class="w-full h-full object-cover"
          />
        </div>
        <div class="exhibitions__artist-info flex flex-col justify-center">
          <div class="space-y-4 mt-10 tablet:ml-8 laptop:ml-12 desktop:ml-16">
            <p class="hidden tablet:block text-subhead text-gold-500">
              {{ tx('featuredArtistLabel') }}
            </p>

            <h2 class="exhibitions__artist-name text-heading-sm font-serif">
              {{ tx('featuredArtist.name') }}
            </h2>
            <div class="exhibitions__artist-meta flex text-body text-cream/85">
              <p class="pr-2 border-r border-gold-500/60 text-body-sm tablet:text-body">
                {{ tx('featuredArtist.country') }}
              </p>
              <p class="pl-2 text-body-sm tablet:text-body">{{ tx('featuredArtist.title') }}</p>
            </div>
            <p
              v-for="(bio, index) in artistBio"
              :key="index"
              class="exhibitions__artist-bio hidden tablet:block text-label tablet:text-label-lg text-gray-muted"
            >
              {{ bio }}
            </p>
            <BaseButton
              tag="RouterLink"
              :to="`/artists/${artistExample.id}`"
              variant="ghost"
              class="exhibitions__artist-link inline-flex justify-start items-center text-body-sm"
              ><span class="text-btn tablet:text-btn-lg normal-case">
                {{ txCommon('viewArtistProfile') }}
              </span>
              <BaseArrowIcon />
            </BaseButton>
          </div>
        </div>
      </div>
    </section>
    <section class="exhibitions__visit flex flex-col mt-6">
      <h2 v-fade-in="{ delay: 0, y: 12 }" class="text-gold-500 text-subhead page-container">
        {{ tx('visitLabel') }}
      </h2>
      <div
        class="exhibitions__visit-group flex flex-col tablet:grid tablet:grid-cols-[50%_50%] laptop:grid-cols-[45%_55%] desktop:grid-cols-[35%_65%]"
      >
        <div
          v-fade-in="{ delay: 80, y: 16, mobile: { delay: 0, y: 12 } }"
          class="exhibitions__visit-info page-container flex flex-col justify-center gap-8 p-8 tablet:p-16"
        >
          <div class="flex items-start space-x-4">
            <MapPinIcon class="shrink-0 size-8 text-gold-500 -translate-y-[2px]" />
            <div class="flex flex-col">
              <span>
                {{ tx('visit.name') }}
              </span>
              <span>
                {{ tx('visit.address') }}
              </span>
            </div>
          </div>
          <div class="flex items-start space-x-4">
            <ClockIcon class="shrink-0 size-8 text-gold-500 -translate-y-[2px]" />
            <div class="flex flex-col">
              <span>{{ tx('visit.date') }}</span>
              <span>{{ tx('visit.hours') }}</span>
            </div>
          </div>
          <BaseButton class="w-72 mx-auto laptop:ml-0">
            <span class="text-btn tablet:text-btn-lg">{{ tx('visit.button') }}</span>
            <BaseArrowIcon />
          </BaseButton>
        </div>
        <div
          v-fade-in="{ delay: 160, y: 12, duration: 900, mobile: { delay: 0, y: 12 } }"
          class="exhibitions__visit-img-wrap relative aspect-[16/7] tablet:aspect-auto tablet:h-full"
        >
          <img
            :src="visitImage"
            alt="exhibition location"
            loading="lazy"
            width="1536"
            height="1024"
            class="exhibitions__visit-img w-full h-full object-cover object-center tablet:absolute tablet:inset-0"
          />
        </div>
      </div>
    </section>

    <section class="exhibitions__past-exhibitions page-container mt-6">
      <h2 v-fade-in="{ delay: 0, y: 12 }" class="text-gold-500 text-subhead py-8 tablet:py-10">
        {{ tx('pastExhibitionsLabel') }}
      </h2>
      <div
        class="exhibitions__past-exhibitions-group flex flex-col tablet:flex-row gap-6 tablet:gap-4"
      >
        <div
          v-for="(pastExhibition, index) in pastExhibitions"
          v-fade-in="{
            delay: Math.min(index, 2) * 150,
            y: 24,
            mobile: { delay: 0, y: 16 },
          }"
          :key="index"
          class="exhibitions__past-exhibitions-item block relative border border-gold-500/20 w-full tablet:w-1/3 h-[140px] tablet:h-[220px] max-w-[450px] tablet:max-w-none mx-auto overflow-hidden transition-md hover:border-gold-500 active:border-gold-500 duration-500 group"
        >
          <img
            :src="getImageUrl(`exhibition/${pastExhibition.img}`)"
            :alt="pastExhibition.title"
            loading="lazy"
            width="1774"
            height="887"
            class="object-cover absolute inset-0 w-full h-full group-hover:scale-105 transition-all duration-500"
          />
          <!-- 桌機版加一層漸層遮罩,讓文字在圖片上更好讀 -->
          <div
            class="block absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
          ></div>

          <div
            class="exhibitions__past-exhibitions-item-info absolute bottom-6 left-6 z-10 w-auto px-0 space-y-2"
          >
            <p
              class="text-subhead group-hover:text-gold-500 group-active:text-gold-500 duration-500"
            >
              {{ pastExhibition.title }}
            </p>
            <span
              class="text-label text-gray-muted group-hover:text-cream group-active:text-cream duration-500"
              >{{ pastExhibition.subtitle }}</span
            >
          </div>
        </div>
      </div>
    </section>
    <GoldDivider class="mb-10" />
  </div>
</template>

<style scoped>
.exhibitions__quote-text {
  min-height: calc(1.6em * 3);
  line-height: 1.5;
}

.exhibitions__quote-text::before,
.exhibitions__quote-text::after {
  position: absolute;
  font-size: clamp(36px, 6vw, 60px);
  font-family: 'Georgia', serif;
  line-height: 0;
  color: var(--color-gold-500);
}

.exhibitions__quote-text::before {
  content: '“';
  top: 30px;
  left: 0;
}

.exhibitions__quote-text::after {
  content: '”';
  bottom: 0;
  right: 8px;
}
</style>

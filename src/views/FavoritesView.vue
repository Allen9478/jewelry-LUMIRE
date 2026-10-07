<script setup lang="ts">
import { ref, computed } from 'vue'
import { useScopedI18n } from '@/composables/useScopedI18n'
import { useFavoriteStore } from '@/stores/useFavoriteStore'
import { useAuthStore } from '@/stores/useAuthStore'
import { useLocalized } from '@/composables/useLocalized'
import { storeToRefs } from 'pinia'
import GoldDivider from '@/components/ui/GoldDivider.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import BaseWorkCard from '@/components/ui/BaseWorkCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseArrowIcon from '@/components/ui/BaseArrowIcon.vue'
import ItemGrid from '@/components/ui/ItemGrid.vue'
import works from '@/data/works.json'

const favoriteStore = useFavoriteStore()
const authStore = useAuthStore()
const { localized } = useLocalized()
const { tx } = useScopedI18n('page.favorites')
const { tx: txCommon } = useScopedI18n('common')
const { favorites, isLoading: isFavoritesLoading } = storeToRefs(favoriteStore)
const { isAuthReady } = storeToRefs(authStore)

const currentCategory = ref(null)
const currentArtist = ref(null)
const currentSort = ref('recent')
const categoryLabel = (category: string) => txCommon(`categories.${category.toLowerCase()}`)
const isLoading = computed(() => !isAuthReady.value || isFavoritesLoading.value)

const favoriteWorks = computed(() => {
  // 如果 favorites 還沒載入或不是陣列，直接回傳空陣列
  if (!Array.isArray(favorites.value)) return []
  // 篩選出所有作品中，其 id 存在於 favorites 陣列裡面的項目
  return works.filter((work) => favorites.value.includes(work.id))
})

const collectionTitle = computed(() => {
  if (currentArtist.value && currentCategory.value) {
    return `${currentArtist.value} — ${categoryLabel(currentCategory.value)}`
  }
  if (currentArtist.value) return currentArtist.value
  if (currentCategory.value) return categoryLabel(currentCategory.value)
  return tx('collection.allPieces')
})

const availableType = computed(() => {
  return [...new Set(works.map((item) => item.category))]
})

const availableArtist = computed(() => {
  return [...new Set(works.map((item) => item.designer))]
})
const filterFavorites = computed(() => {
  return favoriteWorks.value.filter((item) => {
    const matchCategory = !currentCategory.value || item.category === currentCategory.value
    const matchArtist = !currentArtist.value || item.designer === currentArtist.value
    return matchCategory && matchArtist
  })
})

const sortedFavorites = computed(() => {
  const list = [...filterFavorites.value] // 一定要先淺拷貝，因為 sort() 會就地修改原陣列

  switch (currentSort.value) {
    case 'recent':
      return list.sort((a, b) => favorites.value.indexOf(b.id) - favorites.value.indexOf(a.id))
    case 'oldest':
      return list.sort((a, b) => favorites.value.indexOf(a.id) - favorites.value.indexOf(b.id))
    case 'name-asc':
      return list.sort((a, b) => localized(a.name).localeCompare(localized(b.name)))
    case 'artist-asc':
      return list.sort((a, b) => a.designer.localeCompare(b.designer))
    default:
      return list
  }
})
</script>
<template>
  <div
    class="page-container header-offset my-12 flex flex-col gap-12 tablet:gap-8"
    aria-live="polite"
    :aria-busy="isLoading"
  >
    <section>
      <SectionHeading
        :eyebrow="tx('hero.eyebrow')"
        :title="tx('hero.title')"
        :desc="tx('hero.desc')"
        titleTag="h1"
        titleClass="py-2 tablet:py-4"
      />
    </section>
    <template v-if="isLoading">
      <div class="min-h-[50vh]">
        <p>{{ txCommon('loading') }}</p>
      </div>
    </template>

    <template v-else-if="favoriteWorks.length === 0">
      <div
        v-fade-in="{ delay: 160, y: 16, mobile: { delay: 160, y: 12 } }"
        class="empty-state flex flex-col text-center gap-6"
      >
        <h2 class="text-cream text-heading-sm">{{ tx('empty.title') }}</h2>
        <p class="text-gray-muted">
          {{ tx('empty.description') }}
        </p>
        <BaseButton tag="RouterLink" :to="'works'" variant="ghost">
          <span class="text-btn">{{ tx('browseWorks') }}</span>
          <BaseArrowIcon />
        </BaseButton>
      </div>
    </template>

    <template v-else>
      <section class="flex flex-col gap-8 tablet:gap-10">
        <div
          v-fade-in="{ delay: 160, y: 12 }"
          class="flex flex-col tablet:flex-row justify-between tablet:items-center gap-4"
        >
          <BaseButton tag="RouterLink" :to="'works'" variant="ghost">
            <span class="text-btn">{{ tx('browseWorks') }}</span>
            <BaseArrowIcon />
          </BaseButton>
          <fieldset class="filter-group flex flex-col tablet:flex-row gap-4">
            <legend class="sr-only">{{ tx('filter.legend') }}</legend>
            <div class="flex gap-2">
              <div class="dropdown flex gap-2 tablet:gap-4 items-center">
                <label for="typeFilter">{{ tx('filter.type') }}</label>
                <select
                  id="typeFilter"
                  v-model="currentCategory"
                  class="text-cream border border-gray-muted/30 focus:border-gold-500 p-2"
                >
                  <option :value="null">{{ tx('filter.allTypes') }}</option>
                  <option v-for="type in availableType" :key="type" :value="type">
                    {{ categoryLabel(type) }}
                  </option>
                </select>
              </div>
              <div class="dropdown flex gap-2 tablet:gap-4 items-center">
                <label for="artistFilter">{{ tx('filter.artist') }}</label>
                <select
                  id="artistFilter"
                  v-model="currentArtist"
                  class="text-cream border border-gray-muted/30 focus:border-gold-500 p-2"
                >
                  <option :value="null">{{ tx('filter.allArtists') }}</option>
                  <option v-for="artist in availableArtist" :key="artist" :value="artist">
                    {{ artist }}
                  </option>
                </select>
              </div>
            </div>
            <div class="dropdown flex gap-4 items-center">
              <label for="sortFilter">{{ tx('filter.sortBy') }}</label>

              <select
                id="sortFilter"
                v-model="currentSort"
                class="text-cream border border-gray-muted/30 focus:border-gold-500 p-2"
              >
                <option value="recent">{{ tx('sort.recent') }}</option>
                <option value="oldest">{{ tx('sort.oldest') }}</option>
                <option value="name-asc">{{ tx('sort.nameAsc') }}</option>
                <option value="artist-asc">{{ tx('sort.artistAsc') }}</option>
              </select>
            </div>
          </fieldset>
        </div>
        <GoldDivider v-fade-in="{ delay: 220, y: 0 }" />
        <div v-fade-in="{ delay: 260, y: 12 }" class="flex items-center">
          <h2 class="text-subhead font-serif">{{ collectionTitle }}</h2>
          <span class="text-gray-muted ml-4">{{
            tx('collection.piecesCount', sortedFavorites.length)
          }}</span>
        </div>
        <template v-if="sortedFavorites.length === 0">
          <p class="text-gray-muted text-center">{{ tx('collection.noResults') }}</p>
        </template>
        <ItemGrid
          :items="sortedFavorites"
          grid-class="grid-cols-1 tablet:grid-cols-3 laptop:grid-cols-4"
        >
          <template #default="{ item }">
            <BaseWorkCard :work="item" />
          </template>
        </ItemGrid>
        <GoldDivider />
      </section>
    </template>

    <!-- 如果收藏為空，可以顯示提示（非必要，依需求加上） -->
  </div>
</template>

<style scoped>
.dropdown label {
  color: var(--color-gray-muted);
}
</style>

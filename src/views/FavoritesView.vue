<script setup>
import { ref, computed } from 'vue'
import { useFavoriteStore } from '@/stores/useFavoriteStore'
import { useAuthStore } from '@/stores/useAuthStore'
import { storeToRefs } from 'pinia'
import GoldDivider from '@/components/ui/GoldDivider.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import BaseWorkCard from '@/components/ui/BaseWorkCard.vue'
import ItemGrid from '@/components/ui/ItemGrid.vue'
import works from '@/data/works.json'

const favoriteStore = useFavoriteStore()
const authStore = useAuthStore()
const { favorites, isLoading: isFavoritesLoading } = storeToRefs(favoriteStore)
const { isAuthReady } = storeToRefs(authStore)

const currentCategory = ref(null)
const currentArtist = ref(null)
const currentSort = ref('recent')
const isLoading = computed(() => !isAuthReady.value || isFavoritesLoading.value)

const favoriteWorks = computed(() => {
  // 如果 favorites 還沒載入或不是陣列，直接回傳空陣列
  if (!Array.isArray(favorites.value)) return []
  // 篩選出所有作品中，其 id 存在於 favorites 陣列裡面的項目
  return works.filter((work) => favorites.value.includes(work.id))
})
const collectionTitle = computed(() => {
  if (currentArtist.value && currentCategory.value) {
    return `${currentArtist.value} — ${currentCategory.value}`
  }
  if (currentArtist.value) return currentArtist.value
  if (currentCategory.value) return currentCategory.value
  return 'All Pieces'
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
      return list.sort((a, b) => a.name.localeCompare(b.name))
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
    aria-busy="isLoading"
  >
    <section>
      <SectionHeading
        eyebrow="CURATED BY YOU"
        title="Your Collection"
        desc="Pieces you've saved"
        titleTag="h1"
        titleClass="py-2 tablet:py-4"
      />
    </section>
    <template v-if="isLoading">
      <p>載入中...</p>
    </template>

    <template v-else-if="favoriteWorks.length === 0">
      <div class="empty-state flex flex-col text-center gap-6">
        <h2 class="text-cream text-heading-sm">Begin curating your collection</h2>
        <p class="text-gray-muted">
          Explore works by visionary artists and save the pieces that speak to you.
        </p>
        <RouterLink to="/works" class="text-gold-500">Browse Works →</RouterLink>
      </div>
    </template>

    <template v-else>
      <section class="flex flex-col gap-8 tablet:gap-10">
        <div class="flex flex-col tablet:flex-row justify-between tablet:items-center gap-4">
          <RouterLink to="/works" class="text-gold-500">Browse Works →</RouterLink>
          <fieldset class="filter-group flex flex-col tablet:flex-row gap-4">
            <legend class="sr-only">Filter and sort your collection</legend>
            <div class="flex gap-2">
              <div class="dropdown flex gap-2 tablet:gap-4 items-center">
                <label for="typeFilter">Type</label>
                <select
                  id="typeFilter"
                  v-model="currentCategory"
                  class="text-cream border border-gray-muted/30 focus:border-gold-500 p-2"
                >
                  <option :value="null">All</option>
                  <option v-for="type in availableType" :key="type" :value="type">
                    {{ type }}
                  </option>
                </select>
              </div>
              <div class="dropdown flex gap-2 tablet:gap-4 items-center">
                <label for="artistFilter">Artist</label>
                <select
                  id="artistFilter"
                  v-model="currentArtist"
                  class="text-cream border border-gray-muted/30 focus:border-gold-500 p-2"
                >
                  <option :value="null">All Artists</option>
                  <option v-for="artist in availableArtist" :key="artist" :value="artist">
                    {{ artist }}
                  </option>
                </select>
              </div>
            </div>
            <div class="dropdown flex gap-4 items-center">
              <label for="sortFilter">Sort by</label>

              <select
                id="sortFilter"
                v-model="currentSort"
                class="text-cream border border-gray-muted/30 focus:border-gold-500 p-2"
              >
                <option value="recent">Recently Saved</option>
                <option value="oldest">Oldest Saved</option>
                <option value="name-asc">Name A–Z</option>
                <option value="artist-asc">Artist A–Z</option>
              </select>
            </div>
          </fieldset>
        </div>
        <GoldDivider />
        <div class="flex items-center">
          <h2 class="text-subhead font-serif">{{ collectionTitle }}</h2>
          <span class="text-gray-muted ml-4">{{ sortedFavorites.length }} pieces</span>
        </div>
        <template v-if="sortedFavorites.length === 0">
          <p class="text-gray-muted text-center">沒有符合篩選條件的作品</p>
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

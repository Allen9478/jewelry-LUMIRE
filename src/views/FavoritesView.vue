<script setup>
import { computed } from 'vue'
import { useFavoriteStore } from '@/stores/useFavoriteStore'
import { useAuthStore } from '@/stores/useAuthStore'
import { storeToRefs } from 'pinia'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import BaseWorkCard from '@/components/ui/BaseWorkCard.vue'
import ItemGrid from '@/components/ui/ItemGrid.vue'
import works from '@/data/works.json'

const favoriteStore = useFavoriteStore()
const authStore = useAuthStore()
const { favorites, isLoading: isFavoritesLoading } = storeToRefs(favoriteStore)
const { isAuthReady } = storeToRefs(authStore)

const isLoading = computed(() => !isAuthReady.value || isFavoritesLoading.value)

const favoriteWorks = computed(() => {
  // 如果 favorites 還沒載入或不是陣列，直接回傳空陣列
  if (!Array.isArray(favorites.value)) return []
  // 篩選出所有作品中，其 id 存在於 favorites 陣列裡面的項目
  return works.filter((work) => favorites.value.includes(work.id))
})
</script>
<template>
  <div class="page-container header-offset my-12">
    <section>
      <SectionHeading eyebrow="CURATED BY YOU" title="Your Collection" desc="Pieces you've saved" />
    </section>
    <template v-if="isLoading">
      <p>載入中...</p>
    </template>

    <template v-else-if="favoriteWorks.length === 0">
      <div class="empty-state flex flex-col text-center gap-6">
        <h3 class="text-cream text-heading-sm">Begin curating your collection</h3>
        <p class="text-gray-muted">
          Explore works by visionary artists and save the pieces that speak to you.
        </p>
        <RouterLink to="/works" class="text-gold-500">Browse Works →</RouterLink>
      </div>
    </template>

    <template v-else>
      <section class="flex flex-col gap-8">
        <div class="flex justify-between">
          <RouterLink to="/works" class="text-gold-500">Browse Works →</RouterLink>
          <div class="filter-group flex gap-4">
            <div class="dropdown flex gap-4">
              <label>Type</label>
              <select id="typeFilter" class="text-cream">
                <option value="All">All</option>
                <option value="Ring">Ring</option>
                <option value="Necklace">Necklace</option>
                <option value="Earring">Earring</option>
                <option value="Bracelet">Bracelet</option>
              </select>
            </div>
            <div class="dropdown flex gap-4">
              <label>Artist</label>
              <select id="artistFilter">
                <option value="All">All Artists</option>
                <option value="Yu-An Lin">Yu-An Lin</option>
                <option value="Marco Bianchi">Marco Bianchi</option>
                <option value="Wei Chen">Wei Chen</option>
              </select>
            </div>
            <div class="dropdown flex gap-4">
              <label>Sort by</label>
              <select>
                <option>Recently Saved</option>
                <option>Oldest Saved</option>
                <option>Name A–Z</option>
                <option>Artist A–Z</option>
              </select>
            </div>
          </div>
        </div>
        <div class="flex">
          <h2>ALL Pieces</h2>
          <span class="text-gray-muted">5 pieces</span>
        </div>
        <ItemGrid
          :items="favoriteWorks"
          grid-class="grid-cols-1 tablet:grid-cols-3 laptop:grid-cols-4"
        >
          <template #default="{ item }">
            <BaseWorkCard :work="item" />
          </template>
        </ItemGrid>
      </section>
    </template>

    <!-- 如果收藏為空，可以顯示提示（非必要，依需求加上） -->
  </div>
</template>

<style scoped></style>

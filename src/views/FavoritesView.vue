<script setup>
import { computed } from 'vue'
import { useFavoriteStore } from '@/stores/useFavoriteStore'
import { useAuthStore } from '@/stores/useAuthStore'
import { storeToRefs } from 'pinia'
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
    <!-- 如果收藏為空，可以顯示提示（非必要，依需求加上） -->
    <p v-if="isLoading">載入中...</p>
    <p v-else-if="favoriteWorks.length === 0">目前沒有收藏的作品</p>

    <ItemGrid
      v-else
      :items="favoriteWorks"
      grid-class="grid-cols-1 tablet:grid-cols-3 laptop:grid-cols-4"
    >
      <template #default="{ item }">
        <BaseWorkCard :work="item" />
      </template>
    </ItemGrid>
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import LoginPromptModal from './components/ui/LoginPromptModal.vue'
import SearchModal from '@/components/ui/SearchModal.vue'
import { useCatalogStore } from '@/stores/useCatalogStore'

const catalog = useCatalogStore()
</script>

<template>
  <RouterView />
  <LoginPromptModal />
  <SearchModal :works="catalog.works" :artists="catalog.artists" />
  <!-- 全域一個就夠，Pinia 控制開關 -->
</template>

<style scoped></style>

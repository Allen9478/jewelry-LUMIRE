<script setup>
import LoginPromptModal from './components/ui/LoginPromptModal.vue'
import Search from '@/components/ui/Search.vue'
import { useCatalogStore } from '@/stores/useCatalogStore'

const catalog = useCatalogStore()
</script>

<template>
  <RouterView />
  <LoginPromptModal />
  <Search :works="catalog.works" :artists="catalog.artists" />
  <!-- 全域一個就夠，Pinia 控制開關 -->
</template>

<style scoped></style>

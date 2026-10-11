<script setup lang="ts">
import LoginPromptModal from '@/components/ui/LoginPromptModal.vue'
import AppToast from '@/components/ui/AppToast.vue'
import SearchModal from '@/components/ui/SearchModal.vue'
import { useCatalogStore } from '@/stores/useCatalogStore'

const catalog = useCatalogStore()
</script>

<template>
  <RouterView />
  <LoginPromptModal />
  <SearchModal :works="catalog.works" :artists="catalog.artists" />
  <AppToast />
</template>

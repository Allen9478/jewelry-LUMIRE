<script setup lang="ts">
import LoginPromptModal from '@/components/ui/LoginPromptModal.vue'
import AppToast from '@/components/ui/AppToast.vue'
import SearchModal from '@/components/ui/SearchModal.vue'
import { works, artists } from '@/data'
</script>

<template>
  <RouterView />
  <LoginPromptModal />
  <SearchModal :works="works" :artists="artists" />
  <AppToast />
</template>

<script setup>
import { useRoute } from 'vue-router'
import AppFooter from '@/components/layout/AppFooter.vue'
import AppHeader from '@/components/layout/AppHeader.vue'

const route = useRoute()
</script>
<template>
  <AppHeader />
  <RouterView class="header-offset" />
  <AppFooter v-if="!route.meta.hideFooter" />
</template>
<style></style>

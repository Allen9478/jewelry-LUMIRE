<script setup>
import { useRoute } from 'vue-router'
import AppFooter from '@/components/layout/AppFooter.vue'
import AppHeader from '@/components/layout/AppHeader.vue'

const route = useRoute()
</script>
<template>
  <AppHeader />
  <!-- 發現登入頁面自己有計算高度不寫在routerview避免疊加 -->
  <div class="header-offset">
    <RouterView />
  </div>
  <AppFooter v-if="!route.meta.hideFooter" />
</template>
<style></style>

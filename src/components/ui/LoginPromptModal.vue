<script setup>
import BaseModal from './BaseModal.vue'
import BaseButton from './BaseButton.vue'
import { useFavoriteStore } from '@/stores/useFavoriteStore'
import { useRouter } from 'vue-router'
import { useUiStore } from '@/stores/useUiStore'
const uiStore = useUiStore()

const router = useRouter()

function goToLogin() {
  uiStore.closeLoginModal()
  router.push({
    name: 'login',
    query: uiStore.pendingRedirect ? { redirect: uiStore.pendingRedirect } : {},
  })
}
</script>

<template>
  <BaseModal :isOpen="uiStore.showLoginModal" @close="uiStore.closeLoginModal()">
    <p class="font-serif text-gold-400 text-xl mb-2">會員專屬功能</p>
    <p class="text-cream/60 text-sm mb-6">登入後即可收藏您喜愛的作品</p>
    <div class="flex gap-4">
      <BaseButton variant="primary" @click="goToLogin">立即登入</BaseButton>
      <BaseButton variant="ghost" @click="uiStore.closeLoginModal()">取消</BaseButton>
    </div>
  </BaseModal>
</template>

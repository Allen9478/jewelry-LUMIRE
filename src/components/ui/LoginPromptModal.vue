<script setup lang="ts">
import BaseModal from './BaseModal.vue'
import BaseButton from './BaseButton.vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useUiStore } from '@/stores/useUiStore'

const uiStore = useUiStore()
const { t } = useI18n()
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
    <p class="font-serif text-gold-400 text-subhead mb-2">{{ t('loginPrompt.title') }}</p>
    <p class="text-cream/60 text-label-lg mb-6">{{ t('loginPrompt.description') }}</p>
    <div class="flex gap-4">
      <BaseButton variant="primary" @click="goToLogin">{{ t('loginPrompt.confirm') }}</BaseButton>
      <BaseButton variant="ghost" @click="uiStore.closeLoginModal()">{{
        t('loginPrompt.cancel')
      }}</BaseButton>
    </div>
  </BaseModal>
</template>

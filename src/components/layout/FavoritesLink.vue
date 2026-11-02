<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'
import { useUiStore } from '@/stores/useUiStore'
import { useCommonI18n } from '@/composables/useScopedI18n'
import HeartIcon from '@/components/common/HeartIcon.vue'

const route = useRoute()
const authStore = useAuthStore()
const uiStore = useUiStore()
const { tx } = useCommonI18n()

const isFavoritePage = computed(() => route.name === 'favorites')

function handleClick() {
  if (!authStore.user) uiStore.openLoginModal()
}
</script>

<template>
  <RouterLink
    :to="{ name: 'favorites' }"
    :aria-label="tx('aria.favorites')"
    class="nav__icon w-9 flex items-center justify-end tablet:w-6"
    @click="handleClick"
  >
    <HeartIcon :filled="isFavoritePage" />
  </RouterLink>
</template>

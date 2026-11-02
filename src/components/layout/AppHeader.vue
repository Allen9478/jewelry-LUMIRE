<script setup lang="ts">
import { useAuthStore } from '@/stores/useAuthStore'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { navItems } from '@/constants/navigations'
import { useScrollDirection } from '@/composables/useScrollDirection'
import { useUiStore } from '@/stores/useUiStore'
import { useCommonI18n } from '@/composables/useScopedI18n'
import { useDropdown } from '@/composables/useDropdown'
import { UserIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import { ref, onMounted, onUnmounted } from 'vue'
import BaseUnderlineTab from '@/components/common/BaseUnderlineTab.vue'
import LangSwitch from '@/components/ui/LangSwitch.vue'
import HamburgerMenu from '@/components/layout/HamburgerMenu.vue'
import FavoritesLink from './FavoritesLink.vue'
import AppLogo from './AppLogo.vue'

const uiStore = useUiStore()
const isScrolled = ref(false)
const router = useRouter()
const authStore = useAuthStore()
const { t } = useI18n()
const { tx: txCommon } = useCommonI18n()
const { isOpen, toggle, close } = useDropdown('memberRef')
const { isHeaderVisible } = useScrollDirection()

async function handleLogout() {
  close()
  await authStore.logout()
  router.push('/')
}

function handleScroll() {
  isScrolled.value = window.scrollY > 50
}
onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-card transition-transform duration-300"
    :class="[
      isHeaderVisible ? 'translate-y-0' : '-translate-y-full',
      isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black to-transparent',
    ]"
  >
    <div
      class="page-container grid grid-cols-[1fr_auto_1fr] tablet:grid-cols-[auto_1fr_auto] h-20 items-center"
    >
      <HamburgerMenu class="w-9" />

      <RouterLink
        :aria-label="txCommon('aria.home')"
        :to="{ name: 'home' }"
        exact-active-class=""
        class="inline-flex flex-col font-serif text-center text-gold-500"
      >
        <AppLogo />
      </RouterLink>
      <!-- Nav：flex-1 吸收空間 -->
      <nav
        :aria-label="txCommon('aria.mainNav')"
        class="hidden tablet:flex flex-1 justify-center min-w-0 overflow-x-auto px-2 laptop:px-4"
      >
        <ul class="flex items-center whitespace-nowrap">
          <li
            class="px-2 tablet:px-2 laptop:px-4 desktop:px-6 shrink-0"
            v-for="item in navItems"
            :key="item.name"
          >
            <BaseUnderlineTab
              :to="item.to"
              :match-names="item.matchNames"
              class="text-xs tablet:text-sm laptop:text-base desktop:text-lg"
            >
              {{ t(item.labelKey) }}
            </BaseUnderlineTab>
          </li>
        </ul>
      </nav>

      <div class="flex shrink-0 justify-end items-center gap-2 lg:gap-3 xl:gap-4 text-stone-50">
        <button
          @click="uiStore.openSearchModal"
          :aria-label="t('searchModal.title')"
          class="nav__icon"
        >
          <MagnifyingGlassIcon class="size-6" />
        </button>
        <FavoritesLink />
        <template v-if="authStore.user">
          <div ref="memberRef" class="member relative hidden tablet:block">
            <button
              type="button"
              class="text-label-lg hover:text-gold-500 transition-colors"
              :aria-expanded="isOpen"
              @click="toggle"
            >
              {{ authStore.displayName }}
            </button>
            <div
              v-if="isOpen"
              class="absolute left-1/2 top-full mt-2 min-w-24 -translate-x-1/2 whitespace-nowrap bg-[#1a1a1a] border border-[#3a3530]"
            >
              <button
                type="button"
                class="w-full text-center text-label-lg text-white hover:text-gold-500"
                @click="handleLogout"
              >
                {{ t('common.signOut') }}
              </button>
            </div>
          </div>
        </template>
        <template v-else>
          <RouterLink
            :to="{ name: 'login' }"
            :aria-label="txCommon('aria.member')"
            class="nav__icon hidden tablet:block"
          >
            <UserIcon class="size-6" />
          </RouterLink>
        </template>
        <LangSwitch variant="desktop" />
      </div>
    </div>
  </header>
</template>

<style scoped>
/* 解決768px時navbar有橫向捲軸 */
nav {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
}
nav::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}
</style>

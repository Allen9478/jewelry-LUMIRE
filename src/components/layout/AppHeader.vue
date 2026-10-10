<script setup lang="ts">
import { useAuthStore } from '@/stores/useAuthStore'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { navItems } from '@/constants/navigations'
import { useScrollDirection } from '@/composables/useScrollDirection'
import { useUiStore } from '@/stores/useUiStore'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import BaseUnderlineTab from '@/components/common/BaseUnderlineTab.vue'
import LangSwitch from '@/components/ui/LangSwitch.vue'
import HamburgerMenu from '@/components/layout/HamburgerMenu.vue'
import HeartIcon from '@/components/common/HeartIcon.vue'
import AppLogo from './AppLogo.vue'
import { UserIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline'

const uiStore = useUiStore()
const isScrolled = ref(false)
const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const { t } = useI18n()
const { isHeaderVisible } = useScrollDirection()
const isFavoritePage = computed(() => route.name === 'favorites')
const showMenu = ref(false)

async function handleLogout() {
  await authStore.logout()
  showMenu.value = false
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
      isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black/60 to-transparent',
    ]"
  >
    <div
      class="page-container grid grid-cols-[1fr_auto_1fr] tablet:grid-cols-[auto_1fr_auto] h-20 items-center"
    >
      <HamburgerMenu class="w-9" />

      <RouterLink
        aria-label="回首頁"
        :to="{ name: 'home' }"
        exact-active-class=""
        class="inline-flex flex-col font-serif text-center text-gold-500"
      >
        <AppLogo />
      </RouterLink>
      <!-- Nav：flex-1 吸收空間，overflow hidden 防破版 -->
      <nav
        aria-label="主要導覽列"
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
        <button @click="uiStore.openSearchModal" aria-label="站內搜尋" class="nav__icon">
          <MagnifyingGlassIcon class="size-6" />
        </button>
        <template v-if="authStore.user">
          <!-- 手機版 -->
          <div class="flex gap-2 tablet:hidden">
            <RouterLink
              aria-label="我的最愛收藏"
              class="nav__icon w-9 flex items-center justify-end tablet:w-6"
              :to="{ name: 'favorites' }"
            >
              <HeartIcon :filled="isFavoritePage"></HeartIcon>
            </RouterLink>
          </div>

          <!-- 桌機版 -->
          <div class="hidden tablet:flex gap-2 lg:gap-3 xl:gap-4">
            <RouterLink
              aria-label="我的最愛收藏"
              class="nav__icon w-9 flex items-center justify-end tablet:w-6"
              :to="{ name: 'favorites' }"
            >
              <HeartIcon :filled="isFavoritePage"></HeartIcon>
            </RouterLink>
            <div class="member relative group cursor-pointer">
              <span class="group-hover:opacity-0 transition-opacity duration-200">
                {{ authStore.displayName }}
              </span>
              <span
                @click="handleLogout"
                class="absolute inset-0 flex items-center justify-center text-center text-gold-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200 tracking-widest text-sm"
              >
                {{ t('common.signOut') }}
              </span>
            </div>
          </div>
        </template>
        <template v-else>
          <RouterLink
            @click="uiStore.openLoginModal"
            aria-label="我的最愛收藏"
            class="nav__icon w-9 flex items-center justify-end tablet:w-6"
            :to="{ name: 'favorites' }"
          >
            <HeartIcon :filled="isFavoritePage" />
          </RouterLink>
          <RouterLink
            :to="{ name: 'login' }"
            aria-label="會員"
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
.header-bg-test {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.95), transparent);
}
/* 解決768px時navbar有橫向捲軸 */
nav {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
}
nav::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}
</style>

<script setup>
import { useAuthStore } from '@/stores/useAuthStore'
import { useFavoriteStore } from '@/stores/useFavoriteStore'
import { useRouter } from 'vue-router'
import { navItems } from '@/constants/navigations'
import { useScrollDirection } from '@/composables/useScrollDirection'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import BaseUnderlineTab from '@/components/common/BaseUnderlineTab.vue'
import HamburgerMenu from '@/components/layout/HamburgerMenu.vue'
import HeartIcon from '@/components/common/HeartIcon.vue'

const isScrolled = ref(false)
const router = useRouter()
const authStore = useAuthStore()
const favoriteStore = useFavoriteStore()
const { isHeaderVisible } = useScrollDirection()
const currentLang = ref('EN')
const isFavoritePage = computed(() => router.currentRoute.value.name === 'favorites')
const showMenu = ref(false)

async function handleLogout() {
  await authStore.logout()
  showMenu.value = false
  router.push({ name: 'login' })
}
function handleScroll() {
  isScrolled.value = window.scrollY > 50
}
function goToLogin() {
  router.push({ name: 'login' })
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <!-- 用途：Header 的基礎黑金配色 -->
  <!-- 暫時把postion改成fixed來解決select被下面hero圓圈動畫擋道的問題 -->
  <header
    class="fixed top-0 left-0 right-0 z-card transition-transform duration-300"
    :class="[
      isHeaderVisible ? 'translate-y-0' : '-translate-y-full',
      isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black/60 to-transparent',
    ]"
  >
    <div class="page-container flex h-20 items-center justify-between">
      <HamburgerMenu class="w-9" />

      <RouterLink
        aria-label="回首頁"
        :to="{ name: 'home' }"
        exact-active-class=""
        class="inline-flex flex-col font-serif text-center text-gold-500"
      >
        <span class="text-[26px] tablet:text-[34px] tracking-[0.1em]">LUMIÈRE</span>
        <span class="text-[9px] tablet:text-[11px] tracking-[0.2em]">JEWELRY GALLERY</span>
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
              {{ item.name }}
            </BaseUnderlineTab>
          </li>
        </ul>
      </nav>

      <div class="flex shrink-0 items-center gap-2 lg:gap-3 xl:gap-4 text-stone-50">
        <button aria-label="站內搜尋" class="nav__icon hidden tablet:block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>

        <!-- 登入後改變成使用者帳號,樣式有待考慮調整 -->
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
                SIGN OUT
              </span>
            </div>
          </div>
        </template>
        <template v-else>
          <button
            aria-label="我的最愛收藏"
            class="nav__icon w-9 flex items-center justify-end tablet:w-6"
            @click="favoriteStore.toggleFavorite()"
          >
            <HeartIcon :filled="isFavoritePage"></HeartIcon>
          </button>
          <button @click="goToLogin" aria-label="會員" class="nav__icon hidden tablet:block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </button>
        </template>
        <div class="relative group hidden tablet:flex items-center cursor-pointer">
          <!-- 顯示目前選項 -->
          <span class="text-xs lg:text-sm px-2 py-2 group-hover:text-gold-500 transition-colors">
            {{ currentLang }}
          </span>

          <!-- 箭頭 -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-4 pointer-events-none text-white transition-colors duration-300 group-hover:text-gold-500"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
          <!-- 自訂下拉 -->
          <div
            class="absolute left-0 top-full mt-2 w-20 bg-[#1a1a1a] border border-[#3a3530] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
          >
            <button
              @click="currentLang = 'EN'"
              class="w-full px-4 py-2 text-left text-sm hover:text-gold-500"
            >
              EN
            </button>
            <button
              @click="currentLang = '中文'"
              class="w-full px-4 py-2 text-left text-sm hover:text-gold-500"
            >
              中文
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header-bg-test {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.95), transparent);
}
</style>

<script setup>
import HamburgerMenu from '@/components/layout/HamburgerMenu.vue'
import { useAuthStore } from '@/stores/useAuthStore'
import { useFavoriteStore } from '@/stores/useFavoriteStore'
import { useRouter } from 'vue-router'
import { navItems } from '@/constants/navigations'
import { ref, computed } from 'vue'
const authStore = useAuthStore()
const favoriteStore = useFavoriteStore()
const currentLang = ref('EN')
const isFavoritePage = computed(() => router.currentRoute.value.name === 'favorites')
const showMenu = ref(false)

async function handleLogout() {
  await authStore.logout()
  showMenu.value = false
  router.push({ name: 'login' })
}
const router = useRouter()
function goToLogin() {
  router.push({ name: 'login' })
}
</script>

<template>
  <!-- 用途：Header 的基礎黑金配色 -->
  <header class="border-b border-gold-400/20">
    <div class="page-wrapper flex h-20 items-center justify-between">
      <HamburgerMenu class="tablet:hidden w-9" />
      <RouterLink
        aria-label="回首頁"
        :to="{ name: 'home' }"
        class="inline-flex flex-col font-serif text-center text-gold-500"
      >
        <span class="text-[22px] tablet:text-[28px] tracking-[0.1em]">LUMIÈRE</span>
        <span class="text-[8px] tablet:text-[9px] tracking-[0.2em]">JEWELRY GALLERY</span>
      </RouterLink>
      <!-- Nav：flex-1 吸收空間，overflow hidden 防破版 -->
      <nav
        aria-label="主要導覽列"
        class="hidden tablet:flex flex-1 justify-center overflow-hidden px-2 laptop:px-4"
      >
        <ul class="flex items-center whitespace-nowrap">
          <li
            class="px-2 tablet:px-2 laptop:px-4 desktop:px-6"
            v-for="item in navItems"
            :key="item"
          >
            <!-- router要設置 -->
            <RouterLink
              :to="item.to"
              class="relative inline-block py-3 text-xs tablet:text-sm laptop:text-base desktop:text-lg text-stone-50 whitespace-nowrap transition-colors duration-300 hover:text-gold-500 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-gold-500 after:transition-all after:duration-300 hover:after:w-full"
            >
              {{ item.name }}
            </RouterLink>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6 transition-colors duration-200"
                :class="
                  isFavoritePage
                    ? 'fill-gold-500 stroke-gold-500'
                    : 'hover:fill-gold-500 hover:stroke-gold-500 active:fill-gold-500 active:stroke-gold-500'
                "
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </RouterLink>
          </div>

          <!-- 桌機版 -->
          <div class="hidden tablet:flex gap-2 lg:gap-3 xl:gap-4">
            <RouterLink
              aria-label="我的最愛收藏"
              class="nav__icon w-9 flex items-center justify-end tablet:w-6"
              :to="{ name: 'favorites' }"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6 transition-colors duration-200"
                :class="
                  isFavoritePage
                    ? 'fill-gold-500 stroke-gold-500'
                    : 'hover:fill-gold-500 hover:stroke-gold-500'
                "
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
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
            @click="favoriteStore.toggleFavorite('test')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6 transition-colors duration-200 hover:fill-gold-500 hover:stroke-gold-500"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
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

<style scoped></style>

<script setup>
import HamburgerMenu from '@/components/layout/HamburgerMenu.vue'
// 收藏還沒做好這是測試用
import { useFavoriteStore } from '@/stores/useFavoriteStore'
const favoriteStore = useFavoriteStore()

const navItems = [
  { label: 'Home', to: { name: 'home' } },
  { label: 'Works', to: { name: 'works' } },
  { label: 'Artists', to: { name: 'artists' } },
  { label: 'About', to: { name: 'about' } },
  { label: 'Exhibitions', to: { name: 'exhibitions' } },
  { label: 'Contact', to: { name: 'contact' } },
]
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
              {{ item.label }}
            </RouterLink>
          </li>
        </ul>
      </nav>

      <div class="flex shrink-0 items-center gap-2 lg:gap-3 xl:gap-4 text-stone-50">
        <button aria-label="站內搜尋" class="header-icon hidden tablet:block">
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
        <button
          aria-label="我的最愛收藏"
          class="header-icon w-9 flex items-center justify-end tablet:w-6"
          @click="favoriteStore.toggleFavorite('test')"
        >
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
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </button>
        <button aria-label="會員" class="header-icon hidden tablet:block">
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

        <div class="relative justify-center items-center group hidden tablet:flex">
          <!-- select尚未設置i18n -->
          <select
            aria-label="選擇語言"
            class="appearance-none bg-black px-2 py-2 text-xs lg:text-sm transition-colors duration-300 group-hover:text-gold-500 focus:outline-none cursor-pointer pr-6"
          >
            <option value="en" selected>EN</option>
            <option value="zh">中文</option>
          </select>

          <!-- pointer-events-none 讓點擊穿透到 select -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-4 absolute right-0 pointer-events-none text-white transition-colors duration-300 group-hover:text-gold-500"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped></style>

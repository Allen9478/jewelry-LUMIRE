<script setup>
console.log('AppHeader')
</script>

<template>
  <!-- 用途：Header 的基礎黑金配色 -->
  <header class="bg-black text-warmWhite border-b border-gold-400/20">
    <div class="mx-auto flex h-20 max-w-full items-center justify-between p-6 sm:p-8 lg:p-12">
      <a href="/" class="logo inline-flex flex-col text-center font-display text-gold-400">
        <span class="tracking-[0.1em] text-4xl">LUMIÈRE</span>
        <span class="text-xs tracking-[0.2em]">JEWELRY GALLERY</span>
      </a>
      <nav>
        <ul class="flex items-center justify-center gap-6 text-stone-50">
          <li>
            <a
              href="#"
              class="block border-b border-transparent mx-8 py-3 text-stone-50 transition-colors duration-300 hover:border-gold-400 hover:text-gold-400"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#"
              class="block border-b border-transparent mx-8 py-3 text-stone-50 transition-colors duration-300 hover:border-gold-400 hover:text-gold-400"
            >
              Works
            </a>
          </li>
          <li>
            <a
              href="#"
              class="block border-b border-transparent mx-8 py-3 text-stone-50 transition-colors duration-300 hover:border-gold-400 hover:text-gold-400"
            >
              Artists
            </a>
          </li>
          <li>
            <a
              href="#"
              class="block border-b border-transparent mx-8 py-3 text-stone-50 transition-colors duration-300 hover:border-gold-400 hover:text-gold-400"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#"
              class="block border-b border-transparent mx-8 py-3 text-stone-50 transition-colors duration-300 hover:border-gold-400 hover:text-gold-400"
            >
              Exhibitions
            </a>
          </li>
          <li>
            <a
              href="#"
              class="block border-b border-transparent mx-8 py-3 text-stone-50 transition-colors duration-300 hover:border-gold-400 hover:text-gold-400"
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
      <div class="flex items-center gap-4 text-stone-50">
        <button>
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
        <button>
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
        <button>
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
        <div class="relative">
          <select
            class="appearance-none bg-black px-3 py-2 pr-8 text-sm text-white transition-colors duration-300 hover:text-gold-400 focus:outline-none cursor-pointer"
          >
            <option value="en" selected>EN</option>
            <option value="zh">中文</option>
          </select>

          <span
            class="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-xs text-white"
          >
            ▼
          </span>
        </div>
        <button>☰</button>
      </div>
    </div>
  </header>
</template>

<style>
select {
  color: white;
}
</style>

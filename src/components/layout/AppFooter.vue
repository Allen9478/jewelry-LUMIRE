<script setup>
import { ref } from 'vue'

const openSections = ref({})

function toggleMenu(key) {
  openSections.value[key] = !openSections.value[key]
}
const sections = [
  {
    key: 'explore',
    title: 'EXPLORE',
    items: ['Work Gallery', 'Artists', 'Exhibitions', 'Collections'],
  },
  {
    key: 'support',
    title: 'SUPPORT',
    items: ['FAQs', 'Care Guide', 'Shipping & Returns', 'Terms & Conditions'],
  },
  {
    key: 'contact',
    title: 'CONTACT',
    items: ['info@gmail.com', '+886 123-456-789', 'Taipei, Taiwan'],
  },
  {
    key: 'membership',
    title: 'MEMBERSHIP',
    items: ['Log In', 'Membership Benefits', 'Private Viewings'],
    //讓membership只在桌機上顯示
    desktopOnly: true,
  },
]
</script>

<template>
  <footer class="bg-black text-cream border-b border-gold-400/20">
    <div class="mx-auto flex flex-col w-full p-6 tablet:px-8 laptop:px-12">
      <div class="flex flex-col laptop:flex-row laptop:justify-between laptop:items-start">
        <!-- laptop:w-[300px]是為svg的寬度改變時不影響整體排版而寫 -->
        <div class="flex flex-col laptop:shrink-0 laptop:w-[300px]">
          <a
            aria-label="回首頁"
            href="/"
            class="logo shrink-0 inline-flex flex-col self-start text-center font-serif text-gold-400"
          >
            <span class="tracking-[0.1em] text-4xl">LUMIÈRE</span>
            <span class="text-xs tracking-[0.2em]">JEWELRY GALLERY</span>
          </a>
          <p class="pt-5 laptop:pt-7">Celebrating the artistry of jewelry</p>
          <br />
          <p>and the beauty of Human expression</p>
          <div
            class="flex py-4 space-x-6 border-b border-gold-400/30 laptop:flex-row laptop:gap-9 laptop:border-none laptop:space-x-0 laptop:pt-12"
          >
            <button class="text-gold-400 group">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="stroke-1 w-6 h-6 group-hover:stroke-2 laptop:w-8 laptop:h-8"
              >
                <path
                  d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16Z"
                  stroke="currentColor"
                ></path>
                <path
                  d="M17.5 6.51L17.51 6.49889"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </button>
            <button class="text-gold-400 group">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="stroke-1 w-6 h-6 group-hover:stroke-2 laptop:w-8 laptop:h-8"
              >
                <path
                  d="M21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8Z"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M11 21C11 18 11 15 11 12C11 9.8125 11.5 8 15 8"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M9 13H11H15"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </button>
            <button class="text-gold-400 group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="stroke-1 w-6 h-6 group-hover:stroke-2 laptop:w-8 laptop:h-8"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
            </button>
            <button class="text-gold-400 group">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="stroke-1 w-6 h-6 group-hover:stroke-2 laptop:w-8 laptop:h-8"
              >
                <path
                  d="M14 12L10.5 14V10L14 12Z"
                  fill="#000000"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M2 12.7075V11.2924C2 8.39705 2 6.94939 2.90549 6.01792C3.81099 5.08645 5.23656 5.04613 8.08769 4.96549C9.43873 4.92728 10.8188 4.8999 12 4.8999C13.1812 4.8999 14.5613 4.92728 15.9123 4.96549C18.7634 5.04613 20.189 5.08645 21.0945 6.01792C22 6.94939 22 8.39705 22 11.2924V12.7075C22 15.6028 22 17.0505 21.0945 17.9819C20.189 18.9134 18.7635 18.9537 15.9124 19.0344C14.5613 19.0726 13.1812 19.1 12 19.1C10.8188 19.1 9.43867 19.0726 8.0876 19.0344C5.23651 18.9537 3.81097 18.9134 2.90548 17.9819C2 17.0505 2 15.6028 2 12.7075Z"
                  stroke="currentColor"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <div
          class="flex flex-col laptop:flex-1 laptop:flex-row laptop:gap-12 laptop:justify-around"
        >
          <!-- section.desktopOnly只會在桌機上顯示 -->
          <div
            v-for="section in sections"
            :key="section.key"
            :class="{ 'hidden laptop:block': section.desktopOnly }"
          >
            <div
              class="footer-nav-title flex flex-col border-b border-gold-400/30 py-1 laptop:border-none"
            >
              <div class="flex justify-between laptop:pb-5">
                <p>{{ section.title }}</p>
                <button
                  @click="toggleMenu(section.key)"
                  class="toggle-bar flex laptop:hidden"
                  :class="{ 'is-open': openSections[section.key] }"
                >
                  <span class="bar bar-col"></span>
                  <span class="bar bar-flex"></span>
                </button>
              </div>
              <ul :class="[openSections[section.key] ? 'block' : 'hidden', 'laptop:block']">
                <li
                  v-for="item in section.items"
                  :key="item"
                  class="laptop:leading-10 text-cream/60"
                >
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <p class="pt-6 display-inline laptop:pt-10 text-sm text-cream/50">
        © 2024 Lumière Jewelry Gallery. All Rights Reserved.
      </p>
    </div>
  </footer>
</template>

<style scoped>
.toggle-bar {
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
}
.bar {
  display: block;
  height: 1px;
  background: #efe3c4;
  transition: all 0.45s cubic-bezier(0.23, 1, 0.32, 1);
  transform-origin: right center;
}
.bar-col {
  width: 15px;
  transform: rotate(90deg) translateY(7.5px) translateX(8.5px);
}
.is-open .bar-col {
  width: 15px;
  transform: rotate(0deg);
}
.bar-flex {
  width: 15px;
}
</style>

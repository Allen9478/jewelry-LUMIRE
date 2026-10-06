<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AppLogo from './AppLogo.vue'

interface FooterSection {
  key: string
  titleKey: string
  itemKeys: string[]
  desktopOnly?: boolean
}

const { t } = useI18n()
const openSections = ref<Record<string, boolean>>({})

function toggleMenu(key: string) {
  openSections.value[key] = !openSections.value[key]
}
const sections: FooterSection[] = [
  {
    key: 'explore',
    titleKey: 'footer.explore.title',
    itemKeys: [
      'footer.explore.workGallery',
      'footer.explore.artists',
      'footer.explore.exhibitions',
      'footer.explore.collections',
    ],
  },
  {
    key: 'support',
    titleKey: 'footer.support.title',
    itemKeys: [
      'footer.support.faqs',
      'footer.support.careGuide',
      'footer.support.shipping',
      'footer.support.terms',
    ],
  },
  {
    key: 'contact',
    titleKey: 'footer.contact.title',
    itemKeys: ['footer.contact.email', 'footer.contact.phone', 'footer.contact.address'],
  },
  {
    key: 'membership',
    titleKey: 'footer.membership.title',
    itemKeys: [
      'footer.membership.login',
      'footer.membership.benefits',
      'footer.membership.privateViewings',
    ],
    desktopOnly: true,
  },
]
</script>

<template>
  <footer>
    <div class="page-container flex flex-col">
      <div
        class="flex flex-col tablet:flex-row tablet:justify-start tablet:items-start gap-12 tablet:gap-16 laptop:gap-24"
      >
        <!-- tablet:w-[300px]是為svg的寬度改變時不影響整體排版而寫 -->
        <div class="flex flex-col tablet:shrink-0 tablet:w-[300px]">
          <RouterLink
            aria-label="回首頁"
            :to="{ name: 'home' }"
            exact-active-class=""
            class="inline-flex flex-col self-start font-serif text-center text-gold-500"
          >
            <AppLogo />
          </RouterLink>
          <p class="pt-5 tablet:pt-7">{{ t('footer.tagline.lineFirst') }}</p>
          <br />
          <p>{{ t('footer.tagline.lineSecond') }}</p>
          <div
            class="flex py-4 space-x-6 tablet:flex-row tablet:gap-9 tablet:space-x-0 tablet:pt-12"
          >
            <button
              aria-label="instagram"
              class="footer__icon group transition-colors duration-300"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
                class="footer__icon--social"
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
            <button aria-label="facebook" class="footer__icon group">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
                class="footer__icon--social"
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
            <button aria-label="email" class="footer__icon group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
                focusable="false"
                class="footer__icon--social"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
            </button>
            <button aria-label="youtube" class="footer__icon group">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
                class="footer__icon--social"
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
          class="flex-1 grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-4 gap-8 tablet:gap-6 laptop:gap-12"
        >
          <!-- section.desktopOnly只會在桌機上顯示 -->
          <div
            v-for="section in sections"
            :key="section.key"
            :class="{ 'hidden tablet:block': section.desktopOnly }"
            class="text-gold-500"
          >
            <div
              class="footer-nav-title flex flex-col border-b border-gold-400/30 py-2 tablet:py-1 tablet:border-none"
            >
              <div class="flex justify-between items-center gap-2 tablet:pb-5">
                <p class="min-w-0 truncate">{{ t(section.titleKey) }}</p>
                <button
                  @click="toggleMenu(section.key)"
                  class="toggle-bar flex tablet:hidden shrink-0 -m-2 p-2"
                  :class="{ 'is-open': openSections[section.key] }"
                >
                  <span class="bar bar-col"></span>
                  <span class="bar bar-flex"></span>
                </button>
              </div>
              <ul :class="[openSections[section.key] ? 'block' : 'hidden', 'tablet:block']">
                <li
                  v-for="itemKey in section.itemKeys"
                  :key="itemKey"
                  class="py-1 tablet:py-0 tablet:leading-10"
                >
                  <a
                    href="#"
                    class="inline-block py-1 text-cream/60 hover:text-gold-500 active:text-gold-500 transition-colors duration-200"
                  >
                    <!--  zh.json 跟 en.json 中的 email 必須寫成 {'info@gmail.com'}，
                    因為 vue-i18n 會把 @ 當成連結訊息語法，直接寫會報紅字但不影響運行  -->
                    {{ t(itemKey) }}</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <p class="py-4 display-inline tablet:pt-10 text-label-lg text-cream/50">
        © 2026 Lumière Jewelry Gallery. All Rights Reserved.
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

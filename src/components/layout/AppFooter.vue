<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AppLogo from './AppLogo.vue'
import SocialIcon from '@/components/ui/SocialIcon.vue'

interface FooterSection {
  key: string
  titleKey: string
  itemKeys: string[]
  desktopOnly?: boolean
}

const { t } = useI18n()
const socials = ['instagram', 'facebook', 'email', 'youtube'] as const
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
              v-for="name in socials"
              :key="name"
              :aria-label="name"
              class="footer__icon group transition-colors duration-300"
            >
              <SocialIcon :name="name" class="size-8" />
            </button>
          </div>
        </div>

        <div
          class="flex-1 grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-4 gap-8 tablet:gap-6 laptop:gap-12"
        >
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
        {{ t('footer.copyright') }}
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

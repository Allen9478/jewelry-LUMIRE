import { createI18n } from 'vue-i18n'
import zhTW from '@/i18n/locales/zh-TW.json'
import en from '@/i18n/locales/en.json'

type MessageSchema = typeof zhTW

const i18n = createI18n<[MessageSchema], 'en' | 'zh-TW'>({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'zh-TW',
  messages: {
    'zh-TW': zhTW,
    en: en,
  },
})

export default i18n

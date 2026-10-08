import { watch } from 'vue'
import { createI18n } from 'vue-i18n'
import zhTW from '@/i18n/locales/zh-TW.json'
import en from '@/i18n/locales/en.json'

export type AppLocale = 'en' | 'zh-TW'

// 初始:優先用上次的沒有就預設英文
function getInitialLocale(): AppLocale {
  try {
    const saved = localStorage.getItem('locale')
    return saved === 'en' || saved === 'zh-TW' ? saved : 'en'
  } catch {
    return 'en'
  }
}

//取消泛型(<[MessageSchema]>)否則 global.locale 會被推成 string 報錯
const i18n = createI18n({
  legacy: false, //Composition API 模式,locale 是 Ref
  locale: getInitialLocale(),
  fallbackLocale: 'zh-TW', // 缺 key 時退回中文
  messages: {
    'zh-TW': zhTW,
    en,
  },
})

// 不管桌機手機改 locale 都在這統一同步 <html lang> 存到 localstorage
watch(
  i18n.global.locale,
  (lang) => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem('locale', lang)
    } catch {
      // 寫入失敗只是記不住偏好不影響語言切換,而且不寫eslint會報錯
    }
  },
  { immediate: true },
)

export default i18n

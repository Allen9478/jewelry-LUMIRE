import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { AppLocale, LocalizedText } from '@/types/locale'

function isAppLocale(value: string): value is AppLocale {
  return value === 'zh-TW' || value === 'en'
}

export function useLocalized() {
  const { locale } = useI18n()

  const currentLocale = computed<AppLocale>(() =>
    isAppLocale(locale.value) ? locale.value : 'zh-TW',
  )

  function localized(text: LocalizedText): string {
    return text[currentLocale.value]
  }

  return { currentLocale, localized }
}

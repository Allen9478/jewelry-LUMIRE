// 功能是選取多語系相對應的字串
import { useI18n } from 'vue-i18n'
import type { LocalizedText } from '@/type/work'

export function useLocalized() {
  const { locale } = useI18n()

  function localized(text: LocalizedText): string {
    return text[locale.value as keyof LocalizedText]
  }

  return { localized }
}

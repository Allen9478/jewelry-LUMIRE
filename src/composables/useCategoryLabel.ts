import { useI18n } from 'vue-i18n'

export function useCategoryLabel() {
  const { t, te } = useI18n()

  return (category: string): string => {
    const key = `category.${category.toLowerCase()}`
    return te(key) ? t(key) : category
  }
}

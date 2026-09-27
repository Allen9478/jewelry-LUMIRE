export interface LocalizedText {
  'zh-TW': string
  en: string
}

export interface WorkItem {
  id: string
  designer: string
  category: string
  name: LocalizedText
  image: string
  materials: LocalizedText
  description: LocalizedText
}

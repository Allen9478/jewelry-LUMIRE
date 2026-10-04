export interface LocalizedText {
  'zh-TW': string
  en: string
}

export interface ArtistItem {
  id: string
  name: string
  birth_year_and_nationality: LocalizedText
  current_residence: LocalizedText
  works: string
  image: string
  image_detail: string
  medium: LocalizedText[]
  design_style: string
  quote: LocalizedText
  short_bio: LocalizedText
  biography: LocalizedText
  collections: LocalizedText[]
}

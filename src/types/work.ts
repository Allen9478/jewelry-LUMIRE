import { type LocalizedText } from './locale'

export interface WorkItem {
  id: string
  designer: string
  category: string
  name: LocalizedText
  image: string
  materials: LocalizedText
  description: LocalizedText
}

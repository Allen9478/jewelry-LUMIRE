import worksJson from './works.json'
import artistsJson from './artists.json'
import type { WorkItem } from '@/types/work'
import type { ArtistItem } from '@/types/artist'

// 不符合就會在這裡報錯
export const works: WorkItem[] = worksJson
export const artists: ArtistItem[] = artistsJson

export const workCategories: string[] = [...new Set(works.map((w) => w.category))]

export function getWorkById(id: string): WorkItem | undefined {
  return works.find((w) => w.id === id)
}

export function getArtistById(id: string): ArtistItem | undefined {
  return artists.find((a) => a.id === id)
}

// 作品與藝術家目前用「名字」關聯（works.designer === artist.name）。
// 集中在這兩個函式，之後改成用 id 關聯時，只需要改這裡，不用改各頁面
export function getArtistByName(name: string): ArtistItem | undefined {
  return artists.find((a) => a.name === name)
}

export function getWorksByDesigner(name: string): WorkItem[] {
  return works.filter((w) => w.designer === name)
}

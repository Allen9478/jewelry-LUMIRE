import { defineStore } from 'pinia'
import { ref } from 'vue'
import worksData from '@/data/works.json'
import artistsData from '@/data/artists.json'
import type { WorkItem } from '@/type/work'
import type { ArtistItem } from '@/type/artist'

export const useCatalogStore = defineStore('catalog', () => {
  const works = ref<WorkItem[]>(worksData as WorkItem[])
  const artists = ref<ArtistItem[]>(artistsData as ArtistItem[])

  return { works, artists }
})

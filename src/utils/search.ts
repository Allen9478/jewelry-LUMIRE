// src/utils/search.ts
import Fuse, { type IFuseOptions } from 'fuse.js'
import type { WorkItem } from '@/type/work'
import type { Artist } from '@/type/artist'
import type { SearchResult } from '@/type/search'

const workFuseOptions: IFuseOptions<WorkItem> = {
  keys: [
    {
      name: 'name',
      weight: 0.6,
      getFn: (item) => Object.values(item.name),
    },
    {
      name: 'designer',
      weight: 0.4,
    },
  ],
  threshold: 0.35, // 容錯程度：0 = 精確比對, 1 = 幾乎全部算命中
  ignoreLocation: true, // 中文/英文名稱不需要考慮關鍵字出現的「位置」
  minMatchCharLength: 1,
}

const artistFuseOptions: IFuseOptions<Artist> = {
  keys: [{ name: 'name', weight: 1 }],
  threshold: 0.35,
  ignoreLocation: true,
  minMatchCharLength: 1,
}

export function createSearchIndex(works: WorkItem[], artists: Artist[]) {
  const workFuse = new Fuse(works, workFuseOptions)
  const artistFuse = new Fuse(artists, artistFuseOptions)

  return function search(keyword: string): SearchResult[] {
    if (!keyword.trim()) return []

    const workResults = workFuse.search(keyword).map((r) => ({
      type: 'work' as const,
      item: r.item,
      score: r.score ?? 1, // score 越小代表越相關，undefined 時給最差分數保底
    }))

    const artistResults = artistFuse.search(keyword).map((r) => ({
      type: 'artist' as const,
      item: r.item,
      score: r.score ?? 1,
    }))

    // 把兩種結果混在一起，依相關性（score 由小到大）排序
    return [...workResults, ...artistResults]
      .sort((a, b) => a.score - b.score)
      .map(({ type, item }) => ({ type, item }) as SearchResult)
  }
}

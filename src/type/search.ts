import type { WorkItem } from './work'
import type { Artist } from './artist'

export type SearchResult = { type: 'work'; item: WorkItem } | { type: 'artist'; item: Artist }

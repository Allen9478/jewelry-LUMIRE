import type { WorkItem } from './work'
import type { ArtistItem } from './artist'

export type SearchResult = { type: 'work'; item: WorkItem } | { type: 'artist'; item: ArtistItem }

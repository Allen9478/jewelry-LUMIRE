<script setup lang="ts">
import BaseModal from '@/components/ui/BaseModal.vue'
import { toRef } from 'vue'
import { useSearch } from '@/composables/useSearch'
import type { WorkItem } from '@/type/work'
import type { ArtistItem } from '@/type/artist'

import { useUiStore } from '@/stores/useUiStore'

const props = defineProps<{
  works: WorkItem[]
  artists: ArtistItem[]
}>()
const works = toRef(props, 'works')
const artists = toRef(props, 'artists')
const {
  keyword,
  activeIndex,
  isOpen,
  results,
  displayLabel,
  selectItem,
  onEnter,
  onArrowDown,
  onArrowUp,
  onEscape,
} = useSearch(works, artists)

const uiStore = useUiStore()
</script>

<template>
  <BaseModal :is-open="uiStore.showSearchModal" @close="uiStore.closeSearchModal">
    <div class="search-box relative">
      <input
        v-model="keyword"
        type="search"
        placeholder="搜尋藝術家或珠寶 / Search artist or jewelry"
        class="w-full bg-transparent border-b border-gold-500/30 pb-3 text-cream placeholder:text-gray-muted/50 text-body tablet:text-subhead focus:outline-none focus:border-gold-500 transition-colors duration-300 ease-out"
        @keydown.down.prevent="onArrowDown"
        @keydown.up.prevent="onArrowUp"
        @keydown.enter="onEnter"
        @keydown.esc="onEscape"
        @focus="isOpen = keyword.trim().length > 0"
      />

      <ul
        v-if="isOpen && results.length"
        class="search-results mt-2 max-h-80 overflow-y-auto divide-y divide-gold-500/10"
      >
        <li
          v-for="(result, index) in results"
          :key="`${result.type}-${result.item.id}`"
          :class="[
            'flex items-center justify-between gap-3 px-1 py-3 cursor-pointer transition-colors duration-200 ease-out',
            index === activeIndex ? 'bg-gold-500/10' : 'hover:bg-gold-500/5',
          ]"
          @mouseenter="activeIndex = index"
          @click="selectItem(result)"
        >
          <strong class="text-cream/90 text-label-lg font-normal truncate">
            {{ displayLabel(result) }}
          </strong>
          <span
            class="shrink-0 text-label tracking-wide text-gold-500/80 border border-gold-500/30 rounded-full px-2 py-0.5"
          >
            {{ result.type === 'work' ? '珠寶' : '藝術家' }}
          </span>
        </li>
      </ul>

      <div
        v-else-if="isOpen && keyword.trim()"
        class="mt-4 text-center text-gray-muted/60 text-label-lg"
      >
        找不到符合「{{ keyword }}」的結果
      </div>
    </div>
  </BaseModal>
</template>

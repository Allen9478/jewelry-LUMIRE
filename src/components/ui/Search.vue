<script setup lang="ts">
import BaseModal from '@/components/ui/BaseModal.vue'
import { toRef } from 'vue'
import { useSearch } from '@/composables/useSearch'
import type { WorkItem } from '@/type/work'
import type { Artist } from '@/type/artist'

import { useUiStore } from '@/stores/useUiStore'

const props = defineProps<{
  works: WorkItem[]
  artists: Artist[]
}>()
const works = toRef(props, 'works')
const artists = toRef(props, 'artists')
const {
  keyword,
  activeIndex,
  isOpen,
  results,
  displayLabel,
  goTo,
  onEnter,
  onArrowDown,
  onArrowUp,
  onEscape,
} = useSearch(works, artists)

const uiStore = useUiStore()
</script>
<template>
  <BaseModal :is-open="uiStore.showSearchModal" @close="uiStore.closeSearchModal">
    <div class="search-box">
      <input
        v-model="keyword"
        type="search"
        placeholder="搜尋藝術家或珠寶名稱 / Search artist or jewelry"
        @keydown.down.prevent="onArrowDown"
        @keydown.up.prevent="onArrowUp"
        @keydown.enter="onEnter"
        @keydown.esc="onEscape"
        @focus="isOpen = keyword.trim().length > 0"
      />

      <ul v-if="isOpen && results.length" class="search-results">
        <li
          v-for="(result, index) in results"
          :key="`${result.type}-${result.item.id}`"
          :class="{ active: index === activeIndex }"
          @mouseenter="activeIndex = index"
          @click="goTo(result)"
        >
          <strong>{{ displayLabel(result) }}</strong>
          <!-- type 標籤讓使用者一眼分辨這筆結果是「作品」還是「藝術家」 -->
          <span class="tag">{{ result.type === 'work' ? '珠寶' : '藝術家' }}</span>
        </li>
      </ul>

      <div v-else-if="isOpen && keyword.trim()" class="no-results">
        找不到符合「{{ keyword }}」的結果
      </div>
    </div>
  </BaseModal>
</template>

<style scoped>
.search-box {
  position: relative;
}
.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid #eee;
  max-height: 300px;
  overflow-y: auto;
  z-index: 10;
}
.search-results li {
  padding: 8px 12px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
}
.search-results li.active,
.search-results li:hover {
  background: #f5f0e8;
}
.tag {
  font-size: 0.8em;
  color: #999;
}
</style>

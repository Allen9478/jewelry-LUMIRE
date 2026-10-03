<script setup lang="ts">
import BaseModal from '@/components/ui/BaseModal.vue'
import { ref, watch, toRef, nextTick } from 'vue'
import { useSearch } from '@/composables/useSearch'
import { useI18n } from 'vue-i18n'
import type { WorkItem } from '@/types/work'
import type { ArtistItem } from '@/types/artist'

import { useUiStore } from '@/stores/useUiStore'

const { t } = useI18n()
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

const searchInputRef = ref<HTMLInputElement | null>(null)

// 等DOM渲染完在讓游標focus
watch(
  () => uiStore.showSearchModal,
  async (open) => {
    if (open) {
      await nextTick()
      searchInputRef.value?.focus()
    }
  },
)
</script>

<template>
  <BaseModal :is-open="uiStore.showSearchModal" @close="uiStore.closeSearchModal">
    <div class="search-box relative w-full">
      <div class="relative flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="absolute left-0 size-6 text-gold-500/80 pointer-events-none"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>

        <!-- 輸入框：加上 pl-8 留出左側 Icon 空間、提升 Placeholder 與文字對比度、補充 a11y -->
        <input
          ref="searchInputRef"
          v-model="keyword"
          type="search"
          :placeholder="t('searchModal.placeholder')"
          :aria-label="t('searchModal.placeholder')"
          role="combobox"
          :aria-expanded="isOpen"
          aria-autocomplete="list"
          aria-controls="search-results-list"
          class="w-full bg-transparent pl-8 text-cream placeholder:text-gray-muted/70 text-body tablet:text-subhead focus:outline-none focus:border-gold-500 transition-colors duration-300 ease-out"
          @keydown.down.prevent="onArrowDown"
          @keydown.up.prevent="onArrowUp"
          @keydown.enter="onEnter"
          @keydown.esc="onEscape"
          @focus="isOpen = keyword.trim().length > 0"
        />
      </div>

      <!-- 2. 下拉搜尋結果清單：補充無障礙 role 與 aria-selected -->
      <ul
        id="search-results-list"
        v-if="isOpen && results.length"
        role="listbox"
        class="search-results mt-3 max-h-80 overflow-y-auto divide-y divide-gold-500/10 rounded-b bg-black/40 backdrop-blur-sm px-2"
      >
        <li
          v-for="(result, index) in results"
          :id="`search-option-${index}`"
          :key="`${result.type}-${result.item.id}`"
          role="option"
          :aria-selected="index === activeIndex"
          :class="[
            'flex items-center justify-between gap-3 px-3 py-3 cursor-pointer transition-colors duration-200 ease-out rounded',
            index === activeIndex
              ? 'bg-gold-500/20 text-cream'
              : 'hover:bg-gold-500/10 text-cream/80',
          ]"
          @mouseenter="activeIndex = index"
          @click="selectItem(result)"
        >
          <strong class="text-label-lg font-normal truncate">
            {{ displayLabel(result) }}
          </strong>
          <span
            class="shrink-0 text-label tracking-wide text-gold-500/90 bg-gold-500/10 px-2 py-0.5 rounded border border-gold-500/20"
          >
            {{ result.type === 'work' ? '珠寶' : '藝術家' }}
          </span>
        </li>
      </ul>

      <!-- 3. 無結果提示區域：加上 aria-live="polite" 讓 Screen Reader 能夠主動朗讀搜尋結果狀態 -->
      <div
        v-else-if="isOpen && keyword.trim()"
        aria-live="polite"
        class="mt-6 py-4 text-center text-gray"
      >
        找不到符合「{{ keyword }}」的結果
      </div>
    </div>
  </BaseModal>
</template>

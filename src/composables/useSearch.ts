import { ref, computed, watch, type Ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { createSearchIndex } from '@/utils/search'
import type { WorkItem } from '@/type/work'
import type { Artist } from '@/type/artist'
import type { SearchResult } from '@/type/search'

/**
 * useSiteSearch
 * ------------------------------------------------------------
 * 把「搜尋狀態管理」「鍵盤操作」「導頁」全部封裝在這裡，
 * 元件只需要呼叫這個 composable、把回傳值綁到 template 上即可，
 * 之後要換搜尋邏輯或加功能，只改這一個檔案，不用動元件。
 *
 * 參數用 Ref<WorkItem[]> / Ref<Artist[]>，而不是直接傳陣列，
 * 是因為如果資料是非同步載入（例如 API fetch 完才有值），
 * 用 ref 包起來，資料一到位，computed 的 search 才會跟著重新建立。
 */
export function useSearch(works: Ref<WorkItem[]>, artists: Ref<Artist[]>) {
  const router = useRouter()
  const { locale } = useI18n()

  const keyword = ref('') // 使用者輸入的關鍵字
  const activeIndex = ref(-1) // 目前鍵盤（↑↓）選取到第幾筆，-1 代表沒選
  const isOpen = ref(false) // 搜尋結果下拉選單是否顯示

  // 只有當 works / artists 資料本身變動時，才重新建立 Fuse 索引，
  // 打字（keyword 變動）不會觸發重建，效能上是對的做法。
  const search = computed(() => createSearchIndex(works.value, artists.value))

  const results = computed<SearchResult[]>(() => search.value(keyword.value))

  // 關鍵字一變，重置選取狀態，並依是否有輸入內容決定要不要打開下拉選單
  watch(keyword, () => {
    activeIndex.value = -1
    isOpen.value = keyword.value.trim().length > 0
  })

  /**
   * displayLabel
   * ------------------------------------------------------------
   * 依照 result.type 做型別縮小（narrowing）：
   * - work: name 是 LocalizedText，要用 locale.value 取出對應語言，
   *         找不到就 fallback 回 'zh-TW'（跟 i18n 的 fallbackLocale 一致）
   * - artist: name 本來就是純字串，直接回傳即可
   */
  function displayLabel(result: SearchResult): string {
    if (result.type === 'work') {
      const localeKey = locale.value as keyof typeof result.item.name
      return result.item.name[localeKey] ?? result.item.name['zh-TW']
    }
    return result.item.name
  }

  /**
   * goTo
   * ------------------------------------------------------------
   * 依照 result.type 導向不同的詳情頁路由。
   * 導頁後清空搜尋狀態，避免使用者返回時看到殘留的搜尋結果。
   *
   * 注意：'work-detail' / 'artist-detail' 要跟你 router 設定的
   * route name 完全一致，請依實際路由設定調整。
   */
  function goTo(result?: SearchResult) {
    if (!result) return

    if (result.type === 'work') {
      router.push({ name: 'works-detail', params: { id: result.item.id } })
    } else {
      router.push({ name: 'artists-detail', params: { id: result.item.id } })
    }

    keyword.value = ''
    isOpen.value = false
    activeIndex.value = -1
  }

  // Enter：優先導向鍵盤選取的那筆，沒有選取過就導向第一筆（最佳匹配）
  function onEnter() {
    if (results.value.length === 0) return
    const target = activeIndex.value >= 0 ? results.value[activeIndex.value] : results.value[0]
    goTo(target)
  }

  // ↓：往下移動選取索引，超出範圍時循環回第一筆
  function onArrowDown() {
    if (results.value.length === 0) return
    activeIndex.value = (activeIndex.value + 1) % results.value.length
  }

  // ↑：往上移動選取索引，超出範圍時循環到最後一筆
  function onArrowUp() {
    if (results.value.length === 0) return
    activeIndex.value = activeIndex.value <= 0 ? results.value.length - 1 : activeIndex.value - 1
  }

  // Esc：關閉下拉選單、重置選取狀態
  function onEscape() {
    isOpen.value = false
    activeIndex.value = -1
  }

  return {
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
  }
}

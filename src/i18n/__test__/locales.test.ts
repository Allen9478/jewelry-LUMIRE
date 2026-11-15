import { describe, expect, test } from 'vitest'
import en from '@/i18n/locales/en.json'
import zhTW from '@/i18n/locales/zh-TW.json'

function flatten(obj: unknown, prefix = ''): Record<string, unknown> {
  if (obj === null || typeof obj !== 'object') return { [prefix]: obj }
  return Object.entries(obj).reduce<Record<string, unknown>>((acc, [key, value]) => {
    Object.assign(acc, flatten(value, prefix ? `${prefix}.${key}` : key))
    return acc
  }, {})
}

const enFlat = flatten(en)
const zhFlat = flatten(zhTW)

describe('locales', () => {
  test('zh-TW 沒有缺少 en 有的 key', () => {
    expect(Object.keys(enFlat).filter((k) => !(k in zhFlat))).toEqual([])
  })
  test('en 沒有缺少 zh-TW 有的 key', () => {
    expect(Object.keys(zhFlat).filter((k) => !(k in enFlat))).toEqual([])
  })
  test('沒有空字串翻譯', () => {
    const empty = [...Object.entries(enFlat), ...Object.entries(zhFlat)]
      .filter(([, v]) => v === '')
      .map(([k]) => k)
    expect(empty).toEqual([])
  })
})

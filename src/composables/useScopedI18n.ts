// src/composables/useScopedI18n.ts
import { useI18n } from 'vue-i18n'
import type { MessageFunction, VueMessageType } from 'vue-i18n'

export type RtInput = VueMessageType | MessageFunction<VueMessageType>
type Rt = (message: RtInput) => string

export function useScopedI18n(prefix: string) {
  const { t, tm, rt } = useI18n()
  const full = (key: string) => `${prefix}.${key}`

  const tx = (key: string, count?: number): string =>
    count === undefined ? t(full(key)) : t(full(key), count)

  const txList = (key: string): string[] =>
    (tm(full(key)) as unknown as RtInput[]).map((item) => rt(item))

  const txItems = <TItem extends object, TResult>(
    key: string,
    mapper: (item: TItem, rt: Rt) => TResult,
  ): TResult[] => (tm(full(key)) as unknown as TItem[]).map((item) => mapper(item, rt))

  return { tx, txList, txItems }
}

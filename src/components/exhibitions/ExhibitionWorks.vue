<script setup lang="ts">
import { useScopedI18n } from '@/composables/useScopedI18n'
import { works } from '@/data'
import ItemGrid from '@/components/ui/ItemGrid.vue'
import BaseWorkCard from '@/components/ui/BaseWorkCard.vue'

const { tx } = useScopedI18n('page.exhibitions')
function randomWorks<T>(arr: readonly T[], count: number): T[] {
  const pool = [...arr]
  const result: T[] = []
  const n = Math.min(count, pool.length)

  for (let k = 0; k < n; k++) {
    const index = Math.floor(Math.random() * pool.length)
    const [picked] = pool.splice(index, 1)
    if (picked !== undefined) result.push(picked)
  }

  return result
}
const featuredWorks = randomWorks(works, 6)
</script>

<template>
  <section class="exhibitions__works page-container space-y-6 tablet:space-y-10 desktop:space-y-16">
    <p v-fade-in="{ delay: 0, y: 12 }" class="text-subhead text-gold-500">
      {{ tx('workInExhibitions') }}
    </p>
    <ItemGrid
      :items="featuredWorks"
      grid-class="grid-cols-1 tablet:grid-cols-3  desktop:grid-cols-4 "
    >
      <template #default="{ item }">
        <BaseWorkCard v-fade-in="{ delay: 0, y: 28, mobile: { delay: 0, y: 16 } }" :work="item" />
      </template>
    </ItemGrid>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { works } from '@/data'
import { useScopedI18n } from '@/composables/useScopedI18n'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import ItemGrid from '@/components/ui/ItemGrid.vue'
import BaseWorkCard from '@/components/ui/BaseWorkCard.vue'

const { tx } = useScopedI18n('page.home')
const uniqueDesignerWorks = computed(() => {
  const seenDesigners = new Set()

  return works.filter((work) => {
    if (!seenDesigners.has(work.designer)) {
      seenDesigners.add(work.designer)
      return true // 保留第一次出現的設計師作品
    }
    return false // 跳過重複的
  })
})
</script>

<template>
  <section class="page-container home-works-section space-y-8 tablet:space-y-12">
    <SectionHeading
      :eyebrow="tx('featuredWorks.eyebrow')"
      :title="tx('featuredWorks.title')"
      linkTo="works"
      :linkText="tx('featuredWorks.linkText')"
    />
    <ItemGrid
      :items="uniqueDesignerWorks"
      grid-class="grid-cols-1 tablet:grid-cols-3 laptop:grid-cols-4"
    >
      <template #default="{ item }">
        <BaseWorkCard :work="item" />
      </template>
    </ItemGrid>
  </section>
</template>

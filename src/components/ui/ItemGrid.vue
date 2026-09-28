<script setup lang="ts" generic="T extends { id: string }">
withDefaults(
  defineProps<{
    items: T[]
    gridClass?: string
  }>(),
  {
    gridClass: 'grid-cols-1 tablet:grid-cols-3 laptop:grid-cols-4',
  },
)
defineSlots<{
  default(props: { item: T; index: number }): unknown
}>()
</script>
<template>
  <div :class="['item-grid grid gap-4 tablet:gap-5 laptop:gap-6 place-items-center', gridClass]">
    <div
      v-for="(item, i) in items"
      :key="item.id"
      v-fade-in="{
        delay: 200 + i * 100,
        y: 28,
        mobile: { delay: 100 + i * 60, y: 16 },
      }"
      class="flex w-full justify-center"
    >
      <slot :item="item" :index="i" />
    </div>
  </div>
</template>

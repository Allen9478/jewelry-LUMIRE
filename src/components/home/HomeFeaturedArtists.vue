<script setup lang="ts">
import { useScopedI18n } from '@/composables/useScopedI18n'
import { artists } from '@/data'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import ItemGrid from '@/components/ui/ItemGrid.vue'
import BaseAvatar from '@/components/ui/BaseAvatar.vue'

const { tx } = useScopedI18n('page.home')
</script>

<template>
  <section class="page-container home-artists-section space-y-8 tablet:space-y-12">
    <SectionHeading
      :eyebrow="tx('featuredArtists.eyebrow')"
      :title="tx('featuredArtists.title')"
      :linkTo="{ name: 'artists' }"
      :linkText="tx('featuredArtists.linkText')"
    />
    <ItemGrid :items="artists" grid-class="grid-cols-2 tablet:grid-cols-4">
      <template #default="{ item }">
        <BaseAvatar :artist="item" />
      </template>
    </ItemGrid>
  </section>
</template>

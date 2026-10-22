<script setup lang="ts">
import { useScopedI18n } from '@/composables/useScopedI18n'
import { CalendarDaysIcon, MapPinIcon, ClockIcon } from '@heroicons/vue/24/outline'

const { tx } = useScopedI18n('page.exhibitions')
</script>

<template>
  <div
    v-fade-in="{ delay: 0, y: 12 }"
    class="exhibitions__info page-container flex flex-col tablet:flex-row tablet:justify-around tablet:items-center gap-4 tablet:gap-12 text-cream/80"
  >
    <p class="flex gap-4 items-center">
      <CalendarDaysIcon class="size-7 text-gold-500" />
      <span>{{ tx('date') }}</span>
    </p>
    <div class="hidden laptop:block w-px h-8 bg-gold-500/60"></div>
    <p class="flex gap-4 items-center">
      <MapPinIcon class="size-7 text-gold-500" />
      <span>{{ tx('location') }}</span>
    </p>
    <div class="hidden laptop:block w-px h-8 bg-gold-500/60"></div>

    <p class="flex gap-4 items-center">
      <ClockIcon class="size-7 text-gold-500" />
      <span>{{ tx('hours') }}</span>
    </p>
  </div>
</template>

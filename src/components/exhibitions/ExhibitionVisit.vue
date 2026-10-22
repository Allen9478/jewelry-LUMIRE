<script setup lang="ts">
import { useScopedI18n } from '@/composables/useScopedI18n'
import visitImage from '@/assets/images/exhibition/exhibition-location.webp'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseArrowIcon from '@/components/ui/BaseArrowIcon.vue'
import { MapPinIcon, ClockIcon } from '@heroicons/vue/24/outline'

const { tx } = useScopedI18n('page.exhibitions')
</script>

<template>
  <section class="exhibitions__visit flex flex-col gap-4 tablet:gap-8">
    <h2 v-fade-in="{ delay: 0, y: 12 }" class="text-gold-500 text-subhead page-container">
      {{ tx('visitLabel') }}
    </h2>
    <div
      class="exhibitions__visit-group flex flex-col tablet:grid tablet:grid-cols-[50%_50%] laptop:grid-cols-[45%_55%] desktop:grid-cols-[35%_65%]"
    >
      <div
        v-fade-in="{ delay: 80, y: 16, mobile: { delay: 0, y: 12 } }"
        class="exhibitions__visit-info page-container flex flex-col justify-center gap-8 p-8 tablet:p-16"
      >
        <div class="flex items-start gap-4">
          <MapPinIcon class="shrink-0 size-8 text-gold-500" />
          <div class="flex flex-col">
            <span>
              {{ tx('visit.name') }}
            </span>
            <span>
              {{ tx('visit.address') }}
            </span>
          </div>
        </div>
        <div class="flex items-start gap-4">
          <ClockIcon class="shrink-0 size-8 text-gold-500" />
          <div class="flex flex-col">
            <span>{{ tx('visit.date') }}</span>
            <span>{{ tx('visit.hours') }}</span>
          </div>
        </div>
        <BaseButton class="w-72 mx-auto laptop:ml-0">
          <span class="text-btn tablet:text-btn-lg">{{ tx('visit.button') }}</span>
          <BaseArrowIcon />
        </BaseButton>
      </div>
      <div
        v-fade-in="{ delay: 160, y: 12, duration: 900, mobile: { delay: 0, y: 12 } }"
        class="exhibitions__visit-img-wrap relative aspect-[16/7] tablet:aspect-auto tablet:min-h-[360px] overflow-hidden"
      >
        <img
          :src="visitImage"
          :alt="tx('alt.venue')"
          loading="lazy"
          width="1536"
          height="1024"
          class="exhibitions__visit-img absolute inset-0 w-full h-full object-cover object-center"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useScopedI18n } from '@/composables/useScopedI18n'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseArrowIcon from '@/components/ui/BaseArrowIcon.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import exhibitionImg from '@/assets/images/home/home-exhibition.webp'
import { CalendarDaysIcon, MapPinIcon } from '@heroicons/vue/24/outline'

const { tx } = useScopedI18n('page.home')
</script>

<template>
  <section
    class="page-container home-exhibition-section tablet:grid tablet:grid-cols-[35%_65%] tablet:mb-5"
  >
    <div class="flex justify-start items-center">
      <div class="home-exhibition-section__container flex flex-col items-start">
        <SectionHeading
          :eyebrow="tx('exhibition.eyebrow')"
          :title="tx('exhibition.title')"
          :desc="tx('exhibition.desc')"
          titleClass="py-2 tablet:py-4"
        />
        <div class="home-exhibition-section__cta-group mt-3 tablet:mt-5">
          <p v-fade-in="{ delay: 260, y: 16 }" class="flex items-center">
            <CalendarDaysIcon class="size-6 text-gold-500 -translate-y-px" />
            <span class="ml-2 text-gray-muted text-body-sm tracking-wider">{{
              tx('exhibition.dateRange')
            }}</span>
          </p>
          <p v-fade-in="{ delay: 260, y: 16 }" class="flex items-center mt-2 tablet:mt-4">
            <MapPinIcon class="size-6 text-gold-500 -translate-y-px" />
            <span class="ml-2 text-gray-muted text-body-sm tracking-wider">{{
              tx('exhibition.location')
            }}</span>
          </p>
        </div>
        <BaseButton
          tag="RouterLink"
          to="exhibitions"
          v-fade-in="{ delay: 340, y: 16 }"
          class="home-exhibition__actions-item flex items-center w-full tablet:w-fit mt-5 tablet:mt-10"
        >
          <span class="text-btn tablet:text-btn-lg">{{ tx('exhibition.button') }}</span>
          <BaseArrowIcon />
        </BaseButton>
      </div>
    </div>

    <div
      class="home-exhibition-section__visual hidden tablet:block relative tablet:items-center tablet:h-full overflow-hidden tablet:-mr-10 laptop:-mr-14"
    >
      <img
        v-fade-in="{ delay: 200, y: 0 }"
        :src="exhibitionImg"
        alt=""
        loading="lazy"
        width="1470"
        height="1070"
        class="w-full h-full object-cover"
      />
    </div>
  </section>
</template>

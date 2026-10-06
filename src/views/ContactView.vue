<script setup lang="ts">
import { computed } from 'vue'
import { useScopedI18n, type RtInput } from '@/composables/useScopedI18n'
import FormInput from '@/components/ui/FormInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseArrowIcon from '@/components/ui/BaseArrowIcon.vue'

interface InquiryRaw {
  title: RtInput
  email: string
  description: RtInput
}

interface Inquiry {
  title: string
  email: string
  description: string
}
const { tx, txList, txItems } = useScopedI18n('page.contact')
const { tx: txCommon } = useScopedI18n('common')

const inquiries = computed(() =>
  txItems<InquiryRaw, Inquiry>('inquiries', (item, rt) => ({
    title: rt(item.title),
    email: item.email,
    description: rt(item.description),
  })),
)

const address = computed(() => txList('location.address'))
</script>
<template>
  <div class="contact flex flex-col tablet:flex-row">
    <section
      class="contact__hero hidden tablet:block tablet:sticky tablet:w-[50%] tablet:top-0 tablet:h-screen tablet:self-start"
    >
      <img
        src="@/assets/images/contact/contact-hero.webp"
        alt="contact hero image"
        fetchpriority="high"
        width="1023"
        height="1537"
        class="contact__hero-img w-full h-full object-cover tablet:object-left laptop:object-center"
      />
    </section>
    <section
      class="contact__content page-container header-offset flex flex-col gap-6 tablet:gap-8 tablet:w-[50%] max-w-[400px] tablet:max-w-[640px]"
    >
      <h1
        v-fade-in="{ delay: 0, y: 12 }"
        class="text-heading text-center tablet:text-start font-italic italic mt-6 tablet:mt-12"
      >
        {{ tx('title') }}
      </h1>
      <div class="contact__content-inquiries flex flex-col gap-8 mt-8">
        <div
          v-for="(item, index) in inquiries"
          v-fade-in="{
            delay: 80 + index * 100,
            y: 24,
            mobile: { delay: 0, y: 16 },
          }"
          :key="index"
          class="contact__content-inquiries-option flex flex-row items-center justify-between border-b last:border-b-0 border-gold-500/40 pb-4 last:pb-0 group"
        >
          <div class="max-w-[250px] tablet:max-w-xl flex flex-col gap-2">
            <p class="text-subhead font-serif">{{ item.title }}</p>
            <p class="text-gold-500">{{ item.email }}</p>
            <p class="text-gray-muted">{{ item.description }}</p>
          </div>
          <BaseArrowIcon class="text-gold-500 mr-2" />
        </div>
      </div>
      <form action="" class="contact__content-form flex flex-col gap-4">
        <FormInput
          v-fade-in="{ delay: 320, y: 20, mobile: { delay: 0, y: 16 } }"
          :label="txCommon('form.name')"
          type="text"
        />
        <FormInput
          v-fade-in="{ delay: 380, y: 20, mobile: { delay: 0, y: 16 } }"
          :label="txCommon('form.email')"
          type="text"
        />
        <div v-fade-in="{ delay: 440, y: 20, mobile: { delay: 0, y: 16 } }" class="relative group">
          <textarea
            id="message"
            rows="5"
            placeholder=" "
            class="w-full pt-5 pb-1 outline-none peer bg-transparent text-gold-500 border-b border-gray-muted group-focus-within:border-gold-500 resize-y min-h-[80px]"
          />
          <label
            for="message"
            class="absolute origin-[0_0] left-0 top-4 text-body-sm laptop:text-body tracking-[1px] peer-focus:top-0 peer-focus:scale-75 group-focus-within:text-gold-500 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:scale-75"
            >{{ tx('form.message') }}</label
          >
        </div>
        <BaseButton class="w-full mt-4">{{ tx('form.submit') }}</BaseButton>
      </form>
      <section
        class="contact__content-info flex flex-col desktop:flex-row desktop:justify-between gap-8 my-8"
      >
        <div
          v-fade-in="{ delay: 120, y: 16, mobile: { delay: 0, y: 12 } }"
          class="contact__content-info-location flex justify-start"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-8 text-gold-500"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>
          <div class="flex flex-col gap-1 ml-4">
            <p class="text-subhead font-serif">{{ tx('location.name') }}</p>
            <p v-for="(line, i) in address" :key="i" class="text-gray-muted">
              {{ line }}
            </p>
          </div>
        </div>
        <div
          v-fade-in="{ delay: 200, y: 16, mobile: { delay: 0, y: 12 } }"
          class="contact__content-info-studio flex"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-8 text-gold-500"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <div class="flex flex-col gap-1 ml-4">
            <p class="text-subhead font-serif">{{ tx('studioHours.label') }}</p>
            <p class="text-gray-muted">{{ tx('studioHours.days') }}</p>
            <p class="text-gray-muted">{{ tx('studioHours.hours') }}</p>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<style scoped>
textarea::-webkit-resizer {
  background: transparent;
  /* 讓右下圖是變金色 firefox沒有用其他有用 */
}
</style>

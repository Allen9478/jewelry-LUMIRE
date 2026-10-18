<script setup lang="ts">
import { ref, computed } from 'vue'
import { useScopedI18n, type RtInput } from '@/composables/useScopedI18n'
import FormInput from '@/components/ui/FormInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseArrowIcon from '@/components/ui/BaseArrowIcon.vue'
import { MapPinIcon, ClockIcon } from '@heroicons/vue/24/outline'

const form = ref({
  name: '',
  email: '',
  message: '',
})
const formMsg = ref('')
const formHasError = ref(false)

//讓郵件格式符合驗證的正規表達式
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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

function handleDemoSubmit() {
  const missing = !form.value.name.trim() || !form.value.email.trim() || !form.value.message.trim()
  const badEmail = !missing && !EMAIL_RE.test(form.value.email.trim())

  formHasError.value = missing || badEmail
  formMsg.value = missing
    ? 'form.error.required'
    : badEmail
      ? 'form.error.invalidEmail'
      : 'form.demo'
}
</script>
<template>
  <div class="contact flex flex-col tablet:flex-row">
    <section
      class="contact__hero hidden tablet:block tablet:sticky tablet:w-[50%] desktop:w-[45%] tablet:top-0 tablet:h-screen tablet:self-start"
    >
      <img
        src="@/assets/images/contact/contact-hero.webp"
        alt=""
        fetchpriority="high"
        width="1023"
        height="1537"
        class="contact__hero-img w-full h-full object-cover tablet:object-[30%_50%]"
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
          class="contact__content-inquiries-option flex flex-row items-center justify-between border-b last:border-b-0 border-gold-500/40 pb-4 last:pb-0 hover:cursor-pointer group"
        >
          <div class="max-w-[250px] tablet:max-w-xl flex flex-col gap-2">
            <p class="text-subhead font-serif">{{ item.title }}</p>
            <p class="text-gold-500">{{ item.email }}</p>
            <p class="text-gray-muted">{{ item.description }}</p>
          </div>
          <BaseArrowIcon class="text-gold-500 mr-2" />
        </div>
      </div>
      <!-- novalidate是關閉表單原生驗證 -->
      <form
        novalidate
        @submit.prevent="handleDemoSubmit"
        class="contact__content-form flex flex-col gap-4"
      >
        <FormInput
          v-fade-in="{ delay: 320, y: 20, mobile: { delay: 0, y: 16 } }"
          v-model="form.name"
          id="contact-name"
          name="name"
          autocomplete="username"
          :label="txCommon('form.name')"
          type="text"
        />
        <FormInput
          v-fade-in="{ delay: 380, y: 20, mobile: { delay: 0, y: 16 } }"
          v-model="form.email"
          id="contact-email"
          name="email"
          autocomplete="email"
          :label="txCommon('form.email')"
          type="email"
        />
        <div v-fade-in="{ delay: 440, y: 20, mobile: { delay: 0, y: 16 } }" class="relative group">
          <textarea
            v-model="form.message"
            id="contact-message"
            rows="5"
            placeholder=" "
            class="w-full pt-5 pb-1 outline-none peer bg-transparent text-gold-500 border-b border-gray-muted group-focus-within:border-gold-500 resize-y min-h-[80px]"
          />
          <label
            for="contact-message"
            class="absolute origin-[0_0] left-0 top-4 text-body-sm laptop:text-body tracking-[1px] peer-focus:top-0 peer-focus:scale-75 group-focus-within:text-gold-500 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:scale-75"
            >{{ tx('form.message') }}</label
          >
        </div>
        <p
          v-if="formMsg"
          aria-live="polite"
          class="min-h-[1rem] text-label-lg"
          :class="formHasError ? 'text-red-500' : 'text-gold-500'"
        >
          {{ tx(formMsg) }}
        </p>
        <BaseButton type="submit" class="w-full mt-4">{{ tx('form.submit') }}</BaseButton>
      </form>
      <section
        class="contact__content-info flex flex-col desktop:flex-row desktop:justify-between gap-8 my-8"
      >
        <div
          v-fade-in="{ delay: 120, y: 16, mobile: { delay: 0, y: 12 } }"
          class="contact__content-info-location flex justify-start"
        >
          <MapPinIcon class="size-8 text-gold-500 -translate-y-px" />
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
          <ClockIcon class="size-8 text-gold-500 -translate-y-px" />
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
/* 讓右下圖是變金色 firefox沒有用其他有用 */
textarea::-webkit-resizer {
  background: transparent;
}
</style>

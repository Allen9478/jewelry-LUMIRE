<script setup>
import contact from '@/data/contact.json'
import FormInput from '@/components/ui/FormInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
</script>
<template>
  <div class="contact flex flex-col tablet:flex-row">
    <section
      class="contact__hero hidden tablet:block tablet:sticky tablet:w-1/2 tablet:top-0 tablet:h-screen tablet:self-start"
    >
      <img
        src="@/assets/images/contact/contact-hero.webp"
        alt="contact hero image"
        class="contact__hero-img w-full h-full object-cover"
      />
    </section>
    <section class="contact__content page-container flex flex-col header-offset gap-8 tablet:w-1/2">
      <h1 class="text-5xl text-center font-italic italic">{{ contact.title }}</h1>
      <div class="contact__content-inquiries flex flex-col gap-8">
        <div
          v-for="(inquiries, index) in contact.inquiries"
          :key="index"
          class="contact__content-inquiries-option flex flex-row items-center justify-between border-b border-gold-500/40 pb-4"
        >
          <div class="max-w-[300px] tablet:max-w-xl flex flex-col gap-2 pr-8">
            <p class="text-subhead font-serif">{{ inquiries.title }}</p>
            <p class="text-gold-500">{{ inquiries.email }}</p>
            <p class="text-gray-muted">{{ inquiries.description }}</p>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="text-gold-500 size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </div>
      </div>
      <form action="" class="contact__content-form flex flex-col gap-4">
        <FormInput :label="contact.form.name" type="text" />
        <FormInput :label="contact.form.email" type="text" />
        <div class="relative group">
          <textarea
            id="message"
            rows="5"
            placeholder=" "
            class="w-full pt-5 pb-1 outline-none peer bg-transparent text-gold-500 border-b border-gray-muted group-focus-within:border-gold-500 resize-y min-h-[80px]"
          />
          <label
            for="message"
            class="absolute origin-[0_0] left-0 top-4 text-body-sm laptop:text-body tracking-[1px] peer-focus:top-0 peer-focus:scale-75 group-focus-within:text-gold-500 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:scale-75"
            >Message</label
          >
        </div>
        <BaseButton class="w-full mt-4">{{ contact.form.submit }}</BaseButton>
      </form>
      <section class="contact__content-info flex flex-col tablet:flex-row gap-6">
        <div class="contact__content-info-location flex justify-start">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
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
            <p class="text-subhead font-serif">{{ contact.location.name }}</p>
            <p v-for="(line, i) in contact.location.address" :key="i" class="text-gray-muted">
              {{ line }}
            </p>
          </div>
        </div>
        <div class="contact__content-info-studio flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
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
            <p class="text-subhead font-serif">{{ contact.studioHours.label }}</p>
            <p class="text-gray-muted">{{ contact.studioHours.days }}</p>
            <p class="text-gray-muted">{{ contact.studioHours.hours }}</p>
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

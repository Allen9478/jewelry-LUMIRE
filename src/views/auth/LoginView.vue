<script setup>
import BaseButton from '@/components/ui/BaseButton.vue'
</script>
<template>
  <div class="flex flex-col tablet:flex-row tablet:h-[90dvh] overflow-hidden">
    <div class="h-[45dvh] tablet:h-full tablet:w-1/2">
      <img
        src="../../assets/images/ui/auth-hero-ring.webp"
        alt="auth-bg"
        class="w-full h-full object-cover object-[center_35%] tablet:object-[center_25%] laptop:object-[center_45%]"
      />
    </div>
    <div
      class="w-full mx-auto p-6 pt-0 tablet:flex tablet:flex-1 tablet:flex-col tablet:justify-center tablet:px-16 laptop:px-24 tablet:max-w-[600px] laptop:max-w-[680px] ml-auto"
    >
      <h2 class="text-[42px] laptop:text-[56px] text-center tracking-wide font-serif pb-8">
        Welcome Back
      </h2>
      <form action="#" class="flex flex-col gap-8">
        <div class="relative">
          <input
            id="email"
            type="text"
            placeholder=" "
            class="w-full pt-5 pb-1 outline-none peer bg-transparent text-gold-500 border-b border-[#3a3530] focus:border-[#c9a84c] transition-colors"
          />
          <label
            for="email"
            class="absolute origin-[0_0] left-0 top-4 text-body-sm laptop:text-body tracking-[1px] peer-focus:top-0 peer-focus:scale-75 peer-focus:text-[#c9a84c] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:scale-75"
            >EMAIL</label
          >
        </div>
        <div class="relative">
          <input
            id="password"
            type="password"
            placeholder=" "
            class="w-full pt-5 pb-1 outline-none peer bg-transparent text-gold-500 border-b border-[#3a3530] focus:border-[#c9a84c] transition-colors"
          />
          <label
            for="password"
            class="absolute origin-[0_0] left-0 top-4 text-body-sm laptop:text-body tracking-[1px] peer-focus:top-0 peer-focus:scale-75 peer-focus:text-[#c9a84c] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:scale-75"
            >PASSWORD</label
          >
          <button
            type="button"
            class="toggle-pw absolute right-0 bottom-2 text-gold-500"
            @click="showPassword = !showPassword"
            :aria-label="showPassword ? 'Hide password' : 'Show password'"
          >
            <!-- Eye icon -->
            <svg
              v-if="!showPassword"
              class="size-6"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <!-- Eye-off icon -->
            <svg
              v-else
              class="size-6"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
              <path
                d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
              />
              <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
              <line x1="2" y1="2" x2="22" y2="22" />
            </svg>
          </button>
        </div>
      </form>
      <BaseButton :validator="primary" class="w-full font-bold p-4 text-label-lg mt-8 laptop:mt-12"
        >ENTER</BaseButton
      >
      <p class="py-8 text-center laptop:text-left laptop:text-body">
        New to Lumière? <span class="text-gold-500 underline">Request Access</span>
      </p>
    </div>
  </div>
</template>

<style scoped>
input {
  border: 1px solid transparent;
  border-bottom-color: var(--color-gold-500);
}
</style>

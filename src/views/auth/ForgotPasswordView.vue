<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'
import BaseButton from '@/components/ui/BaseButton.vue'

const authStore = useAuthStore()
const email = ref('')
const error = ref('')
const showPassword = ref(false)
const router = useRouter()
const sucMsg = ref('')
async function handleSubmit() {
  console.log('handleSubmit triggered')
  try {
    await authStore.resetPassword(email.value)
    sucMsg.value = 'A reset link has been sent to your email'
  } catch {}
}
function goToLogin() {
  router.push({ name: 'login' })
}
</script>
<template>
  <div
    class="auth__form w-full mx-auto p-6 pt-0 tablet:flex tablet:flex-1 tablet:flex-col tablet:justify-center tablet:px-16 laptop:px-24 tablet:max-w-[600px] laptop:max-w-[680px] ml-auto"
  >
    <h2
      class="auth-welcome text-[42px] laptop:text-[56px] text-center tracking-wide font-serif pb-8 tablet:landscape:pt-8"
    >
      Reset Password
    </h2>
    <p>Enter your email address and we'll send you a link to reset your password.</p>
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-8">
      <div class="relative">
        <input
          id="email"
          v-model="email"
          type="email"
          placeholder=" "
          class="w-full pt-5 pb-1 outline-none peer bg-transparent text-gold-500 border-b border-[#3a3530] focus:border-[#c9a84c] transition-colors"
        />
        <label
          for="email"
          class="absolute origin-[0_0] left-0 top-4 text-body-sm laptop:text-body tracking-[1px] peer-focus:top-0 peer-focus:scale-75 peer-focus:text-[#c9a84c] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:scale-75"
          >EMAIL</label
        >
      </div>
      <p v-if="sucMsg" class="text-[#c9a84c] text-sm">{{ sucMsg }}</p>
      <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
      <BaseButton
        type="submit"
        validator="primary"
        class="w-full font-bold p-4 text-label-lg mt-8 laptop:mt-12"
        >SEND LINK</BaseButton
      >
    </form>

    <p class="py-8 text-center laptop:text-left laptop:text-body">
      Remember password?
      <span @click="goToLogin" class="text-gold-500 underline cursor-pointer">Sign In</span>
    </p>
  </div>
</template>

<style scoped></style>

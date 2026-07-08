<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'
import AuthInput from '@/components/ui/AuthInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const authStore = useAuthStore()
const email = ref('')
const error = ref('')
const sucMsg = ref('')
async function handleSubmit() {
  try {
    error.value = ''
    sucMsg.value = ''
    await authStore.resetPassword(email.value)
    sucMsg.value = 'A reset link has been sent to your email'
  } catch (err) {
    console.error('reset password failed', err)
    error.value = err.message || 'Something went wrong'
  }
}
</script>
<template>
  <div class="auth__form">
    <h2 class="auth__title">Reset Password</h2>
    <p class="text-center">Enter your email and we'll send you a link to reset your password.</p>
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-8">
      <AuthInput v-model="email" type="email" label="EMAIL" class="mt-5" />
      <p v-if="sucMsg" class="text-[#c9a84c] text-sm">{{ sucMsg }}</p>
      <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
      <BaseButton
        type="submit"
        variant="primary"
        class="w-full font-bold p-4 text-label-lg mt-4 laptop:mt-8"
        >SEND LINK</BaseButton
      >
    </form>

    <p class="py-8 text-center laptop:text-left laptop:text-body">
      Remember password?
      <RouterLink :to="{ name: 'login' }" class="link--auth">Sign In</RouterLink>
    </p>
  </div>
</template>

<style scoped></style>

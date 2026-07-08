<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'
import AuthInput from '@/components/ui/AuthInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
const authStore = useAuthStore()
const fullname = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const router = useRouter()
const passwordMismatch = computed(
  () => confirmPassword.value !== '' && password.value !== confirmPassword.value,
)
async function handleSubmit() {
  console.log('handleSubmit triggered')
  if (passwordMismatch.value) return
  try {
    await authStore.register(fullname.value, email.value, password.value)
    router.push('/')
  } catch (err) {
    console.log('error:', err)
  }
}
</script>
<template>
  <div class="auth__form">
    <h2 class="auth__title">New Here?</h2>
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-8">
      <AuthInput v-model="fullname" type="text" label="FULL NAME" />
      <AuthInput v-model="email" type="email" label="EMAIL" />
      <AuthInput v-model="password" type="password" label="PASSWORD" />
      <AuthInput v-model="confirmPassword" type="password" label="CONFIRM PASSWORD" />
      <p v-if="authStore.error" class="text-red-500 text-sm">{{ authStore.error }}</p>
      <p v-if="passwordMismatch" class="text-red-500 text-sm">两次密码输入不一致</p>
      <BaseButton
        type="submit"
        variant="primary"
        class="w-full font-bold p-4 text-label-lg mt-4 laptop:mt-8"
        >CREATE ACCOUNT</BaseButton
      >
    </form>

    <p class="py-8 text-center laptop:text-left laptop:text-body">
      Already have an account?
      <RouterLink :to="{ name: 'login' }" class="link--auth">Sign In</RouterLink>
    </p>
  </div>
</template>

<style scoped></style>

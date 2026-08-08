<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'
import AuthInput from '@/components/ui/AuthInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const authStore = useAuthStore()
const email = ref('')
const password = ref('')
const router = useRouter()

onMounted(() => {
  authStore.error = ''
})
async function handleSubmit() {
  try {
    await authStore.login(email.value, password.value)
    router.push('/')
  } catch (err) {
    console.error('登入失败:', err)
  }
}
</script>
<template>
  <div class="auth__form">
    <h2 class="auth__title">Welcome Back</h2>
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-8">
      <AuthInput v-model="email" type="email" label="EMAIL" />
      <AuthInput v-model="password" type="password" label="PASSWORD" />
      <p v-if="authStore.error" class="text-red-500 text-sm">{{ authStore.error }}</p>
      <BaseButton
        type="submit"
        variant="primary"
        class="w-full font-bold p-4 text-label-lg mt-8 laptop:mt-12"
        >ENTER</BaseButton
      >
    </form>

    <div class="py-8 text-center laptop:text-left laptop:text-body">
      <span>New to Lumière?</span>
      <div class="block laptop:inline mt-2 laptop:mt-0">
        <RouterLink :to="{ name: 'register' }" class="link--auth laptop:ml-2"
          >Request Access</RouterLink
        >
        <RouterLink :to="{ name: 'forgot-password' }" class="link--auth ml-2"
          >Forgot password</RouterLink
        >
      </div>
    </div>
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'
import FormInput from '@/components/ui/FormInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const authStore = useAuthStore()
const email = ref('')
const password = ref('')
const route = useRoute()
const router = useRouter()

onMounted(() => {
  authStore.error = ''
})
async function handleSubmit() {
  try {
    await authStore.login(email.value, password.value)

    const redirect = route.query.redirect
    const target = typeof redirect === 'string' ? redirect : '/'

    router.push(target)
  } catch (err) {
    console.error('登入失败:', err)
  }
}
</script>
<template>
  <div class="auth__form">
    <h2 v-fade-in="{ delay: 0, y: 12 }" class="auth__title">Welcome Back</h2>
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-8">
      <FormInput v-fade-in="{ delay: 60, y: 16 }" v-model="email" type="email" label="EMAIL" />
      <FormInput
        v-fade-in="{ delay: 120, y: 16 }"
        v-model="password"
        type="password"
        label="PASSWORD"
      />
      <p v-if="authStore.error" class="text-red-500 text-label-lg">{{ authStore.error }}</p>
      <div v-fade-in="{ delay: 240, y: 12 }">
        <BaseButton
          type="submit"
          variant="primary"
          class="w-full font-bold p-4 text-label-lg mt-8 laptop:mt-12"
          >ENTER</BaseButton
        >
      </div>
    </form>

    <div
      v-fade-in="{ delay: 240, y: 12 }"
      class="py-8 text-center laptop:text-left laptop:text-body"
    >
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

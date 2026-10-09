<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'
import { useScopedI18n } from '@/composables/useScopedI18n'
import FormInput from '@/components/ui/FormInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const { tx } = useScopedI18n('page.register')
const { tx: txCommon } = useScopedI18n('common')
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
  if (passwordMismatch.value) return
  try {
    await authStore.register(fullname.value, email.value, password.value)
    router.push('/')
  } catch {
    //錯誤由 passwordMismatch 掌管這裡註解避免 eslint 報錯
  }
}
</script>
<template>
  <div class="auth__form">
    <h1 class="auth__title">{{ tx('title') }}</h1>
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-8">
      <FormInput v-model="fullname" type="text" :label="tx('fullName')" />
      <FormInput v-model="email" type="email" :label="txCommon('form.email')" />
      <FormInput v-model="password" type="password" :label="txCommon('form.password')" />
      <FormInput v-model="confirmPassword" type="password" :label="tx('confirmPassword')" />
      <p v-if="passwordMismatch" class="text-red-500 text-label-lg">{{ tx('passwordMismatch') }}</p>
      <BaseButton
        type="submit"
        variant="primary"
        class="w-full font-bold p-4 text-label-lg mt-4 laptop:mt-8"
        >{{ tx('submit') }}</BaseButton
      >
    </form>

    <p class="py-8 text-center laptop:text-left laptop:text-body">
      {{ tx('haveAccount') }}
      <RouterLink :to="{ name: 'login' }" class="link--auth">{{ txCommon('signIn') }}</RouterLink>
    </p>
  </div>
</template>

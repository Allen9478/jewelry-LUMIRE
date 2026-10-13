<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'
import { useScopedI18n } from '@/composables/useScopedI18n'
import { getAuthErrorKey } from '@/utils/authError'
import FormInput from '@/components/ui/FormInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const { tx } = useScopedI18n('page.register')
const { tx: txCommon } = useScopedI18n('common')
const authStore = useAuthStore()
const errMsg = ref('')
const fullname = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const router = useRouter()
async function handleSubmit() {
  if (authStore.isLoading) return
  errMsg.value = ''

  if (
    !fullname.value.trim() ||
    !email.value.trim() ||
    !password.value.trim() ||
    !confirmPassword.value.trim()
  ) {
    errMsg.value = 'auth.errMsg.required'
    return
  }
  if (password.value !== confirmPassword.value) {
    errMsg.value = 'auth.errMsg.passwordMismatch'
    return
  }
  try {
    await authStore.register(fullname.value.trim(), email.value.trim(), password.value)
    router.push('/')
  } catch (err) {
    errMsg.value = getAuthErrorKey(err)
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
      <p v-if="errMsg" role="alert" class="text-red-500 text-label-lg">{{ txCommon(errMsg) }}</p>
      <BaseButton
        type="submit"
        :disabled="authStore.isLoading"
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

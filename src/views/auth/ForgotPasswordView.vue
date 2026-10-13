<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'
import { useScopedI18n } from '@/composables/useScopedI18n'
import { getAuthErrorKey } from '@/utils/authError'
import FormInput from '@/components/ui/FormInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const { tx } = useScopedI18n('page.forgotPassword')
const { tx: txCommon } = useScopedI18n('common')
const authStore = useAuthStore()
const email = ref('')
const errMsg = ref('')
const resetEmailSent = ref(false)
async function handleSubmit() {
  if (authStore.isLoading) return
  errMsg.value = ''
  resetEmailSent.value = false
  if (!email.value.trim()) {
    errMsg.value = 'auth.errMsg.emailEmpty'
    return
  }
  try {
    await authStore.resetPassword(email.value)
    resetEmailSent.value = true
  } catch (err) {
    errMsg.value = getAuthErrorKey(err)
  }
}
</script>
<template>
  <div class="auth__form">
    <h1 class="auth__title">{{ tx('title') }}</h1>
    <p class="text-center">{{ tx('description') }}</p>
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-8">
      <FormInput v-model="email" type="email" :label="txCommon('form.email')" class="mt-5" />
      <!-- role=status是內容唸完再換他唸，alert是馬上念出來 -->
      <p v-if="resetEmailSent" role="status" class="text-gold-500 text-label-lg">
        {{ txCommon('auth.resetEmailSent') }}
      </p>
      <p v-if="errMsg" role="alert" class="text-red-500 text-label-lg">
        {{ txCommon(errMsg) }}
      </p>
      <BaseButton
        type="submit"
        :disabled="authStore.isLoading"
        variant="primary"
        class="w-full font-bold p-4 text-label-lg mt-4 laptop:mt-8"
        >{{ tx('submit') }}</BaseButton
      >
    </form>

    <p class="py-8 text-center laptop:text-left laptop:text-body">
      {{ tx('rememberPassword') }}
      <RouterLink :to="{ name: 'login' }" class="link--auth">
        {{ txCommon('signIn') }}
      </RouterLink>
    </p>
  </div>
</template>

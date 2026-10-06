<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'
import { useScopedI18n } from '@/composables/useScopedI18n'
import FormInput from '@/components/ui/FormInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const { tx } = useScopedI18n('page.forgotPassword')
const { tx: txCommon } = useScopedI18n('common')
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
  } catch {
    error.value = authStore.error || 'Something went wrong'
  }
}
</script>
<template>
  <div class="auth__form">
    <h1 class="auth__title">{{ tx('title') }}</h1>
    <p class="text-center">{{ tx('description') }}</p>
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-8">
      <FormInput v-model="email" type="email" :label="txCommon('form.email')" class="mt-5" />
      <p v-if="sucMsg" class="text-gold-500 text-label-lg">{{ sucMsg }}</p>
      <p v-if="error" class="text-red-500 text-label-lg">{{ error }}</p>
      <BaseButton
        type="submit"
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

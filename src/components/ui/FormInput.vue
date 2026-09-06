<!-- FormInput.vue -->
<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  type: { type: String, default: 'text' },
  label: { type: String, required: true },
  id: { type: String, default: '' },
})
const modelValue = defineModel()
const showPassword = ref(false)

const inputId = computed(() => props.id || props.label)
const isPassword = computed(() => props.type === 'password')
const inputType = computed(() =>
  isPassword.value ? (showPassword.value ? 'text' : 'password') : props.type,
)
</script>

<template>
  <div class="relative group">
    <input
      :id="inputId"
      v-model="modelValue"
      :type="inputType"
      placeholder=" "
      class="w-full pt-5 pb-1 outline-none peer bg-transparent text-gold-500 border-b border-gray-muted group-focus-within:border-gold-500"
    />
    <label
      :for="inputId"
      class="absolute origin-[0_0] left-0 top-4 text-body-sm laptop:text-body tracking-[1px] peer-focus:top-0 peer-focus:scale-75 group-focus-within:text-gold-500 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:scale-75"
      >{{ label }}</label
    >

    <button
      v-if="isPassword"
      type="button"
      class="toggle-pw absolute right-0 bottom-2 group-focus-within:text-gold-500"
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
        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
        <line x1="2" y1="2" x2="22" y2="22" />
      </svg>
    </button>
  </div>
</template>

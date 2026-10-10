<script setup lang="ts">
import { EnvelopeIcon } from '@heroicons/vue/24/outline'

// 品牌圖示(Instagram / Facebook / YouTube)Heroicons 沒有,所以保留自己的 SVG。
// 線條樣式(stroke、圓角)統一寫在最外層 <svg>,各 path 不必重複。
defineProps<{
  name: 'instagram' | 'facebook' | 'email' | 'youtube'
}>()
</script>

<template>
  <EnvelopeIcon v-if="name === 'email'" class="footer__icon--social" />
  <svg
    v-else
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    class="footer__icon--social"
  >
    <template v-if="name === 'instagram'">
      <path
        d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
      />
      <path
        d="M3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16Z"
      />
      <path d="M17.5 6.51L17.51 6.49889" />
    </template>

    <template v-else-if="name === 'facebook'">
      <path
        d="M21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8Z"
      />
      <path d="M11 21C11 18 11 15 11 12C11 9.8125 11.5 8 15 8" />
      <path d="M9 13H11H15" />
    </template>

    <template v-else-if="name === 'youtube'">
      <path d="M14 12L10.5 14V10L14 12Z" fill="#000000" />
      <path
        d="M2 12.7075V11.2924C2 8.39705 2 6.94939 2.90549 6.01792C3.81099 5.08645 5.23656 5.04613 8.08769 4.96549C9.43873 4.92728 10.8188 4.8999 12 4.8999C13.1812 4.8999 14.5613 4.92728 15.9123 4.96549C18.7634 5.04613 20.189 5.08645 21.0945 6.01792C22 6.94939 22 8.39705 22 11.2924V12.7075C22 15.6028 22 17.0505 21.0945 17.9819C20.189 18.9134 18.7635 18.9537 15.9124 19.0344C14.5613 19.0726 13.1812 19.1 12 19.1C10.8188 19.1 9.43867 19.0726 8.0876 19.0344C5.23651 18.9537 3.81097 18.9134 2.90548 17.9819C2 17.0505 2 15.6028 2 12.7075Z"
      />
    </template>
  </svg>
</template>

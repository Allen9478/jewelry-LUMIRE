<script setup lang="ts">
import { computed } from 'vue'
import { useScopedI18n } from '@/composables/useScopedI18n'

const { tx, txList } = useScopedI18n('page.exhibitions')
const descriptions = computed(() => txList('description'))
</script>

<template>
  <div
    class="exhibitions__quote page-container grid tablet:grid-cols-[40%_60%] laptop:grid-cols-[35%_65%] wide:grid-cols-[30%_70%] tablet:justify-items-center gap-12 tablet:gap-8"
  >
    <div
      v-fade-in="{ delay: 0, y: 16, mobile: { delay: 0, y: 12 } }"
      class="exhibitions__quote-main relative flex items-center justify-center"
    >
      <p
        class="exhibitions__quote-text text-quote text-gold-500 p-10 tablet:px-8 desktop:px-12 wide:px-16 italic"
      >
        {{ tx('quote') }}
      </p>
    </div>
    <div
      v-fade-in="{ delay: 100, y: 16, mobile: { delay: 0, y: 12 } }"
      class="laptop:w-[90%] flex flex-col tablet:justify-center tablet:border-l tablet:border-gold-500/60 space-y-4 tablet:px-8"
    >
      <p v-for="(description, index) in descriptions" :key="index">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.exhibitions__quote-text {
  min-height: calc(1.6em * 3);
  line-height: 1.5;
}

.exhibitions__quote-text::before,
.exhibitions__quote-text::after {
  position: absolute;
  font-size: clamp(36px, 6vw, 60px);
  font-family: 'Georgia', serif;
  line-height: 0;
  color: var(--color-gold-500);
}

.exhibitions__quote-text::before {
  content: '“';
  top: 30px;
  left: 0;
}

.exhibitions__quote-text::after {
  content: '”';
  bottom: 0;
  right: 8px;
}
</style>

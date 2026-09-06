<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    required: true,
    validator: (v) => ['home', 'artist', 'about'].includes(v),
  },
  quote: {
    type: String,
    required: true,
  },
  // 作者/來源文字,about 目前沒有就傳空字串或不傳
  author: {
    type: String,
    default: '',
  },
})

import texture2 from '../../assets/images/textures/texture2.webp'
import textureForward from '../../assets/images/textures/texture-forward.webp'

const backgroundImageMap = {
  home: texture2,
  artist: textureForward,
  about: textureForward,
}

const backgroundImage = computed(() => backgroundImageMap[props.variant])

const textStyles = {
  home: {
    quote: 'italic font-serif text-gold-500',
    author: 'text-gold-300',
  },
  artist: {
    quote: 'italic font-serif text-cream/90',
    author: 'text-gold-300',
  },
  about: {
    quote: 'not-italic font-sans font-medium text-gold-500',
    author: 'text-gold-300',
  },
}

const styles = computed(() => textStyles[props.variant])

// home 的作者要加 "— " 前綴,artist / about 不用
const displayAuthor = computed(() => {
  if (!props.author) return ''
  return props.variant === 'home' ? `— ${props.author}` : props.author
})
</script>
<template>
  <div
    class="quote-block border-y border-gold-500/30 flex flex-col items-center justify-center text-center gap-4 px-6 py-16 my-10 tablet:my-0 tablet:mb-5 tablet:py-20 laptop:py-24 w-screen ml-[calc(50%_-_50vw)] mr-[calc(50%_-_50vw)]"
    :style="{ '--quote-bg': `url(${backgroundImage})` }"
  >
    <div
      v-fade-in
      class="flex flex-col items-center gap-4 w-full max-w-[400px] tablet:max-w-[700px] mx-auto text-center p-12"
    >
      <div class="quote-block__quote-wrap relative w-full flex justify-center">
        <p
          :class="styles.quote"
          class="quote-block__text mx-auto mt-2 max-w-[280px] ipad:max-w-md tablet:max-w-xl text-quote pt-16 italic font-serif"
        >
          {{ quote }}
        </p>
      </div>

      <div v-if="variant !== 'home'" class="w-12 h-px bg-gold-500 my-4" aria-hidden="true"></div>

      <p
        v-if="displayAuthor"
        class="quote-block__author text-xs uppercase tracking-wider text-gold-300 tablet:mt-5 tablet:text-sm"
      >
        {{ displayAuthor }}
      </p>

      <slot name="extra" />
    </div>
  </div>
</template>

<style scoped>
.quote-block {
  background-image: var(--quote-bg);
  background-size: cover;
  background-position: center;
}

.quote-block__quote-wrap::before {
  position: absolute;
  font-size: clamp(64px, 6vw, 96px);
  font-family: 'Georgia', serif;
  line-height: 0;
  color: var(--color-gold-500);
  content: '“';
  top: 45px;
  left: 50%;
  transform: translateX(-50%);
}
/* 手機版(預設,無 media query 就是最小寬度優先)*/
@media (max-width: 767px) {
  .quote-block {
    /* 拿掉 cover,改用固定百分比,避免手機窄版時被放大過度 */
    background-size: contain;
    background-position: center top;
  }
}
</style>

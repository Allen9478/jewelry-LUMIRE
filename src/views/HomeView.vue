<script setup lang="ts">
import { ref } from 'vue'
import { useScopedI18n } from '@/composables/useScopedI18n'
import HomeHero from '@/components/home/HomeHero.vue'
import HomeBreathing from '@/components/home/HomeBreathing.vue'
import HomeFeaturedWorks from '@/components/home/HomeFeaturedWorks.vue'
import HomeFeaturedArtists from '@/components/home/HomeFeaturedArtists.vue'
import HomeExhibition from '@/components/home/HomeExhibition.vue'
import QuoteBlock from '@/components/ui/QuoteBlock.vue'
import GoldDivider from '@/components/ui/GoldDivider.vue'

const { tx } = useScopedI18n('page.home')
const email = ref('')
const newsletterMsg = ref('')
const newsletterHasError = ref(false)
const newsletterDone = ref(false)

function handleNewsletterDemo() {
  const value = email.value.trim()
  newsletterHasError.value = !value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  newsletterDone.value = !newsletterHasError.value
  newsletterMsg.value = newsletterHasError.value ? tx('newsletter.invalid') : tx('newsletter.demo')
}
</script>
<template>
  <HomeHero />
  <HomeBreathing class="my-48" />
  <HomeFeaturedWorks />
  <GoldDivider variant="full" class="w-full my-20 tablet:my-40" />
  <HomeFeaturedArtists />
  <GoldDivider class="w-full my-20 tablet:my-40" />
  <HomeExhibition />
  <QuoteBlock variant="home" :quote="tx('quote.text')" :author="tx('quote.author')">
    <template #extra>
      <form novalidate @submit.prevent="handleNewsletterDemo" class="flex flex-col gap-4">
        <div
          class="flex group z-10 w-[290px] border border-gold-500/40 focus-within:border-gold-500 focus-within:ring-1 focus-within:ring-gold-500 transition-colors ipad:max-w-sm tablet:max-w-md"
        >
          <input
            id="home-newsletter-email"
            v-model="email"
            name="email"
            type="email"
            autocomplete="email"
            :aria-label="tx('newsletter.placeholder')"
            :placeholder="tx('newsletter.placeholder')"
            :aria-invalid="newsletterHasError"
            class="min-w-0 flex-1 bg-transparent p-3 text-label-lg text-white placeholder:text-gold-200/50 focus:outline-none"
          />
          <button
            type="submit"
            class="flex h-[46px] min-w-[110px] shrink-0 items-center justify-center bg-gold-500/80 text-black-soft transition-colors hover:bg-gold-500 hover:text-black group-focus-within:bg-gold-500 group-focus-within:text-black"
          >
            {{ newsletterDone ? tx('newsletter.submitted') : tx('newsletter.submit') }}
          </button>
        </div>
        <p
          id="newsletter-msg"
          aria-live="polite"
          class="min-h-[1rem]"
          :class="newsletterHasError ? 'text-red-500' : 'text-gold-500'"
        >
          {{ newsletterMsg }}
        </p>
      </form>
    </template>
  </QuoteBlock>
</template>

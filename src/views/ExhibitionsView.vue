<script setup lang="ts">
import GoldDivider from '@/components/ui/GoldDivider.vue'
import ExhibitionHero from '@/components/exhibitions/ExhibitionHero.vue'
import ExhibitionInfoBar from '@/components/exhibitions/ExhibitionInfoBar.vue'
import ExhibitionIntro from '@/components/exhibitions/ExhibitionIntro.vue'
import ExhibitionWorks from '@/components/exhibitions/ExhibitionWorks.vue'
import ExhibitionFeaturedArtist from '@/components/exhibitions/ExhibitionFeaturedArtist.vue'
import ExhibitionVisit from '@/components/exhibitions/ExhibitionVisit.vue'
import ExhibitionPastList from '@/components/exhibitions/ExhibitionPastList.vue'
</script>

<template>
  <div class="exhibitions flex flex-col gap-24 tablet:gap-36">
    <ExhibitionHero />
    <ExhibitionInfoBar />
    <ExhibitionIntro />
    <ExhibitionWorks />
    <ExhibitionFeaturedArtist />
    <ExhibitionVisit />
    <ExhibitionPastList />
    <GoldDivider class="mb-10" />
  </div>
</template>

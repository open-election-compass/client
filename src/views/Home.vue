<template>
  <div>
    <start-section />
    <introduction-section />
    <theses-section />
    <party-section v-if="$store.getters['theses/complete']" />
    <match-section v-if="$store.getters['parties/chosen']" />
  </div>
</template>

<script>
import StartSection from '@/components/StartSection.vue';
import IntroductionSection from '@/components/IntroductionSection.vue';
import ThesesSection from '@/components/ThesesSection.vue';
import PartySection from '@/components/PartySection.vue';
import MatchSection from '@/components/MatchSection.vue';

export default {
  name: 'home',
  components: {
    StartSection,
    IntroductionSection,
    ThesesSection,
    PartySection,
    MatchSection,
  },
};
</script>

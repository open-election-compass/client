<template>
  <div>
    <start-section />
    <introduction-section />
    <theses-section />
    <party-section v-if="$store.getters['theses/complete']" />
    <match-section v-if="$store.getters['parties/chosen']" />
    <compare-section v-if="$store.getters['parties/chosen']" />
  </div>
</template>

<script>
import StartSection from './sections/01-start/StartSection.vue';
import IntroductionSection from './sections/02-introduction/IntroductionSection.vue';
import ThesesSection from './sections/03-theses/ThesesSection.vue';
import PartySection from './sections/04-party/PartySection.vue';
import MatchSection from './sections/05-match/MatchSection.vue';
import CompareSection from './sections/06-compare/CompareSection.vue';

export default {
  name: 'home',
  components: {
    StartSection,
    IntroductionSection,
    ThesesSection,
    PartySection,
    MatchSection,
    CompareSection,
  },
};
</script>

<template>
  <div>
    <start-section />
    <introduction-section />
    <theses-section :theses="$root.theses" />
    <party-section :parties="$root.parties" />
  </div>
</template>

<script>
import StartSection from '@/components/StartSection.vue';
import IntroductionSection from '@/components/IntroductionSection.vue';
import ThesesSection from '@/components/ThesesSection.vue';
import PartySection from '@/components/PartySection.vue';

export default {
  name: 'home',
  components: {
    StartSection,
    IntroductionSection,
    ThesesSection,
    PartySection,
  },
};
</script>

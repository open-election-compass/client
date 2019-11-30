<template>
  <div>
    <start-section />
    <introduction-section />
    <theses-section :theses="$root.theses" />
  </div>
</template>

<script>
import StartSection from '@/components/StartSection.vue';
import IntroductionSection from '@/components/IntroductionSection.vue';
import ThesesSection from '@/components/ThesesSection.vue';

export default {
  name: 'home',
  components: {
    StartSection,
    IntroductionSection,
    ThesesSection,
  },
};
</script>

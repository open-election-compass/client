<template>
  <div>
    <start-section />
    <introduction-section />
  </div>
</template>

<script>
import StartSection from '@/components/StartSection.vue';
import IntroductionSection from '@/components/IntroductionSection.vue';

export default {
  name: 'home',
  components: {
    StartSection,
    IntroductionSection,
  },
};
</script>

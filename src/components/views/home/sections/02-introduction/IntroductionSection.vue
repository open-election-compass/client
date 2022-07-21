<template>
  <PageSection class="introduction-section" data-section="introduction">
    <h2 class="introduction-section__heading">
      {{ $t('introduction.heading') }}
    </h2>
    <p class="introduction-section__text">
      {{ $t('introduction.text') }}
    </p>
  </PageSection>
</template>

<script>
import PageSection from '/src/components/elements/PageSection.vue';

export default {
  name: 'IntroductionSection',
  components: {
    PageSection,
  },
};
</script>

<style lang="scss">
.introduction-section {
  background-color: #edf2f7;
  color: #718096;
}

.introduction-section__heading {
  font-weight: bold;
  font-size: 1.5em;
  line-height: 1.25;
  margin-bottom: 1.5em;
  @media (min-width: 40em) {
    font-size: 1.875em;
  }
  @media (min-width: 64em) {
    font-size: 2.25em;
  }
}

.introduction-section__text {
  @media (min-width: 40em) {
    font-size: 1.25em;
  }
  @media (min-width: 64em) {
    font-size: 1.5em;
  }
}
</style>

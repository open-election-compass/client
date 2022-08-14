<template>
  <PageSection
    tag="header"
    class="start-section"
    data-section="start"
    full
    role="banner"
    :aria-roledescription="$t('views.home.start.section.banner-aria')"
  >
    <!-- wrapping div needed for IE11 -->
    <div class="start-section__logo">
      <OpenElectionCompassLogo width="1em" />
    </div>
    <h1 class="start-section__heading">
      {{ $t('title') }}
    </h1>
    <p class="start-section__subtitle">{{ $t('subtitle') }}</p>
  </PageSection>
</template>

<script>
import OpenElectionCompassLogo from '/src/components/elements/OpenElectionCompassLogo.vue';
import PageSection from '/src/components/elements/PageSection.vue';

export default {
  name: 'StartSection',
  components: {
    OpenElectionCompassLogo,
    PageSection,
  },
};
</script>

<style lang="scss">
.start-section {
  text-align: center;
}

.start-section__logo {
  display: inline-block;
  font-size: 4em;
  @media (min-width: 48em) {
    font-size: 6em;
  }
}

.start-section__heading {
  // `align-self` needed for IE11
  align-self: center;
  font-size: 1.5em;
  line-height: 1.25;
  text-align: center;
  max-width: 56em;
  margin: 2em auto 1em;
  @media (min-width: 38em) {
    font-size: 2em;
  }
  @media (min-width: 48em) {
    font-size: 3em;
  }
  @media (min-width: 64em) {
    font-size: 4em;
  }
}

.start-section__subtitle {
  // `align-self` needed for IE11
  align-self: center;
  font-size: 0.875em;
  text-align: center;
  color: #999;
  @media (min-width: 48em) {
    font-size: 1.125em;
  }
  @media (min-width: 64em) {
    font-size: 1.25em;
  }
}
</style>

<template>
  <aside class="analysis-banner">
    <h2 class="analysis-banner__heading">{{ $t('views.home.compare.analysis-banner.heading') }}</h2>
    <p class="analysis-banner__explanation">
      {{
        $t('views.home.compare.analysis-banner.explanation', {
          someone: $t('analysis.institution'),
        })
      }}
    </p>
    <BaseButton class="analysis-banner__send" theme="primary" size="small" @click="sendAnalysis">
      {{ $t('views.home.compare.analysis-banner.send') }}
    </BaseButton>
    <BaseButton class="analysis-banner__close" theme="positive" @click="close">
      {{ $t('views.home.compare.analysis-banner.close') }}
    </BaseButton>
  </aside>
</template>

<script>
export default {
  name: 'AnalysisBanner',
  methods: {
    sendAnalysis() {
      this.$store.dispatch('analysis/optIn');
      this.$store.dispatch('analysis/generateSignature');
      this.$store.dispatch('analysis/send');
    },
    close() {
      this.$store.dispatch('analysis/optOut');
    },
  },
};
</script>

<style lang="scss">
.analysis-banner {
  position: sticky;
  right: 0;
  bottom: 0;
  left: 0;
  margin-top: 105vh;
  background-color: var(--theme-neutral-background);
  color: var(--theme-neutral-text);
  border-radius: 2em 2em 0 0;
  box-shadow: 0 0 2em 0 rgba(50, 50, 50, 0.5);
  padding: 2em;
}

.analysis-banner__heading {
  font-size: 1.25em;
  margin-bottom: 1em;
}

.analysis-banner__explanation {
  font-size: 1em;
}

.analysis-banner__send {
  margin-top: 1.5em;
  width: 100%;
}

.analysis-banner__close {
  margin-top: 0.5em;
  width: 100%;
}

@media (min-width: 30em) {
  .analysis-banner {
    max-width: 28em;
    right: auto;
    bottom: 2em;
    left: auto;
    margin: 105vh auto 0 auto;
    border-radius: var(--border-radius);
    box-shadow: 0 0.5em 1em 0 rgba(50, 50, 50, 0.35);
  }
}

@media (min-width: 70em) {
  .analysis-banner {
    margin: 105vh 2em 0 auto;
  }
}
</style>

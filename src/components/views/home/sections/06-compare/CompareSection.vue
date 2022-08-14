<template>
  <div class="compare-section">
    <PageSection class="compare-section__introduction" data-section="compare">
      <h2 class="compare-section__heading">{{ $t('views.home.compare.section.heading') }}</h2>
      <p>{{ $t('views.home.compare.section.explanation') }}</p>
      <KioskModeHint v-if="kioskMode" />
    </PageSection>
    <PageSection
      v-for="thesis in theses"
      :key="thesis.index"
      class="compare-section__theses"
      role="region"
      :data-section="`compare-thesis-${thesis.index}`"
      :aria-label="$t('views.home.compare.section.region-aria', { count: thesis.index + 1, total })"
      :id="`compare-thesis-${thesis.index}`"
    >
      <StatementText
        :index="thesis.index"
        :status="getStatus(thesis.index)"
        :factor="thesis.factor"
        :badge="true"
      />
      <FriendsPositions :thesis="thesis" />
      <template v-for="result in results" :key="`${thesis.index}-${result.party.index}`">
        <FullAnswer :party="result.party" :thesis="thesis" />
      </template>
    </PageSection>
    <AdditionalAnalysis :active="$store.getters['analysis/optIn'] === true" />
    <AnalysisBanner v-if="$store.getters['analysis/enabled']" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AdditionalAnalysis from '/src/components/views/home/sections/06-compare/AdditionalAnalysis.vue';
import AnalysisBanner from '/src/components/views/home/sections/06-compare/AnalysisBanner.vue';
import FullAnswer from '/src/components/views/home/sections/06-compare/FullAnswer.vue';
import FriendsPositions from '/src/components/views/home/sections/06-compare/FriendsPositions.vue';
import KioskModeHint from '/src/components/views/home/sections/06-compare/KioskModeHint.vue';
import PageSection from '/src/components/elements/PageSection.vue';
import StatementText from '/src/components/views/home/sections/03-theses/StatementText.vue';

export default {
  name: 'CompareSection',
  components: {
    AdditionalAnalysis,
    AnalysisBanner,
    FullAnswer,
    FriendsPositions,
    KioskModeHint,
    PageSection,
    StatementText,
  },
  computed: {
    ...mapGetters({
      kioskMode: 'options/kioskMode',
      theses: 'theses/theses',
      total: 'theses/total',
      results: 'parties/results',
    }),
  },
  methods: {
    getStatus(index) {
      return this.$store.getters['theses/theses'][index].status;
    },
  },
};
</script>

<style lang="scss">
.compare-section__introduction {
  background-color: #fff;
  border-bottom: 2px solid var(--theme-neutral-background);
}

.compare-section__heading {
  color: var(--theme-primary-color);
}

.compare-section__theses + .compare-section__theses {
  border-top: 2px solid var(--theme-neutral-background);
}
</style>

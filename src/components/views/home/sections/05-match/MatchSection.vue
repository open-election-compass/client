<template>
  <PageSection class="match-section" full data-section="match">
    <h2 class="match-section__heading">
      {{ $t('views.home.match.section.heading') }}
    </h2>
    <p class="match-section__explanation">
      {{ $t('views.home.match.section.explanation') }}
    </p>
    <ul role="list">
      <li
        v-for="({ party, percentage }) in results"
        :key="party.alias"
        role="listitem"
      >
        <Match
          :party="party"
          :percentage="percentage"
        />
      </li>
    </ul>
  </PageSection>
</template>

<script>
import { mapGetters } from 'vuex';
import Match from '@/components/views/home/sections/05-match/Match.vue';
import PageSection from '@/components/elements/PageSection.vue';

export default {
  name: 'MatchSection',
  components: {
    Match,
    PageSection,
  },
  computed: {
    ...mapGetters({
      selectedParties: 'parties/selectedParties',
      theses: 'theses/theses',
      results: 'parties/results',
    }),
  },
};
</script>

<style lang="scss">
.match-section {
  background-color: var(--theme-primary-color);
}

.match-section__heading {
  color: #fff;
}

.match-section__explanation {
  margin-bottom: 2.5em;
}
</style>

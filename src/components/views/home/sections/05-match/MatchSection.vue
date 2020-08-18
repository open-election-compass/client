<template>
  <PageSection class="match-section" full data-section="match">
    <h2 class="match-section__heading">
      {{ $t('heading') }}
    </h2>
    <p class="match-section__explanation">
      {{ $t('explanation') }}
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

<!-- eslint-disable max-len -->
<i18n>
{
  "en": {
    "heading": "Your result",
    "explanation": "This chart describes how much you and the respective parties agreed on the above theses. The higher the percentage, the more your positions match. Keep in mind, that this is no voting recommendation, but a tool for orientation and discussion."
  },
  "de": {
    "heading": "Dein Ergebnis",
    "explanation": "Dieses Diagramm zeigt an, wie sehr du und die jeweiligen Parteien bzgl. der obigen Thesen übereinstimmt. Je höher die Prozentzahl, desto ähnlicher sind eure Positionen. Denke daran, dass dies keine Wahl-Empfehlung ist, sondern nur ein Werkzeug der Orientierung und Diskussion."
  }
}
</i18n>
<!-- eslint-enable max-len -->

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

<template>
  <page-section class="bg-primary" full data-section="match">
    <h2 class="text-white">
      {{ $t('heading') }}
    </h2>
    <p class="mb-10">
      {{ $t('explanation') }}
    </p>
    <ul role="list">
      <li
        v-for="({ party, percentage }) in results"
        :key="party.alias"
        role="listitem"
      >
        <match
          :party="party"
          :percentage="percentage"
        />
      </li>
    </ul>
  </page-section>
</template>

<script>
import Match from './Match.vue';

export default {
  name: 'MatchSection',
  computed: {
    selectedParties() {
      return this.$store.getters['parties/selectedParties'];
    },
    theses() {
      return this.$store.getters['theses/theses'];
    },
    results() {
      return this.$store.getters['parties/results'];
    },
  },
  components: {
    Match,
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

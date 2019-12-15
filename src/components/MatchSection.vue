<template>
  <page-section class="bg-primary">
    <h2 class="text-white">
      {{ $t('heading') }}
    </h2>
    <p class="mb-10">
      {{ $t('explanation') }}
    </p>
    <ul>
      <li
        v-for="({ party, percentage }) in results"
        :key="party.alias"
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
import Match from '@/components/Match.vue';

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
      // Maximum possible points
      const maxPoints = this.$store.getters['theses/maxPoints'];

      // Calculate points
      const matches = this.selectedParties.map((party) => {
        let points = 0;
        this.theses.forEach((thesis) => {
          if (thesis.status !== 'skipped' && thesis.positions[party.alias] === thesis.status) {
            points += 1;
          }
        });
        const percentage = 1 / maxPoints * points;
        return { party, points, percentage };
      });

      // Sort by points
      matches.sort((a, b) => b.points - a.points);

      return matches;
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

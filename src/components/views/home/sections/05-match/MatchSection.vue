<template>
  <page-section class="bg-primary" full data-guide-section="match">
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
      // Calculate points for every party
      const matches = this.calculate(this.selectedParties, this.theses);

      // Sort by points
      return matches.sort((a, b) => b.points - a.points);
    },
  },
  methods: {
    calculate(selectedParties, theses) {
      const maxPoints = this.calculateMaxPoints(theses);
      return selectedParties.map((party) => {
        const points = this.calculatePointsForParty(party, theses);
        const percentage = 1 / maxPoints * points;
        return { party, points, percentage };
      });
    },
    calculateMaxPoints(theses) {
      return theses.reduce((points, thesis) => {
        if (thesis.status === 'skip' || thesis.status === null) {
          return points;
        }
        return points + 2 * thesis.factor;
      }, 0);
    },
    calculatePointsForParty(party, theses) {
      return theses.reduce((points, thesis) => {
        const userPosition = thesis.status;
        const partyPosition = thesis.positions[party.alias];

        // Skipped thesis?
        if (userPosition === 'skip' || userPosition === null) {
          return points;
        }

        // Exact match?
        if (userPosition === partyPosition) {
          return points + 2 * thesis.factor;
        }

        // Near match?
        if (
          (userPosition === 'neutral' && ['approve', 'reject'].includes(partyPosition))
          || (partyPosition === 'neutral' && ['approve', 'reject'].includes(userPosition))
        ) {
          return points + 1 * thesis.factor;
        }

        return points;
      }, 0);
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

<template>
  <div
    class="
      container max-w-2xl mx-auto p-8 bg-primary
      sm:py-16 sm:max-w-3xl
      lg:py-24 lg:max-w-4xl
    "
  >
    <h2 class="
      text-2xl leading-tight font-bold mb-10 text-white
      sm:text-3xl
      lg:text-4xl
    ">
      {{ $t('heading') }}
    </h2>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'MatchSection',
  computed: {
    results() {
      const parties = this.$store.getters['parties/parties'];
      const theses = this.$store.getters['theses/theses'];
      const matches = parties.map((party) => {
        let points = 0;
        theses.forEach((thesis, index) => {
          console.log(thesis.positions[party.alias]);
          if (thesis.status !== 'skipped' && thesis.positions[party.alias] === thesis.status) {
            points += 1;
          }
        });
        return points;
      });
      return matches;
    },
  },
};
</script>

<i18n>
{
  "en": {
    "heading": "Your result"
  },
  "de": {
    "heading": "Dein Ergebnis"
  }
}
</i18n>

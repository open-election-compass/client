<template>
  <div>
    <page-section class="bg-white" data-section="compare">
      <h2 class="text-primary">{{ $t('heading') }}</h2>
      <p>
        {{ $t('explanation') }}
      </p>
    </page-section>
    <page-section
      v-for="(thesis) in theses"
      :key="thesis.index"
      class="border-t-2 border-gray-300"
      role="region"
      :data-section="`compare-thesis-${thesis.index}`"
      :aria-label="$t('region-aria', { count: thesis.index + 1, total })"
      :id="`compare-thesis-${thesis.index}`"
    >
      <statement
        :index="thesis.index"
        :status="getStatus(thesis.index)"
        :factor="thesis.factor"
        :badge="true"
      />
      <template
        v-for="party in selectedParties"
      >
        <answer
          :key="`${thesis.index}-${party.index}`"
          :party="party"
          :thesis="thesis"
        />
      </template>
    </page-section>
  </div>
</template>

<script>
import Answer from './Answer.vue';
import Statement from '../03-theses/Statement.vue';

export default {
  name: 'CompareSection',
  computed: {
    theses() {
      return this.$store.getters['theses/theses'];
    },
    total() {
      return this.$store.getters['theses/total'];
    },
    selectedParties() {
      return this.$store.getters['parties/selectedParties'];
    },
  },
  methods: {
    getStatus(index) {
      return this.$store.getters['theses/theses'][index].status;
    },
  },
  components: {
    Answer,
    Statement,
  },
};
</script>

<!-- eslint-disable max-len -->
<i18n>
{
  "en": {
    "heading": "Their answers",
    "explanation": "The parties typically provide statements for every thesis to explain their reasoning. It is not always obvious why a party asumes a certain position so it is recommended to read this statements or the respective election manifestos.",
    "region-aria": "Thesis {count} of {total}"
  },
  "de": {
    "heading": "Die Antworten",
    "explanation": "Die Parteien stellen üblicherweise eine Erklärung zu jeder Entscheidung bereit. Da es nicht immer offensichtlich ist, warum eine Partei eine bestimmte Position vertritt, empfiehlt es sich, diese Erklärungen oder die jeweiligen Wahlprogramme zu lesen.",
    "region-aria": "These {count} von {total}"
  }
}
</i18n>
<!-- eslint-enable max-len -->

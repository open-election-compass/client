<template>
  <div>
    <page-section class="bg-white">
      <h2 class="text-primary">{{ $t('heading') }}</h2>
      <p class="mb-10">
        {{ $t('explanation') }}
      </p>
    </page-section>
    <page-section
      v-for="(thesis) in theses"
      :key="thesis.index"
      class="border-t-2 border-gray-300"
    >
      <statement
        :statement="$t(`theses.${thesis.index}.statement`)"
        :status="getStatus(thesis.index)"
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
    "explanation": "The parties typically provide statements for every thesis to explain their reasoning. It is not always obvious why a party asumes a certain position so it is recommended to read this statements or the respective election manifestos."
  },
  "de": {
    "heading": "Die Antworten",
    "explanation": "Die Parteien stellen üblicherweise eine Erklärung zu jeder Entscheidung bereit. Da es nicht immer offensichtlich ist, warum eine Partei eine bestimmte Position vertritt, empfiehlt es sich, diese Erklärungen oder die jeweiligen Wahlprogramme zu lesen."
  }
}
</i18n>
<!-- eslint-enable max-len -->

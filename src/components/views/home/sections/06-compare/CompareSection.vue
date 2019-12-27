<template>
  <page-section class="bg-white">
    <h2 class="text-primary">{{ $t('heading') }}</h2>
    <ul>
      <li
        v-for="(thesis) in theses"
        :key="thesis.index"
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
      </li>
    </ul>
  </page-section>
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

<i18n>
{
  "en": {
    "heading": "Their answers"
  },
  "de": {
    "heading": "Die Antworten"
  }
}
</i18n>

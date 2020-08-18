<template>
  <div class="compare-section">
    <PageSection class="compare-section__introduction" data-section="compare">
      <h2 class="compare-section__heading">{{ $t('heading') }}</h2>
      <p>{{ $t('explanation') }}</p>
      <KioskModeHint v-if="kioskMode" />
    </PageSection>
    <PageSection
      v-for="(thesis) in theses"
      :key="thesis.index"
      class="compare-section__theses"
      role="region"
      :data-section="`compare-thesis-${thesis.index}`"
      :aria-label="$t('region-aria', { count: thesis.index + 1, total })"
      :id="`compare-thesis-${thesis.index}`"
    >
      <Statement
        :index="thesis.index"
        :status="getStatus(thesis.index)"
        :factor="thesis.factor"
        :badge="true"
      />
      <template
        v-for="result in results"
      >
        <Answer
          :key="`${thesis.index}-${result.party.index}`"
          :party="result.party"
          :thesis="thesis"
        />
      </template>
    </PageSection>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Answer from '@/components/views/home/sections/06-compare/Answer.vue';
import KioskModeHint from '@/components/views/home/sections/06-compare/KioskModeHint.vue';
import PageSection from '@/components/elements/PageSection.vue';
import Statement from '@/components/views/home/sections/03-theses/Statement.vue';

export default {
  name: 'CompareSection',
  components: {
    Answer,
    KioskModeHint,
    PageSection,
    Statement,
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

<template>
  <PageSection class="party-section" data-section="party" full role="form">
    <h2 class="party-section__heading">
      {{ $t('heading') }}
    </h2>
    <p class="party-section__introduction">
      {{ $t('instruction') }}
    </p>
    <ul
      :class="{
        'party-section__parties': true,
        'party-section__parties--logos': showLogos,
      }"
      role="list"
    >
      <li
        v-for="(party, index) in parties"
        :key="index"
        :class="{
          'party-section__party': true,
          'party-section__party--logos': showLogos,
        }"
      >
        <party :index="index" :show-logo="showLogos" :logo="party.logo" />
      </li>
    </ul>
    <div class="party-section__actions">
      <BaseButton
        theme="positive"
        left="check"
        size="large"
        :disabled="selectedParties.length < 2 || chosen"
        @click="$store.dispatch('parties/chose')"
      >
        {{ $t('proceed') }}
      </BaseButton>
    </div>
  </PageSection>
</template>

<script>
import BaseButton from '@/components/elements/BaseButton.vue';
import PageSection from '@/components/elements/PageSection.vue';
import Party from '@/components/views/home/sections/04-party/Party.vue';

export default {
  name: 'PartySection',
  components: {
    BaseButton,
    PageSection,
    Party,
  },
  computed: {
    parties() {
      return this.$store.getters['parties/parties'];
    },
    selectedParties() {
      return this.$store.getters['parties/selectedParties'];
    },
    chosen() {
      return this.$store.getters['parties/chosen'];
    },
    showLogos() {
      return this.parties.some((party) => party.logo !== null);
    },
  },
};
</script>

<!-- eslint-disable max-len -->
<i18n>
{
  "en": {
    "heading": "Choose the parties you want to compare",
    "instruction": "Please select the parties you want to compare your own decisions to. You can select as many parties as you like, but you have to select at least two. The following list is presented in the same order as the parties will appear on the ballot.",
    "proceed": "Done"
  },
  "de": {
    "heading": "Wähle die zu vergleichenden Parteien",
    "instruction": "Bitte wähle die Parteien aus, mit denen du deine eigenen Entscheidungen vergleichen möchtest. Du kannst beliebig viele Parteien auswählen, jedoch mindestens zwei. Die Reihenfolge der Liste orientiert sich an der Reihenfolge der Parteien auf dem Wahlzettel.",
    "proceed": "Fertig"
  }
}
</i18n>
<!-- eslint-enable max-len -->

<style lang="scss">
.party-section {
  border-top: 2px solid var(--theme-neutral-background);
}

.party-section__heading {
  color: var(--theme-primary-color);
}

.party-section__introduction {
  margin-bottom: 2.5em;
}

.party-section__parties {
  margin-bottom: 3em;
  &.party-section__parties--logos {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: stretch;
    margin-right: -0.5em;
    margin-left: -0.5em;
    .party-section__party {
      width: 100%;
      padding: 0 0.5em;
      flex: none;
      @media (min-width: 48em) {
        width: 33.333%;
        padding-top: 0.5em;
        padding-bottom: 0.5em;
      }
    }
  }
}

.party-section__actions {
  text-align: center;
}
</style>

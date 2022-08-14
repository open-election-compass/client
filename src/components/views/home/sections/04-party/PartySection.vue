<template>
  <PageSection class="party-section" data-section="party" full role="form">
    <h2 class="party-section__heading">
      {{ $t('views.home.party.section.heading') }}
    </h2>
    <p class="party-section__introduction">
      {{ $t('views.home.party.section.instruction') }}
    </p>
    <ul
      :class="{
        'party-section__parties': true,
        'party-section__parties--logos': showLogos,
      }"
    >
      <li
        v-for="(party, index) in parties"
        :key="index"
        :class="{
          'party-section__party': true,
          'party-section__party--logos': showLogos,
        }"
      >
        <PartyItem :index="index" :show-logo="showLogos" :logo="party.logo" />
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
        {{ $t('views.home.party.section.proceed') }}
      </BaseButton>
    </div>
  </PageSection>
</template>

<script>
import PageSection from '/src/components/elements/PageSection.vue';
import PartyItem from '/src/components/views/home/sections/04-party/PartyItem.vue';

export default {
  name: 'PartySection',
  components: {
    PageSection,
    PartyItem,
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

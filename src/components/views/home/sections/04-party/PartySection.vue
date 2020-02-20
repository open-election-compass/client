<template>
  <page-section data-guide-section="party" full>
    <h2 class="text-primary">
      {{ $t('heading') }}
    </h2>
    <p class="mb-10">
      {{ $t('instruction') }}
    </p>
    <ul
      class="mb-10"
      :class="showLogos ? 'flex flex-wrap justify-start items-stretch -mx-2' : ''"
    >
      <li
        v-for="(party, index) in parties"
        :key="index"
        :class="showLogos ? 'w-full md:w-1/3 lg:w-1/4 flex-none px-2 md:py-2' : ''"
      >
        <party-with-logo v-if="showLogos" :index="index" :logo="party.logo" />
        <party v-else :index="index" />
      </li>
    </ul>
    <div class="text-center">
      <button
        class="
          button button-positive mb-4
          transition shadow-md hover:shadow-lg duration-200
        "
        @click="$store.dispatch('parties/chose')"
        :disabled="selectedParties.length < 2"
        v-if="!chosen"
      >
        <icon name="check" :monospace="false" />
        <span>{{ $t('proceed') }}</span>
      </button>
    </div>
  </page-section>
</template>

<script>
import Party from './Party.vue';
import PartyWithLogo from './PartyWithLogo.vue';

export default {
  name: 'PartySection',
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
      return this.parties.some(party => party.logo !== undefined);
    },
  },
  components: {
    Party,
    PartyWithLogo,
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

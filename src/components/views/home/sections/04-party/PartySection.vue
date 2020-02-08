<template>
  <page-section data-guide-section="party" full>
    <h2 class="text-primary">
      {{ $t('heading') }}
    </h2>
    <p class="mb-10">
      {{ $t('instruction') }}
    </p>
    <ul class="mb-10">
      <li
        v-for="(party, index) in parties"
        :key="index"
      >
        <party :index="index" />
      </li>
    </ul>
    <div class="text-center">
      <button
        class="button button-positive mb-4"
        @click="$store.dispatch('parties/chose')"
      >
        <icon name="check" :monospace="false" />
        <span>{{ $t('proceed') }}</span>
      </button>
    </div>
  </page-section>
</template>

<script>
import Party from './Party.vue';

export default {
  name: 'PartySection',
  computed: {
    parties() {
      return this.$store.getters['parties/parties'];
    },
  },
  components: {
    Party,
  },
};
</script>

<!-- eslint-disable max-len -->
<i18n>
{
  "en": {
    "heading": "Choose the parties you want to compare",
    "instruction": "Please select the parties you want to compare your own decisions to. You can select as many parties as you like. The following list is presented in random order for every visit.",
    "proceed": "Done"
  },
  "de": {
    "heading": "Wähle die zu vergleichenden Parteien",
    "instruction": "Bitte wähle die Parteien aus, mit denen du deine eigenen Entscheidungen vergleichen möchtest. Du kannst beliebig viele Parteien auswählen. Die Reihenfolge der Liste wird bei jedem Seitenaufruf zufällig bestimmt.",
    "proceed": "Fertig"
  }
}
</i18n>
<!-- eslint-enable max-len -->

<template>
  <page-section>
    <h2 class="text-primary">
      {{ $t('heading') }}
    </h2>
    <p class="mb-10">
      {{ $t('instruction') }}
    </p>
    <ul>
      <li
        v-for="(party, index) in parties"
        :key="index"
      >
        <party :index="index" />
      </li>
    </ul>
    <div class="text-center">
      <button
        class="
          bg-primary text-color-white px-4 py-2 rounded inline-block self-center
          md:text-lg md:px-6 md:py-3
          lg:text-2xl lg:px-8 lg:py-4
          focus:outline-none
        "
        @click="$store.dispatch('parties/chose')"
      >
        <span class="mr-4 md:mr-6 lg:mr-8">{{ $t('proceed') }}</span>
        <icon name="chevron-right" :monospace="false" />
      </button>
    </div>
  </page-section>
</template>

<script>
import Party from '@/components/Party.vue';

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
    "proceed": "Done!"
  },
  "de": {
    "heading": "Wähle die zu vergleichenden Parteien",
    "instruction": "Bitte wähle die Parteien aus, mit denen du deine eigenen Entscheidungen vergleichen möchtest. Du kannst beliebig viele Parteien auswählen. Die Reihenfolge der Liste wird bei jedem Seitenaufruf zufällig bestimmt.",
    "proceed": "Fertig!"
  }
}
</i18n>
<!-- eslint-enable max-len -->

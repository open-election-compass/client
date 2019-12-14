<template>
  <div
    class="
      container max-w-2xl mx-auto p-8
      sm:py-16 sm:max-w-3xl
      lg:py-24 lg:max-w-4xl
    "
  >
    <h2 class="
      text-2xl leading-tight font-bold mb-10 text-primary
      sm:text-3xl
      lg:text-4xl
    ">
      {{ $t('heading') }}
    </h2>
    <p class="mb-10 sm:text-xl lg:text-2xl">
      {{ $t('instruction') }}
    </p>
    <ul>
      <li
        v-for="(party, index) in parties"
        :key="index"
      >
        <input
          type="checkbox"
          v-model="parties[index].selected"
          :id="`party-${index}-checkbox`"
          class="hidden"
        />
        <label
          :for="`party-${index}-checkbox`"
          class="p-4 rounded block mb-4 flex items-center justify-start"
          :class="parties[index].selected ? 'bg-primary' : 'bg-gray-200'"
        >
          <icon
            :name="parties[index].selected ? 'check' : 'circle'"
            class="text-white mr-4 flex-initial"
          />
          <span class="flex-initial font-bold mr-8">{{ party.short }}</span>
          <span class="flex-auto text-right">{{ party.name }}</span>
        </label>
        <p class="m-8 text-gray-600">{{ party.description }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'PartySection',
  computed: {
    parties() {
      return this.$t('parties');
    },
  },
};
</script>

<!-- eslint-disable max-len -->
<i18n>
{
  "en": {
    "heading": "Choose the parties you want to compare",
    "instruction": "Please select the parties you want to compare your own decisions to. You can select as many parties as you like. The following list is presented in random order for every visit."
  },
  "de": {
    "heading": "Wähle die zu vergleichenden Parteien",
    "instruction": "Bitte wähle die Parteien aus, mit denen du deine eigenen Entscheidungen vergleichen möchtest. Du kannst beliebig viele Parteien auswählen. Die Reihenfolge der Liste wird bei jedem Seitenaufruf zufällig bestimmt."
  }
}
</i18n>
<!-- eslint-enable max-len -->

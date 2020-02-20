<template>
  <div>
    <label
      :for="`party-${index}-checkbox`"
      class="
        p-4 block mb-4 flex items-center justify-start rounded border cursor-pointer focusable-child
        transition shadow-md hover:shadow-lg duration-200
      "
      :class="selected ? 'bg-primary border-yellow-600' : 'bg-gray-200 border-gray-300'"
      :aria-label="$t('party-aria', { party: $t(`parties.${index}.name`) })"
      role="listitem"
    >
      <input
        type="checkbox"
        v-model="selected"
        :id="`party-${index}-checkbox`"
        class="sr-only"
        :aria-label="$t('checkbox-aria')"
      />
      <icon
        :name="selected ? 'check' : 'circle'"
        class="text-white mr-4 flex-initial"
      />
      <span class="flex-initial font-bold mr-8">{{ $t(`parties.${index}.short`) }}</span>
      <span class="flex-auto text-right">{{ $t(`parties.${index}.name`) }}</span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'Party',
  props: {
    index: {
      type: Number,
      required: true,
    },
  },
  computed: {
    selected: {
      get() {
        return this.$store.getters['parties/parties'][this.index].selected;
      },
      set(value) {
        this.$store.commit('parties/setSelected', { index: this.index, value });
      },
    },
  },
};
</script>

<i18n>
{
  "en": {
    "party-aria": "Party {party}",
    "checkbox-aria": "Click here to select or deselect this party for comparison."
  },
  "de": {
    "party-aria": "Partei {party}",
    "checkbox-aria": "Klicke hier um diese Partei zum Vergleich aus- bzw. abzuwählen."
  }
}
</i18n>

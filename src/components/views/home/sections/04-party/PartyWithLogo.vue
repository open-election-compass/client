<template>
  <div class="h-full">
    <label
      :for="`party-${index}-checkbox`"
      class="
        p-4 block mb-4 rounded border cursor-pointer flex items-stretch focusable-child
        transition shadow-md hover:shadow-lg duration-200
        md:flex-col md:h-full"
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
      <div v-if="logo" class="flex-none order-2 md:flex-1 md:order-1" aria-hidden="true">
        <img :src="logo" :alt="$t(`parties.${index}.name`)" class="w-16 h-16 md:w-full md:h-full" />
      </div>
      <div
        class="flex-auto flex items-center order-1 md:items-start md:order-2 md:mt-4"
        aria-hidden="true"
      >
        <div class="flex-none mr-3 md:mr-2">
          <icon
            :name="selected ? 'check' : 'circle'"
            class="text-white"
          />
        </div>
        <div class="flex-auto mr-3 md:mr-0" aria-hidden="true">
          <span class="font-bold block">{{ $t(`parties.${index}.short`) }}</span>
          <span class="block">{{ $t(`parties.${index}.name`) }}</span>
        </div>
      </div>
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
    logo: {
      type: String,
      default: null,
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

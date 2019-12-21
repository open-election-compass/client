<template>
  <div>
    <input
      type="checkbox"
      v-model="selected"
      :id="`party-${index}-checkbox`"
      class="hidden"
    />
    <label
      :for="`party-${index}-checkbox`"
      class="p-4 rounded block mb-4 flex items-center justify-start"
      :class="selected ? 'bg-primary' : 'bg-gray-200'"
    >
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

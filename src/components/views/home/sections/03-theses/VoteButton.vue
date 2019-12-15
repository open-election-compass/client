<template>
  <button
    @click="$emit('click', $event)"
    class="
      w-full text-left p-4 font-bold text-sm
      sm:text-base
      md:text-center md:mx-2 md:rounded
      lg:text-lg
      focus:outline-none
    "
    :class="classes"
  >
    <icon v-if="type === 'approve'" name="check" />
    <icon v-else-if="type === 'neutral'" name="minus" />
    <icon v-else-if="type === 'reject'" name="times" />
    <span class="
      ml-4
      md:block md:mt-2 md:ml-0
    ">
      {{ $t(type) }}
    </span>
  </button>
</template>

<script>
export default {
  name: 'VoteButton',
  props: {
    type: {
      type: String,
      required: true,
      validate(value) {
        return ['approve', 'neutral', 'reject'].includes(value);
      },
    },
    active: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    classes() {
      return {
        'bg-green-400 text-white': this.type === 'approve' && this.active,
        'bg-gray-100 text-green-600': this.type === 'approve' && !this.active,
        'bg-gray-500 text-white': this.type === 'neutral' && this.active,
        'bg-gray-100 text-gray-600': this.type === 'neutral' && !this.active,
        'bg-red-400 text-white': this.type === 'reject' && this.active,
        'bg-gray-100 text-red-600': this.type === 'reject' && !this.active,
      };
    },
  },
};
</script>

<i18n>
{
  "en": {
    "approve": "Approve",
    "neutral": "Neutral",
    "reject": "Reject"
  },
  "de": {
    "approve": "Zustimmung",
    "neutral": "Neutral",
    "reject": "Ablehnung"
  }
}
</i18n>

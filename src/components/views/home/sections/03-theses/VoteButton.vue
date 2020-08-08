<template>
  <button
    @click="$emit('click', $event)"
    class="
      w-full text-left p-4 font-bold text-sm my-1
      rounded border border-solid
      transition shadow-md hover:shadow-lg duration-200
      sm:text-base
      md:text-center md:mx-2 md:my-0 md:text-lg
      lg:text-xl
    "
    :class="classes"
    :aria-label="$t(`${type}-aria`)"
    role="checkbox"
    :aria-checked="active"
  >
    <icon v-if="type === 'approve'" name="check" />
    <icon v-else-if="['neutral', 'partly'].includes(type)" name="minus" />
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
      validator(value) {
        return ['approve', 'neutral', 'partly', 'reject'].includes(value);
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
        'bg-green-400 text-white border-green-600': this.type === 'approve' && this.active,
        'bg-gray-100 text-green-600 border-gray-300': this.type === 'approve' && !this.active,
        'bg-gray-500 text-white border-gray-600': this.type === 'neutral' && this.active,
        'bg-gray-100 text-gray-600 border-gray-300': this.type === 'neutral' && !this.active,
        'bg-yellow-500 text-white border-yellow-600': this.type === 'partly' && this.active,
        'bg-gray-100 text-yellow-600 border-gray-300': this.type === 'partly' && !this.active,
        'bg-red-400 text-white border-red-600': this.type === 'reject' && this.active,
        'bg-gray-100 text-red-600 border-gray-300': this.type === 'reject' && !this.active,
      };
    },
  },
};
</script>

<i18n>
{
  "en": {
    "approve": "Approve",
    "approve-aria": "Approve – click here to approve this thesis!",
    "neutral": "Neutral",
    "neutral-aria": "Neutral – click here to remain neutral regarding this thesis!",
    "partly": "Partly",
    "partly-aria": "Partly – click here to agree partly with this thesis!",
    "reject": "Reject",
    "reject-aria": "Reject – click here to reject this thesis!"
  },
  "de": {
    "approve": "Zustimmung",
    "approve-aria": "Zustimmung – klicke hier, um dieser These zuzustimmen!",
    "neutral": "Neutral",
    "neutral-aria": "Neutral – klicke hier, um bei dieser These neutral zu bleiben!",
    "partly": "Teilweise",
    "partly-aria": "Teilweise – klicke hier, um dieser These teilweise zuzustimmen!",
    "reject": "Ablehnung",
    "reject-aria": "Ablehnung – klicke hier, um diese These abzulehnen!"
  }
}
</i18n>

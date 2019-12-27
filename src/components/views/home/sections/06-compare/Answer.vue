<template>
  <div class="
    mt-12
    lg:mt-32
  ">
    <component
      :is="component"
      :party="party"
      :thesis="thesis"
    />
  </div>
</template>

<script>
import AnswerApprove from './AnswerApprove.vue';
import AnswerNeutral from './AnswerNeutral.vue';
import AnswerReject from './AnswerReject.vue';

export default {
  name: 'Answer',
  props: {
    party: {
      type: Object,
      required: true,
    },
    thesis: {
      type: Object,
      required: true,
    },
  },
  computed: {
    position() {
      return this.thesis.positions[this.party.alias];
    },
    component() {
      switch (this.position) {
        case 'approve':
          return AnswerApprove;
        case 'reject':
          return AnswerReject;
        default:
          return AnswerNeutral;
      }
    },
  },
};
</script>

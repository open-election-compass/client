<template>
  <font-awesome-icon
    :icon="['fas', name]"
    :class="classes"
    :fixed-width="monospace"
    :spin="spinning" />
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCheck, faMinus, faTimes } from '@fortawesome/free-solid-svg-icons';

library.add(faCheck, faMinus, faTimes);

export default {

  name: 'Icon',

  props: {
    name: {
      type: String,
      required: true,
    },
    monospace: {
      type: Boolean,
      default: true,
    },
    spinning: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    classes() {
      return {
        'c-icon': true,
      };
    },
  },

  components: {
    FontAwesomeIcon,
  },
};
</script>

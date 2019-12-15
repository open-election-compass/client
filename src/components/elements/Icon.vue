<template>
  <font-awesome-icon
    :icon="['fas', name]"
    class="icon"
    :fixed-width="monospace"
    :spin="spinning" />
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faChevronRight,
  faCheck,
  faCircle,
  faMinus,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faChevronRight,
  faCheck,
  faCircle,
  faMinus,
  faTimes,
);

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

  components: {
    FontAwesomeIcon,
  },
};
</script>

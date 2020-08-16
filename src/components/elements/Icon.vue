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
  faAngleDown,
  faAngleLeft,
  faAngleRight,
  faAngleUp,
  faArrowRight,
  faBars,
  faCheck,
  faCircle,
  faExclamationCircle,
  faFrown,
  faGrin,
  faLanguage,
  faMeh,
  faMehBlank,
  faMinus,
  faQuestion,
  faSlash,
  faSmile,
  faTimes,
  faUndo,
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faAngleDown,
  faAngleLeft,
  faAngleRight,
  faAngleUp,
  faArrowRight,
  faBars,
  faCheck,
  faCircle,
  faExclamationCircle,
  faFrown,
  faGrin,
  faLanguage,
  faMeh,
  faMehBlank,
  faMinus,
  faQuestion,
  faSlash,
  faSmile,
  faTimes,
  faUndo,
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

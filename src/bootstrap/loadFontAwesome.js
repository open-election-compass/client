import Vue from 'vue';
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
  faChartBar,
  faExclamationCircle,
  faExternalLinkAlt,
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

export default function loadFontAwesome() {
  Vue.component('FontAwesomeIcon', FontAwesomeIcon);
  library.add(
    faAngleDown,
    faAngleLeft,
    faAngleRight,
    faAngleUp,
    faArrowRight,
    faBars,
    faCheck,
    faCircle,
    faChartBar,
    faExclamationCircle,
    faExternalLinkAlt,
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
}

import Vue from 'vue';
import '@open-election-compass/ui/dist/open-election-compass-ui.css';
import {
  AccordionList,
  AsyncButton,
  BaseButton,
  FieldInput,
  FieldSelect,
  FieldSwitch,
  Icon,
  Modal,
} from '@open-election-compass/ui';

export default function loadOpenElectionCompassUI() {
  Vue.component('AccordionList', AccordionList);
  Vue.component('AsyncButton', AsyncButton);
  Vue.component('BaseButton', BaseButton);
  Vue.component('FieldInput', FieldInput);
  Vue.component('FieldSelect', FieldSelect);
  Vue.component('FieldSwitch', FieldSwitch);
  Vue.component('Icon', Icon); // eslint-disable-line vue/multi-word-component-names
  Vue.component('Modal', Modal); // eslint-disable-line vue/multi-word-component-names
}

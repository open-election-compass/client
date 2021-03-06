import Vue from 'vue';
import '@open-election-compass/ui/dist/open-election-compass-ui.css';
import {
  BaseButton,
  FieldInput,
  FieldSelect,
  FieldSwitch,
  Icon,
  Modal,
} from '@open-election-compass/ui';

export default function loadOpenElectionCompassUI() {
  Vue.component('BaseButton', BaseButton);
  Vue.component('FieldInput', FieldInput);
  Vue.component('FieldSelect', FieldSelect);
  Vue.component('FieldSwitch', FieldSwitch);
  Vue.component('Icon', Icon);
  Vue.component('Modal', Modal);
}

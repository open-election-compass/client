import type { App } from 'vue';
import '@open-election-compass/ui/style.css';
import {
  AccordionList,
  AsyncButton,
  BaseButton,
  FieldInput,
  FieldSelect,
  FieldSwitch,
  IconDisplay,
  ModalView,
} from '@open-election-compass/ui';

export default function loadOpenElectionCompassUI(app: App) {
  app.component('AccordionList', AccordionList);
  app.component('AsyncButton', AsyncButton);
  app.component('BaseButton', BaseButton);
  app.component('FieldInput', FieldInput);
  app.component('FieldSelect', FieldSelect);
  app.component('FieldSwitch', FieldSwitch);
  app.component('IconDisplay', IconDisplay);
  app.component('ModalView', ModalView);
}

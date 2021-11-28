import Vue from 'vue';
import VueTippy, { TippyComponent } from 'vue-tippy';

export default function loadVueTippy() {
  Vue.use(VueTippy, {
    directive: 'tooltip',
    arrow: true,
    arrowType: 'round',
    distance: 25,
  });
  Vue.component('TippyTooltip', TippyComponent);
}

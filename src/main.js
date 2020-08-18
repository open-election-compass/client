import Vue from 'vue';
import Vuex from 'vuex';
import VScrollLock from 'v-scroll-lock';
import smoothscroll from 'smoothscroll-polyfill';
import VueTippy, { TippyComponent } from 'vue-tippy';
import OpenElectionCompass from './OpenElectionCompass.vue';
import i18n from './locales/i18n';
import store from './store/index';

Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(VScrollLock);

smoothscroll.polyfill();

Vue.use(VueTippy, {
  directive: 'tooltip',
  arrow: true,
  arrowType: 'round',
  distance: 25,
});
Vue.component('tooltip', TippyComponent);

Vue.component('open-election-compass', OpenElectionCompass);

new Vue({
  store,
  i18n,
  el: '#open-election-compass',
}).$mount();

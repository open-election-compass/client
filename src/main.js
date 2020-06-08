import Vue from 'vue';
import Vuex from 'vuex';
import VScrollLock from 'v-scroll-lock';
import smoothscroll from 'smoothscroll-polyfill';
import Icon from '@/components/elements/Icon.vue';
import OpenElectionCompassLogo from '@/components/elements/OpenElectionCompassLogo.vue';
import PageSection from '@/components/elements/PageSection.vue';
import ShowMore from '@/components/elements/ShowMore.vue';
import OpenElectionCompass from './OpenElectionCompass.vue';
import i18n from './locales/i18n';
import store from './store/index';

Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(VScrollLock);

smoothscroll.polyfill();

Vue.component('open-election-compass', OpenElectionCompass);
Vue.component('icon', Icon);
Vue.component('open-election-compass-logo', OpenElectionCompassLogo);
Vue.component('page-section', PageSection);
Vue.component('show-more', ShowMore);

new Vue({
  store,
  i18n,
  el: '#open-election-compass',
}).$mount();

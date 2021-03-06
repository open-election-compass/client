import Vue from 'vue';
import Vuex from 'vuex';
import 'ie11-custom-properties';
import loadFontAwesome from './bootstrap/loadFontAwesome';
import loadOpenElectionCompassUI from './bootstrap/loadOpenElectionCompassUI';
import loadScrollEnhancements from './bootstrap/loadScrollEnhancements';
import loadVeeValidate from './bootstrap/loadVeeValidate';
import loadVueTippy from './bootstrap/loadVueTippy';
import OpenElectionCompass from './OpenElectionCompass.vue';
import i18n from './locales/i18n';
import store from './store/index';

loadFontAwesome();
loadOpenElectionCompassUI();
loadScrollEnhancements();
loadVeeValidate();
loadVueTippy();

Vue.config.productionTip = false;

Vue.use(Vuex);

Vue.component('open-election-compass', OpenElectionCompass);

new Vue({
  store,
  i18n,
  el: '#open-election-compass',
}).$mount();

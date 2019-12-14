import Vue from 'vue';
import Vuex from 'vuex';
import VueI18n from 'vue-i18n';
import OpenElectionCompass from './OpenElectionCompass.vue';
import Icon from '@/components/Icon.vue';
import router from './router/index';
import store from './store/index';

Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'en',
});

Vue.component('open-election-compass', OpenElectionCompass);
Vue.component('icon', Icon);

new Vue({
  router,
  store,
  i18n,
  el: '#open-election-compass',
}).$mount();

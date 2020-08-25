import Vue from 'vue';
import VScrollLock from 'v-scroll-lock';
import smoothscroll from 'smoothscroll-polyfill';
import VueTippy, { TippyComponent } from 'vue-tippy';
import OpenElectionCompass from './OpenElectionCompass.vue';
import storeModuleAlgorithm from './store/modules/algorithm/algorithm';
import storeModuleFooterLinks from './store/modules/footerLinks/footerLinks';
import storeModuleLanguages from './store/modules/languages/languages';
import storeModuleOptions from './store/modules/options/options';
import storeModuleParties from './store/modules/parties/parties';
import storeModuleSections from './store/modules/sections/sections';
import storeModuleTheses from './store/modules/theses/theses';
import de from './locales/de.json';
import en from './locales/en.json';

export default function installOpenElectionCompassNuxtPlugin({ app, store }) {
  // Install locales
  app.i18n.mergeLocaleMessage('de', de);
  app.i18n.mergeLocaleMessage('en', en);

  // Install store modules
  store.registerModule('algorithm', storeModuleAlgorithm);
  store.registerModule('footerLinks', storeModuleFooterLinks);
  store.registerModule('languages', storeModuleLanguages);
  store.registerModule('options', storeModuleOptions);
  store.registerModule('parties', storeModuleParties);
  store.registerModule('sections', storeModuleSections);
  store.registerModule('theses', storeModuleTheses);

  // Install dependencies
  if (typeof document !== 'undefined' && typeof window !== 'undefined') {
    Vue.use(VScrollLock);
    smoothscroll.polyfill();
  }
  Vue.use(VueTippy, {
    directive: 'tooltip',
    arrow: true,
    arrowType: 'round',
    distance: 25,
  });
  Vue.component('tooltip', TippyComponent);

  // Install component
  Vue.component('OpenElectionCompass', OpenElectionCompass);
}

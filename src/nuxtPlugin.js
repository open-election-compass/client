import Vue from 'vue';
import VScrollLock from 'v-scroll-lock';
import smoothscroll from 'smoothscroll-polyfill';
import VueTippy, { TippyComponent } from 'vue-tippy';
import { localize } from 'vee-validate';
import veeValidateAr from 'vee-validate/dist/locale/ar.json';
import veeValidateDe from 'vee-validate/dist/locale/de.json';
import veeValidateEn from 'vee-validate/dist/locale/en.json';
import veeValidateEs from 'vee-validate/dist/locale/es.json';
import veeValidateFr from 'vee-validate/dist/locale/fr.json';
import veeValidateHu from 'vee-validate/dist/locale/hu.json';
import veeValidateId from 'vee-validate/dist/locale/id.json';
import veeValidateIt from 'vee-validate/dist/locale/it.json';
import veeValidateNl from 'vee-validate/dist/locale/nl.json';
import veeValidatePl from 'vee-validate/dist/locale/pl.json';
import veeValidatePt from 'vee-validate/dist/locale/pt_BR.json';
import veeValidateTr from 'vee-validate/dist/locale/tr.json';
import '@open-election-compass/ui/dist/open-election-compass-ui.css';
import {
  BaseButton,
  FieldInput,
  FieldSelect,
  FieldSwitch,
  Icon,
  Modal,
} from '@open-election-compass/ui';
import OpenElectionCompass from './OpenElectionCompass.vue';
import storeModuleAlgorithm from './store/modules/algorithm/algorithm';
import storeModuleAnalysis from './store/modules/analysis/analysis';
import storeModuleFooterLinks from './store/modules/footerLinks/footerLinks';
import storeModuleLanguages from './store/modules/languages/languages';
import storeModuleOptions from './store/modules/options/options';
import storeModuleParties from './store/modules/parties/parties';
import storeModuleSections from './store/modules/sections/sections';
import storeModuleTheses from './store/modules/theses/theses';
import ar from './locales/ar.yaml';
import de from './locales/de.yaml';
import en from './locales/en.yaml';
import es from './locales/es.yaml';
import fr from './locales/fr.yaml';
import hu from './locales/hu.yaml';
import id from './locales/id.yaml';
import it from './locales/it.yaml';
import nl from './locales/nl.yaml';
import pl from './locales/pl.yaml';
import pt from './locales/pt.yaml';
import tr from './locales/tr.yaml';

export default function installOpenElectionCompassNuxtPlugin({ app, store }) {
  // Install locales
  app.i18n.mergeLocaleMessage('ar', ar);
  app.i18n.mergeLocaleMessage('de', de);
  app.i18n.mergeLocaleMessage('en', en);
  app.i18n.mergeLocaleMessage('es', es);
  app.i18n.mergeLocaleMessage('fr', fr);
  app.i18n.mergeLocaleMessage('hu', hu);
  app.i18n.mergeLocaleMessage('id', id);
  app.i18n.mergeLocaleMessage('it', it);
  app.i18n.mergeLocaleMessage('nl', nl);
  app.i18n.mergeLocaleMessage('pl', pl);
  app.i18n.mergeLocaleMessage('pt', pt);
  app.i18n.mergeLocaleMessage('tr', tr);

  // Install store modules
  store.registerModule('algorithm', storeModuleAlgorithm);
  store.registerModule('analysis', storeModuleAnalysis);
  store.registerModule('footerLinks', storeModuleFooterLinks);
  store.registerModule('languages', storeModuleLanguages);
  store.registerModule('options', storeModuleOptions);
  store.registerModule('parties', storeModuleParties);
  store.registerModule('sections', storeModuleSections);
  store.registerModule('theses', storeModuleTheses);

  // Install OpenElectionCompass UI
  Vue.component('BaseButton', BaseButton);
  Vue.component('FieldInput', FieldInput);
  Vue.component('FieldSelect', FieldSelect);
  Vue.component('FieldSwitch', FieldSwitch);
  Vue.component('Icon', Icon); // eslint-disable-line vue/multi-word-component-names
  Vue.component('Modal', Modal); // eslint-disable-line vue/multi-word-component-names

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
  Vue.component('TippyTooltip', TippyComponent);

  localize({
    veeValidateAr,
    veeValidateDe,
    veeValidateEn,
    veeValidateEs,
    veeValidateFr,
    veeValidateHu,
    veeValidateId,
    veeValidateIt,
    veeValidateNl,
    veeValidatePl,
    veeValidatePt,
    veeValidateTr,
  });

  // Install component
  Vue.component('OpenElectionCompass', OpenElectionCompass);
}

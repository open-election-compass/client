import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { localize } from 'vee-validate';
import {
  deLocale as deUILocale,
  enLocale as enUILocale,
} from '@open-election-compass/ui';
import de from './de.yaml';
import en from './en.yaml';

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'en',

  // When accessing root locales in single file components with their own locales, vue-i18n will
  // print a fallback warning in the console. This gets quite annoying, since we do that a lot and
  // there is nothing wrong about it. Thankfully, we can disable that.
  // For more information see: https://github.com/kazupon/vue-i18n/issues/201
  silentTranslationWarn: true,
});

i18n.setLocaleMessage('de', de);
i18n.mergeLocaleMessage('de', deUILocale);

i18n.setLocaleMessage('en', en);
i18n.mergeLocaleMessage('en', enUILocale);

localize('de', de.validation);
localize('en', en.validation);

export default i18n;

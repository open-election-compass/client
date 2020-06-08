import Vue from 'vue';
import VueI18n from 'vue-i18n';
import numberFormats from './numberFormats';
import de from './de.json';
import en from './en.json';

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'en',
  numberFormats,

  // When accessing root locales in single file components with their own locales, vue-i18n will
  // print a fallback warning in the console. This gets quite annoying, since we do that a lot and
  // there is nothing wrong about it. Thankfully, we can disable that.
  // For more information see: https://github.com/kazupon/vue-i18n/issues/201
  silentTranslationWarn: true,
});

i18n.setLocaleMessage('de', de);
i18n.setLocaleMessage('en', en);

export default i18n;

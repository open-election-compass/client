import { createI18n } from 'vue-i18n';
import en from './en.json';

type MessageSchema = typeof en;

const i18n = createI18n<[MessageSchema], 'en'>({
  locale: 'en',
  fallbackLocale: 'en',
  legacy: true,

  // When accessing root locales in single file components with their own locales, vue-i18n will
  // print a fallback warning in the console. This gets quite annoying, since we do that a lot and
  // there is nothing wrong about it. Thankfully, we can disable that.
  // For more information see: https://github.com/kazupon/vue-i18n/issues/201
  silentTranslationWarn: true,
  messages: {
    en,
  },
});

i18n.global.setLocaleMessage('en', en);

export default i18n;

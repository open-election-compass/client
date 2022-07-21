import { createI18n } from 'vue-i18n';
import {
  arLocale as arUILocale,
  deLocale as deUILocale,
  enLocale as enUILocale,
  esLocale as esUILocale,
  frLocale as frUILocale,
  huLocale as huUILocale,
  idLocale as idUILocale,
  itLocale as itUILocale,
  plLocale as plUILocale,
  ptLocale as ptUILocale,
  trLocale as trUILocale,
} from '@open-election-compass/ui';
import ar from './ar.json';
import de from './de.json';
import en from './en.json';
import es from './es.json';
import fr from './fr.json';
import hu from './hu.json';
import id from './id.json';
import it from './it.json';
import nl from './nl.json';
import pl from './pl.json';
import pt from './pt.json';
import tr from './tr.json';

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

i18n.global.setLocaleMessage('ar', ar);
i18n.global.mergeLocaleMessage('ar', arUILocale);

i18n.global.setLocaleMessage('de', de);
i18n.global.mergeLocaleMessage('de', deUILocale);

i18n.global.setLocaleMessage('en', en);
i18n.global.mergeLocaleMessage('en', enUILocale);

i18n.global.setLocaleMessage('es', es);
i18n.global.mergeLocaleMessage('es', esUILocale);

i18n.global.setLocaleMessage('fr', fr);
i18n.global.mergeLocaleMessage('fr', frUILocale);

i18n.global.setLocaleMessage('hu', hu);
i18n.global.mergeLocaleMessage('hu', huUILocale);

i18n.global.setLocaleMessage('id', id);
i18n.global.mergeLocaleMessage('id', idUILocale);

i18n.global.setLocaleMessage('it', it);
i18n.global.mergeLocaleMessage('it', itUILocale);

i18n.global.setLocaleMessage('nl', nl);
// TODO: i18n.global.mergeLocaleMessage('nl', nlUILocale);

i18n.global.setLocaleMessage('pl', pl);
i18n.global.mergeLocaleMessage('pl', plUILocale);

i18n.global.setLocaleMessage('pt', pt);
i18n.global.mergeLocaleMessage('pt', ptUILocale);

i18n.global.setLocaleMessage('tr', tr);
i18n.global.mergeLocaleMessage('tr', trUILocale);

export default i18n;

import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { localize } from 'vee-validate';
import {
  arLocale as arUILocale,
  deLocale as deUILocale,
  enLocale as enUILocale,
  esLocale as esUILocale,
  frLocale as frUILocale,
  huLocale as huUILocale,
  idLocale as idUILocale,
  itLocale as itUILocale,
  nlLocale as nlUILocale,
  plLocale as plUILocale,
  ptLocale as ptUILocale,
  trLocale as trUILocale,
} from '@open-election-compass/ui';
import ar from './ar.yaml';
import de from './de.yaml';
import en from './en.yaml';
import es from './es.yaml';
import fr from './fr.yaml';
import hu from './hu.yaml';
import id from './id.yaml';
import it from './it.yaml';
import nl from './nl.yaml';
import pl from './pl.yaml';
import pt from './pt.yaml';
import tr from './tr.yaml';

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',

  // When accessing root locales in single file components with their own locales, vue-i18n will
  // print a fallback warning in the console. This gets quite annoying, since we do that a lot and
  // there is nothing wrong about it. Thankfully, we can disable that.
  // For more information see: https://github.com/kazupon/vue-i18n/issues/201
  silentTranslationWarn: true,
});

i18n.setLocaleMessage('ar', ar);
i18n.mergeLocaleMessage('ar', arUILocale);

i18n.setLocaleMessage('de', de);
i18n.mergeLocaleMessage('de', deUILocale);

i18n.setLocaleMessage('en', en);
i18n.mergeLocaleMessage('en', enUILocale);

i18n.setLocaleMessage('es', es);
i18n.mergeLocaleMessage('es', esUILocale);

i18n.setLocaleMessage('fr', fr);
i18n.mergeLocaleMessage('fr', frUILocale);

i18n.setLocaleMessage('hu', hu);
i18n.mergeLocaleMessage('hu', huUILocale);

i18n.setLocaleMessage('id', id);
i18n.mergeLocaleMessage('id', idUILocale);

i18n.setLocaleMessage('it', it);
i18n.mergeLocaleMessage('it', itUILocale);

i18n.setLocaleMessage('nl', nl);
i18n.mergeLocaleMessage('nl', nlUILocale);

i18n.setLocaleMessage('pl', pl);
i18n.mergeLocaleMessage('pl', plUILocale);

i18n.setLocaleMessage('pt', pt);
i18n.mergeLocaleMessage('pt', ptUILocale);

i18n.setLocaleMessage('tr', tr);
i18n.mergeLocaleMessage('tr', trUILocale);

localize('ar', ar.validation);
localize('de', de.validation);
localize('en', en.validation);
localize('es', es.validation);
localize('fr', fr.validation);
localize('hu', hu.validation);
localize('id', id.validation);
localize('it', it.validation);
localize('nl', nl.validation);
localize('pl', pl.validation);
localize('pt', pt.validation);
localize('tr', tr.validation);

export default i18n;

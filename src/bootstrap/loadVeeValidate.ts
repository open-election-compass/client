import { configure, defineRule } from 'vee-validate';
import {
  alpha,
  email,
  integer,
  length,
  max,
  min,
  one_of,
  regex,
  required,
} from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';

import ar from '@vee-validate/i18n/dist/locale/ar.json';
import de from '@vee-validate/i18n/dist/locale/de.json';
import en from '@vee-validate/i18n/dist/locale/en.json';
import es from '@vee-validate/i18n/dist/locale/es.json';
import fr from '@vee-validate/i18n/dist/locale/fr.json';
import hu from '@vee-validate/i18n/dist/locale/hu.json';
import id from '@vee-validate/i18n/dist/locale/id.json';
import it from '@vee-validate/i18n/dist/locale/it.json';
import pl from '@vee-validate/i18n/dist/locale/pl.json';
import pt from '@vee-validate/i18n/dist/locale/pt_BR.json';
import tr from '@vee-validate/i18n/dist/locale/tr.json';

export default function loadVeeValidate() {
  defineRule('alpha', alpha);
  defineRule('email', email);
  defineRule('integer', integer);
  defineRule('length', length);
  defineRule('max', max);
  defineRule('min', min);
  defineRule('one_of', one_of);
  defineRule('regex', regex);
  defineRule('required', required);

  configure({
    generateMessage: localize({
      ar,
      de,
      en,
      es,
      fr,
      hu,
      id,
      it,
      pl,
      pt,
      tr,
    }),
  });
}

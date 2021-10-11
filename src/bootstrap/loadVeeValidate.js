import Vue from 'vue';
import {
  ValidationObserver, ValidationProvider, extend, localize,
} from 'vee-validate';
import {
  alpha, email, integer, length, max, min, oneOf, regex, required,
} from 'vee-validate/dist/rules.umd';
import ar from 'vee-validate/dist/locale/ar.json';
import de from 'vee-validate/dist/locale/de.json';
import en from 'vee-validate/dist/locale/en.json';
import es from 'vee-validate/dist/locale/es.json';
import id from 'vee-validate/dist/locale/id.json';
import it from 'vee-validate/dist/locale/it.json';
import pl from 'vee-validate/dist/locale/pl.json';
import pt from 'vee-validate/dist/locale/pt_BR.json';

export default function loadVeeValidate() {
  extend('alpha', alpha);
  extend('email', email);
  extend('integer', integer);
  extend('length', length);
  extend('max', max);
  extend('min', min);
  extend('oneOf', oneOf);
  extend('regex', regex);
  extend('required', required);

  localize({
    ar, de, en, es, id, it, pl, pt,
  });

  Vue.component('ValidationObserver', ValidationObserver);
  Vue.component('ValidationProvider', ValidationProvider);
}

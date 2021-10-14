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
import fr from 'vee-validate/dist/locale/fr.json';
import hu from 'vee-validate/dist/locale/hu.json';
import id from 'vee-validate/dist/locale/id.json';
import it from 'vee-validate/dist/locale/it.json';
import pl from 'vee-validate/dist/locale/pl.json';
import pt from 'vee-validate/dist/locale/pt_BR.json';
import tr from 'vee-validate/dist/locale/tr.json';

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
    ar, de, en, es, fr, hu, id, it, pl, pt, tr,
  });

  Vue.component('ValidationObserver', ValidationObserver);
  Vue.component('ValidationProvider', ValidationProvider);
}

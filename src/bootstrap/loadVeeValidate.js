import Vue from 'vue';
import { ValidationProvider, extend, localize } from 'vee-validate';
import {
  alpha, email, integer, length, max, min, oneOf, regex, required,
} from 'vee-validate/dist/rules.umd';
import de from 'vee-validate/dist/locale/de.json';
import en from 'vee-validate/dist/locale/en.json';

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

  localize({ de, en });

  Vue.component('ValidationProvider', ValidationProvider);
}

import Vue from 'vue';
import Vuex from 'vuex';

import footerLinks from './modules/footerLinks/footerLinks';
import languages from './modules/languages/languages';
import options from './modules/options/options';
import parties from './modules/parties/parties';
import sections from './modules/sections/sections';
import theses from './modules/theses/theses';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    footerLinks,
    languages,
    options,
    parties,
    sections,
    theses,
  },
});

import Vue from 'vue';
import Vuex from 'vuex';

import footerLinks from './modules/footerLinks';
import languages from './modules/languages';
import parties from './modules/parties';
import sections from './modules/sections';
import theses from './modules/theses';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    footerLinks,
    languages,
    parties,
    sections,
    theses,
  },
});

import Vue from 'vue';
import Vuex from 'vuex';

import algorithm from './modules/algorithm/algorithm';
import analysis from './modules/analysis/analysis';
import footerLinks from './modules/footerLinks/footerLinks';
import friends from './modules/friends/friends';
import friendsPlugin from './modules/friends/plugin';
import languages from './modules/languages/languages';
import options from './modules/options/options';
import parties from './modules/parties/parties';
import sections from './modules/sections/sections';
import theses from './modules/theses/theses';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    algorithm,
    analysis,
    footerLinks,
    friends,
    languages,
    options,
    parties,
    sections,
    theses,
  },
  plugins: [friendsPlugin],
});

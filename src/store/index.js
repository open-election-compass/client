import Vue from 'vue';
import Vuex from 'vuex';

import parties from './modules/parties';
import theses from './modules/theses';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    parties,
    theses,
  },
});

import algorithms from './algorithms/index';

export default {
  namespaced: true,
  state: {
    algorithm: null,
    variant: null,
  },
  getters: {
    algorithm(state) {
      let { algorithm } = state;
      if (state.variant !== null) {
        algorithm += `/${state.variant}`;
      }
      return algorithms[algorithm];
    },
    highestPoint(state, getters) {
      return getters.algorithm.points.reduce((highest, array) => {
        const highestInArray = array.reduce((result, value) => Math.max(value, highest));
        return Math.max(highestInArray, highest);
      }, 0);
    },
  },
  mutations: {
    setAlgorithm(state, value) {
      const indexOfSeparator = value.indexOf('/');
      let algorithm = value;
      let variant = null;
      if (indexOfSeparator > -1) {
        algorithm = value.slice(0, indexOfSeparator);
        variant = value.slice(indexOfSeparator + 1);
      }
      state.algorithm = algorithm;
      state.variant = variant;
    },
  },
  actions: {
    activateAlgorithm({ getters, commit }, { algorithm, i18n }) {
      commit('setAlgorithm', algorithm);
      getters.algorithm.options.forEach((option) => {
        Object.keys(option.locales).forEach((locale) => {
          const messages = {};
          messages.algorithm = {};
          messages.algorithm.options = {};
          messages.algorithm.options[option.alias] = option.locales[locale];
          i18n.mergeLocaleMessage(locale, messages);
        });
      });
    },
  },
};

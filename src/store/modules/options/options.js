export default {
  namespaced: true,
  state: {
    kioskMode: false,
    algorithm: null,
    variant: null,
  },
  getters: {
    kioskMode(state) {
      return state.kioskMode;
    },
    algorithm(state) {
      return state.algorithm;
    },
    variant(state) {
      return state.variant;
    },
  },
  mutations: {
    setKioskMode(state, value) {
      state.kioskMode = value;
    },
    setAlgorithmAndVariant(state, value) {
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
};

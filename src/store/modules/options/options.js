export default {
  namespaced: true,
  state: {
    kioskMode: false,
  },
  getters: {
    kioskMode(state) {
      return state.kioskMode;
    },
  },
  mutations: {
    setKioskMode(state, value) {
      state.kioskMode = value;
    },
  },
};

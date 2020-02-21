export default {
  namespaced: true,
  state: {
    theses: [],
  },
  getters: {
    theses(state) {
      return state.theses;
    },
    total(state) {
      return state.theses.length;
    },
    complete(state) {
      return !state.theses.some(thesis => thesis.status === null);
    },
  },
  actions: {
    activate({ commit }, { index }) {
      commit('setActivated', { index, activated: true });
    },
  },
  mutations: {
    addThesis(state, thesis) {
      state.theses.push(thesis);
    },
    setStatus(state, { index, status }) {
      state.theses[index].status = status;
    },
    setFactor(state, { index, factor }) {
      state.theses[index].factor = factor;
    },
    setActivated(state, { index, activated }) {
      state.theses[index].activated = activated;
    },
  },
};

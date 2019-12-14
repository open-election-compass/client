export default {
  namespaced: true,
  state: {
    theses: [],
  },
  getters: {
    theses(state) {
      return state.theses;
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
    setActivated(state, { index, activated }) {
      state.theses[index].activated = activated;
    },
  },
};

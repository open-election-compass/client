export default {
  namespaced: true,
  state: {
    theses: [],
  },
  getters: {
    theses(state) {
      return state.theses;
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

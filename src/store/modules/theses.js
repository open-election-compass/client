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
  mutations: {
    addThesis(state, thesis) {
      state.theses.push(thesis);
    },
    setStatus(state, payload) {
      state.theses[payload.index].status = payload.status;
    },
    activated(state, payload) {
      state.theses[payload.index].hasBeenActivated = true;
    },
  },
};

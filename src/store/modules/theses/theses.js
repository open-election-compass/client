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
      return !state.theses.some((thesis) => thesis.status === null);
    },
    completedTheses(state) {
      return state.theses.filter((thesis) => thesis.status === null);
    },
    maxPoints(state, getters, rootState, rootGetters) {
      const highestPoint = rootGetters['algorithm/highestPoint'];
      return state.theses.reduce((points, thesis) => {
        if (thesis.status === 'skip' || thesis.status === null) {
          return points;
        }
        return points + highestPoint * thesis.factor;
      }, 0);
    },
    countImportant(state) {
      return state.theses.reduce((count, thesis) => (thesis.factor > 1 ? count + 1 : count), 0);
    },
    maxImportant(state) {
      return Math.floor(state.theses.length * 0.5);
    },
    countSkip(state) {
      return state.theses.reduce(
        (count, thesis) => (thesis.status === 'skip' ? count + 1 : count),
        0
      );
    },
    maxSkip(state) {
      return Math.floor(state.theses.length * 0.25);
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

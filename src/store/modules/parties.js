export default {
  namespaced: true,
  state: {
    parties: [],
    chosen: false,
  },
  getters: {
    parties(state) {
      return state.parties;
    },
    chosen(state) {
      return state.chosen;
    },
  },
  actions: {
    chose({ commit }) {
      commit('setChosen', { chosen: true });
    },
  },
  mutations: {
    addParty(state, party) {
      state.parties.push(party);
    },
    setSelected(state, { index, value }) {
      state.parties[index].selected = value;
    },
    setChosen(state, { chosen }) {
      state.chosen = chosen;
    },
  },
};

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
    selectedParties(state) {
      return state.parties.filter(party => party.selected);
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

export default {
  namespaced: true,
  state: {
    parties: [],
  },
  getters: {
    parties(state) {
      return state.parties;
    },
  },
  mutations: {
    addParty(state, party) {
      state.parties.push(party);
    },
  },
};

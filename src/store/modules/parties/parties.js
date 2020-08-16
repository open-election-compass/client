import calculatePointsForParty from './calculatePointsForParty';

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
      return state.parties.filter((party) => party.selected);
    },
    chosen(state) {
      return state.chosen;
    },
    results(state, { selectedParties }, rootState, rootGetters) {
      const theses = rootGetters['theses/theses'];
      const algorithm = rootGetters['algorithm/algorithm'];
      const maxPoints = rootGetters['theses/maxPoints'];
      const results = selectedParties.map((party) => {
        const points = calculatePointsForParty(party, theses, algorithm);
        const percentage = (1 / maxPoints) * points;
        return { party, points, percentage };
      });
      return results.sort((a, b) => b.points - a.points);
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

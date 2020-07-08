export default {
  namespaced: true,
  state: {
    links: [],
  },
  getters: {
    links(state) {
      return state.links;
    },
  },
  mutations: {
    addLink(state, link) {
      state.links.push(link);
    },
  },
};

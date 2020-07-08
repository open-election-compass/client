export default {
  namespaced: true,
  state: {
    // List of sections in order of appearance
    sections: [],

    // The section the user is currently in, according to the scroll position:
    actualSection: null,

    // When a section is completed it can choose to enable/disable the GuideButton:
    guideButtonEnabled: true,
  },
  getters: {
    sections(state) {
      return state.sections;
    },
    actualSection(state) {
      return state.actualSection;
    },
    activeSection(state) {
      const uncompletedSection = state.sections.find((section) => section.completed === false);
      if (uncompletedSection !== null) {
        return uncompletedSection;
      }
      return this.sections[0];
    },
    guideButtonEnabled(state) {
      return state.guideButtonEnabled;
    },
  },
  actions: {
    enableGuideButton({ commit }) {
      commit('setGuideButtonEnabled', true);
    },
    disableGuideButton({ commit }) {
      commit('setGuideButtonEnabled', false);
    },
  },
  mutations: {
    addSection(state, section) {
      state.sections.push(section);
    },
    updateActualSection(state, section) {
      state.actualSection = section;
    },
    markSectionAsCompleted(state, alias) {
      const completedSection = state.sections.find((section) => section.alias === alias);
      if (completedSection !== null) {
        completedSection.completed = true;
      }
    },
    setGuideButtonEnabled(state, value) {
      state.guideButtonEnabled = value;
    },
  },
};

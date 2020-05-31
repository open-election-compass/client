import getUserLocale from 'get-user-locale';

const supportedLanguages = ['en', 'de'];

export default {
  namespaced: true,
  state: {
    languages: [],
  },
  getters: {
    languages(state) {
      return state.languages;
    },
    fallback(state) {
      const fallback = state.languages.find((language) => language.fallback);
      if (fallback) {
        return fallback;
      }
      return false;
    },
    active(state, getters) {
      const active = state.languages.find((language) => language.active);
      if (active) {
        return active;
      }
      return getters.fallback;
    },
    usesFallback(state) {
      return state.languages.find((language) => language.active) === undefined;
    },
  },
  mutations: {
    addLanguage(state, language) {
      if (!supportedLanguages.includes(language.code)) {
        throw new Error(`The language code '${language.code}' is not recognized. The language might not be supported yet. Please open an issue to add a new language to this project.`);
      }
      state.languages.push({
        code: language.code,
        name: language.name,
        active: false,
        fallback: state.languages.length === 0,
      });
    },
    activateLanguage(state, { code }) {
      state.languages.forEach((language) => {
        if (language.active && language.code !== code) {
          // eslint-disable-next-line no-param-reassign
          language.active = false;
        }
        if (language.code === code) {
          // eslint-disable-next-line no-param-reassign
          language.active = true;
        }
      });
    },
    setFallbackLanguage(state, code) {
      const match = state.languages.find((language) => language.code === code);
      if (match) {
        match.fallback = true;
      }
      return match;
    },
  },
  actions: {
    setBrowserLanguageAsFallback(context) {
      const code = getUserLocale().substr(0, 2); // e.g. 'en' or 'en_US'
      context.commit('setFallbackLanguage', { code });
    },
  },
};

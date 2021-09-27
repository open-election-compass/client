import getUserLocale from 'get-user-locale';
import i18n from '@/locales/i18n';

const officialLanguages = ['en', 'de'];

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
      if (!officialLanguages.includes(language.code)) {
        // eslint-disable-next-line no-console
        console.warn(`The language code '${language.code}' is not recognized as an officially supported language. This is not a concern if you added a custom language. If you want to expand the official language support, please get in touch with the maintainers.`);
      }
      if (typeof language.overwrites === 'object') {
        i18n.mergeLocaleMessage(language.code, language.overwrites);
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

import getUserLocale from 'get-user-locale';
import i18n from '/src/locales/i18n';
import cloneDeep from 'lodash/cloneDeep';

const officialLanguages = [
  'ar',
  'az',
  'bn',
  'de',
  'el',
  'en',
  'es',
  'fa',
  'fr',
  'ha',
  'he',
  'hi',
  'hr',
  'hu',
  'id',
  'it',
  'ja',
  'ko',
  'ml',
  'nl',
  'pl',
  'pt',
  'ro',
  'ru',
  'rw',
  'sk',
  'sr',
  'sw',
  'th',
  'tr',
  'uk',
  'vi',
  'zh',
];

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
        console.warn(
          `The language code '${language.code}' is not recognized as an officially supported language. This is not a concern if you added a custom language. If you want to expand the official language support, please get in touch with the maintainers.`
        );
      }
      if (typeof language.overwrites === 'object' && language.overwrites !== null) {
        i18n.global.mergeLocaleMessage(language.code, cloneDeep(language.overwrites));
      }
      state.languages.push({
        code: language.code,
        name: language.name,
        direction: language.direction ?? 'ltr',
        active: false,
        fallback: state.languages.length === 0,
        overwrites: language.overwrites,
        loadFromUrl: language.loadFromUrl,
        loadFromTag: language.loadFromTag,
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
    parseLanguage(state, { language, translations }) {
      i18n.global.mergeLocaleMessage(language.code, {
        ...translations.client,
        ...translations.content,
        ui: translations.ui,
      });
      if (typeof language.overwrites === 'object' && language.overwrites !== null) {
        i18n.global.mergeLocaleMessage(language.code, cloneDeep(language.overwrites));
      }
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
    preloadLanguage({ state, commit }, { code }) {
      return new Promise((resolve, reject) => {
        const language = state.languages.find((language) => language.code === code);
        if (
          language === undefined ||
          (typeof language.loadFromUrl !== 'string' && typeof language.loadFromTag !== 'string')
        ) {
          reject(new Error('The language you requested is not available.'));
        }
        if (typeof language.loadFromUrl === 'string') {
          // Load from URL
          const xhr = new XMLHttpRequest();
          xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              commit('parseLanguage', {
                language,
                translations: JSON.parse(xhr.responseText),
              });
              resolve();
            } else {
              reject(
                new Error(`Failed loading requested language from URL '${language.loadFromUrl}'.`)
              );
            }
            return;
          };
          xhr.open('GET', language.loadFromUrl);
          xhr.send();
        } else if (typeof language.loadFromTag === 'string') {
          // Load from tag
          const selector = language.loadFromTag;
          const tag = document.querySelector(selector);
          if (tag === undefined) {
            reject(
              new Error(`Failed loading requested language from tag '${language.loadFromTag}'.`)
            );
            return;
          }
          commit('parseLanguage', {
            language,
            translations: JSON.parse(tag.textContent),
          });
          resolve();
        }
      });
    },
  },
};

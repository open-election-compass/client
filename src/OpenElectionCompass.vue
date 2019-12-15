<template>
  <div id="oec-wrapper">
    <router-view/>
  </div>
</template>

<script>
import _forEach from 'lodash/forEach';
import _get from 'lodash/get';
import _set from 'lodash/set';

export default {
  name: 'OpenElectionCompass',
  props: {
    language: {
      type: String,
      validator(value) {
        return ['de', 'en'].includes(value);
      },
      default: 'en',
    },
  },
  /**
   * The created hook. Interprets the JSON configuration passed to the components' default slot. And
   * creates translations and vuex stores, accordingly.
   *
   * @return  {undefined}
   */
  created() {
    // Set current language from language property
    this.setLocale(this.language);

    // Load JSON configuration from slot
    const configuration = JSON.parse(this.$slots.default[0].text);

    // Extract translations from configuration
    const translations = {};
    this.readTranslation(configuration, 'title', translations);
    this.readTranslation(configuration, 'subtitle', translations);
    this.readTranslation(configuration, 'introduction.heading', translations);
    this.readTranslation(configuration, 'introduction.text', translations);

    // Read configuration for theses and extract translations
    _forEach(configuration.theses, (thesis, index) => {
      this.readTranslation(configuration, `theses.${index}.statement`, translations);
      const positions = {};
      _forEach(configuration.parties, (party) => {
        this.readTranslation(configuration, `theses.${index}.positions.${party.alias}.explanation`, translations);
        positions[party.alias] = thesis.positions[party.alias].position;
      });
      this.$store.commit('theses/addThesis', {
        status: null,
        activated: index === 0,
        positions,
      });
    });

    // Read configuration for parties and extract translations
    _forEach(configuration.parties, (party, index) => {
      this.readTranslation(configuration, `parties.${index}.name`, translations);
      this.readTranslation(configuration, `parties.${index}.short`, translations);
      this.readTranslation(configuration, `parties.${index}.description`, translations);
      this.$store.commit('parties/addParty', {
        alias: party.alias,
        selected: false,
      });
    });

    _forEach(translations, (translation, language) => {
      this.$i18n.setLocaleMessage(language, translation);
    });
  },
  methods: {
    /**
     * Set the current language in the vue-i18n plugin.
     *
     * @param   {String}  locale  The locale in two letter format. E.g. 'en' for English.
     *
     * @return  {undefined}
     */
    setLocale(locale) {
      this.$i18n.locale = locale;
    },

    /**
     * Extracts translations from one object and injects it into another. This method expects an
     * object containing translations in key-value format at the given `path` in the `from` object.
     * It extracts the translations for every language and places them at the given `path` in the
     * `to` object, but under their respective languages on top-level.
     *
     * @param   {Object}  from  The object the translations are extracted from.
     * @param   {String}  path  The path at which the translations are read/written.
     * @param   {Object}  to    The object the translations are written to.
     *
     * @return  {Object}        Returns the `to` object.
     */
    readTranslation(from, path, to) {
      const translations = _get(from, path, false);
      if (typeof translations !== 'object') {
        console.warn(`Found no translations at path '${path}'. Check your configuration.`); // eslint-disable-line no-console
        return to;
      }
      _forEach(translations, (translation, language) => {
        _set(to, `${language}.${path}`, translation);
      });
      return to;
    },
  },

};
</script>

<style lang="scss">
@tailwind base;
@tailwind components;
@tailwind utilities;

#oec-wrapper {
  font-family: Arial, sans-serif;
  color: #222;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@import './main.scss';
</style>

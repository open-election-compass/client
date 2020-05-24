<template>
  <div id="oec-wrapper">
    <div
      v-if="status === 'loading' || status === 'error'"
      class="loading"
    >
      <icon v-if="status === 'loading'" name="slash" class="text-primary" spinning monospace />
      <icon v-else-if="status === 'error'" name="times" class="text-red-500" monospace />
    </div>
    <router-view v-else />
  </div>
</template>

<script>
import _forEach from 'lodash/forEach';
import _get from 'lodash/get';
import _set from 'lodash/set';

export default {
  name: 'OpenElectionCompass',

  data() {
    return {
      status: 'loading',
    };
  },

  props: {
    loadTag: {
      type: String,
      default: null,
    },
    loadUrl: {
      type: String,
      default: null,
    },
  },

  /**
   * The mounted hook. Interprets the JSON configuration passed to the components' default slot. And
   * creates translations and vuex stores, accordingly.
   *
   * @return  {undefined}
   */
  mounted() {
    // Get JSON content from element attributes. Example:
    // <open-election-compass load-url="https://example.com/content.json" />
    // – or –
    // <open-election-compass load-tag="#oec-content" />
    // <script type="application/json" id="oec-content">...
    if (typeof this.loadTag === 'string' && this.loadTag.length > 0) {
      this.loadContentFromTag(this.loadTag);
    } else if (typeof this.loadUrl === 'string' && this.loadUrl.length > 0) {
      this.loadContentFromUrl(this.loadUrl);
    }
  },
  methods: {
    loadContentFromTag(tag) {
      const element = document.querySelector(tag);
      if (element.tagName !== 'SCRIPT') {
        throw new Error('Please reference a script-tag in the load-url attribute to load the content from.');
      }
      const content = JSON.parse(element.text);
      const result = this.parseContent(content);
      if (result) {
        this.status = 'ready';
      } else {
        this.status = 'error';
      }
    },
    loadContentFromUrl(url) {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          const result = this.parseContent(JSON.parse(xhr.responseText));
          if (result) {
            this.status = 'ready';
          } else {
            this.status = 'error';
          }
        } else {
          this.status = 'error';
          throw new Error(`Failed loading content from URL '${url}'!`);
        }
      };
      xhr.open('GET', url);
      xhr.send();
    },
    parseContent(content) {
      const languages = content.languages.map(language => language.code);
      if (languages.length === 0) {
        console.error('No translation loaded, because no translation attributes were found on the base element. Should look like this: <open-election-compass translation-en="https://example.com/en.json" />'); // eslint-disable-line no-console
      }

      // Set the first language as the default language
      this.setLocale(languages[0]);

      // Extract translations from content
      const translations = {};
      this.readTranslation(content, 'title', translations);
      this.readTranslation(content, 'subtitle', translations);
      this.readTranslation(content, 'introduction.heading', translations);
      this.readTranslation(content, 'introduction.text', translations);

      // Extract footer links
      _forEach(content['footer-links'], (link, index) => {
        this.readTranslation(content, `footer-links.${index}.text`, translations);
        this.$store.commit('footerLinks/addLink', {
          index,
          href: link.href,
        });
      });

      // Read content for theses and extract translations
      _forEach(content.theses, (thesis, index) => {
        this.readTranslation(content, `theses.${index}.title`, translations, true);
        this.readTranslation(content, `theses.${index}.statement`, translations);
        const positions = {};
        _forEach(content.parties, (party) => {
          this.readTranslation(content, `theses.${index}.positions.${party.alias}.explanation`, translations);
          positions[party.alias] = thesis.positions[party.alias].position;
        });
        this.$store.commit('theses/addThesis', {
          index,
          status: null,
          factor: 1,
          activated: index === 0,
          positions,
        });
      });

      // Read content for parties and extract translations
      _forEach(content.parties, (party, index) => {
        this.readTranslation(content, `parties.${index}.name`, translations);
        this.readTranslation(content, `parties.${index}.short`, translations);
        this.readTranslation(content, `parties.${index}.description`, translations);
        this.$store.commit('parties/addParty', {
          index,
          alias: party.alias,
          selected: false,
          logo: party.logo === undefined ? null : party.logo,
        });
      });

      _forEach(translations, (translation, language) => {
        this.$i18n.setLocaleMessage(language, translation);
      });

      return true;
    },

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
      const translations = _get(from, path);
      if (typeof translations !== 'object') {
        console.warn(`Found no translations at path '${path}'. Check your configuration.`); // eslint-disable-line no-console
        return to;
      }
      _forEach(
        translations,
        (translation, language) => _set(to, `${language}.${path}`, translation),
      );
      return to;
    },
  },

};
</script>

<style lang="scss">
@import './main.scss';

#oec-wrapper {
  font-family: Arial, sans-serif;
  color: #222;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow-y: auto;
}
</style>

<style lang="scss" scoped>
.loading {
  position: fixed;
  top: 50%;
  left: 50%;
  font-size: 4rem;
  line-height: 1;
  .icon {
    position: relative;
    left: -50%;
    top: -2rem;
  }
}
</style>

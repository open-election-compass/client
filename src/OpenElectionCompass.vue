<template>
  <div id="oec-wrapper" :dir="$store.getters['languages/active'].direction ?? 'ltr'">
    <div
      v-if="status === 'loading' || status === 'error'"
      :class="{
        'oec-wrapper__loading': true,
        'oec-wrapper__loading--error': status === 'error',
      }"
    >
      <div class="oec-wrapper__loading-icon">
        <IconDisplay v-if="status === 'loading'" name="slash" spinning monospace />
        <IconDisplay v-else-if="status === 'error'" name="times" monospace />
      </div>
    </div>
    <div v-else class="oec-wrapper__page">
      <HomeView />
    </div>
  </div>
</template>

<script>
import domReady from '@wordpress/dom-ready';
import _forEach from 'lodash/forEach';
import _get from 'lodash/get';
import _set from 'lodash/set';
import HomeView from '/src/components/views/home/HomeView.vue';
import { setLocale } from '@vee-validate/i18n';

export default {
  name: 'OpenElectionCompass',

  components: {
    HomeView,
  },

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
    loadObject: {
      type: Object,
      default: null,
    },
    language: {
      type: String,
      default: null,
    },
    kioskMode: {
      type: Boolean,
      default: false,
    },
    friends: {
      type: Boolean,
      default: false,
    },
    friendsHost: {
      type: String,
      default: 'friends.open-election-compass.com',
    },
    friendsPort: {
      type: Number,
      default: 443,
    },
    friendsPath: {
      type: String,
      default: '/',
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
    domReady(() => {
      if (typeof this.loadTag === 'string' && this.loadTag.length > 0) {
        this.loadContentFromTag(this.loadTag);
      } else if (typeof this.loadUrl === 'string' && this.loadUrl.length > 0) {
        this.loadContentFromUrl(this.loadUrl);
      } else if (typeof this.loadObject === 'object' && this.loadObject !== null) {
        this.loadContentFromObject(this.loadObject);
      }
    });
    this.$store.commit('options/setKioskMode', this.kioskMode);
    this.$store.commit('options/setFriendsEnabled', this.friends);
    this.$store.commit('options/setFriendsHost', this.friendsHost);
    this.$store.commit('options/setFriendsPort', this.friendsPort);
    this.$store.commit('options/setFriendsPath', this.friendsPath);
  },
  computed: {
    activeLanguage() {
      return this.$store.getters['languages/active'];
    },
  },
  watch: {
    activeLanguage(language) {
      if (language && language.code) {
        this.setLocale(language.code);
      }
    },
    language(code) {
      if (code) {
        this.setLocale(code);
      }
    },
    kioskMode(value) {
      this.$store.commit('options/setKioskMode', value);
    },
  },
  methods: {
    loadContentFromTag(tag) {
      const element = document.querySelector(tag);
      if (element.tagName !== 'SCRIPT') {
        throw new Error(
          'Please reference a script-tag in the load-url attribute to load the content from.'
        );
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
    loadContentFromObject(content) {
      const result = this.parseContent(content);
      if (result) {
        this.status = 'ready';
      } else {
        this.status = 'error';
      }
    },
    parseContent(content) {
      const languages = content.languages.map((language) => language.code);
      if (languages.length === 0) {
        console.error('No translation loaded, because no languages were configured.'); // eslint-disable-line no-console
      }

      // Add languages to store
      _forEach(content.languages, (language, index) => {
        this.$store.commit('languages/addLanguage', {
          index,
          name: language.name,
          code: language.code,
          direction: language.direction,
          overwrites: language.overwrites ?? null,
          loadFromUrl: language['load-from-url'] ?? false,
          loadFromTag: language['load-from-tag'] ?? false,
        });
        if (typeof language['load-from-tag'] === 'string') {
          this.$store.dispatch('languages/preloadLanguage', { code: language.code });
        }
      });
      this.$store.dispatch('languages/setBrowserLanguageAsFallback');

      // If a default language is provided from the outside (e.g. from a parent router), set it
      if (this.language && this.$store.getters['languages/usesFallback']) {
        this.$store.commit('languages/activateLanguage', { code: this.language });
      }

      // Set up algorithm
      this.$store.dispatch('algorithm/activateAlgorithm', {
        algorithm: _get(content, 'algorithm', 'cityblock/approve-neutral-reject'),
      });

      // Extract translations from content
      const translations = {};
      this.readTranslation(content, 'title', translations);
      this.readTranslation(content, 'subtitle', translations);
      this.readTranslation(content, 'introduction.heading', translations);
      this.readTranslation(content, 'introduction.text', translations);

      // Set up analysis
      this.$store.commit('analysis/setEndpoint', _get(content, 'analysis.endpoint', null));
      this.readTranslation(content, 'analysis.institution', translations);
      this.readTranslation(content, 'analysis.survey', translations);

      // Extract footer links
      _forEach(content['footer-links'], (link, index) => {
        this.readTranslation(content, `footer-links.${index}.text`, translations);
        this.readTranslation(content, `footer-links.${index}.href`, translations);
        this.$store.commit('footerLinks/addLink', {
          index,
        });
      });

      // Read content for theses and extract translations
      _forEach(content.theses, (thesis, index) => {
        this.readTranslation(content, `theses.${index}.title`, translations, true);
        this.readTranslation(content, `theses.${index}.statement`, translations);
        const positions = {};
        _forEach(content.parties, (party) => {
          this.readTranslation(
            content,
            `theses.${index}.positions.${party.alias}.explanation`,
            translations
          );
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
          selected: content.parties.length > 9, // preselect all parties if there are too many
          logo: party.logo === undefined ? null : party.logo,
        });
      });

      _forEach(translations, (translation, language) => {
        this.$i18n.mergeLocaleMessage(language, translation);
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
      setLocale(locale); // vee-validate
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
      _forEach(translations, (translation, language) =>
        _set(to, `${language}.${path}`, translation)
      );
      return to;
    },
  },
};
</script>

<style lang="scss">
#oec-wrapper {
  font-family: Arial, sans-serif;
  color: #222;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  &::before {
    content: '';
    position: fixed;
    z-index: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(
      0deg,
      var(--theme-dark-background) 0%,
      var(--theme-dark-background) 50%,
      #fff 50%,
      #fff 100%
    );
  }
}

.oec-wrapper__page {
  position: relative;
  z-index: 1;
}
</style>

<style lang="scss" scoped>
.oec-wrapper__loading {
  background: #fff;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  font-size: 4rem;
  line-height: 1;
  .icon {
    position: relative;
    left: -50%;
    top: -2rem;
  }
}

.oec-wrapper__loading-icon {
  color: var(--theme-primary-color);
  position: absolute;
  top: 50%;
  left: 50%;
}

.oec-wrapper__loading--error .oec-wrapper__loading-icon {
  color: var(--theme-negative-background);
}
</style>

<template>
  <div id="oec-wrapper">
    <router-view/>
  </div>
</template>

<script>
import _assign from 'lodash/assign';
import _forEach from 'lodash/forEach';
import _map from 'lodash/map';

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
  created() {
    this.setLocale(this.language);
    this.readTranslations(this.$slots.default[0].text);
  },
  watch: {
    language(value) {
      this.setLocale(value);
    },
  },
  methods: {
    setLocale(locale) {
      this.$i18n.locale = locale;
    },
    readTranslations(json) {
      const translations = JSON.parse(json);
      _forEach(translations, (translation, language) => {
        this.$i18n.setLocaleMessage(language, translation);
        this.$root.theses = translation.theses;
        this.$root.parties = _map(translation.parties, party => _assign(party, {
          selected: false,
        }));
      });
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

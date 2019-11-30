<template>
  <div id="oec-wrapper">
    <router-view/>
  </div>
</template>

<script>
import _forEach from 'lodash/forEach';

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
</style>

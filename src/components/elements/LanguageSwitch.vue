<template>
  <nav class="language-switch">
    <Modal
      :visible="visible"
      :heading="$t('heading')"
      :description="$t('description')"
      name="language"
      width="slim"
      icon="language"
      @close="$emit('close')"
    >
      <ul
        class="language-switch__menu"
        role="menu"
      >
        <li
          v-for="language in languages"
          :key="language.code"
          class="language-switch__item"
          role="menuitem"
        >
          <BaseButton
            theme="neutral"
            text-align="left"
            @click="activateLanguage(language)"
          >
            {{ language.name }}
          </BaseButton>
        </li>
      </ul>
    </Modal>
  </nav>
</template>

<script lang="js">
export default {
  name: 'LanguageSwitch',
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    languages() {
      return this.$store.getters['languages/languages'];
    },
  },
  methods: {
    activateLanguage({ code }) {
      this.$store.commit('languages/activateLanguage', { code });
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/core.scss";

.language-switch__menu {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.language-switch__item {
  & + & {
    margin-top: 1em;
  }
  button {
    width: 100%;
  }
}
</style>

<i18n>
{
  "en": {
    "button": "Languages",
    "heading": "Languages",
    "description": "Please choose your preferred language."
  },
  "de": {
    "button": "Sprachen",
    "heading": "Sprachen",
    "description": "Bitte wähle deine bevorzugte Sprache."
  }
}
</i18n>

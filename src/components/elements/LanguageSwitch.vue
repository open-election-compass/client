<template>
  <nav class="language-switch">
    <ModalView
      :visible="visible"
      :heading="$t('elements.language-switch.heading')"
      :description="$t('elements.language-switch.description')"
      name="language"
      width="wide"
      icon="language"
      @close="$emit('close')"
    >
      <ul class="language-switch__menu" role="menu">
        <li
          v-for="language in languages"
          :key="language.code"
          class="language-switch__item"
          role="menuitem"
        >
          <BaseButton
            v-if="language.loadFromUrl === false && language.loadFromTag === false"
            theme="neutral"
            text-align="left"
            @click="activateLanguage(language)"
          >
            {{ language.name }}
          </BaseButton>
          <AsyncButton
            v-else
            theme="neutral"
            text-align="left"
            :action="load(language)"
            @success="activateLanguage(language)"
          >
            {{ language.name }}
          </AsyncButton>
        </li>
      </ul>
    </ModalView>
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
    load({ code }) {
      return () => {
        return this.$store.dispatch('languages/preloadLanguage', { code });
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.language-switch__menu {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.75em;
}

@media (min-width: 25rem) {
  .language-switch__menu {
    grid-auto-columns: 1fr;
    grid-template-rows: max-content max-content max-content max-content max-content;
    grid-auto-flow: column;
  }
}

.language-switch__item {
  button {
    width: 100%;
  }
}

:deep(.async-button) {
  width: 100%;
}
</style>

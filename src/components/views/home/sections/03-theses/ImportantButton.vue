<template>
  <div :class="{
    'important-button': true,
    'important-button--disabled': disabled,
    'important-button--active': active,
  }">
    <tooltip
      class="tooltip"
      :content="$tc('too-many-important', maxImportant)"
      :enabled="!tooltipDisabled"
      :a11y="false"
      size="large"
      trigger="mouseenter focusin"
    >
      <label
        :for="name"
        class="important-button__button"
        :aria-label="$t('important-aria')"
      >
        <input
          class="sr-only"
          type="checkbox"
          :name="name"
          :id="name"
          v-model="cache"
          :true-value="2"
          :false-value="1"
          :disabled="disabled"
        />
        <Icon :name="factor === 1 ? 'circle' : 'exclamation-circle'" />
        <span>
          {{ $t('important') }}
        </span>
      </label>
    </tooltip>
  </div>
</template>

<script>
export default {
  name: 'ImportantButton',
  data() {
    return {
      cache: 1,
    };
  },
  model: {
    prop: 'factor',
    event: 'change',
  },
  props: {
    disabled: {
      type: Boolean,
      required: true,
    },
    tooltipDisabled: {
      type: Boolean,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    factor: {
      type: Number,
      required: true,
    },
    maxImportant: {
      type: Number,
      required: true,
    },
  },
  watch: {
    factor(factor) {
      this.cache = factor;
    },
    cache(cache) {
      this.$emit('change', cache);
    },
  },
  computed: {
    active() {
      return this.factor > 1;
    },
  },
};
</script>

<!-- eslint-disable max-len -->
<i18n>
{
  "en": {
    "important": "Important to me",
    "important-aria": "Important – marks this thesis as important for you.",
    "too-many-important": "There are only very few theses, so you cannot mark one as important. | Please mark no more than 1 thesis as important to receive a meaningful result! | Please mark no more than {count} theses as important to receive a meaningful result!"
  },
  "de": {
    "important": "Wichtig für mich",
    "important-aria": "Wichtig – markiert diese These als wichtig für dich.",
    "too-many-important": "Es gibt nur sehr wenige Thesen, du kannst daher keine als wichtig markieren. | Bitte markiere nicht mehr als 1 These als wichtig um ein aussagekräftiges Ergebnis zu erhalten! | Bitte markiere nicht mehr als {count} Thesen als wichtig um ein aussagekräftiges Ergebnis zu erhalten!"
  }
}
</i18n>
<!-- eslint-enable max-len -->

<style lang="scss">
.important-button {
  display: inline-block;
  transition: opacity 0.2s ease-out;
  &.important-button--disabled {
    opacity: 0.25;
  }
}

.important-button__button {
  display: inline-block;
  padding: 0.75em 1em 0.75em 0.75em;
  cursor: pointer;
  font-size: 0.875em;
  border-radius: 9999px;
  border: 1px solid var(--theme-neutral-border);
  transition-property: background-color, border-color, color, opacity, box-shadow;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;
  box-shadow: var(--shadow-normal);
  background-color: var(--theme-neutral-background);
  color: var(--theme-neutral-text);
  &:hover {
    box-shadow: var(--shadow-hover);
  }
  &:focus {
    box-shadow: var(--shadow-focus);
  }
  @media (min-width: 40em) {
    font-size: 1em;
  }
  @media (min-width: 48em) {
    font-size: 1.125em;
  }
  @media (min-width: 64em) {
    font-size: 1.25em;
  }
  span {
    margin-left: 0.75em;
    font-weight: bold;
  }
}

.important-button--active .important-button__button {
  background-color: var(--theme-primary-background);
  color: #fff;
  border-color: var(--theme-primary-border);
}
</style>

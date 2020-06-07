<template>
  <component
    :is="tag"
    class="base-button"
    :class="classes"
    :disabled="disabled"
    :tabindex="disabled ? -1 : tabindex"
    :href="tag === 'a' ? href : undefined"
    :type="tag === 'button' ? type : undefined"
    @click="onClick"
  >
    <span
      v-if="left"
      class="base-button__left-icon"
    >
      <Icon :name="left" monospace />
    </span>
    <span
      v-if="$slots.default"
      class="base-button__caption"
    >
      <slot />
    </span>
    <span
      v-if="right"
      class="base-button__right-icon"
    >
      <Icon :name="right" monospace />
    </span>
  </component>
</template>

<script lang="js">
import Icon from './Icon.vue';

export default {
  name: 'BaseButton',
  components: {
    Icon,
  },
  props: {
    tag: {
      type: String,
      default: 'button',
      validator: (value) => ['button', 'a'].includes(value),
    },
    href: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: 'button',
      validator: (value) => ['button', 'submit', 'reset'].includes(value),
    },
    theme: {
      type: String,
      default: 'primary',
      validator: (value) => [
        'primary', 'positive', 'neutral', 'negative', 'white', 'primary-dark',
      ].includes(value),
    },
    size: {
      type: String,
      default: 'normal',
      validator: (value) => ['small', 'normal', 'big'].includes(value),
    },
    textAlign: {
      type: String,
      default: 'center',
      validator: (value) => ['left', 'center'].includes(value),
    },
    left: {
      type: String,
      default: '',
    },
    right: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    tabindex: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    classes() {
      const classes = [
        `base-button--theme-${this.theme}`,
        `base-button--size-${this.size}`,
        `base-button--text-align-${this.textAlign}`,
      ];
      if (this.disabled) {
        classes.push('base-button--disabled');
      }
      return classes;
    },
  },
  methods: {
    onClick(event) {
      if (this.disabled) {
        event.preventDefault();
        return;
      }
      if (this.tag === 'button') {
        event.preventDefault();
      }
      this.$emit('click', event);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/core';

.base-button {
  display: inline-block;
  font-weight: 500;
  border: 0;
  border-radius: $border-radius;
  box-shadow: $shadow-normal;
  cursor: pointer;
  transition: all 0.2s ease-out;
  appearance: none;

  small {
    display: block;
    margin-top: 0.25em;
    color: rgba(#000, 0.5);
    font-weight: normal;
    font-size: 0.75em;
  }

  &:hover {
    outline: none;
    box-shadow: $shadow-hover;
  }

  &:focus {
    outline: none;
    box-shadow: $shadow-focus;
  }

  &.base-button--theme-primary:disabled
  &.base-button--theme-primary.base-button--disabled,
  &.base-button--theme-positive:disabled
  &.base-button--theme-positive.base-button--disabled,
  &.base-button--theme-neutral:disabled
  &.base-button--theme-neutral.base-button--disabled,
  &.base-button--theme-negative:disabled
  &.base-button--theme-negative.base-button--disabled,
  &.base-button--theme-white:disabled
  &.base-button--theme-white.base-button--disabled,
  &.base-button--theme-primary-dark:disabled
  &.base-button--theme-primary-dark.base-button--disabled {
    box-shadow: $shadow-normal !important;
    cursor: default;
    opacity: 0.25;
  }

  &.base-button--theme-primary {
    color: $theme-primary-text;
    background-color: $theme-primary-background;
    border: 1px solid $theme-primary-border;
  }

  &.base-button--theme-primary:hover {
    background-color: lighten($theme-primary-background, 10%);
    border-color: lighten($theme-primary-border, 10%);
  }

  &.base-button--theme-primary:focus {
    border-color: transparent;
  }

  &.base-button--theme-positive {
    color: $theme-positive-text;
    background-color: $theme-positive-background;
    border: 1px solid $theme-positive-border;
  }

  &.base-button--theme-positive:hover {
    background-color: lighten($theme-positive-background, 10%);
    border-color: lighten($theme-positive-border, 10%);
  }

  &.base-button--theme-positive:focus {
    border-color: transparent;
  }

  &.base-button--theme-neutral {
    color: $theme-neutral-text;
    background-color: $theme-neutral-background;
    border: 1px solid $theme-neutral-border;
  }

  &.base-button--theme-neutral:hover {
    background-color: lighten($theme-neutral-background, 2%);
    border-color: lighten($theme-neutral-border, 2%);
  }

  &.base-button--theme-neutral:focus {
    border-color: transparent;
  }

  &.base-button--theme-negative {
    color: $theme-negative-text;
    background-color: $theme-negative-background;
    border: 1px solid $theme-negative-border;
  }

  &.base-button--theme-negative:hover {
    background-color: lighten($theme-negative-background, 10%);
    border-color: lighten($theme-negative-border, 10%);
  }

  &.base-button--theme-negative:focus {
    border-color: transparent;
  }

  &.base-button--theme-white {
    color: $theme-white-text;
    background-color: $theme-white-background;
    border: 1px solid $theme-white-border;
  }

  &.base-button--theme-white:hover {
    background-color: lighten($theme-white-background, 10%);
    border-color: lighten($theme-white-border, 10%);
  }

  &.base-button--theme-white:focus {
    border-color: transparent;
  }

  &.base-button--theme-primary-dark {
    color: $theme-primary-dark-text;
    background-color: $theme-primary-dark-background;
    border: 1px solid $theme-primary-dark-border;
  }

  &.base-button--theme-primary-dark:hover,
  &.base-button--theme-primary-dark:focus {
    background-color: lighten($theme-primary-dark-background, 10%);
    border-color: lighten($theme-primary-dark-border, 10%);
  }

  &.base-button--size-small {
    padding: 0.75em 1em;
    font-size: 0.875em;
  }

  &.base-button--size-normal {
    padding: 0.65em 0.875em;
    font-size: 1.25em;
  }

  &.base-button--size-big {
    padding: 2em 3em;
    font-size: 1.5em;
  }

  &.base-button--text-align-center {
    text-align: center;
  }

  &.base-button--text-align-left {
    text-align: left;
  }
}

@media (prefers-reduced-motion) {
  .base-button {
    transition: none;
  }
}

.base-button__left-icon {
  display: inline-block;
  margin-right: 1em;
  color: inherit;
}

.base-button__right-icon {
  display: inline-block;
  margin-left: 1em;
  color: inherit;
}

@media (min-width: 40em) {
  .base-button {
    font-size: 1.2em;
  }
}
</style>

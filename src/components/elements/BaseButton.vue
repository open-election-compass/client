<template>
  <component
    :is="tag"
    class="base-button"
    :class="classes"
    :disabled="disabled"
    :tabindex="disabled ? -1 : tabindex"
    :href="href"
    :type="type"
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
@import "../../styles/core.scss";

.base-button {
  border: none;
  border-radius: $border-radius;
  box-shadow: $shadow-normal;
  cursor: pointer;
  transition: all 0.2s ease-out;
  font-weight: 500;
  small {
    display: block;
    font-weight: normal;
    color: rgba(#000, 0.5);
    margin-top: 0.25em;
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
  &.base-button--theme-primary {
    background-color: $theme-primary-background;
    border: 1px solid $theme-primary-border;
    color: $theme-primary-text;
    &:hover {
      background-color: lighten($theme-primary-background, 10%);
      border-color: lighten($theme-primary-border, 10%);
    }
    &:focus {
      border-color: transparent;
    }
  }
  &.base-button--theme-positive {
    background-color: $theme-positive-background;
    border: 1px solid $theme-positive-border;
    color: $theme-positive-text;
    &:hover {
      background-color: lighten($theme-positive-background, 10%);
      border-color: lighten($theme-positive-border, 10%);
    }
    &:focus {
      border-color: transparent;
    }
  }
  &.base-button--theme-neutral {
    background-color: $theme-neutral-background;
    border: 1px solid $theme-neutral-border;
    color: $theme-neutral-text;
    &:hover {
      background-color: lighten($theme-neutral-background, 2%);
      border-color: lighten($theme-neutral-border, 2%);
    }
    &:focus {
      border-color: transparent;
    }
  }
  &.base-button--theme-negative {
    background-color: $theme-negative-background;
    border: 1px solid $theme-negative-border;
    color: $theme-negative-text;
    &:hover {
      background-color: lighten($theme-negative-background, 10%);
      border-color: lighten($theme-negative-border, 10%);
    }
    &:focus {
      border-color: transparent;
    }
  }
  &.base-button--theme-white {
    background-color: $theme-white-background;
    border: 1px solid $theme-white-border;
    color: $theme-white-text;
    &:hover {
      background-color: lighten($theme-white-background, 10%);
      border-color: lighten($theme-white-border, 10%);
    }
    &:focus {
      border-color: transparent;
    }
  }
  &.base-button--theme-primary-dark {
    background-color: $theme-primary-dark-background;
    border: 1px solid $theme-primary-dark-border;
    color: $theme-primary-dark-text;
    &:hover {
      background-color: lighten($theme-primary-dark-background, 10%);
      border-color: lighten($theme-primary-dark-border, 10%);
    }
  }
  &.base-button--theme-primary,
  &.base-button--theme-positive,
  &.base-button--theme-neutral,
  &.base-button--theme-negative,
  &.base-button--theme-white,
  &.base-button--theme-primary-dark {
    &:disabled, &.base-button--disabled {
      opacity: 0.25;
      cursor: default;
      box-shadow: $shadow-normal !important;
    }
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

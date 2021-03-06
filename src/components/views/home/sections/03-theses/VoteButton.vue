<template>
  <button
    :class="{
      'vote-button': true,
      'vote-button--active': active,
      'vote-button--large-icons': largeIcons,
    }"
    :style="cssVariables"
    :aria-label="$t(`algorithm.options.${alias}.button-aria`)"
    role="checkbox"
    :aria-checked="active"
    @click="$emit('click', $event)"
  >
    <Icon class="vote-button__icon" :name="icon" />
    <div class="vote-button__caption">
      <span>
        {{ $t(`algorithm.options.${alias}.button`) }}
      </span>
    </div>
  </button>
</template>

<script>
export default {
  name: 'VoteButton',
  props: {
    alias: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    baseColor: {
      type: String,
      required: true,
    },
    contrastColor: {
      type: String,
      required: true,
    },
    darkerColor: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    largeIcons() { return this.$store.getters['algorithm/algorithm'].options.length > 3; },
    cssVariables() {
      return {
        '--darker-color': this.darkerColor,
        '--base-color': this.baseColor,
        '--contrast-color': this.contrastColor,
      };
    },
  },
};
</script>

<style lang="scss">
@import '@/styles/core';

.vote-button {
  width: 100%;
  text-align: left;
  padding: 1.25em;
  font-weight: bold;
  font-size: 0.875em;
  margin: 0.25em 0;
  line-height: 1;
  border: 1px solid $theme-neutral-border;
  transition-property: background-color, border-color, color, opacity, box-shadow;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;
  border-radius: $border-radius;
  box-shadow: $shadow-normal;
  background-color: $theme-neutral-background;
  color: var(--darker-color);
  &:hover {
    box-shadow: $shadow-hover;
  }
  &:focus {
    box-shadow: $shadow-focus;
  }
  &.vote-button--active {
    background-color: var(--base-color);
    color: var(--contrast-color);
    border-color: var(--darker-color);
  }
  @media (min-width: 40em) {
    font-size: 1em;
  }
  @media (min-width: 48em) {
    text-align: center;
    margin: 0 0.5em;
    font-size: 1.125em;
    flex: 1 1 0%;
  }
  @media (min-width: 64em) {
    font-size: 1.25em;
  }
}

.vote-button__icon {
  @media (min-width: 48em) {
    margin-bottom: 0.25em;
  }
}

@media (min-width: 48em) {
  .vote-button--large-icons {
    .vote-button__icon {
      font-size: 1.875em;
    }
    .vote-button__caption {
      font-size: 0.875em;
      min-height: 2em;
    }
  }
}

@media (min-width: 64em) {
  .vote-button--large-icons {
    .vote-button__icon {
      font-size: 2.25em;
    }
  }
}

.vote-button__caption {
  display: inline-block;
  margin-left: 1em;
  @media (min-width: 48em) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0.5em 0 0 0;
  }
}
</style>

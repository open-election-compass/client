<template>
  <div class="badge">
    <small class="badge__badge" :style="cssVariables">
      <Icon class="badge__icon" :name="icon" />
      <slot />
    </small>
  </div>
</template>

<script>
import Icon from '@/components/elements/Icon.vue';

export default {
  name: 'Badge',
  components: {
    Icon,
  },
  props: {
    icon: {
      type: String,
      required: true,
    },
    backgroundColor: {
      type: String,
      required: true,
    },
    textColor: {
      type: String,
      required: true,
    },
  },
  computed: {
    cssVariables() {
      return {
        '--color-background': this.backgroundColor,
        '--color-text': this.textColor,
      };
    },
  },
};
</script>

<style lang="scss">
.badge {
  display: block;
  padding-top: 0.5em;
}

.badge__badge {
  display: inline-block;
  border-radius: 9999px;
  padding: 0.5em 1em 0.5em 0.75em;
  background-color: var(--color-background);
  color: var(--color-text);
  font-weight: bold;
}

@media (min-width: 48em) {
  .badge {
    display: inline-block;
    font-size: 1.125em;
    padding-top: 0;
  }
  .badge + .badge {
    margin-left: 1em;
  }
}

.badge__icon {
  margin-right: 0.5em;
}
</style>

<template>
  <div class="statement-badge">
    <small class="statement-badge__badge" :style="cssVariables">
      <Icon class="statement-badge__icon" :name="icon" />
      <slot />
    </small>
  </div>
</template>

<script>
export default {
  name: 'StatementBadge',
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
.statement-badge {
  display: block;
  padding-top: 0.5em;
}

.statement-badge__badge {
  display: inline-block;
  border-radius: 9999px;
  padding: 0.5em 1em 0.5em 0.75em;
  background-color: var(--color-background);
  color: var(--color-text);
  font-weight: bold;
}

@media (min-width: 48em) {
  .statement-badge {
    display: inline-block;
    font-size: 1.125em;
    padding-top: 0;
  }
  .statement-badge + .statement-badge {
    margin-left: 1em;
  }
}

.statement-badge__icon {
  margin-right: 0.5em;
}
</style>

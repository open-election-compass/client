<template>
  <div
    :class="{
      'statement-text': true,
      'statement-text--status-empty': status === null,
      'statement-text--status-skip': status === 'skip',
    }"
    :style="cssVariables"
  >
    <!-- Counter and Title -->
    <small
      :class="{
        'statement-text__caption': true,
        'statement-text__caption--counter-only': !$root.$te(`theses.${index}.title`),
      }"
    >
      <span class="statement-text__counter" aria-hidden="true">
        {{ $t('views.home.theses.statement-text.thesis', { count: index + 1, total }) }}
      </span>
      <span v-if="$root.$te(`theses.${index}.title`)" class="statement-text__title">
        – {{ $t(`theses.${index}.title`) }}
      </span>
    </small>

    <!-- Statement -->
    <!-- eslint-disable-next-line vuejs-accessibility/heading-has-content -->
    <h3
      class="statement-text__thesis"
      :aria-label="
        $t('views.home.theses.statement-text.statement-aria', {
          statement: $t(`theses.${index}.statement`),
        })
      "
    >
      <bdi>
        <span class="statement-text__quote-start" aria-hidden="true">
          <span>{{ $t('views.home.theses.statement-text.quoteStart') }}</span>
        </span>
        <DefinitionsTooltip :text="$t(`theses.${index}.statement`)" /><span
          class="statement-text__quote-end"
          aria-hidden="true"
          ><span>{{ $t('views.home.theses.statement-text.quoteEnd') }}</span></span
        ><!-- eslint-disable-line max-len -->
      </bdi>
    </h3>

    <!-- Badges -->
    <div v-if="badge" class="statement-text__badges">
      <template v-if="badge">
        <StatementBadge
          :icon="option.icon"
          :backgroundColor="colors.base"
          :textColor="colors.contrast"
          :aria-label="badgeTextAria"
        >
          {{ badgeText }}
        </StatementBadge>
      </template>
      <template v-if="badge && factor > 1">
        <StatementBadge
          icon="exclamation-circle"
          backgroundColor="#FFD01C"
          textColor="#fff"
          :aria-label="$t(`views.home.theses.statement-text.statement-badge.important-aria`)"
        >
          {{ $t(`views.home.theses.statement-text.statement-badge.important`) }}
        </StatementBadge>
      </template>
    </div>
  </div>
</template>

<script>
import StatementBadge from '/src/components/views/home/sections/03-theses/StatementBadge.vue';
import DefinitionsTooltip from '/src/components/elements/DefinitionsTooltip.vue';

export default {
  name: 'StatementText',
  components: {
    StatementBadge,
    DefinitionsTooltip,
  },
  props: {
    index: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: null,
    },
    factor: {
      type: Number,
      default: 1,
    },
    badge: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    algorithm() {
      return this.$store.getters['algorithm/algorithm'];
    },
    skipped() {
      return this.status === null || this.status === 'skip';
    },
    option() {
      if (this.skipped) {
        return {
          icon: 'question',
          direction: 'neutral',
        };
      }
      return this.algorithm.options.find((option) => option.alias === this.status);
    },
    colors() {
      if (this.skipped) {
        return {
          base: '#a0aec0',
          contrast: '#fff',
        };
      }
      return this.algorithm.options.find((option) => option.alias === this.status).colors;
    },
    total() {
      return this.$store.getters['theses/total'];
    },
    badgeText() {
      if (this.skipped) {
        return this.$t('views.home.theses.statement.badge.skip');
      }
      return this.$t(`algorithm.options.${this.option.alias}.badge`);
    },
    badgeTextAria() {
      if (this.skipped) {
        return this.$t('views.home.theses.statement.badge.skip-aria');
      }
      return this.$t(`algorithm.options.${this.option.alias}.badge-aria`);
    },
    cssVariables() {
      return {
        '--base-color': this.colors.base,
        '--base-contrast': this.colors.contrast,
      };
    },
  },
};
</script>

<style lang="scss">
.statement-text__caption {
  display: block;
  text-align: left;
  margin-bottom: 1em;
  font-size: 0.875em;
  &.statement-text__caption--counter-only {
    text-align: center;
  }
  @media (min-width: 40em) {
    padding-bottom: 2em;
    font-size: 1em;
  }
  @media (min-width: 64em) {
    font-size: 1.25em;
  }
}

.statement-text__counter {
  font-weight: bold;
  color: var(--theme-primary-text);
}

.statement-text__title {
  color: #777;
}

.statement-text__thesis {
  color: var(--base-color);
  font-size: 1.35em;
  line-height: 1.25;
  font-weight: bold;
  display: block;
  transition: color 0.2s ease-out;
  overflow-wrap: break-word;
  @media (min-width: 40em) {
    font-size: 1.875em;
    max-width: 42rem;
  }
  @media (min-width: 48em) {
    font-size: 2.25em;
  }
  @media (min-width: 64em) {
    font-size: 3em;
    max-width: 48rem;
  }
}

.statement-text.statement-text--status-empty,
.statement-text.statement-text--status-skip {
  .statement-text__thesis {
    color: var(--theme-primary-color);
  }
}
.statement-text.statement-text--status-skip .statement-text__thesis {
  text-decoration: line-through;
}

.statement-text__quote-start {
  position: relative;
  color: #e2e8f0;
  span {
    position: absolute;
    right: 100%;
  }
  [dir='rtl'] &,
  [dir='rtl'] & span {
    position: static;
  }
}

.statement-text__quote-end {
  color: #e2e8f0;
  [dir='rtl'] & {
    position: relative;
    span {
      position: absolute;
      left: 100%;
    }
  }
}

.statement-text__badges {
  margin-top: 2em;
}
</style>

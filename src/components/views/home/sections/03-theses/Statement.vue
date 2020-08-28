<template>
  <div
    :class="{
      statement: true,
      'statement--status-empty': status === null,
      'statement--status-skip': status === 'skip',
    }"
    :style="cssVariables"
  >
    <!-- Counter and Title -->
    <small :class="{
      'statement__caption': true,
      'statement__caption--counter-only': !$root.$te(`theses.${index}.title`),
    }">
      <span
        class="statement__counter"
        aria-hidden="true"
      >
        {{ $t('thesis', { count: index + 1, total }) }}
      </span>
      <span v-if="$root.$te(`theses.${index}.title`)" class="statement__title">
        – {{ $t(`theses.${index}.title`) }}
      </span>
    </small>

    <!-- Statement -->
    <h3
      class="statement__thesis"
      :aria-label="$t('statement-aria', { statement: $t(`theses.${index}.statement`) })"
    >
      <span class="statement__quote-start" aria-hidden="true">
        <span>{{ $t('quoteStart') }}</span>
      </span>
      <Definitions :text="$t(`theses.${index}.statement`)" /><span class="statement__quote-end" aria-hidden="true">{{ $t('quoteEnd') }}</span><!-- eslint-disable-line max-len -->
    </h3>

    <!-- Badges -->
    <div v-if="badge" class="statement__badges">
      <template v-if="badge">
        <Badge
          :icon="option.icon"
          :backgroundColor="colors.base"
          :textColor="colors.contrast"
          :aria-label="badgeTextAria"
        >
          {{ badgeText }}
        </Badge>
      </template>
      <template v-if="badge && factor > 1">
        <Badge
          icon="exclamation-circle"
          backgroundColor="#FFD01C"
          textColor="#fff"
          :aria-label="$t(`badge.important-aria`)"
        >
          {{ $t(`badge.important`) }}
        </Badge>
      </template>
    </div>
  </div>
</template>

<script>
import Badge from '@/components/views/home/sections/03-theses/Badge.vue';
import Definitions from '@/components/elements/Definitions.vue';

export default {
  name: 'Statement',
  components: {
    Badge,
    Definitions,
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
        return this.$t('badge.skip');
      }
      return this.$t(`algorithm.options.${this.option.alias}.badge`);
    },
    badgeTextAria() {
      if (this.skipped) {
        return this.$t('badge.skip-aria');
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

<i18n>
{
  "en": {
    "thesis": "Thesis {count} / {total}",
    "statement-aria": "The thesis is: '{statement}'",
    "quoteStart": "‘",
    "quoteEnd": "’",
    "badge": {
      "skip": "You skipped this",
      "skip-aria": "You skipped this thesis.",
      "important": "You marked this as important",
      "important-aria": "You marked this thesis as important."
    }
  },
  "de": {
    "thesis": "These {count} / {total}",
    "statement-aria": "Die These lautet: '{statement}'",
    "quoteStart": "„",
    "quoteEnd": "“",
    "badge": {
      "skip": "Übersprungen",
      "skip-aria": "Du hast diese These übersprungen.",
      "important": "Von dir als wichtig markiert",
      "important-aria": "Du hast diese These als wichtig markiert."
    }
  }
}
</i18n>

<style lang="scss">
.statement__caption {
  display: block;
  text-align: left;
  margin-bottom: 1em;
  font-size: 0.875em;
  &.statement__caption--counter-only {
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

.statement__counter {
  font-weight: bold;
  color: var(--theme-primary-text);
}

.statement__title {
  color: #777;
}

.statement__thesis {
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

.statement.statement--status-empty, .statement.statement--status-skip {
  .statement__thesis {
    color: var(--theme-primary-color);
  }
}
.statement.statement--status-skip .statement__thesis {
  text-decoration: line-through;
}

.statement__quote-start {
  position: relative;
  color: #e2e8f0;
  span {
    position: absolute;
    right:100%;
  }
}

.statement__quote-end {
  color: #e2e8f0;
}

.statement__badges {
  margin-top: 2em;
}
</style>

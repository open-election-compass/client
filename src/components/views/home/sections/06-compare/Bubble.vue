<template>
  <div class="bubble" :class="classes" :style="cssVariables">
    <blockquote class="bubble__quote" :aria-label="answerTextAria">
      <p
        class="bubble__bubble"
        aria-hidden="true"
      >
        <ShowMore :text="content" :length="showMoreLimit" />
      </p>
      <footer class="bubble__footer" aria-hidden="true">
        <cite>
          <span class="bubble__party">
            {{ $t(`parties.${party.index}.short`) }}
          </span>
          <span class="bubble__status">
            <Badge
              :icon="statusIcon"
              :background-color="statusBackgroundColor"
              :text-color="statusTextColor"
            >
              {{ statusText }}
            </Badge>
          </span>
        </cite>
      </footer>
    </blockquote>
  </div>
</template>

<script>
import Badge from '@/components/views/home/sections/03-theses/Badge.vue';
import ShowMore from '@/components/elements/ShowMore.vue';

export default {
  name: 'Bubble',
  components: {
    Badge,
    ShowMore,
  },
  props: {
    party: {
      type: Object,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    direction: {
      type: String,
      validator: (value) => ['positive', 'neutral', 'negative'].includes(value),
    },
    statusIcon: {
      type: String,
      required: true,
    },
    statusText: {
      type: String,
      required: true,
    },
    answerTextAria: {
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
    statusBackgroundColor: {
      type: String,
      required: true,
    },
    statusTextColor: {
      type: String,
      required: true,
    },
    showMoreLimit: {
      type: Number,
      default: 250,
    },
  },
  computed: {
    classes() {
      return [
        `bubble--${this.direction}`,
      ];
    },
    cssVariables() {
      return {
        '--bubble-background': this.backgroundColor,
        '--bubble-text': this.textColor,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.bubble {
  @media (min-width: 80em) {
    &.bubble--positive {
      transform: translateX(-8rem);
    }
    &.bubble--negative {
      transform: translateX(8rem);
    }
  }
  @media (min-width: 100em) {
    &.bubble--positive {
      transform: translateX(-14rem);
    }
    &.bubble--negative {
      transform: translateX(14rem);
    }
  }
}

.bubble__quote {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
}

@media (min-width: 64em) {
  .bubble--positive .bubble__quote,
  .bubble--negative .bubble__quote {
    flex-direction: row;
  }
}

.bubble__bubble {
  border-radius: 0.25rem;
  padding: 1rem;
  position: relative;
  order: 2;
  background-color: var(--bubble-background);
  color: var(--bubble-text);
  &::before {
    position: absolute;
    content: '';
    top: -1rem;
    left: 50%;
    margin-left: -1rem;
    border-width: 0 1rem 1rem 1rem;
    border-color: transparent transparent var(--bubble-background) transparent;
    border-style: solid;
  }
  @media (min-width: 64em) {
    flex: 1 1 auto;
  }
  @media (min-width: 80em) {
    max-width: 42rem;
  }
}

@media (min-width: 64em) {
  .bubble__bubble {
    padding: 2em;
    font-size: 1.125em;
  }
  .bubble--positive .bubble__bubble::before {
    top: 2rem;
    left: 0;
    border-width: 1rem 1rem 1rem 0;
    border-color: transparent var(--bubble-background) transparent transparent;
  }
  .bubble--neutral .bubble__bubble {
    margin-right: auto;
    margin-left: auto;
    align-self: center;
  }
  .bubble--negative .bubble__bubble {
    order: 1;
    &::before {
      top: 2rem;
      left: auto;
      right: -1rem;
      border-color: transparent transparent transparent var(--bubble-background);
      border-width: 1rem 0 1rem 1rem;
    }
  }
}

.bubble__footer {
  order: 1;
  flex: none;
  text-align: center;
  margin-bottom: 2em;
  cite {
    font-style: normal;
  }
  @media (min-width: 48em) {
    margin-bottom: 2.5em;
  }
}

.bubble__party {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5em;
  padding: 0 0.25em;
  @media (min-width: 48em) {
    font-size: 1.125em;
  }
  @media (min-width: 64em) {
    font-size: 1.25em;
  }
}

.bubble__status {}

@media (min-width: 64em) {
  .bubble--positive .bubble__footer {
    margin-right: 3em;
    margin-bottom: 0;
    padding: 1.5em 0;
    .bubble__party {
      text-align: right;
    }
  }

  .bubble--neutral .bubble__footer {
    margin-bottom: 3em;
  }

  .bubble--negative .bubble__footer {
    order: 2;
    margin-left: 3em;
    margin-bottom: 0;
    padding: 1.5em 0;
    .bubble__party {
      text-align: left;
    }
  }
}
</style>

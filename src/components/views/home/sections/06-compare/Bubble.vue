<template>
  <div class="bubble" :class="classes" :style="cssVariables">
    <blockquote class="bubble__quote" :aria-label="answerTextAria">
      <p
        class="bubble__bubble"
        aria-hidden="true"
      >
        <show-more :text="content" :length="showMoreLimit" />
      </p>
      <footer class="bubble__footer" aria-hidden="true">
        <cite>
          <span class="bubble__party">
            {{ $t(`parties.${party.index}.short`) }}
          </span>
          <span class="bubble__status">
            <icon :name="statusIcon" />
            <span>
              {{ statusText }}
            </span>
          </span>
        </cite>
      </footer>
    </blockquote>
  </div>
</template>

<script>
export default {
  name: 'Bubble',
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
        '--bubble-status-background': this.statusBackgroundColor,
        '--bubble-status-text': this.statusTextColor,
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
  cite {
    font-style: normal;
    display: block;
    margin-bottom: 2em;
    text-align: center;
    @media (min-width: 48em) {
      font-size: 1.125em;
    }
    @media (min-width: 64em) {
      font-size: 1.25em;
    }
  }
}

@media (min-width: 64em) {
  .bubble--positive .bubble__footer cite {
    text-align: right;
    padding: 1.5em 0;
    margin-right: 3em;
  }

  .bubble--neutral .bubble__footer cite {
    margin-bottom: rem;
  }

  .bubble--negative .bubble__footer {
    order: 2;
    cite {
      text-align: left;
      padding: 1.5em 0;
      margin-left: 3em;
    }
  }
}

.bubble__party {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5em;
}

.bubble__status {
  display: inline-block;
  font-size: 0.875em;
  background-color: var(--bubble-status-background);
  color: var(--bubble-status-text);
  border-radius: 9999px;
  padding: 0.5em 0.75em 0.5em 0.5em;
  .icon {
    margin-right: 0.25em;
  }
  span {
    font-weight: bold;
  }
}
</style>

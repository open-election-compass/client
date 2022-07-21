<template>
  <div :class="classes">
    <ChatBubble
      :party="party"
      :content="content"
      :direction="option.direction"
      :statusIcon="option.icon"
      :statusText="statusText"
      :answerTextAria="answerTextAria"
      :background-color="colors.lighter"
      :text-color="colors.darker"
      :status-background-color="colors.base"
      :status-text-color="colors.contrast"
    />
  </div>
</template>

<script>
import ChatBubble from './ChatBubble.vue';

export default {
  name: 'FullAnswer',
  components: {
    ChatBubble,
  },
  props: {
    party: {
      type: Object,
      required: true,
    },
    thesis: {
      type: Object,
      required: true,
    },
  },
  computed: {
    algorithm() {
      return this.$store.getters['algorithm/algorithm'];
    },
    position() {
      return this.thesis.positions[this.party.alias];
    },
    skipped() {
      return this.position === null || this.position === 'skip';
    },
    option() {
      if (this.skipped) {
        return {
          icon: 'question',
          direction: 'neutral',
        };
      }
      return this.algorithm.options.find((option) => option.alias === this.position);
    },
    content() {
      // TODO: This is not a nice implementation.
      if (this.skipped) {
        return this.$t('views.home.compare.answer.skip.content', {
          party: this.$t(`parties.${this.party.index}.name`),
        });
      }
      if (
        !this.$te(`theses.${this.thesis.index}.positions.${this.party.alias}.explanation`) &&
        !this.$te(
          `theses.${this.thesis.index}.positions.${this.party.alias}.explanation`,
          this.$store.getters['languages/fallback'].code
        ) &&
        !this.$root.$te(`theses.${this.thesis.index}.positions.${this.party.alias}.explanation`)
      ) {
        return this.$t('views.home.compare.answer.empty.content', {
          party: this.$t(`parties.${this.party.index}.name`),
        });
      }
      if (
        !this.$te(`theses.${this.thesis.index}.positions.${this.party.alias}.explanation`) &&
        this.$te(
          `theses.${this.thesis.index}.positions.${this.party.alias}.explanation`,
          this.$store.getters['languages/fallback'].code
        ) &&
        !this.$root.$te(`theses.${this.thesis.index}.positions.${this.party.alias}.explanation`)
      ) {
        return this.$t(
          `theses.${this.thesis.index}.positions.${this.party.alias}.explanation`,
          this.$store.getters['languages/fallback'].code
        );
      }
      const explanation = this.$t(
        `theses.${this.thesis.index}.positions.${this.party.alias}.explanation`
      ).trim();
      if (explanation === '') {
        return this.$t('views.home.compare.answer.empty.content', {
          party: this.$t(`parties.${this.party.index}.name`),
        });
      }
      return explanation;
    },
    colors() {
      if (this.skipped) {
        return {
          base: '#A0AEC0',
          contrast: '#FFFFFF',
          darker: '#718096',
          lighter: '#EDF2F7',
        };
      }
      return this.option.colors;
    },
    statusText() {
      if (this.skipped) {
        return this.$t('views.home.compare.answer.skip.status-text');
      }
      return this.$t(`algorithm.options.${this.option.alias}.status`);
    },
    answerTextAria() {
      if (this.skipped) {
        return this.$t('views.home.compare.answer.skip.content', {
          party: this.$t(`parties.${this.party.index}.name`),
        });
      }
      return this.$t(`algorithm.options.${this.option.alias}.answer-aria`, {
        party: this.$t(`parties.${this.party.index}.name`),
        answer: this.$t(`theses.${this.thesis.index}.positions.${this.party.alias}.explanation`),
      });
    },
    classes() {
      return ['full-answer', `full-answer--${this.option.direction}`];
    },
  },
};
</script>

<style lang="scss" scoped>
.full-answer {
  margin-top: 3em;
  @media (min-width: 64em) {
    &.full-answer--positive,
    &.full-answer--negative {
      margin-top: 6em;
    }
    &.full-answer--neutral {
      margin-top: 5em;
    }
  }
}
</style>

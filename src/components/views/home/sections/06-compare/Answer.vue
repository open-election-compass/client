<template>
  <div :class="classes">
    <Bubble
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
import Bubble from './Bubble.vue';

export default {
  name: 'Answer',
  components: {
    Bubble,
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
      if (this.skipped) {
        return this.$t('skip.content', { party: this.$t(`parties.${this.party.index}.name`) });
      }
      return this.$t(`theses.${this.thesis.index}.positions.${this.party.alias}.explanation`);
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
        return this.$t('skip.status-text');
      }
      return this.$t(`algorithm.options.${this.option.alias}.status`);
    },
    answerTextAria() {
      if (this.skipped) {
        return this.$t('skip.content', { party: this.$t(`parties.${this.party.index}.name`) });
      }
      return this.$t(`algorithm.options.${this.option.alias}.answer-aria`, {
        party: this.$t(`parties.${this.party.index}.name`),
        answer: this.$t(`theses.${this.thesis.index}.positions.${this.party.alias}.explanation`),
      });
    },
    classes() {
      return [
        'answer',
        `answer--${this.option.direction}`,
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
.answer {
  margin-top: 3em;
  @media (min-width: 64em) {
    &.answer--positive, &.answer--negative {
      margin-top: 6em;
    }
    &.answer--neutral {
      margin-top: 5em;
    }
  }
}
</style>

<!-- eslint-disable max-len -->
<i18n>
{
  "en": {
    "skip": {
      "status-text": "unknown",
      "content": "The party '{party}' did not provide any answers or position regarding this thesis."
    }
  },
  "de": {
    "skip": {
      "status-text": "unbekannt",
      "content": "Die Partei '{party}' hat keine Position oder Begründung für diese These bereitgestellt."
    }
  }
}
</i18n>
<!-- eslint-enable max-len -->

<template>
  <PageSection
    v-if="hasBeenActivated"
    full
    :padding="false"
    :class="{
      'statement-wrapper': true,
      'statement-wrapper--status-skip': status === 'skip',
    }"
    :data-section="`thesis-${index}`"
    role="region"
    :aria-roledescription="$t('views.home.theses.statement-wrapper.role-aria')"
    :aria-label="$t('views.home.theses.statement-wrapper.region-aria', { count: index + 1, total })"
    :data-test="`thesis-${index}`"
  >
    <!-- Thesis -->
    <div class="statement-wrapper__statement">
      <StatementText :index="index" :status="status" />
    </div>

    <!-- Buttons -->
    <div class="statement-wrapper__skip">
      <SkipButton
        :disabled="skipButtonDisabled"
        :tooltip-disabled="!skipButtonDisabled || status === 'skip'"
        :max-skip="maxSkip"
        @click="clickVoteButton('skip')"
      />
    </div>
    <div class="statement-wrapper__vote-buttons">
      <VoteButton
        v-for="(option, index) in algorithm.options"
        :key="option.alias"
        @click="clickVoteButton(option.alias, option.direction)"
        :alias="option.alias"
        :icon="option.icon"
        :base-color="option.colors.base"
        :contrast-color="option.colors.contrast"
        :darker-color="option.colors.darker"
        :active="status === option.alias"
        :data-test="`thesis-${index}-${option.alias}`"
        tabindex="0"
      />
    </div>

    <!-- Important Toggle -->
    <div class="statement-wrapper__important-button">
      <ImportantButton
        :name="`important-${index}`"
        v-model:factor="factor"
        :disabled="(status && direction === 'neutral') || maxImportantReached"
        :tooltip-disabled="!maxImportantReached || direction === 'neutral' || status === 'skip'"
        :max-important="maxImportant"
      />
    </div>
  </PageSection>
</template>

<script>
import { mapGetters } from 'vuex';
import ImportantButton from '/src/components/views/home/sections/03-theses/ImportantButton.vue';
import PageSection from '/src/components/elements/PageSection.vue';
import SkipButton from '/src/components/views/home/sections/03-theses/SkipButton.vue';
import StatementText from '/src/components/views/home/sections/03-theses/StatementText.vue';
import VoteButton from '/src/components/views/home/sections/03-theses/VoteButton.vue';

export default {
  name: 'StatementWrapper',
  components: {
    ImportantButton,
    PageSection,
    SkipButton,
    StatementText,
    VoteButton,
  },
  props: {
    index: {
      type: Number,
      required: true,
    },
    thesis: {
      type: Object,
      required: true,
    },
  },
  methods: {
    clickVoteButton(status, direction = null) {
      if (status === 'skip' && this.skipButtonDisabled) {
        // The skip-button is greyed out, so we're stopping here. Instead of doing this check
        // here, we could simply disable the button, but it would then no longer be able to
        // receive focus. This would lead to the tooltip explaining why the user cannot skip this
        // thesis being unreachable. This however is vital for screen readers.
        return;
      }
      if (direction === 'neutral' || status === 'skip') {
        this.factor = 1;
      }
      this.status = status;
    },
  },
  computed: {
    ...mapGetters({
      algorithm: 'algorithm/algorithm',
      total: 'theses/total',
      countSkip: 'theses/countSkip',
      maxSkip: 'theses/maxSkip',
      countImportant: 'theses/countImportant',
      maxImportant: 'theses/maxImportant',
    }),
    active: {
      get() {
        const previousThesis = this.$store.getters['theses/theses'][this.index - 1];
        return previousThesis !== undefined && previousThesis.status !== null;
      },
    },
    status: {
      get() {
        return this.$store.getters['theses/theses'][this.index].status;
      },
      set(value) {
        this.$store.commit('theses/setStatus', {
          index: this.index,
          status: value,
        });
      },
    },
    factor: {
      get() {
        return this.$store.getters['theses/theses'][this.index].factor;
      },
      set(value) {
        if (
          (this.status && this.direction === 'neutral') ||
          this.status === 'skip' ||
          this.maxImportantReached
        ) {
          // The important-button is greyed out, so we're stopping here. Instead of doing this check
          // here, we could simply disable the checkbox of the important-button, but it would then
          // no longer be able to receive focus. This would lead to the tooltip explaining why the
          // user cannot mark this thesis as important being skipped. This however is vital for
          // screen readers.
          return;
        }
        this.$store.commit('theses/setFactor', {
          index: this.index,
          factor: value,
        });
      },
    },
    direction() {
      const option = this.algorithm.options.find((item) => item.alias === this.status);
      if (option !== undefined) {
        return option.direction;
      }
      return 'neutral';
    },
    hasBeenActivated: {
      get() {
        return this.$store.getters['theses/theses'][this.index].activated;
      },
      set() {
        return this.$store.dispatch('theses/activate', { index: this.index });
      },
    },
    skipButtonDisabled() {
      return this.countSkip >= this.maxSkip && this.status !== 'skip';
    },
    maxImportantReached() {
      return this.countImportant >= this.maxImportant && this.factor < 2;
    },
  },
  watch: {
    active(value) {
      if (value) {
        this.hasBeenActivated = true;
      }
    },
  },
};
</script>

<style lang="scss">
.statement-wrapper {
  transition: opacity 0.2s ease-out;
  &.statement-wrapper--status-skip {
    opacity: 0.5;
    background-color: #f7fafc;
  }
  & + .statement-wrapper {
    border-top: 2px solid var(--theme-neutral-background);
  }
}

.statement-wrapper__statement {
  padding: 2em;
  @media (min-width: 40em) {
    padding-bottom: 4em;
  }
  @media (min-width: 64em) {
    padding-bottom: 6em;
  }
}

.statement-wrapper__skip {
  margin-inline-end: 2.25em;
  margin-bottom: 0.5em;
  text-align: end;
  @media (min-width: 48em) {
    margin-bottom: 1em;
  }
  .skip-button {
    display: inline-block;
  }
}

.statement-wrapper__vote-buttons {
  display: flex;
  flex-direction: column;
  margin: 0 2em 1em 2em;
  @media (min-width: 48em) {
    flex-direction: row;
    margin: 0 1.5em 2em 1.5em;
  }
}

.statement-wrapper__important-button {
  margin: 2em 2em 2em 2em;
  text-align: center;
  @media (min-width: 48em) {
    margin: 3em 1.5em 0 1.5em;
  }
  @media (min-width: 64em) {
    margin-top: 6em;
  }
}
</style>

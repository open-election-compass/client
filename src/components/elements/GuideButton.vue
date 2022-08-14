<template>
  <div class="guide-button">
    <transition name="popup">
      <div class="guide-button__wrapper" v-if="active" aria-hidden="true">
        <BaseButton
          class="guide-button__button"
          theme="positive"
          :right="
            $store.getters['languages/active'].direction === 'ltr' ? 'arrow-right' : 'arrow-left'
          "
          size="large"
          @click="goToActiveSection"
        >
          {{ $t(`elements.guide-button.${activeSection.message}`) }}
        </BaseButton>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'GuideButton',
  data() {
    return {
      relevant: false, // is the user in the wrong section?
      lastCallToUpdateRelevanceFunction: null, // used to throttle update of `relevant`
      waitForUpdateRelevanceThrottle: null, // timeout, in case `updateRelevance()` is throttling
    };
  },
  props: {
    initialDelay: {
      type: Number,
      default: 3000,
    },
    throttle: {
      type: Number,
      default: 500,
    },
  },
  mounted() {
    this.$watch('actualSection', this.updateRelevance);
    this.$watch('activeSection', this.updateRelevance);

    // Show GuideButton on start section with delay to help users discover scrolling
    setTimeout(() => {
      if (this.actualSection === null) {
        this.relevant = true;
      }
    }, this.initialDelay);
  },
  computed: {
    sections() {
      return this.$store.getters['sections/sections'];
    },
    activeSection() {
      return this.$store.getters['sections/activeSection'];
    },
    actualSection() {
      return this.$store.getters['sections/actualSection'];
    },
    active() {
      return (
        this.activeSection &&
        this.relevant &&
        this.$store.getters['sections/guideButtonEnabled'] &&
        typeof this.activeSection.completed === 'boolean' &&
        typeof this.activeSection.message === 'string' &&
        this.$root.$te(
          `elements.guide-button.${this.activeSection.message}`,
          this.$i18n.fallbackLocale
        )
      );
    },
    nextSection() {
      const indexOfCurrentSection = this.sections.findIndex(
        (section) => section.alias === this.activeSection.alias
      );
      if (indexOfCurrentSection === this.sections.length - 1) {
        return false;
      }
      return this.sections[indexOfCurrentSection + 1];
    },
  },
  methods: {
    updateRelevance() {
      // This function implements a basic throttle. Initially, it used lodash's `throttle()`, but
      // this was incompatible with out unit tests.
      const now = Date.now();
      const wait = now - this.lastCallToUpdateRelevanceFunction;
      if (typeof now === 'number' && wait < this.throttle) {
        if (this.waitForUpdateRelevanceThrottle) {
          clearTimeout(this.waitForUpdateRelevanceThrottle);
        }
        this.waitForUpdateRelevanceThrottle = setTimeout(this.updateRelevance, wait);
        return false;
      }
      this.lastCallToUpdateRelevanceFunction = now;

      // Determine, if GuideButton is relevant at the moment
      if (this.actualSection && this.activeSection) {
        this.relevant = this.actualSection.alias !== this.activeSection.alias;
        return true;
      }
      this.relevant = false;
      return true;
    },
    goToActiveSection() {
      // Overwrite `relevant` to hide the GuideButton
      this.relevant = false;

      // Activate `updateRelevance()` throttling, so the button will stay hidden for the `delay`
      this.lastCallToUpdateRelevanceFunction = Date.now();

      // Trigger scrolling
      this.bus.emit('navigate-to:active-section');
    },
  },
};
</script>

<style lang="scss" scoped>
.guide-button {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
}

.guide-button__wrapper {
  width: 100%;
  padding: 1rem;
  text-align: center;
}

@media screen and (min-width: 40rem) {
  .guide-button__wrapper {
    padding: 2rem;
  }
}

@media screen and (min-width: 60rem) {
  .guide-button__wrapper {
    padding: 3rem;
  }
}

.guide-button__button {
  width: 100%;
  max-width: 500px;
  animation-name: levitating;
  animation-duration: 1.5s;
  animation-timing-function: cubic-bezier(0.445, 0.05, 0.55, 0.95); // ease-in-out-sine
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

@keyframes levitating {
  0% {
    background-color: theme('colors.green.500');
    transform: scale(1) translateY(2.5%);
  }

  100% {
    background-color: theme('colors.green.400');
    transform: scale(1.025) translateY(0);
  }
}

.popup-enter-active {
  animation-name: popup;
  animation-duration: 0.4s;
  animation-timing-function: cubic-bezier(0.235, 1.47, 0.58, 0.995);
  animation-direction: normal;
  animation-fill-mode: forwards;
}

.popup-leave-active {
  animation-name: popup;
  animation-duration: 0.5s;
  animation-timing-function: ease-in;
  animation-direction: reverse;
  animation-fill-mode: backwards;
}

@media (prefers-reduced-motion) {
  .guide-button__button {
    animation-name: none;
  }

  .popup-enter-active {
    animation-name: none;
  }

  .popup-leave-active {
    animation-name: none;
  }
}

@keyframes popup {
  0% {
    transform: translateY(10em);
  }

  100% {
    transform: translateY(0);
  }
}
</style>

<template>
  <transition name="popup">
    <div
      class="
        fixed bottom-0 left-0 right-0 p-8 w-full text-center
        md:pb-12
        lg:pb-16
      "
      v-if="active"
      aria-hidden="true"
    >
      <button
        class="
          button button-positive w-full shadow-xl levitating
          sm:max-w-lg
        "
        @click="goToActiveSection"
      >
        <span>{{ $t(`messages.${activeSection.message}`) }}</span>
        <icon name="arrow-right" :monospace="false" />
      </button>
    </div>
  </transition>
</template>

<script>
import _throttle from 'lodash/throttle';

export default {
  name: 'GuideButton',
  data() {
    return {
      relevant: false, // is the user in the wrong section?
    };
  },
  mounted() {
    this.$watch('actualSection', this.updateRelevance);
    this.$watch('activeSection', this.updateRelevance);

    // Show GuideButton on start section with delay to help users discover scrolling
    setTimeout(() => {
      if (this.actualSection === null) {
        this.relevant = true;
      }
    }, 3000);
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
        this.activeSection
        && this.relevant
        && this.$store.getters['sections/guideButtonEnabled']
        && typeof this.activeSection.completed === 'boolean'
        && typeof this.activeSection.message === 'string'
        && this.$te(`messages.${this.activeSection.message}`)
      );
    },
    nextSection() {
      const indexOfCurrentSection = this.sections
        .findIndex((section) => section.alias === this.activeSection.alias);
      if (indexOfCurrentSection === this.sections.length - 1) {
        return false;
      }
      return this.sections[indexOfCurrentSection + 1];
    },
  },
  methods: {
    updateRelevance: _throttle(function updateRelevanceThrottled() {
      if (this.actualSection && this.activeSection) {
        this.relevant = this.actualSection.alias !== this.activeSection.alias;
        return;
      }
      this.relevant = false;
    }, 500),
    goToActiveSection() {
      this.$root.$emit('navigate-to:active-section');
    },
  },
};
</script>

<i18n>
{
  "en": {
    "messages": {
      "start": "Let's go",
      "introduction": "Learn how this works",
      "first-thesis": "Start with the first thesis",
      "thesis": "Proceed to the next thesis",
      "party": "Select the parties",
      "match": "See your result",
      "compare": "Read the statements"
    }
  },
  "de": {
    "messages": {
      "start": "Los geht's",
      "introduction": "Zur Einführung",
      "first-thesis": "Auf zur ersten These",
      "thesis": "Weiter zur nächsten These",
      "party": "Parteien auswählen",
      "match": "Ergebnis anschauen",
      "compare": "Begründungen der Parteien lesen"
    }
  }
}
</i18n>

<style lang="scss" scoped>
  .levitating {
    animation-name: levitating;
    animation-duration: 1.5s;
    animation-timing-function: cubic-bezier(0.445, 0.050, 0.550, 0.950); // ease-in-out-sine
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }
  @keyframes levitating {
    0% {
      transform: scale(1) translateY(2.5%);
      background-color: theme('colors.green.500');
    }
    100% {
      transform: scale(1.025) translateY(0);
      background-color: theme('colors.green.400');
    }
  }

  .popup-enter-active {
    animation-name: popup;
    animation-duration: 0.4s;
    animation-timing-function: cubic-bezier(0.235, 1.470, 0.580, 0.995);
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
  @keyframes popup {
    0% {
      transform: translateY(10em);
    }
    100% {
      transform: translateY(0);
    }
  }
</style>

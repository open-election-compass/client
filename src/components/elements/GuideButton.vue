<template>
  <transition name="popup">
    <div
      class="
        fixed bottom-0 left-0 right-0 p-8 w-full text-center
        md:pb-12
        lg:pb-16
      "
      v-if="enabled && relevant"
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
      scrollPosition: 0, // to determine direction
      actualSection: null, // the section the user is currently in, according to the scroll position
      sections: [], // list of sections in order of appearance
      relevant: false, // is the user in the wrong section?
      enabled: true, // when a section is completed it can choose to enable/disable the GuideButton
    };
  },
  mounted() {
    this.initSections();
    this.wrapperElement.addEventListener('scroll', this.updateActualSection);
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
    wrapperElement() {
      return this.$root.$el.querySelector('#oec-wrapper');
    },
    theses() {
      return this.$store.getters['theses/theses'];
    },
    partiesChosen() {
      return this.$store.getters['parties/chosen'];
    },
    activeSection() {
      const uncompletedSection = this.sections.find(section => section.completed === false);
      if (uncompletedSection !== null) {
        return uncompletedSection;
      }
      return this.sections[0];
    },
    nextSection() {
      const indexOfCurrentSection = this.sections
        .findIndex(section => section.alias === this.activeSection.alias);
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
    initSections() {
      let sections = [];

      // Add Start section
      sections.push({
        alias: 'start',
        completed: true,
        message: 'start',
      });

      // Add Introduction section
      sections.push({
        alias: 'introduction',
        completed: false,
        message: 'introduction',
      });
      this.$watch('actualSection', (section) => {
        if (section && section.alias === 'introduction') {
          this.markSectionAsCompleted('introduction');
          this.enabled = true;
        }
      });

      // Add theses
      // eslint-disable-next-line arrow-body-style
      sections = sections.concat(this.theses.map((thesis, index) => {
        const alias = `thesis-${index}`;
        this.$watch(`theses.${index}.status`, (status) => {
          if (status !== null) {
            this.markSectionAsCompleted(alias);
            this.enabled = true;
          }
        });
        return {
          alias,
          completed: false,
          message: index === 0 ? 'first-thesis' : 'thesis',
        };
      }));

      // Add Party section
      sections.push({
        alias: 'party',
        completed: false,
        message: 'party',
      });
      this.$watch('partiesChosen', (chosen) => {
        if (chosen) {
          this.markSectionAsCompleted('party');
          this.enabled = false;
          this.goToActiveSection();
        }
      });

      // Add match section
      sections.push({
        alias: 'match',
        completed: false,
        message: 'match',
      });
      this.$watch('actualSection', (section) => {
        if (section && section.alias === 'match') {
          this.markSectionAsCompleted('match');
          this.enabled = true;
        }
      });

      // Add compare section
      sections.push({
        alias: 'compare',
        completed: false,
        message: 'compare',
      });
      this.$watch('actualSection', (section) => {
        if (section && section.alias === 'compare') {
          this.markSectionAsCompleted('compare');
          this.enabled = false;
        }
      });

      this.$set(this, 'sections', sections);
    },
    updateActualSection() {
      const scrollPosition = this.wrapperElement.scrollTop;
      const wrapperHeight = this.wrapperElement.offsetHeight;

      const sections = this.sections.slice(); // = clone
      const direction = scrollPosition < this.scrollPosition ? 'up' : 'down';
      if (direction === 'down') {
        sections.reverse(); // when scrolling down, the first element *coming* into view is relevant
      }
      this.scrollPosition = scrollPosition;

      const actualSection = sections.find((section) => {
        // Find dom node
        const sectionElement = this.wrapperElement // eslint-disable-line no-param-reassign
          .querySelector(`[data-guide-section="${section.alias}"]`);
        if (sectionElement === null) {
          return false;
        }

        // Determine the height of the section being visible in the viewport / wrapper:
        // - rect.top:    The length from the top border of the wrapper to the top border of the
        //                section.
        // - rect.bottom: The length from the top border of the wrapper to the bottom border of the
        //                section. Notice, that this works a little different than you might expect!
        // - rect.height: The height of the section. Shrinks, when element leaves the viewport at
        //                the top, but not at the bottom!
        const rect = sectionElement.getBoundingClientRect();
        let visibleHeight = 0;
        if (rect.top >= 0) {
          // Section is below the top border of the wrapper
          visibleHeight = rect.height - (rect.bottom - wrapperHeight);
        } else {
          // Section is at least partly above the top border of the wrapper
          visibleHeight = rect.height + rect.top;
        }

        // Limit visibleHeight to >= 0, because a section that hasn't entered the viewport covers
        // 0 % of it
        visibleHeight = Math.max(0, visibleHeight);

        // Limit the actual height of the section to the height of the wrapper, so a section that is
        // bigger than the wrapper, reaches 100 % when it covers the whole wrapper.
        const sectionHeight = Math.min(wrapperHeight, sectionElement.offsetHeight);

        // Limit visibleHeight to the (also limited) sectionHeight, because an element that is
        // smaller in height than the wrapper cannot possibly cover it completely.
        visibleHeight = Math.min(sectionHeight, visibleHeight);

        const visiblePercent = 1 / sectionHeight * visibleHeight;
        return visiblePercent > 0.6;
      });

      if (actualSection) {
        // When actualSection is null, no element takes more than 60 % of the viewport. This happens
        // between two sections, when the viewport's height is rather narrow, in which case, we
        // simply keep the last section set.
        this.actualSection = actualSection;
      }
    },
    markSectionAsCompleted(alias) {
      const completedSection = this.sections.find(section => section.alias === alias);
      if (completedSection !== null) {
        completedSection.completed = true;
      }
    },
    goToActiveSection() {
      if (!this.activeSection) {
        return;
      }
      // Find dom node of active section
      const sectionElement = this.wrapperElement // eslint-disable-line no-param-reassign
        .querySelector(`[data-guide-section="${this.activeSection.alias}"]`);
      this.wrapperElement.scrollTo({
        behavior: 'smooth', // using iamdustan/smoothscroll polyfill
        left: 0,
        top: sectionElement.offsetTop,
      });
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
      "compare": "Statements der Parteien lesen"
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

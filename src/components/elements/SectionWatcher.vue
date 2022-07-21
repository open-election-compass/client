<template>
  <div class="section-watcher">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'SectionWatcher',
  data() {
    return {
      scrollPosition: 0, // to determine direction
    };
  },
  mounted() {
    if (window) {
      window.addEventListener('scroll', this.updateActualSection);
    }
    this.initSections();
    this.bus.on('navigate-to:active-section', this.goToActiveSection);
    this.bus.on('navigate-to:section', this.goToSection);
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
    theses() {
      return this.$store.getters['theses/theses'];
    },
    partiesChosen() {
      return this.$store.getters['parties/chosen'];
    },
  },
  methods: {
    initSections() {
      // Add Start section
      this.$store.commit('sections/addSection', {
        alias: 'start',
        completed: true,
        message: 'start',
      });

      // Add Introduction section
      this.$store.commit('sections/addSection', {
        alias: 'introduction',
        completed: false,
        message: 'introduction',
      });
      this.$watch('actualSection', (section) => {
        if (section && section.alias === 'introduction') {
          this.$store.commit('sections/markSectionAsCompleted', 'introduction');
          this.$store.dispatch('sections/enableGuideButton');
        }
      });

      // Add theses
      this.theses.forEach((thesis, index) => {
        const alias = `thesis-${index}`;
        this.$watch(`theses.${index}.status`, (status) => {
          if (status !== null) {
            this.$store.commit('sections/markSectionAsCompleted', alias);
            this.$store.dispatch('sections/enableGuideButton');
          }
        });
        this.$store.commit('sections/addSection', {
          alias,
          completed: false,
          message: index === 0 ? 'first-thesis' : 'thesis',
        });
      });

      // Add Party section
      this.$store.commit('sections/addSection', {
        alias: 'party',
        completed: false,
        message: 'party',
      });
      this.$watch('partiesChosen', async (chosen) => {
        await this.$nextTick(); // prevent race condition
        if (chosen) {
          this.$store.commit('sections/markSectionAsCompleted', 'party');
          this.$store.dispatch('sections/disableGuideButton');
          this.goToActiveSection();
        }
      });

      // Add match section
      this.$store.commit('sections/addSection', {
        alias: 'match',
        completed: false,
        message: 'match',
      });
      this.$watch('actualSection', (section) => {
        if (section && section.alias === 'match') {
          this.$store.commit('sections/markSectionAsCompleted', 'match');
          this.$store.dispatch('sections/enableGuideButton');
        }
      });

      // Add compare section
      this.$store.commit('sections/addSection', {
        alias: 'compare',
        completed: false,
        message: 'compare',
      });
      this.$watch('actualSection', (section) => {
        if (section && section.alias === 'compare') {
          this.$store.commit('sections/markSectionAsCompleted', 'compare');
          this.$store.dispatch('sections/disableGuideButton');
        }
      });
      this.theses.forEach((thesis, index) => {
        const alias = `compare-thesis-${index}`;
        this.$store.commit('sections/addSection', {
          alias,
        });
      });
    },
    updateActualSection() {
      const scrollPosition =
        window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      const wrapperHeight = window.innerHeight;

      const sections = this.sections.slice(); // = clone
      const direction = scrollPosition < this.scrollPosition ? 'up' : 'down';
      if (direction === 'down') {
        sections.reverse(); // when scrolling down, the first element *coming* into view is relevant
      }
      this.scrollPosition = scrollPosition;

      const actualSection = sections.find((section) => {
        // Find dom node
        const sectionElement = this.$el // eslint-disable-line no-param-reassign
          .querySelector(`[data-section="${section.alias}"]`);
        if (sectionElement === null) {
          return false;
        }

        // Determine the height of the section being visible in the viewport / wrapper:
        // - rect.top:    The length from the top border of the wrapper to the top border of the
        //                section.
        // - rect.bottom: The length from the top border of the wrapper to the bottom border of the
        //                section. Notice, that this works a little different than you might expect!
        // - rect.height: The height of the section.
        const rect = sectionElement.getBoundingClientRect();
        let visibleHeight = 0;
        if (rect.top >= 0) {
          // Section is below the top border of the wrapper
          visibleHeight = wrapperHeight - rect.top;
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

        const visiblePercent = (1 / sectionHeight) * visibleHeight;
        return visiblePercent > 0.6;
      });

      if (actualSection) {
        // When actualSection is null, no element takes more than 60 % of the viewport. This happens
        // between two sections, when the viewport's height is rather narrow, in which case, we
        // simply keep the last section set.
        this.$store.commit('sections/updateActualSection', actualSection);
      }
    },
    goToActiveSection() {
      if (!this.activeSection) {
        return;
      }
      this.goToSection(this.activeSection.alias);
    },
    goToSection(alias) {
      // Find dom node of section
      const sectionElement = this.$el.querySelector(`[data-section="${alias}"]`);
      window.scrollTo({
        behavior: 'smooth', // using iamdustan/smoothscroll polyfill
        left: 0,
        top: sectionElement.offsetTop,
      });
    },
  },
};
</script>

<style lang="scss">
.scroll-watcher {
  overflow: hidden;
}
</style>

<template>
  <div
    class="main-navigation"
    :class="active ? 'main-navigation--active' : ''"
  >
    <button
      @click="toggleMenu()"
      class="main-navigation__toggle"
      id="test"
    >
      <span class="main-navigation__toggle-caption">
        {{ $t('menu') }}
      </span>
      <span class="main-navigation__toggle-icon">
        <icon :name="active ? 'times' : 'bars'" monospace />
      </span>
    </button>
    <transition name="menu">
      <nav
        v-if="active"
        ref="menu"
        class="main-navigation__menu"
      >
        <ul class="main-navigation__groups">
          <template
            v-for="group in groups"
          >
            <li
              v-if="group.links.length > 0"
              :key="group.alias"
              class="main-navigation__group"
            >
              <button class="main-navigation__caption" @click="toggleGroup(group.alias)">
                <span>{{ group.caption }}</span>
                &nbsp;
                <icon :name="!hiddenGroups.includes(group.alias) ? 'angle-down' : 'angle-up'" />
              </button>
              <ul v-if="!hiddenGroups.includes(group.alias)" class="main-navigation__links">
                <li
                  v-for="link in group.links"
                  :key="link.alias"
                  class="main-navigation__link"
                  :class="{
                    'main-navigation__link--active': isActive(link),
                    'main-navigation__link--disabled': link.disabled,
                  }"
                >
                  <a
                    class="main-navigation__caption"
                    :href="link.to"
                    @click="goToLink(link.to, $event)"
                  >
                    {{ link.caption }}
                    <small v-if="link.description">{{ link.description }}</small>
                  </a>
                </li>
              </ul>
            </li>
          </template>
        </ul>
      </nav>
    </transition>
    <div
      class="main-navigation__site-wrapper"
      @click="hideMenu()"
    >
      <div class="main-navigation__site">
        <slot name="site" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainNavigation',
  data() {
    return {
      active: false,
      hiddenGroups: [],
    };
  },
  mounted() {
    this.$watch('actualSection', () => {
      this.focusActiveMenuItem(true);
    }, { deep: true });
  },
  computed: {
    actualSection() {
      return this.$store.getters['sections/actualSection'];
    },
    groups() {
      const home = {
        alias: 'home',
        caption: this.$t('links.home'),
        links: [
          {
            alias: 'home',
            caption: this.$t('links.home'),
            to: '#start',
          },
          {
            alias: 'introduction',
            caption: this.$t('links.introduction'),
            to: '#introduction',
          },
        ],
      };

      const theses = {
        alias: 'theses',
        caption: this.$t('links.theses'),
      };
      theses.links = this.$store.getters['theses/theses'].map((thesis, index) => {
        let caption;
        let description = null;
        if (this.$root.$te(`theses.${index}.title`)) {
          caption = `${index + 1} – ${this.$t(`theses.${index}.title`)}`;
        } else {
          caption = this.$t('thesis', { count: index + 1 });
          description = `„${this.$t(`theses.${index}.statement`)}“`;
        }
        let disabled = thesis.status === null;
        const previousThesis = this.$store.getters['theses/theses'][index - 1];
        if (!previousThesis || previousThesis.status !== null) {
          disabled = false;
        }
        return {
          alias: `thesis-${index}`,
          caption,
          description,
          disabled,
          to: `#thesis-${index}`,
        };
      });

      const evaluation = {
        alias: 'evaluation',
        caption: this.$t('links.evaluation'),
        links: [
          {
            alias: 'party',
            caption: this.$t('links.party'),
            disabled: !this.$store.getters['theses/complete'],
            to: '#party',
          },
          {
            alias: 'match',
            caption: this.$t('links.match'),
            disabled: !this.$store.getters['parties/chosen'],
            to: '#match',
          },
        ],
      };

      const compare = {
        alias: 'compare',
        caption: this.$t('links.compare'),
      };
      const compareDisabled = !this.$store.getters['parties/chosen'];
      compare.links = this.$store.getters['theses/theses'].map((thesis, index) => {
        let caption;
        let description = null;
        if (this.$root.$te(`theses.${index}.title`)) {
          caption = `${index + 1} – ${this.$t(`theses.${index}.title`)}`;
        } else {
          caption = this.$t('thesis', { count: index + 1 });
          description = `„${this.$t(`theses.${index}.statement`)}“`;
        }
        return {
          alias: `compare-thesis-${index}`,
          caption,
          description,
          disabled: compareDisabled,
          to: `#compare-thesis-${index}`,
        };
      });

      const about = {
        alias: 'about',
        caption: this.$t('links.about'),
      };
      about.links = this.$store.getters['footerLinks/links'].map((link, index) => ({
        alias: `footer-link-${index}`,
        caption: this.$t(`footer-links.${index}.text`),
        to: this.$t(`footer-links.${index}.href`),
      }));
      return [home, theses, evaluation, compare, about];
    },
  },
  methods: {
    toggleMenu() {
      if (this.active) {
        return this.hideMenu();
      }
      return this.showMenu();
    },
    showMenu() {
      this.active = true;
      this.$nextTick(() => {
        this.focusActiveMenuItem();
      });
    },
    hideMenu() {
      this.active = false;
    },
    focusActiveMenuItem(smooth = false) {
      const activeItem = this.$el.querySelector('.main-navigation__link--active');
      if (!activeItem || !this.$refs.menu) {
        return;
      }
      let offset = 150; // not ideal, but better then an offset of 0px, should no caption be found
      const caption = this.$el.querySelector('.main-navigation__caption');
      if (caption) {
        offset = caption.offsetHeight + 10; // some extra px to account for the shadow
      }
      if (
        this.$refs.menu.scrollTop > (activeItem.offsetTop - offset)
        || (activeItem.offsetTop + activeItem.offsetHeight)
        > (this.$refs.menu.scrollTop + this.$refs.menu.offsetHeight)
      ) {
        this.$refs.menu.scrollTo({
          behavior: smooth ? 'smooth' : undefined, // using iamdustan/smoothscroll polyfill
          left: 0,
          top: activeItem.offsetTop - offset,
        });
      }
    },
    toggleGroup(alias) {
      const index = this.hiddenGroups.indexOf(alias);
      if (index < 0) {
        return this.hiddenGroups.push(alias);
      }
      return this.hiddenGroups.splice(index, 1);
    },
    goToLink(href, event) {
      if (href.charAt(0) === '#') {
        event.preventDefault();
        this.$root.$emit('navigate-to:section', href.substring(1));
        this.hideMenu();
      }
    },
    isActive(link) {
      return (
        this.actualSection
        && link.to.charAt(0) === '#'
        && this.actualSection.alias === link.to.substring(1)
      );
    },
  },
};
</script>

<style lang="scss" scoped>
  .main-navigation {
    background-color: theme('colors.primary');
  }

  .main-navigation__site {
    background-color: #FFF;
    height: 100vh;
    overflow: hidden;
  }

  .main-navigation__site-wrapper {
    overflow: hidden;
  }

  .main-navigation__toggle {
    position: fixed;
    z-index: 301;
    top: 1.5rem;
    right: 0;
    background-color: transparent;
    &:hover, &:focus {
      box-shadow: none;
      .main-navigation__toggle-caption,
      .main-navigation__toggle-icon {
        background-color: theme('colors.primary');
      }
    }
  }

  .main-navigation__toggle-caption,
  .main-navigation__toggle-icon {
    background-color: theme('colors.gray.400');
    border-radius: 5px 0 0 5px;
    display: inline-block;
    transition: background-color 0.2s ease-out;
  }

  .main-navigation__toggle-caption {
    padding: 1rem 2rem 1rem 1rem;
    margin-right: -1rem;
    font-weight: 700;
    transition: all 0.2s ease-out;
  }

  .main-navigation__toggle-icon {
    padding: 1rem;
    position: relative;
    z-index: 2;
  }

  .main-navigation--active {
    .main-navigation__toggle {
      .main-navigation__toggle-caption,
      .main-navigation__toggle-icon {
        background-color: theme('colors.yellow.600');
        color: inherit;
      }
      .main-navigation__toggle-caption {
        transform: translateX(6rem);
        opacity: 0;
        pointer-events: none;
      }
      &:hover, &:focus {
        .main-navigation__toggle-caption,
        .main-navigation__toggle-icon {
          background-color: #FFF;
        }
      }
    }
  }

  .main-navigation__menu {
    background-color: theme('colors.primary');
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow-y: auto;
    z-index: 300;
  }

  .main-navigation__links {
    padding: 0.5rem 1rem;
  }

  .main-navigation__link {
    & + & {
      margin-top: 1rem;
    }
    a {
      display: block;
      background-color: #FFF;
      border-radius: 5px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      border: 1px solid theme('colors.yellow.500');
      transition: all 0.2s ease-out;

      &:not(.main-navigation__link--disabled):hover,
      &:not(.main-navigation__link--disabled):focus {
        cursor: pointer;
        outline: none;
        border-color: transparent;
        box-shadow:
          0 4px 6px -1px rgba(0, 0, 0, 0.1),
          0 2px 4px -1px rgba(0, 0, 0, 0.06),
          0 0 0 3px theme('colors.yellow.600');
      }
    }
    &.main-navigation__link--disabled a {
      opacity: 0.25;
    }
    &.main-navigation__link--active a {
      transform: scale(1.025);
    }
  }

  button.main-navigation__caption {
    font-size: 1.5rem;
    box-sizing: border-box;
    background-color: theme('colors.primary');
    width: 100%;
    text-align: left;
    color: theme('colors.yellow.800');
    padding: 2rem 2rem 1rem 2rem;
    display: block;
    position: sticky;
    top: 0;
    z-index: 3;
    &:focus {
      box-shadow: none;
      span {
        text-decoration: underline;
      }
    }
  }

  a.main-navigation__caption {
    font-size: 1.25rem;
    padding: 0.75rem 1rem;
    display: block;
    border-radius: 5px;
    small {
      display: block;
      font-size: 0.75em;
      color: theme('colors.gray.600');
    }
  }

  .menu-enter, .menu-leave-to {
    transform: translateX(30rem);
  }

  .menu-enter-active {
    transition: transform 0.3s ease-out;
  }

  .menu-leave-active {
    transition: transform 0.2s ease-out;
  }

  @media (min-width: 40rem) {
    .main-navigation__site-wrapper {
      transition: all 0.3s ease-out;
      transform-origin: 100% 50%;
    }

    .main-navigation--active .main-navigation__site-wrapper {
      transform: scale(0.9) translateX(-38rem);
      box-shadow: 0 2rem 4rem 0 rgba(#000, 0.2);
      border-radius: 1.5rem;
    }

    .main-navigation__menu {
      left: initial;
      background-color: transparent;
      padding-right: 4rem;
      padding-bottom: 4rem;
      width: 30rem;
    }

    button.main-navigation__caption {
      padding: 3rem 1rem 1rem 1rem;
    }

    .main-navigation__link.main-navigation__link--active a {
      transform: scale(1.05);
    }
  }
</style>

<i18n>
{
  "en": {
    "menu": "Menu",
    "thesis": "Thesis {count}",
    "links": {
      "home": "Start",
      "introduction": "Introduction",
      "theses": "Theses",
      "evaluation": "Evaluation",
      "party": "Party selection",
      "match": "Result",
      "compare": "Statements",
      "about": "About"
    }
  },
  "de": {
    "menu": "Menü",
    "thesis": "These {count}",
    "links": {
      "home": "Start",
      "introduction": "Einleitung",
      "theses": "Thesen",
      "evaluation": "Auswertung",
      "party": "Parteienwahl",
      "match": "Ergebnis",
      "compare": "Antworten der Parteien",
      "about": "Über"
    }
  }
}
</i18n>

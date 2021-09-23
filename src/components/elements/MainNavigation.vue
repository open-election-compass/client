<template>
  <div
    class="main-navigation"
    :class="active ? 'main-navigation--active' : ''"
  >
    <button
      @click="toggleMenu()"
      class="main-navigation__toggle"
    >
      <span class="main-navigation__toggle-caption">
        {{ $t('menu') }}
      </span>
      <span class="main-navigation__toggle-icon">
        <Icon :name="active ? 'times' : 'bars'" monospace />
      </span>
    </button>
    <transition name="menu">
      <nav
        v-if="active"
        v-scroll-lock="active && fullWidthMode"
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
              <button class="main-navigation__group-toggle" @click="toggleGroup(group.alias)">
                <span>{{ group.caption }}</span>
                &nbsp;
                <Icon :name="!hiddenGroups.includes(group.alias) ? 'angle-down' : 'angle-up'" />
              </button>
              <ul v-if="!hiddenGroups.includes(group.alias)" class="main-navigation__links">
                <li
                  v-for="link in group.links"
                  :key="link.alias"
                  class="main-navigation__item"
                  :class="{
                    'main-navigation__item--active': isActive(link),
                  }"
                >
                  <BaseButton
                    v-if="link.to"
                    class="main-navigation__link"
                    tag="a"
                    :href="link.to"
                    :disabled="link.disabled"
                    :target="link.newTab ? '_blank' : '_self'"
                    theme="white"
                    text-align="left"
                    @click="goToLink(link.to, $event)"
                  >
                    {{ link.caption }}
                    <small v-if="link.description">
                      <Definitions :text="link.description" disabled />
                    </small>
                  </BaseButton>
                  <BaseButton
                    v-else-if="link.event"
                    class="main-navigation__action"
                    :disabled="link.disabled"
                    theme="primary-dark"
                    text-align="left"
                    :left="link.icon || null"
                    @click="$emit(link.event)"
                  >
                    {{ link.caption }}
                    <small v-if="link.description">
                      <Definitions :text="link.description" disabled />
                    </small>
                  </BaseButton>
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
import Definitions from '@/components/elements/Definitions.vue';

export default {
  name: 'MainNavigation',
  components: {
    Definitions,
  },
  data() {
    return {
      active: false,
      fullWidthMode: false,
      hiddenGroups: [],
    };
  },
  mounted() {
    this.$watch('actualSection', () => {
      this.focusActiveMenuItem(true);
    }, { deep: true });

    // Listen for a new friends session being started
    this.$root.$on('how-u-doin', () => {
      this.hideMenu();
    });

    // Update fullWidthMode depending on window size
    const mediaQuery = window.matchMedia('(max-width: 40rem)');
    mediaQuery.addListener(({ matches }) => {
      this.fullWidthMode = matches;
    });
    this.fullWidthMode = mediaQuery.matches;
  },
  computed: {
    actualSection() {
      return this.$store.getters['sections/actualSection'];
    },
    groups() {
      const compass = {
        alias: 'compass',
        caption: this.$t('links.compass'),
        links: [],
      };
      if (this.$store.getters['languages/languages'].length > 1) {
        compass.links.push({
          alias: 'languages',
          caption: this.$t('links.languages'),
          event: 'open-language-switch',
          icon: 'language',
        });
      }
      if (this.$store.getters['options/friendsEnabled']) {
        compass.links.push({
          alias: 'friends-invite',
          caption: this.$t('links.friends-invite'),
          event: 'open-friends-invite-modal',
          icon: 'user-plus',
        });
        compass.links.push({
          alias: 'friends-join',
          caption: this.$t('links.friends-join'),
          event: 'open-friends-join-modal',
          icon: 'user-friends',
        });
      }
      if (this.$store.getters['options/kioskMode']) {
        compass.links.push({
          alias: 'reset',
          caption: this.$t('links.reset'),
          event: 'reset',
          icon: 'undo',
        });
      }

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
        newTab: true,
      }));
      return [compass, home, theses, evaluation, compare, about];
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
      const activeItem = this.$el.querySelector('.main-navigation__item--active');
      if (!activeItem || !this.$refs.menu) {
        return;
      }
      let offset = 150; // not ideal, but better then an offset of 0px, should no caption be found
      const caption = this.$el.querySelector('.main-navigation__group-toggle');
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
        && link.to
        && link.to.charAt(0) === '#'
        && this.actualSection.alias === link.to.substring(1)
      );
    },
  },
};
</script>

<style lang="scss">
.main-navigation {
  background-color: var(--theme-primary-background);
}

.main-navigation__site {
  background-color: #FFF;
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
      background-color: var(--theme-primary-background);
      color: var(--theme-primary-text);
    }
  }
}

.main-navigation__toggle-caption,
.main-navigation__toggle-icon {
  background-color: var(--theme-gray-background);
  color: var(--theme-gray-text);
  border-radius: 5px 0 0 5px;
  display: inline-block;
  transition: background-color 0.2s ease-out;
}

.main-navigation__toggle-caption {
  padding: 1rem 2rem 1rem 1rem;
  margin-right: -1rem;
  font-weight: 700;
  transition: all 0.2s ease-out;
  display: none;
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
      background-color: var(--theme-primary-dark-background);
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
  background-color: var(--theme-primary-background);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow-y: auto;
  z-index: 300;
}

.main-navigation__links {
  padding: 0.5rem 1rem 20px 1rem; // 20px to leave space for the link's box-shadow
}

button.main-navigation__group-toggle {
  font-size: 1.5rem;
  box-sizing: border-box;
  background-color: var(--theme-primary-background);
  width: 100%;
  text-align: left;
  color: var(--theme-primary-text);
  padding: 2rem 2rem 2rem 2rem;
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

.main-navigation__item {
  & + & {
    margin-top: 1rem;
  }
  &.main-navigation__item--active {
    .main-navigation__link,
    .main-navigation__action {
      transform: scale(1.025);
    }
  }
}

.main-navigation__link,
.main-navigation__action {
  width: 100%;
}

.menu-enter, .menu-leave-to {
  transform: translateX(40rem);
}

.menu-enter-active {
  transition: transform 0.3s ease-out;
}

.menu-leave-active {
  transition: transform 0.2s ease-out;
}

@media (min-width: 40rem) {
  .main-navigation__menu {
    left: auto;
    background-color: var(--theme-primary-background);
    padding: 0 2rem 4rem 2rem;
    width: 32rem;
    border-radius: 1.5rem 0 0 1.5rem;
    box-shadow: 0 0 4rem 0 rgba(#555, 0.25);
  }

  .main-navigation__toggle-caption {
    display: inline-block;
  }

  button.main-navigation__group-toggle {
    padding: 3rem 1rem 1rem 1rem;
  }

  .main-navigation__item.main-navigation__item--active {
    .main-navigation__link,
    .main-navigation__action {
      transform: scale(1.05);
    }
  }
}
</style>

<i18n>
{
  "en": {
    "menu": "Menu",
    "thesis": "Thesis {count}",
    "links": {
      "compass": "Election Compass",
      "languages": "Change language",
      "friends-join": "Join friends",
      "friends-invite": "Invite friends",
      "reset": "Reset",
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
      "compass": "Wahlkompass",
      "languages": "Sprache wechseln",
      "friends-join": "Mit Freund:innen verbinden",
      "friends-invite": "Freund:innen einladen",
      "reset": "Zurücksetzen",
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

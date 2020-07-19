<template>
  <div>
    <LanguageSwitch
      :visible="showLanguageSwitch"
      @close="showLanguageSwitch = false"
    />
    <MainNavigation
      @open-language-switch="showLanguageSwitch = true"
      @reset="$root.$emit('reset', { seconds: 15 })"
    >
      <template v-slot:site>
        <SectionWatcher>
          <start-section />
          <main :aria-roledescription="$t('role-aria')">
            <introduction-section />
            <theses-section />
            <party-section v-if="$store.getters['theses/complete']" />
            <match-section v-if="$store.getters['parties/chosen']" />
            <compare-section v-if="$store.getters['parties/chosen']" />
          </main>
          <footer-section />
          <guide-button v-if="ready" />
        </SectionWatcher>
      </template>
    </MainNavigation>
    <KioskMode v-if="$store.getters['options/kioskMode']" />
  </div>
</template>

<script>
import LanguageSwitch from '../../elements/LanguageSwitch.vue';
import MainNavigation from '../../elements/MainNavigation.vue';
import SectionWatcher from '../../elements/SectionWatcher.vue';
import StartSection from './sections/01-start/StartSection.vue';
import IntroductionSection from './sections/02-introduction/IntroductionSection.vue';
import ThesesSection from './sections/03-theses/ThesesSection.vue';
import PartySection from './sections/04-party/PartySection.vue';
import MatchSection from './sections/05-match/MatchSection.vue';
import CompareSection from './sections/06-compare/CompareSection.vue';
import FooterSection from './sections/07-footer/FooterSection.vue';
import GuideButton from '../../elements/GuideButton.vue';
import KioskMode from '../../elements/KioskMode.vue';

export default {
  name: 'Home',
  data() {
    return {
      ready: false,
      showLanguageSwitch: false,
    };
  },
  mounted() {
    this.ready = true;
  },
  components: {
    LanguageSwitch,
    MainNavigation,
    SectionWatcher,
    StartSection,
    IntroductionSection,
    ThesesSection,
    PartySection,
    MatchSection,
    CompareSection,
    FooterSection,
    GuideButton,
    KioskMode,
  },
};
</script>

<i18n>
{
  "en": {
    "role-aria": "Election Compass"
  },
  "de": {
    "role-aria": "Wahl-Kompass"
  }
}
</i18n>

<template>
  <div>
    <LanguageSwitch
      :visible="showLanguageSwitch"
      @close="showLanguageSwitch = false"
    />
    <FriendsJoinModal
      :visible="showFriendsJoinModal"
      @close="showFriendsJoinModal = false"
    />
    <FriendsInviteModal
      :visible="showFriendsInviteModal"
      @close="showFriendsInviteModal = false"
    />
    <FriendsStatusBar />
    <MainNavigation
      @open-language-switch="showLanguageSwitch = true"
      @open-friends-join-modal="showFriendsJoinModal = true"
      @open-friends-invite-modal="showFriendsInviteModal = true"
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
import CompareSection from '@/components/views/home/sections/06-compare/CompareSection.vue';
import FooterSection from '@/components/views/home/sections/07-footer/FooterSection.vue';
import FriendsInviteModal from '@/components/elements/FriendsInviteModal.vue';
import FriendsJoinModal from '@/components/elements/FriendsJoinModal.vue';
import FriendsStatusBar from '@/components/elements/FriendsStatusBar.vue';
import GuideButton from '@/components/elements/GuideButton.vue';
import IntroductionSection from '@/components/views/home/sections/02-introduction/IntroductionSection.vue';
import KioskMode from '@/components/elements/KioskMode.vue';
import LanguageSwitch from '@/components/elements/LanguageSwitch.vue';
import MainNavigation from '@/components/elements/MainNavigation.vue';
import MatchSection from '@/components/views/home/sections/05-match/MatchSection.vue';
import SectionWatcher from '@/components/elements/SectionWatcher.vue';
import StartSection from '@/components/views/home/sections/01-start/StartSection.vue';
import ThesesSection from '@/components/views/home/sections/03-theses/ThesesSection.vue';
import PartySection from '@/components/views/home/sections/04-party/PartySection.vue';

export default {
  name: 'Home',
  data() {
    return {
      ready: false,
      showLanguageSwitch: false,
      showFriendsInviteModal: false,
      showFriendsJoinModal: false,
    };
  },
  mounted() {
    this.ready = true;
  },
  components: {
    CompareSection,
    FooterSection,
    FriendsInviteModal,
    FriendsJoinModal,
    FriendsStatusBar,
    GuideButton,
    IntroductionSection,
    KioskMode,
    LanguageSwitch,
    MainNavigation,
    MatchSection,
    SectionWatcher,
    StartSection,
    ThesesSection,
    PartySection,
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

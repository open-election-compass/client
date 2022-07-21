<template>
  <div>
    <LanguageSwitch :visible="showLanguageSwitch" @close="showLanguageSwitch = false" />
    <FriendsJoinModal :visible="showFriendsJoinModal" @close="showFriendsJoinModal = false" />
    <FriendsInviteModal :visible="showFriendsInviteModal" @close="showFriendsInviteModal = false" />
    <FriendsStatusBar />
    <MainNavigation
      @open-language-switch="showLanguageSwitch = true"
      @open-friends-join-modal="showFriendsJoinModal = true"
      @open-friends-invite-modal="showFriendsInviteModal = true"
      @reset="bus.emit('reset', { seconds: 15 })"
    >
      <template v-slot:site>
        <SectionWatcher>
          <start-section />
          <main :aria-roledescription="$t('views.home.home.role-aria')">
            <introduction-section />
            <theses-section />
            <party-section v-if="thesesComplete" />
            <match-section v-if="partiesChosen" />
            <compare-section v-if="partiesChosen" />
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
import CompareSection from '/src/components/views/home/sections/06-compare/CompareSection.vue';
import FooterSection from '/src/components/views/home/sections/07-footer/FooterSection.vue';
import FriendsInviteModal from '/src/components/elements/FriendsInviteModal.vue';
import FriendsJoinModal from '/src/components/elements/FriendsJoinModal.vue';
import FriendsStatusBar from '/src/components/elements/FriendsStatusBar.vue';
import GuideButton from '/src/components/elements/GuideButton.vue';
import IntroductionSection from '/src/components/views/home/sections/02-introduction/IntroductionSection.vue';
import KioskMode from '/src/components/elements/KioskMode.vue';
import LanguageSwitch from '/src/components/elements/LanguageSwitch.vue';
import MainNavigation from '/src/components/elements/MainNavigation.vue';
import MatchSection from '/src/components/views/home/sections/05-match/MatchSection.vue';
import SectionWatcher from '/src/components/elements/SectionWatcher.vue';
import StartSection from '/src/components/views/home/sections/01-start/StartSection.vue';
import ThesesSection from '/src/components/views/home/sections/03-theses/ThesesSection.vue';
import PartySection from '/src/components/views/home/sections/04-party/PartySection.vue';

export default {
  name: 'HomeView',
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
  computed: {
    thesesComplete() {
      return this.$store.getters['theses/complete'];
    },
    partiesChosen() {
      return this.$store.getters['parties/chosen'];
    },
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

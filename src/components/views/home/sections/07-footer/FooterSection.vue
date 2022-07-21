<template>
  <footer class="footer-section">
    <PageSection class="footer-section__links" :padding="false">
      <nav>
        <ul>
          <li v-for="(link, index) in footerLinks" :key="index">
            <a :href="$t(`footer-links.${index}.href`)" target="_blank">
              {{ $t(`footer-links.${index}.text`) }}
            </a>
          </li>
        </ul>
      </nav>
    </PageSection>
    <PageSection class="footer-section__open-source">
      <div class="footer-section__project">
        <OpenElectionCompassLogo class="footer-section__logo" width="50px" color="#718096" />
        <i18n-t
          class="footer-section__project-link"
          keypath="views.home.footer.section.explanation"
          tag="p"
          for="oec"
        >
          <a href="https://open-election-compass.com" target="_blank">{{
            $t('views.home.footer.section.oec')
          }}</a>
        </i18n-t>
      </div>
    </PageSection>
  </footer>
</template>

<script>
import OpenElectionCompassLogo from '/src/components/elements/OpenElectionCompassLogo.vue';
import PageSection from '/src/components/elements/PageSection.vue';

export default {
  name: 'FooterSection',
  components: {
    PageSection,
    OpenElectionCompassLogo,
  },
  computed: {
    footerLinks() {
      return this.$store.getters['footerLinks/links'];
    },
  },
};
</script>

<style lang="scss">
.footer-section__links {
  background-color: #e2e8f0;
  color: #fff;
  nav {
    color: #718096;
  }
  ul {
    @media (min-width: 48em) {
      display: flex;
      justify-content: center;
    }
  }
  a {
    padding: 1em;
    display: block;
  }
}

.footer-section__open-source {
  background-color: #2d3748;
}

.footer-section__logo {
  flex: none;
  margin: 0 auto 1.5em auto;
  @media (min-width: 40em) {
    margin-top: 0;
    margin-inline-end: 2em;
    margin-bottom: 0;
    margin-inline-start: 0;
  }
}

.footer-section__project {
  max-width: 20em;
  margin: 0 auto;
  @media (min-width: 40em) {
    display: flex;
    align-items: center;
  }
}

.footer-section__project-link {
  font-size: 0.875em;
  font-weight: bold;
  color: #718096;
  text-align: center;
  @media (min-width: 40em) {
    text-align: start;
  }
  a {
    text-decoration: underline;
  }
}
</style>

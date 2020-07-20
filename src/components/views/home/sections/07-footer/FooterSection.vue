<template>
  <footer role="contentinfo">
    <page-section class="bg-gray-300 text-white" :padding="false">
      <nav class="text-gray-600">
        <ul class="
          justify-center -mx-4
          md:flex
        ">
          <li
            v-for="(link, index) in footerLinks"
            :key="index"
          >
            <a
              :href="$t(`footer-links.${index}.href`)"
              class="p-4 block"
            >
              {{ $t(`footer-links.${index}.text`) }}
            </a>
          </li>
        </ul>
      </nav>
    </page-section>
    <page-section class="bg-gray-800">
      <div class="max-w-xs mx-auto">
        <div class="sm:flex items-center">
          <open-election-compass-logo
            width="50px"
            color="#718096"
            class="
              flex-none mb-6 mx-auto
              sm:m-0 sm:mr-8
            "
          />
          <i18n
            class="
              text-sm font-bold text-medium text-gray-600 text-center
              sm:text-left
            "
            path="explanation"
            tag="p"
            for="oec"
          >
            <a
              href="https://open-election-compass.com"
              target="_blank"
              class="underline"
            >{{ $t('oec') }}</a>
          </i18n>
        </div>
      </div>
    </page-section>
  </footer>
</template>

<script>
export default {
  computed: {
    footerLinks() {
      return this.$store.getters['footerLinks/links'];
    },
  },
};
</script>

<!-- eslint-disable max-len -->
<i18n>
{
  "en": {
    "explanation": "This election compass is based on the free open source project {0}.",
    "oec": "OpenElectionCompass"
  },
  "de": {
    "explanation": "Dieser Wahlkompass basiert auf dem freien Open Source Projekt {0}.",
    "oec": "OpenElectionCompass"
  }
}
</i18n>
<!-- eslint-enable max-len -->

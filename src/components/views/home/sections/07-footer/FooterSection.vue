<template>
  <footer>
    <page-section class="bg-gray-300 text-white" :padding="false">
      <nav class="text-gray-600">
        <ul class="flex justify-center">
          <li
            v-for="(link, index) in footerLinks"
            :key="index"
          >
            <a :href="link.href" class="p-4 block">{{ link.text }}</a>
          </li>
        </ul>
      </nav>
    </page-section>
    <page-section class="bg-gray-800">
      <div class="max-w-sm mx-auto">
        <div class="lg:flex">
          <open-election-compass-logo
            width="50px"
            color="#718096"
            class="flex-none lg:mr-8"
          />
          <i18n
            class="text-sm font-bold text-medium text-gray-600"
            path="explanation"
            tag="p"
            for="oec"
          >
            <a
              href="https://open-election-compass.com"
              target="_blank"
              class="underline"
            >
              {{ $t('oec') }}
            </a>
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
      return this.$t('footer-links');
    },
  },
};
</script>

<!-- eslint-disable max-len -->
<i18n>
{
  "en": {
    "explanation": "This election compass is based on the open source project {0} which is free to use.",
    "oec": "Open Election Compass"
  },
  "de": {
    "explanation": "Die technische Umsetzung dieses Wahlkompasses wird ermöglicht durch das Open Source Projekt {0}. Der Code ist unter einer freien Lizenz für jeden zugänglich.",
    "oec": "Open Election Compass"
  }
}
</i18n>
<!-- eslint-enable max-len -->

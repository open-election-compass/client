<template>
  <page-section
    class="bg-gray-200 text-gray-600"
    data-section="introduction"
  >
    <h2 class="
      text-2xl leading-tight font-bold mb-10
      sm:text-3xl
      lg:text-4xl
    ">
      {{ $t('introduction.heading') }}
    </h2>
    <p class="sm:text-xl lg:text-2xl">
      {{ $t('introduction.text') }}
    </p>
  </page-section>
</template>

<script>
export default {
  name: 'IntroductionSection',
};
</script>

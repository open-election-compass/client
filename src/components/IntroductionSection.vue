<template>
  <div
    class="container max-w-2xl mx-auto p-8 bg-gray-200 text-gray-600"
  >
    <h2 class="text-2xl leading-tight font-bold mb-10">
      {{ $t('introduction.heading') }}
    </h2>
    <p>
      {{ $t('introduction.text') }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'IntroductionSection',
};
</script>

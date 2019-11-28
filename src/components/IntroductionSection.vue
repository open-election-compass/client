<template>
  <div
    class="container max-w-2xl mx-auto mt-32 mb-32"
  >
    <h2 class="text-3xl text-primary font-bold mb-10">
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

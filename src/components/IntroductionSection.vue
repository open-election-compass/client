<template>
  <div class="bg-gray-200">
    <div
      class="
        container max-w-2xl mx-auto p-8 text-gray-600
        sm:py-16
        lg:py-24
      "
    >
      <h2 class="text-2xl leading-tight font-bold mb-10">
        {{ $t('introduction.heading') }}
      </h2>
      <p>
        {{ $t('introduction.text') }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IntroductionSection',
};
</script>

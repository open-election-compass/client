<template>
  <div class="bg-gray-200">
    <div
      class="
        container max-w-2xl mx-auto p-8 text-gray-600
        sm:py-16 sm:max-w-3xl
        lg:py-24 lg:max-w-4xl
      "
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'IntroductionSection',
};
</script>

<template>
  <header
    class="container mx-auto p-8 flex flex-col h-screen content-center justify-center"
    data-section="start"
    role="banner"
    :aria-roledescription="$t('banner-aria')"
  >
    <!-- wrapping div needed for IE11 -->
    <div class="self-center flex-initial">
      <open-election-compass-logo />
    </div>
    <!-- `self-center` needed for IE11 -->
    <h1 class="
      self-center text-2xl leading-tight text-center max-w-4xl mx-auto my-8
      md:text-5xl md:my-16
      lg:text-6xl
    ">
      {{ $t('title') }}
    </h1>
    <!-- `self-center` needed for IE11 -->
    <p class="
      self-center text-sm text-center text-gray-700
      md:text-lg
      lg:text-xl
    ">{{ $t('subtitle') }}</p>
  </header>
</template>

<script>
export default {
  name: 'StartSection',
};
</script>

<i18n>
{
  "en": {
    "banner-aria": "Start section"
  },
  "de": {
    "banner-aria": "Startseite"
  }
}
</i18n>

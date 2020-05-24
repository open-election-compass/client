<template>
  <header
    class="container mx-auto p-8 flex flex-col h-screen content-center justify-center"
    data-section="start"
    role="banner"
    :aria-roledescription="$t('banner-aria')"
  >
    <open-election-compass-logo class="self-center"/>
    <h1 class="
      text-2xl leading-tight text-center max-w-4xl mx-auto my-8
      md:text-5xl md:my-16
      lg:text-6xl
    ">
      {{ $t('title') }}
    </h1>
    <p class="
      text-sm text-center text-gray-700
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

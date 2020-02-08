<template>
  <div
    class="container mx-auto p-8 flex flex-col h-screen content-center justify-center"
    data-guide-section="start"
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
      text-sm text-center text-gray-500
      md:text-lg
      lg:text-xl
    ">{{ $t('subtitle') }}</p>
  </div>
</template>

<script>
export default {
  name: 'StartSection',
};
</script>

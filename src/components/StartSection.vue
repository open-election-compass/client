<template>
  <div class="container mx-auto p-8 flex flex-col h-screen content-center justify-around">
    <img
      src="../assets/logo.svg"
      alt="Open Election Compass"
      style="width: 30%; max-width:100px;"
      class="self-center"
    />
    <h1 class="
      text-2xl leading-tight text-center max-w-4xl mx-auto
      md:text-5xl
      lg:text-6xl
    ">
      {{ $t('title') }}
    </h1>
    <a class="
      bg-primary text-color-white px-4 py-2 rounded inline-block self-center
      md:text-lg md:px-6 md:py-3
      lg:text-2xl lg:px-8 lg:py-4
    ">
      <span class="mr-4 md:mr-6 lg:mr-8">Los geht's</span>
      <icon name="chevron-right" :monospace="false" />
    </a>
    <p class="
      text-sm text-center text-gray-500
      md:text-lg
    ">{{ $t('subtitle') }}</p>
  </div>
</template>

<script>
export default {
  name: 'StartSection',
};
</script>

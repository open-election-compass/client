<template>
  <div class="container mx-auto p-8 flex flex-col h-screen content-center justify-around">
    <img
      src="../assets/logo.svg"
      alt="Open Election Compass"
      style="width: 30%; max-width:100px;"
      class="self-center"
    />
    <h1 class="text-2xl leading-tight text-center">
      {{ $t('title') }}
    </h1>
    <a class="bg-primary text-color-white p-4 rounded inline-block self-center">Los geht's</a>
    <p class="text-sm text-center text-gray-500">{{ $t('subtitle') }}</p>
  </div>
</template>

<script>
export default {
  name: 'StartSection',
};
</script>

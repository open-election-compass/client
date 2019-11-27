<template>
  <div class="container mx-auto px-4 flex flex-col h-screen content-center justify-center">
    <img
      src="../assets/logo.svg"
      alt="Open Election Compass"
      style="width:100px;"
      class="self-center mb-24"
    />
    <h1 class="text-5xl text-center">
      {{ $t('title') }}<br>
      <small>{{ $t('subtitle') }}</small>
    </h1>
  </div>
</template>

<script>
export default {
  name: 'home',
};
</script>

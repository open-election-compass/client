<template>
  <div>
    <div
      class="
        container max-w-2xl mx-auto p-8
        sm:py-16 sm:max-w-3xl
        lg:py-24 lg:max-w-4xl
      "
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageSection',
};
</script>

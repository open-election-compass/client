<template>
  <div>
    <div
      class="
        container max-w-2xl mx-auto
        sm:max-w-3xl
        lg:max-w-4xl
      "
      :class="classes"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageSection',
  props: {
    padding: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    classes() {
      return {
        'p-8 sm:py-16 lg:py-24': this.padding,
        'px-8': !this.padding,
      };
    },
  },
};
</script>

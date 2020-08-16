<template>
  <!--
    The additional flexbox is only needed for IE 11. Please remove earliest 2050 ;)
    https://stackoverflow.com/questions/19371626/flexbox-not-centering-vertically-in-ie/33222765#33222765
  -->
  <div :class="this.full ? 'flex flex-col' : ''">
    <div
      class="
        container max-w-2xl mx-auto
        sm:max-w-3xl
        lg:max-w-4xl
        xl:max-w-5xl
      "
      :class="containerClasses"
    >
      <div :class="slotClasses">
        <slot></slot>
      </div>
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
    full: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    containerClasses() {
      return {
        'p-8 sm:py-16 lg:py-24': this.padding,
        'px-8': !this.padding,
        'min-h-screen flex flex-col justify-center': this.full,
      };
    },
    slotClasses() {
      return {
        'flex-initial': this.full,
      };
    },
  },
};
</script>

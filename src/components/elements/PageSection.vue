<template>
  <component
    :is="tag"
    :class="{
      'page-section': true,
      'page-section--full': full,
      'page-section--padding': padding,
    }"
  >
    <div class="page-section__container">
      <div class="page-section__slot">
        <slot></slot>
      </div>
    </div>
  </component>
</template>

<script>
export default {
  name: 'PageSection',
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    padding: {
      type: Boolean,
      default: true,
    },
    full: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
.page-section {
  &.page-section--full {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    // The additional flexbox is only needed for IE 11. Please remove earliest 2050 ;)
    // https://stackoverflow.com/questions/19371626/flexbox-not-centering-vertically-in-ie/33222765#33222765
  }
}

.page-section__container {
  max-width: 64em;
  margin: 0 auto;
}

.page-section.page-section--full {
  .page-section__container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
  }
  .page-section__slot {
    flex: 0 1 auto;
  }
}

.page-section.page-section--padding {
  .page-section__container {
    padding: 2em;
    @media (min-width: 40em) {
      padding: 4em;
    }
    @media (min-width: 64em) {
      padding: 6em;
    }
  }
}
</style>

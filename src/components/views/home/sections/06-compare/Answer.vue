<template>
  <div>
    <blockquote class="my-8">
      <footer>
        <cite class="not-italic font-bold block mb-6 text-center">
          {{ $t(`parties.${party.index}.short`) }}
        </cite>
      </footer>
      <p class="bubble" :class="`bubble-${position}`">
        <span class="block text-center text-3xl pt-2 pb-4">
          <icon v-if="position === 'approve'" name="check" />
          <icon v-else-if="position === 'neutral'" name="minus" />
          <icon v-else-if="position === 'reject'" name="times" />
        </span>
        {{ $t(`theses.${thesis.index}.positions.${party.alias}.explanation`) }}
      </p>
    </blockquote>
  </div>
</template>

<script>
export default {
  name: 'Answer',
  props: {
    party: {
      type: Object,
      required: true,
    },
    thesis: {
      type: Object,
      required: true,
    },
  },
  computed: {
    position() {
      return this.thesis.positions[this.party.alias];
    },
  },
};
</script>

<style lang="scss" scoped>
  .bubble {
    @apply rounded p-4 relative;
    &::before {
      @apply absolute;
      content: '';
      top: -2rem;
      left: 50%;
      margin-left: -1rem;
      border-width: 1rem;
      border-color: transparent;
      border-style: solid;
    }
    &.bubble-approve {
      @apply bg-green-200 text-green-800;
      &::before {
        border-bottom-color: theme('colors.green.200');
      }
    }
    &.bubble-neutral {
      @apply bg-gray-200 text-gray-800;
      &::before {
        border-bottom-color: theme('colors.gray.200');
      }
    }
    &.bubble-reject {
      @apply bg-red-200 text-red-800;
      &::before {
        border-bottom-color: theme('colors.red.200');
      }
    }
    &.bubble-skip {
      @apply bg-green-100 text-green-300;
      &::before {
        border-bottom-color: theme('colors.green.100');
      }
    }
  }
</style>

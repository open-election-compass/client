<template>
  <div>
    <blockquote class="
      mt-8 flex flex-col
    ">
      <p class="
        bubble order-2 flex-auto
        xl:max-w-2xl xl:mx-auto
      ">
        <show-more :text="$t(`theses.${thesis.index}.positions.${party.alias}.explanation`)" />
      </p>
      <footer class="order-1 flex-none">
        <cite class="
          not-italic block mb-8 text-center
          md:text-lg
          lg:mb-12 lg:text-xl
        ">
          <span class="block font-bold mb-2">
            {{ $t(`parties.${party.index}.short`) }}
          </span>
          <span class="block-inline text-sm bg-gray-500 text-white rounded-full p-2 pr-3">
            <icon class="mr-1" name="minus" />
            <span class="font-bold">
              {{ $t('neutral') }}
            </span>
          </span>
        </cite>
      </footer>
    </blockquote>
  </div>
</template>

<script>
export default {
  name: 'AnswerNeutral',
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
};
</script>

<style lang="scss" scoped>
  .bubble {
    @apply rounded p-4 relative bg-gray-200 text-gray-800;
    &::before {
      position: absolute;
      content: '';
      top: -1rem;
      left: 50%;
      margin-left: -1rem;
      border-width: 0 1rem 1rem 1rem;
      border-color: transparent transparent theme('colors.gray.200') transparent;
      border-style: solid;
    }
  }
  @screen lg {
    .bubble {
      @apply p-8 text-lg;
    }
  }
</style>

<i18n>
{
  "en": {
    "neutral": "neutral"
  },
  "de": {
    "neutral": "neutral"
  }
}
</i18n>

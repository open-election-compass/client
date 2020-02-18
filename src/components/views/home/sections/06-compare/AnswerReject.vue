<template>
  <div class="
    xl:ml-32 xl:-mr-32
    2xl:ml-56 2xl:-mr-56
  ">
    <blockquote class="
      mt-8 flex flex-col
      lg:flex-row
    ">
      <p class="
        bubble order-2 lg:order-1 flex-auto
        xl:max-w-2xl
      ">
        <show-more :text="$t(`theses.${thesis.index}.positions.${party.alias}.explanation`)" />
      </p>
      <footer class="order-1 lg:order-2 flex-none">
        <cite class="
          not-italic block mb-8 text-center
          md:text-lg
          lg:py-6 lg:text-left lg:ml-12 lg:text-xl
        ">
          <span class="block font-bold mb-2">
            {{ $t(`parties.${party.index}.short`) }}
          </span>
          <span class="block-inline text-sm bg-red-400 text-white rounded-full p-2 pr-3">
            <icon class="mr-1" name="times" />
            <span class="font-bold">
              {{ $t('rejects') }}
            </span>
          </span>
        </cite>
      </footer>
    </blockquote>
  </div>
</template>

<script>
export default {
  name: 'AnswerReject',
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
    @apply rounded p-4 relative bg-red-200 text-red-800;
    &::before {
      position: absolute;
      content: '';
      top: -1rem;
      left: 50%;
      margin-left: -1rem;
      border-width: 0 1rem 1rem 1rem;
      border-color: transparent transparent theme('colors.red.200') transparent;
      border-style: solid;
    }
  }
  @screen lg {
    .bubble {
      @apply p-8 text-lg;
      &::before {
          top: 2rem;
          left: auto;
          right: -1rem;
          border-color: transparent transparent transparent theme('colors.red.200');
          border-width: 1rem 0 1rem 1rem;
      }
    }
  }
</style>

<i18n>
{
  "en": {
    "rejects": "rejects"
  },
  "de": {
    "rejects": "lehnt ab"
  }
}
</i18n>

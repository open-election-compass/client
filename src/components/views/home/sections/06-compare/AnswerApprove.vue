<template>
  <div class="
    xl:-ml-48
    2xl:-ml-56
  ">
    <blockquote class="
      mt-8 flex flex-col
      lg:flex-row
    ">
      <p class="
        bubble order-2 flex-auto
        xl:max-w-2xl
      ">
        {{ $t(`theses.${thesis.index}.positions.${party.alias}.explanation`) }}
      </p>
      <footer class="order-1 flex-none">
        <cite class="
          not-italic block mb-8 text-center
          lg:py-6 lg:text-right lg:mr-12
        ">
          <span class="block font-bold">
            {{ $t(`parties.${party.index}.short`) }}
          </span>
          <span class="text-sm text-green-500">
            <icon class="mr-1" name="check" />
            <span>
              {{ $t('approves') }}
            </span>
          </span>
        </cite>
      </footer>
    </blockquote>
  </div>
</template>

<script>
export default {
  name: 'AnswerApprove',
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
    @apply rounded p-4 relative bg-green-200 text-green-800;
    &::before {
      position: absolute;
      content: '';
      top: -1rem;
      left: 50%;
      margin-left: -1rem;
      border-width: 0 1rem 1rem 1rem;
      border-color: transparent transparent theme('colors.green.200') transparent;
      border-style: solid;
    }
  }
  @screen lg {
    .bubble {
      @apply p-8 text-lg;
      &::before {
        top: 2rem;
        left: 0;
        border-width: 1rem 1rem 1rem 0;
        border-color: transparent theme('colors.green.200') transparent transparent;
      }
    }
  }
</style>

<i18n>
{
  "en": {
    "approves": "approves"
  },
  "de": {
    "approves": "stimmt zu"
  }
}
</i18n>

<template>
  <div>
    <blockquote
      class="
        mt-8 flex flex-col
      "
      :aria-label="$t('answer-aria', {
        party: $t(`parties.${party.index}.name`),
        answer: $t(`theses.${thesis.index}.positions.${party.alias}.explanation`),
      })"
    >
      <p
        class="
          bubble order-2 flex-auto
          xl:max-w-2xl xl:mx-auto xl:self-center
        "
        aria-hidden="true"
      >
        <show-more :text="$t(`theses.${thesis.index}.positions.${party.alias}.explanation`)" />
      </p>
      <footer class="order-1 flex-none" aria-hidden="true">
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

<!-- eslint-disable max-len -->
<i18n>
{
  "en": {
    "neutral": "neutral",
    "answer-aria": "The party '{party}' remains neutral to this thesis, providing the following answer: {answer}"
  },
  "de": {
    "neutral": "neutral",
    "answer-aria": "Die Partei '{party}' bleibt bei dieser These neutral, mit der folgenden Begründung: {answer}"
  }
}
</i18n>
<!-- eslint-enable max-len -->

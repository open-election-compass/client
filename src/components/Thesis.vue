<template>
  <div class="p-8">
    <strong class="text-2xl leading-tight text-primary font-bold">{{ thesis.statement }}</strong>
    <div class="mt-8 flex flex-wrap">
      <button
        class="flex-1 border-2 border-green-400 text-green-600 p-4 rounded mr-2"
      >
        {{ $t('approve') }}
      </button>
      <button
        class="flex-1 border-2 border-gray-400 text-gray-600 p-4 rounded mr-2"
      >
        {{ $t('neutral') }}
      </button>
      <button
        class="flex-1 border-2 border-red-400 text-red-600 p-4 rounded"
      >
        {{ $t('disapprove') }}
      </button>
      <button
        class="text-gray-600 p-4 w-full"
      >
        {{ $t('skip') }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Thesis',
  props: {
    thesis: {
      type: Object,
      required: true,
    },
  },
};
</script>

<i18n>
{
  "en": {
    "approve": "Approve",
    "neutral": "Neutral",
    "disapprove": "Disapprove",
    "skip": "Skip"
  },
  "de": {
    "approve": "Stimme zu",
    "neutral": "Neutral",
    "disapprove": "Lehne ab",
    "skip": "Überspringen"
  }
}
</i18n>

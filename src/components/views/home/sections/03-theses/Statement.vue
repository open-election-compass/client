<template>
  <strong
    class="
      text-2xl leading-tight font-bold block
      sm:text-3xl sm:max-w-2xl
      md:text-4xl
      lg:text-5xl lg:max-w-3xl
    "
    :class="{
      'text-primary': status === null || status === 'skip',
      'text-green-400': status === 'approve',
      'text-gray-500': status === 'neutral',
      'text-red-400': status === 'reject',
    }"
  >
    <span class="relative text-gray-300">
      <span class="absolute" style="right:100%">{{ $t('quoteStart') }}</span>
    </span>
    {{ statement }}<span class="text-gray-300">{{ $t('quoteEnd') }}</span>
  </strong>
</template>

<script>
export default {
  name: 'Statement',
  props: {
    status: {
      type: String,
      required: true,
      validator(value) {
        return ['approve', 'reject', 'neutral', 'skip'].includes(value);
      },
    },
    statement: {
      type: String,
      required: true,
    },
  },
};
</script>

<i18n>
{
  "en": {
    "quoteStart": "‘",
    "quoteEnd": "’"
  },
  "de": {
    "quoteStart": "„",
    "quoteEnd": "“"
  }
}
</i18n>

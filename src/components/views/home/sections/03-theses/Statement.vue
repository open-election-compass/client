<template>
  <div>
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
    <template v-if="badge">
      <small class="
        rounded inline-block py-2 px-3 text-white font-bold mt-8 ml-auto
        md:text-lg
      "
      :class="{
        'bg-gray-500': status === null || status === 'skip' || status === 'neutral',
        'bg-green-400': status === 'approve',
        'bg-red-400': status === 'reject',
      }">
        <icon class="mr-2" :name="{
          approve: 'check',
          neutral: 'minus',
          reject: 'times',
          skip: 'circle',
        }[status]" />
        {{ $t(`badge.${status}`) }}
      </small>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Statement',
  props: {
    status: {
      type: String,
      default: null,
      validator(value) {
        return ['approve', 'reject', 'neutral', 'skip'].includes(value);
      },
    },
    statement: {
      type: String,
      required: true,
    },
    badge: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<i18n>
{
  "en": {
    "quoteStart": "‘",
    "quoteEnd": "’",
    "badge": {
      "approve": "You approved",
      "reject": "You rejected",
      "neutral": "You we're neutral",
      "skip": "You skipped this"
    }
  },
  "de": {
    "quoteStart": "„",
    "quoteEnd": "“",
    "badge": {
      "approve": "Du hast zugestimmt",
      "reject": "Du hast abgelehnt",
      "neutral": "Du warst neutral",
      "skip": "Übersprungen"
    }
  }
}
</i18n>

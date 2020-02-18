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
      <div class="block md:inline-block">
        <small class="
          rounded-full inline-block py-2 pl-3 pr-4 text-white font-bold mt-8
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
      </div>
    </template>
    <template v-if="badge && factor > 1">
      <div class="block mt-2 md:inline-block md:ml-4 md:mt-0">
        <small class="
          rounded-full inline-block py-2 pl-3 pr-4 text-white font-bold bg-primary
          md:text-lg
        ">
          <icon class="mr-2" name="exclamation-circle" />
          {{ $t(`badge.important`) }}
        </small>
      </div>
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
    factor: {
      type: Number,
      default: 1,
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
      "skip": "You skipped this",
      "important": "You marked this as important"
    }
  },
  "de": {
    "quoteStart": "„",
    "quoteEnd": "“",
    "badge": {
      "approve": "Du hast zugestimmt",
      "reject": "Du hast abgelehnt",
      "neutral": "Du warst neutral",
      "skip": "Übersprungen",
      "important": "Von dir als wichtig markiert"
    }
  }
}
</i18n>

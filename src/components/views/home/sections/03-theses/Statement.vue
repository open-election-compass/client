<template>
  <div>
    <!-- Counter and Title -->
    <small
      class="
        text-sm block text-left mb-4
        sm:pb-8 sm:text-base
        lg:text-xl
      "
      v-if="$root.$te(`theses.${index}.title`)"
    >
      <span
        class="font-bold text-black"
        aria-hidden="true"
      >
        {{ $t('thesis', { count: index + 1, total }) }}
      </span>
      <span class="text-gray-600">
        – {{ $t(`theses.${index}.title`) }}
      </span>
    </small>

    <!-- Counter only -->
    <small
      class="
        text-sm font-bold text-black block text-center mb-4
        sm:pb-8 sm:text-base
        lg:text-xl
      "
      aria-hidden="true"
      v-else
    >
      {{ $t('thesis', { count: index + 1, total }) }}
    </small>

    <!-- Statement -->
    <h3
      class="
        text-2xl leading-tight font-bold block transition duration-200
        sm:text-3xl sm:max-w-2xl
        md:text-4xl
        lg:text-5xl lg:max-w-3xl
      "
      :class="{
        'text-primary': status === null || status === 'skip',
        'text-green-400': status === 'approve',
        'text-gray-500': status === 'neutral',
        'text-red-400': status === 'reject',
        'line-through': status === 'skip',
      }"
      :aria-label="$t('statement-aria', { statement: $t(`theses.${index}.statement`) })"
    >
      <span class="relative text-gray-300" aria-hidden="true">
        <span class="absolute" style="right:100%">{{ $t('quoteStart') }}</span>
      </span>
      {{ $t(`theses.${index}.statement`) }}<span class="text-gray-300" aria-hidden="true">{{ $t('quoteEnd') }}</span><!-- eslint-disable-line max-len -->
    </h3>
    <template v-if="badge">
      <div
        class="block md:inline-block"
      >
        <small
          class="
            rounded-full inline-block py-2 pl-3 pr-4 text-white font-bold mt-8
            md:text-lg
          "
          :class="{
            'bg-gray-500': status === null || status === 'skip' || status === 'neutral',
            'bg-green-400': status === 'approve',
            'bg-red-400': status === 'reject',
          }"
          :aria-label="$t(`badge.${statusVariant}-aria`)"
        >
          <icon class="mr-2" :name="{
            approve: 'check',
            neutral: 'minus',
            reject: 'times',
            skip: 'circle',
          }[status]" />
          {{ $t(`badge.${statusVariant}`) }}
        </small>
      </div>
    </template>
    <template v-if="badge && factor > 1">
      <div
        class="block mt-2 md:inline-block md:ml-4 md:mt-0"
      >
        <small
          class="
            rounded-full inline-block py-2 pl-3 pr-4 text-white font-bold bg-primary
            md:text-lg
          "
          :aria-label="$t(`badge.important-aria`)"
        >
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
    index: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: null,
      validator(value) {
        return ['approve', 'reject', 'neutral', 'skip'].includes(value);
      },
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
  computed: {
    total() {
      return this.$store.getters['theses/total'];
    },
    statusVariant() {
      const variant = this.$store.getters['options/variant'];
      if (variant === 'accept-partly-reject' && this.status === 'neutral') {
        return 'partly';
      }
      return this.status;
    },
  },
};
</script>

<i18n>
{
  "en": {
    "thesis": "Thesis {count} / {total}",
    "statement-aria": "The thesis is: '{statement}'",
    "quoteStart": "‘",
    "quoteEnd": "’",
    "badge": {
      "approve": "You approved",
      "approve-aria": "You approved this thesis.",
      "reject": "You rejected",
      "reject-aria": "You rejected this thesis.",
      "neutral": "You we're neutral",
      "neutral-aria": "You we're neutral regarding this thesis.",
      "partly": "You agreed partly",
      "partly-aria": "You agreed partly with this thesis.",
      "skip": "You skipped this",
      "skip-aria": "You skipped this thesis.",
      "important": "You marked this as important",
      "important-aria": "You marked this thesis as important."
    }
  },
  "de": {
    "thesis": "These {count} / {total}",
    "statement-aria": "Die These lautet: '{statement}'",
    "quoteStart": "„",
    "quoteEnd": "“",
    "badge": {
      "approve": "Du hast zugestimmt",
      "approve-aria": "Du hast dieser These zugestimmt.",
      "reject": "Du hast abgelehnt",
      "reject-aria": "Du hast diese These abgelehnt.",
      "neutral": "Du warst neutral",
      "neutral-aria": "Du warst zu dieser These neutral.",
      "partly": "Du hast teilweise zugestimmt",
      "partly-aria": "Du hast dieser These teilweise zugestimmt.",
      "skip": "Übersprungen",
      "skip-aria": "Du hast diese These übersprungen.",
      "important": "Von dir als wichtig markiert",
      "important-aria": "Du hast diese These als wichtig markiert."
    }
  }
}
</i18n>

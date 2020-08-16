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
      :style="status !== null && status !== 'skip' ? `color:${colors.base}` : ''"
      :class="{
        'text-primary': status === null || status === 'skip',
        'line-through': status === 'skip',
      }"
      :aria-label="$t('statement-aria', { statement: $t(`theses.${index}.statement`) })"
    >
      <span class="relative text-gray-300" aria-hidden="true">
        <span class="absolute" style="right:100%">{{ $t('quoteStart') }}</span>
      </span>
      <Definitions :text="$t(`theses.${index}.statement`)" /><span class="text-gray-300" aria-hidden="true">{{ $t('quoteEnd') }}</span><!-- eslint-disable-line max-len -->
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
            'bg-gray-500': status === null || status === 'skip',
          }"
          :style="
            status !== null && status !== 'skip' ?
            `background:${colors.base};color:${colors.contrast}` :
            ''
          "
          :aria-label="badgeTextAria"
        >
          <icon class="mr-2" :name="option.icon" />
          {{ badgeText }}
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
import Definitions from '@/components/elements/Definitions.vue';

export default {
  name: 'Statement',
  components: {
    Definitions,
  },
  props: {
    index: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: null,
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
    algorithm() {
      return this.$store.getters['algorithm/algorithm'];
    },
    skipped() {
      return this.status === null || this.status === 'skip';
    },
    option() {
      if (this.skipped) {
        return {
          icon: 'question',
          direction: 'neutral',
        };
      }
      return this.algorithm.options.find((option) => option.alias === this.status);
    },
    colors() {
      return this.algorithm.options.find((option) => option.alias === this.status).colors;
    },
    total() {
      return this.$store.getters['theses/total'];
    },
    badgeText() {
      if (this.skipped) {
        return this.$t('badge.skip');
      }
      return this.$t(`algorithm.options.${this.option.alias}.badge`);
    },
    badgeTextAria() {
      if (this.skipped) {
        return this.$t('badge.skip-aria');
      }
      return this.$t(`algorithm.options.${this.option.alias}.badge-aria`);
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
      "skip": "Übersprungen",
      "skip-aria": "Du hast diese These übersprungen.",
      "important": "Von dir als wichtig markiert",
      "important-aria": "Du hast diese These als wichtig markiert."
    }
  }
}
</i18n>

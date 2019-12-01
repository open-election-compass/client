<template>
  <div
    class="border-b-2 border-gray-300"
    v-if="hasBeenActivated"
    :data-test="`thesis-${index}`"
  >
    <div class="p-8">
      <small class="text-sm font-bold text-gray-600 block text-center mb-4">
        {{ $t('thesis', { count: index + 1, total }) }}
      </small>
      <strong
        class="
          text-2xl leading-tight font-bold
          sm:text-3xl
          md:text-4xl
        "
        :class="{
          'text-primary': status === null || status === 'skip',
          'text-green-400': status === 'approve',
          'text-gray-500': status === 'neutral',
          'text-red-400': status === 'reject',
        }"
      >{{ thesis.statement }}</strong>
    </div>
    <div class="text-right">
      <button
        @click="status === null ? status = 'skip' : status = null"
        class="
          text-gray-600 px-8 py-4 text-xs font-bold
          focus:outline-none
        "
        :data-test="`thesis-${index}-skip`"
      >
        {{ status === null ? $t('skip') : $t('clear') }}
      </button>
    </div>
    <div class="ml-8 mr-8 mb-8 rounded overflow-hidden">
      <button
        @click="status = 'approve'"
        class="
          w-full text-left border-gray-300 p-4 font-bold text-sm
          focus:outline-none"
        :class="status === 'approve' ? 'bg-green-400 text-white' : 'text-green-600 bg-gray-100'"
        :data-test="`thesis-${index}-approve`"
      >
        <icon name="check" />
        <span class="ml-4">{{ $t('approve') }}</span>
      </button>
      <button
        @click="status = 'neutral'"
        class="
          w-full text-left border-gray-300 p-4 font-bold text-sm
          focus:outline-none"
        :class="status === 'neutral' ? 'bg-gray-500 text-white' : 'text-gray-600 bg-gray-100'"
        :data-test="`thesis-${index}-neutral`"
      >
        <icon name="minus" />
        <span class="ml-4">{{ $t('neutral') }}</span>
      </button>
      <button
        @click="status = 'reject'"
        class="
          w-full text-left border-gray-300 p-4 font-bold text-sm
          focus:outline-none"
        :class="status === 'reject' ? 'bg-red-400 text-white' : 'text-red-600 bg-gray-100'"
        :data-test="`thesis-${index}-reject`"
      >
        <icon name="times" />
        <span class="ml-4">{{ $t('reject') }}</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Thesis',
  props: {
    index: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    thesis: {
      type: Object,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      status: null,
      hasBeenActivated: this.index === 0,
    };
  },
  watch: {
    status() {
      this.$emit('status', this.status);
    },
    active(value) {
      if (value) {
        this.hasBeenActivated = true;
      }
    },
  },
};
</script>

<i18n>
{
  "en": {
    "thesis": "Thesis {count} / {total}",
    "approve": "Approve",
    "neutral": "Neutral",
    "reject": "Reject",
    "skip": "Skip",
    "clear": "Clear"
  },
  "de": {
    "thesis": "These {count} / {total}",
    "approve": "Zustimmung",
    "neutral": "Neutral",
    "reject": "Ablehnung",
    "skip": "Überspringen",
    "clear": "Zurücksetzen"
  }
}
</i18n>

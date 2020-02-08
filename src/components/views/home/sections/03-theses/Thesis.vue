<template>
  <div
    class="border-b-2 border-gray-300 min-h-screen flex flex-col justify-center"
    v-if="hasBeenActivated"
    :data-guide-section="`thesis-${index}`"
  >
    <div
      class="
        container max-w-2xl mx-auto flex-initial
        sm:py-16 sm:max-w-3xl
        lg:py-24 lg:max-w-4xl
      "
      :data-test="`thesis-${index}`"
    >
      <div class="p-8 sm:pb-16 lg:pb-24">
        <small class="
          text-sm font-bold text-black block text-center mb-4
          sm:pb-8 sm:text-base
          lg:text-xl
        ">
          {{ $t('thesis', { count: index + 1, total }) }}
        </small>
        <statement :status="status" :statement="$t(`theses.${index}.statement`)" />
      </div>
      <div class="text-right">
        <button
          @click="status = 'skip'"
          class="
            text-gray-600 px-4 py-2 mr-8 mb-2 text-xs font-bold rounded
            lg:text-base
            focus:outline-none
          "
          :data-test="`thesis-${index}-skip`"
        >
          {{ $t('skip') }}
          <icon name="arrow-right" />
        </button>
      </div>
      <div class="
        flex flex-col ml-8 mr-8 mb-8 rounded
        md:flex-row md:mx-6
      ">
        <vote-button
          @click="status = 'approve'"
          type="approve"
          :active="status === 'approve'"
          :data-test="`thesis-${index}-approve`"
          tab-index="1"
        />
        <vote-button
          @click="status = 'neutral'"
          type="neutral"
          :active="status === 'neutral'"
          :data-test="`thesis-${index}-neutral`"
          tab-index="2"
        />
        <vote-button
          @click="status = 'reject'"
          type="reject"
          :active="status === 'reject'"
          :data-test="`thesis-${index}-reject`"
          tab-index="3"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Statement from './Statement.vue';
import VoteButton from './VoteButton.vue';

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
  },
  computed: {
    active: {
      get() {
        const previousThesis = this.$store.getters['theses/theses'][this.index - 1];
        return previousThesis !== undefined && previousThesis.status !== null;
      },
    },
    status: {
      get() {
        return this.$store.getters['theses/theses'][this.index].status;
      },
      set(value) {
        this.$store.commit('theses/setStatus', {
          index: this.index,
          status: value,
        });
      },
    },
    hasBeenActivated: {
      get() {
        return this.$store.getters['theses/theses'][this.index].activated;
      },
      set() {
        return this.$store.dispatch('theses/activate', { index: this.index });
      },
    },
  },
  watch: {
    active(value) {
      if (value) {
        this.hasBeenActivated = true;
      }
    },
  },
  components: {
    Statement,
    VoteButton,
  },
};
</script>

<i18n>
{
  "en": {
    "thesis": "Thesis {count} / {total}",
    "skip": "Skip"
  },
  "de": {
    "thesis": "These {count} / {total}",
    "skip": "Überspringen"
  }
}
</i18n>

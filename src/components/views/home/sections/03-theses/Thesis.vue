<template>
  <!--
    The additional flexbox is only needed for IE 11. Please remove earliest 2050 ;)
    https://stackoverflow.com/questions/19371626/flexbox-not-centering-vertically-in-ie/33222765#33222765
  -->
  <div class="flex flex-col">
    <div
      class="
        border-b-2 border-gray-300 min-h-screen h-full flex flex-col justify-center
        transition-opacity duration-200
      "
      :class="status === 'skip' ? 'opacity-50 bg-gray-100' : ''"
      v-if="hasBeenActivated"
      :data-section="`thesis-${index}`"
      role="region"
      :aria-roledescription="$t('role-aria')"
      :aria-label="$t('region-aria', { count: index + 1, total })"
    >
      <div
        class="
          container max-w-2xl mx-auto flex-initial self-center
          sm:py-16 sm:max-w-3xl
          lg:pb-24 lg:max-w-4xl
        "
        :data-test="`thesis-${index}`"
      >

        <!-- Thesis -->
        <div class="p-8 sm:pb-16 lg:pb-24">
          <statement :index="index" :status="status" />
        </div>

        <!-- Buttons -->
        <div class="text-right">
          <button
            @click="clickVoteButton('skip')"
            class="
              text-gray-600 px-4 py-2 mr-8 mb-2 text-xs font-bold rounded
              lg:text-base
              focus:outline-none
            "
            :data-test="`thesis-${index}-skip`"
            :aria-label="$t('skip-aria')"
          >
            {{ $t('skip') }}
            <icon name="arrow-right" />
          </button>
        </div>
        <div class="
          flex flex-col mx-8 mb-4 rounded
          md:flex-row md:mx-6 md:mb-8
        ">
          <vote-button
            @click="clickVoteButton('approve')"
            type="approve"
            :active="status === 'approve'"
            :data-test="`thesis-${index}-approve`"
            tab-index="1"
          />
          <vote-button
            @click="clickVoteButton('neutral')"
            type="neutral"
            :active="status === 'neutral'"
            :data-test="`thesis-${index}-neutral`"
            tab-index="2"
          />
          <vote-button
            @click="clickVoteButton('reject')"
            type="reject"
            :active="status === 'reject'"
            :data-test="`thesis-${index}-reject`"
            tab-index="3"
          />
        </div>

        <!-- Important Toggle -->
        <div
          class="
            mx-8 mt-8 text-center
            md:mx-6 md:mt-12 lg:mt-24
          "
          :class="status === 'neutral' || limited ? 'opacity-25' : ''"
        >
          <div class="inline-block">
            <tooltip
              class="tooltip"
              :content="$t('too-many-important', { count: maxImportant })"
              :enabled="limited && status !== 'neutral' && status !== 'skip'"
              :a11y="false"
              size="large"
              trigger="mouseenter focusin"
            >
              <label
                :for="`important-${index}`"
                class="
                  p-3 pr-4 cursor-pointer focusable-child
                  rounded-full border border-solid
                  transition shadow-md hover:shadow-lg duration-200
                "
                :class="
                  factor > 1 ?
                  'bg-primary text-white border-yellow-600' :
                  'bg-gray-100 text-gray-600 border-gray-300'
                "
                :aria-label="$t('important-aria')"
              >
                <input
                  class="sr-only"
                  type="checkbox"
                  :name="`important-${index}`"
                  :id="`important-${index}`"
                  v-model="factor"
                  :true-value="2"
                  :false-value="1"
                />
                <icon :name="factor === 1 ? 'circle' : 'exclamation-circle'" />
                <span class="ml-3 font-bold">
                  {{ $t('important') }}
                </span>
              </label>
            </tooltip>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Statement from './Statement.vue';
import VoteButton from './VoteButton.vue';

export default {
  name: 'Thesis',
  props: {
    index: {
      type: Number,
      required: true,
    },
    thesis: {
      type: Object,
      required: true,
    },
  },
  methods: {
    clickVoteButton(status) {
      if (status === 'neutral' || status === 'skip') {
        this.factor = 1;
      }
      this.status = status;
    },
  },
  computed: {
    ...mapGetters({
      total: 'theses/total',
      countImportant: 'theses/countImportant',
      maxImportant: 'theses/maxImportant',
    }),
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
    factor: {
      get() {
        return this.$store.getters['theses/theses'][this.index].factor;
      },
      set(value) {
        if (['neutral', 'skip'].includes(this.status) || this.limited) {
          // The important-button is greyed out, so we're stopping here. Instead of doing this check
          // here, we could simply disable the checkbox of the important-button, but it would then
          // no longer be able to receive focus. This would lead to the tooltip explaining why the
          // user cannot mark this thesis as important being skipped. This however is vital for
          // screen readers.
          return;
        }
        this.$store.commit('theses/setFactor', {
          index: this.index,
          factor: value,
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
    limited() {
      return this.countImportant >= this.maxImportant && this.factor < 2;
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
    "role-aria": "Thesis",
    "region-aria": "Thesis {count} of {total}",
    "skip": "I don't know",
    "skip-aria": "Skip – skips this thesis so it will not be counted.",
    "important": "Important to me",
    "important-aria": "Important – marks this thesis as important for you.",
    "too-many-important": "Please mark no more than {count} theses as important!"
  },
  "de": {
    "role-aria": "These",
    "region-aria": "These {count} von {total}",
    "skip": "Weiß ich nicht",
    "skip-aria": "Überspringen – überspringt diese These, sodass sie nicht gezählt wird.",
    "important": "Wichtig für mich",
    "important-aria": "Wichtig – markiert diese These als wichtig für dich.",
    "too-many-important": "Bitte markiere nicht mehr als {count} Thesen als wichtig!"
  }
}
</i18n>

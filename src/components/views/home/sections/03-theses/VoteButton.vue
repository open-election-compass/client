<template>
  <button
    @click="$emit('click', $event)"
    class="
      w-full text-left p-4 font-bold text-sm my-1 rounded relative overflow-hidden transition
      sm:text-base
      md:text-center md:mx-2 md:my-0 md:text-lg
      lg:text-xl
    "
    :class="classes"
  >
    <div :class="active && factor > 1 ? 'factor-1-hidden' : 'factor-1'">
      <icon v-if="type === 'approve'" name="check" />
      <icon v-else-if="type === 'neutral'" name="minus" />
      <icon v-else-if="type === 'reject'" name="times" />
      <span class="
        ml-4
        md:block md:mt-2 md:ml-0
      ">
        {{ $t(type) }}
      </span>
    </div>
    <transition name="factor-2">
      <div
        v-if="factor > 1 && active"
        class="absolute inset-0 flex justify-center items-center p-4 text-center"
      >
        <div class="flex-1">
          {{ $t('important') }}
        </div>
      </div>
    </transition>
  </button>
</template>

<script>
export default {
  name: 'VoteButton',
  props: {
    type: {
      type: String,
      required: true,
      validator(value) {
        return ['approve', 'neutral', 'reject'].includes(value);
      },
    },
    active: {
      type: Boolean,
      required: true,
    },
    factor: {
      type: Number,
      required: true,
    },
  },
  computed: {
    classes() {
      if (this.type === 'approve') {
        if (this.active) {
          if (this.factor > 1) {
            return 'bg-green-600 text-white';
          }
          return 'bg-green-400 text-white';
        }
        return 'bg-gray-100 text-green-600';
      }
      if (this.type === 'neutral') {
        if (this.active) {
          return 'bg-gray-500 text-white';
        }
        return 'bg-gray-100 text-gray-600';
      }
      if (this.type === 'reject') {
        if (this.active) {
          if (this.factor > 1) {
            return 'bg-red-600 text-white';
          }
          return 'bg-red-400 text-white';
        }
        return 'bg-gray-100 text-red-600';
      }
      return {
        'bg-green-400 text-white': this.type === 'approve' && this.active,
        'bg-gray-100 text-green-600': this.type === 'approve' && !this.active,
        'bg-gray-500 text-white': this.type === 'neutral' && this.active,
        'bg-gray-100 text-gray-600': this.type === 'neutral' && !this.active,
        'bg-red-400 text-white': this.type === 'reject' && this.active,
        'bg-gray-100 text-red-600': this.type === 'reject' && !this.active,
      };
    },
  },
};
</script>

<i18n>
{
  "en": {
    "approve": "Approve",
    "neutral": "Neutral",
    "reject": "Reject",
    "important": "Important!"
  },
  "de": {
    "approve": "Zustimmung",
    "neutral": "Neutral",
    "reject": "Ablehnung",
    "important": "Wichtig!"
  }
}
</i18n>

<style lang="scss" scoped>
  .factor-1 {
    transition: all 0.2s cubic-bezier(0.235, 1.470, 0.580, 0.995);
    opacity: 1;
    transform: translateY(0);
  }
  .factor-1-hidden {
    transition: all 0.2s cubic-bezier(0.235, 1.470, 0.580, 0.995);
    opacity: 0;
    transform: translateY(2em);
  }

  .factor-2-enter {
    opacity: 0;
    transform: translateY(-2em);
  }
  .factor-2-enter-active {
    transition: all 0.2s cubic-bezier(0.235, 1.470, 0.580, 0.995);
  }
  .factor-2-enter-to {
    opacity: 1;
    transform: translateY(0);
  }

  .factor-2-leave {
    opacity: 1;
    transform: translateY(0);
  }
  .factor-2-leave-active {
    transition: all 0.2s cubic-bezier(0.235, 1.470, 0.580, 0.995);
  }
  .factor-2-leave-to {
    opacity: 0;
    transform: translateY(-2em);
  }
</style>

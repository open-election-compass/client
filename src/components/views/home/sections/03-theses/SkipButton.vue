<template>
  <div :class="{
    'skip-button': true,
    'skip-button--disabled': disabled,
  }">
    <div class="skip-button__tooltip-wrapper">
      <!--
        Because IE11 cannot properly position the button using flexbox and other positioning methods
        cause the tooltip to be off, we're using the wrapper here.
      -->
      <tooltip
        class="tooltip"
        :content="$tc('too-many-skip', maxSkip)"
        :enabled="!tooltipDisabled"
        :a11y="false"
        size="large"
        trigger="mouseenter focusin"
      >
        <BaseButton
          class="skip-button__button"
          theme="transparent"
          size="small"
          right="arrow-right"
          :data-test="`thesis-skip`"
          :aria-label="$t('skip-aria')"
          @click="$emit('click', $event)"
        >
          {{ $t('skip') }}
        </BaseButton>
      </tooltip>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/elements/BaseButton.vue';

export default {
  name: 'SkipButton',
  components: {
    BaseButton,
  },
  props: {
    disabled: {
      type: Boolean,
      required: true,
    },
    tooltipDisabled: {
      type: Boolean,
      required: true,
    },
    maxSkip: {
      type: Number,
      required: true,
    },
  },
};
</script>

<!-- eslint-disable max-len -->
<i18n>
{
  "en": {
    "skip": "I don't know",
    "skip-aria": "Skip – skips this thesis so it will not be counted.",
    "too-many-skip": "There are only very few theses, so you cannot skip one. | Please skip no more than 1 thesis to receive a meaningful result! | Please skip no more than {count} theses to receive a meaningful result!"
  },
  "de": {
    "skip": "Weiß ich nicht",
    "skip-aria": "Überspringen – überspringt diese These, sodass sie nicht gezählt wird.",
    "too-many-skip": "Es gibt nur sehr wenige Thesen, du kannst daher keine überspringen. | Bitte überspringe nicht mehr als 1 These um ein aussagekräftiges Ergebnis zu erhalten! | Bitte überspringe nicht mehr als {count} Thesen um ein aussagekräftiges Ergebnis zu erhalten!"
  }
}
</i18n>
<!-- eslint-enable max-len -->

<style lang="scss">
.skip-button {
  text-align: right;
}
.skip-button__tooltip-wrapper {
  text-align: left;
  display: inline-block;
}

.skip-button__button {
  font-weight: bold;
}

.skip-button--disabled .skip-button__button {
  opacity: 0.25;
}
</style>

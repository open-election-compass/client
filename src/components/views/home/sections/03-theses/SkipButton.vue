<template>
  <div
    :class="{
      'skip-button': true,
      'skip-button--disabled': disabled,
    }"
  >
    <div class="skip-button__tooltip-wrapper">
      <!--
        Because IE11 cannot properly position the button using flexbox and other positioning methods
        cause the tooltip to be off, we're using the wrapper here.
      -->
      <TippyTooltip
        class="tooltip"
        :content="
          tooltipDisabled ? undefined : $tc('views.home.theses.skip-button.too-many-skip', maxSkip)
        "
        :a11y="false"
        trigger="mouseenter focusin"
      >
        <BaseButton
          class="skip-button__button"
          theme="transparent"
          size="small"
          :right="
            $store.getters['languages/active'].direction === 'ltr' ? 'arrow-right' : 'arrow-left'
          "
          :data-test="`thesis-skip`"
          :aria-label="$t('views.home.theses.skip-button.skip-aria')"
          @click="$emit('click', $event)"
        >
          {{ $t('views.home.theses.skip-button.skip') }}
        </BaseButton>
      </TippyTooltip>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SkipButton',
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

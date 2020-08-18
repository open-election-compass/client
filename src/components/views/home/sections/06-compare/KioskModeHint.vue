<template>
  <aside class="kiosk-mode-hint">
    <div class="kiosk-mode-hint__box">
      <Icon name="undo" />
    </div>
    <strong class="kiosk-mode-hint__heading">
      {{ $t('heading') }}
    </strong>
    <p>{{ $t('explanation') }}</p>
    <BaseButton
      class="kiosk-mode-hint__button"
      theme="negative"
      left="undo"
      size="small"
      @click="$root.$emit('reset', { seconds: 15 })"
    >
      {{ $t('reset') }}
    </BaseButton>
  </aside>
</template>

<script>
import BaseButton from '@/components/elements/BaseButton.vue';
import Icon from '@/components/elements/Icon.vue';

export default {
  name: 'KioskModeHint',
  components: {
    BaseButton,
    Icon,
  },
};
</script>

<!-- eslint-disable max-len -->
<i18n>
{
  "en": {
    "heading": "Please reset when you're done",
    "explanation": "Take your time reading and comparing the answers statements below. When you're done, you can reset the election compass here for the next person. This will also delete your own answers. Hint: you can also find a reset button in the menu. Thank you!",
    "reset": "Reset"
  },
  "de": {
    "heading": "Bitte setz mich zurück, wenn du fertig bist",
    "explanation": "Lies und vergleiche die Erklärungen unterhalb in Ruhe. Wenn du fertig bist, kannst du den Wahlkompass hier für die nächste Person zurücksetzen. Dadurch werden auch deine eigenen Antworten gelöscht. Tipp: Du findest diese Option auch im Menü. Vielen Dank!",
    "reset": "Zurücksetzen"
  }
}
</i18n>
<!-- eslint-enable max-len -->

<style lang="scss">
.kiosk-mode-hint {
  background-color: var(--theme-neutral-background);
  color: var(--theme-neutral-text);
  border-radius: var(--border-radius);
  padding: 1em;
  margin-top: 2em;
  text-align: center;
  @media (min-width: 48em) {
    padding: 1.5em;
    font-size: 1.125em;
  }
  @media (min-width: 60em) {
    padding: 2em;
  }
}

.kiosk-mode-hint__box {
  font-size: 1.125em;
  text-align: center;
  @media (min-width: 48em) {
    font-size: 1.25em;
  }
  @media (min-width: 60em) {
    font-size: 1.875em;
  }
}

.kiosk-mode-hint__heading {
  display: block;
  margin: 1em 0;
  @media (min-width: 48em) {
    font-size: 1.25em;
  }
  @media (min-width: 60em) {
    font-size: 1.5em;
  }
}

.kiosk-mode-hint__button {
  margin-top: 1em;
  @media (min-width: 48em) {
    margin-top: 1.5em;
  }
}
</style>

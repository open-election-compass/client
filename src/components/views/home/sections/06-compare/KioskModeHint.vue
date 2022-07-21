<template>
  <aside class="kiosk-mode-hint">
    <div class="kiosk-mode-hint__box">
      <IconDisplay name="undo" />
    </div>
    <strong class="kiosk-mode-hint__heading">
      {{ $t('views.home.compare.kiosk-mode-hint.heading') }}
    </strong>
    <p>{{ $t('views.home.compare.kiosk-mode-hint.explanation') }}</p>
    <BaseButton
      class="kiosk-mode-hint__button"
      theme="negative"
      left="undo"
      size="small"
      @click="bus.emit('reset', { seconds: 15 })"
    >
      {{ $t('views.home.compare.kiosk-mode-hint.reset') }}
    </BaseButton>
  </aside>
</template>

<script>
export default {
  name: 'KioskModeHint',
};
</script>

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

<template>
  <div
    :class="{
      'party-item': true,
      'party-item--selected': selected,
      'party-item--logo': showLogo && logo,
    }"
    role="listitem"
  >
    <button
      :for="`party-item-${index}-checkbox`"
      class="party-item__button"
      :aria-label="
        $t('views.home.party.party-item.party-aria', { party: $t(`parties.${index}.name`) })
      "
      role="checkbox"
      tabindex="0"
      :aria-checked="selected"
      @click="selected = !selected"
    >
      <div v-if="showLogo && logo" class="party-item__logo" aria-hidden="true">
        <img :src="logo" :alt="$t(`parties.${index}.name`)" />
      </div>
      <div class="party-item__caption" aria-hidden="true">
        <IconDisplay :name="selected ? 'check' : 'circle'" class="party-item__icon" />
        <div class="party-item__details" aria-hidden="true">
          <span class="party-item__short">{{ $t(`parties.${index}.short`) }}</span>
          <span class="party-item__name">{{ $t(`parties.${index}.name`) }}</span>
        </div>
      </div>
    </button>
  </div>
</template>

<script>
export default {
  name: 'PartyItem',
  props: {
    index: {
      type: Number,
      required: true,
    },
    showLogo: {
      type: Boolean,
      default: false,
    },
    logo: {
      type: String,
      default:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEXe4+j77++FAAAACklEQVR4AWNhAAAACgAF3HyfDQAAAABJRU5ErkJggg==',
    },
  },
  computed: {
    selected: {
      get() {
        return this.$store.getters['parties/parties'][this.index].selected;
      },
      set(value) {
        this.$store.commit('parties/setSelected', { index: this.index, value });
      },
    },
  },
};
</script>

<style lang="scss">
.party-item__button {
  width: 100%;
  padding: 1em;
  display: block;
  margin-bottom: 1em;
  align-items: center;
  justify-content: flex-start;
  border-radius: var(--border-radius);
  border: 1px solid var(--theme-neutral-border);
  cursor: pointer;
  transition-property: border-color, box-shadow, background-color;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;
  box-shadow: var(--shadow-normal);
  background-color: var(--theme-neutral-background);
  color: var(--theme-neutral-text);
  font-size: 1em;
  &:hover {
    box-shadow: var(--shadow-hover);
  }
  &:focus {
    outline: 0;
    box-shadow: var(--shadow-focus);
  }
  @media (min-width: 50em) {
    font-size: 1.25em;
  }
}

.party-item--selected .party-item__button {
  border: 1px solid var(--theme-primary-border);
  background-color: var(--theme-primary-background);
  color: var(--theme-primary-text);
}

.party-item__icon {
  color: #fff;
  margin-inline-end: 1em;
  flex: 0 1 auto;
}

.party-item__logo {
  flex: none;
  order: 2;
  img {
    width: 4em;
    height: 4em;
  }
  @media (min-width: 40em) {
    img {
      width: 5em;
      height: 5em;
    }
  }
  @media (min-width: 48em) {
    width: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
}

.party-item__caption {
  display: flex;
  align-items: center;
}

.party-item__details {
  flex: 1 1 auto;
  display: flex;
  align-items: center;
}

.party-item__short {
  flex: 0 1 auto;
  font-weight: bold;
  margin-inline-end: 2em;
}

.party-item__name {
  flex: 1 1 auto;
  text-align: end;
  word-wrap: anywhere;
  hyphens: auto;
  font-size: 1em;
  @media (min-width: 48em) {
    font-size: 0.75em;
  }
}

.party-item--logo {
  height: 100%;

  .party-item__button {
    display: flex;
    align-items: center;
    @media (min-width: 48em) {
      flex-direction: column;
      height: 100%;
    }
  }

  .party-item__caption {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    text-align: start;
    order: 1;
    width: 100%;
    @media (min-width: 48em) {
      align-items: flex-start;
      order: 2;
      margin-top: 1em;
    }
  }

  .party-item__details {
    display: block;
    flex: 1 1 auto;
    margin-right: 0.75em;
    span {
      display: block;
    }
    @media (min-width: 48em) {
      margin-inline-end: 0;
    }
  }

  .party-item__short {
    margin-inline-end: 0;
  }

  .party-item__name {
    text-align: start;
  }
}
</style>

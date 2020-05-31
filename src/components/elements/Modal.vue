<template>
  <transition name="fade" :duration="{ enter: 300, leave: 200 }">
    <div
      v-if="visible"
      class="modal"
      :class="classes"
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div class="modal__wrapper">
        <div class="modal__overlay" @click="$emit('close')" />
        <div class="modal__box">
          <div class="modal__header">
            <Icon :name="icon" class="modal__icon" :spin="icon === 'slash'" />
            <h1 id="modal__title" class="modal__title">
              {{ heading }}
            </h1>
            <p id="modal__description" class="modal__description">
              {{ description }}
            </p>
          </div>
          <div
            v-if="$slots.default"
            ref="content"
            v-scroll-lock="visible"
            class="modal__content"
          >
            <slot />
          </div>
          <div class="modal__actions">
            <BaseButton
              v-for="button in (buttons || defaultButton)"
              :key="button.eventName"
              :tag="button.tag || 'button'"
              :theme="button.theme"
              :left="button.left || ''"
              :right="button.right || ''"
              :disabled="button.disabled || false"
              :href="button.href || null"
              class="modal__action"
              @click="$emit(button.eventName)"
            >
              {{ button.caption }}
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="js">
import BaseButton from './BaseButton.vue';
import Icon from './Icon.vue';

export default {
  name: 'Modal',
  components: {
    BaseButton,
    Icon,
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    heading: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    buttons: {
      type: Array,
      default: null,
    },
    icon: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      default: 'normal',
      validator: (value) => ['slim', 'narrow', 'normal', 'wide'].includes(value),
    },
  },
  computed: {
    classes() {
      return [
        `modal--width-${this.width}`,
      ];
    },
    defaultButton() {
      return [
        {
          caption: this.$t('done'),
          theme: 'primary',
          eventName: 'close',
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/core.scss";

.modal__wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 400;
  padding: 1rem;
}

.modal__overlay {
  background-color: rgba(#FFF, 0.75);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.modal__box {
  position: relative;
  z-index: 30;
  height: auto;
  max-height: 90vh;
  width: 100%;
  max-width: 24rem;
  background-color: #FFF;
  border-radius: $border-radius;
  box-shadow: 0 2rem 8rem 0 rgba(#000, 0.25);
  color: $theme-base-text;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}
.modal.modal--width-slim .modal__box {
  max-width: 24rem;
}
.modal.modal--width-narrow .modal__box {
  max-width: 40rem;
}
.modal.modal--width-normal .modal__box {
  max-width: 60rem;
}
.modal.modal--width-wide .modal__box {
  max-width: 90rem;
}

.modal__header {
  padding: 1rem;
  text-align: center;
  flex: 1 0 auto;
}

.modal__icon {
  font-size: 2rem;
  margin-top: 1rem;
}

.modal__title {
  font-size: 2rem;
  margin: 1rem 0;
}

.modal__description {
  max-width: 40rem;
  margin-left: auto;
  margin-right: auto;
}

.modal__content {
  overflow-y: auto;
  padding: 1rem;
  flex: 1 1 auto;
  border-bottom: 2px solid $theme-base-border;
}

.modal__actions {
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  padding: 0.5rem;
  flex: 1 0 auto;
}

.modal__action {
  width: 100%;
  margin: 0.5rem;
  flex: 1 0 250px;
}

@media (min-width: 40rem) {
  .modal__actions {
    padding: 1rem;
  }

  .modal__action {
    margin: 1rem;
  }

  .modal__header {
    padding: 2rem;
  }

  .modal__content {
    padding: 2rem;
  }
}

.fade-enter-active, .fade-leave-active {
  .modal__overlay {
    transition: opacity 0.3s ease-out;
  }
  .modal__box {
    transition: opacity 0.15s ease-out, transform 0.3s ease-out;
  }
}
.fade-enter, .fade-leave-to {
  .modal__overlay {
    opacity: 0;
  }
  .modal__box {
    opacity: 0;
    transform: scale(0.9);
  }
}
</style>

<i18n>
{
  "en": {
    "done": "Done"
  },
  "de": {
    "done": "Fertig"
  }
}
</i18n>

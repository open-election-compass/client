<template>
  <Modal
    :visible="visible"
    :heading="$t('heading')"
    :icon="
      mode === 'INACTIVE' ? 'unlink' : mode === 'GUEST' ? 'project-diagram' : 'broadcast-tower'
    "
    name="friends"
    width="narrow"
    class="friends-status-modal"
    @close="$emit('close')"
  >
    <div
      :class="['friends-status-modal__mode', `friends-status-modal__mode--${mode.toLowerCase()}`]"
    >
      <strong>{{ $t(`mode.${mode}.heading`) }}</strong>
      <p>{{ $t(`mode.${mode}.text`) }}</p>
    </div>
    <FieldInput
      v-if="mode === 'HOST'"
      alias="own-peer-id"
      name="own-peer-id"
      type="text"
      :description="$t('own-peer-id.description')"
      rules=""
      readonly
      :value="ownPeerId"
    />
    <GuestsList v-if="mode === 'HOST'" />
    <FriendsList v-else />
  </Modal>
</template>

<script>
import FriendsList from './FriendsList.vue';
import GuestsList from './GuestsList.vue';

export default {
  name: 'FriendsStatusModal',
  components: {
    FriendsList,
    GuestsList,
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    mode() {
      return this.$store.getters['friends/mode'] || 'INACTIVE';
    },
    ownPeerId() {
      const ownPeer = this.$store.getters['friends/ownPeer'];
      if (ownPeer) {
        return ownPeer.id;
      }
      return null;
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/core.scss";

.friends-status-modal {
  &__mode {
    color: $theme-neutral-text;
    background: $theme-neutral-background;
    border: 1px solid $theme-neutral-border;
    border-radius: $border-radius;
    transition: all 0.25s ease-out;
    padding: 1rem;
    margin-bottom: 1rem;
    &--host {
      color: $theme-primary-text;
      background: $theme-primary-background;
      border-color: $theme-primary-border;
    }
    &--guest {
      color: $theme-positive-text;
      background: $theme-positive-background;
      border-color: $theme-positive-border;
    }
  }

  #field-own-peer-id {
    text-align: center;
    font-family: monospace;
    letter-spacing: 0.25em;
  }
}
</style>

<!-- eslint-disable max-len -->
<i18n>
{
  "en": {
    "heading": "Shared Session",
    "mode": {
      "INACTIVE": {
        "heading": "Not connected",
        "text": "You're not connected to anybody. Join your an existing session or host your own over the main menu."
      },
      "GUEST": {
        "heading": "Guest",
        "text": "You're participating in a shared session, hosted by someone else."
      },
      "HOST": {
        "heading": "Host",
        "text": "You're the host of this session. Invite your friends using your device ID and accept their requests to join."
      }
    },
    "own-peer-id": {
      "label": "Your device",
      "description": "This is your device ID. Your friends need to enter this on their device to connect to our shared session."
    }
  },
  "de": {
    "heading": "Gemeinsame Sitzung",
    "mode": {
      "INACTIVE": {
        "heading": "Nicht verbunden",
        "text": "Du bist mit keiner Person verbunden. Trete einer bestehenden Sitzung teil oder erstelle über das Hauptmenü deine eigene."
      },
      "GUEST": {
        "heading": "Gast",
        "text": "Du nimmst an einer gemeinsamen Sitzung teil, die von einer anderen Person verwaltet wird."
      },
      "HOST": {
        "heading": "Gastgeber:in",
        "text": "Du bist Gastgeber:in dieser Sitzung. Lade mit deiner Geräte ID deine Freund:innen ein und akzeptiere ihre Beitrittsanfragen."
      }
    },
    "own-peer-id": {
      "label": "Dein Gerät",
      "description": "Dies ist deine Geräte-ID. Deine Freund:innen müssen diese ID auf ihren Geräten eingeben um der gemeinsamen Sitzung beizutreten."
    }
  }
}
</i18n>
<!-- eslint-enable max-len -->

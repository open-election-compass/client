<template>
  <div class="guests-list">
    <p v-if="guests.length < 1" class="guests-list__empty">{{ $t('empty') }}</p>
    <table v-else class="guests-list__guests">
      <tr
        v-for="guest in guests"
        :key="guest.peerId"
        :class="[
          'guests-list__guest',
          `guests-list__guest--connection-status-${guest.connectionStatus.toLowerCase()}`,
          `guests-list__guest--${guest.accepted ? 'accepted' : 'not-accepted'}`
        ]"
      >
        <td>
          <Icon :name="guest.connectionStatus === 'DISCONNECTED' ? 'times' : 'circle'" />
        </td>
        <td>
          {{ getGuestName(guest) }}
        </td>
        <td>
          <BaseButton
            v-if="guest.connectionStatus === 'CONNECTED' && guest.accepted !== true"
            theme="positive"
            size="small"
            @click="$store.commit('friends/host/acceptGuest', { peerId: guest.peerId })"
          >
            {{ $t('accept') }}
          </BaseButton>
          <small v-else>
            <template v-if="guest.connectionStatus === 'CONNECTED' && guest.accepted">
              {{ $t('status.connected') }}
            </template>
            <template v-else-if="guest.connectionStatus === 'CONNECTING'">
              {{ $t('status.connecting') }}
            </template>
            <template v-else-if="guest.connectionStatus === 'DISCONNECTED'">
              {{ $t('status.disconnected') }}
            </template>
          </small>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'GuestsList',
  computed: {
    mode() {
      return this.$store.getters['guests/mode'] || 'INACTIVE';
    },
    guests() {
      return this.$store.getters['friends/host/guests'];
    },
  },
  methods: {
    getGuestName(guest) {
      return guest.profile.name || guest.peerId;
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/core.scss";

.guests-list {
  margin-top: 2rem;
  color: $theme-neutral-text;
  background: $theme-neutral-background;
  border-radius: $border-radius;
  &__empty {
    font-style: italic;
    text-align: center;
    padding: 1rem;
  }
  &__guests {
    border-collapse: collapse;
    width: 100%;
  }
  &__guest {
    &--connection-status-connecting {
      .icon {
        animation-name: pulsate;
        animation-duration: 3s;
        animation-fill-mode: both;
        animation-iteration-count: infinite;
        animation-timing-function: ease-in-out;
      }
    }
    &--accepted {
      .icon {
        color: $theme-positive-background;
      }
    }
    &--not-accepted {
      .icon {
        color: $theme-negative-background;
      }
    }
    td {
      padding: 0.5rem;
    }
    td:first-child {
      padding: 1.2rem 0.5rem 1.2rem 1rem;
    }
    td:first-child, td:last-child {
      width: 0;
    }
    td:last-child small {
      display: block;
      text-align: right;
      font-style: italic;
      padding-right: 0.75rem;
      font-size: 1em;
    }
    & + & td {
      border-top: 1px solid $theme-neutral-border;
    }
  }
}

@keyframes pulsate {
  0%, 100%, 50% {
    opacity: 1
  }
  25%,
  75% {
    opacity: 0.5
  }
}
</style>

<i18n>
{
  "en": {
    "heading": "Connected devices",
    "empty": "Nobody joined the session yet.",
    "accept": "Accept",
    "status": {
      "connecting": "Connecting",
      "connected": "Connected",
      "disconnected": "Disconnected"
    }
  },
  "de": {
    "heading": "Verbundene Geräte",
    "empty": "Bisher ist niemand der Sitzung beigetreten.",
    "accept": "Hinzufügen",
    "status": {
      "connecting": "Verbinden ...",
      "connected": "Verbunden",
      "disconnected": "Getrennt"
    }
  }
}
</i18n>

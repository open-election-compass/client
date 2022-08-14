<template>
  <ModalView
    :visible="visible"
    :heading="$t('elements.friends-status-modal.heading')"
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
      <strong>{{ $t(`elements.friends-status-modal.mode.${mode}.heading`) }}</strong>
      <p>{{ $t(`elements.friends-status-modal.mode.${mode}.text`) }}</p>
    </div>
    <FieldInput
      v-if="mode === 'HOST'"
      alias="own-peer-id"
      name="own-peer-id"
      type="text"
      :description="$t('elements.friends-status-modal.own-peer-id.description')"
      rules=""
      readonly
      v-model:value="ownPeerId"
    />
    <GuestsList v-if="mode === 'HOST'" />
    <FriendsList v-else />
  </ModalView>
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
.friends-status-modal {
  &__mode {
    color: var(--theme-neutral-text);
    background: var(--theme-neutral-background);
    border: 1px solid var(--theme-neutral-border);
    border-radius: var(--border-radius);
    transition: all 0.25s ease-out;
    padding: 1rem;
    margin-bottom: 1rem;
    &--host {
      color: var(--theme-primary-text);
      background: var(--theme-primary-background);
      border-color: var(--theme-primary-border);
    }
    &--guest {
      color: var(--theme-positive-text);
      background: var(--theme-positive-background);
      border-color: var(--theme-positive-border);
    }
  }

  #field-own-peer-id {
    text-align: center;
    font-family: monospace;
    letter-spacing: 0.25em;
  }
}
</style>

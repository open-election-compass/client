<template>
  <div class="friends-status-bar">
    <button
      v-if="visible"
      class="friends-status-bar__button"
      @click="showModal = true"
    >
        <Icon name="user-friends" />
    </button>
    <FriendsStatusModal
      :visible="showModal"
      @close="showModal = false"
    />
  </div>
</template>

<script>
import FriendsStatusModal from './FriendsStatusModal.vue';

export default {
  name: 'FriendsStatusBar',
  components: {
    FriendsStatusModal,
  },
  data() {
    return {
      showModal: false,
    };
  },
  mounted() {
    // Listen for a new friends session being started
    this.$root.$on('how-u-doin', () => {
      this.showModal = true;
    });
  },
  computed: {
    visible() {
      return (this.$store.getters['friends/mode'] || 'INACTIVE') !== 'INACTIVE';
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/core.scss";

.friends-status-bar {
  &__button {
    position: fixed;
    z-index: 201;
    top: 5.5rem;
    right: 0;
    background: $theme-positive-background;
    color: $theme-positive-text;
    padding: 0.5rem;
    border-radius: $border-radius 0 0 $border-radius;
  }
}
</style>

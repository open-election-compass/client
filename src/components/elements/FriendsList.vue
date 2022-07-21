<template>
  <div class="friends-list">
    <p v-if="friends.length < 1" class="friends-list__empty">
      {{ $t('elements.friends-list.empty') }}
    </p>
    <table v-else class="friends-list__friends">
      <tr v-for="friend in friends" :key="friend.peerId" class="friends-list__friend">
        <td>
          <IconDisplay
            v-if="friend.peerId === host.peer"
            name="crown"
            :title="$t('elements.friends-list.host')"
          />
        </td>
        <td>
          {{ getFriendName(friend) }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'FriendsList',
  computed: {
    friends() {
      return this.$store.getters['friends/friends'];
    },
    host() {
      return this.$store.getters['friends/guest/hostConnection'];
    },
  },
  methods: {
    getFriendName(friend) {
      return friend.profile.name || friend.peerId;
    },
  },
};
</script>

<style lang="scss">
.friends-list {
  margin-top: 2rem;
  color: var(--theme-neutral-text);
  background: var(--theme-neutral-background);
  border-radius: var(--border-radius);
  &__empty {
    font-style: italic;
    text-align: center;
    padding: 1rem;
  }
  &__friends {
    border-collapse: collapse;
    width: 100%;
  }
  &__friend {
    td {
      padding: 1.2rem 0.5rem;
    }
    td:first-child {
      padding: 1.2rem 0.5rem 1.2rem 1rem;
      width: 0;
    }
    td:last-child {
      padding-right: 1rem;
    }
    & + & td {
      border-top: 1px solid var(--theme-neutral-border);
    }
  }
}
</style>

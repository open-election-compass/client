<template>
  <transition-group
    name="friends"
    tag="ul"
    class="friends-progress"
    v-if="$store.getters['options/friendsEnabled']"
  >
    <li
      v-for="item in items"
      :key="item.alias"
      :class="['friends-progress__item', `friends-progress__item--${item.type}`]"
    >
      <span v-if="item.type === 'friend' || item.type === 'self'">
        {{ item.caption }}
      </span>
    </li>
  </transition-group>
</template>

<script>
export default {
  name: 'FriendsProgress',
  computed: {
    theses() {
      return this.$store.getters['theses/theses'];
    },
    friends() {
      return this.$store.getters['friends/friends'];
    },
    ownPeerId() {
      return this.$store.getters['friends/ownPeer'].id;
    },
    items() {
      const items = [];
      // eslint-disable-next-line no-plusplus
      for (let index = 0; index <= this.theses.length; index++) {
        this.friendsAt(index - 1)
          .map((friend) => ({
            type: friend.peerId === this.ownPeerId ? 'self' : 'friend',
            alias: `friend-${friend.peerId}`,
            caption: friend.profile.name || friend.peerId,
            dataUpdatedAt: friend.dataUpdatedAt,
          }))
          .sort((a, b) => b.dataUpdatedAt - a.dataUpdatedAt)
          .forEach((answer) => items.push(answer));
        if (index < this.theses.length) {
          items.push({
            type: 'thesis',
            alias: `thesis-${index}`,
          });
        }
      }
      return items;
    },
  },
  methods: {
    friendsAt(index) {
      return this.friends.filter(
        (friend) =>
          friend.answers[index] !== null &&
          (index === this.theses.length - 1 || friend.answers[index + 1] === null)
      );
    },
  },
};
</script>

<style lang="scss">
.friends-progress {
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  top: 0;
  bottom: 0;
  left: 0;
  opacity: 0.5;
  transition: opacity 0.2s ease-out;
  &__item {
    font-size: 0.6em;
    line-height: 1;
    span {
      display: none;
    }
    &--friend,
    &--self {
      min-height: 1em + 0.25em * 2;
      flex: 0 0;
      background: var(--theme-neutral-background);
      color: var(--theme-neutral-text);
      padding: 0.25em 0.25em 0.25em 1em;
      margin-bottom: 2px;
      border-radius: 0 1em 1em 0;
    }
    &--self {
      color: var(--theme-primary-text);
      background: var(--theme-primary-background);
      padding-right: 0.75em;
    }
    &--thesis {
      flex: 1 0;
    }
  }
  &:hover {
    opacity: 1;
  }
}

.friends-move {
  transition: transform 1s;
}

@media (min-width: 40rem) {
  .friends-progress {
    &__item {
      span {
        display: block;
      }
      &--friend {
        padding-right: 0.75em;
      }
    }
  }
}
</style>

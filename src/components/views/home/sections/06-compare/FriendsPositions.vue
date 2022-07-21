<template>
  <ul class="friends-positions" v-if="$store.getters['options/friendsEnabled']">
    <li v-for="answer in answers" :key="answer.friend.peerId" class="friends-positions__answer">
      <StatementBadge
        :icon="answer.icon"
        :backgroundColor="answer.colors.base"
        :textColor="answer.colors.contrast"
        :aria-label="answerAria(answer.alias)"
      >
        {{ answer.friend.profile.name || answer.friend.peerId }}
      </StatementBadge>
    </li>
  </ul>
</template>

<script>
import StatementBadge from '/src/components/views/home/sections/03-theses/StatementBadge.vue';

export default {
  name: 'FriendsPositions',
  components: {
    StatementBadge,
  },
  props: {
    thesis: {
      type: Object,
      required: true,
    },
  },
  computed: {
    friends() {
      return this.$store.getters['friends/friends'].filter(
        (friend) => friend.peerId !== this.$store.getters['friends/ownPeer'].id
      );
    },
    algorithm() {
      return this.$store.getters['algorithm/algorithm'];
    },
    answers() {
      return this.friends.map((friend) => {
        const answerAlias = friend.answers[this.thesis.index] || 'skip';
        let answer = {
          alias: answerAlias,
          friend,
        };
        if (answerAlias === 'skip') {
          answer = {
            ...answer,
            icon: 'question',
            direction: 'neutral',
            colors: {
              base: '#a0aec0',
              contrast: '#fff',
            },
          };
        } else {
          answer = {
            ...answer,
            ...this.algorithm.options.find((option) => option.alias === answerAlias),
          };
        }
        return answer;
      });
    },
  },
  methods: {
    answerAria(name, answerAlias) {
      let position = this.$t('views.home.compare.friends-positions.skip');
      if (answerAlias !== 'skip') {
        position = this.$t(`algorithm.options.${answerAlias}.button`);
      }
      return this.$t('views.home.compare.friends-positions.answer-aria', { name, position });
    },
  },
};
</script>

<style lang="scss">
.friends-positions__answer {
  display: inline-block;
  margin-top: 1em;
  margin-right: 0.75em;
  font-size: 0.75em;
}
</style>

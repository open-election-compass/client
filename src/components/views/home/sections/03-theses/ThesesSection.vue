<template>
  <div>
    <StatementWrapper
      v-for="(thesis, index) in theses"
      :key="index"
      :index="index"
      :thesis="thesis"
    />
    <FriendsProgress />
  </div>
</template>

<script>
import FriendsProgress from '/src/components/views/home/sections/03-theses/FriendsProgress.vue';
import StatementWrapper from '/src/components/views/home/sections/03-theses/StatementWrapper.vue';

export default {
  name: 'ThesesSection',
  computed: {
    theses() {
      return this.$store.getters['theses/theses'];
    },
  },
  components: {
    FriendsProgress,
    StatementWrapper,
  },
};
</script>

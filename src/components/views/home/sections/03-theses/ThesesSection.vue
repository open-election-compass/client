<template>
  <div>
    <Thesis
      v-for="(thesis, index) in theses"
      :key="index"
      :index="index"
      :total="theses.length"
      :thesis="thesis"
    />
  </div>
</template>

<script>
import Thesis from './Thesis.vue';

export default {
  name: 'ThesesSection',
  computed: {
    theses() {
      return this.$store.getters['theses/theses'];
    },
  },
  components: {
    Thesis,
  },
};
</script>

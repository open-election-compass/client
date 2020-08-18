<template>
  <div>
    <Thesis
      v-for="(thesis, index) in theses"
      :key="index"
      :index="index"
      :thesis="thesis"
    />
  </div>
</template>

<script>
import Thesis from '@/components/views/home/sections/03-theses/Thesis.vue';

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

<template>
  <div>
    <Thesis
      v-for="(thesis, index) in theses"
      :key="index"
      :thesis="thesis"
    />
  </div>
</template>

<script>
import Thesis from '@/components/Thesis.vue';

export default {
  name: 'ThesesSection',
  props: {
    theses: {
      type: Array,
      required: true,
    },
  },
  components: {
    Thesis,
  },
};
</script>

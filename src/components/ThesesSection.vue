<template>
  <div>
    <Thesis
      v-for="(thesis, index) in theses"
      :key="index"
      :index="index"
      :total="theses.length"
      :thesis="thesis"
      :active="statuses[index - 1] !== null"
      @status="statuses[index] = $event"
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
  data() {
    const data = {
      statuses: {},
    };
    this.theses.forEach((thesis, index) => { data.statuses[index] = null; });
    return data;
  },
  components: {
    Thesis,
  },
};
</script>

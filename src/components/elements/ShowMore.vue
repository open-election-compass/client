<template>
  <div>
    <span>{{ short }}</span><span v-if="isTruncated">{{ more ? rest : ' ...' }}</span>
    <a @click="toggle" v-if="isTruncated" class="font-bold cursor-pointer">
      &nbsp;{{ $t(more ? 'hide' : 'show').replace(' ', '\xa0') }}
    </a>
  </div>
</template>

<script>
export default {
  name: 'ShowMore',
  data() {
    return {
      more: false,
    };
  },
  props: {
    text: {
      type: String,
      required: true,
    },
    length: {
      type: Number,
      default: 250,
    },
  },
  computed: {
    isTruncated() {
      return this.text.length > this.length;
    },
    short() {
      if (!this.isTruncated) {
        return this.text;
      }
      const truncated = this.text.substr(0, this.length);
      return truncated.substr(0, truncated.lastIndexOf(' '));
    },
    rest() {
      return this.text.substring(this.short.length);
    },
  },
  methods: {
    toggle() {
      this.more = !this.more;
    },
  },
};
</script>

<i18n>
{
  "en": {
    "show": "show more",
    "hide": "hide"
  },
  "de": {
    "show": "weiterlesen",
    "hide": "verbergen"
  }
}
</i18n>

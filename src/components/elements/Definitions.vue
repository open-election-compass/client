<script>
export default {
  name: 'Definitions',
  functional: true,
  props: {
    text: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  render(createElement, { props }) {
    let nodes = props.text.split(/(\[.*\]<.*>)/);
    nodes = nodes.map((node) => {
      const matches = node.match(/\[(.*)\]<(.*)>/);
      if (props.disabled && matches !== null) {
        return matches[1];
      }
      if (matches === null) {
        return node;
      }
      return createElement('span', {
        class: 'definitions__expression',
        attrs: {
          content: `${matches[1]}: ${matches[2]}`,
        },
        directives: [
          {
            name: 'tooltip',
            value: {
              allowHTML: false,
              distance: 10,
              hideOnClick: false,
              size: 'large',
              theme: 'left',
            },
          },
        ],
      }, [matches[1]]);
    });
    return createElement('span', {
      class: 'definitions',
    }, nodes);
  },
};
</script>

<style lang="scss">
.definitions__expression {
  cursor: pointer;
  border-bottom: 2px dotted currentColor;
  &:focus {
    outline: none;
    background-color: rgba(0, 0, 0, 0.05);
  }
}

.tippy-tooltip.left-theme .tippy-content {
  text-align: left;
}
</style>

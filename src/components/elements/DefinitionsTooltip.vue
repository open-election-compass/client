<script>
import { h as createElement, withDirectives, resolveDirective } from 'vue';

export default {
  name: 'DefinitionsTooltip',
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
  render() {
    let nodes = this.text.split(/(\[.*\]<.*>)/);
    nodes = nodes.map((node) => {
      const matches = node.match(/\[(.*)\]<(.*)>/);
      if (this.disabled && matches !== null) {
        return matches[1];
      }
      if (matches === null) {
        return node;
      }
      return withDirectives(
        createElement(
          'span',
          {
            class: 'definitions-tooltip__expression',
          },
          [matches[1]]
        ),
        [
          [
            resolveDirective('tooltip'),
            {
              content: `${matches[1]}: ${matches[2]}`,
              allowHTML: false,
              offset: [0, 10],
              hideOnClick: false,
            },
          ],
        ]
      );
    });
    return createElement(
      'span',
      {
        class: 'definitions-tooltip',
      },
      nodes
    );
  },
};
</script>

<style lang="scss">
.definitions-tooltip__expression {
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

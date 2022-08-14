import type { App } from 'vue';
import VueTippy from 'vue-tippy';
import 'tippy.js/dist/tippy.css';

export default function loadVueTippy(app: App) {
  app.use(VueTippy, {
    directive: 'tooltip',
    component: 'TippyTooltip',
    defaultProps: {
      arrow: true,
      offset: [0, 25],
    },
  });
}

import mitt from 'mitt';
import type { App } from 'vue';

export default function loadEventEmitter(app: App) {
  const bus = mitt();
  app.config.globalProperties.bus = bus;
}

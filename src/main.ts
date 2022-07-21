import { createApp } from 'vue';
import 'ie11-custom-properties';
import loadEventBus from './bootstrap/loadEventBus';
import loadFontAwesome from './bootstrap/loadFontAwesome';
import loadOpenElectionCompassUI from './bootstrap/loadOpenElectionCompassUI';
import loadScrollEnhancements from './bootstrap/loadScrollEnhancements';
import loadVeeValidate from './bootstrap/loadVeeValidate';
import loadVueTippy from './bootstrap/loadVueTippy';
import OpenElectionCompass from './OpenElectionCompass.vue';
import i18n from './locales/i18n';
import store from './store/index';

const app = createApp({});

app.use(store);
app.use(i18n);

loadEventBus(app);
loadFontAwesome(app);
loadOpenElectionCompassUI(app);
loadScrollEnhancements();
loadVeeValidate();
loadVueTippy(app);

app.component('open-election-compass', OpenElectionCompass);

app.mount('#open-election-compass');

import Vue from 'vue';
import VScrollLock from 'v-scroll-lock';
import smoothscroll from 'smoothscroll-polyfill';

export default function loadScrollEnhancements() {
  Vue.use(VScrollLock);
  smoothscroll.polyfill();
}

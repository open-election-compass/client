import path from 'path';

export default function OpenElectionCompassNuxtModule() {
  // eslint-disable-next-line no-undef
  this.addPlugin(path.resolve(__dirname, '../dist/nuxt/open-election-compass.common.js'));
  this.options.css.push(
    '@/node_modules/@open-election-compass/client/dist/nuxt/open-election-compass.css'
  );
}

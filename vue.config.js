module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
    },
    'demo-kieskompas': {
      entry: 'src/main.js',
      template: 'public/demo-kieskompas.html',
      filename: 'demo-kieskompas.html',
    },
    'demo-luedenscheid': {
      entry: 'src/main.js',
      template: 'public/demo-luedenscheid.html',
      filename: 'demo-luedenscheid.html',
    },
  },

  publicPath: process.env.NODE_ENV === 'production' ? '/client/' : '/',

  runtimeCompiler: true,

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },

  chainWebpack: (config) => {
    config.module
      .rule('i18n')
      .resourceQuery(/blockType=i18n/)
      .type('javascript/auto')
      .use('i18n')
      .loader('@intlify/vue-i18n-loader')
      .end();
  },

  css: {
    extract: false,
  },
};

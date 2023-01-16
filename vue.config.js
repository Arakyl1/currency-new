const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "~@/styles/_mixin.scss";'
      }
    }
  },
  pwa: {
    name: 'My Currencies',
    short_name: 'App',
    theme_color: '#16192a',
    background_color: '#16192a',
    display: 'standalone',
    scope: './',
    start_url: './',
    icons: [
      { src: './img/icons/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: './img/icons/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
      { src: './img/icons/android-chrome-maskable-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
      { src: './img/icons/android-chrome-maskable-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
    ],
    iconPaths: {
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: 'img/apple-touch-icon-152x152.png',
      maskIcon: 'img/icons/safari-pinned-tab.png',
      msTileImage: 'img/icons/msapplication-icon-144x144.png'
    }
  }
}

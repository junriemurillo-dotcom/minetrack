export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt'],
  css: ['@fontsource-variable/inter', '~/assets/css/main.css'],
  app: {
    head: {
      title: 'MineTrack',
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'description', content: 'Mining operations and safety management system' }
      ]
    }
  }
})
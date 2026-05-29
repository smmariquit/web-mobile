// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Stimmie — Web & Mobile Developer',
      meta: [
        {
          name: 'description',
          content:
            'Simonee Ezekiel Mariquit (Stimmie) — software engineer specializing in web and mobile development. Vue, React, Flutter, React Native, and more.',
        },
        { name: 'author', content: 'Simonee Ezekiel Mariquit' },
        {
          property: 'og:title',
          content: 'Stimmie — Web & Mobile Developer',
        },
        {
          property: 'og:description',
          content:
            'Portfolio showcasing web & mobile projects — from campus tools to healthcare systems.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://web.stimmie.dev' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap',
        },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true },
    '/projects': { prerender: true },
    '/projects/**': { prerender: true },
    '/about': { prerender: true },
    '/contact': { prerender: true },
  },
})

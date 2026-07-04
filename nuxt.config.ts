// nuxt.config.ts

// https://nuxt.com/docs/api/configuration/nuxt-config
import { PORTFOLIO_PROJECTS } from './server/data/projects'

const projectRoutes = PORTFOLIO_PROJECTS.map((project) => `/projects/${project.slug}`)

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@unocss/nuxt'],

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Simonee Mariquit · Web & Mobile Developer',
      meta: [
        {
          name: 'description',
          content:
            'Freelance web and mobile developer who ships to real users. Fixed quotes after scope. Live projects you can click through.',
        },
        { name: 'author', content: 'Simonee Mariquit' },
        {
          property: 'og:title',
          content: 'Simonee Mariquit · Web & Mobile Developer',
        },
        {
          property: 'og:description',
          content:
            'Freelance web and mobile work that reaches real users. Scope doc, fixed quote, shipped projects you can click through.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://web.stimmie.dev' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'theme-color', content: '#0E6B5F' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        // Self-hosted variable fonts (see assets/css/main.css @font-face)
        {
          rel: 'preload',
          as: 'font',
          type: 'font/woff2',
          href: '/fonts/hanken-grotesk-var.woff2',
          crossorigin: 'anonymous',
        },
        {
          rel: 'preload',
          as: 'font',
          type: 'font/woff2',
          href: '/fonts/fraunces-var.woff2',
          crossorigin: 'anonymous',
        },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    contactWorkerUrl: process.env.CONTACT_WORKER_URL || '',
    contactSecret: process.env.CONTACT_SECRET || '',
    vercelToken: process.env.VERCEL_TOKEN || '',
    vercelTeamId: process.env.VERCEL_TEAM_ID || '',
    public: {
      turnstileSiteKey: process.env.NUXT_PUBLIC_TURNSTILE_SITE_KEY || '',
    },
  },

  routeRules: {
    '/': { prerender: true },
    '/projects': { prerender: true },
    '/projects/**': { prerender: true },
    '/about': { prerender: true },
    '/hire': { prerender: true },
    '/contact': { prerender: true },
    '/stats': { ssr: true },
    '/api/analytics': { swr: 120 },
    '/api/github-stats': { swr: 3600 },
    '/api/stack': { swr: 3600 },
    '/api/capabilities': { swr: 86400 },
    '/api/talks': { swr: 86400 },
    '/api/skills': { swr: 3600 },
    '/api/engineering': { swr: 86400 },
    // Copy/pricing data: no SWR — edits should show immediately in dev and after deploy
    '/api/profile': { swr: false },
    '/api/pricing': { swr: false },
    '/api/engagement': { swr: false },
    '/api/projects': { swr: false },
  },

  nitro: {
    preset: 'cloudflare-pages',
    prerender: {
      crawlLinks: true,
      routes: projectRoutes,
    },
  },
})

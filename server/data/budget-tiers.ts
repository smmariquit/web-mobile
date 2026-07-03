/**
 * Budget bands with real stack choices from shipped repos.
 * Linked proof must exist on GitHub or in production.
 */

import type { StackIcon } from './pricing'

export interface BudgetProof {
  label: string
  repo: string
  url: string
}

export interface BudgetTier {
  id: string
  band: string
  title: string
  fit: string
  story: string
  tradeOff: string
  stack: StackIcon[]
  proof: BudgetProof[]
}

export const BUDGET_TIERS_LEDE =
  'Your feature list picks the band. I quote inside that range after the brief, not before.'

export const BUDGET_TIERS: BudgetTier[] = [
  {
    id: 'static',
    band: '$400 to $900',
    title: 'Static site',
    fit: 'Landing page, org site, or marketing site with a contact path.',
    story:
      'Imagine a clinic needing a brochure site and contact path. I would keep the build static, deploy it to Vercel or Cloudflare Pages, and avoid a database unless the content actually needs one.',
    tradeOff:
      'The trade-off is simple: updates happen through code or a small content file, but hosting stays near zero and there is no idle server to maintain.',
    stack: [
      { id: 'astro', name: 'Astro', icon: '/tech/astro.svg' },
      { id: 'nuxt', name: 'Nuxt', icon: '/tech/nuxtdotjs.svg' },
      { id: 'nextjs', name: 'Next.js', icon: '/tech/nextdotjs.svg' },
      { id: 'svelte', name: 'SvelteKit', icon: '/tech/svelte.svg' },
      { id: 'vercel', name: 'Vercel', icon: '/tech/vercel.svg' },
      { id: 'cloudflare', name: 'Cloudflare Pages', icon: '/tech/cloudflare.svg' },
    ],
    proof: [
      {
        label: 'GradeSim store landing',
        repo: 'smmariquit/gradesim',
        url: 'https://github.com/smmariquit/gradesim',
      },
      {
        label: 'UPLB DSG org site',
        repo: 'portfolio',
        url: 'https://stimmie.dev/projects/uplb-dsg-website',
      },
      {
        label: 'Prerendered hire and contact routes',
        repo: 'smmariquit/web-mobile',
        url: 'https://github.com/smmariquit/web-mobile/blob/main/nuxt.config.ts',
      },
    ],
  },
  {
    id: 'edge',
    band: '$900 to $1.9k',
    title: 'Cached app + edge',
    fit: 'MVP with auth-light features, contact forms, or live data that must not hammer upstream APIs.',
    story:
      'Suppose that same project adds patient lookup, live GitHub stats, or a protected contact form. I add server routes, edge functions, and cache rules only around the parts that need them.',
    tradeOff:
      'You pay for more engineering time, but you avoid renting a full server just to answer a few dynamic requests. Rate limits and cache expiry are written into the scope.',
    stack: [
      { id: 'nuxt', name: 'Nuxt', icon: '/tech/nuxtdotjs.svg' },
      { id: 'nextjs', name: 'Next.js', icon: '/tech/nextdotjs.svg' },
      { id: 'cloudflare', name: 'Cloudflare Workers', icon: '/tech/cloudflare.svg' },
      { id: 'supabase', name: 'Supabase', icon: '/tech/supabase.svg' },
      { id: 'postgresql', name: 'Postgres', icon: '/tech/postgresql.svg' },
      { id: 'vercel', name: 'Vercel', icon: '/tech/vercel.svg' },
    ],
    proof: [
      {
        label: 'Hourly GitHub cache + route SWR',
        repo: 'smmariquit/web-mobile',
        url: 'https://github.com/smmariquit/web-mobile/tree/main/server/api',
      },
      {
        label: 'Contact Worker + Turnstile',
        repo: 'smmariquit/web-mobile',
        url: 'https://github.com/smmariquit/web-mobile/tree/main/workers/contact',
      },
      {
        label: 'CF Bulk Redirect API cached at 3600s',
        repo: 'smmariquit/stimmie.dev',
        url: 'https://github.com/smmariquit/stimmie.dev/blob/main/src/lib/cloudflare.js',
      },
    ],
  },
  {
    id: 'production',
    band: '$1.9k+',
    title: 'Production stack',
    fit: 'Daily users, offline needs, admin flows, or hardware hooks.',
    story:
      'For a telehealth startup, POS workflow, or campus app with daily users, the architecture changes. We bring in authenticated APIs, a database, offline storage, release checks, and a handoff document your team can run.',
    tradeOff:
      'This costs more time because failure modes matter: missing migrations, double submissions, stale offline data, and rate limits need guards before launch.',
    stack: [
      { id: 'flutter', name: 'Flutter', icon: '/tech/flutter.svg' },
      { id: 'firebase', name: 'Firebase', icon: '/tech/firebase.svg' },
      { id: 'supabase', name: 'Supabase', icon: '/tech/supabase.svg' },
      { id: 'postgresql', name: 'Postgres', icon: '/tech/postgresql.svg' },
      { id: 'pwa', name: 'PWA', icon: '/tech/pwa.svg' },
      { id: 'docker', name: 'Docker', icon: '/tech/docker.svg' },
    ],
    proof: [
      {
        label: 'Room TBA: PGlite + Supabase + PWA',
        repo: 'uplbtools/room-tba',
        url: 'https://github.com/uplbtools/room-tba',
      },
      {
        label: 'Bus POS: Jest on PR, APK artifact CI',
        repo: 'smmariquit/bus-ticketing-app',
        url: 'https://github.com/smmariquit/bus-ticketing-app/tree/main/.github/workflows',
      },
      {
        label: 'GradeSim: semantic-release to Chrome Web Store',
        repo: 'smmariquit/gradesim',
        url: 'https://github.com/smmariquit/gradesim/tree/main/.github/workflows',
      },
    ],
  },
]

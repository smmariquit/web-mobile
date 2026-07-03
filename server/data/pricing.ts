/**
 * Starting rates aligned with mid-level PH freelance market ($25-40/hr).
 * Final quote always follows a written scope.
 */

export interface PricePoint {
  usd: number
  php: number
  label: string
}

export interface StackIcon {
  id: string
  name: string
  icon: string
}

export interface ServicePricing {
  id: string
  title: string
  summary: string
  description: string
  scopeNote: string
  stack: StackIcon[]
  startingAt: PricePoint
  typical?: PricePoint
}

export const HOURLY_RATE: PricePoint & { note: string } = {
  usd: 25,
  php: 1400,
  label: '$25/hr',
  note: 'For code review, build fixes, or deployment checks after the main quote is settled.',
}

export const PRICING_NOTE =
  'Floors by project type. Final quote follows your brief and complexity band.'

export const SERVICE_PRICING: ServicePricing[] = [
  {
    id: 'web',
    title: 'Web apps',
    summary: 'Static site, cached edge app, or small database-backed MVP.',
    description:
      'From a static launch page to an app with live data. I choose the simplest hosting and data model that still fits your users.',
    scopeNote: 'Static site, cached edge app, or small database-backed MVP scoped before build.',
    stack: [
      { id: 'nextjs', name: 'Next.js', icon: '/tech/nextdotjs.svg' },
      { id: 'nuxt', name: 'Nuxt', icon: '/tech/nuxtdotjs.svg' },
      { id: 'svelte', name: 'SvelteKit', icon: '/tech/svelte.svg' },
      { id: 'astro', name: 'Astro', icon: '/tech/astro.svg' },
      { id: 'supabase', name: 'Supabase', icon: '/tech/supabase.svg' },
      { id: 'gcp', name: 'Google Cloud', icon: '/tech/googlecloud.svg' },
      { id: 'cloudflare', name: 'Cloudflare', icon: '/tech/cloudflare.svg' },
      { id: 'postgresql', name: 'Postgres', icon: '/tech/postgresql.svg' },
    ],
    startingAt: { usd: 400, php: 22400, label: 'From $400' },
    typical: { usd: 1700, php: 95200, label: 'MVP ~$1,700' },
  },
  {
    id: 'mobile',
    title: 'Mobile apps',
    summary: 'Single-platform app first. POS hardware and store release quoted separately.',
    description:
      'Offline-first mobile work for schedule tools, maps, or POS hardware where network and device limits shape the design.',
    scopeNote: 'Single-platform app first. Custom POS hardware and store release work are quoted separately.',
    stack: [
      { id: 'flutter', name: 'Flutter', icon: '/tech/flutter.svg' },
      { id: 'expo', name: 'Expo', icon: '/tech/expo.svg' },
      { id: 'react-native', name: 'React Native', icon: '/tech/react.svg' },
      { id: 'firebase', name: 'Firebase', icon: '/tech/firebase.svg' },
    ],
    startingAt: { usd: 1500, php: 84000, label: 'From $1,500' },
    typical: { usd: 2700, php: 151200, label: 'POS ~$2,700' },
  },
  {
    id: 'extension',
    title: 'Browser extensions',
    summary: 'One browser, Manifest V3 build, store listing help included.',
    description:
      'Chrome or Firefox extensions for browser-native workflows, with local data kept on device when a server is unnecessary.',
    scopeNote: 'One browser first, Manifest V3 build, store listing help included.',
    stack: [
      { id: 'typescript', name: 'TypeScript', icon: '/tech/typescript.svg' },
      { id: 'javascript', name: 'JavaScript', icon: '/tech/javascript.svg' },
      { id: 'vite', name: 'Vite', icon: '/tech/vite.svg' },
    ],
    startingAt: { usd: 500, php: 28000, label: 'From $500' },
    typical: { usd: 1100, php: 61000, label: 'Store ~$1,100' },
  },
]

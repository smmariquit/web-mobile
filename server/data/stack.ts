export interface StackRepo {
  name: string
  url: string
}

export interface StackItem {
  id: string
  name: string
  icon: string
  repos?: StackRepo[]
}

export interface StackGroup {
  id: string
  label: string
  items: StackItem[]
}

const GITHUB_USER = 'smmariquit'

export function githubRepoUrl(name: string): string {
  return `https://github.com/${GITHUB_USER}/${name}`
}

export function stackRepos(repoNames: string[]): StackRepo[] {
  return repoNames.map((name) => ({ name, url: githubRepoUrl(name) }))
}

/** Manual repo links for stack chips GitHub topics cannot infer honestly. */
export const CURATED_TECH_REPOS: Record<string, string[]> = {
  rest: ['web-mobile', 'room-tba', 'gradesim', 'bus-ticketing-app'],
  openstreetmap: ['room-tba'],
  discordpy: ['comskies-bot'],
  discordjs: ['discord-bot-host'],
  'github-api': ['web-mobile'],
}

/** Curated stack not reliably inferred from GitHub topics alone. */
export const CURATED_STACK_GROUPS: StackGroup[] = [
  {
    id: 'apis',
    label: 'APIs & integrations',
    items: [
      { id: 'rest', name: 'REST APIs', icon: '/tech/rest.svg', repos: stackRepos(CURATED_TECH_REPOS.rest) },
      {
        id: 'openstreetmap',
        name: 'OpenStreetMap',
        icon: '/tech/openstreetmap.svg',
        repos: stackRepos(CURATED_TECH_REPOS.openstreetmap),
      },
      {
        id: 'discordpy',
        name: 'Discordpy',
        icon: '/tech/discordpy.svg',
        repos: stackRepos(CURATED_TECH_REPOS.discordpy),
      },
      {
        id: 'discordjs',
        name: 'Discordjs',
        icon: '/tech/discordjs.svg',
        repos: stackRepos(CURATED_TECH_REPOS.discordjs),
      },
      {
        id: 'github-api',
        name: 'GitHub API',
        icon: '/tech/github.svg',
        repos: stackRepos(CURATED_TECH_REPOS['github-api']),
      },
    ],
  },
  {
    id: 'design',
    label: 'Design & UX',
    items: [
      { id: 'figma', name: 'Figma', icon: '/tech/figma.svg' },
      { id: 'ux', name: 'UX & UI', icon: '/tech/ux.svg' },
      { id: 'copy', name: 'Copywriting', icon: '/tech/copy.svg' },
    ],
  },
]

export const STACK_CATEGORY_LABELS: Record<string, string> = {
  web: 'Web',
  mobile: 'Mobile',
  platform: 'Backend & infra',
}

export const MAX_STACK_REPOS = 8

/** Platform chips to show even when GitHub topics do not surface them. */
export const CURATED_PLATFORM_ITEMS: StackItem[] = [
  { id: 'gcp', name: 'Google Cloud', icon: '/tech/googlecloud.svg' },
  { id: 'cloudflare', name: 'Cloudflare', icon: '/tech/cloudflare.svg' },
]

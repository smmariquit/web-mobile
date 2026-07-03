/** Production sites tracked in the portfolio traffic dashboard. */
export interface AnalyticsSite {
  id: string
  label: string
  hostname: string
  url: string
}

export const ANALYTICS_SITES: AnalyticsSite[] = [
  { id: 'stimmie', label: 'stimmie.dev', hostname: 'stimmie.dev', url: 'https://stimmie.dev' },
  { id: 'web', label: 'Portfolio', hostname: 'web.stimmie.dev', url: 'https://web.stimmie.dev' },
  { id: 'room-tba', label: 'Room TBA', hostname: 'room-tba.stimmie.dev', url: 'https://room-tba.stimmie.dev' },
  {
    id: 'room-tba-uplb',
    label: 'Room TBA · UPLB',
    hostname: 'room-tba.uplbtools.me',
    url: 'https://room-tba.uplbtools.me',
  },
  { id: 'gradesim', label: 'GradeSim', hostname: 'gradesim.stimmie.dev', url: 'https://gradesim.stimmie.dev' },
  { id: 'hearthcraft', label: 'HearthCraft', hostname: 'hearthcraft.stimmie.dev', url: 'https://hearthcraft.stimmie.dev' },
  {
    id: 'atlas',
    label: 'Atlas of My Skies',
    hostname: 'atlas-of-my-skies.stimmie.dev',
    url: 'https://atlas-of-my-skies.stimmie.dev',
  },
  { id: 'kape', label: 'Kape', hostname: 'kape.stimmie.dev', url: 'https://kape.stimmie.dev' },
  { id: 'guide', label: 'Freshie guide', hostname: 'guide.stimmie.dev', url: 'https://guide.stimmie.dev' },
  { id: 'uplbtools', label: 'UPLB Tools', hostname: 'www.uplbtools.me', url: 'https://www.uplbtools.me' },
]

export const ANALYTICS_HOSTNAMES = new Set(ANALYTICS_SITES.map((s) => s.hostname))

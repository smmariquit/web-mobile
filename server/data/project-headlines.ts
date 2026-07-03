/** Project headlines with infrastructure framing, not genre labels. */

export const PROJECT_HEADLINES: Record<string, string> = {
  hearthcraft: 'Keeping one world alive for seven years',
  'bus-ticketing-app': 'Hardware-integrated transactions',
  revolt: 'Maps-first EV trip planning MVP',
  'room-tba': 'Offline campus search for UPLB',
  'uplb-dsg-website': 'Design-led org site',
  gradesim: 'Private grade planning in the browser',
  'atlas-of-my-skies': 'Personal data cartography',
}

export function projectHeadline(slug: string, fallbackTitle: string): string {
  return PROJECT_HEADLINES[slug] ?? fallbackTitle
}

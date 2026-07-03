/**
 * Capability map derived from https://stimmie.dev/sitemap.xml and site nav.
 * Regenerate talks via npm run sync:stimmie; update manually when sitemap changes.
 */

export interface StimmieLink {
  label: string
  href: string
  note?: string
}

export interface StimmieSection {
  id: string
  label: string
  summary: string
  href?: string
  items: StimmieLink[]
}

export const STIMMIE_SITEMAP_URL = 'https://stimmie.dev/sitemap.xml'
export const STIMMIE_DIRECTORY_URL = 'https://stimmie.dev/links'

/** What you can hire me for on this site — backed by stimmie.dev proof. */
export const HIRE_CAPABILITIES = [
  'Web & mobile apps',
  'UX & Figma',
  'Landing copy',
  'Browser extensions',
  'CI/CD & deploy',
  'POS / hardware hooks',
]

/** Full breadth on stimmie.dev — not all are billable services. */
export const STIMMIE_SECTIONS: StimmieSection[] = [
  {
    id: 'ship',
    label: 'Ship',
    summary: 'Products and platforms I have built and still maintain.',
    href: 'https://stimmie.dev/projects',
    items: [
      { label: 'HearthCraft', href: 'https://stimmie.dev/projects/hearthcraft', note: '40k+ player Minecraft server' },
      { label: 'Room TBA', href: 'https://stimmie.dev/projects/room-tba', note: 'UPLB campus 3D viewer' },
      { label: 'Elbi GradeSim', href: 'https://stimmie.dev/projects/elbi-gradesim', note: 'Grade simulator' },
      { label: 'Atlas of My Skies', href: 'https://stimmie.dev/projects/atlas-of-my-skies', note: 'Photo diary' },
      { label: 'UPLB DSG Website', href: 'https://stimmie.dev/projects/uplb-dsg-website', note: 'Org site · design lead' },
      { label: 'Kape', href: 'https://stimmie.dev/projects/kape', note: 'Open-source tip jar' },
    ],
  },
  {
    id: 'teach',
    label: 'Teach & speak',
    summary: 'Talks, workshops, and slide decks for students and orgs.',
    href: 'https://stimmie.dev/talks',
    items: [
      { label: '18 talks & workshops', href: 'https://stimmie.dev/talks', note: '1,100+ people reached' },
      { label: 'Hackathon guide', href: 'https://workshops.stimmie.dev/hackathon-guide' },
      { label: 'Python in research', href: 'https://workshops.stimmie.dev/python' },
      { label: 'Git workshop', href: 'https://workshops.stimmie.dev/git' },
      { label: 'Resume & branding', href: 'https://workshops.stimmie.dev/resume' },
      { label: 'ML / data storytelling', href: 'https://workshops.stimmie.dev/present-insights-better' },
      { label: 'Private tutoring', href: 'https://tutor.stimmie.dev', note: 'Math & CS' },
    ],
  },
  {
    id: 'write',
    label: 'Write',
    summary: 'Essays, guides, and the copy on pages I ship.',
    href: 'https://stimmie.dev/blog',
    items: [
      { label: 'Blog', href: 'https://stimmie.dev/blog' },
      { label: 'Parkour 🤸‍♂️', href: 'https://stimmie.dev/blog/juneyour', note: 'Jun 2026' },
      { label: 'Software engineering class', href: 'https://stimmie.dev/blog/casa', note: 'May 2026' },
      { label: 'Books I read in 2025', href: 'https://stimmie.dev/blog/books' },
      { label: 'Medium', href: 'https://medium.com/@semariquit' },
      { label: 'DEV', href: 'https://dev.to/stimmie' },
    ],
  },
  {
    id: 'community',
    label: 'Community',
    summary: 'Orgs, roundups, and spaces I help run.',
    href: 'https://stimmie.dev/career',
    items: [
      { label: 'Resume', href: 'https://resume.stimmie.dev' },
      { label: 'Career', href: 'https://stimmie.dev/career' },
      { label: 'Opportunities roundup', href: 'https://stimmie.dev/opportunities', note: '159 PH listings' },
      { label: 'UX Elbi', href: 'https://stimmie.dev/career', note: 'Founder' },
      { label: 'Pizza & Friends', href: 'https://www.joinpizza.fun', note: 'Community · co-founder' },
      { label: 'The Crib', href: 'https://crib.stimmie.dev', note: 'Minecraft community' },
      { label: 'Sip & Scale', href: 'https://stimmie.dev/career', note: 'City lead · startup dinners' },
    ],
  },
  {
    id: 'infra',
    label: 'Infra & misc',
    summary: 'Keys, changelog, archives, and edge redirects.',
    href: 'https://stimmie.dev/links',
    items: [
      { label: 'Full link directory', href: 'https://stimmie.dev/links' },
      { label: 'PGP & SSH keys', href: 'https://stimmie.dev/keys' },
      { label: 'Changelog', href: 'https://stimmie.dev/changelog' },
      { label: 'Site archive', href: 'https://stimmie.dev/archive' },
      { label: 'Workshops hub', href: 'https://workshops.stimmie.dev' },
    ],
  },
]

export const WORKSHOP_DECKS: StimmieLink[] = [
  { label: 'Workshops home', href: 'https://workshops.stimmie.dev/' },
  { label: 'AI problems', href: 'https://workshops.stimmie.dev/ai-problems' },
  { label: 'Career slides', href: 'https://workshops.stimmie.dev/career' },
  { label: 'CMSC 21 review', href: 'https://workshops.stimmie.dev/cmsc21' },
  { label: 'Git', href: 'https://workshops.stimmie.dev/git' },
  { label: 'LLMs × Pizza', href: 'https://workshops.stimmie.dev/llms-pizza' },
  { label: 'Minecraft hosting', href: 'https://workshops.stimmie.dev/minecraft' },
  { label: 'Present insights better', href: 'https://workshops.stimmie.dev/present-insights-better' },
  { label: 'Python', href: 'https://workshops.stimmie.dev/python' },
  { label: 'Resume', href: 'https://workshops.stimmie.dev/resume' },
]

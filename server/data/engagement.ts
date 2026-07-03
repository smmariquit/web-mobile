export interface EngagementPhase {
  id: string
  title: string
  detail: string
}

export interface CoordinationChannel {
  title: string
  detail: string
  href?: string
  icon: 'call' | 'email' | 'github' | 'linkedin' | 'timezone'
}

export interface DoneCriterion {
  label: string
  icon: 'scope' | 'staging' | 'responsive' | 'checks' | 'deploy'
}

export const TRUST_NARRATIVE =
  'Scope and price in writing before I code. Weekly staging links, feedback in GitHub, repo in your name at launch.'

export const HIRE_PROCESS: EngagementPhase[] = [
  {
    id: 'brief',
    title: 'Brief',
    detail: 'Form or email. What you need, when you need it, and your budget range.',
  },
  {
    id: 'scope',
    title: 'Scope and quote',
    detail: 'A short doc: what we build, what we skip, timeline, and a fixed price.',
  },
  {
    id: 'build',
    title: 'Build',
    detail: 'Staging link each week. Feedback in GitHub issues and PRs.',
  },
  {
    id: 'launch',
    title: 'Launch',
    detail: 'Repo in your GitHub, deploy notes, and a walkthrough if you want one.',
  },
]

export const COORDINATION: CoordinationChannel[] = [
  {
    title: 'Book a call',
    detail: 'cal.com/simonee, 30 min',
    href: 'https://cal.com/simonee',
    icon: 'call',
  },
  {
    title: 'Email',
    detail: 'semariquit@gmail.com',
    href: 'mailto:semariquit@gmail.com',
    icon: 'email',
  },
  {
    title: 'Day-to-day',
    detail: 'Issues and PRs on GitHub',
    href: 'https://github.com/smmariquit',
    icon: 'github',
  },
  {
    title: 'LinkedIn',
    detail: 'linkedin.com/in/stimmie',
    href: 'https://www.linkedin.com/in/stimmie',
    icon: 'linkedin',
  },
  {
    title: 'Timezone',
    detail: 'Philippines (UTC+8). US morning and evening overlap can work.',
    icon: 'timezone',
  },
]

export const DEFINITION_OF_DONE: DoneCriterion[] = [
  { label: 'Scope signed before build', icon: 'scope' },
  { label: 'Staging signed off before prod', icon: 'staging' },
  { label: 'Responsive on agreed breakpoints', icon: 'responsive' },
  { label: 'Automated checks pass before launch', icon: 'checks' },
  { label: 'Deploy notes included', icon: 'deploy' },
]

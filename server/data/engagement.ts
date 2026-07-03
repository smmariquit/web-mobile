export interface EngagementPhase {
  id: string
  title: string
  detail: string
  deliverable: string
}

export interface CoordinationChannel {
  title: string
  detail: string
  href?: string
  icon?: string
}

export const TRUST_NARRATIVE =
  'We agree on scope and price in writing before I code. Each week I send a test link until you approve launch. You own the repo, I work from UTC+8 with US overlap, and extra work only happens through a documented scope update.'

export const SCOPE_EXAMPLE = [
  'Features: login, appointment calendar, email reminders.',
  'Exclude: video consultation, payments, and analytics unless added later.',
  'Constraints: budget under $1,500, 3-week deadline, spotty clinic Wi-Fi.',
  'Tech: static frontend, serverless booking route, small database, deploy runbook.',
]

export const HIRE_PROCESS: EngagementPhase[] = [
  {
    id: 'brief',
    title: 'Brief',
    detail: 'Email or the form. What you need, deadline, rough budget.',
    deliverable: 'Reply within 1 to 2 days',
  },
  {
    id: 'scope',
    title: 'Scope + quote',
    detail: 'One doc: goal, features, timeline, stack, budget, and what we are not building.',
    deliverable: 'Signed scope before code',
  },
  {
    id: 'build',
    title: 'Build',
    detail: 'Staging URL each week until you approve launch.',
    deliverable: 'Changes only through scope updates',
  },
  {
    id: 'launch',
    title: 'Launch',
    detail: 'Repo in your GitHub, deploy notes, and a walkthrough.',
    deliverable: 'Handoff so nothing depends on memory',
  },
]

export const COORDINATION: CoordinationChannel[] = [
  {
    title: 'Book a call',
    detail: 'cal.com/simonee, 30 min',
    href: 'https://cal.com/simonee',
  },
  {
    title: 'Email',
    detail: 'semariquit@gmail.com',
    href: 'mailto:semariquit@gmail.com',
  },
  {
    title: 'Day-to-day',
    detail: 'Issues and PRs on GitHub',
    href: 'https://github.com/smmariquit',
    icon: '/tech/github.svg',
  },
  {
    title: 'LinkedIn',
    detail: 'linkedin.com/in/stimmie',
    href: 'https://www.linkedin.com/in/stimmie',
  },
  {
    title: 'Timezone',
    detail: 'Philippines (UTC+8). US morning and evening overlap can work.',
  },
]

export const DEFINITION_OF_DONE = [
  'Scope signed before build',
  'Staging signed off before prod',
  'Responsive on agreed breakpoints',
  'Automated checks pass before launch',
  'Deploy notes included',
]

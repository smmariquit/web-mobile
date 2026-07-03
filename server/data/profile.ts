/**
 * Profile copy synced from https://stimmie.dev (home + /career).
 * When your main site changes, update this file to match.
 */

import { PROFILE_AVATAR_URL } from '../../utils/github-avatar'

export const PROFILE_SOURCE = 'https://stimmie.dev/career'

export interface ProfileLink {
  label: string
  href: string
}

export interface ExperienceEntry {
  title: string
  org: string
  period: string
  description: string
  href?: string
}

export const PROFILE = {
  name: 'Simonee Mariquit',
  nickname: 'Stimmie',
  avatarUrl: PROFILE_AVATAR_URL,
  education: 'BS Computer Science, UP Los Baños',
  tagline: 'Minecraft dev turned software engineer.',
  heroTitle: 'Production-ready code. Clear finish line.',
  heroSubtitle: 'Fixed quote · repo in your name.',
  homeLede: 'Web and mobile for real users. Fixed quote, repo in your name.',
  aboutLede:
    'I am Simonee Mariquit, a software engineer who has run a 7-year Minecraft community and built web and mobile tools for clinics and campuses.',
  aboutParagraph1:
    'I am Simonee Mariquit, a software engineer who has run a 7-year Minecraft community and built web and mobile tools for clinics and campuses. HearthCraft taught me to treat uptime, fairness, and moderation as engineering problems, not side chores.',
  aboutParagraph2:
    'That habit now shapes my client work. Whether I am building a clinic booking flow, an offline campus map, or a POS app on low-end hardware, I start with the constraints and explain the trade-offs before I write code.',
  hireLede:
    'First I listen to your idea, then I outline exactly what we will build and why. With every quote, I show the trade-offs: static site for lower cost, cached edge app for live data, or full production stack when reliability matters more than speed.',
  hireExperienceNote:
    'Clinic booking, campus tools, and POS on real hardware. Client projects since 2022.',
  careerUrl: 'https://stimmie.dev/career',
  resumeUrl: 'https://resume.stimmie.dev',
  linkedinUrl: 'https://www.linkedin.com/in/stimmie',
  talksUrl: 'https://stimmie.dev/talks',
  blogUrl: 'https://stimmie.dev/blog',
}

export const WRITING = {
  summary:
    'Writer and copy editor on every site I ship. Longer notes on the blog, Medium, and DEV.',
  links: [
    { label: 'Blog', href: 'https://stimmie.dev/blog' },
    { label: 'Medium', href: 'https://medium.com/@semariquit' },
    { label: 'DEV', href: 'https://dev.to/stimmie' },
    { label: 'Hackathon guide', href: 'https://workshops.stimmie.dev/hackathon-guide' },
  ] satisfies ProfileLink[],
}

/** Condensed from stimmie.dev/career. Full list lives on the main site. */
export const EXPERIENCE: ExperienceEntry[] = [
  {
    title: 'Software Engineer',
    org: 'Navegante',
    period: 'Jun 2026 to Jul 2026',
    description: 'Remote from Metro Manila.',
    href: 'https://navegante.app',
  },
  {
    title: 'Software Engineering Intern',
    org: 'E-Konsulta Medical Clinic',
    period: 'Apr 2025 to Jan 2026',
    description:
      'Internship at a clinic startup. Booking flows, mobile UI, internal Discord bots. Production code on a live product.',
    href: 'https://ekonsultaclinic.ph',
  },
  {
    title: 'Project Lead',
    org: 'HearthCraft',
    period: 'Apr 2018 to Apr 2025',
    description:
      'Non-pay-to-win Minecraft server and safe space for 50,000+ players. Donations paid hosting, college costs, and charity givebacks.',
    href: 'https://hearthcraft.stimmie.dev',
  },
  {
    title: 'Freelance Software Developer',
    org: 'Self-employed',
    period: 'Nov 2022 to present',
    description:
      'Web apps, Flutter, Firebase, POS on Sunmi hardware, educational tools, and full-stack apps.',
  },
  {
    title: 'Founder',
    org: 'UX Elbi',
    period: 'Dec 2025 to present',
    description: 'UX community in Los Baños. Design as public service.',
  },
]

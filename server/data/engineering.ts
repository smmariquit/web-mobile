export interface EngineeringHighlight {
  title: string
  detail: string
  repo: string
  url: string
}

export interface PipelineStep {
  id: string
  label: string
  detail: string
}

export interface Guardrail {
  title: string
  detail: string
}

export interface EngineeringPillar {
  id: 'agents' | 'cicd' | 'systems'
  title: string
  summary: string
  highlights: EngineeringHighlight[]
}

export const AGENT_PIPELINE: PipelineStep[] = [
  {
    id: 'spec',
    label: 'Issue / spec',
    detail: 'GitHub issue with paths, acceptance criteria, and which tests to run.',
  },
  {
    id: 'agent',
    label: 'Branch + PR',
    detail: 'Work happens on a feature branch. AGENTS.md keeps contributors aligned on repo rules.',
  },
  {
    id: 'staging',
    label: 'PR to staging',
    detail: 'Feature lands on integration first. CI runs before anyone merges.',
  },
  {
    id: 'verify',
    label: 'Verify',
    detail: 'Lint, unit and component tests, build. E2E gated on ready-for-review.',
  },
  {
    id: 'prod',
    label: 'staging to main',
    detail: 'Release PR only after green checks. semantic-release on main where configured.',
  },
]

export const GUARDRAILS: Guardrail[] = [
  {
    title: 'No prod from feature branches',
    detail: 'Routine work merges staging first, then a release PR to main.',
  },
  {
    title: 'Tests ship with the feature',
    detail: 'Bug fix includes a regression test. Issue-linked work updates acceptance criteria in the same PR.',
  },
  {
    title: 'Build guards on deploy',
    detail: 'Vercel scripts fail the build if DATABASE_URL is missing or the branch is not main for prod.',
  },
  {
    title: 'Stay in scope',
    detail: 'No drive-by refactors. Fix what the issue asks for.',
  },
  {
    title: 'Migrations before code',
    detail: 'SQL migrations applied to Supabase before deploy. Skipped migrations break prod at runtime.',
  },
]

export const PILLARS: EngineeringPillar[] = [
  {
    id: 'agents',
    title: 'Repo playbooks',
    summary:
      'AGENTS.md files on the repos I maintain. Staging and main rules, issue hygiene, and test expectations so anyone picking up the repo knows the drill.',
    highlights: [
      {
        title: 'Room TBA guide',
        detail: '600-line AGENTS.md with ship pipeline, worktrees, issue test matrix, and QA docs.',
        repo: 'uplbtools/room-tba',
        url: 'https://github.com/uplbtools/room-tba/blob/main/AGENTS.md',
      },
      {
        title: 'Cursor skills and rules',
        detail: '.cursor/skills and .mdc rules for migrations, side panels, Playwright CI.',
        repo: 'uplbtools/room-tba',
        url: 'https://github.com/uplbtools/room-tba/tree/main/.cursor',
      },
      {
        title: 'Org template',
        detail: 'Same AGENTS pattern across uplbtools repos (gradesim, discord-bot, uplbtools.me).',
        repo: 'uplbtools',
        url: 'https://github.com/uplbtools',
      },
    ],
  },
  {
    id: 'cicd',
    title: 'CI/CD',
    summary:
      'GitHub Actions on the repos I maintain: lint and build on every PR, semantic-release and store deploys where it makes sense. Fail in CI, not in prod at 2am.',
    highlights: [
      {
        title: 'Room TBA CI stack',
        detail: 'Biome, ESLint, unit + component tests, migration checks, gated Playwright E2E, CodeQL.',
        repo: 'uplbtools/room-tba',
        url: 'https://github.com/uplbtools/room-tba/tree/main/.github/workflows',
      },
      {
        title: 'GradeSim release train',
        detail: 'semantic-release on merge, build MV3 zip, Chrome Web Store publish.',
        repo: 'smmariquit/gradesim',
        url: 'https://github.com/smmariquit/gradesim/blob/main/.github/workflows/semantic-release.yml',
      },
      {
        title: 'Bus ticketing APK pipeline',
        detail: 'Jest on PR, Gradle assembleRelease, APK uploaded as artifact.',
        repo: 'smmariquit/bus-ticketing-app',
        url: 'https://github.com/smmariquit/bus-ticketing-app/blob/main/.github/workflows/build-android-apk.yml',
      },
      {
        title: 'This site',
        detail: 'Nuxt build in CI, Vercel production deploy on main.',
        repo: 'smmariquit/web-mobile',
        url: 'https://github.com/smmariquit/web-mobile/tree/main/.github/workflows',
      },
    ],
  },
  {
    id: 'systems',
    title: 'Systems engineering',
    summary:
      'Servers, offline caches, hardware hooks, and deploy targets. Game infra since 13, clinic booking stacks, campus PWAs, and POS terminals.',
    highlights: [
      {
        title: 'Room TBA data plane',
        detail: 'Supabase Postgres + Drizzle, PGlite offline cache, optimistic concurrency, migration discipline.',
        repo: 'uplbtools/room-tba',
        url: 'https://room-tba.uplbtools.me',
      },
      {
        title: 'Discord bot host',
        detail: 'Single Heroku dyno running multiple production bots (Pizzabot, Comskies, TheCribMC).',
        repo: 'smmariquit/discord-bot-host',
        url: 'https://github.com/smmariquit/discord-bot-host',
      },
      {
        title: 'HearthCraft ops',
        detail: '6 years, 10k+ players. Bare-metal and cloud, Docker, Java plugins, community moderation.',
        repo: 'smmariquit/hearthcraft',
        url: 'https://hearthcraft.stimmie.dev',
      },
      {
        title: 'POS + hardware',
        detail: 'React Native bus ticketing with device integration and automated Android builds.',
        repo: 'smmariquit/bus-ticketing-app',
        url: 'https://github.com/smmariquit/bus-ticketing-app',
      },
    ],
  },
]

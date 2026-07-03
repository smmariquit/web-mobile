import { PORTFOLIO_SLUGS } from '../data/portfolio-slugs'
import type { GitHubRepo } from './tech-stack'

const NOISE_REPO_NAMES = new Set([
  'dotfiles',
  'dev-journal',
  'leetcode',
  'adventofcode',
  'curriculum',
  'engineering',
  '6767commits',
  'algo-2026',
  'ai-detox',
  'cf',
  'cs-guidw',
  'disbotportf',
  'passman',
  'fractal-shorelines',
  'hackaguide',
  'kimiroutes',
  'mc-tools',
  'mcmods',
  'minceraft',
  'oeis',
  'bio-191',
  'automata-theory',
  'ai-benchmarking',
  'cmsc-180',
  'cmsc21-tutorial',
  'comsci-137',
  'block-memory',
  'bingoplus',
  'bautista-cayabyab-clan',
  'civikai',
  'crewmate-dashboard',
  'ml-iris-workshop',
  'javatut',
  'lowlevelfullstack',
  'minecraft-portfolio',
  'nextjs-counter',
  'sveltekit-sample',
  'sveltekit-sample-pg',
  'nuxt-deploy-sample',
  'nextjs-deploy-sample',
  'laravel-deploy-sample',
  'astro-deploy-sample',
  'docker-compose-sample',
  'test-app',
  'landing-page',
  'graph-centrality',
  'diet-problem-solver',
  'owofy-extension',
  'manim',
  'learning-ai',
  'smmariquit',
  'smmariquit.github.io',
  'stimmieuwu.github.io',
  'tutorials',
  'web-scraping',
  'travel-buddy',
  'r-training',
  'repairs',
  'toastmasters',
  'the-crib',
  'pjdsc',
  'piyutek',
  'pharmadash',
  'punnett-square',
  'smileconnect',
  'telegraphic-summary',
  'trapo-ai',
  'typhoonomics',
  'uxelbi',
  'whats-my-cs-score',
  'vibe-sync',
  'tools',
  'VybeChange',
  '173-autostudy',
  'ics-os-proj',
  'minecraft-owo-plugin',
  'oeis-visualize',
  'HearthDocs',
  'laguna-grown',
  'freshie-guide',
  'parokya-ni-stimmie',
  'dsg-reporting',
  'data-portfolio',
  'kape',
  'stimmie-mc-launcher',
  'doctor-now-global',
  'cursorph02',
  'People-Holding-Programming-Books',
  'pizzabot',
  'gradesim-website',
  'cc-java_code_checker',
  'jitsu_client',
  'langchain_client',
])

const NOISE_NAME_PATTERNS = [
  /^exer-/i,
  /-smmariquit$/i,
  /deploy-sample/i,
  /-sample$/i,
  /^00-git-/i,
  /^final-project-requirements/i,
  /^cmsc-\d/i,
  /^01-intro-to-dart/i,
  /^08-data-persistence/i,
  /^09-authentication/i,
]

const SHIP_TOPICS = new Set([
  'vercel',
  'pwa',
  'react-native',
  'flutter',
  'hackathon',
  'browser-extension',
  'chrome-extension',
  'discord-bot',
  'minecraft-server',
  'portfolio',
  'personal-site',
  'extension',
  'pos',
  'ticketing',
  'software-engineering',
  'accommodation-management',
  'civic-tech',
  'healthtech',
  'iot',
  'community',
  'android',
  'ci-cd',
  'netlify',
  'supabase',
  'nextjs',
  'nuxt',
  'sveltekit',
  'astro',
  'typescript',
  'expo',
])

function hasShipTopic(repo: GitHubRepo): boolean {
  return repo.topics.some((topic) => SHIP_TOPICS.has(topic))
}

export function isNoiseRepo(repo: GitHubRepo): boolean {
  if (PORTFOLIO_SLUGS.has(repo.name)) return false

  const name = repo.name
  const description = repo.description ?? ''
  const topics = new Set(repo.topics)

  if (NOISE_REPO_NAMES.has(name)) return true
  if (NOISE_NAME_PATTERNS.some((pattern) => pattern.test(name))) return true
  if (/GitHub Classroom/i.test(description)) return true
  if (topics.has('archive') || topics.has('prototype')) return true
  if (topics.has('coursework') && !repo.topics.some((topic) => SHIP_TOPICS.has(topic))) return true
  if (/^comsci-\d+$/.test(name) && !topics.has('software-engineering')) return true

  return false
}

/** Real projects — excludes coursework, samples, dotfiles, empty shells. */
export function isPortfolioRepo(repo: GitHubRepo): boolean {
  if (repo.fork) return false
  if (isNoiseRepo(repo)) return false
  if (PORTFOLIO_SLUGS.has(repo.name)) return true
  if (repo.stargazers_count >= 1) return true
  if (hasShipTopic(repo)) return true
  return false
}

export function filterPortfolioRepos(repos: GitHubRepo[]): GitHubRepo[] {
  return repos.filter(isPortfolioRepo)
}

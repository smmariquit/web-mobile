export type TechCategory = 'web' | 'mobile' | 'platform'

export interface GitHubRepo {
  name: string
  language: string | null
  topics: string[]
  stargazers_count: number
  fork: boolean
  private: boolean
  created_at: string
}

export interface DetectedTech {
  id: string
  name: string
  category: TechCategory
  icon: string
  repoCount: number
  repoNames: string[]
}

interface TechRule {
  id: string
  name: string
  category: TechCategory
  icon: string
  matches: (repo: GitHubRepo) => boolean
}

const topic = (repo: GitHubRepo, ...values: string[]) =>
  values.some((value) => repo.topics.includes(value))

const nameIncludes = (repo: GitHubRepo, ...fragments: string[]) =>
  fragments.some((fragment) => repo.name.toLowerCase().includes(fragment.toLowerCase()))

const TECH_RULES: TechRule[] = [
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'web',
    icon: '/tech/typescript.svg',
    matches: (repo) => repo.language === 'TypeScript' || topic(repo, 'typescript'),
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'web',
    icon: '/tech/javascript.svg',
    matches: (repo) => repo.language === 'JavaScript' || topic(repo, 'javascript'),
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'web',
    icon: '/tech/nextdotjs.svg',
    matches: (repo) => topic(repo, 'nextjs') || nameIncludes(repo, 'next'),
  },
  {
    id: 'react',
    name: 'React',
    category: 'web',
    icon: '/tech/react.svg',
    matches: (repo) => topic(repo, 'react') || nameIncludes(repo, 'react'),
  },
  {
    id: 'vue',
    name: 'Vue',
    category: 'web',
    icon: '/tech/vuedotjs.svg',
    matches: (repo) => repo.language === 'Vue' || topic(repo, 'vue'),
  },
  {
    id: 'nuxt',
    name: 'Nuxt',
    category: 'web',
    icon: '/tech/nuxtdotjs.svg',
    matches: (repo) => topic(repo, 'nuxt') || nameIncludes(repo, 'nuxt'),
  },
  {
    id: 'svelte',
    name: 'Svelte',
    category: 'web',
    icon: '/tech/svelte.svg',
    matches: (repo) =>
      repo.language === 'Svelte' || topic(repo, 'svelte', 'sveltekit') || nameIncludes(repo, 'svelte'),
  },
  {
    id: 'astro',
    name: 'Astro',
    category: 'web',
    icon: '/tech/astro.svg',
    matches: (repo) => repo.language === 'Astro' || topic(repo, 'astro') || nameIncludes(repo, 'astro'),
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'web',
    icon: '/tech/tailwindcss.svg',
    matches: (repo) => topic(repo, 'tailwindcss', 'tailwind'),
  },
  {
    id: 'vite',
    name: 'Vite',
    category: 'web',
    icon: '/tech/vite.svg',
    matches: (repo) => topic(repo, 'vite') || nameIncludes(repo, 'vite'),
  },
  {
    id: 'supabase',
    name: 'Supabase',
    category: 'platform',
    icon: '/tech/supabase.svg',
    matches: (repo) => topic(repo, 'supabase') || nameIncludes(repo, 'supabase'),
  },
  {
    id: 'vercel',
    name: 'Vercel',
    category: 'platform',
    icon: '/tech/vercel.svg',
    matches: (repo) => topic(repo, 'vercel') || nameIncludes(repo, 'vercel'),
  },
  {
    id: 'flutter',
    name: 'Flutter',
    category: 'mobile',
    icon: '/tech/flutter.svg',
    matches: (repo) => topic(repo, 'flutter') || nameIncludes(repo, 'flutter'),
  },
  {
    id: 'dart',
    name: 'Dart',
    category: 'mobile',
    icon: '/tech/dart.svg',
    matches: (repo) => repo.language === 'Dart' || topic(repo, 'dart'),
  },
  {
    id: 'react-native',
    name: 'React Native',
    category: 'mobile',
    icon: '/tech/react.svg',
    matches: (repo) => topic(repo, 'react-native') || nameIncludes(repo, 'react-native'),
  },
  {
    id: 'expo',
    name: 'Expo',
    category: 'mobile',
    icon: '/tech/expo.svg',
    matches: (repo) => topic(repo, 'expo') || nameIncludes(repo, 'expo'),
  },
  {
    id: 'firebase',
    name: 'Firebase',
    category: 'platform',
    icon: '/tech/firebase.svg',
    matches: (repo) => topic(repo, 'firebase') || nameIncludes(repo, 'firebase'),
  },
  {
    id: 'swift',
    name: 'Swift',
    category: 'mobile',
    icon: '/tech/swift.svg',
    matches: (repo) => repo.language === 'Swift' || topic(repo, 'swift', 'ios'),
  },
  {
    id: 'kotlin',
    name: 'Kotlin',
    category: 'mobile',
    icon: '/tech/kotlin.svg',
    matches: (repo) => repo.language === 'Kotlin' || topic(repo, 'kotlin', 'android'),
  },
  {
    id: 'pwa',
    name: 'PWA',
    category: 'mobile',
    icon: '/tech/pwa.svg',
    matches: (repo) => topic(repo, 'pwa'),
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'platform',
    icon: '/tech/nodedotjs.svg',
    matches: (repo) => topic(repo, 'nodejs', 'node', 'express') || nameIncludes(repo, 'express'),
  },
  {
    id: 'python',
    name: 'Python',
    category: 'platform',
    icon: '/tech/python.svg',
    matches: (repo) => repo.language === 'Python' || topic(repo, 'python'),
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'platform',
    icon: '/tech/postgresql.svg',
    matches: (repo) => topic(repo, 'postgresql', 'postgres', 'pgvector'),
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'platform',
    icon: '/tech/docker.svg',
    matches: (repo) => repo.language === 'Dockerfile' || topic(repo, 'docker'),
  },
]

export function detectTechStack(repos: GitHubRepo[]): DetectedTech[] {
  const detected = new Map<string, DetectedTech>()

  for (const repo of repos) {
    if (repo.fork || repo.private) continue

    for (const rule of TECH_RULES) {
      if (!rule.matches(repo)) continue

      const existing = detected.get(rule.id)
      if (existing) {
        existing.repoCount += 1
        if (existing.repoNames.length < 4) {
          existing.repoNames.push(repo.name)
        }
        continue
      }

      detected.set(rule.id, {
        id: rule.id,
        name: rule.name,
        category: rule.category,
        icon: rule.icon,
        repoCount: 1,
        repoNames: [repo.name],
      })
    }
  }

  return [...detected.values()].sort((a, b) => b.repoCount - a.repoCount)
}

export function proficiencyFromRepoCount(count: number): string {
  if (count >= 12) return 'proficient'
  if (count >= 5) return 'familiar'
  if (count >= 2) return 'learning'
  return 'touched'
}

export function buildSkillCategories(technologies: DetectedTech[]) {
  const groups: Record<TechCategory, DetectedTech[]> = {
    web: [],
    mobile: [],
    platform: [],
  }

  for (const tech of technologies) {
    groups[tech.category].push(tech)
  }

  return [
    {
      name: 'Web',
      items: groups.web.map((tech) => ({
        name: tech.name,
        level: proficiencyFromRepoCount(tech.repoCount),
        repoCount: tech.repoCount,
        icon: tech.icon,
      })),
    },
    {
      name: 'Mobile',
      items: groups.mobile.map((tech) => ({
        name: tech.name,
        level: proficiencyFromRepoCount(tech.repoCount),
        repoCount: tech.repoCount,
        icon: tech.icon,
      })),
    },
    {
      name: 'Platform & Backend',
      items: groups.platform.map((tech) => ({
        name: tech.name,
        level: proficiencyFromRepoCount(tech.repoCount),
        repoCount: tech.repoCount,
        icon: tech.icon,
      })),
    },
  ].filter((category) => category.items.length > 0)
}

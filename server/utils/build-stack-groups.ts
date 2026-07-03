import type { DetectedTech } from '../utils/tech-stack'
import {
  CURATED_PLATFORM_ITEMS,
  CURATED_STACK_GROUPS,
  MAX_STACK_REPOS,
  STACK_CATEGORY_LABELS,
  githubRepoUrl,
  type StackGroup,
  type StackItem,
  type StackRepo,
} from '../data/stack'

function dedupeItems(items: StackItem[]): StackItem[] {
  const seen = new Set<string>()
  return items.filter((item) => {
    if (seen.has(item.id)) return false
    seen.add(item.id)
    return true
  })
}

function toRepos(repoNames: string[]): StackRepo[] {
  return repoNames.slice(0, MAX_STACK_REPOS).map((name) => ({
    name,
    url: githubRepoUrl(name),
  }))
}

export function buildStackGroups(technologies: DetectedTech[]): StackGroup[] {
  const buckets: Record<'web' | 'mobile' | 'platform', StackItem[]> = {
    web: [],
    mobile: [],
    platform: [],
  }

  for (const tech of technologies) {
    buckets[tech.category].push({
      id: tech.id,
      name: tech.name,
      icon: tech.icon,
      repos: toRepos(tech.repoNames),
    })
  }

  buckets.platform = dedupeItems([...buckets.platform, ...CURATED_PLATFORM_ITEMS])

  const fromRepos: StackGroup[] = (['web', 'mobile', 'platform'] as const)
    .map((category) => ({
      id: category,
      label: STACK_CATEGORY_LABELS[category],
      items: dedupeItems(buckets[category]).slice(0, 8),
    }))
    .filter((group) => group.items.length > 0)

  return [...fromRepos, ...CURATED_STACK_GROUPS]
}

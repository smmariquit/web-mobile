import type { GitHubRepo } from './tech-stack'
import { filterPortfolioRepos } from './repo-filter'

const GITHUB_USERNAME = 'smmariquit'

interface GitHubUser {
  login: string
  name: string | null
  public_repos: number
  followers: number
  created_at: string
  html_url: string
}

export interface GitHubStats {
  login: string
  name: string
  profileUrl: string
  projectsCount: number
  totalStars: number
  followers: number
  yearsOnGitHub: number
  authenticated: boolean
  fetchedAt: string
}

function yearsSince(isoDate: string): number {
  const start = new Date(isoDate)
  const now = new Date()
  const diffMs = now.getTime() - start.getTime()
  return Math.max(1, Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365.25)))
}

function getToken(): string | undefined {
  return process.env.GITHUB_TOKEN?.trim() || undefined
}

async function githubFetch<T>(path: string): Promise<T> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'stimmie-web-mobile-portfolio',
  }

  const token = getToken()
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`https://api.github.com${path}`, { headers })

  if (!response.ok) {
    throw createError({
      statusCode: response.status,
      statusMessage: `GitHub API error: ${response.statusText}`,
    })
  }

  return response.json() as Promise<T>
}

export async function fetchGitHubUser(): Promise<GitHubUser> {
  const token = getToken()
  if (token) {
    return githubFetch<GitHubUser>('/user')
  }
  return githubFetch<GitHubUser>(`/users/${GITHUB_USERNAME}`)
}

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  const token = getToken()
  const repos: GitHubRepo[] = []
  let page = 1

  while (page <= 10) {
    const path = token
      ? `/user/repos?affiliation=owner,organization_member&sort=pushed&per_page=100&page=${page}`
      : `/users/${GITHUB_USERNAME}/repos?per_page=100&page=${page}&sort=pushed`

    const batch = await githubFetch<GitHubRepo[]>(path)

    if (batch.length === 0) break

    repos.push(...batch)
    if (batch.length < 100) break
    page += 1
  }

  return repos
}

function summarizeProjects(repos: GitHubRepo[]) {
  const owned = repos.filter((repo) => !repo.fork)
  const projects = filterPortfolioRepos(repos)
  const totalStars = projects.reduce((sum, repo) => sum + repo.stargazers_count, 0)
  const oldestCreatedAt = owned.reduce<string | null>((oldest, repo) => {
    if (!oldest || repo.created_at < oldest) return repo.created_at
    return oldest
  }, null)

  return { projects, totalStars, oldestCreatedAt }
}

export async function fetchGitHubStats(): Promise<GitHubStats> {
  const token = getToken()
  const [user, repos] = await Promise.all([fetchGitHubUser(), fetchGitHubRepos()])
  const summary = summarizeProjects(repos)

  return {
    login: user.login,
    name: user.name ?? 'Simonee Mariquit',
    profileUrl: user.html_url,
    projectsCount: summary.projects.length,
    totalStars: summary.totalStars,
    followers: user.followers,
    yearsOnGitHub: yearsSince(summary.oldestCreatedAt ?? user.created_at),
    authenticated: Boolean(token),
    fetchedAt: new Date().toISOString(),
  }
}

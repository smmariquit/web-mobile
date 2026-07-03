import type { GitHubRepo } from './tech-stack'

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
  publicRepos: number
  totalStars: number
  followers: number
  yearsOnGitHub: number
  fetchedAt: string
}

function yearsSince(isoDate: string): number {
  const start = new Date(isoDate)
  const now = new Date()
  const diffMs = now.getTime() - start.getTime()
  return Math.max(1, Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365.25)))
}

async function githubFetch<T>(path: string): Promise<T> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'stimmie-web-mobile-portfolio',
  }

  const token = process.env.GITHUB_TOKEN
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
  return githubFetch<GitHubUser>(`/users/${GITHUB_USERNAME}`)
}

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  const repos: GitHubRepo[] = []
  let page = 1

  while (page <= 10) {
    const batch = await githubFetch<GitHubRepo[]>(
      `/users/${GITHUB_USERNAME}/repos?per_page=100&page=${page}&sort=pushed`,
    )

    if (batch.length === 0) break

    repos.push(...batch)
    if (batch.length < 100) break
    page += 1
  }

  return repos
}

export async function fetchGitHubStats(): Promise<GitHubStats> {
  const [user, repos] = await Promise.all([fetchGitHubUser(), fetchGitHubRepos()])
  const publicRepos = repos.filter((repo) => !repo.fork && !repo.private)
  const totalStars = publicRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0)

  const oldestCreatedAt = publicRepos.reduce<string | null>((oldest, repo) => {
    if (!oldest || repo.created_at < oldest) return repo.created_at
    return oldest
  }, null)

  return {
    login: user.login,
    name: user.name ?? 'Stimmie',
    profileUrl: user.html_url,
    publicRepos: user.public_repos,
    totalStars,
    followers: user.followers,
    yearsOnGitHub: yearsSince(oldestCreatedAt ?? user.created_at),
    fetchedAt: new Date().toISOString(),
  }
}

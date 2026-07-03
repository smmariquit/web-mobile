import { fetchGitHubRepos } from '../utils/github'
import { filterPortfolioRepos } from '../utils/repo-filter'
import { buildStackGroups } from '../utils/build-stack-groups'
import { buildSkillCategories, countProjectsByCategory, detectTechStack } from '../utils/tech-stack'

export default defineCachedEventHandler(
  async () => {
    const repos = await fetchGitHubRepos()
    const projects = filterPortfolioRepos(repos)
    const technologies = detectTechStack(repos)

    return {
      technologies,
      groups: buildStackGroups(technologies),
      categories: buildSkillCategories(technologies),
      categoryUsage: countProjectsByCategory(repos),
      projectsCount: projects.length,
      authenticated: Boolean(process.env.GITHUB_TOKEN?.trim()),
      fetchedAt: new Date().toISOString(),
    }
  },
  {
    maxAge: 60 * 60,
    swr: true,
    name: 'github-stack-v5',
  },
)

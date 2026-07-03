import { fetchGitHubRepos } from '../utils/github'
import { buildSkillCategories, detectTechStack } from '../utils/tech-stack'

export default defineCachedEventHandler(
  async () => {
    const repos = await fetchGitHubRepos()
    const technologies = detectTechStack(repos)

    return {
      technologies,
      categories: buildSkillCategories(technologies),
      fetchedAt: new Date().toISOString(),
    }
  },
  {
    maxAge: 60 * 60,
    swr: true,
    name: 'github-stack',
  },
)

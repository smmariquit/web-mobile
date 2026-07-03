import { fetchGitHubStats } from '../utils/github'

export default defineCachedEventHandler(
  async () => fetchGitHubStats(),
  {
    maxAge: 60 * 60,
    swr: true,
    name: 'github-stats',
  },
)

import { PORTFOLIO_PROJECTS } from '../data/projects'
import { projectHeadline } from '../data/project-headlines'
import { withResolvedPreviews } from '../utils/resolvePreviews'

export default defineEventHandler(() =>
  PORTFOLIO_PROJECTS.map((project) => ({
    ...withResolvedPreviews(project),
    headline: projectHeadline(project.slug, project.title),
  })),
)

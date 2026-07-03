import { fetchAnalyticsDashboard } from '../utils/vercel-analytics'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const days = Math.min(30, Math.max(7, Number(query.days) || 14))

  return fetchAnalyticsDashboard(days)
})

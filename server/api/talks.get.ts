import { getFeaturedTalks, getTotalAudience, TALKS } from '../data/talks'

export default defineEventHandler(() => ({
  source: 'https://stimmie.dev/talks',
  totalAudience: getTotalAudience(),
  talks: TALKS,
  featured: getFeaturedTalks(6),
}))

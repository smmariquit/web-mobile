import { BUDGET_TIERS, BUDGET_TIERS_LEDE } from '../data/budget-tiers'
import { HOURLY_RATE, PRICING_NOTE, SERVICE_PRICING } from '../data/pricing'
import { SITE_LINKS } from '../data/site'

export default defineEventHandler(() => ({
  links: SITE_LINKS,
  hourly: HOURLY_RATE,
  note: PRICING_NOTE,
  services: SERVICE_PRICING,
  budgetTiers: BUDGET_TIERS,
  budgetTiersLede: BUDGET_TIERS_LEDE,
}))

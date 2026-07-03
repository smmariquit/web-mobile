import { ANALYTICS_HOSTNAMES, ANALYTICS_SITES, type AnalyticsSite } from '../data/analytics-sites'

const METRIC = 'vercel.analytics_pageview.count'
const AGGREGATION = 'unique/visitor_id'
const VALUE_KEY = 'vercel_analytics_pageview_count_unique_visitor_id'
const PRODUCTION_FILTER = "environment eq 'production'"

export interface DailyVisitors {
  date: string
  visitors: number
}

export interface SiteTraffic {
  id: string
  label: string
  hostname: string
  url: string
  today: number
  periodTotal: number
  series: DailyVisitors[]
}

export interface AnalyticsDashboard {
  configured: boolean
  source: 'vercel-web-analytics'
  updatedAt: string
  range: { from: string; to: string; days: number }
  totals: { today: number; period: number }
  sites: SiteTraffic[]
  message?: string
}

interface ObservabilityRow {
  timestamp?: string
  request_hostname?: string
  [key: string]: string | number | undefined
}

interface ObservabilityResponse {
  summary?: ObservabilityRow[]
  data?: ObservabilityRow[]
  error?: { message?: string }
}

function startOfUtcDay(date: Date): Date {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))
}

function buildUtcRange(days: number) {
  const end = startOfUtcDay(new Date())
  end.setUTCDate(end.getUTCDate() + 1)
  const start = new Date(end)
  start.setUTCDate(start.getUTCDate() - days)
  return { start, end }
}

function rowValue(row: ObservabilityRow): number {
  const raw = row[VALUE_KEY]
  return typeof raw === 'number' ? raw : Number(raw ?? 0)
}

function dateKey(iso: string): string {
  return iso.slice(0, 10)
}

async function queryVercelMetrics(
  token: string,
  teamId: string,
  start: Date,
  end: Date,
): Promise<ObservabilityResponse> {
  const response = await fetch(`https://api.vercel.com/v2/observability/query?teamId=${teamId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      scope: { type: 'owner', ownerId: teamId },
      metric: METRIC,
      aggregation: AGGREGATION,
      groupBy: ['request_hostname'],
      filter: PRODUCTION_FILTER,
      startTime: start.toISOString(),
      endTime: end.toISOString(),
      granularity: { days: 1 },
      limit: 50,
    }),
  })

  if (!response.ok) {
    const body = await response.text()
    throw createError({
      statusCode: response.status,
      statusMessage: `Vercel analytics error: ${body.slice(0, 200)}`,
    })
  }

  return response.json() as Promise<ObservabilityResponse>
}

function buildSiteTraffic(site: AnalyticsSite, rows: ObservabilityRow[]): SiteTraffic {
  const byDate = new Map<string, number>()

  for (const row of rows) {
    if (!row.timestamp) continue
    byDate.set(dateKey(row.timestamp), rowValue(row))
  }

  const series = [...byDate.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, visitors]) => ({ date, visitors }))

  const todayKey = dateKey(new Date().toISOString())
  const today = byDate.get(todayKey) ?? series.at(-1)?.visitors ?? 0
  const periodTotal = series.reduce((sum, point) => sum + point.visitors, 0)

  return {
    id: site.id,
    label: site.label,
    hostname: site.hostname,
    url: site.url,
    today,
    periodTotal,
    series,
  }
}

export async function fetchAnalyticsDashboard(days = 14): Promise<AnalyticsDashboard> {
  const config = useRuntimeConfig()
  const token = config.vercelToken?.trim()
  const teamId = config.vercelTeamId?.trim()

  const range = buildUtcRange(days)

  if (!token || !teamId) {
    return {
      configured: false,
      source: 'vercel-web-analytics',
      updatedAt: new Date().toISOString(),
      range: {
        from: range.start.toISOString(),
        to: range.end.toISOString(),
        days,
      },
      totals: { today: 0, period: 0 },
      sites: [],
      message: 'Set VERCEL_TOKEN and VERCEL_TEAM_ID to enable live traffic.',
    }
  }

  const payload = await queryVercelMetrics(token, teamId, range.start, range.end)
  const grouped = new Map<string, ObservabilityRow[]>()

  for (const row of payload.data ?? []) {
    const hostname = row.request_hostname
    if (!hostname || !ANALYTICS_HOSTNAMES.has(hostname)) continue
    const list = grouped.get(hostname) ?? []
    list.push(row)
    grouped.set(hostname, list)
  }

  const sites = ANALYTICS_SITES.map((site) =>
    buildSiteTraffic(site, grouped.get(site.hostname) ?? []),
  ).sort((a, b) => b.today - a.today || b.periodTotal - a.periodTotal)

  const totals = sites.reduce(
    (acc, site) => ({
      today: acc.today + site.today,
      period: acc.period + site.periodTotal,
    }),
    { today: 0, period: 0 },
  )

  return {
    configured: true,
    source: 'vercel-web-analytics',
    updatedAt: new Date().toISOString(),
    range: {
      from: range.start.toISOString(),
      to: range.end.toISOString(),
      days,
    },
    totals,
    sites,
  }
}

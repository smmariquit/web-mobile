<template>
  <section class="analytics" :class="{ 'analytics--compact': compact }" :aria-busy="pending || undefined">
    <div v-if="!headless" class="analytics__head">
      <div>
        <p class="kicker">Traffic</p>
        <p v-if="!compact" class="body-sm analytics__sub">
          Daily unique visitors from Vercel Web Analytics (production).
        </p>
      </div>
      <p v-if="updatedLabel" class="caption mono analytics__updated">Updated {{ updatedLabel }}</p>
    </div>

    <p v-if="pending && headless" class="caption analytics__status">Loading…</p>

    <p v-if="error" class="analytics__notice body-sm" role="alert">
      Could not load analytics right now.
    </p>
    <p v-else-if="data && !data.configured" class="analytics__notice body-sm">
      {{ data.message }}
    </p>

    <template v-else-if="data?.configured">
      <div class="analytics__totals">
        <div class="analytics__stat">
          <span class="caption">Today</span>
          <strong class="analytics__value">{{ formatNum(data.totals.today) }}</strong>
          <span class="caption">visitors across {{ data.sites.length }} sites</span>
        </div>
        <div v-if="!compact" class="analytics__stat">
          <span class="caption">{{ data.range.days }}-day total</span>
          <strong class="analytics__value">{{ formatNum(data.totals.period) }}</strong>
          <span class="caption">unique visitor-days</span>
        </div>
      </div>

      <div v-if="!compact" class="analytics__columns caption" aria-hidden="true">
        <span>Site</span>
        <span>
          Daily unique visitors
          <span class="analytics__range">· {{ data.range.days }} days ({{ rangeLabel }})</span>
        </span>
        <span>Today</span>
      </div>

      <ul class="analytics__list" :class="{ 'analytics__list--compact': compact }">
        <li v-for="site in visibleSites" :key="site.id" class="analytics__row">
          <div class="analytics__site">
            <a
              :href="site.url"
              target="_blank"
              rel="noopener"
              class="analytics__label"
              :aria-label="`${site.label} (opens in new tab)`"
            >
              {{ site.label }}
            </a>
            <span class="caption mono analytics__host">{{ site.hostname }}</span>
          </div>

          <div class="analytics__chart">
            <div
              class="analytics__spark"
              role="img"
              :aria-label="sparkAria(site)"
            >
              <span
                v-for="point in site.series"
                :key="point.date"
                class="analytics__bar"
                :style="{ height: barHeight(site, point.visitors) }"
                :title="`${formatChartDate(point.date)}: ${formatNum(point.visitors)} visitors`"
              />
            </div>
            <p v-if="!compact && site.series.length" class="analytics__axis caption">
              <span>{{ formatChartDate(site.series[0].date) }}</span>
              <span aria-hidden="true">→</span>
              <span>{{ formatChartDate(site.series.at(-1)!.date) }}</span>
              <span class="analytics__axis-note">· oldest left, today right · UTC days</span>
            </p>
            <p v-else-if="compact" class="analytics__axis caption">
              {{ data.range.days }}-day daily trend
            </p>
          </div>

          <div class="analytics__nums mono">
            <strong>{{ formatNum(site.today) }}</strong>
            <span v-if="!compact" class="caption">today</span>
            <span v-if="!compact" class="caption analytics__period">{{ formatNum(site.periodTotal) }} / {{ data.range.days }}d</span>
          </div>
        </li>
      </ul>

      <div v-if="compact && data.sites.length > limit" class="analytics__foot">
        <NuxtLink to="/stats" class="btn btn--line btn--sm">Full dashboard ↗</NuxtLink>
      </div>
      <p v-if="!compact" class="caption analytics__source">
        <template v-if="headless && updatedLabel">Updated {{ updatedLabel }} · </template>
        Refreshes every minute · Data from Vercel Web Analytics
      </p>
    </template>
  </section>
</template>

<script setup lang="ts">
interface DailyVisitors {
  date: string
  visitors: number
}

interface SiteTraffic {
  id: string
  label: string
  hostname: string
  url: string
  today: number
  periodTotal: number
  series: DailyVisitors[]
}

interface AnalyticsPayload {
  configured: boolean
  updatedAt: string
  range: { from: string; to: string; days: number }
  totals: { today: number; period: number }
  sites: SiteTraffic[]
  message?: string
}

const props = withDefaults(
  defineProps<{
    compact?: boolean
    headless?: boolean
    limit?: number
    days?: number
  }>(),
  {
    compact: false,
    headless: false,
    limit: 5,
    days: 14,
  },
)

const { data, pending, error, refresh } = await useFetch<AnalyticsPayload>(
  () => `/api/analytics?days=${props.days}`,
)

const visibleSites = computed(() => {
  const sites = data.value?.sites ?? []
  return props.compact ? sites.slice(0, props.limit) : sites
})

const updatedLabel = computed(() => {
  if (!data.value?.updatedAt) return ''
  return new Intl.DateTimeFormat('en-PH', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'Asia/Manila',
  }).format(new Date(data.value.updatedAt))
})

const rangeLabel = computed(() => {
  const range = data.value?.range
  if (!range) return ''
  return `${formatChartDate(range.from)} – ${formatChartDate(range.to, { endExclusive: true })}`
})

function formatChartDate(iso: string, options?: { endExclusive?: boolean }) {
  const date = new Date(iso)
  if (options?.endExclusive) {
    date.setUTCDate(date.getUTCDate() - 1)
  }
  return new Intl.DateTimeFormat('en-PH', {
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}

function sparkAria(site: SiteTraffic) {
  if (!site.series.length) return 'No visitor data'
  const first = formatChartDate(site.series[0].date)
  const last = formatChartDate(site.series.at(-1)!.date)
  return `Daily unique visitors from ${first} to ${last}, oldest day on the left and today on the right`
}

function formatNum(value: number) {
  return new Intl.NumberFormat('en-PH').format(value)
}

function barHeight(site: SiteTraffic, visitors: number) {
  const max = Math.max(...site.series.map((p) => p.visitors), 1)
  return `${Math.max(8, Math.round((visitors / max) * 100))}%`
}

let refreshTimer: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  refreshTimer = setInterval(() => refresh(), 60_000)
})

onUnmounted(() => {
  if (refreshTimer) clearInterval(refreshTimer)
})
</script>

<style scoped>
.analytics__head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  flex-wrap: wrap;
}

.analytics__sub {
  margin-top: 0.35rem;
  color: var(--c-text-muted);
}

.analytics__updated {
  color: var(--text-muted);
}

.analytics__status {
  margin-bottom: var(--space-row);
  color: var(--text-muted);
}

.analytics__notice {
  margin-top: 1rem;
  color: var(--c-text-soft);
}

.analytics__totals {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  gap: 0.75rem;
  margin: 1.25rem 0;
}

.analytics--compact .analytics__totals {
  margin-top: 0.85rem;
}

.analytics__stat {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  padding: 0.85rem 1rem;
  border: 1px solid var(--c-line);
  border-radius: var(--r-sm);
  background: var(--c-bg);
}

.analytics__value {
  font-family: var(--font-display);
  font-size: 1.75rem;
  line-height: 1.1;
  letter-spacing: -0.03em;
}

.analytics__list {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.analytics__columns {
  display: grid;
  grid-template-columns: minmax(8rem, 1.1fr) minmax(5rem, 1fr) auto;
  gap: 0.75rem;
  align-items: end;
  margin-top: 0.35rem;
  padding: 0 0.75rem 0.35rem;
  color: var(--c-text-soft);
}

.analytics__range {
  color: var(--c-text-muted);
}

.analytics__row {
  display: grid;
  grid-template-columns: minmax(8rem, 1.1fr) minmax(5rem, 1fr) auto;
  gap: 0.75rem;
  align-items: center;
  padding: 0.65rem 0.75rem;
  border: 1px solid var(--c-line);
  border-radius: var(--r-sm);
  background: var(--c-bg);
}

.analytics__list--compact .analytics__row {
  grid-template-columns: minmax(7rem, 1fr) minmax(4rem, 0.8fr) auto;
  padding: 0.55rem 0.65rem;
}

.analytics__site {
  min-width: 0;
}

.analytics__label {
  display: block;
  font-weight: 600;
  font-size: var(--fs-caption);
  color: var(--c-text);
  text-decoration: underline;
  text-underline-offset: 0.15em;
  text-decoration-thickness: 1px;
}

.analytics__label:hover {
  color: var(--c-accent);
}

.analytics__host {
  display: block;
  margin-top: 0.1rem;
  color: var(--c-text-soft);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.analytics__chart {
  min-width: 0;
}

.analytics__spark {
  display: flex;
  align-items: flex-end;
  gap: 0.15rem;
  height: 2rem;
}

.analytics__bar {
  flex: 1;
  min-width: 0.2rem;
  border-radius: 2px 2px 0 0;
  background: linear-gradient(180deg, var(--c-accent) 0%, rgba(229, 184, 74, 0.35) 100%);
}

.analytics__axis {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.25rem 0.35rem;
  margin: 0.35rem 0 0;
  color: var(--c-text-soft);
}

.analytics__axis-note {
  color: var(--c-text-muted);
}

.analytics__nums {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.05rem;
  min-width: 3.5rem;
}

.analytics__nums strong {
  font-size: 1.05rem;
  color: var(--c-text);
}

.analytics__period {
  color: var(--c-text-soft);
}

.analytics__foot {
  margin-top: 0.85rem;
}

.analytics__source {
  margin-top: 1rem;
  color: var(--c-text-soft);
}

@media (max-width: 640px) {
  .analytics__columns {
    display: none;
  }

  .analytics__row,
  .analytics__list--compact .analytics__row {
    grid-template-columns: 1fr;
    gap: 0.45rem;
  }

  .analytics__nums {
    flex-direction: row;
    align-items: baseline;
    gap: 0.5rem;
  }
}
</style>

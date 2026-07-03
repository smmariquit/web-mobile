/**
 * Pull talks from smmariquit/stimmie.dev and regenerate server/data/talks.ts.
 * Profile copy is still hand-synced from stimmie.dev/career in server/data/profile.ts.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const outFile = path.join(root, 'server/data/talks.ts')
const sourceUrl =
  'https://raw.githubusercontent.com/smmariquit/stimmie.dev/main/src/data/talks.js'

const js = await fetch(sourceUrl).then((r) => {
  if (!r.ok) throw new Error(`Failed to fetch ${sourceUrl}: ${r.status}`)
  return r.text()
})

const fn = new Function(
  `${js.replace('export const talks', 'const talks').replace(/export function.*/gs, '')}; return talks;`,
)
const talks = fn()

const mapped = talks.map((t) => ({
  slug: t.slug,
  title: t.title.includes(' - ') ? t.title.split(' - ').pop().trim() : t.title,
  type: t.type,
  event: t.event,
  date: t.date ?? null,
  year: t.date ? new Date(t.date).getFullYear() : null,
  audienceSize: t.audienceSize ?? 0,
  url: `https://stimmie.dev/talks/${t.slug}`,
}))

const contents = `/**
 * Talks synced from ${sourceUrl}
 * Full listing: https://stimmie.dev/talks
 * Regenerate: npm run sync:stimmie
 */

export interface TalkEntry {
  slug: string
  title: string
  type: 'Talk' | 'Workshop'
  event: string
  date: string | null
  year: number | null
  audienceSize: number
  url: string
}

export const TALKS: TalkEntry[] = ${JSON.stringify(mapped, null, 2)}

export function getTotalAudience() {
  return TALKS.reduce((sum, talk) => sum + talk.audienceSize, 0)
}

export function getFeaturedTalks(limit = 6) {
  return [...TALKS]
    .sort((a, b) => {
      const da = a.date ? Date.parse(a.date) : 0
      const db = b.date ? Date.parse(b.date) : 0
      return db - da
    })
    .slice(0, limit)
}
`

fs.writeFileSync(outFile, contents)
console.log(`Synced ${mapped.length} talks → ${outFile}`)

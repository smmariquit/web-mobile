/**
 * Capture desktop, tablet, and mobile screenshots for portfolio projects.
 * Usage: node scripts/capture-previews.mjs [slug]
 */

import puppeteer from 'puppeteer'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

const TARGETS = [
  { slug: 'room-tba', url: 'https://room-tba.stimmie.dev' },
  { slug: 'gradesim', url: 'https://gradesim.stimmie.dev' },
  { slug: 'hearthcraft', url: 'https://hearthcraft.stimmie.dev' },
  { slug: 'atlas-of-my-skies', url: 'https://atlas-of-my-skies.stimmie.dev' },
]

const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  tablet: { width: 834, height: 1112, isMobile: true, hasTouch: true },
  mobile: { width: 390, height: 844, isMobile: true, hasTouch: true },
}

const LEGACY_FALLBACKS = {}

function copyLegacyFallback(slug) {
  const rel = LEGACY_FALLBACKS[slug]
  if (!rel) return

  const src = path.join(root, 'public', rel.replace(/^\//, ''))
  if (!fs.existsSync(src)) return

  const outDir = path.join(root, 'public', 'projects', slug)
  fs.mkdirSync(outDir, { recursive: true })

  for (const name of Object.keys(VIEWPORTS)) {
    fs.copyFileSync(src, path.join(outDir, `${name}.jpg`))
    console.log(`  ↳ fallback ${name} from legacy image`)
  }
}

async function captureProject(page, { slug, url }) {
  const outDir = path.join(root, 'public', 'projects', slug)
  fs.mkdirSync(outDir, { recursive: true })

  console.log(`→ ${slug} (${url})`)
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 45000 })
  await new Promise((r) => setTimeout(r, 1500))

  for (const [name, viewport] of Object.entries(VIEWPORTS)) {
    await page.setViewport(viewport)
    await page.evaluate(() => window.scrollTo(0, 0))
    await new Promise((r) => setTimeout(r, 800))

    const file = path.join(outDir, `${name}.jpg`)
    await page.screenshot({ path: file, type: 'jpeg', quality: 82, fullPage: false })
    console.log(`  ✓ ${name}`)
  }
}

async function main() {
  const filter = process.argv[2]
  const targets = filter ? TARGETS.filter((t) => t.slug === filter) : TARGETS

  if (!targets.length) {
    console.error(`No target for slug: ${filter}`)
    process.exit(1)
  }

  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.setUserAgent(
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  )

  for (const target of targets) {
    try {
      await captureProject(page, target)
    } catch (err) {
      console.error(`  ✗ ${target.slug}:`, err.message)
      copyLegacyFallback(target.slug)
    }
  }

  await browser.close()
  console.log('Done.')
}

main()

// scripts/generate-og.mjs
// Renders scripts/og-template.html with Puppeteer and saves
// the result as public/og-image.jpg (1200×630).
//
// Run: node scripts/generate-og.mjs

import puppeteer from 'puppeteer'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const templatePath = join(__dirname, 'og-template.html')
const outputPath   = join(__dirname, '..', 'public', 'og-image.jpg')

async function generate() {
  const browser = await puppeteer.launch({ headless: 'new' })
  const page    = await browser.newPage()

  // Exact OG dimensions
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 })

  // Load the template via file:// so relative asset paths resolve correctly
  await page.goto(`file://${templatePath}`, { waitUntil: 'networkidle0' })

  // Wait for the custom font to finish rendering (Puppeteer can be fast)
  await page.evaluateHandle('document.fonts.ready')

  await page.screenshot({
    path:    outputPath,
    type:    'jpeg',
    quality: 92,
    clip:    { x: 0, y: 0, width: 1200, height: 630 },
  })

  await browser.close()
  console.log(`✓ OG image written to public/og-image.jpg`)
}

generate().catch((err) => {
  console.error(err)
  process.exit(1)
})

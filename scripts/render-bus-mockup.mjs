/**
 * Render a Sunmi POS + receipt mockup for bus-ticketing-app portfolio previews.
 * Usage: node scripts/render-bus-mockup.mjs
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import puppeteer from 'puppeteer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, '..', 'public', 'projects', 'bus-ticketing-app')

const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      margin: 0;
      background: #f4f2ed;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    .stage {
      display: inline-block;
      padding: 18px 20px 20px;
    }
    .frame {
      position: relative;
      width: 300px;
    }
    .receipt {
      position: absolute;
      top: -92px;
      left: 50%;
      transform: translateX(-50%);
      width: 214px;
      background: #fff;
      color: #111;
      font-family: "Courier New", Courier, monospace;
      font-size: 9px;
      line-height: 1.3;
      padding: 10px 10px 12px;
      box-shadow: 0 4px 16px rgba(26, 23, 18, 0.12);
      clip-path: polygon(0 6px, 4% 0, 8% 6px, 12% 0, 16% 6px, 20% 0, 24% 6px, 28% 0, 32% 6px, 36% 0, 40% 6px, 44% 0, 48% 6px, 52% 0, 56% 6px, 60% 0, 64% 6px, 68% 0, 72% 6px, 76% 0, 80% 6px, 84% 0, 88% 6px, 92% 0, 96% 6px, 100% 0, 100% 100%, 0 100%);
    }
    .receipt .rule { margin: 6px 0; letter-spacing: -0.04em; }
    .shell {
      background: linear-gradient(180deg, #3a3d46 0%, #22242b 55%, #17181d 100%);
      border-radius: 18px;
      padding: 10px 10px 12px;
      box-shadow:
        0 0 0 1px rgba(255, 255, 255, 0.08),
        0 12px 28px rgba(26, 23, 18, 0.18);
    }
    .printer-slot {
      height: 8px;
      margin: 0 auto 8px;
      width: 72%;
      border-radius: 4px;
      background: #0d0e12;
      box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.8);
    }
    .screen {
      background: #f4f6f8;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid #090a0d;
    }
    .status {
      height: 20px;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 8px;
      font-size: 9px;
      color: #444;
      border-bottom: 1px solid #e5e7eb;
    }
    .app {
      padding: 10px;
      background: #fff;
    }
    .app-title {
      text-align: center;
      font-size: 12px;
      font-weight: 700;
      color: #2b8aed;
      margin-bottom: 8px;
    }
    .summary {
      background: rgba(43, 138, 237, 0.1);
      border: 1px solid rgba(43, 138, 237, 0.3);
      border-radius: 8px;
      padding: 10px;
    }
    .summary h2 {
      text-align: center;
      font-size: 13px;
      color: #2b8aed;
      margin-bottom: 8px;
    }
    .row {
      display: flex;
      justify-content: space-between;
      gap: 10px;
      font-size: 10px;
      margin-bottom: 4px;
      color: #333;
    }
    .row span:first-child { font-weight: 600; }
    .row span:last-child { color: #555; text-align: right; }
    .fare {
      margin-top: 6px;
      padding-top: 6px;
      border-top: 1px dashed rgba(43, 138, 237, 0.35);
      font-size: 13px;
      font-weight: 700;
      color: #2b8aed;
    }
    .actions {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      margin-top: 10px;
    }
    .btn {
      border: 0;
      border-radius: 7px;
      padding: 9px 8px;
      font-size: 11px;
      font-weight: 700;
      color: #fff;
      text-align: center;
    }
    .btn--back { background: #6c757d; }
    .btn--print { background: #2b8aed; }
    .brand {
      margin-top: 8px;
      text-align: center;
      font-size: 9px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #666;
    }
    .chin {
      margin: 8px auto 0;
      width: 48px;
      height: 3px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.18);
    }
  </style>
</head>
<body>
  <div class="stage">
    <div class="frame">
      <div class="receipt">
        <div>COMPANY NAME · TIN 123-456-789</div>
        <div class="rule">================================</div>
        <div>Receipt #000123 · 2025-08-14 11:59 PM</div>
        <div>Bus 2001 · Naga-Labo</div>
        <div>From Naga · To Labo</div>
        <div>Passenger: Senior Citizen</div>
        <div>Fare: ₱240.00</div>
        <div class="rule">================================</div>
      </div>
      <div class="shell">
        <div class="printer-slot"></div>
        <div class="screen">
          <div class="status">
            <span>11:59 PM</span>
            <span>Sunmi V2s · 86%</span>
          </div>
          <div class="app">
            <div class="app-title">Bus Ticketing</div>
            <div class="summary">
              <h2>Trip Summary</h2>
              <div class="row"><span>Ticket Number:</span><span>000123</span></div>
              <div class="row"><span>Bus Number:</span><span>2001</span></div>
              <div class="row"><span>Driver:</span><span>Juan Dela Cruz</span></div>
              <div class="row"><span>Conductor:</span><span>Pedro Santos</span></div>
              <div class="row"><span>Route:</span><span>Naga-Labo</span></div>
              <div class="row"><span>Passenger Category:</span><span>Senior Citizen</span></div>
              <div class="row"><span>From Stop:</span><span>Naga</span></div>
              <div class="row"><span>To Stop:</span><span>Labo</span></div>
              <div class="row fare"><span>Fare:</span><span>₱240.00</span></div>
              <div class="actions">
                <div class="btn btn--back">Back</div>
                <div class="btn btn--print">PRINT</div>
              </div>
            </div>
            <div class="brand">Sunmi POS · React Native</div>
          </div>
        </div>
        <div class="chin"></div>
      </div>
    </div>
  </div>
</body>
</html>`

async function main() {
  fs.mkdirSync(outDir, { recursive: true })

  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.setViewport({ width: 360, height: 560, deviceScaleFactor: 2 })
  await page.setContent(HTML, { waitUntil: 'networkidle0' })

  const stage = await page.$('.stage')
  if (!stage) throw new Error('Missing .stage element')

  const box = await stage.boundingBox()
  if (!box) throw new Error('Could not measure mockup bounds')

  const pngPath = path.join(outDir, 'mobile-source.png')
  await page.screenshot({
    path: pngPath,
    type: 'png',
    clip: {
      x: box.x,
      y: box.y,
      width: box.width,
      height: box.height,
    },
  })

  await browser.close()

  fs.copyFileSync(pngPath, path.join(outDir, 'mobile.png'))
  console.log(`Wrote ${pngPath}`)
  console.log(`Wrote ${path.join(outDir, 'mobile.png')}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

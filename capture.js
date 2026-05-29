import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const projects = [
  { slug: 'room-tba', url: 'https://room-tba.stimmie.dev' },
  { slug: 'gradesim', url: 'https://gradesim-five.vercel.app' },
  { slug: 'hearthcraft', url: 'https://hearthcraft.stimmie.dev' },
  { slug: 'atlas-of-my-skies', url: 'https://atlas-of-my-skies.vercel.app' }
];

async function capture() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  const outDir = path.join(process.cwd(), 'public', 'projects');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  for (const proj of projects) {
    try {
      console.log(`Navigating to ${proj.url}...`);
      await page.goto(proj.url, { waitUntil: 'networkidle2', timeout: 30000 });
      
      // Shot 1: Hero/Top
      await page.screenshot({ path: path.join(outDir, `${proj.slug}-1.jpg`), quality: 80, type: 'jpeg' });
      
      // Shot 2: Scroll down a bit
      await page.evaluate(() => window.scrollBy(0, window.innerHeight));
      await new Promise(r => setTimeout(r, 1000));
      await page.screenshot({ path: path.join(outDir, `${proj.slug}-2.jpg`), quality: 80, type: 'jpeg' });
      
      // Shot 3: Scroll more
      await page.evaluate(() => window.scrollBy(0, window.innerHeight));
      await new Promise(r => setTimeout(r, 1000));
      await page.screenshot({ path: path.join(outDir, `${proj.slug}-3.jpg`), quality: 80, type: 'jpeg' });

      console.log(`Captured ${proj.slug}`);
    } catch (e) {
      console.error(`Failed to capture ${proj.slug}:`, e.message);
    }
  }

  await browser.close();
}

capture();

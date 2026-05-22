// Captures the README screenshots of the live site with Playwright.
// Run: npm install && npx playwright install chromium && npm run screenshots
import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const BASE = 'https://third-settler.vercel.app';
const OUT = 'screenshots';

async function main() {
  mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2
  });

  try {
    // 1 - Landing page
    await page.goto(`${BASE}/index.html`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(900);
    await page.screenshot({ path: `${OUT}/landing.png` });
    console.log('  landing.png');

    // 2 - Setup screen with a freshly dealt board
    await page.goto(`${BASE}/play.html`, { waitUntil: 'networkidle' });
    await page.fill('#name1', 'Dad');
    await page.fill('#name2', 'Sam');
    await page.click('#start-btn');
    await page.waitForSelector('#board-svg polygon', { state: 'attached' });
    await page.waitForTimeout(800);
    await page.screenshot({ path: `${OUT}/board.png` });
    console.log('  board.png');

    // 3 - A game in progress
    await page.click('#play-btn');
    await page.waitForTimeout(500);
    await page.click('[data-action="human-roll"]');
    await page.waitForTimeout(1100);
    await page.screenshot({ path: `${OUT}/game.png` });
    console.log('  game.png');

    // 4 - The win screen
    for (let i = 0; i < 10; i++) {
      await page.click('button[data-p="0"][data-d="1"]');
      await page.waitForTimeout(80);
    }
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `${OUT}/win.png` });
    console.log('  win.png');
  } finally {
    await browser.close();
  }
  console.log('screenshots done');
}

main().catch((err) => { console.error(err); process.exit(1); });

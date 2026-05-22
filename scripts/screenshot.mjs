// Captures the README screenshots, and keeps only the ones that truly changed.
//
// Two ideas make this safe to run unattended in CI:
//
//   1. Determinism. The static site/ folder is served locally, Math.random
//      is seeded, and animations are frozen, so identical UI renders the
//      same way every run.
//
//   2. Perceptual diff. A freshly captured shot replaces the committed one
//      only if more than DIFF_RATIO of pixels genuinely moved. Byte-identical
//      screenshots are a fantasy (blur filters and anti-aliasing jitter at
//      the sub-pixel level), so comparing bytes would commit noise forever.
//      Comparing *pixels* commits only real visual changes.
//
// Run: npm install && npx playwright install chromium && npm run screenshots

import { chromium } from 'playwright';
import { createServer } from 'http';
import { mkdirSync, readFileSync, writeFileSync, existsSync, statSync } from 'fs';
import { join, extname, resolve } from 'path';
import pixelmatch from 'pixelmatch';
import pngjs from 'pngjs';

const { PNG } = pngjs;

const SITE_DIR = 'site';
const OUT_DIR = 'screenshots';
const VIEWPORT = { width: 390, height: 844 };
const DIFF_RATIO = 0.0015; // rewrite a screenshot only if >0.15% of pixels moved

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.json': 'application/json',
  '.webmanifest': 'application/manifest+json'
};

// A tiny static server for site/, so screenshots never depend on a live
// deploy and always reflect the exact committed code. Resolves { server, port }.
function serveSite() {
  const root = resolve(SITE_DIR);
  return new Promise((ok) => {
    const server = createServer((req, res) => {
      let path = decodeURIComponent(req.url.split('?')[0]);
      if (path.endsWith('/')) path += 'index.html';
      const file = resolve(join(SITE_DIR, path));
      if (!file.startsWith(root) || !existsSync(file) || !statSync(file).isFile()) {
        res.writeHead(404);
        res.end('not found');
        return;
      }
      res.writeHead(200, { 'Content-Type': MIME[extname(file)] || 'application/octet-stream' });
      res.end(readFileSync(file));
    });
    server.listen(0, () => ok({ server, port: server.address().port }));
  });
}

// mulberry32 - a tiny seeded PRNG. Injected to replace Math.random so the
// dealt board, the dice rolls and the confetti are identical every run.
const SEED_SCRIPT = `(function () {
  var s = 0x9e3779b9;
  Math.random = function () {
    s = (s + 0x6D2B79F5) | 0;
    var t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
})();`;

// Replace the committed screenshot only if it changed meaningfully.
function saveIfChanged(name, buf) {
  const dest = `${OUT_DIR}/${name}.png`;
  if (!existsSync(dest)) {
    writeFileSync(dest, buf);
    return 'new';
  }
  const fresh = PNG.sync.read(buf);
  const prev = PNG.sync.read(readFileSync(dest));
  if (fresh.width !== prev.width || fresh.height !== prev.height) {
    writeFileSync(dest, buf);
    return 'resized';
  }
  const moved = pixelmatch(prev.data, fresh.data, null, fresh.width, fresh.height,
    { threshold: 0.1 });
  const ratio = moved / (fresh.width * fresh.height);
  if (ratio > DIFF_RATIO) {
    writeFileSync(dest, buf);
    return `updated (${(ratio * 100).toFixed(2)}% changed)`;
  }
  return `unchanged (${(ratio * 100).toFixed(3)}% jitter)`;
}

async function shoot(page, name, opts) {
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(250);
  const buf = await page.screenshot(opts || {});
  console.log(`  ${name}.png  -  ${saveIfChanged(name, buf)}`);
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  const { server, port } = await serveSite();
  const base = `http://localhost:${port}`;
  console.log(`serving ${SITE_DIR}/ at ${base}`);

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: VIEWPORT, deviceScaleFactor: 2 });
  await page.addInitScript(SEED_SCRIPT);

  try {
    // 1 - Landing page. Force scroll-reveal elements visible and drop the
    //     install button (its 'beforeinstallprompt' timing is unstable).
    await page.goto(`${base}/index.html`, { waitUntil: 'networkidle' });
    await page.evaluate(() => {
      document.querySelectorAll('.reveal').forEach((e) => e.classList.add('in'));
      const ib = document.getElementById('installBtn');
      if (ib) ib.remove();
    });
    await shoot(page, 'landing', { animations: 'disabled' });

    // 2 - Setup screen with a freshly dealt board
    await page.goto(`${base}/play.html`, { waitUntil: 'networkidle' });
    await page.fill('#name1', 'Dad');
    await page.fill('#name2', 'Sam');
    await page.click('#start-btn');
    await page.waitForSelector('#board-svg polygon', { state: 'attached' });
    await shoot(page, 'board', { animations: 'disabled' });

    // 3 - A game in progress
    await page.click('#play-btn');
    await page.click('[data-action="human-roll"]');
    await page.waitForTimeout(900);
    await shoot(page, 'game', { animations: 'disabled' });

    // 4 - The win screen, confetti frozen at a fixed frame
    for (let i = 0; i < 10; i++) {
      await page.click('button[data-p="0"][data-d="1"]');
    }
    await page.waitForSelector('.confetti');
    await page.evaluate(() => {
      document.querySelectorAll('.confetti').forEach((el) => {
        el.getAnimations().forEach((a) => { a.currentTime = 1400; a.pause(); });
      });
    });
    await shoot(page, 'win');
  } finally {
    await browser.close();
    server.close();
  }
  console.log('screenshots done');
}

main().catch((err) => { console.error(err); process.exit(1); });

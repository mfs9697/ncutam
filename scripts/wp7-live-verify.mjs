#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const sourceRoot = process.cwd();
const sourceOrigin = 'https://mfs9697.github.io';
const sourceBase = '/ncutam';
const targetOrigin = 'https://inmech.kyiv.ua';
const mapPath = path.join(sourceRoot, 'migration', 'legacy-routes.yaml');

function fail(message) {
  throw new Error(`WP7 live verification failed: ${message}`);
}

function parseQuotedValue(line, key) {
  const match = line.match(new RegExp(`^\\s*${key}:\\s*"([^"]*)"\\s*$`));
  return match?.[1] ?? null;
}

function parseEntries(yaml) {
  const lines = yaml.split(/\r?\n/);
  const entries = [];
  let section = null;
  let current = null;

  const flush = () => {
    if (current?.legacy && current?.target) entries.push({ ...current, section });
    current = null;
  };

  for (const line of lines) {
    if (/^routes:\s*$/.test(line)) {
      flush();
      section = 'routes';
      continue;
    }
    if (/^archiveAliases:\s*$/.test(line)) {
      flush();
      section = 'archiveAliases';
      continue;
    }
    if (/^nonCanonicalArtifacts:\s*$/.test(line)) {
      flush();
      section = null;
      continue;
    }
    if (!section) continue;

    const legacy = parseQuotedValue(line.replace(/^\s*-\s*/, ''), 'legacy');
    if (legacy !== null && /^\s*-\s+legacy:/.test(line)) {
      flush();
      current = { legacy };
      continue;
    }
    if (!current) continue;
    const target = parseQuotedValue(line, 'target');
    if (target !== null) current.target = target;
  }
  flush();
  return entries;
}

function sameDestination(actualHref, expectedHref) {
  const actual = new URL(actualHref);
  const expected = new URL(expectedHref);
  return actual.origin === expected.origin &&
    actual.pathname === expected.pathname &&
    actual.search === expected.search &&
    actual.hash === expected.hash;
}

const entries = parseEntries(fs.readFileSync(mapPath, 'utf8'));
if (entries.length !== 29) fail(`expected 29 mapped legacy URLs, found ${entries.length}`);

const browser = await chromium.launch({ headless: true });
try {
  const context = await browser.newContext();
  const page = await context.newPage();

  for (const [index, entry] of entries.entries()) {
    const oldUrl = `${sourceOrigin}${sourceBase}${entry.legacy === '/' ? '/' : entry.legacy}`;
    const expectedUrl = `${targetOrigin}${entry.target}`;

    await page.goto(oldUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForURL((url) => sameDestination(url.href, expectedUrl), { timeout: 20000 });
    await page.waitForLoadState('domcontentloaded');

    if (!sameDestination(page.url(), expectedUrl)) {
      fail(`${entry.legacy} ended at ${page.url()} instead of ${expectedUrl}`);
    }

    const h1 = (await page.locator('h1').first().textContent())?.trim();
    if (!h1) fail(`${entry.legacy} reached ${expectedUrl}, but the target page has no visible h1 text`);

    console.log(`[${index + 1}/${entries.length}] ${entry.legacy} -> ${page.url()}`);
  }

  const unknownPath = `/__wp7-unknown-check-${Date.now()}__/`;
  const unknownUrl = `${sourceOrigin}${sourceBase}${unknownPath}`;
  const response = await page.goto(unknownUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
  if (!response || response.status() !== 404) {
    fail(`unknown legacy URL should return HTTP 404, received ${response?.status() ?? 'no response'}`);
  }
  if (new URL(page.url()).origin !== sourceOrigin) {
    fail(`unknown legacy URL unexpectedly left the legacy host: ${page.url()}`);
  }
  const fallbackHref = await page.locator(`a[href="${targetOrigin}/ncutam/"]`).first().getAttribute('href');
  if (fallbackHref !== `${targetOrigin}/ncutam/`) {
    fail('moved-site 404 is missing the canonical NCUTAM fallback link');
  }

  console.log('Unknown legacy URL correctly returns the moved-site 404 with the NCUTAM fallback link.');
  console.log(`WP7 live verification passed for all ${entries.length} mapped legacy URLs.`);
} finally {
  await browser.close();
}

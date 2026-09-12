#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const sourceRoot = path.resolve(process.cwd());
const mapPath = path.join(sourceRoot, 'migration', 'legacy-routes.yaml');
const args = new Set(process.argv.slice(2));
const targetDirArg = process.argv.find((arg) => arg.startsWith('--target-dir='));
const targetDir = targetDirArg ? path.resolve(targetDirArg.slice('--target-dir='.length)) : null;
const droppedArtifacts = [
  path.join(sourceRoot, 'authors'),
  path.join(sourceRoot, 'page'),
  path.join(sourceRoot, 'feed.xml'),
  path.join(sourceRoot, 'feed.json')
];

function fail(message) {
  console.error(`WP7 redirect check failed: ${message}`);
  process.exit(1);
}

function parseQuotedValue(line, key) {
  const match = line.match(new RegExp(`^\\s*${key}:\\s*"([^"]*)"\\s*$`));
  return match?.[1] ?? null;
}

function parseRedirectEntries(yaml) {
  const lines = yaml.split(/\r?\n/);
  const entries = [];
  let section = null;
  let current = null;

  const flush = () => {
    if (current?.legacy && current?.target) {
      entries.push({ ...current, section });
    }
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
    const targetEn = parseQuotedValue(line, 'targetEn');
    if (targetEn !== null) current.targetEn = targetEn;
    const action = line.match(/^\s*action:\s*([a-z-]+)\s*$/)?.[1];
    if (action) current.action = action;
  }
  flush();
  return entries;
}

function sourceFileForLegacy(legacy) {
  if (legacy === '/') return path.join(sourceRoot, 'index.html');
  const relative = legacy.replace(/^\//, '');
  if (relative.endsWith('/')) return path.join(sourceRoot, relative, 'index.html');
  return path.join(sourceRoot, relative);
}

function targetFileForPath(targetPath) {
  if (!targetDir) return null;
  const withoutHash = targetPath.split('#')[0].split('?')[0];
  const relative = withoutHash.replace(/^\//, '');
  if (!relative || withoutHash.endsWith('/')) return path.join(targetDir, relative, 'index.html');
  return path.join(targetDir, relative);
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function redirectHtml(targetPath) {
  const target = `https://inmech.kyiv.ua${targetPath}`;
  const escaped = escapeHtml(target);
  return `<!doctype html>\n<html lang="uk">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <meta name="robots" content="noindex,follow">\n  <meta http-equiv="refresh" content="0; url=${escaped}">\n  <link rel="canonical" href="${escaped}">\n  <title>Сторінку перенесено — НКУТПМ</title>\n  <script>window.location.replace(${JSON.stringify(target)});</script>\n</head>\n<body>\n  <main>\n    <h1>Сторінку перенесено</h1>\n    <p>Вебсайт Національного комітету України з теоретичної і прикладної механіки перенесено на сайт Інституту механіки ім. С. П. Тимошенка НАН України.</p>\n    <p><a href="${escaped}">Перейти до актуальної сторінки</a></p>\n  </main>\n</body>\n</html>\n`;
}

function moved404Html() {
  const target = 'https://inmech.kyiv.ua/ncutam/';
  return `<!doctype html>\n<html lang="uk">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <meta name="robots" content="noindex,follow">\n  <title>Сторінку не знайдено — НКУТПМ</title>\n</head>\n<body>\n  <main>\n    <h1>Сторінку не знайдено</h1>\n    <p>Архівний сайт НКУТПМ перенесено. Скористайтеся актуальним розділом Комітету на сайті Інституту механіки.</p>\n    <p><a href="${target}">Перейти до розділу НКУТПМ</a></p>\n  </main>\n</body>\n</html>\n`;
}

if (!fs.existsSync(mapPath)) fail(`missing route map ${mapPath}`);
const entries = parseRedirectEntries(fs.readFileSync(mapPath, 'utf8'));
const canonical = entries.filter((entry) => entry.section === 'routes');
const aliases = entries.filter((entry) => entry.section === 'archiveAliases');

if (canonical.length !== 26) fail(`expected 26 canonical routes, found ${canonical.length}`);
if (aliases.length !== 3) fail(`expected 3 archive aliases, found ${aliases.length}`);

const seenLegacy = new Set();
for (const entry of entries) {
  if (seenLegacy.has(entry.legacy)) fail(`duplicate legacy path ${entry.legacy}`);
  seenLegacy.add(entry.legacy);
  if (!entry.target.startsWith('/')) fail(`target for ${entry.legacy} must be root-relative`);
  if (entry.targetEn && !entry.targetEn.startsWith('/en/')) fail(`English target for ${entry.legacy} must begin /en/`);

  const sourceFile = sourceFileForLegacy(entry.legacy);
  if (!fs.existsSync(sourceFile)) fail(`legacy source path is missing: ${entry.legacy} -> ${sourceFile}`);

  if (targetDir) {
    const targetFile = targetFileForPath(entry.target);
    if (!fs.existsSync(targetFile)) fail(`target route is missing from built site: ${entry.target} -> ${targetFile}`);
    if (entry.targetEn) {
      const targetEnFile = targetFileForPath(entry.targetEn);
      if (!fs.existsSync(targetEnFile)) fail(`English target route is missing from built site: ${entry.targetEn} -> ${targetEnFile}`);
    }
  }
}

if (args.has('--apply')) {
  for (const entry of entries) {
    const sourceFile = sourceFileForLegacy(entry.legacy);
    fs.mkdirSync(path.dirname(sourceFile), { recursive: true });
    fs.writeFileSync(sourceFile, redirectHtml(entry.target));
  }
  fs.writeFileSync(path.join(sourceRoot, '404.html'), moved404Html());
  for (const artifact of droppedArtifacts) {
    fs.rmSync(artifact, { recursive: true, force: true });
  }
  console.log(`Generated ${entries.length} legacy redirect stubs plus a moved-site 404 page.`);
  console.log('Removed noncanonical Publii author/pagination/feed artifacts listed for drop in the migration map.');
}

if (args.has('--check-generated')) {
  for (const entry of entries) {
    const sourceFile = sourceFileForLegacy(entry.legacy);
    const html = fs.readFileSync(sourceFile, 'utf8');
    const absoluteTarget = `https://inmech.kyiv.ua${entry.target}`;
    if (!html.includes('meta http-equiv="refresh"')) fail(`${entry.legacy} is not a redirect stub`);
    if (!html.includes(`rel="canonical" href="${escapeHtml(absoluteTarget)}"`)) fail(`${entry.legacy} has the wrong canonical target`);
    if (!html.includes('name="robots" content="noindex,follow"')) fail(`${entry.legacy} must be noindex,follow`);
  }
  for (const artifact of droppedArtifacts) {
    if (fs.existsSync(artifact)) fail(`noncanonical artifact should be absent after cutover preparation: ${artifact}`);
  }
  console.log(`Verified ${entries.length} generated legacy redirect stubs and noncanonical artifact cleanup.`);
}

console.log(`WP7 route map is valid: ${canonical.length} canonical routes + ${aliases.length} archive aliases.`);
if (targetDir) console.log(`All mapped Ukrainian and English targets exist in ${targetDir}.`);

# WP7 — Redirect and Cutover Continuity Plan

**Status:** prepared and validated on `feat/wp7-redirect-cutover`; not yet activated.

## Purpose

Preserve the useful legacy NCUTAM URLs from the Publii/GitHub Pages site while moving the authoritative public content to the Institute of Mechanics Astro site at `https://inmech.kyiv.ua/ncutam/`.

The machine-readable source of truth remains `migration/legacy-routes.yaml`.

## Hosting constraint

The legacy site is a static GitHub Pages export whose canonical base is `https://mfs9697.github.io/ncutam/`. GitHub Pages does not provide repository-controlled arbitrary HTTP 301/308 rules for these page paths.

For that reason WP7 uses static redirect stubs for all mapped legacy pages:

- immediate `meta refresh` to the mapped target;
- JavaScript `window.location.replace(...)` for normal browsers;
- `rel="canonical"` pointing to the new Inmech URL;
- `robots=noindex,follow` to prevent the old page from remaining indexed;
- a visible fallback link if automatic forwarding is unavailable.

This preserves user navigation and search-engine canonicalization, but the existing mapped legacy page itself still returns HTTP 200 rather than a true server-side 301/308. This limitation is intrinsic to the current GitHub Pages hosting arrangement.

## Coverage

The generator `scripts/wp7-redirects.mjs` enforces the migration map and currently covers:

- 26 canonical legacy routes;
- 3 archive aliases (`/novini/`, `/m/`, `/konferenciyi/`);
- one moved-site `404.html` with a link to the current NCUTAM landing page.

For every mapped record, the workflow also verifies that both the Ukrainian target and the paired English target declared in the migration map exist in a fresh build of `mfs9697/inmech-site` branch `feat/ncutam-wp6-infrastructure`.

The migration-map artifacts explicitly classified as `drop` are removed from the cutover branch:

- Publii author archives under `/authors/**`;
- Publii pagination artifacts under `/page/**` where present;
- obsolete `feed.xml` and `feed.json`.

The repository history remains the archival record of the original Publii export, so deleting these generated artifacts from the active Pages tree does not destroy their historical source.

## Automated preparation

Workflow: `.github/workflows/wp7-prepare-cutover.yml`

The workflow:

1. checks out the legacy NCUTAM branch;
2. checks out the target Inmech NCUTAM feature branch;
3. builds the Astro target site;
4. validates all mapped Ukrainian and English destinations against the generated `dist` tree;
5. regenerates every legacy redirect stub from `migration/legacy-routes.yaml`;
6. validates canonical/noindex/redirect markup;
7. removes migration-map artifacts classified as `drop`;
8. commits any prepared changes back to `feat/wp7-redirect-cutover`.

The redirect branch is therefore reproducible from the route map rather than maintained as 29 independent hand-edited pages.

## Activation order

The two repositories must be cut over in this order.

### 1. Activate the new site first

- merge `mfs9697/inmech-site` PR #114 only after its normal repository checks are green;
- allow the Inmech deployment workflow to publish `main`;
- verify the deployment marker and normal smoke checks;
- verify representative NCUTAM public URLs, including:
  - `/ncutam/`;
  - `/en/ncutam/`;
  - `/ncutam/members/`;
  - `/ncutam/governance/`;
  - `/ncutam/documents/`;
  - `/ncutam/activity/meetings/2025-11-11/`;
  - `/news/2026/2026-03-19-iutam-committee/`.

### 2. Activate legacy continuity second

Only after the target deployment is confirmed:

- merge the WP7 redirect PR from `feat/wp7-redirect-cutover` into `mfs9697/ncutam:main`;
- allow GitHub Pages to publish the updated legacy tree;
- verify the old root and a representative sample of mapped pages forward to their exact new targets;
- verify the three archive aliases;
- verify an unknown legacy URL returns the moved-site 404 with a usable link to `/ncutam/`.

Do **not** merge the redirect branch before the target NCUTAM section is publicly deployed.

## Post-cutover verification

After both deployments are live, check at least:

- old home → new NCUTAM home;
- old `sklad.html` → current members;
- old `pamyat.html` → in memoriam;
- old `dokumenti.html` → documents;
- old `zviti.html` → reports;
- old 2025 General Meeting page → exact 2025 meeting detail;
- old Paton Bridge media pages → canonical initiative page;
- old IUTAM Early Career article → canonical shared Inmech news detail;
- `/novini/`, `/m/`, `/konferenciyi/` → the correct new archives.

Because the source host uses client-side/static redirects rather than HTTP 301/308, verification must confirm the final browser URL and the target content, not merely the first response status.

## Rollback

If the target deployment has a material defect after cutover:

1. revert the NCUTAM cutover commit on `mfs9697/ncutam:main` to restore the original Publii pages from Git history;
2. correct/redeploy the Inmech target;
3. regenerate and reactivate redirects only after the target is healthy.

No legacy content is lost because the pre-cutover Publii export remains recoverable from repository history.

## Completion criterion

WP7 is complete only when:

- PR #114 is deployed successfully to `inmech.kyiv.ua`;
- the prepared redirect branch is merged to the legacy repository;
- mapped old URLs have been verified against the live target;
- the legacy root and representative canonical/archive URLs forward correctly;
- the fallback 404 behaves as documented.

# WP7 — Redirect and Cutover Continuity

**Status:** COMPLETE and live as of 2026-09-13.

## Purpose

Preserve useful legacy NCUTAM URLs from the Publii/GitHub Pages site while making the Institute of Mechanics Astro site at `https://inmech.kyiv.ua/ncutam/` the authoritative public location.

The machine-readable source of truth remains `migration/legacy-routes.yaml`.

## Live cutover record

The guarded two-stage cutover was completed on 2026-09-13 in the prescribed order.

### 1. Target Inmech site

- `mfs9697/inmech-site` PR #114 was marked ready and merged.
- Production merge commit: `8be9103cd053e13e683c6e79d3e766822306f7b4`.
- Deployment workflow run: `34742764612` (`Validate and deploy Astro site`).
- Repository validation, rsync deployment, deployment-marker verification, and the NCUTAM production smoke checks all completed successfully.

The production smoke set includes the Ukrainian and English NCUTAM landing pages plus representative members, documents, activity and shared-news routes.

### 2. Legacy continuity layer

- `mfs9697/ncutam` PR #1 was marked ready and merged only after the target deployment was green.
- Continuity merge commit: `28b6ccd7217512c720b6fa6c9341cbd2a841e2f6`.
- GitHub Pages deployment run: `34742841796` (`pages build and deployment`).
- Build, status reporting and Pages deployment all completed successfully.

### 3. Exhaustive live verification

- Live verifier workflow: `WP7 verify live legacy redirects`.
- Verification run: `34743012863`.
- Verification job: `103685812441`.
- Result: **success**.

Headless Chromium opened all **29 mapped legacy URLs** (26 canonical routes + 3 archive aliases) and required the final browser origin, path, query and fragment to match the exact mapped Inmech destination. All 29 passed.

The verifier also opened a deliberately unknown legacy URL and confirmed that it remained on the legacy host, returned HTTP 404, and exposed the fallback link to the canonical NCUTAM landing page. That check passed as well.

## Hosting constraint

The legacy site is a static GitHub Pages export whose canonical base is `https://mfs9697.github.io/ncutam/`. GitHub Pages does not provide repository-controlled arbitrary HTTP 301/308 rules for these existing page paths.

WP7 therefore uses static compatibility stubs for mapped legacy pages:

- immediate `meta refresh`;
- JavaScript `window.location.replace(...)` for normal browsers;
- `rel="canonical"` pointing to the new Inmech URL;
- `robots=noindex,follow`;
- a visible fallback link if automatic forwarding is unavailable.

The mapped legacy file itself consequently returns HTTP 200 before browser forwarding rather than a server-side 301/308. This is an explicit infrastructure limitation, not an unverified assumption.

## Coverage

The generator `scripts/wp7-redirects.mjs` and `migration/legacy-routes.yaml` cover:

- 26 canonical legacy routes;
- 3 archive aliases: `/novini/`, `/m/`, `/konferenciyi/`;
- a moved-site `404.html` with a link to the current NCUTAM landing page.

For every mapped record, pre-cutover validation required both the Ukrainian target and paired English target to exist in a fresh Inmech build. When a target contained a URL fragment, the corresponding `id` also had to exist in built HTML.

That fragment-level validation caught and corrected one real mismatch before activation: `/kontakti.html` still pointed to `#contacts` after the final WP6 accessibility sweep renamed the NCUTAM contact section to `#ncutam-contacts`. The authoritative map now uses `/ncutam/#ncutam-contacts` and `/en/ncutam/#ncutam-contacts`.

The Publii artifacts classified as `drop` were removed from the active compatibility tree:

- `/authors/**`;
- pagination artifacts where present;
- `feed.xml`;
- `feed.json`.

The repository history remains the archival record of the original Publii export.

## Automation

Preparation workflow: `.github/workflows/wp7-prepare-cutover.yml`.

It builds the target site, validates all mapped routes and fragments, regenerates the compatibility stubs from the route map, validates canonical/noindex markup, removes DROP artifacts and keeps the prepared branch reproducible.

Live verifier: `scripts/wp7-live-verify.mjs` with `.github/workflows/wp7-live-verify.yml`.

The verifier uses Chromium rather than relying on the first HTTP response, because the GitHub Pages compatibility layer performs client-side/static forwarding. Manual dispatch remains available for future continuity audits.

## Rollback

If a material target defect is discovered later:

1. restore the original legacy Publii pages by reverting the cutover changes in `mfs9697/ncutam` from repository history;
2. correct and redeploy the Inmech target;
3. reactivate the compatibility stubs only after the target is healthy.

No original legacy content was destroyed; the pre-cutover export remains recoverable from Git history.

## Completion criterion — satisfied

WP7 required all of the following and all are now satisfied:

- Inmech PR #114 merged and deployed successfully;
- deployment marker and NCUTAM production smoke checks green;
- legacy PR #1 merged only after the target passed;
- GitHub Pages compatibility deployment green;
- all 29 mapped legacy URLs passed exact-destination Chromium verification;
- unknown legacy URL passed the moved-site HTTP-404/fallback check.

WP7 is therefore closed as **COMPLETE**. The next migration work package is WP9: document the ongoing NCUTAM content-maintenance workflow, followed by the final archival/freeze housekeeping in WP10.

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

For every mapped record, the preparation workflow verifies that both the Ukrainian target and the paired English target declared in the migration map exist in a fresh build of `mfs9697/inmech-site` branch `feat/ncutam-wp6-infrastructure`. When a target contains a URL fragment, the validator additionally requires the corresponding `id` to exist in the built target HTML.

This fragment-level check caught and corrected one real pre-cutover mismatch: the legacy `/kontakti.html` mapping still referenced the old `#contacts` fragment after the final WP6 accessibility sweep had renamed the NCUTAM contact section to `#ncutam-contacts`. The authoritative route map now points to `/ncutam/#ncutam-contacts` and `/en/ncutam/#ncutam-contacts`.

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
3. syntax-checks both WP7 Node scripts;
4. builds the Astro target site;
5. validates all mapped Ukrainian and English destination routes and fragments against the generated `dist` tree;
6. regenerates every legacy redirect stub from `migration/legacy-routes.yaml`;
7. validates canonical/noindex/redirect markup;
8. removes migration-map artifacts classified as `drop`;
9. commits any prepared changes back to `feat/wp7-redirect-cutover`.

The redirect branch is therefore reproducible from the route map rather than maintained as 29 independent hand-edited pages.

## Activation order

The two repositories must be cut over in this order.

### 1. Activate the new site first

- merge `mfs9697/inmech-site` PR #114 only after its normal repository checks are green;
- allow the Inmech deployment workflow to publish `main`;
- require the deployment marker to match the merged commit;
- require the production smoke checks to pass for the NCUTAM landing pages and representative members/documents/activity/news routes, in addition to the existing global site smoke checks.

The production workflow now checks at least:

- `/ncutam/`;
- `/en/ncutam/`;
- `/ncutam/members/`;
- `/ncutam/documents/`;
- `/ncutam/activity/meetings/2025-11-11/`;
- `/news/2026/2026-03-19-iutam-committee/`.

### 2. Activate legacy continuity second

Only after the target deployment is confirmed:

- merge draft PR `mfs9697/ncutam#1` from `feat/wp7-redirect-cutover` into `main`;
- allow GitHub Pages to publish the updated legacy tree;
- run the manual workflow `.github/workflows/wp7-live-verify.yml`;
- do not declare WP7 complete until that live verifier is green.

Do **not** merge the redirect branch before the target NCUTAM section is publicly deployed.

## Exhaustive post-cutover verification

Manual workflow: `.github/workflows/wp7-live-verify.yml`

Verifier: `scripts/wp7-live-verify.mjs`

After both deployments are live, the verifier launches Chromium and reads the same `migration/legacy-routes.yaml` source of truth. It then:

1. opens every one of the 29 mapped legacy URLs on `https://mfs9697.github.io/ncutam/`;
2. waits for the static/client-side forwarding to complete;
3. requires the final browser origin, path, query and fragment to match the exact mapped `https://inmech.kyiv.ua/...` target;
4. requires the reached target page to contain visible `h1` text, guarding against empty/error destinations;
5. opens a deliberately unknown legacy URL and requires HTTP 404 on the legacy host;
6. requires that moved-site 404 to contain the fallback link to `https://inmech.kyiv.ua/ncutam/`.

Because the source host uses client-side/static redirects rather than HTTP 301/308, this browser-level verification is the authoritative post-cutover continuity test; checking only the first HTTP response would be insufficient.

## Rollback

If the target deployment has a material defect after cutover:

1. revert the NCUTAM cutover commit on `mfs9697/ncutam:main` to restore the original Publii pages from Git history;
2. correct/redeploy the Inmech target;
3. regenerate and reactivate redirects only after the target is healthy.

No legacy content is lost because the pre-cutover Publii export remains recoverable from repository history.

## Completion criterion

WP7 is complete only when:

- PR #114 is deployed successfully to `inmech.kyiv.ua` with the deployment marker and NCUTAM production smoke checks green;
- draft PR `mfs9697/ncutam#1` is then merged to activate the legacy continuity layer;
- the exhaustive all-29 Chromium live verifier passes;
- the unknown-URL moved-site 404 check passes.

# WP10 — Archive and Freeze

**Status:** prepared for final merge on 2026-09-13.

## Purpose

Close the NCUTAM website-migration project without weakening the live legacy-URL compatibility layer or losing the original Publii source material needed for audit or rollback.

WP10 separates three things that had previously lived together in `mfs9697/ncutam`:

1. the authoritative current public site — now `mfs9697/inmech-site`;
2. the live legacy compatibility layer — retained on `mfs9697/ncutam:main`;
3. the historical pre-cutover Publii export — frozen on a dedicated archival branch.

## Final repository roles

### `mfs9697/inmech-site`

This is the only authoritative repository for normal NCUTAM public-content maintenance after cutover. The operating procedure is `docs/NCUTAM_MAINTENANCE.md` in that repository.

### `mfs9697/ncutam:main`

This remains operational only for:

- legacy URL forwarding on GitHub Pages;
- the route map `migration/legacy-routes.yaml`;
- `scripts/wp7-redirects.mjs`;
- `scripts/wp7-live-verify.mjs` and its manual workflow;
- migration/cutover/freeze documentation;
- Committee task/project material unrelated to the public website.

It is not a second content-management source.

### Archival Publii branch

The complete pre-cutover export is pinned at:

- branch: `archive/publii-export-pre-cutover-2026-09-13`;
- commit: `8643b62ae0f1be9714c0edb741f9b17b5c9a79e8`.

This snapshot predates activation of the redirect stubs and contains the recoverable original Publii pages, theme/runtime files, image derivatives and historical media layout. It is an archive, not a publishing branch.

## Main-branch pruning

WP10 removes only files with no continuing operational role in the compatibility site:

- `assets/` — Publii CSS, JavaScript, font and SVG runtime/theme files;
- `media/posts/` — Publii-generated post gallery trees and thumbnail derivatives;
- `media/website/` — Publii website-header image derivatives;
- `sitemap.xml` and `sitemap.xsl` — stale sitemap output describing the former active site;
- `.github/workflows/wp7-prepare-cutover.yml` — obsolete preparation automation tied to the completed WP6/WP7 feature branches.

The redirect stubs are standalone HTML and do not depend on the removed runtime assets.

Selected files under `media/files/` and historical top-level PDF paths are intentionally retained on `main` as frozen compatibility downloads because direct external links may exist independently of the mapped HTML routes. These files must not be treated as the authoritative document archive; authoritative PDFs are the byte-pinned files in `mfs9697/inmech-site`.

One known obsolete legacy binary, the old copy of NASU Resolution No. 26/2024 (`media/files/Постанова Президії НАНУ 26 від 24.01.24.pdf`), is removed from the active compatibility tree rather than continuing to publish a non-authoritative version. The verified current copy is published from the Inmech document archive.

## Search-engine behavior

The old Publii sitemap is removed. `robots.txt` no longer advertises it. Crawlers remain allowed to visit the compatibility pages so they can observe their `noindex,follow` and canonical metadata and follow the current Inmech destinations.

A `.nojekyll` marker is added because the compatibility site is now plain static HTML/files and does not require Jekyll transformation.

## Redirect continuity retained

WP10 does **not** change the continuity contract established in WP7:

- 26 canonical legacy routes;
- 3 archive aliases;
- moved-site `404.html` for unknown paths;
- `migration/legacy-routes.yaml` remains the single mapping source;
- `scripts/wp7-redirects.mjs` remains the reproducible generator/validator;
- `scripts/wp7-live-verify.mjs` remains the exhaustive Chromium verifier.

The live verifier is retained for manual continuity audits after any future mapping change.

## Rollback

If the compatibility layer ever needs emergency restoration of the original Publii site, the archival branch is the explicit restore point. Do not reconstruct the old site from individual files on `main`.

For a website rollback:

1. identify the reason the current Inmech target cannot serve the migrated content;
2. use `archive/publii-export-pre-cutover-2026-09-13` as the full legacy source snapshot;
3. correct and redeploy the Inmech target;
4. restore/update the compatibility layer only after the target is healthy;
5. rerun the live redirect verifier.

## Completion criteria

WP10 is complete only when all of the following hold after merge:

- archival Publii branch exists and resolves to the documented pre-cutover commit;
- obsolete preparation workflow and stale Publii runtime/sitemap artifacts are absent from `main`;
- live redirect stubs, route map, generator, verifier, cutover record and 404 remain present;
- GitHub Pages deploys the frozen compatibility tree successfully;
- the live Chromium verifier still passes all 29 mapped URLs plus the unknown-URL 404 check;
- `README.md` and `TASKS.md` state the final repository roles and migration completion status.

After those checks, the website-migration project (WP1–WP10) can be considered closed. Ongoing Committee website work proceeds under the maintenance workflow in `mfs9697/inmech-site`, not as further migration work here.

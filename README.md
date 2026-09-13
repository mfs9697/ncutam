# NCUTAM — legacy compatibility and Committee workspace

This repository now has two deliberately separate roles for the **National Committee of Ukraine for Theoretical and Applied Mechanics (NCUTAM)**.

## Public website

The authoritative bilingual NCUTAM website is maintained in `mfs9697/inmech-site` and published under:

- `https://inmech.kyiv.ua/ncutam/`
- `https://inmech.kyiv.ua/en/ncutam/`

Normal public-content changes — news, members, governance, activities, documents, reports, media records, evergreen text and galleries — belong in `mfs9697/inmech-site`. See `docs/NCUTAM_MAINTENANCE.md` in that repository.

Do **not** update Committee public content in this repository.

## Role of this repository after migration

`mfs9697/ncutam` is retained for:

- the GitHub Pages compatibility layer for legacy Publii URLs;
- the authoritative legacy-to-current route map at `migration/legacy-routes.yaml`;
- the redirect generator and live browser verifier in `scripts/`;
- migration/cutover documentation and rollback evidence in `docs/`;
- the Committee task register and non-website Committee project work, including the NASU analytical note.

The compatibility pages are `noindex,follow` forwarding stubs. They are not an independently maintained website.

## Frozen Publii archive

The complete pre-cutover Publii export is pinned on the read-only archival branch:

`archive/publii-export-pre-cutover-2026-09-13`

Archive commit: `8643b62ae0f1be9714c0edb741f9b17b5c9a79e8`.

That branch preserves the original pages, theme/runtime assets, responsive image derivatives and historical file layout. Do not use it as a publishing branch.

`main` intentionally omits Publii theme/runtime assets and generated responsive-media trees that are no longer required by the compatibility stubs. Selected legacy downloadable files remain on `main` only to avoid unnecessary breakage of direct historical download links; they are frozen and are not authoritative copies.

## Redirect maintenance

If a current Inmech canonical route ever changes:

1. update and deploy `mfs9697/inmech-site` first;
2. verify the new production target;
3. update `migration/legacy-routes.yaml` here;
4. regenerate/commit the compatibility stubs with `scripts/wp7-redirects.mjs`;
5. allow GitHub Pages to deploy;
6. run the `Legacy NCUTAM redirect continuity` workflow manually and require all mapped URLs to pass.

The detailed cutover and rollback record is in `docs/WP7_REDIRECT_CUTOVER.md`; the final freeze record is in `docs/WP10_ARCHIVE_FREEZE.md`.

## Committee work outside the website

The repository continues to track Committee-level tasks and project evidence in `TASKS.md`. Cross-cutting personal/institutional activity summaries should remain in `mfs9697/activity-control`, not be duplicated here.

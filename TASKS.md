# NCUTAM Task Register

## P1 — NASU analytical note, deadline 2026-09-30

**Source:** Extract from Protocol No. 17 of the Presidium of NAS of Ukraine, 24 June 2026.

### Required output
Analytical note covering:
1. general trends in the development of theoretical and applied mechanics in Ukraine;
2. corresponding global trends;
3. current state of research in the field within NAS of Ukraine;
4. prospects and priority directions for further development within NAS of Ukraine.

### Suggested work packages
- define the scope of mechanics to be covered by NCUTAM;
- map Ukrainian institutions, groups, and thematic strengths;
- identify international priority trends and benchmark directions;
- identify gaps, risks, and infrastructure/personnel constraints;
- formulate 5–10 strategic priority directions;
- prepare a concise evidence-based analytical note;
- review with Committee leadership before submission.

### Status
**OPEN — HIGH PRIORITY.** This is the next substantive NCUTAM milestone after completion of the website migration.

---

## P1 — migrate NCUTAM Publii site to the Inmech Astro platform

**Activated:** 2026-09-12.  
**Closed:** 2026-09-13.

### Objective
Move the Committee's public content from the Publii-generated site into the Institute of Mechanics Astro website infrastructure while preserving useful content, stable navigation, documents, conference history, and legacy-link continuity.

### Final repository roles
- **Authoritative public content and normal maintenance:** `mfs9697/inmech-site`.
- **Legacy compatibility / migration record / Committee task workspace:** `mfs9697/ncutam`.
- **Frozen full Publii export:** branch `archive/publii-export-pre-cutover-2026-09-13` in `mfs9697/ncutam`, pinned at commit `8643b62ae0f1be9714c0edb741f9b17b5c9a79e8`.

Public NCUTAM content must not be maintained independently in `mfs9697/ncutam`; the operating procedure is `mfs9697/inmech-site/docs/NCUTAM_MAINTENANCE.md`.

### Work packages
1. **Source inventory — COMPLETE (2026-09-12).** Enumerated published Publii pages, archives, documents/media, conference/news material, governance/membership content, and target-site structures.
2. **Content audit — COMPLETE (2026-09-12).** Classified legacy material as KEEP / MERGE / REDIRECT / DROP and established source precedence. See [`docs/WP2_CONTENT_AUDIT.md`](docs/WP2_CONTENT_AUDIT.md).
3. **Target architecture — COMPLETE (2026-09-12).** Defined bilingual `/ncutam/` and `/en/ncutam/` routes, navigation, shared-news behavior, activity/document archives, sitemap/search implications and legacy destinations. See [`docs/WP3_TARGET_ARCHITECTURE.md`](docs/WP3_TARGET_ARCHITECTURE.md).
4. **Content model — COMPLETE (2026-09-12).** Defined Astro collections/data for news scope, pages, institutions, members, governance, activities, documents/reports and media, plus semantic validation. See [`docs/WP4_CONTENT_MODEL.md`](docs/WP4_CONTENT_MODEL.md).
5. **Migration map — COMPLETE (2026-09-12).** Fixed canonical content IDs and mapped the 26 canonical legacy URLs plus archive aliases. `migration/legacy-routes.yaml` remains the continuity source of truth. See [`docs/WP5_MIGRATION_MAP.md`](docs/WP5_MIGRATION_MAP.md).
6. **Implementation — COMPLETE AND DEPLOYED (2026-09-13).** Inmech PR #114 was merged as `8be9103cd053e13e683c6e79d3e766822306f7b4`. The migrated section includes the reconciled 429-person snapshot (218 active, 211 in memoriam at migration), the historical 35-person 2025 admission cohort, 48 institutions, 17 current governance assignments, 8 canonical activities, 6 media records, 19 byte-pinned PDFs, and 19 full-size published photographs. Final bilingual desktop/mobile browser and accessibility sweeps were green. The later NCUTAM panel-padding correction was deployed as `0bee39ae87c864072e84b1efd78c2295a9d99f35`.
7. **Redirect / continuity — COMPLETE AND LIVE (2026-09-13).** Legacy PR #1 was merged as `28b6ccd7217512c720b6fa6c9341cbd2a841e2f6`. GitHub Pages serves 26 canonical legacy forwarding stubs + 3 archive aliases and a moved-site 404. Because GitHub Pages cannot provide arbitrary repository-controlled 301/308 rules for these paths, compatibility uses immediate static/client-side forwarding with canonical/noindex metadata. See [`docs/WP7_REDIRECT_CUTOVER.md`](docs/WP7_REDIRECT_CUTOVER.md).
8. **Validation — COMPLETE.** Build/link/sitemap checks, membership/governance semantics, activity assets, PDF integrity, bilingual browser/accessibility checks, route/fragment validation and live redirect verification all passed. Initial live continuity run `34743012863` verified all 29 mapped URLs plus the unknown-URL 404.
9. **Update workflow — COMPLETE AND DEPLOYED (2026-09-13).** Inmech PR #115 was merged as `9efdcea8d550d347c1b3f492f23886421ff7ace2`. `docs/NCUTAM_MAINTENANCE.md` in `inmech-site` is the authoritative maintenance procedure. Current member totals are maintenance-safe rather than frozen, the historical 2025 cohort remains protected, and PDF hashes are maintained in `src/data/ncutam/document-hashes.json`.
10. **Cutover / archive — COMPLETE (2026-09-13).** Legacy PR #2 was merged as `52eab6f5f6a47873e66332d5d0623d61d40f68ed`. The complete pre-cutover Publii export is pinned on the archival branch above; obsolete Publii runtime/derivative trees, stale sitemap output and obsolete cutover-preparation automation were removed from active `main`; the route map, redirect stubs, generator, verifier, 404 and rollback documentation were retained. GitHub Pages freeze deployment run `34751734528` completed successfully, and continuity run `34751734835` again verified **all 29 mapped URLs plus the unknown-URL 404**. See [`docs/WP10_ARCHIVE_FREEZE.md`](docs/WP10_ARCHIVE_FREEZE.md).

### Final architectural decisions
- NCUTAM is a first-class top-level institutional section of Inmech, not an Institute structural unit.
- Paired Ukrainian/English routes use the same ASCII slug structure.
- NCUTAM news uses the shared Inmech `news` collection with scopes; detail pages remain canonical under `/news/...` and `/en/news/...`.
- Institutions, members and governance are separate linked datasets; member IDs remain stable across status changes.
- Historical admission cohorts are historical invariants independent of current member status.
- Durable activities use one typed collection: meetings, conferences, initiatives and international activity.
- Documents use stable `/documents/ncutam/...` paths and a separate hash ledger for published PDF integrity.
- `mfs9697/inmech-site` is the only normal public-content maintenance repository.
- `mfs9697/ncutam:main` is a compatibility/migration record and Committee project workspace, not a second CMS.
- The complete Publii source is preserved on the explicit archival branch, not on active `main`.
- `migration/legacy-routes.yaml` is the single legacy-continuity map. If a canonical route changes, deploy/verify Inmech first, then update the legacy compatibility layer and rerun the live verifier.

### Status
**COMPLETE — WP1 through WP10 are closed, deployed, cut over, maintained, archived/frozen and live-verified. The NCUTAM website migration is no longer an active workstream.**

### Immediate next milestone
**NASU analytical note due 2026-09-30.** Resume the open P1 analytical task at the top of this register.

---

## P3 — Committee activity and reporting evidence

Maintain a concise record of outputs that can be reused in:
- NCUTAM annual reporting;
- Institute annual reporting;
- NASU reporting;
- personal activity reporting in `mfs9697/activity-control`;
- conference/network documentation.

Do not duplicate full narratives across repositories; keep authoritative project details here and report-neutral summary evidence in `activity-control`.

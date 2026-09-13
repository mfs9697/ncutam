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
Open — high priority.

---

## P1 — migrate NCUTAM Publii site to the Inmech Astro platform

**Activated:** 2026-09-12.

### Objective
Move the Committee's public content from the current Publii-generated site into the Institute of Mechanics Astro website infrastructure, while preserving useful content, stable navigation, documents, conference history, and old-link continuity where feasible.

### Authoritative repositories
- Committee source / migration workspace: `mfs9697/ncutam`
- Target Inmech Astro site: `mfs9697/inmech-site`

### Work packages
1. **Source inventory — COMPLETE (2026-09-12).** Enumerated the published Publii pages, archive views, documents/media, conference/news material, governance/membership content, and the relevant target-site structures already present in Inmech Astro.
2. **Content audit — COMPLETE (2026-09-12).** Classified legacy content as KEEP / MERGE / REDIRECT / DROP, separated durable institutional records from publishing artifacts, established source precedence, and defined the recommended news/media treatment. See [`docs/WP2_CONTENT_AUDIT.md`](docs/WP2_CONTENT_AUDIT.md).
3. **Target architecture — COMPLETE (2026-09-12).** Defined the exact `/ncutam/` and `/en/ncutam/` route hierarchy, global/local navigation, landing-page role, bilingual policy, shared-news canonical behavior, activity/document archives, sitemap/search implications, and target destinations for the legacy-content classes. See [`docs/WP3_TARGET_ARCHITECTURE.md`](docs/WP3_TARGET_ARCHITECTURE.md).
4. **Content model — COMPLETE (2026-09-12).** Defined the concrete Astro collection/data model for news scope, evergreen pages, normalized institutions, members, governance, durable activities, documents/reports, media mentions, bilingual Markdown, collection relationships, route-generation inputs and a dedicated semantic validator. See [`docs/WP4_CONTENT_MODEL.md`](docs/WP4_CONTENT_MODEL.md).
5. **Migration map — COMPLETE (2026-09-12).** Mapped all 26 canonical legacy sitemap URLs and the key Publii archive aliases to exact target routes/content IDs; fixed canonical activity/media IDs, verified Drive sources and target paths for core documents, defined original-image migration directories, and added a machine-readable route map for redirect reuse. See [`docs/WP5_MIGRATION_MAP.md`](docs/WP5_MIGRATION_MAP.md) and [`migration/legacy-routes.yaml`](migration/legacy-routes.yaml).
6. **Implementation — COMPLETE (2026-09-12), DEPLOYED (2026-09-13).** Implemented the WP3–WP5 architecture in `mfs9697/inmech-site`; PR #114 was merged and deployed to production as commit `8be9103cd053e13e683c6e79d3e766822306f7b4`. Completed and validated batches include:
   - schema/infrastructure: NCUTAM collections, shared-news `scopes`, bilingual top-level routes, global/local navigation, landing pages, and shared NCUTAM news filtering;
   - membership/institutions: reconciled **429-person snapshot (218 active, 211 in memoriam, 0 former)**, exactly 35 active members admitted in 2025, 48 normalized institutions, bilingual current-members and memorial views;
   - current governance: 17 linked leadership/Presidium assignments and approved responsibilities effective from 1 December 2025, rendered bilingually from structured data;
   - evergreen/activity/media: durable About and IUTAM content, generalized bilingual body utility, all 8 canonical activity records and category/detail archives, plus all 6 canonical outbound media-mention records;
   - documents/reports: 7 core official PDFs plus 12 verified General Meeting archive PDFs migrated to stable `/documents/ncutam/...` paths, for **19 byte-pinned manifest PDFs** total; data-driven Documents/Reports views include a dedicated General Meeting materials group;
   - original visual assets: **19 full-size published photographs** migrated from the legacy site — 10 from Current Problems in Mechanics 2023, 4 from Mechanics: Present and Prospects 2024, and 5 from the General Meeting of 11 November 2025 — with Publii thumbnails/derivatives and unpublished stray images intentionally excluded;
   - activity integration: bilingual activity-detail pages render the verified galleries and meeting material packets from structured references; the 2024 conference preserves the four legacy captions;
   - route cleanup: duplicate Ukrainian/English `in-memoriam` route definitions removed, leaving one canonical data-driven route per language;
   - validation: `check:ncutam` validates membership/governance semantics, activity gallery paths/counts and bilingual alt text, activity-document references, while the document validator pins exact Git-blob hashes for all 19 published PDFs;
   - final visual/mobile/content/accessibility sweep: all **46 bilingual NCUTAM routes** were rendered in Chromium at desktop (1440×900) and mobile (390×844) sizes for **92 browser renders**. The sweep checked horizontal overflow, heading count, duplicate IDs, external-link safety, broken images, image alt text, stale migration placeholders, and WCAG 2.0/2.1 A/AA issues with axe-core. Corrections included the NCUTAM contact-anchor collision, generic eyebrow contrast, document-button styling, mobile/card wrapping, and Ukrainian desktop navigation crowding. The final browser sweep and full repository validation are green.
7. **Redirect / continuity plan — COMPLETE AND LIVE (2026-09-13).** `migration/legacy-routes.yaml` remains the single source of truth. Legacy PR `mfs9697/ncutam#1` was merged as commit `28b6ccd7217512c720b6fa6c9341cbd2a841e2f6` only after the Inmech production deployment and NCUTAM smoke checks succeeded. GitHub Pages then published **26 canonical legacy redirects + 3 archive aliases = 29 exact-target compatibility stubs** plus the moved-site 404. Because GitHub Pages cannot provide arbitrary repository-controlled HTTP 301/308 responses for these existing static files, the compatibility layer uses immediate client-side/static forwarding with `rel=canonical` and `noindex,follow`; this limitation is documented in [`docs/WP7_REDIRECT_CUTOVER.md`](docs/WP7_REDIRECT_CUTOVER.md).
8. **Validation — COMPLETE FOR WP6 AND WP7.** Build, sitemap, landmarks, internal links, membership/governance semantics, activity assets, document-byte integrity, final desktop/mobile browser accessibility checks, and pre-cutover route/fragment validation are green. After activation, workflow run `34743012863` launched Chromium against the public sites and verified **all 29 mapped old URLs** reached their exact Inmech destinations, including URL fragments; a deliberately unknown old URL correctly returned the moved-site HTTP 404 with the NCUTAM fallback link.
9. **Update workflow — NEXT.** Document how Committee news, documents, membership changes, conferences, meetings, governance data and media mentions will be maintained after migration.
10. **Cutover / archive — CUTOVER COMPLETE; ARCHIVAL/FREEZE FOLLOW-UP PENDING.** The target deployment, legacy compatibility activation and live continuity verification are complete. The remaining WP10 work is final archival/freeze housekeeping for the Publii source and migration machinery after the maintenance workflow is documented.

### Architectural decisions established by WP2–WP7
- NCUTAM is a first-class top-level institutional section of Inmech, but not an Institute structural unit.
- The global menu exposes the short item `НКУТПМ / NCUTAM`, linking to `/ncutam/` and `/en/ncutam/`.
- All durable NCUTAM routes use paired Ukrainian/English paths with the same ASCII slug structure.
- NCUTAM does **not** maintain a second independent news collection. The existing Inmech `news` collection uses `scopes`, defaulting to `['institute']`; `/ncutam/news/` filters records containing `ncutam`.
- News detail pages remain canonical under `/news/...` and `/en/news/...`; no duplicate `/ncutam/news/[slug]/` pages are created.
- Stable NCUTAM facts are managed as typed Astro collections rather than page-local arrays.
- Institutions are normalized separately from members; member records reference institution IDs.
- Members and governance are separate linked datasets; current leadership is derived from current governance assignments.
- Durable activities use one Markdown collection with typed subdirectories: `meetings`, `conferences`, `initiatives`, and `international`.
- Exact canonical activity IDs are fixed in WP5, including `meetings/2023-09-12`, `meetings/2025-11-11`, four conference records, `initiatives/paton-bridge`, and `international/iutam-general-members-meeting-2024`.
- External media coverage is stored as short press-mention records linking to original sources and, where applicable, to a canonical activity/initiative.
- Documents use a canonical manifest and stable `/documents/ncutam/...` public paths. Nineteen verified PDFs are physically migrated and byte-pinned in validation, including the 2023 and 2025 General Meeting packets.
- Only full-size visual assets demonstrably published on canonical legacy pages are migrated; generated Publii thumbnails, responsive derivatives and unpublished stray media are excluded.
- The 1992 regulation ambiguity was resolved by recovering the actual `Положення про Комітет.pdf`; the 1992 regulation is historical/superseded, while Resolution No. 26 of 24 January 2024 contains the current Regulation.
- Evergreen home/About/IUTAM narrative uses bilingual Markdown; English routes contain meaningful English content rather than Ukrainian text inside an English shell.
- The news language-block logic is generalized into a reusable bilingual-body utility while preserving backward-compatible news exports.
- A dedicated `check:ncutam` semantic validator runs in addition to existing Inmech build/link/sitemap checks; document validation additionally pins exact binary hashes.
- Contacts live on the landing page; a separate canonical NCUTAM contacts route is unnecessary.
- `migration/legacy-routes.yaml` remains the single source for legacy-to-target continuity and drives the WP7 redirect generator.
- The legacy GitHub Pages continuity layer is a compatibility bridge, not the authoritative site; redirect stubs are `noindex,follow` and canonicalize to Inmech.
- Cutover order is mandatory: deploy and verify Inmech first, then activate legacy forwarding.

### Immediate next milestone
**WP9 — maintenance/update workflow.** With the live cutover and all-29 continuity verification complete, document the normal operating procedure for NCUTAM news, membership, governance, activities, documents/reports and media records, including the validation/deployment path and responsibility boundaries between `mfs9697/ncutam` and `mfs9697/inmech-site`.

### Status
**ACTIVE — WP1 through WP8 complete; live cutover is active and verified. WP9 maintenance/update workflow is next, followed by final WP10 archival/freeze housekeeping.**

---

## P3 — Committee activity and reporting evidence

Maintain a concise record of outputs that can be reused in:
- NCUTAM annual reporting;
- Institute annual reporting;
- NASU reporting;
- personal activity reporting in `mfs9697/activity-control`;
- conference/network documentation.

Do not duplicate full narratives across repositories; keep authoritative project details here and report-neutral summary evidence in `activity-control`.

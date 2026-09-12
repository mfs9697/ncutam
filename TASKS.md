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
5. **Migration map — COMPLETE (2026-09-12).** Mapped all 26 canonical legacy sitemap URLs and the key Publii archive aliases to exact target routes/content IDs; fixed canonical activity/media IDs, verified Drive sources and target paths for core documents, defined original-image migration directories, isolated the unresolved 1992 document mapping as a verification gate, and added a machine-readable route map for redirect reuse. See [`docs/WP5_MIGRATION_MAP.md`](docs/WP5_MIGRATION_MAP.md) and [`migration/legacy-routes.yaml`](migration/legacy-routes.yaml).
6. **Implementation — NEXT.** Implement the WP3–WP5 architecture in `mfs9697/inmech-site`, migrate structured data/content/assets in controlled batches, and add the NCUTAM-specific validation layer without carrying Publii presentation markup forward.
7. **Redirect / continuity plan.** Preserve important old URLs where technically feasible using the WP5 route map as the single redirect source; document unavoidable infrastructure limitations.
8. **Validation.** Check internal/external links, missing assets, bilingual consistency, metadata, mobile rendering, accessibility basics, and NCUTAM-specific semantic integrity.
9. **Update workflow.** Document how Committee news, documents, membership changes, conferences, meetings, governance data and media mentions will be maintained after migration.
10. **Cutover / archive.** Switch the public destination when validated; retain the Publii export as historical source material rather than the active content system.

### Architectural decisions established by WP2–WP5
- NCUTAM is a first-class top-level institutional section of Inmech, but not an Institute structural unit.
- The global menu should expose the short item `НКУТПМ / NCUTAM`, linking to `/ncutam/` and `/en/ncutam/`.
- All durable NCUTAM routes use paired Ukrainian/English paths with the same ASCII slug structure.
- NCUTAM does **not** maintain a second independent news collection. The existing Inmech `news` collection receives `scopes`, defaulting to `['institute']`; `/ncutam/news/` filters records containing `ncutam`.
- News detail pages remain canonical under `/news/...` and `/en/news/...`; no duplicate `/ncutam/news/[slug]/` pages are created.
- The legacy Early Career IUTAM article maps to the existing Inmech record `news: 2026/2026-03-19-iutam-committee`, whose current public route is `/news/2026/2026-03-19-iutam-committee/`.
- Stable NCUTAM facts are managed as typed Astro collections rather than page-local arrays.
- Institutions are normalized separately from members; member records reference institution IDs.
- Members and governance are separate linked datasets; current leadership is derived from current governance assignments.
- Durable activities use one Markdown collection with typed subdirectories: `meetings`, `conferences`, `initiatives`, and `international`.
- Exact canonical activity IDs are fixed in WP5, including `meetings/2023-09-12`, `meetings/2025-11-11`, four initial conference records, `initiatives/paton-bridge`, and `international/iutam-general-members-meeting-2024`.
- External media coverage is stored as short press-mention records linking to original sources and, where applicable, to a canonical activity/initiative. Initial media IDs are fixed in WP5.
- Documents use a canonical manifest and stable `/documents/ncutam/...` public paths. Drive is the implementation source for confirmed 2023–2025 annual reports, the 2024 NASU resolution, and the approved 2025 Presidium responsibilities source.
- The ambiguous 1992 regulation mapping is a verification gate and does not block implementation of verified content.
- Evergreen home/About/IUTAM narrative uses bilingual Markdown; English routes must contain meaningful English content rather than Ukrainian text inside an English shell.
- The existing news language-block logic should be generalized into a reusable bilingual-body utility.
- A dedicated `check:ncutam` semantic validator is required in addition to the existing Inmech build/link/sitemap checks.
- Contacts live on the landing page; a separate canonical NCUTAM contacts route is unnecessary.
- The machine-readable `migration/legacy-routes.yaml` is the single source for the legacy-to-target mapping and should be reused by WP7 redirect/stub generation.

### Immediate next milestone
**WP6 — implementation.** Begin with schema/infrastructure, then migrate core structured data, evergreen pages, verified documents, durable activities, media records and original assets, followed by shared-news scope and validation. Use the implementation order fixed in WP5.

### Status
**ACTIVE — WP1 through WP5 complete; WP6 next.**

---

## P3 — Committee activity and reporting evidence

Maintain a concise record of outputs that can be reused in:
- NCUTAM annual reporting;
- Institute annual reporting;
- NASU reporting;
- personal activity reporting in `mfs9697/activity-control`;
- conference/network documentation.

Do not duplicate full narratives across repositories; keep authoritative project details here and report-neutral summary evidence in `activity-control`.

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
5. **Migration map — NEXT.** Map every canonical legacy page/resource to its exact target route/content record, including merged aliases, source documents/assets, and redirect requirements.
6. **Implementation.** Implement the WP3–WP4 architecture in `mfs9697/inmech-site` and migrate content/assets without carrying Publii presentation markup forward unnecessarily.
7. **Redirect / continuity plan.** Preserve important old URLs where technically feasible and document unavoidable changes.
8. **Validation.** Check internal/external links, missing assets, bilingual consistency, metadata, mobile rendering, accessibility basics, and NCUTAM-specific semantic integrity.
9. **Update workflow.** Document how Committee news, documents, membership changes, conferences, meetings, governance data and media mentions will be maintained after migration.
10. **Cutover / archive.** Switch the public destination when validated; retain the Publii export as historical source material rather than the active content system.

### Architectural decisions established by WP2–WP4
- NCUTAM is a first-class top-level institutional section of Inmech, but not an Institute structural unit.
- The global menu should expose the short item `НКУТПМ / NCUTAM`, linking to `/ncutam/` and `/en/ncutam/`.
- All durable NCUTAM routes use paired Ukrainian/English paths with the same ASCII slug structure.
- NCUTAM does **not** maintain a second independent news collection. The existing Inmech `news` collection receives `scopes`, defaulting to `['institute']`; `/ncutam/news/` filters records containing `ncutam`.
- News detail pages remain canonical under `/news/...` and `/en/news/...`; no duplicate `/ncutam/news/[slug]/` pages are created.
- Stable NCUTAM facts are managed as typed Astro collections rather than page-local arrays.
- Institutions are normalized separately from members; member records reference institution IDs.
- Members and governance are separate linked datasets; current leadership is derived from current governance assignments.
- Durable activities use one Markdown collection with typed subdirectories: `meetings`, `conferences`, `initiatives`, and `international`. The `international` subtype is an archival refinement for durable IUTAM/international records, not a competing evergreen international section.
- External media coverage is stored as short press-mention records linking to original sources and, where applicable, to a canonical activity/initiative.
- Documents use a canonical manifest and stable `/documents/ncutam/...` public paths; unresolved 1992 mappings are not published until verified.
- Evergreen home/About/IUTAM narrative uses bilingual Markdown; English routes must contain meaningful English content rather than Ukrainian text inside an English shell.
- The existing news language-block logic should be generalized into a reusable bilingual-body utility.
- A dedicated `check:ncutam` semantic validator is required in addition to the existing Inmech build/link/sitemap checks.
- Contacts live on the landing page; a separate canonical NCUTAM contacts route is unnecessary.

### Immediate next milestone
**WP5 — migration map.** Produce the exact legacy-to-target mapping, including canonical target record IDs, merged aliases, source-of-truth files, media/document dependencies, and redirect destinations. This should be the final planning layer before implementation begins.

### Status
**ACTIVE — WP1 through WP4 complete; WP5 next.**

---

## P3 — Committee activity and reporting evidence

Maintain a concise record of outputs that can be reused in:
- NCUTAM annual reporting;
- Institute annual reporting;
- NASU reporting;
- personal activity reporting in `mfs9697/activity-control`;
- conference/network documentation.

Do not duplicate full narratives across repositories; keep authoritative project details here and report-neutral summary evidence in `activity-control`.

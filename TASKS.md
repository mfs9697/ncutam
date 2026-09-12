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
3. **Target architecture — NEXT.** Define the NCUTAM route hierarchy inside Inmech Astro, Ukrainian/English behavior, shared-news integration, navigation, and the relationship between landing, governance, members, meetings, conferences/activities, documents/reports, expert initiatives, and media mentions.
4. **Content model.** Define maintainable data/content structures for leadership, members, documents, conferences/activities, meetings, news scope, contacts, and institutional information.
5. **Migration map.** Map each canonical old page/resource to its target Astro route.
6. **Implementation.** Migrate content and assets into the target repository without carrying Publii presentation markup forward unnecessarily.
7. **Redirect / continuity plan.** Preserve important old URLs where technically feasible and document unavoidable changes.
8. **Validation.** Check internal/external links, missing assets, bilingual consistency, metadata, mobile rendering, and accessibility basics.
9. **Update workflow.** Document how Committee news, documents, membership changes, conferences, meetings, and governance data will be maintained after migration.
10. **Cutover / archive.** Switch the public destination when validated; retain the Publii export as historical source material rather than the active content system.

### Architectural decision established by WP2
NCUTAM should **not** maintain a second independent news collection. Committee news should use the existing Inmech `news` collection with an explicit NCUTAM organizational scope/section and be rendered as a filtered view within the Committee section. Durable activities (General Meetings, conferences, major expert initiatives) should have their own canonical records instead of surviving only as news posts. External media coverage should normally be represented as short press-mention records linking to the original source.

### Immediate next milestone
**WP3 — target Astro architecture.** Produce the route/navigation proposal and decide the concrete Astro structures before content-level migration begins.

### Status
**ACTIVE — WP1 and WP2 complete; WP3 next.**

---

## P3 — Committee activity and reporting evidence

Maintain a concise record of outputs that can be reused in:
- NCUTAM annual reporting;
- Institute annual reporting;
- NASU reporting;
- personal activity reporting in `mfs9697/activity-control`;
- conference/network documentation.

Do not duplicate full narratives across repositories; keep authoritative project details here and report-neutral summary evidence in `activity-control`.

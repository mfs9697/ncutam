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
- Target Inmech Astro site: Institute website repository (cross-reference during implementation)

### Work packages
1. **Source inventory** — enumerate current Publii pages, documents, media, conference/news archive, leadership/membership data, and external links.
2. **Content audit** — separate canonical Committee content from Publii-generated technical artifacts.
3. **Target architecture** — define where NCUTAM lives within the Inmech Astro information architecture and establish Ukrainian/English requirements.
4. **Content model** — define maintainable data/content structures for leadership, members, documents, conferences/news, contacts, and institutional information.
5. **Migration map** — map each canonical old page/resource to its target Astro route.
6. **Implementation** — migrate content and assets into the target repository without carrying Publii presentation markup forward unnecessarily.
7. **Redirect / continuity plan** — preserve important old URLs where technically feasible and document unavoidable changes.
8. **Validation** — check internal/external links, missing assets, bilingual consistency, metadata, mobile rendering, and accessibility basics.
9. **Update workflow** — document how Committee news, documents, membership changes, and conferences will be maintained after migration.
10. **Cutover / archive** — switch the public destination when validated; retain the Publii export as historical source material rather than the active content system.

### Immediate next milestone
Produce the source inventory and a proposed Astro target architecture before making content-level migration changes.

### Status
**ACTIVE — high priority.**

---

## P3 — Committee activity and reporting evidence

Maintain a concise record of outputs that can be reused in:
- NCUTAM annual reporting;
- Institute annual reporting;
- NASU reporting;
- personal activity reporting in `mfs9697/activity-control`;
- conference/network documentation.

Do not duplicate full narratives across repositories; keep authoritative project details here and report-neutral summary evidence in `activity-control`.

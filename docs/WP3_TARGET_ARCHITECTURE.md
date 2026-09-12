# WP3 — NCUTAM target route and navigation architecture

**Date:** 2026-09-12  
**Target:** `mfs9697/inmech-site`  
**Scope:** exact public route hierarchy, global/local navigation, bilingual behavior, shared-news behavior, and route-level ownership for the NCUTAM section.

## 1. Architectural position inside Inmech

NCUTAM should be a first-class institutional section of the Inmech website, but **not** presented as an Institute structural unit.

The Committee is nationally scoped and the Institute is its base organization. Therefore:

- do **not** place NCUTAM under `Structure`;
- do **not** bury it inside `About the Institute` or `Scientific cooperation`;
- add a short top-level global navigation item: **`НКУТПМ`** in Ukrainian and **`NCUTAM`** in English;
- place this item after `Публікації / Publications` and before `Новини / News`;
- use the normal Inmech header, footer, design system, search, sitemap, canonical/hreflang logic, and accessibility behavior throughout the section.

The Institute history/scientific-cooperation pages should cross-link to `/ncutam/`, but they are not the primary entry point.

## 2. Canonical route tree

All durable routes have a Ukrainian and English pair with the same ASCII slug structure.

```text
/ncutam/                                  /en/ncutam/
├── about/                                ├── about/
├── governance/                           ├── governance/
├── members/                              ├── members/
│   └── in-memoriam/                      │   └── in-memoriam/
├── activity/                             ├── activity/
│   ├── meetings/                         │   ├── meetings/
│   │   └── YYYY-MM-DD/                   │   │   └── YYYY-MM-DD/
│   ├── conferences/                      │   ├── conferences/
│   │   └── [slug]/                       │   │   └── [slug]/
│   ├── initiatives/                      │   ├── initiatives/
│   │   └── [slug]/                       │   │   └── [slug]/
│   └── media/                            │   └── media/
├── documents/                            ├── documents/
│   └── reports/                          │   └── reports/
├── iutam/                                ├── iutam/
└── news/                                 └── news/
```

### Canonical entry routes

1. `/ncutam/` — Committee landing page.
2. `/ncutam/about/` — mandate, institutional status, history, base organization, mission and stable responsibilities.
3. `/ncutam/governance/` — current leadership, Presidium and approved distribution of responsibilities.
4. `/ncutam/members/` — current Committee membership.
5. `/ncutam/activity/` — durable activity archive hub.
6. `/ncutam/documents/` — normative and official document hub.
7. `/ncutam/iutam/` — Ukraine/NCUTAM representation in IUTAM and durable international context.
8. `/ncutam/news/` — filtered NCUTAM view of the shared Inmech news collection.

The remaining routes are secondary archive/detail routes and should not overload the main local navigation.

## 3. Global navigation

Recommended Ukrainian order:

```text
Головна | Про інститут | Структура | Освітньо-наукова діяльність | Публікації | НКУТПМ | Новини | Контакти | Пошук
```

Recommended English order:

```text
Home | About the Institute | Structure | Education and research training | Publications | NCUTAM | News | Contacts | Search
```

Implementation implication: extend the header `activePage` type with `ncutam` and mark the global item active for the `/ncutam/` and `/en/ncutam/` path prefixes.

The acronym is intentionally used in the global menu to keep the navigation compact. The full Committee name is shown in the section hero and page metadata.

## 4. Local NCUTAM navigation

Every NCUTAM page should show a consistent secondary navigation below the section identity/hero area:

```text
Про Комітет | Керівництво і Президія | Члени | Діяльність | Документи | IUTAM | Новини
```

English:

```text
About | Governance | Members | Activities | Documents | IUTAM | News
```

The section title/logo itself links to `/ncutam/`, so a separate `Огляд / Overview` item is unnecessary.

Secondary archive routes (`meetings`, `conferences`, `initiatives`, `media`, `reports`, `in-memoriam`) are reached from their parent landing pages and breadcrumbs rather than being permanently exposed in the local navigation bar.

## 5. Landing page `/ncutam/`

The landing page should function as an institutional dashboard, not as a news blog home page.

Recommended content order:

1. **Identity hero** — full Committee name, short institutional description, relationship to NASU/IUTAM and the Institute as base organization.
2. **Quick institutional facts** — chair, scientific secretary, base organization, IUTAM representation, contact point.
3. **Core navigation cards** — About, Governance, Members, Activities, Documents, IUTAM.
4. **Current / upcoming activity** — conferences, calls or other time-sensitive Committee activity.
5. **Latest NCUTAM news** — 3–4 items from the shared Inmech `news` collection filtered by NCUTAM organizational scope.
6. **Recent durable records** — latest General Meeting / expert initiative / significant international activity.
7. **Reports and documents** — quick links to the latest annual report and core governing documents.
8. **Contacts** — anchor `#contacts`; no separate canonical contact page is required.

Do not duplicate the Institute-wide header/footer or create a separate visual website inside Inmech.

## 6. About and governance

### `/ncutam/about/`

Contains only durable institutional material:

- status and mandate;
- foundation/history, including 1992 where supported by source documents;
- role of the Institute as base organization;
- stable areas of activity;
- relationship to NASU and the Ukrainian mechanics community.

Time-bound priorities adopted at a specific meeting belong in that meeting record, not in evergreen About text.

### `/ncutam/governance/`

Combines the old separate `Керівництво` and `Президія` concepts into one canonical governance page:

- chair;
- deputy chairs;
- scientific secretary;
- full Presidium;
- approved responsibilities/portfolios;
- date/source of the current governance arrangement.

This avoids duplicating the same people on two manually maintained pages.

## 7. Members

### `/ncutam/members/`

One structured current-members list. At launch, **do not create hundreds of individual NCUTAM profile pages** merely to reproduce external biography links.

The list may expose filters such as institution/city, year joined and governance role if useful. Names can link to an existing Inmech person profile when appropriate or to a reliable external profile such as ESU.

### `/ncutam/members/in-memoriam/`

Uses the same underlying member data with historical/deceased status. It replaces the independent free-form `Пам'ять` list.

## 8. Durable activity archive

`/ncutam/activity/` is the long-term evidence layer of the Committee. It is not a copy of the news feed.

### General Meetings

- index: `/ncutam/activity/meetings/`
- detail: `/ncutam/activity/meetings/YYYY-MM-DD/`

Each meeting record can contain summary, decisions, membership/governance changes, gallery, attached materials and links to reports.

Initial canonical records include at least:

- `2023-09-12`;
- `2025-11-11`.

### Conferences

- index: `/ncutam/activity/conferences/`
- detail: `/ncutam/activity/conferences/[ascii-slug]/`

Past announcements are merged into the durable conference record. Upcoming-event announcements may additionally exist as shared Inmech news.

### Expert initiatives

- index: `/ncutam/activity/initiatives/`
- detail: `/ncutam/activity/initiatives/[ascii-slug]/`

The Paton Bridge intervention should become a canonical initiative record, with official Committee context and media references attached to it.

### Media / Press mentions

- index only: `/ncutam/activity/media/`

Normally no local article detail pages. Each record is a compact card/list item with date, source, neutral description and external URL. Media coverage of a substantive initiative links back to its canonical NCUTAM initiative record.

## 9. Documents and reports

### `/ncutam/documents/`

Document hub grouped by function rather than by Publii-era filename:

- foundation/governing documents;
- current NASU resolutions and Committee regulations;
- meeting decisions/materials where appropriate;
- links to annual reports.

### `/ncutam/documents/reports/`

Annual report index. Public files should use stable ASCII paths under the Inmech document tree, for example:

```text
/documents/ncutam/reports/2025/ncutam-report-2025.pdf
/documents/ncutam/governance/2024/nasu-resolution-26-2024-01-24.pdf
/documents/ncutam/meetings/2025-11-11/...
```

The public site should link final PDFs; editable working DOCX files remain source material unless publication is explicitly required.

## 10. IUTAM

### `/ncutam/iutam/`

Evergreen page containing:

- NCUTAM's representative role;
- historical relationship and membership context;
- current Ukrainian representation where appropriate;
- official IUTAM links;
- links to relevant durable activity records and current news.

Dated General Assembly participation or appointments should not be embedded permanently as if they were evergreen facts. They remain dated activity/news records and are surfaced from the IUTAM page.

No separate `/ncutam/international/` route is required at this stage; IUTAM is the durable international institutional page, while other international activity can live in the general activity/news layers.

## 11. News: one source, one canonical article URL

### Index

`/ncutam/news/` is a filtered view of the existing Inmech `news` collection using an explicit organizational scope such as `scopes: ['ncutam']`.

### Detail pages

**Do not create `/ncutam/news/[slug]/` article copies.**

A Committee news item has one canonical article URL in the shared Inmech news namespace:

```text
/news/[slug]/
/en/news/[slug]/
```

The NCUTAM index and landing-page cards link to that canonical article. This prevents duplicated content, duplicated translations and competing canonical URLs.

The existing thematic tag system remains thematic. `NCUTAM` is an organizational scope, not a public topic tag.

## 12. Bilingual policy

All permanent section and archive-index pages are paired:

```text
/ncutam/...  <->  /en/ncutam/...
```

Use the same ASCII slug on both language branches.

Requirements:

- institutional pages: full Ukrainian and English content;
- governance/member lists: bilingual labels/titles/institution names where available;
- durable historical activity records: English title and meaningful English summary are required before the English route is public; full English narrative is preferred but may be shorter than Ukrainian;
- attached official documents may remain in their source language, but the English page must label the document language clearly;
- media source titles may remain in the source language, accompanied by an English summary/label where needed.

Never publish an English route whose substantive body is simply Ukrainian content under an English shell.

## 13. Breadcrumbs and route context

Use breadcrumbs on secondary/detail pages. Examples:

```text
Головна > НКУТПМ > Діяльність > Загальні збори > 11 листопада 2025 року
Home > NCUTAM > Activities > General Meetings > 11 November 2025
```

The local NCUTAM navigation remains visible so users do not lose the institutional section context after entering a historical record.

## 14. Search and sitemap integration

- Add all stable NCUTAM route pairs to `src/data/routes.ts` so language switching and the HTML sitemap use the same route registry.
- Group them in a dedicated sitemap section `НКУТПМ / NCUTAM`.
- Add dynamic mapping rules for NCUTAM activity detail routes where needed, analogous to existing dynamic news/people/department handling.
- Include durable activity records in the generated XML sitemap.
- The filtered `/ncutam/news/` index is indexable; individual news articles remain canonical under `/news/...`.
- External media links are not local indexable article pages.

## 15. Legacy URL continuity implications

WP3 fixes the target destinations needed by WP5/WP7. Important examples:

- old home -> `/ncutam/`;
- `pro-komitet.html` -> `/ncutam/about/`;
- `kerivnictvo-komitetu.html` and `prezidiya-komitetu.html` -> `/ncutam/governance/`;
- `sklad.html` -> `/ncutam/members/`;
- `pamyat.html` -> `/ncutam/members/in-memoriam/`;
- `dokumenti.html` -> `/ncutam/documents/`;
- `zviti.html` -> `/ncutam/documents/reports/`;
- old conference records -> `/ncutam/activity/conferences/...`;
- 2023/2025 General Meeting pages -> `/ncutam/activity/meetings/...`;
- Paton Bridge media pages -> `/ncutam/activity/initiatives/paton-bridge/`;
- `novini.html` and old `/novini/` archive -> `/ncutam/news/`;
- old `/m/` -> `/ncutam/activity/media/`;
- old IUTAM institutional page -> `/ncutam/iutam/`;
- the duplicated IUTAM Early Career news post -> existing canonical Inmech `/news/...` route.

The full per-URL redirect table belongs to WP5/WP7.

## 16. Page ownership summary

| Route class | Source/owner |
| --- | --- |
| Landing, About, IUTAM | stable NCUTAM institutional content |
| Governance | structured NCUTAM governance data + approved source document |
| Members / In memoriam | structured NCUTAM member data |
| Meetings / conferences / initiatives | durable NCUTAM activity records |
| Documents / reports | document manifest + canonical files |
| News index | filtered shared Inmech `news` collection |
| News detail | existing shared Inmech `/news/` namespace |
| Media mentions | lightweight NCUTAM external-link records |

## 17. WP3 decisions fixed for WP4

WP4 should now define concrete Astro content/data structures that implement this route architecture, especially:

1. shared-news organizational scope;
2. governance/member data;
3. durable activity records and their types;
4. document/report manifest;
5. media-mention records;
6. bilingual field requirements;
7. route generation and validation rules.

**WP3 status: COMPLETE.**

# WP4 — NCUTAM content model

**Date:** 2026-09-12  
**Target:** `mfs9697/inmech-site`  
**Depends on:** WP2 content audit and WP3 target route/navigation architecture.  
**Scope:** concrete Astro content/data structures, relationships, bilingual rules, file organization, route-generation inputs, and validation rules for the NCUTAM section.

## 1. Design principles

The NCUTAM migration should use one typed Astro content layer, but not one oversized collection.

The model separates:

1. **reusable structured facts** — members, institutions, governance assignments, documents and media mentions;
2. **narrative durable records** — General Meetings, conferences, expert initiatives and durable international activity;
3. **evergreen narrative pages** — Committee overview and IUTAM institutional page;
4. **shared time-bound news** — existing Inmech `news` collection, extended with organizational scope.

Core rules:

- stable ASCII IDs are the primary keys; human-readable names/titles are never used as relational keys;
- facts are stored once and reused by views instead of copied into multiple pages;
- current-state data and historical snapshots are kept distinct;
- cross-record relationships use Astro collection references where practical;
- narrative Markdown follows the existing Inmech Ukrainian/English body convention;
- final public documents use stable ASCII file paths;
- schemas catch structural mistakes; a dedicated NCUTAM validator catches cross-record and semantic mistakes.

## 2. Proposed target file structure

```text
src/
├── content.config.ts
├── content/
│   ├── news/                         # existing shared collection
│   ├── ncutam-pages/
│   │   ├── home.md
│   │   ├── about.md
│   │   └── iutam.md
│   └── ncutam-activity/
│       ├── meetings/
│       │   ├── 2023-09-12.md
│       │   └── 2025-11-11.md
│       ├── conferences/
│       │   └── ...
│       ├── initiatives/
│       │   └── paton-bridge.md
│       └── international/
│           └── ...
├── data/
│   └── ncutam/
│       ├── site.ts
│       ├── institutions.yaml
│       ├── members.yaml
│       ├── governance.yaml
│       ├── documents.yaml
│       └── media.yaml
└── utils/
    └── bilingualBody.ts             # generalized from current newsBody.ts

public/
├── documents/
│   └── ncutam/
│       ├── foundation/
│       ├── governance/
│       ├── meetings/
│       └── reports/
└── images/
    └── ncutam/
        ├── identity/
        ├── meetings/
        ├── conferences/
        └── initiatives/
```

The `international/` activity subtype is a small refinement of WP3 required by the audited legacy IUTAM General Meeting record. It is an activity archive category, **not** a second evergreen “International” section. The evergreen institutional page remains `/ncutam/iutam/`.

## 3. Astro collection strategy

Astro 7 supports both `glob()` for Markdown/JSON/YAML/TOML entry files and `file()` for a single JSON/YAML/TOML file containing many entries. Use both:

| Collection | Loader | Purpose |
| --- | --- | --- |
| `news` | existing `glob()` | shared Inmech news; add organizational scope |
| `ncutamPages` | `glob()` Markdown | evergreen narrative content (`home`, `about`, `iutam`) |
| `ncutamActivities` | `glob()` Markdown | meetings, conferences, initiatives, international activity |
| `ncutamInstitutions` | `file()` YAML | normalized institution/city names and URLs |
| `ncutamMembers` | `file()` YAML | current/historical Committee membership |
| `ncutamGovernance` | `file()` YAML | dated roles/responsibilities referencing members |
| `ncutamDocuments` | `file()` YAML | canonical public document manifest |
| `ncutamMedia` | `file()` YAML | external press/media mentions |

Using collections for the data tables gives us schema validation, generated TypeScript types and the same `getCollection()` / `getEntry()` query model used elsewhere in Astro.

## 4. Shared news extension

Extend the current `news` schema with an organizational-scope field:

```ts
scopes: z.array(
  z.enum(['institute', 'ncutam'])
).default(['institute'])
```

### Semantics

- existing news without `scopes` remains Institute news automatically;
- `scopes: ['institute', 'ncutam']` appears in both the Institute and NCUTAM news views;
- `scopes: ['ncutam']` appears only in the NCUTAM filtered view, while retaining its one canonical article URL under `/news/...`;
- `НКУТПМ` may remain in editorial tags where already useful, but public topic filtering must use thematic tags, not organizational scope.

The existing IUTAM Early Career Committee news item should become the first explicit dual-scope record:

```yaml
scopes: ["institute", "ncutam"]
```

No second NCUTAM news-detail collection or route is created.

## 5. Evergreen pages — `ncutamPages`

Files:

```text
src/content/ncutam-pages/home.md
src/content/ncutam-pages/about.md
src/content/ncutam-pages/iutam.md
```

Recommended schema:

```ts
const ncutamPages = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/ncutam-pages' }),
  schema: z.object({
    title: z.string(),
    titleEn: z.string(),
    description: z.string(),
    descriptionEn: z.string(),
    updated: z.coerce.date().optional(),
    sourceDocuments: z.array(reference('ncutamDocuments')).default([])
  })
});
```

### Body convention

Use the existing Inmech bilingual Markdown convention:

```md
Український текст.

<!-- en:start -->

English text.

<!-- en:end -->
```

For these evergreen pages the English body is mandatory. The home Markdown supplies only the stable introductory narrative; dynamic cards, current governance, latest news/activity, latest report and contacts are assembled by the Astro landing template.

## 6. Institutions — `ncutamInstitutions`

A normalized institution directory prevents inconsistent spelling and translation across 200+ member records.

File:

```text
src/data/ncutam/institutions.yaml
```

Recommended entry shape:

```yaml
- id: inmech
  name: "Інститут механіки ім. С.П. Тимошенка НАН України"
  nameEn: "S.P. Timoshenko Institute of Mechanics of the NAS of Ukraine"
  city: "Київ"
  cityEn: "Kyiv"
  url: "https://inmech.kyiv.ua/"
```

Schema:

```ts
const ncutamInstitutions = defineCollection({
  loader: file('./src/data/ncutam/institutions.yaml'),
  schema: z.object({
    name: z.string(),
    nameEn: z.string(),
    city: z.string(),
    cityEn: z.string(),
    url: z.url().optional()
  })
});
```

Institution IDs must be short stable ASCII identifiers. Institution names can then be corrected once without editing every member.

## 7. Members — `ncutamMembers`

File:

```text
src/data/ncutam/members.yaml
```

Each entry has a stable ASCII ID independent of display spelling.

Recommended shape:

```yaml
- id: selivanov-mikhailo
  name: "Селіванов Михайло Федорович"
  nameEn: "Mykhailo F. Selivanov"
  status: active
  joinedYear: 2023
  institution: inmech
  inmechPersonId: selivanov
  profiles:
    - kind: esu
      label: "Енциклопедія Сучасної України"
      url: "https://esu.com.ua/..."
```

Schema fields:

```ts
{
  name: z.string(),
  nameEn: z.string(),
  sortName: z.string().optional(),
  status: z.enum(['active', 'in-memoriam', 'former']),
  joinedYear: z.number().int().min(1992).optional(),
  endedYear: z.number().int().min(1992).optional(),
  institution: reference('ncutamInstitutions').optional(),
  city: z.string().optional(),       // override/fallback only
  cityEn: z.string().optional(),
  inmechPersonId: z.string().optional(),
  profiles: z.array(z.object({
    kind: z.enum(['esu', 'orcid', 'scholar', 'other']).default('other'),
    label: z.string(),
    url: z.url()
  })).default([])
}
```

### Rules

- `active` records feed `/ncutam/members/`;
- `in-memoriam` records feed `/ncutam/members/in-memoriam/`;
- `former` is retained for historical completeness when necessary but does not appear in the current list;
- `inmechPersonId` is an optional link to the existing Institute `people` collection and avoids duplicating a full biography;
- no individual NCUTAM profile route is generated merely because a member exists;
- historical membership totals are never calculated backward from the current dataset; dated meeting/report records retain their original snapshots.

`inmechPersonId` is intentionally a string rather than a hard `reference('people')` in the first implementation pass because not every target deployment may expose all Institute people records consistently. The NCUTAM validator should verify it when present.

## 8. Governance — `ncutamGovernance`

Governance must not duplicate member names. It references member IDs and stores the dated role/responsibility assignment.

File:

```text
src/data/ncutam/governance.yaml
```

Example:

```yaml
- id: scientific-secretary-selivanov-2025
  member: selivanov-mikhailo
  role: scientific-secretary
  order: 20
  responsibilities:
    - "Відповідає за організаційну підготовку засідань ..."
  responsibilitiesEn:
    - "Coordinates the organizational preparation of meetings ..."
  effectiveFrom: 2025-12-01
  sourceDocument: presidium-responsibilities-2025
```

Schema:

```ts
{
  member: reference('ncutamMembers'),
  role: z.enum([
    'chair',
    'deputy-chair',
    'scientific-secretary',
    'presidium-member'
  ]),
  order: z.number().int(),
  responsibilities: z.array(z.string()).default([]),
  responsibilitiesEn: z.array(z.string()).default([]),
  effectiveFrom: z.coerce.date(),
  effectiveTo: z.coerce.date().optional(),
  sourceDocument: reference('ncutamDocuments').optional()
}
```

Role labels are rendered centrally from the enum, e.g. `chair -> Голова Комітету / Chair of the Committee`, rather than repeated in every record.

### Current vs historical governance

A governance assignment is current when `effectiveFrom <= today` and `effectiveTo` is absent or in the future. Historical assignments may remain in the dataset for future historical views but do not appear on the current governance page.

The approved 1 December 2025 responsibilities document is the initial source record for the current responsibility assignments.

## 9. Durable activities — `ncutamActivities`

Directory:

```text
src/content/ncutam-activity/
```

One Markdown file = one canonical durable record.

Types and routes:

| `type` | Collection ID pattern | Public route |
| --- | --- | --- |
| `meeting` | `meetings/YYYY-MM-DD` | `/ncutam/activity/meetings/YYYY-MM-DD/` |
| `conference` | `conferences/[slug]` | `/ncutam/activity/conferences/[slug]/` |
| `initiative` | `initiatives/[slug]` | `/ncutam/activity/initiatives/[slug]/` |
| `international` | `international/[slug]` | `/ncutam/activity/international/[slug]/` |

Recommended schema:

```ts
{
  type: z.enum(['meeting', 'conference', 'initiative', 'international']),
  title: z.string(),
  titleEn: z.string(),
  summary: z.string(),
  summaryEn: z.string(),
  date: z.coerce.date(),
  endDate: z.coerce.date().optional(),
  ongoing: z.boolean().default(false),
  location: z.string().optional(),
  locationEn: z.string().optional(),
  committeeRole: z.string().optional(),
  committeeRoleEn: z.string().optional(),
  featured: z.boolean().default(false),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
  imageAltEn: z.string().optional(),
  gallery: z.array(z.object({
    src: z.string(),
    alt: z.string(),
    altEn: z.string().optional(),
    caption: z.string().optional(),
    captionEn: z.string().optional()
  })).default([]),
  documents: z.array(reference('ncutamDocuments')).default([]),
  relatedNews: z.array(reference('news')).default([]),
  externalLinks: z.array(z.object({
    label: z.string(),
    labelEn: z.string().optional(),
    url: z.url()
  })).default([])
}
```

### Narrative body

- Ukrainian narrative precedes the `<!-- en:start -->` block;
- an English narrative is strongly preferred;
- `titleEn` and `summaryEn` are mandatory for every published record;
- if a legacy historical record initially has no full English narrative, the English route may render its meaningful `summaryEn`, structured metadata, gallery/documents and a clear note that the full archival narrative is available in Ukrainian. It must never silently render Ukrainian prose as English content.

### Historical snapshots

Any historical count or office-holder statement in the narrative remains dated evidence. Current member/governance data must not overwrite historical meeting text.

## 10. Documents — `ncutamDocuments`

File:

```text
src/data/ncutam/documents.yaml
```

This manifest is the only source of public document metadata. Pages should not hard-code PDF paths independently.

Recommended schema:

```ts
{
  title: z.string(),
  titleEn: z.string(),
  kind: z.enum([
    'foundation',
    'regulation',
    'resolution',
    'governance',
    'annual-report',
    'meeting-material',
    'other'
  ]),
  date: z.coerce.date().optional(),
  year: z.number().int().optional(),
  language: z.enum(['uk', 'en', 'bilingual']),
  path: z.string(),
  issuedBy: z.string().optional(),
  issuedByEn: z.string().optional(),
  status: z.enum(['current', 'historical', 'superseded']).default('historical'),
  note: z.string().optional(),
  noteEn: z.string().optional()
}
```

Public-path rule:

```text
/documents/ncutam/<category>/<year-or-context>/<ascii-file-name>.pdf
```

Examples:

```text
/documents/ncutam/reports/2025/ncutam-report-2025.pdf
/documents/ncutam/governance/2024/nasu-resolution-26-2024-01-24.pdf
/documents/ncutam/meetings/2025-11-11/meeting-decisions.pdf
```

### Document rules

- `path` must be unique and begin with `/documents/ncutam/`;
- public canonical files should be PDF unless a specific editable file is intentionally published;
- `annual-report` requires `year`;
- a superseded regulation remains discoverable as historical evidence but is clearly marked;
- unresolved 1992 document mappings remain excluded from the public manifest until verified;
- pages link documents by manifest ID, never by copied raw filename.

## 11. Media mentions — `ncutamMedia`

File:

```text
src/data/ncutam/media.yaml
```

These are external-link records, not local articles.

Schema:

```ts
{
  date: z.coerce.date(),
  source: z.string(),
  title: z.string(),
  titleEn: z.string().optional(),
  summary: z.string(),
  summaryEn: z.string(),
  url: z.url(),
  relatedActivity: reference('ncutamActivities').optional()
}
```

A Paton Bridge LIGA/UNIAN item therefore points to the canonical `initiatives/paton-bridge` activity record. A simple institutional press mention has no local detail page.

## 12. Singleton Committee identity/config — `site.ts`

A small typed module is appropriate for singleton configuration that does not need collection querying:

```text
src/data/ncutam/site.ts
```

It should contain only stable site-level metadata, for example:

```ts
export const ncutamSite = {
  shortName: 'НКУТПМ',
  shortNameEn: 'NCUTAM',
  name: 'Національний комітет України з теоретичної і прикладної механіки',
  nameEn: 'National Committee of Ukraine for Theoretical and Applied Mechanics',
  email: 'natcommmech@nas.gov.ua',
  baseOrganizationUrl: '/',
  contactAnchor: '/ncutam/#contacts'
} as const;
```

Do **not** hard-code the current chair or scientific secretary here. Those are derived from `ncutamGovernance`, so a governance change requires one factual update, not edits across layouts and pages.

## 13. Bilingual body utility

The existing `src/utils/newsBody.ts` already parses `<!-- en:start --> ... <!-- en:end -->`. During implementation, generalize the language-block logic into:

```text
src/utils/bilingualBody.ts
```

with generic functions such as:

```ts
getUkrainianBody(body)
getEnglishBody(body)
hasLanguageBlocks(body)
renderSimpleMarkdown(markdown, base)
```

The current `newsBody.ts` can either import/re-export those helpers or become a compatibility wrapper. This avoids maintaining two parsers for the same bilingual convention.

## 14. Relationship graph

The intended dependencies are:

```text
ncutamInstitutions
        ↑
 ncutamMembers
        ↑
 ncutamGovernance ───────→ ncutamDocuments

ncutamActivities ────────→ ncutamDocuments
        │
        └───────────────→ news

ncutamMedia ─────────────→ ncutamActivities

ncutamPages ─────────────→ ncutamDocuments
```

There is deliberately no reverse relationship from documents back to every page/activity. Views query by document kind or follow references from the owning record. This keeps the graph simple and avoids bidirectional duplication.

## 15. Route generation from content IDs

`ncutamActivities` uses nested collection IDs as route inputs.

Examples:

```text
meetings/2025-11-11
conferences/mechanics-modernity-prospects-2024
initiatives/paton-bridge
international/iutam-general-meeting-2026
```

The route generator maps the first ID segment to its public archive segment. The `type` field must agree with the directory segment.

Evergreen page IDs are fixed:

```text
home
about
iutam
```

Members, governance, institutions, documents and media entries do not generate individual routes.

## 16. Validation layers

### Layer A — Astro/Zod schema validation

Catches:

- missing required UA/EN labels;
- invalid enum values;
- malformed dates/URLs;
- incorrect field types;
- malformed collection references.

### Layer B — `scripts/check-ncutam-content.mjs`

Add a dedicated semantic validator and include it in `npm run validate` as `check:ncutam`.

Required checks:

1. all NCUTAM IDs are stable ASCII identifiers;
2. member names are not duplicated accidentally;
3. every referenced institution/member/document/news/activity exists;
4. every `active` governance assignment refers to an `active` member;
5. `in-memoriam`/`former` members cannot hold current governance roles;
6. there is exactly one current `chair` and one current `scientific-secretary`;
7. governance responsibility arrays have matching English content for current public assignments;
8. `endedYear >= joinedYear` when both exist;
9. meeting IDs use `YYYY-MM-DD` and match the record date;
10. activity directory segment agrees with `type`;
11. `endDate >= date` and `ongoing` is not combined with a contradictory historical end date;
12. every document path is unique, begins `/documents/ncutam/`, and exists under `public/`;
13. every `annual-report` has a year, with at most one record marked canonical/current for a given year;
14. no unresolved 1992 placeholder is accidentally published as a verified document;
15. every media URL is external and every related activity resolves;
16. every evergreen page contains a real English body block;
17. every activity has `titleEn` and `summaryEn` before the English route is generated;
18. every `news.scopes` value is allowed, and NCUTAM-only filtering is tested;
19. `inmechPersonId`, when present, resolves to an existing `people` entry;
20. images and gallery files referenced by NCUTAM records exist.

### Layer C — existing site validation

The normal Inmech checks remain authoritative for:

- static build success;
- internal links;
- sitemap output;
- main landmarks/accessibility basics.

NCUTAM validation is additive, not a replacement.

## 17. Editing workflow consequences

The content model is intentionally optimized for low-maintenance updates:

### Add a member

1. ensure institution exists in `institutions.yaml`;
2. add one member entry to `members.yaml`;
3. add governance entry only if the member receives a governance role;
4. run `npm run validate`.

### Change Presidium responsibilities

Edit governance assignments and source-document reference; do not edit member names on multiple pages.

### Publish a General Meeting

1. create one activity Markdown record;
2. add its canonical PDFs to the document manifest/public tree;
3. optionally publish a shared news item with `scopes: ['institute', 'ncutam']` or `['ncutam']`;
4. link the news record from the activity if useful.

### Publish a conference announcement

Use shared news for the announcement; create/update the durable conference activity record when there is long-term reference value.

### Add media coverage

Add one `ncutamMedia` entry; create no local article unless the underlying Committee action deserves its own initiative record.

## 18. Migration population order

To minimize broken references during WP6 implementation/migration, populate in this order:

1. institutions;
2. canonical documents already verified;
3. members;
4. governance;
5. evergreen pages;
6. durable activities;
7. media mentions;
8. news scope annotations;
9. galleries/images and final cross-links;
10. validation fixes.

The unresolved 1992 files can be added later without blocking the rest of the section.

## 19. WP4 decisions fixed for WP5/WP6

The following are now architectural commitments:

- existing `news` gets `scopes`, defaulting to `['institute']`;
- NCUTAM structured data is managed through Astro collections, not ad-hoc page-local arrays;
- institutions are normalized separately from members;
- members and governance are separate, linked datasets;
- current leadership is derived from governance, never hard-coded in site config;
- one Markdown collection holds all durable activities with typed subdirectories;
- a small `international` activity subtype is added to represent durable IUTAM/international records without creating a competing evergreen international section;
- documents use a manifest and stable `/documents/ncutam/...` public paths;
- media mentions are external-link data records, not local article pages;
- evergreen About/IUTAM/home narrative uses Markdown with mandatory bilingual content;
- the current bilingual news-body convention is generalized and reused;
- a dedicated `check:ncutam` semantic validator is required before cutover.

**WP4 status: COMPLETE.**

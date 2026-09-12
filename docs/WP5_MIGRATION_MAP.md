# WP5 — NCUTAM migration map

**Date:** 2026-09-12  
**Source:** current Publii export in `mfs9697/ncutam`  
**Target:** `mfs9697/inmech-site`  
**Depends on:** WP2 content audit, WP3 route architecture, WP4 content model.

## 1. Purpose

WP5 fixes the exact migration destination of every canonical legacy page before implementation begins.

The machine-readable companion file is [`migration/legacy-routes.yaml`](../migration/legacy-routes.yaml). WP6 should treat that file as the route/content import contract; WP7 should reuse it as the redirect/legacy-stub source rather than recreating redirects manually.

Rules:

- one durable subject -> one canonical target record;
- merged legacy pages become aliases, not duplicate target content;
- shared news keeps its existing Inmech canonical URL;
- press mentions do not get local article pages;
- old Publii presentation/generated routes are not migrated as content;
- target record IDs are stable ASCII IDs and are fixed by this map unless implementation exposes a genuine collision/problem.

## 2. Exact map of the 26 sitemap URLs

| # | Legacy URL | Disposition | Target / canonical record |
|---:|---|---|---|
| 1 | `/` | KEEP / REWRITE | `/ncutam/`; `ncutamPages: home` |
| 2 | `/11-ta-mizhnarodna-naukova-konferenciya-matematichni-problemi-mehaniki-neodnoridnih-struktur.html` | KEEP | `/ncutam/activity/conferences/mathematical-problems-heterogeneous-structures-2024/`; `ncutamActivities: conferences/mathematical-problems-heterogeneous-structures-2024` |
| 3 | `/anons-mizhnarodna-naukova-konferenciya-aktualni-problemi-mehaniki-i-mashinoznavstva-2026.html` | MERGE | `/ncutam/activity/conferences/apmme-2026/`; `ncutamActivities: conferences/apmme-2026` |
| 4 | `/dokumenti.html` | KEEP / REBUILD | `/ncutam/documents/`; generated from `ncutamDocuments` |
| 5 | `/kerivnictvo-komitetu.html` | MERGE | `/ncutam/governance/`; generated from `ncutamGovernance` + `ncutamMembers` |
| 6 | `/konferenciya-aktualni-problemi-mehaniki-2023.html` | KEEP | `/ncutam/activity/conferences/current-problems-mechanics-2023/`; `ncutamActivities: conferences/current-problems-mechanics-2023` |
| 7 | `/kontakti.html` | MERGE | `/ncutam/#contacts`; landing-page contact block |
| 8 | `/mehanika-nadzvichayno-vazhliva-ale-duzhe-nedoocinena-v-ukrayini-nauka-intervyu-akademika-vyacheslava-bogdanova.html` | MERGE | `/ncutam/activity/media/#nasu-bogdanov-interview-2026-02-21`; `ncutamMedia: nasu-bogdanov-interview-2026-02-21` |
| 9 | `/mizhnarodna-naukova-konferenciya-mehanika-suchasnist-i-perspektivi-2024.html` | KEEP | `/ncutam/activity/conferences/mechanics-present-and-prospects-2024/`; `ncutamActivities: conferences/mechanics-present-and-prospects-2024` |
| 10 | `/mizhnarodniy-soyuz-teoretichnoyi-i-prikladnoyi-mehaniki-iutam.html` | KEEP / REWRITE | `/ncutam/iutam/`; `ncutamPages: iutam` |
| 11 | `/naslidki-budut-fatalni-unian-pro-zakliki-naukovciv-shchodo-poryatunku-mostu-patona.html` | MERGE | `/ncutam/activity/initiatives/paton-bridge/`; `ncutamActivities: initiatives/paton-bridge`; media child `unian-paton-bridge-2026-02-26` |
| 12 | `/naukova-spilnota-knuba-popovnila-lavi-nacionalnogo-komitetu.html` | MERGE | `/ncutam/activity/media/#knuba-membership-2023-12-16`; `ncutamMedia: knuba-membership-2023-12-16`; membership facts go to members/meeting data |
| 13 | `/novini.html` | REDIRECT | `/ncutam/news/`; no content record (empty legacy page) |
| 14 | `/pamyat.html` | KEEP / REBUILD | `/ncutam/members/in-memoriam/`; filtered `ncutamMembers` |
| 15 | `/predstavnika-ukrayini-obrano-do-komitetu-rannoyi-karieri-iutam.html` | REDIRECT | existing Inmech `/news/2026/2026-03-19-iutam-committee/`; `news: 2026/2026-03-19-iutam-committee` |
| 16 | `/prezidiya-komitetu.html` | MERGE | `/ncutam/governance/`; same canonical governance dataset as #5 |
| 17 | `/pro-komitet.html` | KEEP / REWRITE | `/ncutam/about/`; `ncutamPages: about` |
| 18 | `/profesorku-ntu-hpi-tetyanu-shmatko-obrano-do-skladu-nacionalnogo-komitetu.html` | MERGE | `/ncutam/activity/media/#ntu-khpi-shmatko-2026-01-27`; `ncutamMedia: ntu-khpi-shmatko-2026-01-27`; membership fact goes to member/meeting data |
| 19 | `/sklad.html` | KEEP / REBUILD | `/ncutam/members/`; generated from `ncutamMembers` + `ncutamInstitutions` |
| 20 | `/visoke-viznannya-naukovoyi-spilnoti-dnu-podyaka-nan-ukrayini-ta-novi-oblichchya-u-nacionalnomu-komiteti.html` | MERGE | `/ncutam/activity/media/#dnu-recognition-membership-2023-12-04`; `ncutamMedia: dnu-recognition-membership-2023-12-04` |
| 21 | `/zagalni-zbori-12-veresnya-2023.html` | MERGE | `/ncutam/activity/meetings/2023-09-12/`; `ncutamActivities: meetings/2023-09-12` |
| 22 | `/zagalni-zbori-2023.html` | KEEP / CANONICALIZE | same `/ncutam/activity/meetings/2023-09-12/`; richer base record plus meeting packet |
| 23 | `/zagalni-zbori-mizhnarodnogo-soyuzu-teoretichnoyi-ta-prikladnoyi-mehaniki-iutam.html` | KEEP | `/ncutam/activity/international/iutam-general-members-meeting-2024/`; `ncutamActivities: international/iutam-general-members-meeting-2024` |
| 24 | `/zagalni-zbori-nacionalnogo-komitetu-ukrayini-z-teoretichnoyi-i-prikladnoyi-mehaniki-11-listopada-2025-roku.html` | KEEP / CANONICALIZE | `/ncutam/activity/meetings/2025-11-11/`; `ncutamActivities: meetings/2025-11-11` |
| 25 | `/zagroza-ruynuvannya-realna-nacionalniy-komitet-zaklikaie-do-negaynogo-remontu-mostu-patona.html` | MERGE | same Paton Bridge initiative as #11; media child `liga-paton-bridge-2026-03-25` |
| 26 | `/zviti.html` | KEEP / REBUILD | `/ncutam/documents/reports/`; annual-report subset of `ncutamDocuments` |

Every durable route above has the paired English route under `/en/ncutam/...` with the same ASCII slug. The existing shared-news record uses `/en/news/2026/2026-03-19-iutam-committee/`.

## 3. Generated archive aliases

The Publii archive routes are not content records but have meaningful inbound-link value:

| Legacy archive | Target |
|---|---|
| `/novini/` | `/ncutam/news/` |
| `/m/` | `/ncutam/activity/media/` |
| `/konferenciyi/` | `/ncutam/activity/conferences/` |

Publii author pages, pagination pages and old feeds are generated artifacts and are not imported. They may be left unavailable after cutover unless WP7 identifies meaningful external traffic that justifies a generic redirect.

## 4. Canonical activity records fixed by WP5

### Meetings

- `meetings/2023-09-12`
- `meetings/2025-11-11`

The two 2023 Publii pages are aliases of one record. The richer page is the editorial base; the official meeting packet is the stronger documentary layer.

### Conferences

- `conferences/current-problems-mechanics-2023`
- `conferences/mathematical-problems-heterogeneous-structures-2024`
- `conferences/mechanics-present-and-prospects-2024`
- `conferences/apmme-2026`

The APMME 2026 legacy item was an announcement. It must be rewritten as a completed conference record and may reference existing Inmech conference news rather than preserving announcement tense.

### Initiatives

- `initiatives/paton-bridge`

This is one canonical Committee initiative. The UNIAN and LIGA.net legacy pages become two media references attached to it, not two competing local narratives.

### International activity

- `international/iutam-general-members-meeting-2024`

This record covers the 25–30 August 2024 IUTAM General Members Meeting in Daegu. The evergreen `/ncutam/iutam/` page links to it but does not duplicate its dated narrative.

## 5. Media records fixed by WP5

The initial `ncutamMedia` IDs are:

- `nasu-bogdanov-interview-2026-02-21`;
- `knuba-membership-2023-12-16`;
- `dnu-recognition-membership-2023-12-04`;
- `ntu-khpi-shmatko-2026-01-27`;
- `unian-paton-bridge-2026-02-26`;
- `liga-paton-bridge-2026-03-25`.

For the three membership-related media records, the external article is the media source, while the durable fact that a person is a Committee member lives in `ncutamMembers` and, where appropriate, the relevant General Meeting record.

## 6. Source-of-truth document map

### Confirmed Drive sources

Use these as implementation sources rather than copying ambiguous Publii binaries when both exist:

| Target document/data | Source | Target public path / use |
|---|---|---|
| Current Presidium responsibilities | Drive `Розподіл повноважень-2025.docx`, file ID `1yeZ5T62FRl4Fnzu4hZyNm4oPsHrgBk5D` | primary data source for `ncutamGovernance`; publish a PDF only if intentionally prepared |
| Annual report 2023 | Drive `Звіт НКУТПМ 2023.pdf`, ID `1FiIEiyZwU8TS7LiecA_Wxw0wZ_tclsET` | `/documents/ncutam/reports/2023/ncutam-report-2023.pdf` |
| Annual report 2024 | Drive `Звіт НКУТПМ 2024.pdf`, ID `1AiFdY1yj9NPR3Ki5nn9_t5crl5bcR9SR` | `/documents/ncutam/reports/2024/ncutam-report-2024.pdf` |
| Annual report 2025 | Drive `Звіт НКУТПМ 2025.pdf`, ID `19vBKP5qLDOxEBTrMC4ezKroUOYsvaa--` | `/documents/ncutam/reports/2025/ncutam-report-2025.pdf` |
| NASU Presidium Resolution No. 26, 24 Jan 2024 | Drive `240124 № 26.pdf`, ID `15GzibucpZa1gdfqmzQpWxIZnCMDPVWlL` | `/documents/ncutam/governance/2024/nasu-resolution-26-2024-01-24.pdf` |

Supporting 2025 meeting sources also exist in Drive (`Presentation.pdf`, the reporting presentation, and `Звітна доповідь_11.11.25.docx`). They are evidence for the narrative; they should not automatically become public downloads merely because they exist.

### 2023 General Meeting packet

The Publii export contains the actual PDF packet as individual files (`01 Протокол.pdf`, `02 Додаток до Протоколу.pdf`, the numbered decisions and annexes). WP6 should migrate the verified packet into:

`/documents/ncutam/meetings/2023-09-12/`

with descriptive ASCII filenames and manifest IDs. The broken legacy pseudo-folder link `media/files/Збори 2023` is not reproduced.

### 1992 documents — blocked until verification

Keep the following as a WP6 verification gate rather than silently migrating incorrect labels:

- creation resolution (1992);
- first Statute (1992);
- 1992 Committee regulation.

The old `dokumenti.html` maps at least two labels to the same binary, so the `ncutamDocuments` manifest must not expose an unverified `1992 regulation` record. The verified 2024 resolution and annual reports can be published independently of this blocker.

## 7. Image/assets migration map

Only original content images move. Publii thumbnails, responsive derivatives, theme CSS/JS/fonts and generated SVG maps do not.

| Source class | Target |
|---|---|
| `media/posts/16/gallery/conf2023_*.jpg` originals | `/images/ncutam/conferences/current-problems-mechanics-2023/` |
| `media/posts/19/gallery/conf2024_*.jpg` originals | `/images/ncutam/conferences/mechanics-present-and-prospects-2024/` |
| `media/posts/20/gallery/Commitee2025_*.jpg` originals | `/images/ncutam/meetings/2025-11-11/` (rename to correct ASCII `committee-*`) |
| `media/posts/23/IUTAM-2.png` | `/images/ncutam/iutam/iutam-2.png` if retained in the redesign |
| `media/website/NCUTAM2.png` | `/images/ncutam/identity/` only if the identity treatment actually uses the old artwork |

The 2024 heterogeneous-structures conference and APMME-2026 records should use source images only where a verified original exists; do not invent a hero image merely to make cards visually uniform.

## 8. Member/governance migration map

### Members

`sklad.html` is not imported as Markdown. It is parsed/reconciled into:

- `src/data/ncutam/institutions.yaml`;
- `src/data/ncutam/members.yaml`.

`pamyat.html` contributes records/status changes to the same member dataset (`status: in-memoriam`). Where a person occurs in both source lists, there must be one member ID only.

Initial related membership media pages must not create duplicate member records. They only help verify person/institution/joined-year details.

### Governance

`kerivnictvo-komitetu.html` and `prezidiya-komitetu.html` are not imported as narrative pages. They contribute to the current governance dataset, but the approved 1 December 2025 responsibilities document is authoritative for role/responsibility content.

## 9. Shared-news mapping

The legacy Early Career IUTAM article maps to the existing Inmech record:

`src/content/news/2026/2026-03-19-iutam-committee.md`

Under the current Inmech news route implementation, the collection ID includes the year directory, giving the canonical public route:

`/news/2026/2026-03-19-iutam-committee/`

WP6 only needs to add `scopes: ["institute", "ncutam"]`; it must not create another Markdown copy under the NCUTAM content tree.

The APMME-2026 activity record should also review existing Inmech conference news (including the Section 2 record) for `relatedNews` links rather than duplicating those news narratives.

## 10. Redirect semantics for WP7

WP5 records the **desired destination**, not the mechanism. The current legacy site is GitHub Pages, so true server-side 301 control may not be available for every old path.

WP7 should therefore implement the strongest feasible continuity mechanism, in this order:

1. server/CDN redirects if the deployment layer supports them;
2. otherwise preserved static redirect stubs at important legacy paths;
3. canonical/meta-refresh/JS fallback only where infrastructure constraints require it.

Priority aliases to preserve are all 26 sitemap URLs plus `/novini/`, `/m/` and `/konferenciyi/`. Author/pagination/feed artifacts do not receive one-to-one stubs by default.

## 11. WP6 implementation order derived from the map

To reduce broken intermediate states, implement in this order:

1. **schema/infrastructure:** collections, `scopes`, bilingual utility, NCUTAM routes/layout/local navigation;
2. **core structured data:** institutions, members, governance;
3. **evergreen pages:** home, About, IUTAM;
4. **documents:** manifest + verified 2023/2024/2025 reports + 2024 resolution;
5. **activities:** meetings, conferences, Paton Bridge, IUTAM 2024;
6. **media:** six initial press mentions and links to related member/activity records;
7. **assets:** original galleries/identity images only;
8. **shared news:** dual-scope existing IUTAM article and related-news links;
9. **indexes/search/sitemap:** activity/document/member/news filtered views;
10. **validation:** `check:ncutam` plus existing Inmech validation before redirect work.

The unresolved 1992 document mapping is deliberately isolated so it does not block the rest of WP6.

## 12. WP5 completion criterion

WP5 is complete when:

- every one of the 26 canonical sitemap URLs has one exact target;
- duplicate/merged legacy pages share one target record;
- target record IDs are fixed;
- archive aliases are mapped;
- current news is reused rather than copied;
- verified document sources and target paths are identified;
- original-media migration directories are fixed;
- unresolved document provenance is explicitly marked as a verification gate;
- the map exists in machine-readable form for WP7.

**WP5 status: COMPLETE.**

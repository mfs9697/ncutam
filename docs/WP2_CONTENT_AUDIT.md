# WP2 — NCUTAM content audit

**Date:** 2026-09-12  
**Scope:** migration of the current Publii-generated NCUTAM site into the Institute of Mechanics Astro site (`mfs9697/inmech-site`).  
**Input:** WP1 source inventory, the published Publii export in this repository, existing Inmech Astro content, and relevant source-of-record material found in Google Drive.

## 1. Audit rule

The migration is not a page-for-page copy. Each legacy item is classified as one of:

- **KEEP** — preserve the information as a durable target page or structured record;
- **MERGE** — preserve the useful information, but combine it with another canonical record;
- **REDIRECT** — do not migrate a second copy; point the legacy URL to an existing/new canonical target;
- **DROP** — Publii-only, empty, duplicate, generated, or otherwise not worth carrying into the new information architecture.

The Publii HTML is evidence of what was published, not the future content model. Presentation markup, theme assets, responsive derivatives, author pages, tag pagination, feeds, and other generated CMS artifacts are not canonical content.

## 2. Source precedence

When sources disagree, use the following precedence:

1. signed/approved Committee or NASU source documents;
2. current Committee working records whose status can be established (for example the approved 2025 distribution of Presidium responsibilities);
3. the published Publii page as a historical publication snapshot;
4. external media or third-party institutional pages as supporting evidence only.

Historical statements must retain their date context. A statement such as “186 members in 2025” is a 2025 snapshot, not a live membership total.

## 3. Decision on news

### Recommended model

NCUTAM should **not** have a second independent news system.

Use the existing Inmech `news` collection as the only editorial news source. Add an explicit organizational scope/section field (for example `sections: ["ncutam"]` or equivalent) so that the same news item can:

- appear in the Institute news stream when institutionally relevant;
- appear automatically on the NCUTAM landing page;
- be listed in a filtered `/ncutam/news/` view without duplicating content.

This is better than treating `НКУТПМ` as an ordinary topic tag: current Inmech public tags are thematic (`конференції`, `співпраця`, `публікації`, etc.), whereas NCUTAM is an organizational scope.

The existing Inmech item `src/content/news/2026/2026-03-19-iutam-committee.md` proves that this model already works conceptually: it is an Institute news record that is simultaneously NCUTAM content.

### What should remain a news item

Use news for genuinely time-bound updates:

- elections/appointments of clear public importance;
- new Committee initiatives or official statements;
- calls, announcements, deadlines, and upcoming events;
- major international representation results;
- publication or launch announcements.

### What should *not* live only as news

Material with long-term reference value should have a durable canonical record, even if a short news item is also published at the time:

- General Meetings and their decisions/materials;
- conference records;
- Committee governance and membership;
- official documents and annual reports;
- major expert initiatives/positions;
- IUTAM relationship and durable international activity history.

### Media coverage

The old “Медіа про нас” model should not be migrated as a set of locally rewritten press articles. Replace it with a curated **Media / Press mentions** list containing a short neutral description, source, date, and `externalUrl`.

Exception: if media coverage documents a substantive Committee initiative, the initiative should have its own canonical Committee page and media links should be attached to it. The Paton Bridge case is the clearest example.

## 4. Canonical content groups after audit

The legacy content resolves into these durable groups:

1. **Committee landing / about** — identity, mandate, base institution, short mission, contacts, latest activity.
2. **Governance** — leadership, Presidium, approved distribution of responsibilities.
3. **Members** — structured current membership; separate in-memoriam status/history.
4. **IUTAM / international representation** — durable relationship page plus dated international activity records.
5. **General Meetings** — dated archival records with decisions, reports, photos, and documents.
6. **Conferences** — dated archival event records; upcoming-event announcements may additionally be news.
7. **Documents** — normative documents and official records.
8. **Reports** — annual Committee reports.
9. **Expert initiatives / positions** — durable public-interest actions such as the Paton Bridge initiative.
10. **News** — a filtered view of the shared Inmech news collection.
11. **Media mentions** — external-source cards, not duplicated long-form articles.

## 5. Audit of the 26 sitemap URLs

| Legacy item | Decision | Canonical treatment |
| --- | --- | --- |
| `/` | **KEEP / REWRITE** | NCUTAM landing page. Preserve identity, mandate and base-institution facts; replace broad promotional prose with a concise institutional overview and dynamic latest activity. |
| `11-ta-mizhnarodna-naukova-konferenciya-matematichni-problemi-mehaniki-neodnoridnih-struktur.html` | **KEEP** | Durable conference record. Preserve Committee role, dates, factual summary and useful links. |
| `anons-mizhnarodna-naukova-konferenciya-aktualni-problemi-mehaniki-i-mashinoznavstva-2026.html` | **MERGE** | The announcement is now historical. Merge into one canonical APMME-2026 conference/activity record; a past announcement should not survive as a separate permanent article. |
| `dokumenti.html` | **KEEP / REBUILD** | Structured document index. Do not carry current incorrect/duplicate file links forward. |
| `kerivnictvo-komitetu.html` | **KEEP / REBUILD** | Leadership view generated from governance data rather than manually duplicated names/titles. |
| `konferenciya-aktualni-problemi-mehaniki-2023.html` | **KEEP** | Strong archival conference record; preserve factual summary and original gallery images. |
| `kontakti.html` | **MERGE** | Contacts are small enough to live on the NCUTAM landing/about page. Redirect old URL to the contact section. |
| `mehanika-nadzvichayno-vazhliva-ale-duzhe-nedoocinena-v-ukrayini-nauka-intervyu-akademika-vyacheslava-bogdanova.html` | **MERGE** | Convert to a Media/Press mention linking to the original interview; do not preserve a separate rewritten local article. |
| `mizhnarodna-naukova-konferenciya-mehanika-suchasnist-i-perspektivi-2024.html` | **KEEP** | Durable conference record, including Committee role, attendance facts and original gallery assets. |
| `mizhnarodniy-soyuz-teoretichnoyi-i-prikladnoyi-mehaniki-iutam.html` | **KEEP / REWRITE** | Core institutional IUTAM page. Verify current terminology/facts when editing; preserve 1992 relationship history where supported. |
| `naslidki-budut-fatalni-unian-pro-zakliki-naukovciv-shchodo-poryatunku-mostu-patona.html` | **MERGE** | Attach as a media reference to one canonical Paton Bridge expert-initiative page. |
| `naukova-spilnota-knuba-popovnila-lavi-nacionalnogo-komitetu.html` | **MERGE** | Preserve as a press mention if the external source remains useful; the durable membership fact belongs in structured member data. |
| `novini.html` | **DROP / REDIRECT** | Empty Publii page. Redirect to the filtered NCUTAM news view. |
| `pamyat.html` | **KEEP / REBUILD** | Preserve as an in-memoriam member archive, preferably using the same member data model with status/history rather than a second free-form name list. |
| `predstavnika-ukrayini-obrano-do-komitetu-rannoyi-karieri-iutam.html` | **REDIRECT** | Duplicate topic already migrated to Inmech as `2026-03-19-iutam-committee.md`; use the Inmech record as canonical. |
| `prezidiya-komitetu.html` | **KEEP / REBUILD** | Durable governance page. The approved “Розподіл повноважень…” document dated 1 Dec 2025 is a stronger source than the rendered Publii markup. |
| `pro-komitet.html` | **KEEP / REWRITE** | About/mandate page. Retain stable institutional facts; move time-bound 2025 priorities into dated activity/meeting records where appropriate. |
| `profesorku-ntu-hpi-tetyanu-shmatko-obrano-do-skladu-nacionalnogo-komitetu.html` | **MERGE** | Membership fact -> member data; external institutional coverage -> media mention. Do not retain a standalone local article solely for one member election. |
| `sklad.html` | **KEEP / REBUILD** | High-value canonical content, but convert the long HTML list to structured member data (`name`, city/institution, year joined, status, external profile, governance role as applicable). |
| `visoke-viznannya-naukovoyi-spilnoti-dnu-podyaka-nan-ukrayini-ta-novi-oblichchya-u-nacionalnomu-komiteti.html` | **MERGE** | External-media record; membership facts belong in structured data. |
| `zagalni-zbori-12-veresnya-2023.html` | **MERGE** | Merge into the richer canonical 12 Sep 2023 General Meeting record. |
| `zagalni-zbori-2023.html` | **KEEP / CANONICALIZE** | Use as the base archival meeting record because it includes governance outcomes and links to meeting materials; repair broken/missing document links from authoritative sources. |
| `zagalni-zbori-mizhnarodnogo-soyuzu-teoretichnoyi-ta-prikladnoyi-mehaniki-iutam.html` | **KEEP AS ACTIVITY RECORD** | Preserve as dated IUTAM/international activity, not as evergreen institutional prose. |
| `zagalni-zbori-nacionalnogo-komitetu-ukrayini-z-teoretichnoyi-i-prikladnoyi-mehaniki-11-listopada-2025-roku.html` | **KEEP / CANONICALIZE** | High-value General Meeting record: report summary, decisions, Presidium changes, new members, photos and supporting documents. |
| `zagroza-ruynuvannya-realna-nacionalniy-komitet-zaklikaie-do-negaynogo-remontu-mostu-patona.html` | **MERGE / ELEVATE** | Create one durable Committee expert-initiative page about the Paton Bridge intervention; attach LIGA/UNIAN and other coverage as external references. This is stronger than a “media about us” article. |
| `zviti.html` | **KEEP / REBUILD** | Structured annual report index linked to canonical report binaries; preserve year-specific summaries only if useful and fact-checked. |

## 6. Generated archive routes outside the sitemap

These are views, not independent canonical content:

- `/novini/` — replace with the filtered NCUTAM view of the shared Inmech news collection;
- `/m/` — replace with a compact Media / Press mentions view;
- `/konferenciyi/` — replace with a conference/activity archive generated from structured records;
- Publii author routes — **DROP**;
- Publii pagination routes — **DROP**;
- Publii feeds/sitemap files — **DROP as source**, regenerate through Astro only if required.

## 7. Document audit

### Annual reports

Drive contains strong candidates for canonical report files:

- `Звіт НКУТПМ 2025.pdf`;
- `Звіт про діяльність Національного комітету України з теоретичної і прикладної механіки у 2024 році.docx` and corresponding PDF copies;
- `Звіт НКУТПМ 2023.docx` and `Звіт НКУТПМ 2023.pdf`.

Use the final signed/finalized PDF as the public binary; retain editable source documents outside the public tree unless there is a specific reason to publish them.

### Governance / Presidium

`Розподіл повноважень-2025.docx` contains an approval block dated **1 December 2025** and the detailed Presidium responsibilities. Treat it as the primary source for the current responsibilities displayed on the website.

### 2024 regulation

Drive contains `240124 № 26` in DOCX/PDF form, corresponding to the 24 January 2024 Presidium resolution referenced by the website. Prefer the official PDF version for publication after verifying that it matches the currently linked binary.

### 1992 foundation documents

The Publii document page contains at least one clear link error: the item labelled “Положення про Національний комітет (редакція 1992 року)” points to the same `Постанова про створення Комітету.pdf` used for the creation resolution. Do **not** migrate this mapping as-is.

The exact canonical binaries for the 1992 creation resolution/statute/regulation should be verified before cutover. Until then, the Publii binaries are historical source material, not confirmed authoritative mappings.

## 8. Media and image audit

Preserve original images with durable value:

- conference photo galleries;
- General Meeting galleries;
- IUTAM-related original image(s);
- Committee identity/logo artwork where it remains useful.

Do not migrate Publii-generated responsive copies/thumbnails as canonical media. Reuse originals and let the target site generate/display responsive variants according to the Inmech architecture.

## 9. Known corrections to apply during migration

- old Ukrainian pages incorrectly declare `lang="en"`;
- `novini.html` is an empty duplicate of the real news archive;
- the 2023 General Meeting exists as two overlapping pages;
- the detailed 2023 meeting page contains a broken/incomplete meeting-document link;
- the document page contains an incorrect duplicate mapping for a 1992 document;
- contact/external links include legacy HTTP URLs;
- snapshot statistics (membership totals, counts of institutions, etc.) must remain attached to their historical date;
- Publii author/share/related-post metadata should not be migrated as Committee content.

## 10. WP2 conclusion

The useful legacy site is significantly smaller than the raw Publii export.

The migration should preserve **institutional records and historical evidence**, not the old publishing structure. The strongest target architecture is therefore a compact NCUTAM section inside Inmech, backed by structured governance/member/document/activity data and the **existing shared Inmech news collection**.

### Inputs now fixed for WP3

WP3 should design the target Astro architecture around:

- `/ncutam/` as the institutional landing point;
- a shared Inmech news collection filtered by NCUTAM scope;
- structured member/governance data;
- General Meeting and conference/activity archives;
- document/report manifests;
- an expert-initiatives layer for substantive public positions;
- a lightweight external Media / Press mentions list;
- explicit legacy redirects derived from the audit table above.

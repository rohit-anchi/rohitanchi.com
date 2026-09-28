# RohitAnchi.com — Reference Site Analysis & Site Strategy

## Context

Rohit Anchi is building RohitAnchi.com (Astro, static, GitHub Pages). The repo
`rohit-anchi/rohitanchi.com` is empty (branch `claude/focused-euler-vgjuxm`, no commits).
Rohit asked for a structural analysis of three reference sites and a concrete
IA / content model / backlog, grounded in the resume they uploaded (Rohit_Anchi.docx, read in full).

**Source caveat:** the sandbox's network policy blocks `vishalgandhi.in`, `huyenchip.com`
and `simonwillison.net`, so I could not crawl them live. The analysis below uses web-search
results (which confirmed URL patterns like `vishalgandhi.in/tags/<tag>/`, `/page/2/`,
`huyenchip.com/books/`, `simonwillison.net/tags/<tag>/`, `/dashboard/by-month/`,
`til.simonwillison.net`) plus well-known public facts about these sites. Details marked
*(inferred)* should be spot-checked. To allow live crawling, add those hosts under
Network access in the cloud environment settings.


---

# PART A — ANALYSIS

## A1. vishalgandhi.in — "The Data Column" (Docusaurus)

**1. Information architecture**
```text
/                      Blog index (the homepage *is* the post list, paginated)
├── /page/2/ …         Pagination
├── /<post-slug>/      Posts routed at root (e.g. /rest-api-design-rules/, /api-clients/)
├── /tags/             Tag index
│   └── /tags/<tag>/   e.g. /tags/minio/, /tags/insomnia/, /tags/pbm/
├── /archive           (inferred: Docusaurus blog archive)
├── /docs/…            (inferred: Docusaurus docs section, if enabled)
└── /rss.xml, /atom.xml (Docusaurus default feeds, inferred)
```
Homepage sequence: site title and tagline → reverse-chronological post cards (title, date,
author, reading time, excerpt, tags) → pagination. No separate landing page.

**2. Content model:** one main type, the technical tutorial/analysis post (MongoDB/Percona
replica sets, MinIO S3 storage, Docker Compose, REST API design rules, API-client landscape,
MCP for enterprise AI). Metadata: title, date, author, tags, reading time (Docusaurus
defaults). Discovery: chronological list plus flat tags. Many tags have one post ("One post
tagged with…"), which is a sign of tag sprawl.

**3. Positioning:** implicit. The brand is "The Data Column" (the topic), not the person.
Authority comes from depth of hands-on material. There are few explicit credentials on the
homepage.

**4. Cadence/format:** mostly long-form how-tos, published occasionally. There is no
short-form channel, so gaps between posts show.

**5. Conversion:** feeds, and social/GitHub links in the navbar or footer *(inferred)*.
No explicit "work with me" CTA.

**6. Adopt:** a Markdown-first, docs-style reproducible technical depth; root-level clean
slugs; auto reading time; tag pages generated for free; a named column/brand for the writing.

**7. Avoid:** homepage = post list (no positioning); one-off tags with no curation; framework
default look; no statement of who the author is or why to trust them.

## A2. huyenchip.com — personal authority site (Jekyll)

**1. Information architecture** *(inferred from known structure)*
```text
/                       Landing: short bio + photo + books + recent posts
├── /blog/              Full post list (chronological)
│   └── /YYYY/MM/DD/<slug>.html   Dated long-form essays
├── /books/             Designing ML Systems (O'Reilly 2022), AI Engineering (O'Reilly 2025),
│                       earlier books; translations, purchase links
├── /ml-interviews-book/  Free online book (evergreen resource, separate sub-site)
├── /mlops/ (guides/resources)  Curated resource pages
├── /about/ or bio on home   Career, teaching, contact
└── /feed.xml           RSS
```
Homepage sequence: who I am (1 paragraph: writer and AI/ML systems practitioner; Stanford
teaching; NVIDIA, Snorkel AI, startup founder) → books, the main proof → selected or recent
writing → social/contact links.

**2. Content model:** long evergreen essays (10–30 min reads such as "Building a generative
AI platform", "Agents", "RLHF", "Real-time ML"), books, free online book, curated resource
lists. Metadata is minimal: date, title, sometimes a table of contents. Few or no tags.
Discovery works through a curated "popular/selected" set and the chronological list.

**3. Positioning:** very explicit and person-centric. Credibility stack: two O'Reilly books
(AI Engineering was the most-read book on O'Reilly after release), Stanford CS 329S course,
named employers, startup founder, GitHub repos with large star counts, translations.

**4. Cadence/format:** low frequency (a few essays a year) with very high value per post.
Variety comes from reusing assets: book chapters become essays, essays become resource pages
and GitHub repos.

**5. Conversion:** book purchase links, newsletter/mailing list, Twitter/X, LinkedIn,
GitHub, Discord community *(inferred)*. The CTA is "read my book / follow", not consulting.

**6. Adopt:** a 1-paragraph first-person positioning at the top; a proof strip made of
*artifacts* (books, courses, open-source work); flagship evergreen essays that act as
reference material; one or two "canonical" long pieces people link to.

**7. Avoid:** relying on a book-level credential Rohit doesn't have yet; sparse metadata and
weak topical discovery; long silences between posts; resources split across sub-sites with
inconsistent navigation.

## A3. simonwillison.net — high-frequency weblog (Django, open source)

**1. Information architecture**
```text
/                           Mixed stream grouped by day + sidebar (about blurb, highlights)
├── /YYYY/Mon/D/<slug>/     Entries (long-form)
├── /YYYY/Mon/D/<slug>/     Blogmarks (links + commentary), quotations, notes — same date routing
├── /tags/<tag>/            Tag pages (also combinable: /tags/a+b/), each with its own feed
├── /series/<slug>/         Ordered multi-part series
├── /search/?q=…            Faceted search (type, tag, year)
├── /dashboard/by-month/    Archive/stat dashboards
├── /about/                 Bio, projects, disclosures
├── /atom/everything/, /atom/entries/  Feeds by type
├── til.simonwillison.net   Separate TIL site (short learned-today notes, from a GitHub repo)
└── Newsletter (Substack), GitHub Sponsors
```
Homepage sequence: short identity line (creator of Datasette, co-creator of Django) → the
day-grouped stream (entries at full length or truncated, links with commentary, quotes)
→ sidebar with highlights/series → archive navigation.

**2. Content model:** five types (entry, blogmark/link, quotation, note, TIL) plus series.
Metadata: date/time, type, tags (dense, controlled, including person tags for credited
authors), related series. Discovery: tags (the main axis), search, series, month archives.

**3. Positioning:** implicit through volume and consistency, with an explicit short bio.
Credibility: Django, Datasette, coining "prompt injection", heavy citation by others,
open-source repos. Authority is *earned by the record*.

**4. Cadence/format:** several items per day. Short forms (a link with 2–3 sentences of
commentary, a quote, a note) sustain frequency. Long entries appear when warranted. TILs
capture learning cheaply.

**5. Conversion:** Atom feeds per tag/type, a newsletter that digests the blog, sponsors,
Mastodon/Bluesky/GitHub links. Heavy outbound linking and crediting creates goodwill and
inbound links.

**6. Adopt:** multiple content types with low-friction short forms; type-aware routing and
feeds; a curated tag vocabulary; series for multi-part arcs; a "link + my take" format;
crediting sources; a "working in public" posture.

**7. Avoid:** homepage overload for first-time visitors; the daily volume is not sustainable
alongside a 30-person org; blog-first density buries the "who is this / why hire or invite
him" story that a product leader needs.

## A4. Comparative synthesis

| Dimension | vishalgandhi.in | huyenchip.com | simonwillison.net |
|---|---|---|---|
| Homepage purpose | Post list (archive-first) | Personal landing / authority | Live activity stream |
| Positioning clarity | Low (topic brand) | High (explicit bio + books) | Medium (short bio, record speaks) |
| Topic discovery | Flat, sprawling tags | Curated selected list; few tags | Controlled tags, series, faceted search |
| Publishing model | Occasional long tutorials | Rare flagship essays + books | Daily multi-format stream |
| Professional proof | Implicit (depth) | Books, Stanford, employers, GitHub | Open-source record, citations |
| Conversion paths | Feeds, socials | Books, newsletter, socials | Per-tag feeds, newsletter, sponsors |
| Personal voice | Instructional, neutral | Clear first-person expert | Strong, opinionated, conversational |
| Evergreen structure | Weak (chronological) | Strong (flagship essays, guides, books) | Medium–strong (series, tags, TILs) |

**Synthesis for Rohit:** take the *landing-page positioning and proof* pattern from Huyen,
the *multi-format content model, tags and series* from Willison (at a sustainable
cadence), and the *Markdown-first technical depth plus reading time and tag pages* from
Gandhi. The one thing none of them has, and Rohit's differentiator, is **quantified
enterprise outcomes plus case studies**, because his authority is operational rather than
academic or open-source.

---

# PART B — RECOMMENDATION FOR ROHITANCHI.COM

## B1. Information architecture (Astro static, GitHub Pages)

```text
/                                   Home (landing, not a feed)
├── /about/                         Narrative bio, career timeline, awards, education, certs
│   └── /about/now/                 "Now" page: current focus (updated monthly)
├── /writing/                       All long-form (essays + frameworks + architecture notes)
│   ├── /writing/<slug>/
│   └── /writing/page/<n>/
├── /notes/                         Field notes (short-form, 150–600 words)
│   └── /notes/<slug>/
├── /case-studies/                  Anonymised outcome stories (flagship proof)
│   └── /case-studies/<slug>/       e.g. telemetry-ingestion-at-scale, ai-native-sdlc-6x
├── /frameworks/                    Reusable models/playbooks (evergreen; canvases, checklists)
│   └── /frameworks/<slug>/
├── /topics/                        Pillar index (5 pillars)
│   └── /topics/<pillar>/           Pillar hub: intro + curated "start here" + all tagged items
├── /tags/<tag>/                    Controlled secondary tags
├── /series/<slug>/                 Ordered multi-part arcs
├── /projects/                      Work showcases (Telemetry Lens, IssueRouter, side projects)
│   └── /projects/<slug>/
├── /speaking/                      Talks, podcasts, panels (add once there are ≥2)
├── /resources/                     Curated reading lists, glossary, templates (downloads)
│   └── /resources/glossary/        Usage-monetization / telemetry glossary (SEO evergreen)
├── /archive/                       All content, every type, by year
├── /search/                        Pagefind static search
├── /contact/                       Collaboration types + email/LinkedIn (no form backend)
├── /rss.xml                        Everything feed
├── /writing/rss.xml, /notes/rss.xml  Per-type feeds
├── /cv/  (→ /rohit-anchi-cv.pdf)   Public-safe CV (no phone number)
├── /404, /sitemap-index.xml, /robots.txt, /CNAME
```
The primary nav has five items: **Writing · Case Studies · Topics · About · Contact**.
Search is an icon. Notes, Frameworks, Projects, Resources and Archive are linked from the
Writing hub and the footer.

## B2. Homepage blueprint (section by section)

| # | Section | Content (from real resume) | Pattern source |
|---|---|---|---|
| 1 | **Hero / positioning** | H1: "AI-native delivery for enterprise monetization platforms." Sub: "I'm Rohit Anchi, Principal Technical Product Manager at Dell Technologies, leading the APEX Usage Monetization domain and its shift to AI-native software delivery. 22+ years across Dell, Telstra and Infosys." CTAs: *Read the writing* · *About me* | Huyen |
| 2 | **Proof strip (metrics)** | 6X faster intent-to-delivery-ready (3 wks → 2–3 days) · 7.8M+ telemetry bundles/month at 99.96% ingestion · 1,300+ collection-enabled client configs · 30+ engineers across 5 pods · President's Award 2020 | New (Rohit's differentiator) |
| 3 | **Topic pillars** | 5 cards, each linking to `/topics/<pillar>/` with a one-line thesis | Willison tags, curated |
| 4 | **Featured / flagship** | 2–3 pinned pieces (`featured: true`), ideally 1 case study + 1 framework + 1 essay | Huyen |
| 5 | **Latest activity** | Mixed feed of the last 6 items across types, with type badges (Essay / Note / Case study) and dates | Willison, throttled |
| 6 | **Selected work** | Telemetry Lens, IssueRouter, Mediation & Rating (President's Award) as project cards | Huyen books → projects |
| 7 | **About preview** | 3-line narrative + career logos as text (Dell · Telstra · Infosys) + MIT Professional Education + link to /about/ | Huyen |
| 8 | **Subscribe / connect** | RSS, LinkedIn, GitHub, email; optional newsletter embed | Willison |
| 9 | Footer | Nav repeat, feeds, "views are my own" disclaimer, © | — |

## B3. Topic pillars (primary taxonomy)

Each item gets exactly **one pillar** plus 0–5 **controlled tags**.

```text
1. enterprise-telemetry       "Telemetry is the product's revenue nervous system"
   tags: data-collection, ingestion, asset-discovery, observability, operational-intelligence,
         lakehouse, event-streaming
2. usage-monetization         "Usage-based revenue lives or dies in mediation and rating"
   tags: mediation, rating, billing-analytics, xaas, b2b-saas-pricing, revenue-assurance,
         customer-usage-reporting
3. platform-architecture      "Architecture decisions are commercial decisions"
   tags: domain-driven-design, micro-frontends, api-design, data-models, legacy-migration,
         architecture-governance, crm-transformation
4. ai-native-sdlc             "From feature grooming to spec-driven, agentic delivery"
   tags: agentic-workflows, spec-driven-development, mcp, claude-code, devin,
         prototyping, sandboxes, responsible-ai, ai-adoption
5. product-strategy           "Operating models that turn capability into outcomes"
   tags: operating-models, discovery, roadmapping, go-no-go, stakeholder-alignment,
         team-leadership, kpis
```
Rules: tags are an enum in the Zod schema, so a typo fails the build and sprawl is
prevented. A new tag needs ≥3 items. Cross-pillar arcs (e.g. "Telemetry Lens build
log") become **series**, not tags.

## B4. Content formats → Astro content collections

`src/content.config.ts` (Astro 5 content layer, `glob()` loader, Zod). Shared base:

```ts
base = {
  title: string, description: string (≤160, used for SEO/OG),
  pubDate: date, updatedDate?: date,
  pillar: enum[5], tags: enum[] (max 5),
  series?: { slug: string, order: number },
  featured: boolean = false, draft: boolean = false,
  canonicalUrl?: url,     // for LinkedIn cross-posts
  ogImage?: image
}
```

| Collection | Purpose / length | Extra frontmatter |
|---|---|---|
| `essays` | Opinionated long-form, 1,500–4,000 words | `thesis: string`, `readingTime` (computed via remark plugin) |
| `notes` | Field notes: an observation, a lesson, or a link with commentary, 150–600 words | `kind: enum[observation, link, quote, til]`, `sourceUrl?`, `sourceTitle?`, `sourceAuthor?` |
| `caseStudies` | Anonymised Problem → Context → Approach → Outcome → Lessons | `role: string`, `org: enum[Dell, Telstra, Infosys]`, `period: {start, end?}`, `outcomes: {metric, value, context}[]`, `stack: string[]`, `confidentiality: enum[public, anonymised]` |
| `architectureNotes` | Diagrams + decisions (ADR-style) | `status: enum[proposed, adopted, superseded]`, `diagram?: image`, `decisions: string[]`, `tradeoffs: string[]` |
| `frameworks` | Reusable models, playbooks, checklists | `version: string`, `useWhen: string`, `steps?: string[]`, `download?: string` (file in /public) |
| `projects` | Showcases | `status: enum[active, shipped, archived]`, `problem`, `impact: string[]`, `stack`, `links?: {label,url}[]` |
| `talks` | Speaking | `event`, `date`, `format: enum[talk, panel, podcast, workshop]`, `slidesUrl?`, `videoUrl?` |
| `pages` (data) | Now page, About timeline | `timeline.yaml`: `{org, role, start, end?, highlights[]}` |
| `awards` / `metrics` (data, YAML) | Single source for the proof strip + About | `{label, value, context, year?, source}` |

Routing: `/writing/` merges `essays`, `architectureNotes` and `frameworks` (type badge
shown). Notes and case studies keep their own routes. `/topics/[pillar]` and `/tags/[tag]`
are generated with `getStaticPaths` over all collections.

## B5. SEO + GEO (generative-engine) strategy

**Goals and what to expect:**

| Query / surface | Target | Achievability |
|---|---|---|
| "Rohit Anchi" (Google/Bing) | rohitanchi.com at #1, with LinkedIn/GitHub below it | High, within weeks of indexing, if entity signals are consistent |
| "Rohit Anchi" in ChatGPT / Claude / Perplexity / Gemini / Copilot | The site cited as the primary source | High, once the site is crawled and Bing/Google have indexed it |
| "AI spec-driven development", "AI-native SDLC", "AI adoption", "usage telemetry / monetization" + **Melbourne / Australia** | Page-one results and AI citations | Medium. The location plus niche intersection is winnable |
| The same terms *without* location (global) | Occasional citations for specific long-tail pages | Low–medium. It depends on content depth and external mentions over months |

No technique guarantees top ranking. Name queries are very achievable. Generic terms are
won by specific, quotable, frequently cited pages. That is why the plan pairs on-site
work with off-site entity building.

### B5.1 Entity foundation (the #1 lever for both SEO and GEO)
- **One canonical identity statement**, repeated verbatim in the site hero, `/about/`, LinkedIn headline, GitHub bio and conference bios:
  *"Rohit Anchi is a Melbourne, Australia-based Principal Technical Product Manager at Dell Technologies, leading AI-native software delivery, spec-driven development (SDD) and enterprise telemetry and usage monetization."*
- **JSON-LD `Person`** on every page (in the base layout), from one `src/data/identity.ts`:
  `name`, `alternateName` ("Rohit Anchi"), `url`, `image`, `jobTitle`, `worksFor` (Dell Technologies), `alumniOf` (Visvesvaraya Technological University, MIT Professional Education), `homeLocation`/`address` (Melbourne, VIC, AU), `knowsAbout` (AI-native SDLC, spec-driven development, agentic workflows, Model Context Protocol, AI adoption, enterprise telemetry, usage-based monetization, mediation and rating, platform architecture), `award` (President's Award 2020 …), `hasCredential` (SAFe 4 PM, Salesforce certs), `sameAs` (LinkedIn, GitHub, X/Bluesky, Medium/Substack, speaker profiles).
- `WebSite` + `ProfilePage` schema on `/about/`. `Article`/`BlogPosting` with `author` → `@id` of the Person on every post. `BreadcrumbList` on every page. `FAQPage` on pillar hubs.
- **Two-way links:** every external profile links to rohitanchi.com, and the site links back (`rel="me"`).
- Optional later step: a Wikidata item, only if there is independent coverage (talks, press). Don't force it.

### B5.2 Technical SEO (Astro-native, all static)
- Static HTML output is already ideal for crawlers and LLM fetchers (no client-rendered content). Keep islands minimal.
- `<title>` pattern: `{Page} · Rohit Anchi`. Home: `Rohit Anchi — AI-Native Delivery & Enterprise Telemetry Leader, Melbourne`.
- Unique meta description per page (from the `description` frontmatter, enforced ≤160 by Zod), canonical URL, OG/Twitter cards, `lang="en-AU"`.
- `@astrojs/sitemap` with `lastmod` from `updatedDate`; `robots.txt` pointing to the sitemap.
- **Google Search Console + Bing Webmaster Tools** (verify with meta tags or DNS). Bing's index feeds ChatGPT search and Copilot. Submit sitemaps to both.
- **IndexNow** ping on deploy (a GitHub Action step that submits changed URLs to Bing/Yandex).
- Core Web Vitals: zero-JS pages by default, `astro:assets` image optimisation, self-hosted fonts with `font-display: swap`, a Lighthouse CI budget (≥95 SEO/Perf/A11y).
- Clean, stable, keyword-bearing slugs (e.g. `/writing/spec-driven-development-enterprise/`). No dates in URLs.
- Custom domain on GitHub Pages with HTTPS enforced. Redirect `www` to the apex domain (or the reverse), and pick exactly one canonical host.

### B5.3 GEO: making the site easy for AI answer engines to cite
- **`robots.txt` explicitly allows AI crawlers:** `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `ClaudeBot`, `Claude-User`, `Claude-SearchBot`, `PerplexityBot`, `Google-Extended`, `Applebot-Extended`, `CCBot`, `Bingbot`.
- **`/llms.txt`** (plus optional `/llms-full.txt`), generated at build time: who Rohit is, the 5 pillars, and links to flagship pages with one-line summaries.
- **Answer-first writing template** for essays and case studies:
  1. A TL;DR box (2–3 sentences that directly answer the page's question)
  2. A definition sentence ("Spec-driven development (SDD) is …")
  3. Question-shaped H2s ("How does AI-native SDLC change feature grooming?")
  4. Quotable, dated, attributed stats ("In 2025 at Dell APEX, intent-to-delivery-ready time fell from 2–3 weeks to 2–3 days, a 6X improvement.")
  5. A short FAQ block at the end (marked up as `FAQPage`)
- **Definitional glossary** (`/resources/glossary/<term>/`), one page per term: spec-driven development, AI-native SDLC, agentic workflow, MCP, usage mediation, rating, telemetry ingestion. LLMs quote these pages heavily.
- **Author byline block** on every post: name, role, Melbourne, and a link to `/about/`. This reinforces the entity on every page.
- Visible "Last updated" dates. Answer engines prefer fresh, dated content.
- Diagrams as inline SVG or images with descriptive alt text and a text caption, so the meaning isn't locked inside the image.

### B5.4 Keyword → page map (initial)

| Cluster | Primary page | Supporting content |
|---|---|---|
| Rohit Anchi (name) | `/`, `/about/` | All bylines, `/cv/` |
| AI spec-driven development / SDD | `/topics/ai-native-sdlc/` + flagship essay "Spec-driven development in the enterprise" | Glossary: SDD; case study: 6X delivery |
| AI-native SDLC / AI-native delivery | Case study "From 3 weeks to 3 days" | Notes on Devin/Claude Code/MCP workflows |
| AI adoption / enablement (enterprise, Melbourne) | Framework "Enterprise AI adoption playbook" | IssueRouter / intake-and-triage note; Responsible AI guardrails |
| Enterprise telemetry at scale | `/topics/enterprise-telemetry/` + case study "7.8M bundles/month at 99.96%" | Telemetry Lens project page |
| Usage-based monetization / mediation and rating | `/topics/usage-monetization/` + essay | Glossary: mediation, rating; President's Award story |
| Local intent: "AI product leader Melbourne", "AI-native consultant/speaker Australia" | `/about/`, `/contact/`, `/speaking/` | Location in schema, bio and footer |

### B5.5 Off-site authority (needed for rankings and AI citations on generic terms)
- Cross-post to LinkedIn articles/Medium with `canonicalUrl` pointing back to the site (backlog L7, promoted to Medium).
- Melbourne/AU community: speak at meetups (Melbourne AI, ProductTank Melbourne, YOW!, DDD Melbourne). Each talk page and event listing links to the site.
- Podcast guest spots and guest posts on AU tech publications; get listed on speaker directories.
- Open-source a small artifact per pillar on GitHub (e.g. an SDD spec template, an MCP read-only gateway pattern). The READMEs link to the site.

### B5.6 Measurement
- Search Console / Bing: impressions and position for "Rohit Anchi" and each cluster, reviewed monthly.
- **GEO prompt panel:** a monthly manual check in ChatGPT, Claude, Perplexity, Gemini and Copilot using fixed prompts ("Who is Rohit Anchi?", "Experts in AI spec-driven development in Melbourne", "AI-native SDLC case studies"). Log citations in `docs/geo-tracking.md`.
- Optional privacy-friendly analytics to see referrers from `chatgpt.com`, `perplexity.ai` and similar.

## B6. Prioritised build backlog (MVP-first)

**High — MVP (launch-ready)**
1. H1 Scaffold Astro (TS strict), GitHub Actions deploy via `withastro/action`, `public/CNAME` for rohitanchi.com, `site` set in `astro.config.mjs`
2. H2 Content collections + Zod schemas (B4) with enum pillars/tags
3. H3 Base layout: header nav (5 items), footer, light/dark tokens, responsive, accessible (semantic HTML, focus states)
4. H4 Homepage sections 1–5, 7, 8 (B2), metrics driven from `metrics.yaml`
5. H5 About page from real resume: narrative, timeline, awards, education, certs. **Leave out phone number and personal address**
6. H6 Writing index + post template (reading time, date, pillar, tags, TOC for long posts, prev/next)
7. H7 SEO + GEO foundation (B5.1–B5.3): `identity.ts` single source; `Person`/`WebSite`/`ProfilePage`/`BlogPosting`/`BreadcrumbList` JSON-LD; titles, descriptions, canonical, OG, `lang="en-AU"`; sitemap; robots.txt allowing AI crawlers; `/llms.txt`; byline block; answer-first post template (TL;DR + FAQ)
7b. H7b Search Console + Bing Webmaster verification, sitemap submission, IndexNow step in the deploy workflow; update LinkedIn/GitHub bios with the canonical identity statement and site link
8. H8 RSS (`@astrojs/rss`): everything feed + per-type feeds
9. H9 Launch content: 1 case study (AI-native SDLC 6X), 1 essay, 3 notes, Now page
10. H10 Contact page: collaboration types (speaking, advisory, podcasts, peer exchange) + mailto/LinkedIn

**Medium — post-launch (weeks 2–6)**
1. M1 Topic pillar hubs `/topics/[pillar]` with "start here" curation
2. M2 Tag pages + series pages with ordered navigation
3. M3 Pagefind static search
4. M4 Build-time OG images (e.g. `astro-og-canvas` / satori)
5. M5 Case studies index with outcome-metric cards; Projects section (Telemetry Lens, IssueRouter)
6. M6 Notes stream with `kind` badges; homepage "Latest activity" mixes all types
7. M7 Archive by year; `updatedDate` "last reviewed" on evergreen pieces
8. M8 Downloadable public CV (PDF) + `/cv/` redirect
9. M9 CI quality gates: `astro check`, link checker, Lighthouse CI budget (≥95 SEO), structured-data validation
10. M10 Glossary pages (promoted from L3; a high-value GEO asset) + `FAQPage` schema on pillar hubs
11. M11 LinkedIn/Medium cross-posting with `canonicalUrl` (promoted from L7) + monthly GEO prompt-panel log

**Low — later / optional**
1. L1 Newsletter (optional free tier, e.g. Buttondown embed) or an RSS-to-email digest
2. L2 Comments via giscus (GitHub Discussions, no backend)
3. L3 Glossary of telemetry/monetization terms (evergreen SEO)
4. L4 Speaking page (once ≥2 talks)
5. L5 Privacy-friendly analytics (optional; e.g. GoatCounter / Cloudflare Web Analytics)
6. L6 Interactive frameworks (Astro islands: e.g. a usage-rating calculator)
7. L7 LinkedIn cross-post workflow using `canonicalUrl`
8. L8 Related-content suggestions (build-time tag overlap)

**Governance notes (before publishing):**
- Check Dell's external-communications / social-media policy before naming internal systems (Telemetry Lens, IssueRouter) or quoting figures such as 7.8M bundles, 1.1 TB/month and 99.96%. Use `confidentiality: anonymised` where needed.
- Add a "views are my own" disclaimer.
- The resume gives the email as rohit.anchi@gmail.com. Confirm which address to publish.

**Sustainable cadence target:** 2 notes/week, 1 essay or architecture note/month,
1 case study/quarter. Notes carry the frequency (Willison), flagships carry the authority
(Huyen).

---

## Sources (web search, since direct fetch was blocked)
- https://vishalgandhi.in/ , https://vishalgandhi.in/tags/minio/ , https://vishalgandhi.in/page/2/
- https://huyenchip.com/books/ , https://github.com/chiphuyen/aie-book
- https://simonwillison.net/tags/blogging/ , https://simonwillison.net/dashboard/by-month/ , https://til.simonwillison.net/ , https://github.com/simonw/simonwillisonblog
- https://daringfireball.net/linked/2025/01/02/willisons-approach-to-running-a-link-blog

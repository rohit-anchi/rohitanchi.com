# rohitanchi.com

Personal site of Rohit Anchi, built with [Astro](https://astro.build) as a fully static site and deployed to GitHub Pages.
Strategy, information architecture and backlog: [`docs/site-strategy.md`](docs/site-strategy.md).

## Develop

```sh
npm install
npm run dev      # http://localhost:4321 — drafts are visible here
npm run build    # astro check + static build to dist/ — drafts are excluded
npm run preview
```

Requires Node 22.12+.

## Writing content

Content lives in `src/content/<collection>/*.md`. Schemas are in `src/content.config.ts`.

| Folder | URL | Use for |
|---|---|---|
| `essays/` | `/writing/<slug>/` | Opinionated long-form |
| `notes/` | `/notes/<slug>/` | Short field notes, links with commentary |
| `case-studies/` | `/case-studies/<slug>/` | Problem → approach → outcome → lessons |
| `architecture-notes/` | `/architecture/<slug>/` | ADR-style decisions |
| `frameworks/` | `/frameworks/<slug>/` | Reusable playbooks and checklists |
| `projects/` | `/projects/<slug>/` | Work showcases |
| `talks/` | `/speaking/<slug>/` | Talks, panels, podcasts |

Every entry needs `title`, `description` (≤160 chars), `pubDate` and a `pillar`, plus optional `tags`.
Pillars and tags are a controlled vocabulary in `src/lib/taxonomy.ts`, so an unknown tag fails the build.
Set `draft: false` to publish. Set `featured: true` to surface an entry in "Start here" and `llms.txt`.

For SEO and AI answer engines, fill in `tldr` (an answer-first summary) and `faq` (rendered on the page and emitted as `FAQPage` JSON-LD).
Open each piece with a one-sentence definition of its core term.

Identity, metrics, awards and the career timeline are edited in `src/data/identity.ts` and `src/data/career.ts`.
They feed the homepage, About page, JSON-LD, `llms.txt` and feeds.

## What's generated

- JSON-LD `Person` + `WebSite` on every page, plus `BlogPosting`, `BreadcrumbList`, `ProfilePage` and `FAQPage` where relevant
- `/sitemap-index.xml`, `/robots.txt` (explicitly allows search and AI crawlers) and `/llms.txt`
- RSS feeds: `/rss.xml` (everything), `/writing/rss.xml` and `/notes/rss.xml`
- Canonical URLs, OpenGraph/Twitter cards (`public/og-default.png`) and `lang="en-AU"`

## Deploy (one-time setup)

1. **Repo → Settings → Pages → Source: GitHub Actions.** `.github/workflows/deploy.yml` deploys on every push to `main`.
2. **Custom domain.** `public/CNAME` is set to `rohitanchi.com`. At your DNS provider, add these records:
   - `A` records for the apex domain → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - a `CNAME` for `www` → `rohit-anchi.github.io`

   Then tick **Enforce HTTPS** in the Pages settings.

## SEO / GEO launch checklist

- [ ] Verify the domain in [Google Search Console](https://search.google.com/search-console) (DNS TXT record) and submit `https://rohitanchi.com/sitemap-index.xml`
- [ ] Verify in [Bing Webmaster Tools](https://www.bing.com/webmasters). You can import from Search Console. Bing powers ChatGPT search and Copilot.
- [ ] IndexNow (optional): generate a key, add `public/<key>.txt` containing the key, and set the repository variable `INDEXNOW_KEY`. The deploy workflow then pings search engines after each deploy.
- [ ] Put the identity statement from `src/data/identity.ts` word for word in your LinkedIn headline/About section and GitHub bio, and link both to https://rohitanchi.com
- [ ] Publish the first case study and essay (drafts are in `src/content/`)
- [ ] Monthly: check how ChatGPT, Claude, Perplexity, Gemini and Copilot answer "Who is Rohit Anchi?" and "AI spec-driven development experts in Melbourne"

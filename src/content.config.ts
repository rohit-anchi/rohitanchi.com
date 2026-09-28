import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { pillarKeys, tags } from './lib/taxonomy';

const faq = z.array(z.object({ q: z.string(), a: z.string() })).default([]);

/** Fields shared by every publishable entry. */
const base = z.object({
  title: z.string(),
  /** Used for meta description, OG and feeds; keep it search-snippet sized. */
  description: z.string().max(160),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  pillar: z.enum(pillarKeys),
  tags: z.array(z.enum(tags)).max(5).default([]),
  series: z.object({ slug: z.string(), order: z.number().int() }).optional(),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
  /** Set when the canonical copy lives elsewhere (e.g. a LinkedIn cross-post). */
  canonicalUrl: z.url().optional(),
  /** 2–3 sentence answer-first summary shown at the top of the page. */
  tldr: z.string().optional(),
  /** Rendered as an FAQ block and FAQPage JSON-LD. */
  faq,
});

const md = (dir: string) => glob({ pattern: '**/*.md', base: `./src/content/${dir}` });

const essays = defineCollection({
  loader: md('essays'),
  schema: base.extend({ thesis: z.string() }),
});

const notes = defineCollection({
  loader: md('notes'),
  schema: base.extend({
    kind: z.enum(['observation', 'link', 'quote', 'til']).default('observation'),
    sourceUrl: z.url().optional(),
    sourceTitle: z.string().optional(),
    sourceAuthor: z.string().optional(),
  }),
});

const caseStudies = defineCollection({
  loader: md('case-studies'),
  schema: base.extend({
    role: z.string(),
    org: z.enum(['Dell Technologies', 'Telstra', 'Infosys', 'Independent']),
    period: z.object({ start: z.string(), end: z.string().optional() }),
    outcomes: z.array(z.object({ metric: z.string(), value: z.string(), context: z.string().optional() })).default([]),
    stack: z.array(z.string()).default([]),
    confidentiality: z.enum(['public', 'anonymised']).default('anonymised'),
  }),
});

const architectureNotes = defineCollection({
  loader: md('architecture-notes'),
  schema: base.extend({
    status: z.enum(['proposed', 'adopted', 'superseded']),
    decisions: z.array(z.string()).default([]),
    tradeoffs: z.array(z.string()).default([]),
  }),
});

const frameworks = defineCollection({
  loader: md('frameworks'),
  schema: base.extend({
    version: z.string().default('1.0'),
    useWhen: z.string(),
    steps: z.array(z.string()).default([]),
    /** Path to a downloadable file in /public, e.g. /downloads/sdd-template.md */
    download: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: md('projects'),
  schema: base.extend({
    status: z.enum(['active', 'shipped', 'archived']),
    problem: z.string(),
    impact: z.array(z.string()).default([]),
    stack: z.array(z.string()).default([]),
    links: z.array(z.object({ label: z.string(), url: z.url() })).default([]),
  }),
});

const talks = defineCollection({
  loader: md('talks'),
  schema: base.extend({
    event: z.string(),
    format: z.enum(['talk', 'panel', 'podcast', 'workshop']),
    slidesUrl: z.url().optional(),
    videoUrl: z.url().optional(),
  }),
});

export const collections = { essays, notes, caseStudies, architectureNotes, frameworks, projects, talks };

import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { identity } from '../data/identity';
import { entryLabel, entryUrl, getAllPublished, type ContentType } from './content';

export async function buildFeed(context: APIContext, opts: { title: string; description: string; types?: ContentType[] }) {
  const entries = await getAllPublished(opts.types);
  return rss({
    title: opts.title,
    description: opts.description,
    site: context.site!,
    trailingSlash: true,
    customData: '<language>en-au</language>',
    items: entries.map((e) => ({
      title: e.data.title,
      description: e.data.description,
      pubDate: e.data.pubDate,
      link: entryUrl(e),
      categories: [entryLabel(e), e.data.pillar, ...e.data.tags],
      author: `${identity.email} (${identity.name})`,
    })),
  });
}

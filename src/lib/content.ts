import { getCollection, type CollectionEntry } from 'astro:content';

/** Collection → public route prefix and display label. */
export const contentTypes = {
  essays: { base: 'writing', label: 'Essay' },
  architectureNotes: { base: 'architecture', label: 'Architecture note' },
  frameworks: { base: 'frameworks', label: 'Framework' },
  notes: { base: 'notes', label: 'Note' },
  caseStudies: { base: 'case-studies', label: 'Case study' },
  projects: { base: 'projects', label: 'Project' },
  talks: { base: 'speaking', label: 'Talk' },
} as const;

export type ContentType = keyof typeof contentTypes;
export type AnyEntry = { [K in ContentType]: CollectionEntry<K> }[ContentType];

/** Drafts are visible in `astro dev` but never built for production. */
const isVisible = (entry: { data: { draft: boolean } }) => import.meta.env.DEV || !entry.data.draft;

const byDateDesc = (a: AnyEntry, b: AnyEntry) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf();

export async function getPublished<K extends ContentType>(type: K): Promise<CollectionEntry<K>[]> {
  const entries = (await getCollection(type, isVisible)) as CollectionEntry<K>[];
  return entries.sort(byDateDesc as (a: CollectionEntry<K>, b: CollectionEntry<K>) => number);
}

export async function getAllPublished(types: ContentType[] = Object.keys(contentTypes) as ContentType[]) {
  const lists = await Promise.all(types.map((t) => getPublished(t)));
  return (lists.flat() as AnyEntry[]).sort(byDateDesc);
}

export const entryUrl = (entry: AnyEntry) => `/${contentTypes[entry.collection].base}/${entry.id}/`;
export const entryLabel = (entry: AnyEntry) => contentTypes[entry.collection].label;

export const formatDate = (date: Date) =>
  date.toLocaleDateString('en-AU', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'Australia/Melbourne' });

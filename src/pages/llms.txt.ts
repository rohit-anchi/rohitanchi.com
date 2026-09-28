import type { APIRoute } from 'astro';
import { identity } from '../data/identity';
import { metrics } from '../data/career';
import { entryUrl, getAllPublished } from '../lib/content';
import { pillars, type Pillar } from '../lib/taxonomy';

// https://llmstxt.org — a concise, machine-readable guide to this site for LLMs.
export const GET: APIRoute = async ({ site }) => {
  const abs = (path: string) => new URL(path, site).href;
  const all = await getAllPublished();
  const featured = all.filter((e) => e.data.featured);
  const list = featured.length ? featured : all.slice(0, 20);

  const lines = [
    `# ${identity.name}`,
    '',
    `> ${identity.statement}`,
    '',
    `${identity.name} has ${identity.yearsExperience}+ years of experience across Dell Technologies, Telstra and Infosys. Based in ${identity.location.city}, ${identity.location.country}.`,
    '',
    'Key outcomes:',
    ...metrics.map((m) => `- ${m.value} ${m.label} (${m.context})`),
    '',
    'Areas of expertise: ' + identity.knowsAbout.join('; ') + '.',
    '',
    '## Profile',
    `- [About ${identity.name}](${abs('/about/')}): biography, experience, awards, education and certifications`,
    `- [Now](${abs('/about/now/')}): current focus`,
    `- [Contact](${abs('/contact/')}): speaking, podcasts and advisory enquiries`,
    `- [LinkedIn](${identity.social.linkedin})`,
    `- [GitHub](${identity.social.github})`,
    '',
    '## Topics',
    ...(Object.keys(pillars) as Pillar[]).map(
      (p) => `- [${pillars[p].title}](${abs(`/topics/${p}/`)}): ${pillars[p].description}`,
    ),
    '',
    '## Writing',
    ...(list.length ? list.map((e) => `- [${e.data.title}](${abs(entryUrl(e))}): ${e.data.description}`) : ['- Coming soon.']),
    '',
    '## Optional',
    `- [Archive](${abs('/archive/')}): everything published, by year`,
    `- [RSS feed](${abs('/rss.xml')})`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};

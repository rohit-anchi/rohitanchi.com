/** JSON-LD builders. Every entity points back to one Person `@id`. */
import { identity, sameAs, SITE_URL } from '../data/identity';
import { awards } from '../data/career';

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const personSchema = () => ({
  '@type': 'Person',
  '@id': PERSON_ID,
  name: identity.name,
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/og-default.png`,
  description: identity.statement,
  jobTitle: identity.jobTitle,
  worksFor: { '@type': 'Organization', name: identity.employer, url: 'https://www.dell.com' },
  homeLocation: {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      addressLocality: identity.location.city,
      addressRegion: identity.location.region,
      addressCountry: identity.location.countryCode,
    },
  },
  alumniOf: identity.education.map((e) => ({ '@type': 'EducationalOrganization', name: e.name })),
  hasCredential: identity.certifications.map((name) => ({ '@type': 'EducationalOccupationalCredential', name })),
  award: awards.map((a) => [a.name, a.org, a.year].filter(Boolean).join(', ')),
  knowsAbout: identity.knowsAbout,
  sameAs,
});

export const websiteSchema = () => ({
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: identity.name,
  description: identity.statement,
  inLanguage: 'en-AU',
  publisher: { '@id': PERSON_ID },
});

export const breadcrumbSchema = (crumbs: { name: string; url: string }[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.name,
    item: new URL(c.url, SITE_URL).href,
  })),
});

export const articleSchema = (a: {
  title: string;
  description: string;
  url: string;
  pubDate: Date;
  updatedDate?: Date;
  keywords: string[];
  section: string;
}) => ({
  '@type': 'BlogPosting',
  headline: a.title,
  description: a.description,
  url: a.url,
  mainEntityOfPage: a.url,
  datePublished: a.pubDate.toISOString(),
  dateModified: (a.updatedDate ?? a.pubDate).toISOString(),
  author: { '@id': PERSON_ID },
  publisher: { '@id': PERSON_ID },
  isPartOf: { '@id': WEBSITE_ID },
  inLanguage: 'en-AU',
  articleSection: a.section,
  keywords: a.keywords.join(', '),
});

export const faqSchema = (faq: { q: string; a: string }[]) => ({
  '@type': 'FAQPage',
  mainEntity: faq.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

export const graph = (...nodes: object[]) => ({ '@context': 'https://schema.org', '@graph': nodes });

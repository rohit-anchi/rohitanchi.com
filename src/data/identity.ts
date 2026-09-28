/**
 * Single source of truth for who Rohit is. Feeds the hero, About page,
 * bylines, JSON-LD `Person`, llms.txt and meta descriptions, so the identity
 * statement stays word-for-word consistent everywhere (key for SEO and GEO).
 */
export const SITE_URL = 'https://rohitanchi.com';

export const identity = {
  name: 'Rohit Anchi',
  jobTitle: 'Principal Technical Product Manager',
  employer: 'Dell Technologies',
  location: { city: 'Melbourne', region: 'VIC', country: 'Australia', countryCode: 'AU' },
  email: 'rohit.anchi@gmail.com',
  yearsExperience: 22,

  /** Canonical identity statement: reuse verbatim on LinkedIn, GitHub and speaker bios. */
  statement:
    'Rohit Anchi is a Melbourne, Australia-based Principal Technical Product Manager at Dell Technologies, leading AI-native software delivery, spec-driven development (SDD) and enterprise telemetry and usage monetization.',

  headline: 'AI-native delivery for enterprise monetization platforms.',
  intro:
    "I'm Rohit Anchi, Principal Technical Product Manager at Dell Technologies in Melbourne, Australia. I lead the APEX Usage Monetization domain and its shift to AI-native software delivery, with 22+ years across Dell Technologies, Telstra and Infosys.",

  knowsAbout: [
    'AI-native software development lifecycle (SDLC)',
    'Spec-driven development (SDD)',
    'Agentic workflows',
    'Model Context Protocol (MCP)',
    'Enterprise AI adoption and enablement',
    'Responsible AI governance',
    'Enterprise telemetry',
    'Usage-based monetization',
    'Usage mediation and rating',
    'Billing analytics',
    'Platform architecture',
    'Enterprise lakehouse',
    'Product operating models',
    'CRM transformation',
  ],

  social: {
    linkedin: 'https://www.linkedin.com/in/rohitanchi/',
    github: 'https://github.com/rohit-anchi',
  },

  education: [
    {
      name: 'MIT Professional Education',
      credential: 'Applied Data Science Program: Leveraging AI for Effective Decision Making',
      year: 2023,
    },
    {
      name: 'Visvesvaraya Technological University',
      credential: 'Bachelor of Engineering, Computer Science',
      year: 2003,
    },
  ],

  certifications: [
    'Certified SAFe 4 Product Manager',
    'Salesforce Certified Administrator',
    'Salesforce Certified Platform App Builder',
    'Vlocity Certified Developer',
  ],
} as const;

export const sameAs: string[] = Object.values(identity.social);

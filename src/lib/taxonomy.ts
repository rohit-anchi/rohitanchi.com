/**
 * Controlled vocabulary. Pillars and tags are enums in the content schemas,
 * so an unknown tag fails the build. Add a tag only when ≥3 items will use it.
 */
export const pillars = {
  'ai-native-sdlc': {
    title: 'AI-Native SDLC',
    thesis: 'From feature grooming to spec-driven, agentic delivery.',
    description:
      'Spec-driven development, agentic workflows, MCP and governed AI adoption across the software delivery lifecycle.',
  },
  'enterprise-telemetry': {
    title: 'Enterprise Telemetry',
    thesis: "Telemetry is the product's revenue nervous system.",
    description: 'Collection, ingestion, asset discovery and operational intelligence at enterprise scale.',
  },
  'usage-monetization': {
    title: 'Usage Monetization',
    thesis: 'Usage-based revenue lives or dies in mediation and rating.',
    description: 'Mediation, rating, billing analytics and customer usage reporting for XaaS and B2B SaaS.',
  },
  'platform-architecture': {
    title: 'Platform Architecture',
    thesis: 'Architecture decisions are commercial decisions.',
    description: 'Domain-driven design, APIs, data models, legacy migration and architecture governance.',
  },
  'product-strategy': {
    title: 'Product Strategy',
    thesis: 'Operating models that turn capability into outcomes.',
    description: 'Operating models, discovery, roadmapping, Go/No-Go decisions and team leadership.',
  },
} as const;

export type Pillar = keyof typeof pillars;
export const pillarKeys = Object.keys(pillars) as [Pillar, ...Pillar[]];

export const tags = [
  // ai-native-sdlc
  'agentic-workflows',
  'spec-driven-development',
  'mcp',
  'claude-code',
  'devin',
  'prototyping',
  'sandboxes',
  'responsible-ai',
  'ai-adoption',
  // enterprise-telemetry
  'data-collection',
  'ingestion',
  'asset-discovery',
  'observability',
  'operational-intelligence',
  'lakehouse',
  'event-streaming',
  // usage-monetization
  'mediation',
  'rating',
  'billing-analytics',
  'xaas',
  'b2b-saas-pricing',
  'revenue-assurance',
  'customer-usage-reporting',
  // platform-architecture
  'domain-driven-design',
  'micro-frontends',
  'api-design',
  'data-models',
  'legacy-migration',
  'architecture-governance',
  'crm-transformation',
  // product-strategy
  'operating-models',
  'discovery',
  'roadmapping',
  'go-no-go',
  'stakeholder-alignment',
  'team-leadership',
  'kpis',
] as const;

export type Tag = (typeof tags)[number];

const acronyms: Record<string, string> = { ai: 'AI', mcp: 'MCP', xaas: 'XaaS', b2b: 'B2B', saas: 'SaaS', api: 'API', kpis: 'KPIs', sdlc: 'SDLC' };

export const tagLabel = (tag: string) =>
  tag
    .split('-')
    .map((w) => acronyms[w] ?? w[0].toUpperCase() + w.slice(1))
    .join(' ');

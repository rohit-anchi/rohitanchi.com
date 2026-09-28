/** Proof points, awards and career timeline — sourced from Rohit's resume. */

export interface Metric {
  value: string;
  label: string;
  context: string;
}

export const metrics: Metric[] = [
  {
    value: '6X',
    label: 'faster intent-to-delivery-ready',
    context: 'From 2–3 weeks to 2–3 days using agentic workflows (Devin, Claude Code)',
  },
  {
    value: '7.8M+',
    label: 'telemetry bundles per month',
    context: 'At 99.96% successful ingestion',
  },
  {
    value: '1,300+',
    label: 'collection-enabled client configurations',
    context: 'Enterprise telemetry at scale',
  },
  {
    value: '30+',
    label: 'engineers across 5 pods',
    context: 'Cross-functional engineering and product organisation',
  },
  {
    value: '22+',
    label: 'years',
    context: 'Across Dell Technologies, Telstra and Infosys',
  },
];

export interface Award {
  name: string;
  org: string;
  year?: number;
  detail?: string;
}

export const awards: Award[] = [
  {
    name: "President's Award",
    org: 'Dell Technologies',
    year: 2020,
    detail: 'For the first Mediation & Rating product in the XaaS capability, delivered in five months',
  },
  { name: 'GRIT Award nomination', org: 'Dell Technologies', detail: 'Self-service reporting enablement' },
  { name: 'Game Changer awards (multiple)', org: 'Dell Technologies', detail: 'Innovation' },
  { name: "Director's Awards (three)", org: 'Telstra' },
  { name: 'COO Award nominations (two)', org: 'Telstra' },
];

export interface Role {
  org: string;
  title: string;
  start: string;
  end?: string;
  summary: string;
  highlights: string[];
}

export const timeline: Role[] = [
  {
    org: 'Dell Technologies',
    title: 'Principal Technical Product Manager (Domain Leader), APEX Usage & AI-Native Adoption',
    start: '2023-09',
    summary:
      'End-to-end strategic vision, roadmap and operational transformation for the APEX Usage Monetization domain, alongside an enterprise AI-native delivery mandate.',
    highlights: [
      'Reduced intent-to-delivery-ready cycle time from ~2–3 weeks to 2–3 days (6X) with agentic workflows for use-case classification, scoping, specification, planning and validation.',
      'Led telemetry collection and ingestion supporting 1,300+ collection-enabled client configurations and 7.8M+ collection bundles per month.',
      'Led enterprise AI enablement across five cross-functional pods: playbooks, guidance and training for safe, governed adoption.',
      'Evolved feature-grooming workshops into AI-native, specification-driven discovery sessions.',
      'Designed an agentic intake-and-triage workflow that routes AI use cases through Responsible AI and compliance gates.',
    ],
  },
  {
    org: 'Dell Technologies',
    title: 'Cross-Product Leader, Infrastructure as a Service Monetization (Dell APEX)',
    start: '2022-01',
    end: '2023-10',
    summary:
      'Telemetry data infrastructure enabling usage-based billing and revenue generation for the APEX portfolio.',
    highlights: [
      'Directed global agile teams across India and China on data collection, mediation, rating and billing analytics.',
      'Delivered multi-million-dollar operational efficiencies by automating usage collection, mediation and rating.',
    ],
  },
  {
    org: 'Dell Technologies',
    title: 'Product Manager, as-a-Service Usage Enablement',
    start: '2020-05',
    end: '2022-01',
    summary: 'Product strategy and execution for standardised, scalable as-a-Service subscription usage capabilities.',
    highlights: [
      "Won the 2020 President's Award for the five-month delivery of the first Mediation & Rating product in the XaaS capability.",
      'Drove adoption of micro-frontend architecture across the engineering organisation.',
    ],
  },
  {
    org: 'Telstra',
    title: 'Senior Solutions Owner',
    start: '2017-07',
    end: '2020-04',
    summary: 'Solution delivery, product ownership and architecture governance for a large-scale B2C order management transformation.',
    highlights: [
      'Technical Product Owner for the Streamline program (Open UI-based platform).',
      'Led legacy CRM retirements to Salesforce-enabled solutions while maintaining operational continuity.',
    ],
  },
  {
    org: 'Telstra',
    title: 'Senior Solutions Architect',
    start: '2012-02',
    end: '2017-06',
    summary: 'CRM solution architecture and delivery governance across Salesforce, Vlocity and Siebel.',
    highlights: [
      'Built and led a 50+ person global CRM DevOps organisation.',
      'Designed and executed a paperless contract management transformation with multi-million-dollar annual savings.',
    ],
  },
  {
    org: 'Infosys',
    title: 'Technology Architect / Technology Lead',
    start: '2003-11',
    end: '2012-03',
    summary:
      'Global delivery of CRM and data transformation programs for Tier-1 clients across telecommunications, logistics and financial services.',
    highlights: ['Led teams spanning Australia, India and China.'],
  },
];

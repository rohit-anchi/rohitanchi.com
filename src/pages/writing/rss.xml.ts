import type { APIContext } from 'astro';
import { buildFeed } from '../../lib/feed';

export const GET = (context: APIContext) =>
  buildFeed(context, {
    title: 'Rohit Anchi — Writing',
    description: 'Essays, architecture notes and frameworks on AI-native delivery, telemetry and usage monetization.',
    types: ['essays', 'architectureNotes', 'frameworks', 'caseStudies'],
  });

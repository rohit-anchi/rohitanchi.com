import type { APIContext } from 'astro';
import { buildFeed } from '../../lib/feed';

export const GET = (context: APIContext) =>
  buildFeed(context, {
    title: 'Rohit Anchi — Field Notes',
    description: 'Short observations, lessons and links from practice.',
    types: ['notes'],
  });

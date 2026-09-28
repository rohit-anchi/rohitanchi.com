import type { APIContext } from 'astro';
import { buildFeed } from '../lib/feed';
import { identity } from '../data/identity';

export const GET = (context: APIContext) =>
  buildFeed(context, { title: identity.name, description: identity.statement });

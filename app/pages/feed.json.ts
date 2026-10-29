import type { APIRoute } from 'astro';
import { CHANGELOG_ENTRIES, absoluteUrl } from '../data/changelog';

export const GET: APIRoute = () => {
  const feed = {
    version: 'https://jsonfeed.org/version/1.1',
    title: 'Carter Ogunsola :: Ship log',
    home_page_url: 'https://carterogunsola.com/changelog',
    feed_url: 'https://carterogunsola.com/feed.json',
    language: 'en',
    items: CHANGELOG_ENTRIES.map((item) => ({
      id: absoluteUrl(item.href),
      url: absoluteUrl(item.href),
      title: item.title,
      date_published: `${item.date}T00:00:00Z`,
      tags: [item.category],
    })),
  };
  return new Response(JSON.stringify(feed, null, 2), {
    headers: { 'Content-Type': 'application/feed+json; charset=utf-8' },
  });
};

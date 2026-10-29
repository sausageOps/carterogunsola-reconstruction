import type { APIRoute } from 'astro';
import { CHANGELOG_ENTRIES, absoluteUrl } from '../data/changelog';

const xmlText = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const GET: APIRoute = () => {
  const items = CHANGELOG_ENTRIES.map((item) => `
    <item>
      <title>${xmlText(item.title)}</title>
      <link>${xmlText(absoluteUrl(item.href))}</link>
      <guid isPermaLink="true">${xmlText(absoluteUrl(item.href))}</guid>
      <pubDate>${new Date(`${item.date}T00:00:00Z`).toUTCString()}</pubDate>
      <category>${xmlText(item.category)}</category>
    </item>`).join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/feed.xsl"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Carter Ogunsola :: Ship log</title>
    <link>https://carterogunsola.com/changelog</link>
    <description>A running log of what’s new around here: experiments, projects, roles, and recognition, as they ship.</description>
    <language>en</language>
    <atom:link href="https://carterogunsola.com/changelog.xml" rel="self" type="application/rss+xml" />${items}
  </channel>
</rss>`;
  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
};

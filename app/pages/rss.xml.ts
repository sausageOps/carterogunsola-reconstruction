import type { APIRoute } from 'astro';
import { POST } from '../data/writing';
import contentHtml from '../data/writing-feed-content.html?raw';

const escapeXml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const cdata = (value: string) => `<![CDATA[${value.replace(/]]>/g, ']]]]><![CDATA[>')}]]>`;

export const GET: APIRoute = () => {
  const url = 'https://carterogunsola.com/writing/the-personal-starter';
  const description = escapeXml(POST.description);
  const content = contentHtml.trim();
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/feed.xsl"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Carter Ogunsola :: Writing</title>
    <link>https://carterogunsola.com/writing</link>
    <language>en</language>
    <atom:link href="https://carterogunsola.com/rss.xml" rel="self" type="application/rss+xml" />
    <item>
      <title>${escapeXml(POST.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date('2026-09-16T00:00:00Z').toUTCString()}</pubDate>
      <description>${description}</description>
      <content:encoded>${cdata(content)}</content:encoded>
    </item>
  </channel>
</rss>`;
  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
};

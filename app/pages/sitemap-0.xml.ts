import type { APIRoute } from 'astro';

const SITEMAP_ROUTES = [
  '/',
  '/about',
  '/lab',
  '/lab/live-cursors',
  '/lab/dial',
  '/lab/polka-dots',
  '/lab/heart',
  '/lab/threejs-test',
  '/lab/dynamic-scrollbar',
  '/lab/rotating-gallery',
  '/lab/paste-up',
  '/lab/vocal-orb',
  '/writing',
  '/writing/the-personal-starter',
  '/studio',
  '/contact',
  '/changelog',
];

export const GET: APIRoute = () => {
  const urls = SITEMAP_ROUTES.map(
    (route) => `  <url><loc>https://carterogunsola.com${route}</loc></url>`
  ).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};

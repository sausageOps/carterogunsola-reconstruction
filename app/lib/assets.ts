export const ASSETS_ORIGIN = 'https://assets.carterogunsola.com';

export function asset(path: string): string {
  return `${ASSETS_ORIGIN}/${path.replace(/^\/+/, '')}`;
}

export function img(path: string, width = 720, quality = 86): string {
  const clean = path.replace(/^\/+/, '');
  return `${ASSETS_ORIGIN}/cdn-cgi/image/width=${width},quality=${quality},format=auto/${clean}`;
}

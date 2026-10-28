const prefetchedUrls = new Set<string>();
const observedLinks = new WeakSet<Element>();

let prefetchAll = false;
let defaultStrategy = 'hover';
let initialized = false;

export interface PrefetchOptions {
  ignoreSlowConnection?: boolean;
  with?: 'fetch' | 'link';
}

function canPrefetch(url: string, ignoreSlowConnection = false): boolean {
  if (!navigator.onLine) return false;
  if (!ignoreSlowConnection && 'connection' in navigator) {
    const conn = (navigator as any).connection;
    if (conn.saveData || /2g/.test(conn.effectiveType)) return false;
  }
  try {
    const parsed = new URL(url, location.href);
    return location.origin === parsed.origin && location.pathname !== parsed.pathname && !prefetchedUrls.has(url);
  } catch {
    return false;
  }
}

export function prefetch(url: string, opts?: PrefetchOptions): void {
  url = url.replace(/#.*/, '');
  const ignoreSlowConnection = opts?.ignoreSlowConnection ?? false;
  if (!canPrefetch(url, ignoreSlowConnection)) return;
  prefetchedUrls.add(url);

  if (
    (opts?.with ?? 'link') === 'link' &&
    document.createElement('link').relList?.supports?.('prefetch')
  ) {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.setAttribute('href', url);
    document.head.append(link);
  } else {
    fetch(url, { priority: 'low' as any }).catch(() => {});
  }
}

export function initPrefetch(config?: { defaultStrategy?: string; prefetchAll?: boolean }): void {
  if (initialized) return;
  initialized = true;
  defaultStrategy = config?.defaultStrategy ?? defaultStrategy;
  prefetchAll = config?.prefetchAll ?? prefetchAll;
}

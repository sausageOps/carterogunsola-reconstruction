export interface ChangelogEntry {
  title: string;
  date: string;
  category: string;
  href: string;
}

/** Entries transcribed from the saved original /changelog.html rows. */
export const CHANGELOG_ENTRIES: ChangelogEntry[] = [
  { title: 'Vocal Orb', date: '2026-10-02', category: 'Lab', href: '/lab/vocal-orb' },
  { title: 'The new site is live', date: '2026-09-29', category: 'Site', href: '/' },
  {
    title: 'The personal starter',
    date: '2026-09-16',
    category: 'Writing',
    href: '/writing/the-personal-starter',
  },
  { title: 'Paste-Up', date: '2026-08-27', category: 'Lab', href: '/lab/paste-up' },
  { title: 'Live Cursors', date: '2026-07-08', category: 'Lab', href: '/lab/live-cursors' },
  { title: 'Dial', date: '2026-07-03', category: 'Lab', href: '/lab/dial' },
  { title: 'Heart', date: '2026-07-03', category: 'Lab', href: '/lab/heart' },
  { title: 'Polka Dots', date: '2026-07-01', category: 'Lab', href: '/lab/polka-dots' },
  {
    title: 'Dynamic Scrollbar',
    date: '2026-07-01',
    category: 'Lab',
    href: '/lab/dynamic-scrollbar',
  },
  {
    title: 'Rotating Gallery',
    date: '2026-07-01',
    category: 'Lab',
    href: '/lab/rotating-gallery',
  },
  {
    title: 'ThreeJs Scene',
    date: '2026-07-01',
    category: 'Lab',
    href: '/lab/threejs-test',
  },
  { title: 'Opened the Lab', date: '2026-06-20', category: 'Lab', href: '/lab' },
  {
    title: '1820 Productions case study on Codrops',
    date: '2026-02-13',
    category: 'Writing',
    href: 'https://tympanus.net/codrops/2026/02/13/1820-productions-minimal-design-maximal-motion/',
  },
  {
    title: 'Joined the Awwwards jury',
    date: '2026-01-15',
    category: 'Award',
    href: 'https://www.awwwards.com/jury-member/carter-ogunsola',
  },
];

export function absoluteUrl(href: string): string {
  return href.startsWith('http') ? href : `https://carterogunsola.com${href}`;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface ChangelogItem {
  title: string;
  summary: string;
  date: string;
  tag: 'Feature' | 'Interactive' | 'Launch';
  href?: string;
}

export const SITE = {
  url: 'https://carterogunsola.com',
  name: 'Carter Ogunsola',
  role: 'Creative Developer & Brand Engineer',
  titleSeparator: ' :: ',
  description:
    'Creative developer, director, and entrepreneur crafting unique web experiences. A living lab of motion experiments, ideas and writing by Carter Ogunsola.',
  bio: 'Creative developer, director and entrepreneur. Lead web developer and brand engineer at Strive, founder of Balky Studio. Born in Lagos, based in Utah.',
  author: 'Carter Ogunsola',
  locale: 'en',
  ogLocale: 'en_US',
  ogImage: '/og/section/home.jpg',
  ogOrigin: 'https://carterogunsola.com',
  twitterHandle: '@CarterOgunsola',
  analytics: {
    ga: 'G-BQSNNQ5M5R',
  },
  themeColor: {
    light: '#d6d6d5',
    dark: '#1e1e1e',
  },
  studio: {
    name: 'Balky Studio',
    url: 'https://www.balky.studio/',
  },
  employer: {
    name: 'Strive',
    url: 'https://strivepharmacy.com',
  },
  odyn: {
    name: 'Odyn',
    url: 'https://www.odyn.dev/',
  },
  email: 'hello@carterogunsola.com',
  hud: {
    available: false,
    bookingLabel: 'Booking',
    nextOpen: 'Q1’27',
    timeZone: 'America/Denver',
  },
  presence: {
    host: 'carter-2026-presence.carterogunsola7589.workers.dev',
  },
  socials: {
    instagram: 'https://www.instagram.com/carterogunsola.dev/',
    x: 'https://x.com/CarterOgunsola',
    linkedin: 'https://www.linkedin.com/in/carterogunsola/',
    awwwards: 'https://www.awwwards.com/carter-ogunsola/',
    github: 'https://github.com/CarterOgunsola',
  },
} as const;

export const NAV_ITEMS: NavItem[] = [
  { label: 'About', href: '/about' },
  { label: 'Lab', href: '/lab' },
  { label: 'Writing', href: '/writing' },
  { label: 'Studio', href: '/studio' },
  { label: 'Contact', href: '/contact' },
];

export const LOGO_WORD_MAP: Record<string, string> = {
  '/': 'O',
  '/about': 'About',
  '/lab': 'Motion',
  '/writing': 'Writing',
  '/studio': 'Studio',
  '/contact': 'Contact',
};

export function getLogoWordForPath(pathname: string): string {
  if (pathname === '/') return 'O';
  const sorted = [...NAV_ITEMS].sort((a, b) => b.href.length - a.href.length);
  const match = sorted.find(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`)
  );
  if (!match) return 'O';
  return LOGO_WORD_MAP[match.href] ?? match.label;
}

export const CHANGELOG_ITEMS: ChangelogItem[] = [
  {
    title: 'Interactive writing index',
    summary: 'Folder shelf with hover peek, filter tabs and list view',
    date: '2026-04-06',
    tag: 'Feature',
    href: '/writing',
  },
  {
    title: 'Frank Ocean trading card',
    summary: 'Holographic Blonde foil card on the About page',
    date: '2026-04-04',
    tag: 'Interactive',
    href: '/about',
  },
  {
    title: 'DJ console',
    summary: 'Two-deck mixer with crossfader, EQ and pitch bend',
    date: '2026-04-01',
    tag: 'Interactive',
    href: '/about',
  },
  {
    title: 'The Personal Starter',
    summary: 'First essay — a starter kit of things I reach for',
    date: '2026-03-29',
    tag: 'Launch',
    href: '/writing/the-personal-starter',
  },
  {
    title: 'Physics lanyard',
    summary: 'Draggable Studio badge on a Verlet rope',
    date: '2026-03-26',
    tag: 'Interactive',
    href: '/studio',
  },
  {
    title: 'Contact envelope',
    summary: 'Wax-sealed letter that unfolds on scroll',
    date: '2026-03-23',
    tag: 'Interactive',
    href: '/contact',
  },
  {
    title: 'About spatial canvas',
    summary: 'Infinite draggable board of Polaroids, notes and stamps',
    date: '2026-03-20',
    tag: 'Feature',
    href: '/about',
  },
  {
    title: 'Page transition veil',
    summary: 'Torn-paper WebGL curtain with odometer boot counter',
    date: '2026-03-17',
    tag: 'Feature',
  },
  {
    title: 'Paper shader ground',
    summary: 'Full-bleed procedural paper with cursor wake and click ripples',
    date: '2026-03-14',
    tag: 'Feature',
  },
  {
    title: 'Notifications & changelog',
    summary: 'Header bell popover and a public ship log',
    date: '2026-03-11',
    tag: 'Feature',
    href: '/changelog',
  },
  {
    title: 'Command menu',
    summary: 'Keyboard palette for jumping pages and flipping theme',
    date: '2026-03-08',
    tag: 'Feature',
  },
  {
    title: 'Live HUD bar',
    summary: 'Mountain time clock, FPS counter, online presence and Web Vitals',
    date: '2026-03-05',
    tag: 'Feature',
  },
  {
    title: 'Lab archive',
    summary: 'Nine interactive motion studies with live demos and source breakdowns',
    date: '2026-03-03',
    tag: 'Launch',
    href: '/lab',
  },
  {
    title: 'Portfolio v3 launch',
    summary: 'New monochrome design system, wheel project archive and Astro rebuild',
    date: '2026-03-01',
    tag: 'Launch',
    href: '/',
  },
];

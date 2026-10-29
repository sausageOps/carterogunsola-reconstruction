export interface NavItem {
  label: string;
  href: string;
}

export interface ChangelogItem {
  title: string;
  summary: string;
  date: string;
  tag: string;
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
    title: 'Vocal Orb',
    summary: 'A small black hole that listens.',
    date: '2026-10-02',
    tag: 'Lab',
    href: '/lab/vocal-orb',
  },
  {
    title: 'The new site is live',
    summary: 'Rebuilt from scratch. The press out front is what the shop makes.',
    date: '2026-09-29',
    tag: 'Site',
    href: '/',
  },
  {
    title: 'The personal starter',
    summary: "What I'd call a personal starter, what I'd keep in one, and the one I use for my own sites.",
    date: '2026-09-15',
    tag: 'Writing',
    href: '/writing/the-personal-starter',
  },
  {
    title: 'Paste-Up',
    summary: 'One set of prints, three layout boards.',
    date: '2026-08-20',
    tag: 'Lab',
    href: '/lab/paste-up',
  },
  {
    title: 'Live Cursors',
    summary: 'Everyone else on the page, in real time.',
    date: '2026-07-18',
    tag: 'Lab',
    href: '/lab/live-cursors',
  },
  {
    title: 'Dial',
    summary: 'A tuner dial you spin, with a click pitched to how fast you spun.',
    date: '2026-07-10',
    tag: 'Lab',
    href: '/lab/dial',
  },
  {
    title: 'Heart',
    summary: "Taubin's implicit heart surface, solved into a point cloud and spun on canvas.",
    date: '2026-07-05',
    tag: 'Lab',
    href: '/lab/heart',
  },
  {
    title: 'Polka Dots',
    summary: 'A grid of dots run as one spring integration on a single ticker.',
    date: '2026-07-01',
    tag: 'Lab',
    href: '/lab/polka-dots',
  },
  {
    title: 'Dynamic Scrollbar',
    summary: 'A slim gray bar that blooms into a live analog clock as you scroll.',
    date: '2026-06-28',
    tag: 'Lab',
    href: '/lab/dynamic-scrollbar',
  },
  {
    title: 'Rotating Gallery',
    summary: 'A ring of image plates riding pure translateZ depth under a deep perspective.',
    date: '2026-06-20',
    tag: 'Lab',
    href: '/lab/rotating-gallery',
  },
  {
    title: 'ThreeJs Scene',
    summary: 'A vanilla Three.js scene, pared to the basis.',
    date: '2026-06-15',
    tag: 'Lab',
    href: '/lab/threejs-test',
  },
  {
    title: 'Opened the Lab',
    summary: 'A gallery of motion experiments, live and configurable.',
    date: '2026-06-10',
    tag: 'Lab',
    href: '/lab',
  },
  {
    title: '1820 Productions case study on Codrops',
    summary: 'Minimal design, maximal motion :: the full build breakdown.',
    date: '2026-02-13',
    tag: 'Writing',
    href: 'https://tympanus.net/codrops/2026/02/13/1820-productions-minimal-design-maximal-motion/',
  },
  {
    title: 'Joined the Awwwards jury',
    summary: 'Scoring the work for 2026.',
    date: '2026-01-15',
    tag: 'Award',
    href: 'https://www.awwwards.com/jury-member/carter-ogunsola',
  },
];

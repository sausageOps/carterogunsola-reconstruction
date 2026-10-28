// Phase 5 — Writing data, recovered from the original pages.
//
// `FOLDERS` is the byte-for-byte `application/json[data-folders-data]` payload that the
// original `/writing` index and `/writing/the-personal-starter` pages both embed
// (recovered from pages/writing.html and pages/writing_the-personal-starter.html —
// the two payloads are identical). The `excerpt` is the original's 1100-character
// truncation of the post opening; it is reproduced as-is (it feeds the shelf's
// screen-reader text only). `tone`/`stock` are null in the original.
//
// `POST` and `TOC` are the post's own head/structure values (title, description, date,
// masthead number, section ids) taken from the recovered post HTML.

export interface WritingFolder {
  title: string;
  href: string;
  date: string;
  cat: string;
  num: number;
  tone: string | null;
  stock: string | null;
  cover: string;
  summary: string;
  tldr: string;
  longDate: string;
  excerpt: string;
}

export const FOLDERS: WritingFolder[] = [
  {
    "title": "The personal starter",
    "href": "/writing/the-personal-starter",
    "date": "SEP 16 2026",
    "cat": "web",
    "num": 1,
    "tone": null,
    "stock": null,
    "cover": "index",
    "summary": "Templates, kits, starters, boilerplates etc. What I'd call a personal starter, what I'd keep in one, and the one I use for my own sites.",
    "tldr": "A personal starter has an audience of one, so what goes in is whatever keeps showing up in the sites I build, and whatever my next project deletes never belonged there. I keep the engines in small packages and let every project own and drift from the rest, because the smaller a starter stays, the longer it lasts.",
    "longDate": "Sep, 16, 2026",
    "excerpt": "If you're a web developer or software developer in today's world, you'd be familiar with the terms templates, kits, starters, boilerplates, generators, stacks etc. From my understanding as a developer, all of this in its simplest form aims at helping developers with code they refuse to write twice and will reuse. This concept has existed from Rails generators through HTML5 Boilerplate, Yeoman, create-react-app to the Remix Stacks, the Epic Stack, create-t3-app, the shadcn registry model and the list goes on. I'd in fact argue that your CSS libraries & frameworks, the likes of Bootstrap & Tailwind, sneak their way into this category because in a way, those CSS libraries & frameworks help you move fast with prewritten CSS styles. While I'm also a software developer, I'd prefer to keep this topic in the lens of a web developer. This is because I see how easy it is to mix up the product regime (SaaS-like starters) with what I'd call, for the sake of clarity in this writing, the \"studio regime\", which focuses more on websites. A third piece, and it's the subject of this post's stance, is "
  }
];

export const WRITING_INDEX = {
  title: 'Writing',
  description:
    'Notes on design, development, motion, tools, creativity, and sometimes life outside of work.',
  ogImage: '/og/section/writing.jpg',
  intro: [
    'Here’s my corner of the internet where I get to think out loud, explore ideas, and share what I’m learning along the way. I write about whatever I’m curious about — design, development, motion, tools, creativity, and sometimes life outside of work too.',
    'I write to provide value, but also because teaching and documenting is one of the best ways to learn. So while you take something away from these pieces, I’m growing through them as well.',
    'The goal is simple: help you think differently, build better, and keep creating cool things on the web and beyond.',
  ],
  archiveLabel: '2026',
  filters: ['all', 'web', 'design', 'motion', 'tools', 'life'] as const,
  empty: 'Nothing filed here yet',
} as const;

export const POST = {
  slug: FOLDERS[0].href.replace('/writing/', ''),
  title: 'The personal starter',
  /** `<title>` = "The personal starter :: Writing :: Carter Ogunsola" */
  pageTitle: 'The personal starter :: Writing',
  description:
    "Templates, kits, starters, boilerplates etc. What I'd call a personal starter, what I'd keep in one, and the one I use for my own sites.",
  ogImage: '/og/writing/the-personal-starter.jpg',
  /** shelf/slug badge: `N°01` */
  num: 'N°01',
  masthead: 'Carter Ogunsola:: Writing',
  date: 'Sep, 16, 2026',
  tldr: FOLDERS[0].tldr,
  folder: FOLDERS[0],
} as const;

/**
 * The archive row chips, verbatim from the original `/writing` row markup
 * (`Sep 16`, `2026`, `web` — the date chip drops the year and the year chip is
 * the pill), keyed by post slug.
 */
export const ROW_TAGS: Record<string, { date: string; year: string }> = {
  'the-personal-starter': { date: 'Sep 16', year: '2026' },
};

export interface TocItem {
  id: string;
  label: string;
}

/** The post's seven sections, in the original rail order. */
export const TOC: TocItem[] = [
  { id: 'product-vs-studio', label: 'Product vs studio' },
  { id: 'the-personal-starter', label: 'The personal starter' },
  { id: 'what-goes-in', label: 'What goes in' },
  { id: 'shape-and-engines', label: 'Shape and engines' },
  { id: 'keeping-projects-in-sync', label: 'Keeping projects in sync' },
  { id: 'why-small', label: 'Why small' },
  { id: 'odyn-astro-starter', label: 'Odyn Astro starter' },
];

export interface Credit {
  label: string;
  href: string;
}

/** The six credits rows, verbatim (labels + outbound URLs) from the recovered post. */
export const CREDITS: Credit[] = [
  { label: 'CarterOgunsola / odyn-astro-starter', href: 'https://github.com/CarterOgunsola/odyn-astro-starter' },
  { label: 'Epic Stack :: managing updates', href: 'https://github.com/epicweb-dev/epic-stack/blob/main/docs/managing-updates.md' },
  { label: 'Epic Stack :: decisions', href: 'https://github.com/epicweb-dev/epic-stack/tree/main/docs/decisions' },
  { label: 'create-t3-app :: introduction', href: 'https://create.t3.gg/en/introduction' },
  { label: 'antfu / starter-ts', href: 'https://github.com/antfu/starter-ts' },
  { label: 'antfu-collective / vitesse', href: 'https://github.com/antfu-collective/vitesse' },
];

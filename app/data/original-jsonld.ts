/** Shared Person + WebSite JSON-LD copied from the saved original page heads. */
export const ORIGINAL_SITE_JSONLD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://carterogunsola.com/#person',
      name: 'Carter Ogunsola',
      url: 'https://carterogunsola.com',
      image: 'https://carterogunsola.com/og/section/home.jpg',
      jobTitle: 'Creative Developer & Brand Engineer',
      description:
        'Creative developer, director and entrepreneur. Lead web developer and brand engineer at Strive, founder of Balky Studio. Born in Lagos, based in Utah.',
      birthPlace: { '@type': 'Place', name: 'Lagos, Nigeria' },
      homeLocation: { '@type': 'Place', name: 'Utah, United States' },
      worksFor: [
        { '@type': 'Organization', name: 'Strive', url: 'https://strivepharmacy.com' },
        { '@type': 'Organization', name: 'Balky Studio', url: 'https://www.balky.studio/' },
      ],
      sameAs: [
        'https://www.instagram.com/carterogunsola.dev/',
        'https://x.com/CarterOgunsola',
        'https://www.linkedin.com/in/carterogunsola/',
        'https://www.awwwards.com/carter-ogunsola/',
        'https://github.com/CarterOgunsola',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://carterogunsola.com/#website',
      url: 'https://carterogunsola.com',
      name: 'Carter Ogunsola',
      description:
        'Creative developer, director, and entrepreneur crafting unique web experiences. A living lab of motion experiments, ideas and writing by Carter Ogunsola.',
      inLanguage: 'en',
      publisher: { '@id': 'https://carterogunsola.com/#person' },
    },
  ],
} as const;

/** `/writing/the-personal-starter` — Person + WebSite + BlogPosting + BreadcrumbList (saved original head). */
export const WRITING_POST_JSONLD = {
  '@context': 'https://schema.org',
  '@graph': [
    ...ORIGINAL_SITE_JSONLD['@graph'],
    {
      '@type': 'BlogPosting',
      '@id': 'https://carterogunsola.com/writing/the-personal-starter#article',
      headline: 'The personal starter',
      description:
        'A personal starter has an audience of one, so what goes in is whatever keeps showing up in the sites I build, and whatever my next project deletes never belonged there. I keep the engines in small packages and let every project own and drift from the rest, because the smaller a starter stays, the longer it lasts.',
      abstract:
        'A personal starter has an audience of one, so what goes in is whatever keeps showing up in the sites I build, and whatever my next project deletes never belonged there. I keep the engines in small packages and let every project own and drift from the rest, because the smaller a starter stays, the longer it lasts.',
      datePublished: '2026-09-16T00:00:00.000Z',
      dateModified: '2026-09-16T00:00:00.000Z',
      image: 'https://carterogunsola.com/og/writing/the-personal-starter.jpg',
      articleSection: 'web',
      wordCount: 1066,
      author: {
        '@type': 'Person',
        '@id': 'https://carterogunsola.com/#person',
        name: 'Carter Ogunsola',
        url: 'https://carterogunsola.com',
      },
      publisher: {
        '@type': 'Person',
        '@id': 'https://carterogunsola.com/#person',
        name: 'Carter Ogunsola',
        url: 'https://carterogunsola.com',
      },
      mainEntityOfPage: 'https://carterogunsola.com/writing/the-personal-starter',
      inLanguage: 'en',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://carterogunsola.com/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Writing',
          item: 'https://carterogunsola.com/writing/',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'The personal starter',
          item: 'https://carterogunsola.com/writing/the-personal-starter',
        },
      ],
    },
  ],
} as const;

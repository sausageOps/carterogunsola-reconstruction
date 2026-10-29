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

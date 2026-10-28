// The order, names, categories and media paths are taken from pages/lab.html.
// Full per-experiment documentation is available only for Dial and Vocal Orb.
export interface LabItem {
  slug: string;
  name: string;
  category: string;
  isNew: boolean;
  poster: string;
  reel: string;
  description?: string;
}

export const LAB_ITEMS: LabItem[] = [
  { slug: 'live-cursors', name: 'Live Cursors', category: 'Interaction', isNew: true, poster: 'lab/live-cursors/poster-r3.jpg', reel: 'lab/live-cursors/reel-r3.mp4' },
  { slug: 'dial', name: 'Dial', category: 'Interaction', isNew: true, poster: 'lab/dial/poster-v2.jpg', reel: 'lab/dial/reel-v2.mp4', description: 'A tuner dial you spin: a full ring of channels hubbed off-screen left, one active where it crosses the axis. Drag, scroll, or arrow-key it; each detent snaps with an elastic settle and a click pitched to how fast you spun.' },
  { slug: 'polka-dots', name: 'Polka Dots', category: 'Canvas', isNew: false, poster: 'lab/polka-dots/poster-v2.jpg', reel: 'lab/polka-dots/reel.mp4' },
  { slug: 'heart', name: 'Heart', category: 'Canvas', isNew: true, poster: 'lab/heart/poster-v3.jpg', reel: 'lab/heart/reel-v2.mp4' },
  { slug: 'threejs-test', name: 'ThreeJs Scene', category: '3D', isNew: false, poster: 'lab/threejs-test/poster.jpg', reel: 'lab/threejs-test/reel.mp4' },
  { slug: 'dynamic-scrollbar', name: 'Dynamic Scrollbar', category: 'UI', isNew: false, poster: 'lab/dynamic-scrollbar/poster-r2.jpg', reel: 'lab/dynamic-scrollbar/reel-r3.mp4' },
  { slug: 'rotating-gallery', name: 'Rotating Gallery', category: 'Gallery', isNew: false, poster: 'lab/rotating-gallery/poster-nc.jpg', reel: 'lab/rotating-gallery/reel.mp4' },
  { slug: 'paste-up', name: 'Paste-Up', category: 'Transition', isNew: true, poster: 'lab/paste-up/poster-nc.jpg', reel: 'lab/paste-up/reel.mp4' },
  { slug: 'vocal-orb', name: 'Vocal Orb', category: '3D', isNew: true, poster: 'lab/vocal-orb/poster-v1.jpg', reel: 'lab/vocal-orb/reel-v1.mp4', description: 'A small black hole that listens. Talk and it moves with your voice, writes back what you said, picks up the mood of it, and can play your own voice back through a few effects. All of it runs on your device.' },
];

export const labHref = (item: LabItem): string => `/lab/${item.slug}`;

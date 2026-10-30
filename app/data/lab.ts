// The order, names, categories and media paths are taken from pages/lab.html.
// Descriptions are the original per-experiment summaries verbatim (from the
// saved dial/vocal-orb captures and the recovered lab documents — see
// lab-evidence.ts and recon/lab/ for provenance).
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
  { slug: 'live-cursors', name: 'Live Cursors', category: 'Interaction', isNew: true, poster: 'lab/live-cursors/poster-r3.jpg', reel: 'lab/live-cursors/reel-r3.mp4', description: "Everyone else on the page, in real time. You broadcast your pointer as a 0-to-1 position, a Cloudflare Durable Object fans it out, and each peer eases toward its latest spot, on the same server that counts who's online in the header." },
  { slug: 'dial', name: 'Dial', category: 'Interaction', isNew: true, poster: 'lab/dial/poster-v2.jpg', reel: 'lab/dial/reel-v2.mp4', description: 'A tuner dial you spin: a full ring of channels hubbed off-screen left, one active where it crosses the axis. Drag, scroll, or arrow-key it; each detent snaps with an elastic settle and a click pitched to how fast you spun.' },
  { slug: 'polka-dots', name: 'Polka Dots', category: 'Canvas', isNew: false, poster: 'lab/polka-dots/poster-v2.jpg', reel: 'lab/polka-dots/reel.mp4', description: "A grid of dots run as one spring integration on a single ticker. The cursor repels and blooms them, a click sends a ripple through the field, and a slow wave keeps it breathing at rest." },
  { slug: 'heart', name: 'Heart', category: 'Canvas', isNew: true, poster: 'lab/heart/poster-v3.jpg', reel: 'lab/heart/reel-v2.mp4', description: "Taubin's implicit heart surface, solved into a point cloud and spun on canvas. Grab it and it coasts on its own momentum, the outer points trailing elastically, tone carried by a monochrome halftone." },
  { slug: 'threejs-test', name: 'ThreeJs Scene', category: '3D', isNew: false, poster: 'lab/threejs-test/poster.jpg', reel: 'lab/threejs-test/reel.mp4', description: "A vanilla Three.js scene, pared to the basis: a renderer on a canvas, a camera, orbit controls, a render loop. On the stage, a loaded glTF model or a superformula that morphs between four shapes, each drawn as surface, mesh or vertices, in one of four finishes baked from a lit sphere." },
  { slug: 'dynamic-scrollbar', name: 'Dynamic Scrollbar', category: 'UI', isNew: false, poster: 'lab/dynamic-scrollbar/poster-r2.jpg', reel: 'lab/dynamic-scrollbar/reel-r3.mp4', description: "A slim gray bar that inks to black and blooms into a live analog clock as you scroll, then taps open into a working native-audio mini player. A faithful rebuild of Xavier Jac's three-state Webflow scrollbar, on its own Lenis-style smooth scroll." },
  { slug: 'rotating-gallery', name: 'Rotating Gallery', category: 'Gallery', isNew: false, poster: 'lab/rotating-gallery/poster-nc.jpg', reel: 'lab/rotating-gallery/reel.mp4', description: "A ring of image plates riding pure translateZ depth under a deep perspective. Drag, scroll, or let it drift, the front card live and in color. Hit the grid button and the same cards re-parent into a grid via GSAP Flip." },
  { slug: 'paste-up', name: 'Paste-Up', category: 'Transition', isNew: true, poster: 'lab/paste-up/poster-nc.jpg', reel: 'lab/paste-up/reel.mp4', description: "One set of prints, three layout boards. The DOM lays out invisible boxes; WebGL planes sit on them, each claimed by an ID. Switch boards and the prints fly to their new homes. The transition is never written, only implied. Landberg's mirrored-DOM mechanism, on the paste-up table." },
  { slug: 'vocal-orb', name: 'Vocal Orb', category: '3D', isNew: true, poster: 'lab/vocal-orb/poster-v1.jpg', reel: 'lab/vocal-orb/reel-v1.mp4', description: 'A small black hole that listens. Talk and it moves with your voice, writes back what you said, picks up the mood of it, and can play your own voice back through a few effects. All of it runs on your device.' },
];

export const labHref = (item: LabItem): string => `/lab/${item.slug}`;

// Phase 8 — the nine Lab experiment engines.
//
// The original site registered the same map in its Lab document chunk
// (src/lab-doc.DKrI-8eU.js): one lazy `import()` per slug, handed to the
// shared document engine, which mounts the module's `default` into the stage
// viewport and applies `config` to the Tune panel. Only the import specifiers
// and the vocal-orb caption host wrapper differ here.
import { registerLabExperiment } from './lab-doc.js';

// models.carterogunsola.com is the original host the document engine passed to
// the vocal-orb engine as `captionHost`; the engine uses it to fetch the
// transformers runtime, phonemizer and Kokoro voice files.
const CAPTION_HOST = 'https://models.carterogunsola.com';

const loaders = {
  'live-cursors': () => import('./experiments/live-cursors.js'),
  dial: () => import('./experiments/dial.js'),
  'polka-dots': () => import('./experiments/polka-dots.js'),
  heart: () => import('./experiments/heart.js'),
  'threejs-test': () => import('./experiments/threejs-test.js'),
  'dynamic-scrollbar': () => import('./experiments/dynamic-scrollbar.js'),
  'rotating-gallery': () => import('./experiments/rotating-gallery.js'),
  'paste-up': () => import('./experiments/paste-up.js'),
  // The saved original wrapped this loader to inject the caption host:
  //   { config: e.config, default: { mount: t => e.default.mount(t, { captionHost: s }) } }
  'vocal-orb': () =>
    import('./experiments/vocal-orb.js').then((module) => ({
      config: module.config,
      default: { mount: (el) => module.default.mount(el, { captionHost: CAPTION_HOST }) },
    })),
};

for (const [slug, load] of Object.entries(loaders)) {
  registerLabExperiment(slug, load);
}

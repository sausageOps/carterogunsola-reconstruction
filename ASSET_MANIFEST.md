# ASSET MANIFEST — carterogunsola.com

Media **references only** — nothing was bulk-downloaded (Phase 0 restriction). Full URL list saved at `recon/asset-urls.txt` (108 unique URLs). Counts below are unique URLs after normalizing cdn-cgi transform variants where noted.

## Summary counts

| Category | Count | Notes |
|---|---|---|
| Project images (`subject.jpg` + `hero.jpg`, 17 projects) | 34 | via `cdn-cgi/image/width=1280,quality=86,format=auto/` |
| Depth maps (`subject.depth.png`, 17) | 17 | raw PNG on assets CDN, used for image-plane displacement in wheels |
| Project reels (`reel.mp4`) | 6 | Clay, Helion, Scott Snyder, Eden Tech, Strive Rx, 1820 |
| Logo plates (`/media/plates/*`) | 17 | 14 SVG + 3 PNG (clay.png, pny.png, eden-tech.png) |
| Lab posters | 9 files × 2 widths (720, 960) | `cdn-cgi/image/width={720|960},quality=86,format=auto/lab/{slug}/poster*.jpg` |
| Lab reels | 9 | `assets.carterogunsola.com/lab/{slug}/reel*.mp4` |
| OG images (1200×630 JPG) | 8 | `/og/section/{home,about,lab,contact,studio,writing}.jpg`, `/og/lab/dial.jpg`, `/og/writing/the-personal-starter.jpg` |
| Fonts (woff2) | 24 files | see below |
| Icons / favicons | 6 | favicon.svg, favicon-dark.svg (light/dark adaptive variants), favicon.ico, apple-touch-icon.png, icon-192.png, icon-512.png |
| Portrait | 2 | `/_astro/carter-stamp.BRpWjIXQ_{4vkhB,ZH60A1}.webp` (1000w + 560w srcset, 1000×1250) |
| Radio art fallback | 1 | `/og-default.png` (referenced by console easter egg) |
| Inline textures | 4 | CSS data-URI SVG feTurbulence grains (fiber/tooth/carton/dots), theme-switched alphas |
| JS chunks | 40 files | saved under `recon/src/` (see §6) |
| CSS chunks | 10 files | saved under `recon/src/` |

## Fonts (24 woff2, self-hosted)

| Family | Files | Weights | Usage |
|---|---|---|---|
| Oracle (Variable) | `/fonts/oracle/Oracle-Variable.woff2` | 200–1000, oblique 0–13° | `--font-sans` primary; display/headings; preloaded on `/` |
| Geist Variable | `/_astro/geist-{latin,latin-ext,cyrillic,cyrillic-ext,vietnamese}-wght-normal.*.woff2` | 100–900 variable | sans fallback |
| Geist Mono Variable | `/_astro/geist-mono-{latin,latin-ext,cyrillic,cyrillic-ext,vietnamese,symbols2}-wght-normal.*.woff2` | 100–900 variable | mono fallback |
| PP Neue Montreal Mono | `/fonts/pp-neue-montreal-mono/PPNeueMontrealMono-{Thin,Book,RegularItalic,Bold,Medium,BoldItalic}.woff2` | 6 static | `--font-mono` primary (HUD, chips, meta) |
| Geist Pixel (Square/Circle/Grid/Line/Triangle) | `/fonts/geist-pixel/GeistPixel-*.woff2` | 500 | `--font-pixel`, `.u-pixel` |
| Untitled Sans (Variable) | `/fonts/untitled-sans/UntitledSans-Variable.woff2` | 300–900 | loaded; utility usage |

## Project assets (17) — pattern per project `{p}`

- `https://assets.carterogunsola.com/cdn-cgi/image/width=1280,quality=86,format=auto/projects/{p}/subject.jpg` — wheel "hand" front image
- `https://assets.carterogunsola.com/cdn-cgi/image/width=1280,quality=86,format=auto/projects/{p}/hero.jpg` — wheel "hand" back/hover image
- `https://assets.carterogunsola.com/projects/{p}/subject.depth.png` — depth map (grayscale PNG)
- `/media/plates/{logo}` — monogram plate (see wheels-data.json: clay.png, helion.svg, scott-snyder.svg, heva.svg, abcau.svg, pny.png, hamilton-ai.svg, vesyl.svg, vana-2024.svg, vana-x-team.svg, vana-q4.svg, tsm.svg, originalform.svg, firelight.svg, eden-tech.png, strive.svg, 1820.svg)
- `https://assets.carterogunsola.com/projects/{p}/reel.mp4` — hover reel (6 projects only)

Project slugs: clay, helion, scott-snyder, heva, abcau, pny, hamilton-ai, vesyl, vana-2024, vana-x-team, vana-q4, tsm, originalform, firelight, eden-tech, strive, 1820.
Full metadata (name/collab/year/href/mono): `recon/wheels-data.json`.

## Lab assets (9 experiments)

| Slug | Poster (720 & 960 via cdn-cgi) | Reel (raw mp4) | OG |
|---|---|---|---|
| live-cursors | `lab/live-cursors/poster-r3.jpg` | `lab/live-cursors/reel-r3.mp4` | section/lab.jpg |
| dial | `lab/dial/poster-v2.jpg` | `lab/dial/reel-v2.mp4` | `/og/lab/dial.jpg` |
| polka-dots | `lab/polka-dots/poster-v2.jpg` | `lab/polka-dots/reel.mp4` | section/lab.jpg |
| heart | `lab/heart/poster-v3.jpg` | `lab/heart/reel-v2.mp4` | section/lab.jpg |
| threejs-test | `lab/threejs-test/poster.jpg` | `lab/threejs-test/reel.mp4` | section/lab.jpg |
| dynamic-scrollbar | `lab/dynamic-scrollbar/poster-r2.jpg` | `lab/dynamic-scrollbar/reel-r3.mp4` | section/lab.jpg |
| rotating-gallery | `lab/rotating-gallery/poster-nc.jpg` | `lab/rotating-gallery/reel.mp4` | section/lab.jpg |
| paste-up | `lab/paste-up/poster-nc.jpg` | `lab/paste-up/reel.mp4` | section/lab.jpg |
| vocal-orb | `lab/vocal-orb/poster-v1.jpg` | `lab/vocal-orb/reel-v1.mp4` | section/lab.jpg |

Rotating-gallery plate images (runtime): `cdn-cgi/image/width=640,quality=86,format=auto/dts/unwrapped/DTS_Unwrapped_by_FRANCO_DUPUY_${i}.jpg`.
threejs-test external model: `https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Assets@2bac6f8c57bf471df0d2a1e8a8ec023c7801dddf/Models/Lantern/glTF-Binary/Lantern.glb`.
vocal-orb models host: `https://models.carterogunsola.com` (GLTF assets, worker-loaded).

## Icons (inline SVG symbols, `ai:local:*` sprite defined per page)

arrow-right, github, imac, instagram, magnifying-glass, moon, sun, user-zap, x, book-open, close, plus socials (x/instagram/github/awwwards), UI glyphs (bell, search, hamburger bars, arrows for arrow-roll, chevrons, copy, wrap, external). Stroke style: `fill="none" stroke="currentColor" stroke-width="1.5"`, viewBox 24. Socials use `fill="currentColor"` paths. All inline — no icon font/CSS icon files.

## App icons / favicons

- `/favicon.svg` — adaptive (own `prefers-color-scheme` media query); `/favicon-dark.svg` (default), `/favicon-light.svg` — fixed variants swapped by theme script
- `/favicon.ico`, `/apple-touch-icon.png` (4637 B), `/icon-192.png` (4396 B), `/icon-512.png` (16530 B, maskable+any)
- `<meta name="theme-color">` `#d6d6d5` (light) / `#1e1e1e` (dark); manifest bg/theme `#d6d6d5`

## Front-end code assets (saved to `recon/src/` for the blueprint)

Shared/base: `Base.astro_astro_type_script_index_0_lang.BR2GwRUH.js` (app bootstrap, 140 KB), `Base.C-Njm2nK.css` (59 KB), `ClientRouter...js`, `page.CENh9UKf.js` (prefetch init), `prefetch.BhDfpIsL.js`, `client.dBBHJp23.js` (view-transition persist helpers), `mesh.DnpBQ695.js` (shared lib incl. **GSAP**, **Lenis**, math/spring helpers, 244 KB), `dist.C3hNWf9G.js` (number-flow component), `canvas.D0rBfPBj.js`, `gl-warm.Cs1frxOX.js`, `mesh-wire.CQ-5TR8b.js`, `css3d.DQxlWk7_.js`, `console.xeJmjuZO.js` (music-console easter egg), `assets.DBbF6dnf.js` (CDN url helpers: `asset()`, `img()` with cdn-cgi transform builder), three.js: `three.module.DBbmgHoE.js`, `GLTFLoader.BD7CsO-c.js`, `RoomEnvironment.CsPbsEjR.js`, `BufferGeometryUtils.DWdZA4ij.js`.

Per-page: `wheels.BZ7Tz2K5.js`, `folders.HEy6JhQA.js`, `folders-flight.BWHyG9ew.js`, `frank-card.BYMmn-HQ.js`, `lanyard.GSKzBzbt.js`, `letter.LA9KroNb.js`, `lab-doc.DKrI-8eU.js`, `lab-index.tOmEqoaB.js`, `studio-env.ExNDzFhz.js`, `writing-post.CB6dnry2.js`, `about-artifacts.DOeGaaTw.js`, `about-radio.UTJqP0B8.js`, `deck.DbC3PTPJ.js`, `record.astro_astro_type_script...js`, `ec.0vx5m.js` (expressive-code enhancer).

Per-experiment chunks: `dial._0WTp1k0.js` (44.7 KB), `vocal-orb.Cv5LUT2z.js` (84.6 KB), `threejs-test.CNSPgjYT.js` (35.5 KB), `dynamic-scrollbar.Ia0FQs2Y.js` (16.2 KB), `rotating-gallery.Cu-VrtOq.js` (12.2 KB), `paste-up.DESythSE.js` (12.0 KB), `live-cursors.Dr9kI1HH.js` (4.7 KB), `polka-dots.C3pPEB_M.js` (4.0 KB), `heart.HHFn1w7T.js` (4.3 KB).

Per-page CSS: `Frank.CeeoI0Md.css`, `about.CYiwxt8A.css`, `index.Bj6efvgI.css` (lab), `contact.DaXd3pkc.css`, `writing.C1dRexZC.css`, `record.BkvaRQdW.css`, `_slug_.VRPbIO_Q.css` (lab detail), `_slug_.BZeeZM_C.css` (writing post), `Grid.Cu8GCU57.css` (dev-grid overlay), `ec.2v5bd.css` (expressive-code).

## Saved raw pages (evidence, `recon/pages/`)

`about.html` (143 KB), `lab.html` (146 KB), `contact.html` (76 KB), `studio.html` (74 KB), `writing.html` (76 KB), `record.html` (73 KB), `changelog.html` (91 KB), `lab_dial.html` (481 KB), `lab_vocal-orb.html` (1.59 MB), `writing_the-personal-starter.html` (103 KB); plus `/home/user/homepage.html` (108 KB), `recon/wheels-data.json`, `recon/asset-urls.txt`.

## Assets not identifiable / not accessible

- Exact pixel dimensions of posters/reels/plates (only content-length known for a few; cdn-cgi transforms make originals resizable on demand — treat as "any width available").
- `models.carterogunsola.com` file list (only referenced from lab-doc/vocal-orb code).
- Presence worker internals (PartyKit server code not public).
- Homepage wheel plate arrangement geometry (runtime-tuned in wheels.js).

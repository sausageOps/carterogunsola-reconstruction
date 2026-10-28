# ROUTE INVENTORY — carterogunsola.com

Discovery sources: `/sitemap-index.xml` → `/sitemap-0.xml` (17 URLs), in-page nav/cmd palette/drawer, `/robots.txt`, link graph, feed files. Inspection date: 2026-10-28.
Inspection status legend: **F** = full (rendered text + raw HTML saved & analyzed + page JS/CSS chunks analyzed) · **T** = rendered text captured + shared template/chunks analyzed (raw HTML not saved) · **H** = headers/protocol only.

## HTML pages (18)

| # | Route | Title | Purpose | Key unique components | Shared chrome | Interactions | Status |
|---|---|---|---|---|---|---|---|
| 1 | `/` | Carter Ogunsola :: Creative Developer & Brand Engineer | Home / hero / selected work | `.hv2__stage[data-wheels]` two linked 3D wheels (17 projects, depth maps, logo plates, reels), JS odometers (`N°01`, `N°02`, encoded year `17NN°°0011//1177`), center drum (eyebrow/title/chips/CTA); `.hv2__classic` 17-row fallback list; inline `json[data-wheels-data]` | header, cmd, notif, drawer, toaster, progress, veil, paper/shelf/flight canvases | drag/scroll/arrow-wheel, drum text swap, depth-plane parallax, hover reels, Reveal, halftone | **F** (homepage.html saved; wheels.BZ7Tz2K5.js analyzed) |
| 2 | `/about` | About :: Carter Ogunsola | Bio board ("The Front Office") | `.ov3` board: ticket header, frank-card hero (tilt 3D + stamp photo + shine + imprints), telemetry card (clock/pos/online/commits sparkline), radio card (deck + console + EQ), LOS→SGU tag card, 3 dialogs (letter/record/onfile), drawer tabs | chrome + dialogs system | tilt, marks texture, live telemetry, radio tuning states/EQ, dialog open/close, canvas layers | **F** |
| 3 | `/lab` | Lab :: Carter Ogunsola | Lab index — motion experiments | `.lab` list ×9 (+duplicated aria-hidden set), `.pblur` edges, List/Wheel/Grid toggle, hover preview (poster + reel video) | chrome | mode switch (localStorage `lab-mode`), cursor-following preview w/ video swap, scroll | **F** |
| 4 | `/lab/live-cursors` | Live Cursors :: Lab | Experiment: other visitors' cursors in real time | labd template + presence-driven cursor layer | chrome + labd | PartyKit presence room; cursor broadcast; reduced-motion fallback | **T** (chunk live-cursors.Dr9kI1HH.js analyzed) |
| 5 | `/lab/dial` | Dial :: Lab | Experiment: tuner dial (26-channel ring, elastic detent, pitch-scaled click) | labd docs: article "A radio you can’t listen to…", code html/css/js/ts, GSAP dependency row | chrome + labd | drag/scroll/arrow spin, damping, WebAudio click, configurator (weight/settle/sensitivity/detent/accent swatches) | **F** (lab_dial.html saved, 481 KB) |
| 6 | `/lab/polka-dots` | Polka Dots :: Lab | Experiment: dot grid, one spring integration, single ticker | labd docs | chrome + labd | canvas spring grid, shared ticker, pointer influence | **T** (chunk analyzed) |
| 7 | `/lab/heart` | Heart :: Lab | Experiment: Taubin implicit heart → point cloud, spun on canvas | labd docs | chrome + labd | canvas point cloud, rotation, pointer | **T** (chunk analyzed) |
| 8 | `/lab/threejs-test` | ThreeJs Scene :: Lab | Experiment: parametric superellipse 3D scene | labd docs | chrome + labd | three.js shapes (lantern/orb/bloom/shell/spike), materials (studio/chrome/wax/ink), GLTF Lantern load, configurator (accent/finish/polish/spin/pointSize/lobes/sharp) | **T** (chunk analyzed) |
| 9 | `/lab/dynamic-scrollbar` | Dynamic Scrollbar :: Lab | Experiment: slim scrollbar blooms into live analog clock | labd docs | chrome + labd | custom scrollbar, clock morph on scroll, credits (osmo.supply, angularicons, KMkota0) | **T** (chunk analyzed) |
| 10 | `/lab/rotating-gallery` | Rotating Gallery :: Lab | Experiment: ring of image plates, pure translateZ depth, deep perspective | labd docs | chrome + labd | draggable ring, perspective 4000, per-image eases, configurator (drift/weight/depth/morph/imgEase) | **T** (chunk analyzed) |
| 11 | `/lab/paste-up` | Paste-Up :: Lab | Experiment: one set of prints, three layout boards | labd docs | chrome + labd | board layout transitions, plane wipes | **T** (chunk analyzed) |
| 12 | `/lab/vocal-orb` | Vocal Orb :: Lab | Experiment: WebGL2 "black hole that listens" — mic → mood → captions → TTS speak-back | labd docs (largest page, 1.5 MB HTML) | chrome + labd | getUserMedia + AudioWorklet, HF worker inference (mood/emotion), captions, speech playback, bloom post chain, configurator | **F** (lab_vocal-orb.html saved) |
| 13 | `/writing` | Writing :: Carter Ogunsola | Writing index | `.wstage[data-folders]` 3D folder shelf (hidden until JS) + tooltip; `.writing__classic` intro + `2026 ::` archive + category filter tabs (All/web/design/motion/tools/life) + rows + empty state; `json[data-folders-data]` | chrome | folder shelf browse (arrow/Enter), filter tabs, hover rows | **F** |
| 14 | `/writing/the-personal-starter` | The personal starter :: Writing | Long-form post (only post) | `.wpost`: TOC rail (scrollspy, collapsible), masthead `N°01`, date, TL;DR aside, prose (7 sections), expressive-code blocks, credits refrows, signature SVG (`data-sig-pts`) | chrome + flight transition (folders-flight + flight-gl canvas) | TOC scrollspy, folder flight in/out, copy buttons, signature draw | **F** |
| 15 | `/studio` | Studio :: Carter Ogunsola | Studio promo (Balky Studio) | `.lstage[data-lanyard]` 3D draggable ID badge (canvas) + visit infotip; `.studio__classic` fallback tile link | chrome | lanyard physics swing (three.js), env map, tooltip | **F** |
| 16 | `/contact` | Contact :: Carter Ogunsola | Contact — letter-writing form | `.desk[data-letter]` bg canvas; `.sheet` form (date, RE radios, FROM/VIA underlined inputs, ruled textarea, signature ink canvas + slip dialog pad, typed name, status line, Send it / Keep a copy, closed-counter note); `.stub` job ticket (JOB/RECEIVED/REPLY BY/STATUS/FILE UNDER + barcode) | chrome + dialogs | signature capture (pointer), validation notes, POST `/api/contact`, stamp, stub updates, mailto fallback, CF email decode | **F** |
| 17 | `/record` | Record :: Carter Ogunsola | Screen-recording stage (Screen Studio helper) | `.rec` framed iframe stage; control bar: route select (5 site + 9 lab), URL input, 8 resolution presets, W×H inputs, Fit/Bare(+Docs/Cfg)/Hide UI toggles, readout; hint about ⌘⇧5 | chrome | iframe staging, `data-bare` injection, resize presets, keyboard H/Esc | **F** |
| 18 | `/changelog` | Changelog :: Carter Ogunsola | Ship log 2026 | `.log.container`: intro (feed links), `2026 ::`, 14 rows (date + category chips) | chrome | hover rows, feed links | **F** |

Not in sitemap but linked in chrome: `/record` (Tools), plus 404 route.

## Non-HTML routes

| Route | Type | Notes | Status |
|---|---|---|---|
| `/rss.xml` | RSS 2.0 (Writing feed, `content:encoded` full text, styled by `/feed.xsl`) | 1 item (The personal starter) | **F** |
| `/changelog.xml` | RSS 2.0 ship log (items with `<category>`) | 14 items | **F** |
| `/feed.json` | JSON Feed 1.1 ("Carter Ogunsola :: Ship log", home `/changelog`) | 14 items w/ tags | **F** |
| `/feed.xsl` | XSL stylesheet for RSS rendering | application/xml | **H** (200) |
| `/robots.txt` | Allows all crawlers incl. AI training/answer bots; points to sitemap-index | | **F** |
| `/sitemap-index.xml` | → `/sitemap-0.xml` (17 `<loc>` URLs) | | **F** |
| `/site.webmanifest` | PWA manifest: name "Carter Ogunsola", short "Carter", standalone, bg/theme `#d6d6d5`, icons `/icon-192.png`, `/icon-512.png` (maskable+any), `/favicon.svg` | | **F** |
| `/api/contact` | POST JSON contact endpoint (Cloudflare Pages Function) | empty `{}` → HTTP 400 application/json (validation live) | **H** |
| `/{anything-else}` | 404 page: "This page wandered off." + Back home + full chrome | | **F** (via /sitemap.xml 404) |

## Static asset route families (see ASSET_MANIFEST.md)

`/_astro/*` (JS/CSS/fonts/images, hashed), `/fonts/*` (oracle, geist-pixel, pp-neue-montreal-mono, untitled-sans), `/media/plates/*` (17 logo plates), `/og/section/*.jpg` + `/og/lab/*.jpg` + `/og/writing/*.jpg` (1200×630), `/favicon.svg` + `/favicon-dark.svg` (+ `/favicon-light.svg` referenced by theme script), `/favicon.ico`, `/apple-touch-icon.png`, `/icon-192.png`, `/icon-512.png`, `/og-default.png` (radio art fallback), external: `assets.carterogunsola.com/**` (images via cdn-cgi transforms, depth PNGs, reels), `models.carterogunsola.com/**`.

## Route graph (internal links)

`/` ↔ all pages via nav/cmd/drawer · `/about` → dialogs (internal), `/writing`, `/lab`, LinkedIn, Strive/Balky/Odyn · `/lab` ↔ 9 experiments (prev/next ring + back) · `/writing` ↔ post (flight) · `/contact` → mailto + `/api/contact` · `/changelog` → items (9 internal/external) · `/record` → iframes of any own route · 404 → `/`. Footer socials (external): X, Instagram, GitHub, Awwwards.

## Inspection limitations

- 7 of 9 lab experiment pages (all except `dial`, `vocal-orb`) were inspected via rendered-text extraction + their dedicated JS chunks + the shared labd template from the two saved pages; their full docs articles/code live in their (unsaved) HTML — re-fetch per page when rebuilding that experiment.
- No browser rendering was available: pixel-exact geometry, wheel tuning constants, and canvas shader visuals are documented from code, not screenshots.
- Presence worker protocol (PartyKit) inferred from client code; worker source not public.
- `/api/contact` request/response schema inferred from form fields + 400-on-empty behavior.

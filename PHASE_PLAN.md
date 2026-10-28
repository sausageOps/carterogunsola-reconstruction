# PHASE PLAN — reconstruction of carterogunsola.com

Phases are independently verifiable. Each phase lists: scope, dependencies, acceptance criteria.
Recommended stack for the rebuild (mirrors the original, per RECONSTRUCTION_MASTER.md §2): **Astro (static, vanilla TS, SCSS, no islands) + ClientRouter view transitions + GSAP + Lenis + three.js + PartyKit client**, Cloudflare-style static hosting. If the rebuild target differs, keep the *behavioral* spec, not the stack.

---

## Phase 1 — Foundation & global chrome (blocks everything)
**Scope:** Design tokens (both themes), fonts, base CSS utilities, text/roll/arrow-roll/chip/row/btn/linkcircle/closebox/infotip/pblur/overlay/toast atoms, expressive-code component (+copy/wrap), global layout (container/bleed-full/section-label), lifecycle shell (module registry, `astro:page-load`, `veil:reveal` gating), theme system (light/dark/system, dark default, favicon sync, meta theme-color), Lenis + progress bar + header hide, paper-grain canvas, veil transition system, header (HUD: clock/FPS/booking; logo+crumb; navpill; ⌘K; bell; theme toggle; drawer trigger), command menu, notifications panel, drawer, toaster, prefetch, magnetic, halftone-hover, Reveal, NavRoll.
**Depends on:** nothing.
**Acceptance:** Every page renders with correct chrome in both themes; ⌘K menu navigates; theme persists across reloads; veil transition plays between two stub pages; progress bar tracks scroll; HUD clock ticks; expressive-code renders a highlighted block with working copy button.

## Phase 2 — Homepage `/`
**Scope:** h1; wheels stage (two linked wheels, drag/scroll/keys, depth-map plates, logo plates, reels for 6 projects, center drum text swap, N° odometers + encoded year readout, aria carousel); classic 17-row fallback list; `wheels-data` (17 projects — content in `recon/wheels-data.json`).
**Depends on:** Phase 1 (chrome, Reveal, halftone, Lenis-prevent).
**Acceptance:** With JS off, the 17-row list is the only content; with JS on, wheels render all 17 projects, respond to drag/scroll/arrows, center text + odometers update, "View project" opens the right external URL; reduced-motion renders static.

## Phase 3 — Contact `/contact`
**Scope:** Desk canvas bg; letter sheet (head w/ CF-style email, dynamic date, RE radios, FROM/VIA underline inputs, ruled textarea); signature ink canvas + slip dialog (pad/Clear/Done) + typed-name fallback + clear; status line; submit → `/api/contact` (rebuild: stub endpoint); failure note + mailto; postmark stamp; job-ticket stub with barcode; `z-y/z-x` entrance order.
**Depends on:** Phase 1 (dialogs, toasts, reveal).
**Acceptance:** All fields validate with inline notes; signature draws with mouse/touch; slip dialog captures and returns signature; submit posts JSON and handles 4xx/5xx with the closed-counter note; stub ticket fills in.

## Phase 4 — Studio `/studio`
**Scope:** Lanyard 3D badge (three.js, drag-to-swing physics, env map, data-lanyard-* content), visit infotip link, classic fallback tile.
**Depends on:** Phase 1.
**Acceptance:** Badge swings on drag and settles; content matches; fallback visible without JS; reduced-motion static badge.

## Phase 5 — Writing `/writing` + `/writing/the-personal-starter`
**Scope:** Folder shelf stage (3D folders, tooltip, arrow/Enter), folder flight transition (flight-gl canvas), classic index (intro, 2026 archive, 6 filter tabs, rows, empty state), post page (TOC scrollspy + collapse, masthead N°01, TL;DR, full prose, expressive-code blocks, credits, signature SVG from `data-sig-pts`), `folders-data`.
**Depends on:** Phase 1; flight canvas shared with Phase 1 veil layer.
**Acceptance:** Index filters work; opening the post flies the folder; TOC tracks scroll; all 7 sections + code blocks + credits + signature render; RSS/JSON feeds (Phase 9) match content.

## Phase 6 — About `/about`
**Scope:** ov3 board: ticket header; frank-card (tilt + shine + stamp photo + imprints); telemetry card (clock/pos/online/commits sparkline + scope flip); radio card (deck 3D + console states + EQ + progress + Rotation/Tape readouts); LOS→SGU tag card; letter/record/onfile dialogs (8 experience rows, 9 awards, 9 features); drawer tabs; marks texture.
**Depends on:** Phase 1 (dialogs, overlay); Presence/NowPlaying hooks (can stub).
**Acceptance:** Cards tilt/boot states animate; dialogs open/close with scrim; telemetry clock ticks; radio cycles Tuning→Searching with EQ bars; all record/onfile rows match source HTML.

## Phase 7 — Lab index `/lab` + lab doc template `/lab/{slug}`
**Scope:** Lab list (9 items + duplicated wheel source), List/Wheel/Grid modes (persisted), hover preview with poster→reel swap, pblur edges; labd template: docs toggle, Notes/Code tabs, dependencies refrows, stage viewport with loading empty state, prev/next + odometer nav, Tune configurator (range/segment/swatch/easing schema → controls, persisted), expressive-code in docs.
**Depends on:** Phase 1; halftone for poster.
**Acceptance:** All 9 routes render template identically with correct slug data; mode switch persists; preview follows cursor and plays reel; docs tabs switch; tune panel appears when an experiment registers config.

## Phase 8 — The 9 experiments (order by complexity)
1. **polka-dots** (canvas spring grid, single ticker) — 2. **heart** (Taubin implicit → point cloud, spin) — 3. **dynamic-scrollbar** (scrollbar→analog clock) — 4. **dial** (GSAP ring, 26 channels, damped drag, elastic detent, WebAudio pitch-scaled click; full docs article + 4 code blocks already captured) — 5. **rotating-gallery** (CSS 3D translateZ ring, DTS images, 4000px perspective) — 6. **paste-up** (prints × 3 boards transitions) — 7. **threejs-test** (parametric superellipse, materials, Lantern GLB) — 8. **live-cursors** (presence-driven cursors) — 9. **vocal-orb** (WebGL2 black hole, mic, worker inference, captions, TTS, bloom chain — largest chunk, 84.6 KB).
**Depends on:** Phase 7 (mount/config shell).
**Acceptance (each):** Live stage replaces empty state; interaction works per INTERACTION_MAP.md §F; Tune controls (schema from chunk) actually change the experiment; reduced-motion variant works; docs Notes/Code tabs show the captured content (re-fetch per-page HTML for the 7 unsaved pages); reel/poster match manifest.

## Phase 9 — Record, Changelog, feeds, 404, manifests
**Scope:** `/record` (iframe stage, route select, 8 presets + W×H, Fit/Bare(+Docs/Cfg)/Hide UI, H/Esc, readout); `/changelog` (14 rows); `/rss.xml`, `/changelog.xml` (+`/feed.xsl`), `/feed.json`; 404 page; `robots.txt`, `sitemap-index.xml`+`sitemap-0.xml`, `site.webmanifest`, favicons/icons/OG images; Cloudflare-style analytics beacon (or equivalent).
**Depends on:** Phases 2–8 routes existing.
**Acceptance:** Feeds validate and match changelog content; sitemap lists all 17 URLs; record frames own routes and applies `data-bare`; 404 renders with chrome.

## Phase 10 — Realtime, easter eggs & polish
**Scope:** Presence (PartyKit worker client: online count, live cursors, owner chip, LISTENING chip), Vitals reporting, NowPlaying; Console music-egg, Strive/Odyn/TypeTune/FontTrial/PrintFlicker/MeshMode/Marks modules (triggers unverified — see PHASE_STATUS.md); DevGrid overlay; final route-by-route comparison.
**Depends on:** all pages.
**Acceptance:** Two browsers show each other's cursors + count; HUD chips populate; all reduced-motion/hover/touch fallbacks verified; **final route-by-route comparison table** (every route in ROUTE_INVENTORY.md checked against original: content, components, interactions, assets).

## Cross-phase shared dependencies (build first inside Phase 1)
1. Token system + theme switching (everything consumes it)
2. Lifecycle shell + veil transition (gates all entrance animation)
3. Overlay/dialog system (cmd, notif, drawer, slip, about dialogs)
4. expressive-code (lab docs ×9, writing post)
5. Asset URL helpers (cdn-cgi transform builder: `img(path, width, quality=86)`)
6. Configurator schema renderer (range/segment/swatch/easing) — used by all 9 experiments
7. Odometer/digit-roll primitives (`number-flow`-style) — HUD online count, lab position `02/09`, homepage N° readouts

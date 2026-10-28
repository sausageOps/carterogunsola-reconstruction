# RECONSTRUCTION MASTER — carterogunsola.com

> Phase 0 blueprint. Complete site specification compiled from live inspection on 2026-10-28.
> Sources: rendered text of all 18 pages, raw HTML of 10 pages, 40 JS chunks, 10 CSS files, sitemap, feeds, response headers.
> Companion docs: `ROUTE_INVENTORY.md`, `ASSET_MANIFEST.md`, `INTERACTION_MAP.md`, `PHASE_PLAN.md`, `PHASE_STATUS.md`.

---

## 1. Site overview

Personal portfolio of **Carter Ogunsola** — creative developer & brand engineer (Lagos NG → Utah US).
A monochrome, print-shop-themed ("the press out front is what the shop makes") single-page-application-style
multi-page site with a custom OS-like chrome: live HUD, command menu, notifications, screen recorder,
theme system, paper-grain WebGL layer, and a "Lab" of 9 live motion experiments with full docs + tunable configs.

- **Production URL:** https://carterogunsola.com/ (Cloudflare, `server: cloudflare`, `cf-cache-status: DYNAMIC` for HTML)
- **Site version context:** rebuilt from scratch, "new site is live" 2026-09-29; dark-default since 2026-08-27
- **Booking status chip:** `Booking::Q1’27`

## 2. Architecture (verified from served source)

| Layer | Finding | Evidence |
|---|---|---|
| Framework | **Astro** static site, zero-framework islands (vanilla TS + SCSS per author's own writing) | `data-astro-transition-scope`, `data-astro-cid-*` scoped styles, `_astro/*` hashed assets |
| Routing | Astro file routing + **ClientRouter (View Transitions)** | `ClientRouter.astro_astro_type_script...js`, `<meta name="astro-view-transitions-enabled" content="true">`, `data-astro-transition-persist` on chrome |
| Styling | One global `Base.C-Njm2nK.css` (59 KB) + small per-page CSS chunks; Astro scoped styles | `<link rel="stylesheet" href="/_astro/Base.C-Njm2nK.css">` |
| Animation | **GSAP** (bundled inside `mesh.DnpBQ695.js`), **Lenis** smooth scroll (bundled), three.js (bundled `three.module.DBbmgHoE.js` ~599 KB + GLTFLoader, RoomEnvironment, BufferGeometryUtils, CSS3DRenderer in `css3d`) | chunk imports |
| Realtime | **PartyKit/PartySocket** client (`class Et {host, room, party}`) → worker `carter-2026-presence.carterogunsola7589.workers.dev`, parties: `presence` (room `global`), `vitals` (`/parties/vitals/vitals`), `now-playing` (room `now-playing`) | Base.js |
| Web component | `number-flow` custom element (digit-roll odometer) loaded dynamically; own copy in `dist.C3hNWf9G.js` | Base.js dynamic import, HUD `ONLINE::<number-flow>` |
| Vitals | `web-vitals`-style reporting (LCP chip in HUD, beacon queue to worker) | Base.js `vitals()` |
| Code blocks | Custom **expressive-code** component (server-rendered syntax-highlighted lines, per-token `--0/--1` light/dark colors) + `ec.0vx5m.js` (adds tabindex to scrollable blocks, copy-to-clipboard buttons) + `ec.2v5bd.css` | lab/writing HTML |
| Forms | Contact form `POST /api/contact` (Cloudflare Pages Function; returns 400 JSON on empty body — live) | contact.html, curl test |
| Email | Cloudflare email-decode obfuscation (`/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js`, `data-cfemail`) | contact.html |
| Analytics | Cloudflare Pages Analytics beacon `https://static.cloudflareinsights.com/beacon.min.js` token `b25d28546f67432e92c9cf1c5910ab94` | every page |
| Media CDN | `assets.carterogunsola.com` behind Cloudflare `cdn-cgi/image/width=W,quality=86,format=auto/...` transforms; raw (untransformed) paths also work | asset URLs |
| 3D models CDN | `https://models.carterogunsola.com` (used by lab-doc/vocal-orb) | lab-doc chunk |
| Fonts | Self-hosted woff2 (see §5) | Base.css @font-face |
| Feeds | `/rss.xml` (Writing), `/changelog.xml` (ship log, RSS+categories), `/feed.json` (JSON Feed 1.1), `/feed.xsl` (RSS stylesheet) | fetched |
| Discovery | `/robots.txt` (allows all incl. AI bots), `/sitemap-index.xml` → `/sitemap-0.xml` (17 URLs), `/site.webmanifest` (PWA: standalone, theme/background `#d6d6d5`, icons 192/512 maskable + svg) | fetched |

Author's own stack statement (from `/writing/the-personal-starter`): *"static Astro with vanilla TypeScript,
SCSS and GSAP, deployed on Cloudflare, no React and no islands"*; engines packaged as `@odyn/lifecycle`
(createApp/safe), `@odyn/conductor` (Conductor, wipeLeg), `@odyn/reveal` (Reveal), `@odyn/engines`
(createEngines, mediaHold); starter = `odyn-astro-starter`.

## 3. Design tokens (from Base.css)

### 3.1 Color
Light theme (`:root` / `[data-theme=light]`):
- `--paper: #d6d6d5` (page bg — warm gray), `--surface-warm: #fdfcfb`, `--surface: var(--surface-warm)`
- `--mono-100: #f7f7f7`, `--mono-500: #484848`, `--mono-900: #1e1e1e`
- `--ink: #1e1e1e`, `--ink-muted: #1e1e1eb3`, `--fill: #1e1e1e14`, `--fill-strong: #1e1e1e33`
- `--line: #1e1e1e0f`, `--divider: #1e1e1e33`, `--card: color-mix(mono-900 5%, paper)`
- `--img-outline: #0000001a`, `--code-bg: #eae8e4`, `--scrim: #1e1e1e66`, `--popover: #fdfcfb`
- `--spot: #b03a1e` (accent, rust), `--spot-wash: rgba(176,58,30,.14)`
- Shadows: `--shadow-modal: 0 24px 60px -24px #1e1e1e40`, `--shadow-card: 0 10px 26px -16px #1e1e1e2e`, `--shadow-control: 0 0 0 1px #1e1e1e0f, 0 2px 6px -2px #1e1e1e24`, `--shadow-cut: 0 2px 5px #1e1e1e29`, `--shadow-seg`
- Buttons: `--btn-fill: #1e1e1eeb`, `--btn-on: #f7f7f7`

Dark theme (`[data-theme=dark]`, **the default**): `color-scheme:dark; --paper:#1e1e1e; --surface:#262626; --ink:#f7f7f7; --ink-muted:#f7f7f780; --fill:#f7f7f714; --fill-strong:#f7f7f733; --line:#f7f7f70f; --divider:#f7f7f733; --card: color-mix(mono-100 6%, paper); --code-bg:#333; --scrim:#0009; --popover:#262626; --spot:#e06a4a; --btn-fill:#f7f7f7eb; --btn-on:#1e1e1e; --img-outline:#ffffff1a`; heavier black shadows; grain alphas reduced (fiber .016, tooth .034, carton .028, dots .04).

Theme mechanics (inline head script + Theme module): `localStorage.theme` ∈ `light|dark|system`; **no stored choice → dark**; one-shot `theme-cutover` migration stamps `system` for legacy visitors; `window.__syncFavicon` swaps `/favicon-dark.svg` (default), `/favicon-light.svg`, `/favicon.svg` (adaptive, system). `<meta name="theme-color">` `#d6d6d5` (light media) / `#1e1e1e` (dark media).

### 3.2 Type
- `--font-sans: "Oracle", "Geist Variable", -apple-system, …` — **Oracle Variable** is the display/identity font (variable, wght 200–1000, oblique 0–13deg; preloaded only on homepage)
- `--font-mono: "PP Neue Montreal Mono", "Geist Mono Variable", ui-monospace, …`
- `--font-pixel: "Geist Pixel Square", "Geist Mono Variable", monospace` (`.u-pixel`)
- Weights: `--fw-regular:400; --fw-body:360; --fw-medium:580; --fw-semibold:600`
- Line heights: `--lh-display:.98; --lh-heading:1.06; --lh-tight:1.1; --lh-body:1.4`
- Tracking: `--track-display:-.042em; --track-heading:-.028em; --track:-.02em; --track-hud:-.04em; --track-print:.08em`
- Fluid sizes: `--fs-mega: clamp(4rem, 1.8873rem+9.0141vw, 10rem)`; `--fs-display: clamp(3rem,…,6rem)`; h1 `clamp(2.25rem,…,4rem)`; h2 `…3rem`; h3 `…2.5rem`; h4 `…2rem`; h5 `…1.5rem`; h6/lead `…1.25rem`; body `clamp(1rem,…,1.125rem)`; fixed: 100 `.75rem`, 200 `.875rem`, 300 `1rem`, 400 `1.25rem`, 500 `1.75rem`, 600 `clamp(2.5rem,6vw,5rem)`, 700 `clamp(4rem,12vw,12rem)`; hud `.625rem`; meta/label/tag/eyebrow `.75rem`; mono-sm `.625rem`; mono-label `.875rem`
- Text utility classes: `.text-mega/.text-h1…/.text-lead/.text-body/.text-tag/.text-label/.text-meta/.text-nav/.text-hud/.text-mono-meta/.text-mono-tag/.text-mono-sm`, `.u-muted`, `.u-pixel`

### 3.3 Spacing / layout / radius / easing
- Spacing scale `--s-0…--s-160` (0 → 10rem in rem steps incl. 14/18/38/56/88/92/100/112/144)
- Radii: `--r-xs:2px; --r-sm:4px; --r-md:6px; --r-lg:8px; --r-xl:12px; --r-2xl:16px; --r-3xl:24px; --r-pill:999px; --r-full:50%`
- Easings: full sine/quad/cubic/quart/quint/expo/circ/back/front set; `--ease: var(--ease-out-expo)` (default), `--ease-in-out: ease-in-out-quart`
- Layout: `--maxw:1600px; --container-max:120rem; --gutter/--margin: clamp(1rem, .6919rem+1.3146vw, 1.875rem); --measure:42rem`
- Roll (hover text swap): `--roll:1.4em; --roll-out:100% 0; --roll-in:-100% 0`
- Spinner: `--spin-size:1.25rem; --spin-dur:.84s; --spin-ticks:12` (keyframe `spin-turn`)

### 3.4 Textures (inline SVG data-URIs)
`--grain-fiber` (600px, fractalNoise bf .015, 5 octaves), `--grain-tooth` (160px, bf .75, 2 oct), `--grain-carton` (220px, bf .05, 3 oct), `--grain-dots` (8px dot grid); stacked as `--sheet-tex: var(--grain-dots), var(--grain-carton), var(--grain-tooth)`. Theme switches alpha slopes. Plus animated **paper-gl** full-screen WebGL grain canvas (persisted, z-index 1).

### 3.5 Breakpoints / motion prefs
- `@media (width<=47.99rem)` = mobile (48rem), `(width<=30rem)` small phones; `(hover:hover) and (pointer:fine)` desktop-only hover; extensive `prefers-reduced-motion` overrides (kills view-transition animations, entrance tweens, wheels physics per-experiment)

## 4. Global chrome (persisted across view transitions via `data-astro-transition-persist`)

Fixed background canvases (top of `<body>`): `canvas.paper-gl[data-paper]` (z1), `div.veil-dim[data-veil-dim]`, `canvas.shelf-gl[data-shelf]` (z1, inline fixed/opacity 0), `canvas.shelf-still[data-shelf-still]` (z1), `canvas.flight-gl[data-flight]` (z80).

**Header** (`header.header[data-header]`, persisted):
- Top HUD row (`div.hud`, aria-hidden): chips `UT::<time>` (live clock, `America/Denver`), `FPS::<n>`, `ONLINE::<number-flow>` (hidden until data), `LCP::<ms>` (hidden), `CARTER::HERE` owner chip (hidden), `PRESENCE::<ON|OFF>` toggle button (`data-hud-presence`), `LISTENING::<…>` chip (hidden), `Booking::Q1’27`.
- Bar row: left = logo (`.logo`: circle `C` + capsule `O`, links `/`) + breadcrumb (`data-crumb` `::` + `data-crumb-name`, filled per route, e.g. `::About`); center = `.navpill` (About/Lab/Writing/Studio/Contact, each label wrapped in `span[data-roll]` for hover roll) + ⌘K button (`data-cmd-open`, `data-magnetic="0.15"`, `aria-keyshortcuts="Meta+K"`); right = bell (`data-notif-open`, badge dot `data-notif-dot`), mobile-only search button (`data-cmd-open`), theme segmented control (`data-theme-toggle`: Light/Dark with sun/moon icons, `data-theme-set`, sliding `data-theme-bg`), drawer trigger (`data-drawer-open`, hamburger `navtrigger__bars`).

**Command menu** (`div.cmd[data-cmd]` overlay, persisted): panel dialog "Command menu"; search input (`data-cmd-input`, placeholder "Search anything"); list `data-cmd-list` with highlight `data-cmd-hl`; groups: **Pages** (Home /, About, Lab, Writing, Studio, Contact — items `data-cmd-item data-href data-value`, icon arrow-roll + label + mono hint `/path`), **Tools** (Record `/record`; Toggle live presence `data-action="presence:toggle"`), **Theme** (Light/Dark/System `data-action="theme:*"`); empty state "No results."; footer kbd hints `↑↓ Navigate · ↵ Select · esc Close`. Trigger: ⌘K/Ctrl+K or buttons.

**Notifications** (`div.notif#notif[data-notif]`, persisted): panel dialog "What’s new"; header with count badge + "Mark all read" (`data-notif-clear`); list of 14 items (`a.notif__item`, `data-date`, `data-hover`): chip category (Lab/Site/Writing/Award), `data-time` relative date, label, summary, unread dot `data-notif-dot`, linkcircle arrow; footer "View all →" `/changelog`. Read state in localStorage (`notif-seen`).

**Drawer** (mobile, `div.drawer#drawer[data-drawer]`, persisted): sheet dialog "Menu" with handle, nav links (same 5), HUD clone (UT/FPS/Booking), socials (X, Instagram, GitHub, Awwwards).

**Toaster** (`ol[data-toaster]`, persisted, aria-live polite), **Progress bar** (`div.progress[data-progress]`, scroll progress via scaleX), **Veil** (`div.veil[data-veil-panel]`: `canvas.veil__paper[data-veil-paper]` + `div.veil__boot[data-veil-boot]` with CO logo `data-veil-word` + `div.veil__travel` count `data-veil-count`; keyframe `veil-failsafe`; custom event `veil:reveal` gates entrance animations; Astro fade/slide view-transition keyframes astroFadeIn/Out etc. with plus-lighter blend).

**Shared UI atoms:** `.chip` / `.chip--pill`; `.row.row--link` (label + flexible line + tags + linkcircle); `.linkcircle` (circular outline w/ `.arrow-roll` inside); `.arrow-roll` / `.arrow-roll--diagonal` (two stacked icons `arrow-roll__current/__next`, swap on hover); `.btn.btn--solid` with `.btn__label.roll[data-roll]`; `.u-card`, `.u-cover` (absolute cover img), `.u-media`, `.u-sr-only`, `.u-no-drag`, `.u-grab`; `.container` (maxw + gutter), `.bleed-full`; `.section-label` (+ `--lg`, `::` mark span); `.closebox` (sm/md × fill/surface); `.infotip` (hover tooltip); `.pblur` top/bottom (3 blurred layers each); `.overlay[data-overlay]` (scrim, persisted); `.socials` (icon roll links); `.refrow` (dependency/credit rows w/ badge + label + diagonal arrow); `.expressive-code` figure (figcaption header, `pre[data-language].wrap` > code > `.ec-line` (`.gutter .ln` + `.code` spans w/ `--0` light / `--1` dark token colors), `.copy` button `data-code` (raw source, `\u007f` = newline) + `data-copied="Copied!"` feedback, wrap toggle `data-code-wrap`, `--ecMaxLine` char measure); `.toast`.

## 5. Fonts (all self-hosted woff2; see ASSET_MANIFEST.md)

- `/fonts/oracle/Oracle-Variable.woff2` — display sans (preloaded homepage only)
- `/_astro/geist-*-wght-normal.*.woff2` — Geist Variable, 5 subsets (latin, latin-ext, cyrillic, cyrillic-ext, vietnamese), wght 100–900 variable
- `/_astro/geist-mono-*-wght-normal.*.woff2` — Geist Mono Variable, 6 subsets (adds symbols2)
- `/fonts/geist-pixel/GeistPixel-{Square,Circle,Grid,Line,Triangle}.woff2` — weight 500
- `/fonts/pp-neue-montreal-mono/PPNeueMontrealMono-{Thin,Book,RegularItalic,Bold,Medium,BoldItalic}.woff2`
- `/fonts/untitled-sans/UntitledSans-Variable.woff2` — wght 300–900

## 6. Page specs (summary — details in ROUTE_INVENTORY.md)

1. **`/` Home** — `<h1>` "Carter Ogunsola, Creative Developer & Brand Engineer"; hero `.hv2__stage[data-wheels]` (hidden until JS; `role="group" aria-roledescription="carousel"`, `data-lenis-prevent`): center drum text (eyebrow collab chip, giant title, chips `w/…` + year pill, "View project" solid btn), JS odometers (`N°01`, `N°02`, encoded year readout `17NN°°0011//1177`), two linked 3D wheels of 17 project plates using per-project `subject.jpg`/`hero.jpg` + `subject.depth.png` depth displacement + logo plates + reels; drag/scroll/arrow-keys; then `.hv2__classic` fallback "Selected work" list of 17 `.row--link` rows. Data: inline `application/json[data-wheels-data]` (17 projects). Module `Wheels` (`wheels.BZ7Tz2K5.js`).
2. **`/about`** — `.ov3` board: ticket header ("The Front Office", `JOB::N°00`, `EST::2000`, `STATUS::OPEN`); hero **frank-card** (3D tilt card, stamp photo `/_astro/carter-stamp.BRpWjIXQ_4vkhB.webp` 1000×1250 + srcset 560w, caption "Carter Ogunsola", shine layer, imprint buttons, socials row, "About me" btn, "Lagos → Utah"); **telemetry card** (`Telemetry::Sync`, `LOCAL::` clock, `POS:: N 37°05′47″ / W 113°34′06″`, `ONLINE::`, `COMMITS::` + 32-bar sparkline, scope flip button); **radio card** (3D deck + console: `Radio::Tuning`, `SEARCHING`, track/artist, elapsed `0:00`/`−0:00` progress bar, 5-bar EQ, `Rotation::`/`Tape::` readouts, on-air dot); **tag card** (LOS→SGU route graphic, "Lagos, NG"/"St. George, UT", `11,886 km · −7 h · since 2000`); exit "Put it back" button; drawer tabs `File:: Writing` / `File:: Lab`; three `<dialog>`s: **letter** ("Hey, you pulled my file." + bio paragraphs), **record** ("Where I’ve worked." table: Odyn/Founder/Present, Strive/Creative Developer/Present, Balky Studio/Founder/Present, Bondir/Web Designer & Dev/2024, Auvlie/Co-Founder/2023, Utah Tech University/Adjunct Professor/2023, Adapte/Creative Director/2022, beatBread/Product Designer/2022 + LinkedIn link), **onfile** ("What the work picked up." Awards ::9 rows, Featured ::9 rows). Modules: About, AboutArtifacts, AboutRadio, FrankCard, Deck, Marks, Tilt, Canvas.
3. **`/lab`** — `.lab[data-lab][data-lab-cols="6"][data-lab-start="8"]` inside `.container`: list of 9 `a.lab__item[data-lab-item][data-hover][data-preview][data-reel]` (row face: name + category chip + "New" pill + linkcircle; card face: poster img + caption), then a duplicated aria-hidden set (wheel-mode source); `.pblur--top/--bottom` (3 layers each); **List/Wheel/Grid** mode segmented toggle (`data-lab-mode-toggle`, persisted `lab-mode`); floating hover preview `.lab__preview` (poster img + muted looping reel `<video>`, follows cursor). Module `LabIndex`.
4. **`/lab/{slug}`** (9 slugs) — `.labd[data-lab-detail][data-experiment][data-prev-href][data-next-href][data-position="NN"]`: docs toggle (book/close icons); aside `.labd__docs` with tabs **Notes/Code** (`data-docs-tab`, sliding `data-docs-tab-bg`), tag chips; Notes pane: summary `.text-lead`, **Dependencies** `.refrow` list (e.g. GSAP — Core :: ticker, tweens, elastic ease), long-form article (h2 sections, inline code, expressive-code figures); Code pane: full source as expressive-code blocks (html/css/js/ts) w/ gutter line numbers, wrap toggle, copy buttons; stage `section.labd__stage > .labd__viewport[data-experiment-viewport]` with empty state (poster `img[data-halftone]`, name, chips, "Experiment coming soon"/"Loading experiment", loader bar) replaced by the live experiment (dynamic `import()` of per-experiment chunk); persisted nav `.labd__nav` (prev arrow, odometer `02/09` digit strips, next arrow); hidden **Tune** button `data-config-toggle` → configurator panel (controls generated from experiment schema: range/segment/swatch/easing; persisted). Module `LabDoc`.
5. **`/writing`** — `.wstage[data-folders]` (hidden until JS, carousel): 3D shelf of post folders from `application/json[data-folders-data]` (1 post: "The personal starter", SEP 16 2026, cat web, N°1, summary/tldr/excerpt), tooltip card (title + date/year/cat chips), arrow keys + Enter; `.writing__classic` fallback: intro (h1 `Writing ::`, 3 lead paragraphs), archive `2026 ::` with filter tabs (All/web/design/motion/tools/life, `data-index-tab data-cat`, role=tablist) + rows (label + Sep 16/2026/web chips) + empty state "Nothing filed here yet". Modules `Folders`, `IndexReco`.
6. **`/writing/the-personal-starter`** — `.wpost[data-writing-post][data-folders-slug]`: rail TOC (collapsible, scrollspy active item, dot + bg), close button (back to /writing), article: masthead (`Carter Ogunsola:: Writing` / `N°01`), date `:: Sep, 16, 2026`, h1 title, **TL;DR** aside, prose (7 h2 sections: Product vs studio / The personal starter / What goes in / Shape and engines / Keeping projects in sync / Why small / Odyn Astro starter), inline + block code (ts/json expressive-code), **Credits** refrow list (6 external links), signoff "Sincerely," + signature SVG rendered from `data-sig-pts` point list (`.signature[data-signature]`). Modules `WritingPost`, `ArticleMedia`, `SignatureFx`, `Folders` (flight in/out via `folders-flight` + `flight-gl` canvas).
7. **`/studio`** — `.lstage[data-lanyard]` (hidden until JS): 3D ID badge on canvas (`data-lanyard-*` attrs: name, role "Founder & Creative Developer", studio "Balky Studio", line "We make the web fun again", addr `BALKY.STUDIO`, place "Utah, USA", year 2026), drag to swing (three.js physics), info button → https://www.balky.studio/ with tooltip; `.studio__classic` fallback: tile link + "Balky Studio" + linkcircle + "We make the web fun again". Module `Lanyard` (+ `studio-env` procedural equirect environment).
8. **`/contact`** — `.letterpage > .desk[data-letter]`: background canvas `.desk__canvas`; form `.sheet` (`method=post action=/api/contact`, novalidate): head (CO logo mark, name, role, CF-protected email `· Utah, USA`), date (dynamic, e.g. `23 OCT 2026`), `Dear Carter,`, `RE ::` radio group (New business / A collaboration / Just a hello), `FROM ::` email input (underline rule), `VIA ::` source input, ruled textarea ("What are we making?"), `Sincerely,`, signature block (ink canvas + ghost "sign here" + rule; click → slip `<dialog>`: "SIGN HERE / WITH YOUR FINGER, MOUSE OR PEN", pad canvas, ✕ guide, Clear/Done), typed name input + "clear signature", status line `ONE REPLY, NO NEWSLETTER · NOT YET SIGNED`, "Send it" submit, "Keep a copy" (hidden), send-failure note ("The counter is closed right now." + mailto + retry), postmark `.stamp`; `.stub` job-ticket aside (`CARTER OGUNSOLA:: PRESS / INTAKE · COUNTER 01`, rows JOB/RECEIVED/REPLY BY/STATUS=`BEING WRITTEN`/FILE UNDER, barcode strip, `KEEP THIS HALF`). Entrance layering via `z-y-*`/`z-x-*` classes. Modules `Contact`/`Letter`.
9. **`/record`** — `.rec[data-record-page]`: stage with framed `<iframe data-record-iframe>` (any own route or pasted URL); control bar: route `<select>` (Site: /, /about, /lab, /writing, /contact; Lab: all 9), URL text input, resolution preset menu (16:9 1920×1080 · 16:10 1440×900 · 4:3 1440×1080 · 720p 1280×720 · 1:1 1080×1080 · 4:5 1080×1350 · 9:16 1080×1920 · OG 1200×630), W×H number inputs, **Fit** toggle, **Bare** toggle (+ **Docs**/**Cfg** subtoggles for lab pages), **Hide UI** (H/Esc), live readout; hint: "Own pages always embed; some sites block framing (X-Frame-Options). H/Esc hides this bar — then grab the frame with ⌘⇧5 or Screen Studio." Module `Record`.
10. **`/changelog`** — `.log.container`: intro (h1 `Changelog ::`, lead with links to `/changelog.xml` "the feed" and `/feed.json` "JSON"), `2026 ::` section, 14 `.row--link` rows (label + date chip + category pill chip).
11. **404** — "This page wandered off." + "Back home" link + full global chrome.

## 7. Content datasets (verbatim, captured)

- **17 homepage projects** (name / collab / year / href / mono / logo / video?): full JSON saved at `recon/wheels-data.json`. Order: Clay, Helion, Scott Snyder, Heva 2025, ABCAU, PNY, Hamilton AI, Vesyl, Vana 2024, Vana X Team, Vana Q4, TSM, OriginalForm, Firelight, Eden Tech, Strive Rx, 1820. Reels exist for Clay, Helion, Scott Snyder, Eden Tech, Strive Rx, 1820.
- **9 lab experiments** (slug / title / category / New? / position): live-cursors (Interaction, New, 01), dial (Interaction, New, 02), polka-dots (Canvas, 03), heart (Canvas, New, 04), threejs-test (3D, 05), dynamic-scrollbar (UI, 06), rotating-gallery (Gallery, 07), paste-up (Transition, New, 08), vocal-orb (3D, New, 09). One-line summaries captured in ROUTE_INVENTORY.md.
- **Changelog / "What's new" (14 items)**: Vocal Orb (Lab, 2026-10-02), The new site is live (Site, 2026-09-29), The personal starter (Writing, 2026-09-16), Paste-Up (Lab, 2026-08-27), Live Cursors (Lab, 2026-07-08), Dial (Lab, 2026-07-03), Heart (Lab, 2026-07-03), Polka Dots (Lab, 2026-07-01), Dynamic Scrollbar (Lab, 2026-07-01), Rotating Gallery (Lab, 2026-07-01), ThreeJs Scene (Lab, 2026-07-01), Opened the Lab (Lab, 2026-06-20), 1820 Productions case study on Codrops (Writing, external, 2026-02-13), Joined the Awwwards jury (Award, external, 2026-01-15).
- **Writing post**: full prose captured in `recon/pages/writing_the-personal-starter.html` (single post, cat `web`).
- **About**: experience table (8 rows), awards (9), features (9), letter bio (3 paragraphs), all captured in `recon/pages/about.html`.
- **Contact**: all labels captured in `recon/pages/contact.html`.

## 8. SEO / head pattern (per page)

`<title>` = `"{Page} :: Carter Ogunsola"` (home: `"Carter Ogunsola :: Creative Developer & Brand Engineer"`, post: `"The personal starter :: Writing :: Carter Ogunsola"`); meta description (home): "I’m a creative developer, director and entrepreneur, crafting web experiences with a taste for pure digital originality. Born in Lagos, based in Utah."; author; og:type website; og:site_name "Carter Ogunsola"; og:url canonical; **og:image 1200×630**: `/og/section/{home,about,lab,contact,studio,writing}.jpg`, `/og/lab/{slug}.jpg` (dial has one; others fall back to section image), `/og/writing/{slug}.jpg`; twitter:card summary_large_image, site/creator `@CarterOgunsola`; canonical link; apple-touch-icon `/apple-touch-icon.png`; manifest `/site.webmanifest`; favicon svg adaptive + `/favicon.ico`; alternate feeds: `/rss.xml` (type application/rss+xml), `/feed.json`, `/changelog.xml`; preconnect/preload: Oracle font on home; `astro-view-transitions-enabled/fallback` metas; theme-color metas.

## 9. External services & links

- Presence/vitals/now-playing worker: `carter-2026-presence.carterogunsola7589.workers.dev` (PartyKit)
- Assets: `assets.carterogunsola.com`; Models: `models.carterogunsola.com`; analytics `static.cloudflareinsights.com`
- Experiment externals: jsdelivr `gsap@3.15.0` (dial docs), Khronos glTF Lantern.glb via jsdelivr (threejs-test), `dts/unwrapped/DTS_Unwrapped_by_FRANCO_DUPUY_*.jpg` images (rotating-gallery, via assets CDN), huggingface.co (vocal-orb inference worker), osmo.supply / angularicons.com / x.com/KMkota0 credits (dynamic-scrollbar)
- Socials: x.com/CarterOgunsola, instagram.com/carterogunsola.dev, github.com/CarterOgunsola, awwwards.com/carter-ogunsola (+ /jury-member/carter-ogunsola)
- 17 project outbound links (see wheels-data.json)

## 10. Lifecycle module registry (from Base.js — the "engines")

Core (mount on every page): `Scroll` (Lenis + progress + header hide), `Veil`, `VeilPaper`, `HalftoneHover`, `LogoNav`, `Theme`, `MeshMode`, `Paper` (grain canvas), `Perf` (FPS), `DevGrid` (overlay `data-dev-grid`, z 2900), `PrintFlicker`, `TypeTune`, `FontTrial`, `Overlay` (scrim), `Command`, `Notifications`, `Presence`, `Toast`, `Cursors`, `Vitals`, `NowPlaying`, `Hud`, `Drawer`, `Header`; mount-phase: `Reveal` (split text yPercent 110→0, stagger, IO), `NavRoll`, `SignatureFx`, `Expand`, `Projects`, `Record`.
Page modules: `Wheels`, `About`, `AboutArtifacts`, `AboutRadio`, `FrankCard`, `Deck`, `Marks`, `Tilt`, `Canvas`, `Lanyard`, `Folders`, `WritingPost`, `ArticleMedia`, `LabIndex`, `LabDoc`, `IndexReco`, `Letter`/`Contact`, `Console` (easter egg), `Strive`, `Odyn`.
Events: `astro:page-load`, `astro:after-swap`, `veil:reveal`, custom `boot`/`runtime` phases; `prefetch` module (hover/focus/touch link prefetch, 80 ms debounce, slow-connection aware).

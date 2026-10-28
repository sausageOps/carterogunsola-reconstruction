# INTERACTION MAP — carterogunsola.com

All behaviors verified from served JS/CSS/HTML unless marked *(inferred)*.
Lifecycle: every module boots on `astro:page-load` (and `boot`/`runtime` phases); `Reveal`/`NavRoll`/`SignatureFx`/`Expand`/`Projects`/`Record` mount-phase. Entrance animations are gated by a one-shot `veil:reveal` event fired when the page-transition veil lifts.

## A. Global / chrome

| Interaction | Trigger | Behavior | Tech / notes |
|---|---|---|---|
| Theme | Click Light/Dark segmented; cmd `theme:*` | Sets `data-theme` on `<html>`, persists `localStorage.theme` (`light|dark|system`), swaps favicon (`/favicon-{light,dark}.svg` vs adaptive `/favicon.svg`), updates meta theme-color context. **Dark is default**; `system` follows OS; one-shot `theme-cutover` migration for legacy visitors | inline head script + `Theme` module; `color-scheme` flips; all colors are token-driven |
| Smooth scroll | — | Lenis on root; native fallback; `data-lenis-prevent` opts out (wheels stage, cmd/notif lists, dialogs, configurator) | `Scroll` module |
| Scroll progress | Scroll | Fixed top progress bar `scaleX(0→1)` | `data-progress`, persisted |
| Header auto-hide | Scroll > 120px down | Header gets `is-hidden` (translate away); returns on scroll up | `Scroll` module |
| Live clock | — | `UT::hh:mm` in HUD + drawer, `America/Denver` timezone | `Hud` module |
| FPS meter | rAF loop | `FPS::nn` chip (HUD + drawer) | `Perf` module |
| Live presence | — | PartyKit room `global` party `presence` on worker `carter-2026-presence.carterogunsola7589.workers.dev`; `ONLINE::<number-flow>` count; `PRESENCE::ON/OFF` toggle (`localStorage.presence`); other visitors' cursors rendered as floating labels; `CARTER::HERE` owner chip when `owner-key` present; suppressed on `/lab/live-cursors` and when framed doc has `data-bare` | `Presence`/`Cursors` modules, `Et` PartySocket-like class; `number-flow` digit-roll element |
| Web vitals | — | CLS/LCP/etc. queued and POSTed to `https://{worker}/parties/vitals/vitals`; `LCP::` chip in HUD | `Vitals` module |
| Now playing | — | PartyKit room `now-playing`; drives `LISTENING::` chip + radio card | `NowPlaying` module |
| Command menu | ⌘K / Ctrl+K, header ⌘K btn, mobile search btn | Overlay dialog; fuzzy filter over Pages/Tools/Theme items; `↑↓` navigate, `↵` select, `esc` close; actions: navigate, `presence:toggle`, `theme:light|dark|system`; empty state "No results." | `Command` module; persisted element |
| Notifications | Bell click | Panel with 14 changelog items; unread dot; "Mark all read" (`localStorage notif-seen`); relative dates from `data-time`; "View all" → `/changelog` | `Notifications` module; persisted |
| Mobile drawer | Hamburger | Bottom sheet: 5 nav links + HUD clone + socials | `Drawer` module; persisted |
| Route transitions | Any internal link | Astro ClientRouter view transitions (fade/slide keyframes, `plus-lighter` blend) + custom **veil**: full-screen panel with paper canvas, CO logo, numeric counter (`data-veil-count`, odometer); `veil:reveal` fires entrance; `veil-failsafe` keyframe guarantees exit; `veil-dim` scrim; header/cmd/notif/drawer/toaster/progress/veil/canvases persist via `data-astro-transition-persist` | `Veil`/`VeilPaper` modules + ClientRouter |
| Page boot | First load | Veil boot state shows CO + counter while assets load | `Veil` module |
| Paper grain | — | Fixed full-screen WebGL canvas (`canvas.paper-gl[data-paper]`, z1, pointer-events none), animated fractal grain, persisted across routes; static CSS grain layers (`--grain-*`) on surfaces | `Paper` module + CSS textures |
| Halftone hover | pointermove over `img[data-halftone]` (mouse only, motion allowed) | Fixed WebGL canvas (z800) magnifies image region as live halftone shader under cursor; clears on pointerout/down | `HalftoneHover` module |
| Magnetic buttons | pointermove on `[data-magnetic]` | Element translates toward cursor × strength (default .15) | inline in Base.js |
| Text roll (nav/btn) | hover/focus on `[data-roll]` | Label swaps: current rolls out up (`--roll-out: 100% 0`), next rolls in from below; duplicated aria-hidden copy pattern | `NavRoll` + CSS |
| Arrow-roll | hover on `.arrow-roll` | Two stacked arrow icons cross-fade/slide (current ↔ next); `--diagonal` variant rotates to ↗ | CSS |
| Link rows | hover on `.row--link[data-hover]` | Flexible `.row__line` grows, `.linkcircle` scales in, arrow rolls | CSS |
| Reveal on scroll | IntersectionObserver | Split text lines translateY 110%→0 with stagger (GSAP), once; gated by `veil:reveal` on route change | `Reveal` module (@odyn/reveal) |
| Toasts | programmatic | `ol[data-toaster]` (persisted), `aria-live=polite`, hover-pauses | `Toast` module |
| Dev grid | *(trigger unverified — likely key/lab-mode)* | Fixed overlay `div[data-dev-grid]` z2900 (column grid); styles in `Grid.Cu8GCU57.css` | `DevGrid` module |
| Link prefetch | hover/focus/touchstart on `<a>` | 80 ms debounce prefetch, respects slow connections | `prefetch` module (page.js) |
| Easter eggs | *(unverified triggers)* | `Console` module: 3D music console (three.js) with Afrobeats track list (Asake, Wizkid, Drake, Kendrick, Lil Baby), `/og-default.png` art; `Strive`, `Odyn`, `TypeTune`, `FontTrial`, `PrintFlicker`, `MeshMode`, `Marks` modules exist | Base.js registry |
| Reduced motion | `prefers-reduced-motion: reduce` | Kills view-transition animations, entrance tweens, wheel physics, halftone; experiments ship "physics off" variants (e.g. dial jumps without coast/click) | CSS + per-module checks |

## B. Homepage `/` — Wheels

- **Initial state:** stage `hidden` until JS hydrates; SSR fallback = `.hv2__classic` "Selected work" 17-row list.
- **Data:** inline `json[data-wheels-data]` — 17 projects `{name, collab, year, href, hand:[subject,hero], depth:[subject.depth.png], mono, logo, video?}`.
- **Interactions:** drag or scroll turns **two linked wheels** (plates orbit a shared axis); arrow keys browse; center link opens project (new tab); center text drum swaps per project (eyebrow `w/collab`, giant title with doubled-letter roll e.g. `CCllaayy`, chips, "View project" solid button); odometers `N°01`/`N°02` + encoded year readout `17NN°°0011//1177` tick; `aria-roledescription="carousel"`, `aria-live` announcer (`data-wheels-announce`).
- **Media behavior:** each plate = image pair (subject/hero crossfade) displaced by depth map (WebGL); logo plate + 2-letter mono; 6 projects have `reel.mp4` (hover/active playback — exact trigger *(inferred)*).
- **Module:** `Wheels` (`wheels.BZ7Tz2K5.js`, 92 KB).

## C. `/about` — board

- **Frank card:** 3D tilt toward cursor (`data-tilt`), shine layer (`data-tilt-shine`), stamp photo (eager, fetchpriority high), imprint buttons open dialogs, socials, "About me" button, `data-marks` paper-marks texture with `data-marks-avoid` keep-outs.
- **Telemetry card:** states `boot → Sync`; `LOCAL::` live clock; `POS:: N 37°05′47″ / W 113°34′06″`; `ONLINE::` count; `COMMITS::` total + 32-bar sparkline (`data-commits`); scope button flips "the tape over" (Rotation/Tape readout modes).
- **Radio card:** 3D deck (`deck.js`, css3d + three); console states: `Tuning → SEARCHING → …`; now-playing track/artist (`Tuning in…` / `Stand by`); elapsed/remaining `0:00 −0:00` + progress bar; 5-bar EQ animation; on-air dot; `Rotation::`/`Tape::` readouts; ties into `now-playing` presence room and `Console` easter egg.
- **Tag card:** LOS→SGU route with animated arrow, `11,886 km · −7 h · since 2000`.
- **Dialogs:** `<dialog>` elements (`data-dialog="letter|record|onfile"`), closebox, `data-lenis-prevent` scroll lock, scrim overlay.
- **Exit/drawer:** "Put it back" button (`data-canvas-exit`), adjacent-file tabs (`File:: Writing`, `File:: Lab`).

## D. `/lab` index

- **List mode (default):** 9 rows; hover shows floating preview card following cursor — poster first, swaps to muted looping reel on dwell (`data-preview`/`data-reel`).
- **Wheel mode:** duplicated aria-hidden item set becomes a horizontal wheel (cols=6, start index 8 — `data-lab-cols`/`data-lab-start`).
- **Grid mode:** card grid.
- Mode toggle segmented (List/Wheel/Grid) with sliding bg; persisted `localStorage.lab-mode`; `.pblur--top/--bottom` progressive-blur edge masks (3 layers each).

## E. `/lab/{slug}` — experiment doc + stage

- **Docs aside:** toggle button (book ↔ close icons); tabs Notes/Code with sliding indicator; Notes = summary + Dependencies (refrow links) + long article (h2 anchors) + inline expressive-code; Code = full source blocks (html/css/js/ts) with line-number gutters, wrap/unwrap toggle (`--ecMaxLine`), copy button (`data-code`, feedback "Copied!").
- **Stage:** `data-experiment-viewport`; empty state (halftone poster, name, chips, "Experiment coming soon" → "Loading experiment" + loader bar) until chunk loads; experiment mounts into viewport, unmounts on route leave (lifecycle).
- **Nav (persisted):** prev/next arrows with sr-only labels; center odometer `02/09` (two digit strips `data-odo-strip`); links back to `/lab`.
- **Tune:** hidden gear appears when experiment registers a config schema; panel with generated controls — `range` (min/max/step), `segment` (on/off or option list), `swatch` (color choices incl. theme tokens `var(--ink)` and fixed palette poppy `#c54126`, blue `#105099`, oak `#9e9e4d`), `easing` (4-stop bezier); persisted to localStorage.

## F. Experiments (initial state → action → result)

| Experiment | Stack | Behavior spec |
|---|---|---|
| **Dial** | DOM/SVG ring + GSAP + WebAudio | Full ring of 26 channels around an off-screen-left hub; right cap visible through a conic-gradient "cover" painted in page bg; tick ruler ring clipped the same way. Drag/scroll/arrow-keys spin; damped follow (`DAMP_DRAG 15`, `DAMP_IDLE 25`); detent snap `elastic.out(2,0.6)` 0.8 s; WebAudio click per channel crossing, playbackRate 0.8→1.6 by velocity/600; knob grip line see-saws. Config: weight/settle/sensitivity/detent(soft|snappy|elastic)/accent(ink|poppy|blue|oak). Reduced-motion: instant jumps, no click. |
| **Live Cursors** | Presence (PartyKit) + DOM | Renders every other visitor's cursor on the page in real time (names/labels); suppressed here (this IS the demo page); pairs with HUD presence toggle. |
| **Polka Dots** | Canvas 2D | Grid of dots as one spring integration driven by a single ticker; pointer perturbs field. |
| **Heart** | Canvas 2D | Taubin implicit heart surface solved into a point cloud, spun on canvas; pointer interaction. |
| **ThreeJs Scene** | three.js (WebGL) | Parametric superellipse generator (lobes/sharpness), presets lantern/orb/bloom/shell/spike; loads Khronos Lantern.glb via GLTFLoader; materials studio/chrome/wax/ink; points/wire/shaded modes; config: accent/finish/polish/spin/pointSize/lobes/sharp. |
| **Dynamic Scrollbar** | Custom scrollbar UI + canvas/DOM clock | Slim gray scrollbar; on scroll it blooms into a live analog clock; credits osmo.supply, angularicons.com, x.com/KMkota0. |
| **Rotating Gallery** | CSS 3D | Ring of image plates (`DTS_Unwrapped_by_FRANCO_DUPUY_*.jpg`) on pure `translateZ` depth, `perspective: 4000px`; drag to rotate with per-image easing (4-stop bezier); config: drift/weight/depth/morph(glide|snap|spring)/imgEase. |
| **Paste-Up** | three.js planes / DOM boards | One set of prints arranged on three layout boards; board-to-board transitions with plane wipes. |
| **Vocal Orb** | WebGL2 custom pipeline + workers + WebAudio | "A small black hole that listens": mic (`getUserMedia`) → AudioWorklet tap → worker (jsdelivr runtime + phonemizer, huggingface.co inference) → emotion/mood scores → orb color/energy (joy/love/surprise/sadness/fear/anger palette), captions (partial/commit/final), TTS speak-back (orb__spk button), mic button states (listening/blocked). Post chain: scene → knee highlight → additive bloom mip chain → chromatic-aberration composite; `EXT_color_buffer_float` required (graceful "This one needs WebGL2." fallback). Config schema generated like other experiments. |

## G. `/writing` + post

- **Folder shelf (`wstage`):** hidden until JS; 3D shelf of folders (three.js + BufferGeometryUtils + CSS3D) from `json[data-folders-data]`; arrow keys browse, Enter opens; tooltip card shows title + date/year/cat chips; sr-only excerpt for a11y.
- **Flight transition:** leaving index → opening post flies the folder across the `flight-gl` canvas (z80) between pages (`folders-flight` module, `data-flight-wait` elements wait for it).
- **Index fallback (`writing__classic`):** intro + `2026 ::` + filter tabs (All/web/design/motion/tools/life, `role=tablist`, `aria-selected`) filtering rows (`data-cat`), empty state "Nothing filed here yet".
- **Post:** TOC rail (7 items, scrollspy sets `data-toc-active`, collapsible `is-open`); close button; masthead; TL;DR; prose; expressive-code (ts/json) with copy; credits refrows; signature SVG drawn from `data-sig-pts` (SignatureFx — likely stroke-draw on reveal).

## H. `/studio` — lanyard

- Hidden until JS; three.js canvas badge with name/role/studio/line/addr/place/year from `data-lanyard-*`; drag to swing (pendulum physics, `gl-warm` + `studio-env` procedural equirect env: 1024×512 gradient w/ whiteboard shapes); release swings back; info button (external link) with tooltip "balky.studio"; fallback classic tile link.

## I. `/contact` — letter

- **Desk canvas** background (`desk__canvas`).
- **Form:** date auto-set (`23 OCT 2026`); RE radios (custom `.sheet__box`); FROM email + VIA source with underline rules that animate on focus; ruled textarea (`data-letter-rules`); status `NOT YET SIGNED` updates; signature: ink canvas draws pointer strokes (mouse/touch/pen); click opens slip `<dialog>` with larger pad ("SIGN HERE / WITH YOUR FINGER, MOUSE OR PEN", ✕ crosshair guide, Clear/Done); typed-name fallback input + "clear signature"; validation notes (`data-letter-note` email/body/sign) appear inline; submit → `POST /api/contact` JSON; on failure: "The counter is closed right now." + `mailto:hello@carterogunsola.com` (CF-protected) + retry; on success: postmark `.stamp` animation, "Keep a copy" appears, stub ticket updates (JOB/RECEIVED/REPLY BY/STATUS/FILE UNDER + barcode `stub__bars`); entrance choreography via `z-y-*`/`z-x-*` ordering classes.
- **Email protection:** Cloudflare `email-decode.min.js` + `data-cfemail` spans.

## J. `/record`

- Iframe stage loads chosen route (site select: /, /about, /lab, /writing, /contact; lab: 9) or pasted external URL; frame resizes to W×H inputs or 8 presets (1920×1080, 1440×900, 1440×1080, 1280×720, 1080×1080, 1080×1350, 1080×1920, 1200×630 OG); **Fit** scales frame to window; **Bare** strips site chrome inside frame (`data-bare` on framed doc — suppresses presence, header extras), with **Docs**/**Cfg** subtoggles for lab pages; **Hide UI** (H/Esc) hides the bar for clean capture (⌘⇧5 / Screen Studio); live readout (`data-record-readout`).

## K. Keyboard / a11y map

- Global: ⌘K/Ctrl+K cmd; Esc closes overlays (cmd/notif/drawer/dialogs/slip/record bar); ↑↓/↵ in cmd; H in record; arrow keys in wheels/folders stages; `data-lenis-prevent` regions remain natively scrollable.
- Focus: visible styles implied by design system; skip patterns via `u-sr-only` headings (every page has sr-only h1); `aria-pressed` on toggles; `aria-live` on announcer/toaster/status/captions; `role=dialog aria-modal` on cmd/notif/drawer/slip/about dialogs; `aria-roledescription=carousel` on wheels/folders; `aria-keyshortcuts="Meta+K"`.
- Touch: drawer for nav; hover-only effects gated behind `(hover:hover) and (pointer:fine)`; prefetch on `touchstart`.

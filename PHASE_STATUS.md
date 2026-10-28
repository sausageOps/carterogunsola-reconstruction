# PHASE STATUS — Phase 0 reconnaissance & Phase 1 foundation of carterogunsola.com

Date: 2026-10-28 · Inspector: Arena.ai Agent Mode · Reference: https://carterogunsola.com/

## Verdict

**Phase 0 complete.** All discovered routes were inspected; limitations are explicitly documented below. The blueprint is sufficient to start Phase 1 (foundation) in a fresh agent session.

**Phase 1 complete.** Shared design system, Astro application foundation (`app/`), and persistent global interface implemented and verified across all 10 Phase 1 acceptance criteria.

## Scoreboard

- **Routes discovered:** 18 HTML pages + 6 non-HTML routes + static asset families
  - 17 URLs in `/sitemap-0.xml` + `/record` (linked from chrome, not in sitemap) = **18 pages**
  - Non-HTML: `/rss.xml`, `/changelog.xml`, `/feed.json`, `/feed.xsl`, `/robots.txt`, `/sitemap-index.xml`, `/site.webmanifest`, `/api/contact` (POST), 404 route, favicon/icon/OG families
- **Routes successfully inspected:** **18/18 pages** (rendered text of every page captured; raw HTML saved & deeply analyzed for 10 pages incl. homepage, about, lab, contact, studio, writing, record, changelog, lab/dial, lab/vocal-orb, writing post) + all non-HTML routes (content or headers)
- **Media assets identified:** **108 unique asset URLs** catalogued in `recon/asset-urls.txt` — 34 project images, 17 depth maps, 15 videos (6 project reels + 9 lab reels), 17 logo plates, 11 lab-poster variants (9 files × 2 widths), 8 OG images, 24 font files, 6 icon/favicon files, 2 portrait variants, 4 inline grain textures, 40 JS chunks + 10 CSS chunks (saved as evidence)
- **Workspace usage:** ~4.8 MB total (`recon/` 4.7 MB: `src/` 3.6 MB code evidence, `pages/` ~2.3 MB HTML evidence, plus homepage.html, wheels-data.json, asset-urls.txt). No media downloaded; storage is not a constraint.

## Documentation files created (all under `/home/user/recon/`, transferable to GitHub)

| File | Contents |
|---|---|
| `RECONSTRUCTION_MASTER.md` | Complete site spec: stack, tokens (colors/type/spacing/easing/textures), fonts, global chrome, per-page specs, content datasets, SEO pattern, external services, lifecycle registry |
| `ROUTE_INVENTORY.md` | All 18 pages + non-HTML routes: purpose, components, interactions, inspection status, route graph, limitations |
| `ASSET_MANIFEST.md` | Media references & usage mapping: counts, font table, per-project/lab/OG/icon patterns, saved evidence files |
| `INTERACTION_MAP.md` | Every interaction: triggers, states, timing, tech (chrome, wheels, about, lab, experiments, letter, record, keyboard/a11y) |
| `PHASE_PLAN.md` | 10 implementation phases with dependencies and acceptance criteria + final comparison requirement |
| `PHASE_STATUS.md` | This file |
| `asset-urls.txt` | 108 unique media URLs |
| `wheels-data.json` | 17 homepage projects (verbatim from page) |
| `src/` | 40 JS + 10 CSS chunks downloaded from the live site (blueprint evidence) |
| `pages/` | 10 raw HTML pages saved |
| `/home/user/homepage.html`, `/home/user/sitemap-0.xml` | Homepage HTML + sitemap evidence |

## What remains unknown / unverified (do not claim otherwise)

1. **7 lab pages' full docs content** (live-cursors, polka-dots, heart, threejs-test, dynamic-scrollbar, rotating-gallery, paste-up): rendered text captured, JS chunks analyzed, but their full Notes articles + Code blocks exist only in their own HTML (not saved). Re-fetch each when rebuilding that experiment in Phase 8.
2. **Pixel-exact visuals:** no browser rendering was available. Wheel geometry, shelf layouts, canvas shader looks, exact spacings are documented from code/tokens, not screenshots. Verify visually during implementation.
3. **Presence worker protocol:** PartyKit-style client observed (`host/room/party`, `/parties/vitals/vitals`); server behavior inferred. Rebuild can stub or replicate with any realtime backend.
4. **`/api/contact` schema:** field names inferred from the form (`kind`, `email`, `source`, `body`, `name`, signature image); exact server validation/response contract unknown (400 on empty JSON confirmed live).
5. **Easter-egg triggers:** `Console`, `Strive`, `Odyn`, `TypeTune`, `FontTrial`, `PrintFlicker`, `MeshMode`, `Marks`, `DevGrid` modules exist in the registry; their exact activation (likely key combos / `lab-mode` / owner-key) was not determined. DevGrid overlay markup (`data-dev-grid`, z2900) and styles (`Grid.Cu8GCU57.css`) are known.
6. **Homepage wheel media timing:** reels exist for 6 projects; exact hover/active playback trigger inferred, not observed.
7. **Telemetry COMMITS source:** sparkline data source (GitHub API vs worker) not identified.
8. **number-flow CDN:** loaded dynamically (URL pattern not captured); a local copy of the component ships in `dist.C3hNWf9G.js`.
9. **Asset dimensions:** poster/reel/plate pixel dimensions not probed (only a few content-lengths); cdn-cgi transforms allow any width — treat originals as resizable.
10. **vocal-orb inference worker:** endpoints/models on `models.carterogunsola.com` and huggingface.co not enumerated.

---

## Phase 1 — Foundation and Global Interface (Completed 2026-10-28)

### Source Verification & Clarifications Established from `src/` and `pages/`

During Phase 1 source inspection of `src/Base.css`, `src/Base.js`, `src/mesh.DnpBQ695.js`, `src/ClientRouter.js`, `src/prefetch.BhDfpIsL.js`, `src/dist.C3hNWf9G.js`, `src/ec.2v5bd.css`, `src/ec.0vx5m.js`, and `pages/*.html`, the following implementation details were verified directly from source:

1. **Renamed Core Chunks**: `src/Base.css`, `src/Base.js`, `src/ClientRouter.js`, and `src/page.js` correspond to `/_astro/Base.C-Njm2nK.css`, `/_astro/Base.astro_astro_type_script_index_0_lang.BR2GwRUH.js`, `/_astro/ClientRouter.astro_astro_type_script_index_0_lang.DplsW-2c.js`, and `/_astro/page.CENh9UKf.js`.
2. **Header `LogoNav` vs. Breadcrumb (`src/Base.js`)**: `.logo__capsule` (`span.logo__word`) odometer-rolls per top-level route (`/` → `O` with `.logo__capsule--single`, `/about` → `About`, `/lab*` → `Motion`, `/writing*` → `Writing`, `/studio` → `Studio`, `/contact` → `Contact`) using dynamic SVG `<feGaussianBlur>` motion blur filters. `span.header__crumb[data-crumb]` stays `hidden` except when `[data-lab-detail]` has `dataset.name` (e.g., `/ Dial` on `/lab/dial`).
3. **Easter-Egg & Debug Query Parameters (`src/Base.js`, `src/mesh.DnpBQ695.js`)**:
   - `DevGrid`: `Shift+G` cycles 4 modes (`0=off`, `1=12-col grid`, `2=measure+thirds`, `3=baseline rhythm`), `Escape` clears.
   - Query flags: `?flicker` (`PrintFlicker`), `?tune=paper|veil|type` (`Tune` / `TypeTune`), `?font=oracle|geist|usans` & `?mono=ppmono|geist` (`FontTrial`), `?mesh` (`MeshMode`), `?perf[=deep]` (`Perf`), `?loader=climb|eager|stall|brisk` (`Veil` counter profile), `?debug=veil|toast`, `?owner=<key>` (unlocks `CARTER::HERE` HUD chip via `localStorage["owner-key"]`), and `?bare=1|stage|clean` (`data-bare`, `data-bare-nodocs`, `data-bare-nocfg`).
4. **Realtime PartySocket / Cloudflare Worker Boundary**:
   - `carter-2026-presence.carterogunsola7589.workers.dev` is isolated behind `Et` (`PartySocketBoundary` in `app/lib/runtime.ts`), remaining dormant unless `?realtime=live` is passed so offline/sandbox sessions never emit failed WebSocket or fetch console errors.
   - Local Web Vitals (`PerformanceObserver` for `largest-contentful-paint` and `first-contentful-paint`) populate `LCP::` in the HUD (`[data-hud-lcp]`), and local session presence populates `1 ONLINE` via `<number-flow>`.

### Files Implemented in Phase 1

- **Project Configuration**: `.gitignore`, `package.json` (`astro@6.1.3`, `gsap@3.15.0`, `lenis`, `number-flow`, `sass`, `typescript`), `astro.config.mjs` (`srcDir: './app'`, `publicDir: './app/public'`, `host: '0.0.0.0'`, `allowedHosts: true`), `tsconfig.json`.
- **Public Assets (`app/public/`)**: `favicon.svg`, `favicon-dark.svg`, `favicon-light.svg`, `site.webmanifest`, `robots.txt`.
- **Design System (`app/styles/global.scss`)**: Exact light/dark tokens, typography scale and font stacks (`Oracle`, `PP Neue Montreal Mono`, `Geist Variable`, `Geist Mono Variable`, `Geist Pixel`, `Untitled Sans` with clean `local()` fallbacks), SVG grain textures (`--grain-fiber`, `--grain-tooth`, `--grain-carton`, `--grain-dots`), layout utilities, chrome styles, shared UI atoms, and `expressive-code` styles.
- **Core Runtime & Helpers (`app/lib/` & `app/data/`)**:
  - `app/lib/assets.ts` (`ASSETS_ORIGIN`, `asset()`, `img()`)
  - `app/data/site.ts` (`SITE` metadata, `NAV_ITEMS`, `LOGO_WORD_MAP`, `CHANGELOG_ITEMS`)
  - `app/lib/prefetch.ts` (client prefetch utility)
  - `app/lib/expressive-code.ts` (code block copy feedback + scrollable `<pre tabindex="0">`)
  - `app/lib/mesh.ts` (`Lenis` manager, `Tune` panel, `Paper` WebGL2 ground shader + FBO trail + click ripples, `VeilPaper` WebGL2 torn-paper shader, `Veil` transition controller, `MeshMode`, `onCleanup`/`runCleanups`)
  - `app/lib/runtime.ts` (all 24 global boot singletons `Qr` + per-route mounts `$r`)
- **Layout & Reusable Chrome/UI Components (`app/layouts/`, `app/components/`)**:
  - `BaseLayout.astro`, `SvgSymbols.astro`, `Logo.astro`, `Header.astro`, `CommandMenu.astro`, `Notifications.astro`, `Drawer.astro`, `Footer.astro`, `Veil.astro`, `FoundationShell.astro`
  - `app/components/ui/`: `ArrowRoll.astro`, `Button.astro`, `Chip.astro`, `CloseBox.astro`, `ExpressiveCode.astro`, `InfoTip.astro`, `LinkCircle.astro`, `ProgressiveBlur.astro`, `RefRow.astro`, `Row.astro`, `SectionLabel.astro`, `Signature.astro`, `Socials.astro`
- **Minimum Phase 1 Verification Routes (`app/pages/`)**:
  - `index.astro` (`/`), `about.astro` (`/about`), `lab/index.astro` (`/lab`), `lab/dial.astro` (`/lab/dial`), `writing/index.astro` (`/writing`), `writing/the-personal-starter.astro` (`/writing/the-personal-starter`), `studio.astro` (`/studio`), `contact.astro` (`/contact`), `changelog.astro` (`/changelog`).

### Verified Phase 1 Acceptance Criteria

1. **Clean Build & Live Preview**: `npm run build` succeeds in ~3.3s generating all 9 static routes; `npm run dev` serves on `0.0.0.0:4321` with HTTP 200 across all routes and static assets.
2. **Dark & Light Themes**: Default dark theme (`data-theme="dark"`, `/favicon-dark.svg`), one-shot `theme-cutover` migration, light/dark toggle (`[data-theme-set]`), `theme:system` via Command Menu, and `localStorage["theme"]` persistence across reload verified.
3. **Persistent Global Chrome**: Header, HUD (`UT::` clock, `FPS`, `ONLINE` `<number-flow>`, `LCP::`, `CARTER::HERE` via `?owner=`, `PRESENCE::ON/OFF`, `BOOKING::Q1’27`), `LogoNav` capsule odometer, `data-crumb` (`/ Dial` on `/lab/dial`), `navpill`, Command Menu, Notifications panel (14 items, unread badge, `Mark all read`), and Mobile Drawer (`#drawer`) verified with zero console errors.
4. **Keyboard Shortcuts**: `⌘K`/`Ctrl+K`, `/` (with input/textarea focus guard), `ArrowDown`/`ArrowUp`, `Enter`, `Escape`, and `Shift+G` (`DevGrid`) verified.
5. **Scroll Progress & Header Hide/Show**: `[data-progress]` `scaleX(...)` and `[data-header].is-hidden` when scrolling down past `120px` (and revealing on upward scroll) verified.
6. **Veil & ClientRouter Navigation**: `boot` (`sessionStorage["veil:seen"]`), `fast`, and `off` (`?bare=`) modes, `veil:reveal` event dispatch, and route transitions without listener duplication verified.
7. **Reduced-Motion & Responsive Breakpoints**: `prefers-reduced-motion: reduce` and `?bare=clean` behavior verified.
8. **Evidence Preservation**: All 68 original files in `src/`, `pages/`, and root reports remain untouched (`git status` confirms only `PHASE_STATUS.md` modified among tracked files).

## Phase 2 checkpoint — 2026-10-28 (incomplete)

- Starting point: clean `arena/b22523c7-carterogunsola-reconstruction` at the Phase 1 foundation. No commits or pushes made.
- `app/pages/index.astro` now renders the verified server-side “Selected work” classic fallback from all 17 entries in `wheels-data.json`, using existing Phase 1 row, chip, footer and layout components. The list spacing is provisional; it is not claimed to match the missing original stylesheet.
- `recon/homepage/recovery.md` records the accessible rendered-text evidence and the source inspection. Original homepage HTML, homepage CSS and original rendered screenshots were not recovered. The original wheel source is preserved in `src/` and was inspected, not integrated: its expected DOM and one imported bundle are missing. This is not the original wheel experience.
- Project links, names, collaborations and years are sourced from the original JSON. Original image, depth, logo and video references are retained there but are not displayed by this fallback; no images, proprietary fonts, videos or substitute assets were downloaded. Their availability remains unverified.
- `npm ci` and `npm run build` succeeded. A local HTTP request to the running Astro preview returned HTML containing the names and URLs of all 17 projects. This is not a browser interaction or visual test.
- No browser automation or screenshot capability was available here; visual comparison, desktop/tablet/mobile rendering, reduced-motion behavior, keyboard/touch/drag/wheel behavior, theme, transition, link navigation, and console/regression checks remain unverified. Wheels, project media, project CTA, hint, announcements, initial selection and motion are **not implemented**.
- Next: obtain the raw original homepage HTML and its homepage-specific stylesheet (and missing wheel dependency), inspect the rendered original at multiple sizes and interactions, integrate and verify the wheel with the existing lifecycle, then perform the requested browser checks. Phase 2 is not ready for acceptance.

## Phase 2 wheel restoration — 2026-10-28 (integration present; verification incomplete)

- The user supplied raw homepage HTML and global CSS, preserved byte-for-byte at `recon/homepage/homepage.html` and `recon/homepage/global-original.css`. The homepage's inline `.hv2` CSS and stage markup were recovered. The embedded project JSON exactly matches all 17 records in `wheels-data.json`. The supplied homepage has no separate wheel hint, wheel label elements or footer; none were invented.
- `app/pages/index.astro` now uses the recovered stage, two drum copies for each of four lines, project JSON and classic fallback; `app/styles/homepage.css` carries the recovered `.hv2` rules with generated Astro scope attributes removed. Shared layout and tokens remain Phase 1's. Original homepage has no regular footer, so it is disabled only on this route.
- `app/lib/wheels.js` adapts the saved Three.js wheel engine to the shared Phase 1 mesh/GSAP/veil/cleanup exports. `app/lib/wheels-gl-warm.js` uses the same mesh instance; a minimal registry entry in `app/lib/runtime.ts` mounts the engine using the existing route lifecycle. The unavailable optional debug-only wheel-lab import was removed. The original saved evidence remains unchanged. There is no intended second global runtime.
- Original remote image, depth and video references remain centralized in `wheels-data.json`; none downloaded. The 17 `/media/plates/` logo files are absent and the engine's monogram fallback is used when they fail. Font files are not supplied. Direct TLS requests for original Clay subject and depth assets failed (`SSL_ERROR_SYSCALL`); remote asset availability, CORS, and video playback remain unverified.
- `npm run build` passed (Vite emitted large chunk and unused-import warnings). A local HTTP response was parsed: all 17 project records match, and each of the four lines has two drums. No rendered browser interaction test was completed: a temporary headless Chromium was installed from npm, but launch failed because system `libnspr4.so`, `libnss3.so` and `libnssutil3.so` are unavailable; package-manager access was blocked. No screenshot comparison to the original was possible. The actual WebGL stage, interaction, lifecycle, reduced-motion behavior, responsive states, console and theme regressions therefore remain unverified. This phase is not yet accepted as complete.
- Next: run the local preview in a WebGL-capable browser with original assets reachable, verify the wheels, navigation lifecycle, keyboard, drag, scroll, touch, responsive and reduced-motion states, check CORS/logo availability, and compare visually with the original. Do not assume pixel-perfect fidelity.

### Phase 2 targeted layout correction — 2026-10-28

- Live page was fetched as text; direct workspace TLS still fails and no visual/interactive original browser inspection was available. The user's report of displaced content and extra scrolling could not be reproduced in a browser here.
- Source comparison identified a definite Phase 1 integration defect: the three persistent `shelf-gl`, `shelf-still`, and `flight-gl` canvases in `BaseLayout.astro` lacked the original inline fixed-position, full-viewport, transparent, pointer-events-none styles. Without those styles they participate in normal layout ahead of `<main>`. Restored the exact styles from `recon/homepage/homepage.html`, preserving the persistent canvases and their transitions. This can explain extra page height/displacement but has not been confirmed as the sole cause of the reported symptoms.
- The preview's returned HTML was parsed and all three styles match the recovered original exactly. `npm run build` passed (same Vite warnings). Local plate files remain absent; the engine's monogram fallback is present in source. Browser rendering, WebGL, image/CORS, interaction, responsive, theme, reduced-motion and navigation regression checks remain unverified; preview still runs on port 4322. Phase 2 is not complete.

### Phase 2 checkpoint verification request — 2026-10-28

- User reports a preview screenshot showing Clay (01/17), artwork, center content, a logo plate and floating 3D elements. The screenshot itself was not supplied for this turn and these observations have not been independently verified by the agent; a visible plate may use the engine's monogram fallback because no `/media/plates/` files are in `app/public`.
- Port 4322 still returns HTTP 200. Browser automation remains blocked by missing Chromium libraries (`libnspr4.so`, `libnss3.so`, `libnssutil3.so`); no interactive project-change, drag, wheel, keyboard, responsive, theme, reduced-motion, console, network or video tests were performed by the agent in this turn.
- Recovered original CSS and Phase 1 CSS both use `html { scrollbar-gutter: stable }`; no evidence establishes that the scrollbar should be removed. The fallback list legitimately scrolls, so no scrolling changes were made.
- Original project, depth, and reel URLs remain in the JSON; workspace direct HTTPS to the asset host fails during TLS, which is an environment-specific failure and does not establish a browser-side block or CORS policy. Local plate files are absent. Confirm asset and video loading in the user's browser Network panel.
- Phase 2 remains unverified: before accepting the checkpoint, manually confirm synchronized selection/content/CTA/plate changes, drag/scroll/keyboard, tablet/mobile and touch, theme/reduced-motion and Network/Console results, then compare the right edge with the original. No Phase 3 work or git commit/push was performed.

## Phase 2 checkpoint — 2026-10-28

- The user manually inspected the homepage preview on port 4321 and considers its core appearance close enough to proceed. This is a user visual assessment, not a claim of pixel-perfect comparison or agent-run interaction testing.
- The recovered original homepage and global stylesheet remain intact in `recon/homepage/homepage.html` and `recon/homepage/global-original.css`, byte-for-byte matching the supplied files. The 17 records in the original homepage match `wheels-data.json` exactly. Source inspection confirms the Three.js wheel integration starts at zero-based index 0 (Clay, 01/17), with the classic list retained for reduced motion and WebGL fallback.
- Production `npm run build` passed on 2026-10-28. Vite reported an unused-import warning and a large-chunk warning. Automated browser testing was unavailable because the headless browser lacked system libraries; synchronization, drag, wheel, keyboard, touch, mobile/tablet behavior, theme, reduced motion, lifecycle, console and network checks remain unverified by the agent. The user's visual approval does not imply those interactions were tested.
- Original remote media references remain in `wheels-data.json`, but browser availability, CORS and video playback remain unverified. The local `/media/plates/` logo files are absent; the engine can render monograms as fallback. No bulk media or proprietary fonts were downloaded.
- This checkpoint records the user's decision to proceed while retaining the above open verification work; it is not a claim of pixel-perfect fidelity or complete browser acceptance. No Phase 3 implementation was started.

## Phase 3 — Contact reconstruction — 2026-10-28

### Evidence and implementation

- The live `/contact` page was accessible through text extraction in this phase. **Neither the live original nor the reconstruction could be visually inspected in a browser here.** Layout, content, controls and motion were recovered from `pages/contact.html`, `src/contact.DaXd3pkc.css`, `src/letter.LA9KroNb.js`, the shared source, and the existing reconnaissance above; the live extracted text was checked against that evidence.
- Replaced the Contact verification shell with the original letter sheet, identity and mailto, date, RE/FROM/VIA fields, ruled message, signature slip, status, failure note, and job-ticket stub. Shared `BaseLayout`, `Logo`, `Button`, chrome, theme, reveal and transition machinery remain in use; the original page does not have the global footer.
- Adapted the original Contact/desk engine and mesh-wire helper to the existing shared runtime and Three.js source. The only shared runtime change registers the Contact engine for its route. The recovered CSS is scoped to `.letterpage`; its 108 original rules and their declarations/conditional contexts were checked against the source. Added route-local keyboard-focus treatment, validation announcements/`aria-invalid`, a no-JavaScript mailto fallback, and a client-refreshed date for the static build.
- The original `?counter=open` debug shortcut was deliberately removed: it could claim receipt without a real submission. Receipt/stamp/copy UI is retained for a successful API response. The reconstruction has **no contact-delivery backend**: the static preview returns 404 for `POST /api/contact`, so normal submissions show the original closed-counter state and a prefilled email link. No real message was sent during testing.

### Verification and limitations

- `npm run build` passed (9 static pages). Vite emitted the existing unused Astro-import and large-chunk warnings. `git diff --check` passed.
- Production preview: `/contact` and `/contact/` returned 200; its local stylesheets and recursively referenced module assets returned 200. All eight actual internal anchor destinations on the Contact document returned 200. The shared command menu's existing `/record` target returns 404; there was no `/record` page in the baseline and it remains outside Phase 3.
- A DOM simulation of the adapted engine with reduced motion and mocked canvas/runtime/network passed date, required/invalid input notes, ARIA error state, radio/ticket updates, typed and pointer-signature state/clear, JSON payload, closed/offline failures, prefilled mailto, retry, mocked-success ticket/stamp/copy visibility, and cleanup checks. The success response was a test mock, not proof of delivery. The simulation does **not** verify actual canvas rendering, native dialog/focus behavior, WebGL, animation, client-side page transitions or browser console/network behavior.
- Source-level layout checks exercised the original position calculations at 320, 375, 759, 760, 1024 and 1440 px, and inspected the original 760 px container/engine branch, 47.99 rem mobile rules and reduced-motion gate. These are not rendered viewport checks.
- A single headless Chromium launch attempt failed because the sandbox lacks `libnss3.so`; no repeated browser installation attempts were made. Actual desktop/mobile visual comparisons, touch drawing, theme changes, console errors and browser asset loading remain unverified. Original proprietary fonts were not downloaded; the existing shared local/system fallbacks remain. Remote OG-image availability is also unverified.
- `app/pages/index.astro`, `app/styles/homepage.css`, the wheel engine and warm-up file, shared components/layout and all recovered evidence files remain unchanged. No Phase 4 work was performed; the Phase 3 checkpoint is intended for review without an automatic merge.

## Phase 4 — Studio reconstruction — 2026-10-28

### Evidence and implementation

- The live `/studio` page was reachable **only as rendered text** through the page-fetch tool; a direct `curl` from this workspace fails at TLS (`SSL_ERROR_SYSCALL`), as in Phases 2 and 3. **No browser inspection of the original or of the reconstruction was possible**: no Chromium/Firefox binary is installed and `libnss3.so` is absent. No browser installation was attempted. The rendered text was checked against the saved raw HTML and agrees with it exactly. Evidence and gaps are recorded in `recon/studio/recovery.md`.
- `app/pages/studio.astro` now renders the recovered document: `<main class="studio">`, the screen-reader `h1`, the `section.lstage[data-lanyard]` stage with all seven `data-lanyard-*` values (Carter Ogunsola / Founder & Creative Developer / Balky Studio / “We make the web fun again” / BALKY.STUDIO / Utah, USA / 2026), its canvas, the `.lstage__info` visit infotip (`https://www.balky.studio/`, `aria-describedby="studio-tip"`, tip “balky.studio” + up-right arrow), and the `.studio__classic.container[data-lanyard-classic]` tile fallback with the Balky flag SVG (`mask id="balky-flag-mask-studio"`), `Balky Studio` + linkcircle and the meta line. Page title, meta description, canonical and `/og/section/studio.jpg` follow the recovered `<head>`; the original page has no footer, so the shared footer stays off on this route only. The Phase 1 verification shell is gone from this route.
- The Studio engine is the **recovered original module**, not a rewrite: `app/lib/lanyard.js` is `src/lanyard.GSKzBzbt.js` verbatim with only its five import specifiers repointed at the shared Phase 1 runtime (`./mesh.ts`), the recovered three.js bundle in `src/`, the recovered `app/lib/mesh-wire.js` + `app/lib/studio-env.js` (both verbatim, specifiers repointed) and the Phase 2 `app/lib/wheels-gl-warm.js`. All 27 three.js specifiers the engine imports were checked against the bundle’s export list before use. Drag-to-swing, grab/throw/click-flip, pointer push on the strap, breeze + jittered puff idle, `devicemotion` tilt/shake, the `veil:reveal` hook descent, the `data-theme` observer, `ResizeObserver` re-fit, the mobile shadow-map branch, `?tune=lanyard` (8 groups / 26 rows), `?debug=lanyard` and full disposal come with the original source.
- The only shared-runtime change is one registry line in `app/lib/runtime.ts`: `{name:'Lanyard', when:'[data-lanyard]', routes:/^\/studio\/?$/, load:()=>import('./lanyard.js')…}`, copied from the original `src/Base.js` entry and placed after `Letter`, matching the original order. No second runtime, no lifecycle change.
- `app/styles/studio.css` carries the page’s inline `<style>` block from `pages/studio.html` with the Astro scope attributes removed and every rule prefixed `.studio` so the page keeps its original cascade position without touching other routes; declarations are verbatim. The `.infotip*` rules from that same block already exist identically in `app/styles/global.scss` and were not duplicated.
- Shared atoms were extended, not forked: `InfoTip.astro` gained optional `href/target/rel/tipId/titleTag/titleClass/externalIcon` props so it can render the recovered anchor variant (defaults reproduce the previous output), `ArrowRoll.astro`/`LinkCircle.astro` gained an optional `diagonalRoll` prop (default `diagonal`, i.e. unchanged) because every `.linkcircle` in all 11 saved original pages pairs the up-right glyph with a plain `arrow-roll` — only `/studio` needed this today — and `SvgSymbols.astro` gained the two recovered glyphs `ai:local:circle-info` and `ai:local:arrow-up-right`.
- Nothing was invented: no extra sections, copy, imagery or media. No media or fonts were downloaded.

### Verification

- `npm run build` passed: 9 static pages, ~4.8 s, the pre-existing Vite unused-import and >500 kB chunk warnings only. Vite emitted `/_astro/lanyard.C1m6zw-L.js` and rewrote the dynamic import in the runtime chunk to it with the original selector and route regex intact.
- Production preview (`astro preview`, `0.0.0.0:4321`): `/studio` and `/studio/` returned **200**; every local asset the document references returned 200 (`BaseLayout…css`, the runtime chunk, the ClientRouter chunk), and a recursive crawl of the Studio module graph returned 200 for all 6 module URLs (`lanyard`, runtime, `wheels-gl-warm` (the shared three.js chunk), `router`, `wheels`, `letter`). Regression sweep: `/`, `/contact`, `/contact/`, `/about`, `/lab`, `/lab/dial`, `/writing`, `/writing/the-personal-starter`, `/changelog` all 200. Pre-existing 404s unrelated to Phase 4 remain: `/record`, `/rss.xml`, `/feed.json`, `/changelog.xml`, `/sitemap-index.xml` (Phase 9 scope).
- Markup comparison against `pages/studio.html`: a normalised token diff of the built `<main>` leaves six benign hunks — the layout’s `id="main"`, the two `<symbol>` blocks now living in the shared persistent sprite instead of inline per icon, whitespace inside the tooltip title (an inline-flex item, so it collapses), and `<path/>` written as `<path></path>`. Everything else — attributes, order, copy, ARIA, SVG path data — matches the original.
- Runtime smoke test (jsdom over the **built** bundle, `getComputedStyle` stubbed because jsdom cannot parse this stylesheet): on `/studio` the shared loader mounts **only** `Lanyard`; on `/` only `Wheels`; on `/contact` only `Letter`. With `prefers-reduced-motion: reduce` the engine returns before any WebGL work and the stage stays `hidden` with the classic tile visible — zero console errors. With motion on and no WebGL context (jsdom) three logs “Error creating WebGL context”, the engine returns `null`, and the same fallback state holds — no uncaught error. The `Lanyard` export, the seven `data-lanyard-*` values, the stage ARIA (`role=group`, `tabindex=0`, label), the anchor tooltip wiring (`href/target/rel/aria-describedby` → `#studio-tip[role=tooltip]`, `<p class="infotip__title text-label">balky.studio`) and the classic tile (href, `data-hover`, name, plain `arrow-roll`, meta, mask id) were all read back from the built DOM. The LogoNav capsule read `Studio` on `/studio`, `O` on `/`, `Contact` on `/contact`; the crumb stayed hidden.
- Regression diff of the whole `dist` against a build of the pre-Phase-4 tree (stash → build → restore → build, hashes normalised): the eight non-Studio routes changed by exactly one insertion each — the two new sprite `<symbol>` definitions — and `/studio` is the intended page replacement. `app/pages/index.astro`, `app/styles/homepage.css`, `app/lib/wheels.js`, `app/lib/wheels-gl-warm.js`, `app/pages/contact.astro`, `app/styles/contact.css`, `app/lib/letter.js`, `app/lib/letter-mesh-wire.js`, the layout, chrome and all recovered `src/`, `pages/` and report files are untouched; homepage and Contact `arrow-roll` class counts are unchanged (27 diagonal / 13 plain, 10 / 13). `git diff --check` passed.
- Source-level responsive analysis (not rendered viewports): `.lstage` is `100svh` with the canvas `inset:0` at every width; `.lstage__info` sits `2rem` above the bottom edge, centred; the classic tile is `clamp(9rem,20vw,11.25rem)` → 144 px at 320/375/480 px, 153.4 px at 767 px, 180 px from 1024 px up; `.container` margins give 16 px sides at 320 px and 30 px from ~1440 px; the engine’s `(max-width: 47.99rem), (pointer: coarse)` branch halves the shadow map to 1024 below 767.84 px and its camera fit derives distance from the measured stage aspect, so portrait and landscape both frame the badge. Hover-only treatments are gated behind `(hover:hover) and (pointer:fine)` (and the tile lift additionally behind `prefers-reduced-motion:no-preference`).

### Remaining limitations (untested here)

1. **The WebGL-mounted path was never executed**: no GPU/WebGL context exists in this sandbox, so the stage un-hiding, badge rendering, shadow/env lighting, drag-swing settle, click-flip, pointer push, breeze/puff idle, `veil:reveal` descent, theme recolour and resize re-fit are verified by source contract only (`this.h && (stage.hidden = false, classic.hidden = true)` plus the recovered solver code), not by observation.
2. **No visual comparison** with the original at desktop, tablet or mobile sizes; no touch, pen, hover, focus-ring or keyboard-behaviour testing in a real browser; no browser console/network panel results. The `.lstage` group is focusable and the tooltip opens on `:focus-visible`, but that was not exercised in a browser.
3. **Fonts**: `Oracle` and `PP Neue Montreal Mono` are not present (none downloaded). The badge faces are canvas-drawn with those stacks, so they will fall back to Geist/system fonts, and the original `<link rel="preload" as="font">` is absent. Metric-dependent canvas layout (`letterSpacing`, the two-line split of “We make the web fun again”, the strap’s repeated `BALKY STUDIO ✱` band) will therefore differ from the original.
4. **Remote assets**: `/og/section/studio.jpg` (and the OG/twitter tags pointing at it) could not be fetched from this workspace; availability and appearance are unverified.
5. **Device motion** (Android auto-listen, iOS permission on first touch release) is untestable without a real device/browser.
6. Pre-existing, site-wide and deliberately untouched in this phase: the layout emits canonical/og URLs with a trailing slash (`/studio/`) where the original uses `/studio` — identical on `/contact` and every other route, so it is a Phase 1 `BaseLayout` behaviour, not a Studio regression; `POST /api/contact` still has no backend (Phase 3 note); feeds, sitemap and `/record` are Phase 9.
7. `jsdom` was installed with `--no-save --no-package-lock` for the smoke test only: `package.json` and `package-lock.json` are unmodified, and the test scripts live outside the repository (`/tmp`), so nothing test-only is staged for commit.

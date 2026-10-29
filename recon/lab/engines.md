# Phase 8 — Lab experiment engines: evidence, mapping and verification

Date: 2026-10-28 · Branch: `arena/cfa024d8-carterogunsola-reconstruction`
Companion documents: `recon/lab/recovery.md` (Phase 7 shells, index, shared document template), `PHASE_STATUS.md` (Phase 8 summary).

Phase 7 left `registerLabExperiment` as an empty registry, so every `/lab/<slug>` route rendered the poster/“Experiment coming soon” state and no experiment mounted. Phase 8 registers the nine original engines recovered from the saved compiled chunks in `src/` and makes them load lazily from the shared document engine.

## 1. Evidence used

| Source | Use |
|---|---|
| `src/polka-dots.C3pPEB_M.js`, `heart.HHFn1w7T.js`, `live-cursors.Dr9kI1HH.js` | Full engine sources (imports + body) |
| `src/dial._0WTp1k0.js`, `dynamic-scrollbar.Ia0FQs2Y.js`, `rotating-gallery.Cu-VrtOq.js`, `paste-up.DESythSE.js`, `threejs-test.CNSPgjYT.js`, `vocal-orb.Cv5LUT2z.js` | Full engine sources |
| `src/lab-doc.DKrI-8eU.js` | The original loader map: one lazy `import()` per slug, passed to the document engine; the vocal-orb entry supplied `captionHost` |
| `src/mesh.DnpBQ695.js`, `src/three.module.DBbmgHoE.js`, `src/GLTFLoader.BD7CsO-c.js`, `src/RoomEnvironment.CsPbsEjR.js`, `src/assets.DBbF6dnf.js` | Shared helper modules the engines import |
| `src/Base.astro_astro_type_script_index_0_lang.BR2GwRUH.js` | Source of `live-cursors`' two cursor glyphs, `site` config and socket class |
| `pages/lab/*.html` (dial, vocal-orb), `INTERACTION_MAP.md`, `ASSET_MANIFEST.md` | Behaviour notes and asset paths |

No engine body was rewritten, reformatted or “fixed”. Each file is the saved chunk with only its import specifiers re-pointed at the Phase 1–7 workspace modules.

## 2. Files added or changed

| File | Status | Contents |
|---|---|---|
| `app/lib/experiments/polka-dots.js` | new (4,036 B) | verbatim body; `../mesh.ts` |
| `app/lib/experiments/heart.js` | new (4,293 B) | verbatim body; `../mesh.ts` |
| `app/lib/experiments/live-cursors.js` | new (4,886 B) | verbatim body + 3-line comment; `../mesh.ts`, `../runtime.ts` |
| `app/lib/experiments/dial.js` | new (44,738 B) | verbatim body; `../mesh.ts` |
| `app/lib/experiments/dynamic-scrollbar.js` | new (16,215 B) | verbatim body; `../mesh.ts` |
| `app/lib/experiments/rotating-gallery.js` | new (12,223 B) | verbatim body; `../mesh.ts`, `../assets.ts` |
| `app/lib/experiments/paste-up.js` | new (11,941 B) | verbatim body; `../mesh.ts`, `../assets.ts` |
| `app/lib/experiments/threejs-test.js` | new (35,545 B) | verbatim body; `../../../src/three.module…`, `GLTFLoader…`, `RoomEnvironment…` |
| `app/lib/experiments/vocal-orb.js` | new (84,573 B) | verbatim body, no import changes |
| `app/lib/lab-experiments.js` | new (1,719 B) | the nine-entry loader map, registered with `registerLabExperiment` |
| `app/lib/runtime.ts` | edited (loader line only) | `LabDoc` loader now loads `lab-doc.js` **and** `lab-experiments.js` before `LabDoc.init()` |

### Import mapping (original → workspace)

| Original specifier | Workspace module | Notes |
|---|---|---|
| `./mesh.DnpBQ695.js` | `../mesh.ts` | same helper module already used by the Phase 2–7 engines |
| `./Base.astro_astro_type_script_index_0_lang.BR2GwRUH.js` | `../runtime.ts` | bindings `a`,`c`,`i`,`s` = the two cursor glyphs, `site` config, `Et` socket class — all exported by the Phase 1 runtime |
| `./assets.DBbF6dnf.js` (`n`) | `../assets.ts` (`asset`) | rotating-gallery plate URLs |
| `./assets.DBbF6dnf.js` (`r`) | `../assets.ts` (`img`) | paste-up print images |
| `./three.module.DBbmgHoE.js`, `./GLTFLoader.BD7CsO-c.js`, `./RoomEnvironment.CsPbsEjR.js` | `../../../src/…` | unchanged evidence wrappers that only re-export from `three` |

### Loader map

```js
const loaders = {
  'live-cursors': () => import('./experiments/live-cursors.js'),
  dial: () => import('./experiments/dial.js'),
  'polka-dots': () => import('./experiments/polka-dots.js'),
  heart: () => import('./experiments/heart.js'),
  'threejs-test': () => import('./experiments/threejs-test.js'),
  ...
};
```

`vocal-orb` is the only wrapped entry: the original document chunk mounted it with `{ captionHost: 'https://models.carterogunsola.com' }`, so the registry passes the same object while leaving the engine file untouched. Every other entry is registered as `{ config, default }` exactly as imported.

## 3. Fidelity check

Each `app/lib/experiments/*.js` was compared against the saved chunk after stripping the leading `import …;` statements (both sides formatted with Prettier, `--parser babel --print-width 120`):

| Engine | Body after imports |
|---|---|
| polka-dots, heart, dial, dynamic-scrollbar, rotating-gallery, paste-up, vocal-orb | identical |
| live-cursors | identical apart from the 3-line explanatory comment added above the body |
| threejs-test | identical apart from the `three.module` path inside the multi-line import |

Import statements differ only in the specifiers listed above. No constant, selector, config key, timing value or GLSL string was altered.

## 4. Build output

`npm run build` — **17 pages**, no errors, only the two pre-existing Vite warnings (unused `@astrojs/internal-helpers/remote` re-export; >500 kB chunk).

New lazy chunks in `dist/_astro/`: `lab-experiments.*.js` (1.6 kB) plus `dial` 44.8 kB, `dynamic-scrollbar` 16.3 kB, `heart` 4.4 kB, `live-cursors` 4.7 kB, `paste-up` 12.0 kB, `polka-dots` 4.1 kB, `rotating-gallery` 12.3 kB, `threejs-test` 79.7 kB, `vocal-orb` 84.8 kB. The document engine (`lab-doc.*.js`, 19.3 kB) is unchanged in size and behaviour; no engine code lands in a route's initial chunk.

## 5. Browser verification (headless Chromium, SwiftShader)

Test harness: `puppeteer-core@23` driving the `@sparticuz/chromium` binary (`LD_LIBRARY_PATH=/tmp/al2023/lib`), against `npm run preview` on `0.0.0.0:4321`. Remote origins (`assets.carterogunsola.com`, `cdn.jsdelivr.net`) are not reachable from the sandbox, so the harness answered image requests with a synthetic PNG and the `Lantern.glb` request with a synthetic GLB. Everything else was served by the real build.

### 5.1 Mount matrix — desktop 1440×900

All nine routes reached `data-stage-live`, cleared `data-stage-loading`, faded the poster overlay to `opacity: 0`, mounted the engine root inside `[data-experiment-viewport]` and exposed the Tune panel.

| Route | Root class | Surface | Tune rows |
|---|---|---|---|
| `/lab/polka-dots` | `pd` | 2D canvas, painted | Repel, Push, Bloom, **Spring** (curve + 3 knobs) |
| `/lab/heart` | `heart` | 2D canvas, painted | Spin, Coast, Focal |
| `/lab/live-cursors` | `lc` | DOM overlay | Smoothing, Size |
| `/lab/dial` | `dial` | DOM ring (26 items, 130 ticks) | Weight, Settle, Sensitivity, **Detent** (Soft/Snappy/Elastic), **Accent** (swatches) |
| `/lab/dynamic-scrollbar` | `sb` | DOM | Bloom, Collapse, Rest, **Accent** |
| `/lab/rotating-gallery` | `rg` | DOM plates (10 × 36°) | Drift, Weight, Depth, **Morph** (Glide/Snap/Spring), **Image** (easing curve) |
| `/lab/paste-up` | `pu` | WebGL board (+ `<img>` fallback) | Damp, Bend, Fetch, **Memory** (segment) |
| `/lab/threejs-test` | `tj` | WebGL 3D | **Accent**, **Finish**, Polish, Spin, Points, Lobes, Sharp |
| `/lab/vocal-orb` | `orb` | WebGL2 + bloom | **Heart**, Rest, View, Flare, Bloom, Speed, Energy, Spread, Size |

### 5.2 Interaction checks

- **polka-dots** — pointer move over the stage changed the rendered pixels (dot repulsion), a click produced a further distinct frame, grid/cell clamp intact.
- **heart** — pointer down added `is-drag` to the root, dragging changed the cloth pixels, release coasted back.
- **dial** — 26 `.dial__item` + 130 `.dial__tick` present; a 620 px wheel rotated the ring and moved the active item; `ArrowDown` advanced the selection; the accent swatch swapped `--dial-accent` to `#105099` and dragged ranges updated the ring.
- **dynamic-scrollbar** — rest thumb 5×64 px; hover morphed it to 50×188 px and raised the clock from `opacity 0` to `1`; wheel moved the track (`translate3d(0,-681px,0)`); the music section revealed its note and the player reported title `D.A.A.S` / artist `Umbrella`; hovering the thumb again restored the resting state.
- **rotating-gallery** — plates drifted between frames; `g` switched to grid (5 columns, plates re-parented into `.rg__slot`) and back to the carousel (`perspective: 4000px`); dragging changed the carousel; the depth slider moved perspective to 1500 px.
- **paste-up** — board label switched `BOARD::INDEX → BOARD::SPREAD → BOARD::STRIP`, the correct `.pu__board` gained `is-on`, spread showed print `p0`, the tab-line indicator resized, and the strip board rendered visibly differently.
- **threejs-test** — `data-ready` set; five subjects and three modes present; subject and mode changes each produced a different frame; orbit drag changed the frame.
- **live-cursors** — with no other client the peer count is 0 (expected). The hint copy switches on the media query exactly as in the original: `pointer: fine` → “Open this page in another tab or on another device :: you'll see each other move.”, coarse pointer → “Others' cursors show up here. Touch has no pointer, so you're here in spirit.”
- **vocal-orb** — WebGL2 context created with `EXT_color_buffer_half_float` (`gl.getError() === 0`). Denied microphone: state `blocked`, label “Microphone blocked”, status “Microphone blocked: allow it in the browser to talk to the orb”. Granted microphone (fake device): state `listening`, label “Stop listening”, `aria-pressed="true"`, status “Listening”; a second press returned to `idle` with “Stopped listening”; “Speak back” toggled to `aria-pressed="true"`.

### 5.3 Tune panel contract

- Every row writes to `localStorage` under `labcfg:<slug>`; a reload re-applies the stored values (verified on `dial`: `dampDrag` 15→6, `accent` `#105099`, value restored, reset affordance present).
- Segments and swatches update `aria-pressed` and re-render live (`threejs-test` Finish → `chrome`; `vocal-orb` Heart → `void`; `rotating-gallery` Morph → `glide`).
- The spring row recomputed its curve from a knob drag (`Damp` 0.18→0.58, stored under `pull`), and easing/spring sliders respond to keyboard (`ArrowRight` → 0.05→0.055) as well as pointer drag.
- No engine threw while a control was exercised; the only console entries were resource 404s for the missing local assets listed below.

### 5.4 Mobile pass — iPhone 390×844, DPR 2, touch

All nine routes mounted (`pd`, `heart`, `lc`, `dial`, `sb`, `rg`, `pu`, `tj`, `orb orb--a`), canvases sized to the stage at 2× DPR, `document.scrollWidth === innerWidth` (no horizontal overflow), the poster overlay fully faded, and the Tune button visible; the panel fitted inside the viewport for every route (rows 2–9, no clipping, no internal scrolling needed).

### 5.5 Reduced motion and navigation lifecycle

- `prefers-reduced-motion: reduce` on polka-dots, dial, heart and rotating-gallery: all mount, **zero** running Web Animations, and the stage transition collapses to `opacity` — the original CSS-driven behaviour.
- `/lab` index unaffected: 36 entries, 9 distinct hrefs, flat/wheel/grid toggles all rotate and keep `aria-pressed` in sync, hover reveals the poster preview, clicking a card lands on its detail route.
- Astro view transitions: `dial` → `data-lab-next` → `polka-dots` left **0** `.dial` nodes and one `pd` root; going back produced **1** `.dial` node and no other engine, i.e. `destroy()` teardown is clean and no double mounts occur.
- Docs drawer: `dial` Notes pane scrolls (thumb 237 px, transform follows scroll), the Code tab holds 55,384 characters; `polka-dots` panes stay empty because its article was never captured (Phase 7 evidence gap).

### 5.6 Non-Lab regression

`/`, `/lab`, `/about`, `/studio`, `/writing`, `/writing/the-personal-starter`, `/changelog`, `/contact` all render with their titles, `h1`s, nav counts and canvases intact, no horizontal overflow and no console errors after scrolling. No Phase 1–7 behaviour changed; the only edit to shared code is the `LabDoc` loader line.

## 6. Remaining gaps (not invented, not faked)

1. **Engine-local assets are absent from the workspace**, exactly as recorded in Phase 7: `/lab/dial-tick.mp3` (dial detent sound), `/lab/music/*.mp3` and `/lab/covers/*.jpg` (dynamic-scrollbar player). They are requested with the original paths and return 404, so the dial is silent and the player artwork/music never resolves. Nothing was substituted.
2. **Remote media unverified.** Lab posters/reels come from `assets.carterogunsola.com`, `threejs-test` loads `Lantern.glb` from `cdn.jsdelivr.net`, and `vocal-orb` fetches transformers/phonemizer/Kokoro/silero from `models.carterogunsola.com`. None of those hosts is reachable from this sandbox; the harness supplied synthetic fixtures so the code paths could run, but their real payloads, timings and visual results are unverified.
3. **`vocal-orb` inference was not exercised end to end.** Microphone permission states were verified, but no speech was fed through the worklet, so transcription, phonemisation and synthesis remain untested.
4. **`threejs-test` model path.** With the CDN blocked the engine logs `[lab] threejs-test model failed` and falls back to its generated geometry — the fallback is the original code path, not a regression.
5. **No real-device or hardware-GPU testing.** Everything above ran on SwiftShader in headless Chromium; frame rate, bloom quality, pointer-hover feel on real hardware remain unverified.
6. **Work is uncommitted.** Phase 8 is staged in the working tree of the session branch only: no commit, push or pull request was made.

## 7. Phase 8 acceptance audit — 2026-10-29

Re-checked after the preview environment was rebuilt (`npm ci`, `npm run build`, `npm run preview` on `0.0.0.0:4321`). No source change was made during the audit.

### 7.1 Patch inventory

Three groups, nothing else:

| Change | Files |
|---|---|
| Modified (2) | `app/lib/runtime.ts` (one loader line), `PHASE_STATUS.md` (Phase 8 section) |
| Added (10) | `app/lib/experiments/{dial,dynamic-scrollbar,heart,live-cursors,paste-up,polka-dots,rotating-gallery,threejs-test,vocal-orb}.js`, `app/lib/lab-experiments.js` |
| Added (1) | `recon/lab/engines.md` |
| Deleted (0) | — |

One deliberate detail a reviewer may notice: the nine engine files end **without** a trailing newline, because the saved `src/` chunks do too and preserving that is what makes the byte-for-byte body comparison exact. Adding one would be the only difference between the recovered body and the workspace copy. `app/lib/lab-experiments.js` and this document do end with a newline.

`git status --porcelain` shows exactly those 13 entries and nothing under `app/pages`, `app/styles`, `app/components`, `app/data`, `app/layouts`, `src/` or `pages/`. `package.json`, `package-lock.json` and `astro.config.mjs` are unmodified, so no dependency or global-chrome change is bundled. Branch is `arena/cfa024d8-carterogunsola-reconstruction` at `2342800`, identical to `origin/main` (Phase 7 merge `23428004e8c142254e394d89be4af412fe2fdbee`); `git merge-base --is-ancestor origin/main HEAD` succeeds.

### 7.2 Reproduction of the fidelity check

Rather than relying on the earlier Prettier comparison, the bodies were re-compared byte-for-byte against `src/<chunk>` by stripping the leading `import …;` statements (brace-depth aware) and any leading `//` comment lines:

| Engine | Body bytes | Result |
|---|---|---|
| dial | 44,690 | identical |
| dynamic-scrollbar | 16,164 | identical |
| heart | 4,262 | identical |
| live-cursors | 4,566 | identical |
| paste-up | 11,855 | identical |
| polka-dots | 4,005 | identical |
| rotating-gallery | 12,133 | identical |
| threejs-test | 35,127 | identical |
| vocal-orb | 84,431 | identical |

Import edits total five specifiers: `mesh` → `../mesh.ts` (eight engines, identical binding names), the Base chunk → `../runtime.ts` (live-cursors), `assets` → `../assets.ts` with `n`→`asset` and `r`→`img`, and the two `three` wrappers relocated to `src/` (threejs-test). vocal-orb has no import change; its only difference is the registry wrapper that injects `captionHost`.

### 7.3 Code-splitting / route scoping

Built HTML references no engine chunk. Observed `/_astro/` requests:

| Route | Engine chunks | `lab-experiments` | `lab-doc` |
|---|---|---|---|
| `/lab` | none | no | no |
| `/` | none | no | no |
| `/lab/polka-dots` | `polka-dots.CV3HS57-.js` | yes | yes |
| `/lab/paste-up` | `paste-up.DG_iL1PA.js` | yes | yes |
| `/lab/vocal-orb` | `vocal-orb.CB2CTSe6.js` | yes | yes |

Exactly one engine chunk per detail route, none on the index or any non-Lab route.

### 7.4 Route re-check (fresh harness)

All nine detail routes: `data-stage-live` set, `data-stage-loading` cleared, correct single root (`pd`, `heart`, `lc`, `dial`, `sb`, `rg`, `pu`, `tj`, `orb`), poster overlay at opacity 0, Tune button visible with the expected row counts (4, 3, 2, 5, 4, 5, 4, 7, 9), and the engine's style element present (`exp-polka-style`, `exp-heart-style`, `exp-cursors-style`, `exp-dial-style`, `exp-scrollbar-style`, `exp-rg-style`, `exp-three-style`, `exp-orb-style`; paste-up intentionally uses `style.dataset.labStyle = "paste-up"`).

Non-Lab: `/lab` 200 (36 items, 9 hrefs, 0 engine roots), and `/`, `/about`, `/studio`, `/writing`, `/contact`, `/changelog`, `/writing/the-personal-starter` all 200 with zero engine roots and no page errors.

### 7.5 Teardown and re-entry

Two full navigation cycles per engine (`detail → /lab → detail`):

| Engine | Roots while away | Engine style while away | Root on return | Duplicates |
|---|---|---|---|---|
| polka-dots, heart, live-cursors, dial, dynamic-scrollbar, rotating-gallery, paste-up, threejs-test | 0 | 0 | 1 | none |
| vocal-orb | 0 | 0 | 1 | none |

Canvas count returned to the 5-canvas shell while away and to 1 engine canvas on return for the four canvas engines (polka-dots, heart, paste-up, threejs-test); no requestAnimationFrame loop is tied to the engine's canvas after leaving beyond the shell's own ticker.

Same-document Astro transitions, which exercise the real `destroy()` path rather than a page reload:

- `polka-dots → dial` (nav "next"): `.pd` 1 → 0, `.dial` 0 → 1, canvases 6 → 5, style element swapped `exp-polka-style` → `exp-dial-style`.
- `vocal-orb → live-cursors`: `.orb` 1 → 0, canvases 6 → 5, engine styles 1 → 0; entering again created exactly one `.orb`.

Source-level confirmation for the heaviest engine: `vocal-orb`'s mount returns `{ destroy }`, and `lab-doc` stores it and invokes it from its Astro cleanup together with the configurator disposer, which is what the transitions above observed.

### 7.6 Reduced motion and mobile — what the run actually shows

- `prefers-reduced-motion: reduce` on polka-dots, dial and rotating-gallery: mounted, `document.getAnimations()` returned **0 total, 0 running**, and the stage transition collapsed to `opacity`. These are measured values from the fresh run, not inferred.
- Mobile 390×844 / DPR 2 / touch on polka-dots, dial, heart and threejs-test: all mounted at stage 356×746 with canvases 712×1492, poster overlay at 0, no horizontal overflow, Tune button present, and the panel (`rows` 4/5/3/7) fits inside the 390 px viewport.
- Harness caveat found during the audit: `page.click('.labd__tune')` can be swallowed by the boot veil, which is what produced a `visibility: hidden` reading in one mobile probe. Re-tested with `element.click()` and a real `touchscreen.tap`: both set `labd is-config`, panel `visibility: visible`, box `[16 … 374]` inside the viewport. The mobile behaviour is correct; the earlier single probe was a test artifact.

### 7.7 What was mocked, and what remains unverified

Mocked by the harness (never part of the build):

| Remote resource | Harness substitution | Effect on conclusions |
|---|---|---|
| `assets.carterogunsola.com` posters/reels | 1×1 transparent PNG | Layout and `<img>`/canvas wiring proven; real artwork unverified |
| `cdn.jsdelivr.net/.../Lantern.glb` | 12-byte header stub | threejs-test logs `[lab] threejs-test model failed` and uses its original procedural fallback; the CDN model path is unverified |
| `models.carterogunsola.com` (transformers, phonemizer, Kokoro, silero) | aborted | vocal-orb renders (WebGL2 + bloom) but no inference path ran |

Local assets that are genuinely absent from the repository — and were therefore **not** created, substituted or redirected — remain exactly as requested by the engine code, confirming no asset was invented:

`/lab/dial-tick.mp3` (HTTP 404 on the dial route, dial is silent), `/lab/music/deep-abstract-ambient_snowcap-401656.mp3`, `/lab/music/embrace-364091.mp3`, `/lab/music/running-night-393139.mp3`, `/lab/covers/embrace.jpg`, `/lab/covers/running-night.jpg`, `/lab/covers/umbrella.jpg` (404 observed on the dynamic-scrollbar route; player metadata still resolves from the data table, artwork does not). The pre-existing `/media/plates/*` 404s on the homepage belong to earlier phases and are unchanged by Phase 8.

Not verified at all: real-GPU frame rates and bloom quality, real pointer/hover feel, actual audio playback, and vocal-orb speech-to-speech end to end.

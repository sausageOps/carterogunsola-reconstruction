# Studio evidence recovery — 2026-10-28 (Phase 4)

## What the live page allowed

The page-fetch tool returned **rendered text only** for `https://carterogunsola.com/studio`
(title `Studio :: Carter Ogunsola`; body text: `Studio`, `Visit Balky Studio`, `balky.studio`,
`Balky Studio`, `We make the web fun again`, plus the shared chrome: command menu groups,
14 notification items, HUD `UT:: / MDT / FPS:: / Booking::Q1’27`, socials, drawer `C` + `Studio`,
veil counter digits). It exposes no DOM, no CSS and no screenshot.

A direct `curl https://carterogunsola.com/studio` from this workspace fails during TLS
(`SSL_ERROR_SYSCALL`), the same environment limitation recorded for Phases 2 and 3.
**No browser inspection of the original occurred**: no Chromium/Firefox binary is installed here and
`libnss3.so` is absent, so headless browser launch is impossible. No browser or library installation
was attempted in this phase.

The rendered text matches the raw HTML already saved in this repository, so the reconstruction was
built from that saved source rather than from the page title or URL.

## Source evidence used (all pre-existing in the repository, unmodified)

| File | Size | Used for |
|---|---|---|
| `pages/studio.html` | 74,283 B | Verbatim `<main class="studio">` markup, all seven `data-lanyard-*` values, the inline `<style>` block (`.stage-ibtn` page variant, `.lstage*`, `.studio__*`), `<head>` meta (description, canonical, `og:image` `/og/section/studio.jpg`, title pattern), absence of a `<footer>` |
| `src/lanyard.GSKzBzbt.js` | 24,885 B | The whole Studio engine (badge geometry, canvas faces, Verlet strap, drag/tilt/idle, arrival, theme observer, tune + debug panels, disposal) |
| `src/studio-env.ExNDzFhz.js` | 591 B | Procedural 1024×512 equirect studio environment → PMREM |
| `src/mesh-wire.CQ-5TR8b.js` | 429 B | `?mesh` wireframe helper used by the engine |
| `src/gl-warm.Cs1frxOX.js` | 311 B | Shader pre-compile / veil hold (already adapted in Phase 2 as `app/lib/wheels-gl-warm.js`) |
| `src/three.module.DBbmgHoE.js` | 599,085 B | three.js bundle; all 27 specifiers the engine imports were checked to exist in its export list |
| `src/Base.js` | 139,816 B | The original route-engine registry entry: `{name:'Lanyard', when:'[data-lanyard]', routes:/^\/studio\/?$/, load:()=>import('./lanyard…').then(e=>()=>e.Lanyard.init())}` |
| `RECONSTRUCTION_MASTER.md` §7, `ROUTE_INVENTORY.md` row 15, `INTERACTION_MAP.md` §H, `PHASE_PLAN.md` Phase 4 | — | Cross-checks of structure, content and interactions |

## Facts taken from that evidence

- **Structure:** `<main class="studio">` → `<h1 class="u-sr-only">Studio</h1>` → `section.lstage[data-lanyard][hidden][tabindex=0][role=group]`
  (aria-label “Balky Studio’s badge. Drag to swing it.”) containing `canvas.lstage__canvas[data-lanyard-canvas]`
  and `.lstage__info` → then the `div.studio__classic.container[data-lanyard-classic]` fallback. No footer, no other sections.
- **Badge copy (data attributes):** name `Carter Ogunsola`, role `Founder & Creative Developer`, studio `Balky Studio`,
  line `We make the web fun again`, addr `BALKY.STUDIO`, place `Utah, USA`, year `2026`.
- **Infotip:** an `<a class="stage-ibtn infotip__btn" href="https://www.balky.studio/" target="_blank" rel="noopener noreferrer"
  aria-label="Visit Balky Studio" aria-describedby="studio-tip" data-hover>` with a `circle-info` glyph, tip `#studio-tip[role=tooltip]`
  reading `balky.studio` in `<p class="infotip__title text-label">` plus an `arrow-up-right` glyph, `data-place="top"`.
- **Classic fallback:** tile (`clamp(9rem,20vw,11.25rem)`, `border-radius:22.4%`, `background:var(--mono-900)`) holding the
  Balky flag SVG (`viewBox="0 -5 43 47"`, mask id `balky-flag-mask-studio`), then `Balky Studio` in `.studio__name.text-h6`
  with a `.linkcircle` (diagonal glyph, **no** `arrow-roll--diagonal` modifier — true of every `.linkcircle` in all 11 saved pages),
  then `.studio__meta.text-meta` “We make the web fun again”.
- **Engine behaviour:** pointer drag grabs the badge (raycast against an invisible hit plane), release keeps a share of the
  velocity (`throw`), a short click under 6 px of travel flips the card, the pointer sphere brushes the strap while hovering,
  idle “breeze” plus a jittered “puff” every ~8 s, `devicemotion` tilt/shake on coarse pointers (iOS permission requested on
  first touch release), fixed 1/120 s solver steps with a catch-up cap, `veil:reveal`-gated hook descent (`lift` → `lower`,
  `expo.out`), `data-theme` observer recolouring the card stock, `ResizeObserver` re-fit, mobile branch
  `(max-width: 47.99rem), (pointer: coarse)` halving the shadow map to 1024, `?tune=lanyard` panel (8 groups, 26 rows),
  `?debug=lanyard` overlay, full disposal through the shared `onCleanup`.
- **Fallbacks:** `prefers-reduced-motion: reduce` returns before any WebGL work, so `.lstage` stays `hidden` and the classic
  tile stays visible; a failed `WebGLRenderer` construction returns `null` and leaves the same state.

## Gaps — not fabricated, not approximated

1. No rendered screenshot or computed style of the original was obtainable, so pixel geometry, the badge’s lighting/exposure and
   the swing feel are reproduced from source values only, never visually compared.
2. `Oracle` and `PP Neue Montreal Mono` are not in the workspace (no fonts were downloaded). The engine draws the badge faces with
   `"Oracle", "Geist Variable", system-ui, sans-serif` and `"PP Neue Montreal Mono", "Geist Mono Variable", ui-monospace, monospace`,
   so canvas type will fall back to the local/system stack, and the original `<link rel="preload" as="font">` is absent.
3. `/og/section/studio.jpg` is referenced remotely (unchanged from Phase 1 behaviour); its availability is unverified from here.
4. The WebGL-mounted path (stage unhidden, badge rendered and swinging) could not be executed: no GPU/WebGL context exists in this
   sandbox. It is verified by source contract (`this.h && (stage.hidden = false, classic.hidden = true)`) and by the two fallback
   paths that were executed.
5. `pages/studio.html` is a saved snapshot; it was not re-fetched as raw HTML in this phase (TLS blocked), so any change made to the
   live page after the snapshot was taken would not be reflected.

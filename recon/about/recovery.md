# Phase 6 — About recovery note

- Route: `/about`
- Reconstructed: 2026-10-28
- Evidence: saved original HTML/CSS/JS in this repository; evidence files were not modified.

This note distinguishes source-backed recovery from checks that could actually run here. No copy,
asset, interaction, or responsive state was invented.

## 1. Evidence used

| Evidence | Size | What it establishes |
|---|---:|---|
| `pages/about.html` | 143,261 B | Complete original document, metadata/JSON-LD, `main.ov3`, all copy and links, inline SVG, the portrait references, and the three sibling dialogs. |
| `src/about.CYiwxt8A.css` | 28,054 B | Original `.ov3*` board/dialog and `.con*` console styles, responsive rules, keyframes, themes through shared tokens, and reduced-motion contexts. |
| `src/Frank.CeeoI0Md.css` | 6,833 B | Original `.frank*` portrait/card and `.rec*` experience-record styles. |
| `src/canvas.D0rBfPBj.js` | 13,288 B | Current About board engine: desktop composition, pointer/focus/keyboard behavior, scrim and exit, reduced-motion/static handling, cleanup. |
| `src/deck.DbC3PTPJ.js` | 16,458 B | Current desktop WebGL radio deck and its connection to console state. |
| `src/frank-card.BYMmn-HQ.js` | 9,779 B | Desktop WebGL frank card plus the native-dialog owner used at every viewport. |
| `src/console.xeJmjuZO.js` | 8,792 B | Radio state, `/api/radio` polling, track/art/progress rendering, explicit mock/failure query modes. |
| `src/Base.js` | 139,816 B | Original dynamic-engine registry and the already-shared About telemetry, Record, Marks, Tilt, SignatureFx and NowPlaying mounts. |
| `src/mesh.DnpBQ695.js`, `src/three.module.DBbmgHoE.js`, `src/mesh-wire.CQ-5TR8b.js`, `src/studio-env.ExNDzFhz.js`, `src/css3d.DQxlWk7_.js`, `src/gl-warm.Cs1frxOX.js` | — | Import/export and dependency mapping for the four engines. Existing recovered counterparts were reused. |

`src/about-artifacts.DOeGaaTw.js` and `src/about-radio.UTJqP0B8.js` were inspected and **excluded**:
their registry entries target `/about-old`, and their selectors are absent from the current About
markup. They are not substitutes for the four current engines.

## 2. Recovered document and metadata

`app/pages/about.astro` replaces the Phase 1 verification shell and retains the original page-scope
attributes needed by the recovered CSS.

- `main.ov3[data-canvas]` contains the screen-reader `h1`, hidden front-office ticket and the board.
- The three `data-canvas-item` sections are the frank hero, telemetry card and radio/deck card.
- The frank card contains the original stamp SVG/portrait, record and on-file imprint buttons,
  socials, the letter trigger, marks/tilt hooks and signature details.
- Telemetry retains `data-about`, the scope button, local/position/online/commit fields and **154**
  commit cells.
- The radio retains `data-console`, `data-deck-gl`, all labels, EQ bars, progress/time/art hooks and
  its initial non-live copy.
- The hidden LOS→SGU tag, hidden canvas exit (`Put it back`) and adjacent-file tabs to `/writing`
  and `/lab` are present. There is no invented footer; the original has none.
- Exactly three native dialogs follow `main`: `letter`, `record`, and `onfile`. Their labels, scroll
  containers, close controls and ARIA relationships remain. The record has eight experience rows;
  Awards and Featured in each have nine source rows and their original external URLs.

The shared `Socials`, `Button`, `CloseBox`, and `Signature` atoms render these repeated controls;
no page-specific copies of those components were created. Generated component-only Astro scope
attributes are not artificially recreated. Their shared styles already exist in `global.scss`.
The original Signature root's lack of the About CID is preserved rather than “correcting” the
original scoped `.ov3__sig` rule.

Metadata checks against the original document are exact for:

- title: `About :: Carter Ogunsola`;
- description: `Carter Ogunsola is a creative developer and brand engineer. Lead web dev at Strive, founder of Balky Studio. Lagos-born, Utah-based, making the web fun again.`;
- canonical and `og:url`: `https://carterogunsola.com/about`;
- OG image: `https://carterogunsola.com/og/section/about.jpg`;
- the complete `ProfilePage` JSON-LD graph.

`BaseLayout` gained optional `canonical` and `jsonLd` overrides and an empty-by-default `afterMain`
slot. Existing routes retain their prior defaults. The slot is required because the dialogs are
siblings of `main`, not descendants of `.ov3`.

## 3. CSS and responsive/motion recovery

`app/styles/about.css` is the Frank sheet followed by the About/console sheet, matching the original
cascade order. Rules, declarations, keyframes and conditional contexts are verbatim. Keeping the
original CIDs scopes the styles to this page and covers both the board and sibling dialogs; no broad
`.ov3`-only descendant rewrite was used.

Programmatic PostCSS comparison found **217/217 selectors** in the original, local source and built
CSS, with the same nine media contexts. Only keyframe-step rules lack a CID selector. The media
contexts are:

```text
(hover:hover) and (pointer:fine)
(width<=40rem)
(prefers-reduced-motion:reduce)
(prefers-reduced-motion:no-preference)
(width<=63.99rem)
(width<=63.99rem) and (prefers-reduced-motion:no-preference)
(width>=64rem)
(hover:hover)
(width>=82rem)
```

The JS adds the source's `(min-width: 64rem)` desktop WebGL gates and reduced-motion/fine-pointer
behavior. Dialog behavior is not gated behind WebGL or desktop width.

## 4. Runtime and interaction map

The four ported files are `app/lib/canvas.js`, `deck.js`, `frank-card.js`, and `console.js`.
After the import block, every module body is byte-identical to its evidence file. Only import
specifiers were repointed to the existing shared runtime, recovered Three.js bundle and existing
helpers. `node --check` passed for all four, and the production build emitted all four chunks.

The registry entries in `app/lib/runtime.ts` match `src/Base.js` in name, selector, route regex and
order:

| Engine | Hook | Route | Source-backed responsibility |
|---|---|---|---|
| `Canvas` | `[data-canvas]` | `/^\/about\/?$/` | Board drag/focus/keyboard states, scrim/exit, arrival and reduced-motion/static behavior. |
| `Deck` | `[data-deck-gl]` | `/^\/about\/?$/` | Desktop WebGL deck, resize/lifecycle, console-driven visual state. |
| `FrankCard` | `[data-frank-stage]` | `/^\/about\/?$/` | Desktop card scene; all-viewport dialog open/close/cancel/backdrop/focus restoration and enter/leave behavior. |
| `Console` | `[data-console]` | `/^\/about\/?$/` | Radio polling and track/artist/art/time/progress/state updates. |

Existing shared mounts continue to own telemetry (`data-about`), the record row effect, Marks,
Tilt, SignatureFx and NowPlaying. No second runtime or duplicate global shell was introduced.

Normal radio operation requests `/api/radio` every 45 seconds. Original demo data is used only with
`?radio=mock`; `?radio=fail` selects the original unreachable test endpoint. The implementation does
not silently present mock data as live.

## 5. Checks actually run

- `npm ci --no-audit --no-fund` installed the existing lockfile dependencies only; package manifests
  were not changed. An initial build attempt before installation failed with `astro: not found`.
- `npm run build` **passed** on the final implementation: 9 static pages. Vite emitted the existing
  unused-import and large-chunk warnings.
- Production preview returned **200 without redirects** for `/about` and `/about/`.
- Regression requests returned **200** for `/`, `/contact`, `/studio`, `/writing`,
  `/writing/the-personal-starter`, `/lab`, and `/lab/dial`.
- Every one of the **23 emitted CSS/JS assets** returned 200. All local assets directly referenced
  by About also returned 200. The two original portrait URLs are remote and are listed under gaps.
- All eight unique root-relative anchors in the full About document returned 200; content links to
  `/writing` and `/lab` were included.
- Rendered original-vs-rebuilt `main + dialogs` comparison: **747/747 elements**, **626/626 class
  tokens**, **140/140 normalized text chunks**, and **27/27 links** match. Dialog hooks/counts,
  metadata, the 154 commit cells and accessibility hooks match. Expected shared-foundation deltas
  are `id="main"`, `type="button"` on the About trigger, and generated component-only CID
  serialization; no content, class, link or behavior hook is missing.
- `git diff --check` passed on the final patch.

These are source, build, HTTP and static-DOM checks—not browser interaction or visual tests.

## 6. Gaps and limitations

1. **Portrait media is absent locally.** Neither
   `carter-stamp.BRpWjIXQ_4vkhB.webp` nor the 560-wide `ZH60A1` variant exists in the workspace.
   The markup points to those exact files on `https://carterogunsola.com` rather than substituting
   invented imagery or guaranteeing a broken relative URL. Exact-image search found no match;
   direct origin access fails with `SSL_ERROR_SYSCALL`, and the page-fetch probe returned HTTP 500.
   Remote availability and appearance remain unverified.
2. **Radio service/art.** The static preview has no `/api/radio` service (404), so live radio data
   cannot be verified here. The original explicit `?radio=mock` branch also references
   `/og-default.png`, which is not present locally; it was not replaced or fabricated. Normal mode
   does not use that mock art.
3. **Other remote assets/data.** `/og/section/about.jpg` remains an original remote reference and
   is unverified. GitHub-backed telemetry/network behavior was not executed. No realtime/backend
   work was added in this phase.
4. **Fonts.** Original proprietary font binaries remain absent; existing local/system fallbacks
   therefore do not prove original text metrics or canvas lettering.
5. **No visual or real-browser interaction verification.** No Chromium/Firefox executable or
   required NSS libraries are available. Desktop/tablet/mobile rendering, native dialog focus and
   scrolling, keyboard/pointer/touch dragging, WebGL scenes, theme changes, reduced-motion rendering,
   client-side navigation, browser console and network behavior were not observed. They are mapped
   from the recovered source only and still require a browser/GPU pass.
6. **Inherited shared head/chrome.** Phase 1 theme, favicon, robots, feed and chrome behavior stays
   shared and unchanged. About-specific title, description, canonical/OG URL, OG image and JSON-LD
   were checked exactly as listed above.

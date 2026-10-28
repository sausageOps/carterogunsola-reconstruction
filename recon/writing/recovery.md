# Phase 5 — Writing recovery note

Routes: `/writing` (index) and `/writing/the-personal-starter` (post)
Reconstructed: 2026-10-28 · Evidence: saved page HTML + saved source chunks (read-only)

This note records exactly which evidence was used, what it proves, and what is missing. Nothing in
the two routes was invented: every string, id, date, credit, code block and SVG path below comes
from the saved evidence files listed here.

---

## 1. Evidence used

### Page HTML (the source of truth for markup, copy, metadata)

| File | Size | What was taken |
|---|---|---|
| `pages/writing.html` | 76,160 B | Full document. `<main class="writing">` = the shelf stage + classic index. `<head>` = title, description, canonical, OG/Twitter, JSON-LD. |
| `pages/writing_the-personal-starter.html` | 103,278 B | Full document. `<body>` starts at 17,521; `<main class="wpost container" data-writing-post data-folders-slug…>` runs 26,537–58,338. `<head>` 102–17,514. |

Both pages were sliced and tokenised (start tag + attributes + text, whitespace-normalised) and the
resulting token stream of the built `<main>` was diffed against the original. See §4.

### Page CSS

| File | Bytes | Rules | Destination |
|---|---|---|---|
| `src/writing.C1dRexZC.css` | 4,803 | 32 (5 `@media`) | `app/styles/writing.css` |
| `src/_slug_.BZeeZM_C.css` | 13,960 | 90 (6 `@media`) | `app/styles/writing-post.css` |

Both sheets are Astro-scoped (`.wstage[data-astro-cid-…]`). They were transformed mechanically:
strip the `[data-astro-cid-…]` attributes, then prefix every selector with the route root
(`.writing` / `.wpost`) so the recovered cascade stays on its own page. Declarations, order and
conditional contexts are **verbatim** — see §4 for the rule-by-rule check.

### Page/engine JavaScript

| File | Bytes | Ported to | Change |
|---|---|---|---|
| `src/folders.HEy6JhQA.js` | 49,441 | `app/lib/folders.js` | imports only |
| `src/folders-flight.BWHyG9ew.js` | 5,209 | `app/lib/folders-flight.js` | imports only |
| `src/writing-post.CB6dnry2.js` | 2,249 | `app/lib/writing-post.js` | imports only |
| `src/css3d.DQxlWk7_.js` | 2,384 | `app/lib/css3d.js` | imports only |
| `src/BufferGeometryUtils.DWdZA4ij.js` | 4,770 | `app/lib/buffer-geometry-utils.js` | imports only |

Body text after the import block is byte-identical (`' '.join(split())` comparison) for all five.
Import specifiers were repointed at the shared Phase 1 runtime (`./mesh.ts`, `./prefetch`,
`astro:transitions/client` for the original Astro client module, the recovered
`src/three.module.DBbmgHoE.js`, `mesh-wire.js`, `studio-env.js`, `wheels-gl-warm.js`) and the two
new helper chunks. All 41 named three.js imports resolve against the 97 exports of the recovered
bundle (checked programmatically; zero missing).

The runtime registry entries are copied from `src/Base.js` (same `when` selectors, same route
regexes, same order, same `sticky` flag). The original file lives in the page fragment
`data-folders-data` JSON (below).

### Supporting evidence

- `src/Base.js` — global lifecycle registry (`Fr`), including the `Folders` / `WritingPost` entries
  and the `Pr`/`Fl` first-run flags; the shared chrome.
- `src/Base.css`, `src/ec.2v5bd.css` — already folded into `app/styles/global.scss` in Phase 1
  (`.closebox*`, `.signature*`, `.refrow*`, `.chip*`, `.section-label*`, `.row*`, `.expressive-code*`).
- Inline `<style>` blocks in `pages/writing_the-personal-starter.html` (5 blocks: veil 69 B, lenis
  457 B, signature + refrow 2,297 B, closebox 1,287 B, view transition 796 B). A selector-level
  diff shows **every** rule in them already exists in `global.scss` (or is an Astro-generated
  `::view-transition-*` scope rule that this build regenerates), so no page-local copy was made.
- `pages/writing.html` inline blocks (4, incl. a 2,550 B chart/row block) — same result: no
  uncovered selectors.
- `src/prefetch.BhDfpIsL.js`, `src/client.dBBHJp23.js`, `src/gl-warm.Cs1frxOX.js`,
  `src/mesh.DnpBQ695.js` — verified during import mapping only.

---

## 2. What the evidence fixes, exactly

### `/writing`

- `main.writing` → `section.wstage[data-folders][hidden][tabindex=0][role=group]` with the original
  `aria-roledescription="carousel"` and the original `aria-label`; the stage is `hidden` until the
  engine mounts, so the classic index is what a no-JS/reduced-motion visitor sees.
- `.wstage__ui.container > .wstage__info`: info anchor (`data-folders-title`, `href="/writing"`,
  `aria-describedby="wstage-tip wstage-excerpt"`, `circle-info` icon), `#wstage-tip[role=tooltip]`
  with `[data-folders-tip-title]` and the three chips (`data-folders-chip-date|year|cat`), and the
  screen-reader `#wstage-excerpt[data-folders-excerpt]`. Selector names are load-bearing: the
  recovered engine queries them by these exact attribute names.
- `script[type=application/json][data-folders-data]` — the verbatim payload (1 record).
- `.writing__classic[data-folders-classic] > .writing__col`: `.writing__intro` (h1 “Writing” +
  `section-label__mark ::` + 3 lead paragraphs), `.writing__archive[data-index-reco]`
  (`2026` label, 6 tabs All/web/design/motion/tools/life, `.writing__card[data-index-rows]` with
  one `a.row.row--link[data-cat=web]`, and the empty state “Nothing filed here yet”).
- The six tabs drive the shared `IndexReco` mount, which is already in the Phase 1 runtime — no new
  engine was written for the filters.

### `/writing/the-personal-starter`

- `main.wpost.container[data-writing-post][data-folders-slug="the-personal-starter"]`, JSON folder
  payload first, then `.wpost__rail[data-flight-wait] > nav.toc.is-open[data-toc]` (14.6875 rem,
  sticky 7 rem), ring `r=5.5` with `stroke-dasharray="34.558"`, toggle with
  `aria-controls="toc-list"`, 7 `a.toc__item[data-toc-item]` with the first `data-toc-active` and
  the moving `.toc__item-bg[data-toc-bg]`.
- `.wpost__close > CloseBox` (`closebox closebox--md closebox--fill`, `data-flight-wait`) → `/writing`.
- `article.wpost__col[data-flight-paper]`: `.wpost__claim[data-sheet-claim]`, masthead
  (`Carter Ogunsola` + `N°01`), date row `:: Sep, 16, 2026`, `h1`, TL;DR block, prose with the seven
  `<h2 id>` sections, 2 ExpressiveCode blocks, 6 credits, signoff + `Signature`.
- Copy is byte-for-byte from the page: 17 prose paragraphs, 1 `<ul>` of 6 `<li>`, 6 inline links,
  4 inline `<code>` spans, 2 code figures, and 6 credit targets.

### Data extracted

`app/data/writing.ts` holds `FOLDERS` (the original JSON payload), `ROW_TAGS`, `WRITING_INDEX`
(title/description/OG path, 3 intro paragraphs, archive label, filter list, empty-state string),
`POST` (page title, description, OG image, `N°01`, masthead, date, TL;DR) and `TOC` / `CREDITS`
(ids, labels, hrefs read from the built page). `app/data/writing-code.ts` holds the two code blocks
verbatim, including `--ecIndent` 2ch / 4ch and `--ecMaxLine` 57ch / 31ch, `data-language`
`ts` / `json`, and the `\u007f`-joined copy payload used by the original copy button.

---

## 3. Gaps and decisions taken

1. **Folder cover art is not an image.** `folders.js` draws covers procedurally (`drawCover`,
   `family`, `COVER_SPECIES`) onto a canvas from the `tone`/`stock`/`num` fields of the JSON. The
   payload has `tone: null`, `stock: null`, so the default palette is used — this is the original
   behaviour, not a substitution.
2. **`excerpt` in the folder JSON is truncated in the evidence.** It is exactly 1,100 characters,
   ending mid-sentence (“…in the lens ”). It is reproduced verbatim, because “repairing” it would
   invent copy. It is only exposed through `#wstage-excerpt` (screen-reader text).
3. **`closebox--md` / `closebox--fill` have no rules anywhere** in `Base.css`, the page inline
   blocks, or the recovered sheets. They are inert class names in the original too; the base
   `.closebox` rules (present in `global.scss`) carry all the styling.
4. **Inline `<symbol>` definitions → shared sprite.** The original repeats a `<symbol>` inside each
   inline `<svg>`; this build uses the Phase 1 persistent sprite (`SvgSymbols.astro`, now 13
   symbols, +`chevron-right`, +`globe`). Rendered geometry is identical.
5. **ExpressiveCode assets.** The original page injects `ec.2v5bd.css` + `ec.0vx5m.js` per code
   block. This build keeps the Phase 1 equivalent: the recovered `ec` CSS lives in
   `global.scss`, and `app/lib/expressive-code.ts` already mounts the copy button and decodes the
   `\u007f` payload. The block markup (`figure.frame > pre[data-language] > code > .ec-line >
   .code`, `--ecIndent`, `--ecMaxLine`, `data-code`, `data-copied`) is byte-identical.
6. **`data-hover` value.** The original writes `data-hover="true"`; the shared `Row`/`RefRow`
   components emit a bare `data-hover`. `global.scss` matches on `[data-hover]` presence and no
   script reads the value, so the rendered behaviour is identical.
7. **`id="main"`** is added to `<main>` by `BaseLayout` (skip-link target); the original has no id
   there. It is the only structural addition, and it is shared by every reconstructed route.
8. **`<button type="button">`** on the two code-copy buttons — the original omits `type`. No form
   ancestor exists, so behaviour is unchanged.
9. **Head-level deltas inherited from the Phase 1 foundation** (not Writing-specific): canonical and
   `og:url` carry a trailing slash (`/writing/`) where the original has none; a `robots` meta and a
   `WebSite` JSON-LD graph are emitted where the original emits a `Person` graph; favicon/Apple
   touch icon point at `/favicon.svg`. These are identical on `/`, `/contact` and `/studio`, and are
   deliberately not changed here.
10. **Fonts.** `Oracle` and `PP Neue Montreal Mono` were never downloaded (no font binaries exist in
    the workspace), so `@font-face` resolves to `local()`/system fallbacks on every route. Text
    metrics on the post (line length, `--ecMaxLine` wrap points) will therefore differ slightly from
    the production site. Unchanged from Phases 1–4.
11. **No OG image files.** `/og/section/writing.jpg` and `/og/writing/the-personal-starter.jpg` are
    referenced exactly as in the original, but the files are not in the workspace (remote origin
    only). Their availability is unverified.
12. **`html{--toast-lift:4.25rem}`** in the post sheet is kept inside its `width<=79.99rem`
    block, exactly where the original put it. Page stylesheets survive Astro client-side
    navigation, so it stays applied after leaving the post until a full reload — the same
    behaviour the original page CSS had.
13. **WebGL path is contract-verified only.** No GPU/WebGL context and no browser exist in this
    sandbox (see `PHASE_STATUS.md`), so the shelf, the folder flight, the procedural covers and the
    tooltip pose were verified by reading the recovered engine against the recovered markup, not by
    observation.

---

## 4. Fidelity checks run against the original evidence

- **Markup.** Whitespace-normalised token diff of the built `<main>` vs the original `<main>`:
  index 125 → 121 tokens, post 675 → 671. Remaining hunks are exactly the benign items in §3
  (`id="main"`, hoisted `<symbol>`s, `type="button"`, bare `data-hover`, `<path></path>` vs
  self-closing `<path/>`). No missing/extra element, attribute, class or string.
- **CSS.** Rule-by-rule comparison of the recovered sheets against `app/styles/*.css` after
  de-scoping: 32/32 and 90/90 rules present in the same order, **0 declaration mismatches**, all
  `@media` contexts preserved (5 and 6).
- **JavaScript.** Five ported modules: body identical; import blocks rewritten. Registry entries
  match `src/Base.js` verbatim.
- **Chrome.** Marker counts in the original vs built page are equal for header, navpill, command
  menu, notifications, drawer, overlay, veil, progress bar and toaster; neither page has a footer in
  the original, and neither has one here.
- **DOM simulation** (jsdom, built bundles): TOC toggle/ARIA/ring/scrollspy/click-offset and the six
  filter tabs (row show/hide, `aria-selected`, empty state) all behave as the recovered source
  specifies. Details in `PHASE_STATUS.md`.

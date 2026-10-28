# Homepage wheel integration contract — investigation, 2026-10-28

This is an analysis of saved source and prior reconnaissance, not recovered original HTML or CSS. No homepage implementation was changed in this investigation.

## Recovery and limits

No installed Chromium, Chrome, Firefox, Playwright or Puppeteer was found in the workspace's usual executable/package locations. The available live preview is for the local application, not an inspection tool for the external original. Direct `curl -vL https://carterogunsola.com/` reached the host but failed at TLS with `SSL_ERROR_SYSCALL`; the page-fetch tool returned Markdown-rendered text, not document source, computed CSS, screenshots, or stylesheet URLs. No original homepage raw HTML or `.hv2` CSS was recovered. The fetched text confirms the initial Clay/Helion labels and the 17-item Selected work list, but is not proof of spatial layout or interaction.

The full available Git history and workspace were searched in the previous recovery investigation. The homepage HTML, homepage-specific CSS, and uploaded ZIP were not present there. `src/index.Bj6efvgI.css` is lab-related, not the homepage stylesheet. Existing `src/wheels.BZ7Tz2K5.js`, `wheels-data.json`, and `recon/homepage/recovery.md` remain untouched.

## Engine's observed DOM contract

The following is a selector/containment contract derived from source, **not the original HTML tree**:

- `document.querySelector('[data-wheels]')` is the stage. It must have measurable width/height for layout and be keyboard focusable for stage keyboard navigation. The engine inserts a canvas as its first child, sets it to absolute inset 0, and sets stage cursor and CSS custom properties. Reconnaissance describes the original as initially hidden, `role=group`, `aria-roledescription=carousel`, and `data-lenis-prevent`; confirm actual attributes from source HTML before treating those as recovered markup.
- `[data-wheels-classic]` is queried globally. After valid data and WebGL initialization the engine reveals the stage and hides this fallback; on WebGL context loss it restores the fallback. Reduced motion or renderer creation failure exits before switching. Missing or empty JSON also exits; malformed JSON throws. Initialization needs defensive cleanup when adapting, since the renderer is created before JSON validation.
- `[data-wheels-data]` is queried globally and parsed as nonempty JSON array. See `wheels-data.json` for exact project records and order.
- Stage descendants: `[data-wheels-hint]`, `[data-wheels-center]`, `[data-wheels-announce]`, `.hv2__wlabel--l`, `.hv2__wlabel--r`; `[data-wheels-line="eyebrow"]`, `"title"`, `"chips"`, `"cta"`. For a given line to participate it must contain exactly **two** `[data-drum]` descendants. Each chips copy contains `[data-chip-collab]` and `[data-chip-year]`; each CTA copy contains `[data-cta]`. Pointer handling excludes targets under `.hv2__ctarow`.
- Text animation generates `.hv2__word` and `.hv2__ch` with two child spans per character, plus a screen-reader-only text copy. It sets `--fit` and `--r`, per-drum transforms, `inert` and `aria-hidden`. Stage layout sets `--nip`, `--nip-w`, `--open`, `--open-dx`, `--open-dy`, `data-state`, `.is-stacked` and `.is-open`. CSS for all of these remains unverified/missing. The engine switches to stacked at camera aspect ratio below 1.2, and references `header` height and `[data-header] .header__bar` geometry.
- The engine announces project name, collaboration, year and position. Stage arrow keys advance; Enter opens the active press check; Escape closes it. Pointer clicks can select/open a sheet; drag, touch and wheel update shared wheel position. These are source observations, not browser verification.

## Imports, lifecycle and effects

Direct static imports: `mesh.DnpBQ695.js`, `three.module.DBbmgHoE.js`, `gl-warm.Cs1frxOX.js`, `RoomEnvironment.CsPbsEjR.js` (all saved), and `Base.astro_astro_type_script_index_0_lang.BR2GwRUH.js` (missing under that filename). `gl-warm` imports mesh; RoomEnvironment imports Three.js. Shader strings and tuning schema are embedded in the wheel file. Optional `debug=wheels` dynamically imports missing `wheels-lab.BC1G2FRG.js`; this debug-only module was readable as converted text via page-fetch, not saved as raw source.

`src/Base.js` contains the corresponding `n` export, Vite's preload helper, but **must not be imported as a drop-in**: its top-level code can run analytics and wires the original global application, and it imports the saved original mesh. Using both saved mesh and `app/lib/mesh.ts` would create separate GSAP/cleanup/veil state. The smallest prospective adaptation is to remove/replace the debug-only preload call or isolate a pure preload helper; redirect wheel and gl-warm mesh imports to the existing Phase 1 mesh exports, then use the existing `app/lib/runtime.ts` page-engine mount and `app/lib/mesh.ts` cleanup registry. This is a proposed integration approach, not tested code.

Original Base's module registry loads Wheels when `[data-wheels]` exists. Wheel registers cleanup through mesh export `i`: abort listeners, remove ticker, disconnect theme observer, dispose textures/materials/renderer and remove canvas. The Phase 1 runtime invokes its cleanup registry on `astro:before-swap`. Wheel also waits for `veil:reveal` when the shared veil is active, holds texture warmup, observes `data-theme`, and uses shared ticker. Confirm shared object identity and single registration across client navigation when implementing.

## Media contract

The complete exact per-project paths are centrally preserved in `wheels-data.json`: 17 projects, each with two `hand` URLs on `https://assets.carterogunsola.com/`, one depth URL there, and a root-relative `/media/plates/` logo; six have remote reel URLs. Engine constructs no alternative project asset URLs. It loads the first hand (`et(..., 0)`), corresponding first depth, then optionally muted inline video during press check; subject/hero alternatives remain in the data. It uses anonymous cross-origin image/video texture requests. Its logo helper uses an `Image` without setting `crossOrigin`, then reads it with canvas `getImageData`; moving those root-relative logos to a different origin requires appropriate CORS and a corresponding code adjustment. The local plate files are absent; missing logos use the recorded monogram. Original media response availability, CORS, and video playback are untested; do not infer permission to redistribute or download bulk media.

## Confidence and next evidence

The data, selectors, embedded wheel physics/shaders, event code, and fallback rules are directly inspectable. The original element nesting beyond those selector relationships, all homepage `.hv2` styling, typography/spacing, initial attribute details, actual wheel placement, computed styles and breakpoint behavior remain unknown. The source initializes at index 0; its eyebrow writer uses array length minus one, whereas fetched initial text says `N°01 / 17` and `N°02 / 17`; investigate with a real browser rather than resolving by assumption.

Next: obtain original raw homepage HTML (including inline style blocks and linked stylesheet URLs), relevant CSS responses, and desktop/mobile screenshots from a browser/network export able to access the site. Then integrate the saved engine via the existing runtime and verify layout, media, cleanup and interactions against that evidence. Until then, faithful visual integration cannot be asserted and the existing classic fallback remains temporary.

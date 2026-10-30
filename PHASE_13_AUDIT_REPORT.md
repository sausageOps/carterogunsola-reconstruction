# PHASE 13 AUDIT REPORT — Final Website Fidelity & Synchronization

**Subject:** Carter Ogunsola site reconstruction (`/home/user/carterogunsola-reconstruction`)
**Reference (source of truth):** `https://carterogunsola.com/`
**Branch:** `arena/f30b75b6-carterogunsola-reconstruction` (based on `b2b72f4`, the Phase 12 merge)
**Audit date:** 2026-10-30
**Build under test:** `npm run build` → 19 pages, 5.9 s, zero errors; served at `http://0.0.0.0:4321`
**Working-tree state:** changes applied but **not committed** (per standing instruction)

---

## 0. Method, and what "verified" means here

Three independent comparison channels were used, because no single one is sufficient:

| Channel | What it proves | Tool |
| --- | --- | --- |
| Saved original HTML (`recon/homepage/homepage.html`, `pages/*.html`) vs built HTML (`dist/**/index.html`) | Markup, attributes, text, ordering, JSON-LD | `treediff.py`, `headcmp.py`, `textdiff.py` (session tooling) |
| Saved original CSS/JS chunks (`src/*.css`, `src/*.js`) vs local sources | Behavioural parity of ported engines | direct source diffing |
| Headless Chromium at three viewports | Rendering, layout, interaction, console/network health | Playwright + Chromium (`/tmp/br`), software GL |

**Important honesty constraint:** the sandbox cannot open `https://carterogunsola.com/` in a browser (outbound TLS to non-allowlisted hosts is blocked, and the site's own asset hosts `assets.carterogunsola.com` / `models.carterogunsola.com` / jsDelivr are unreachable). Therefore every comparison is **reconstruction vs. saved original evidence** (the DOM/CSS/JS captured in earlier phases), not live-vs-live. Live-vs-live pixel diffing is listed as unverifiable in §12.

---

## 1. Complete original route inventory

Discovered from the original navigation, internal links, `sitemap`, feeds and saved page sources — **not** from the current reconstruction alone.

### 1.1 HTML routes (18 + the 404 document)

| # | Route | Source of evidence | Notes |
| --- | --- | --- | --- |
| 1 | `/` | `recon/homepage/homepage.html` | 17 selected-work rows, wheels stage, "What's new" strip |
| 2 | `/about` | `pages/about.html` | ov3 board, Frank card, radio, stack |
| 3 | `/lab` | `pages/lab.html` | 9 experiments, LIST/WHEEL/GRID modes |
| 4 | `/lab/live-cursors` | `pages/lab.html` links, `src/lab-doc.*` | experiment 01 |
| 5 | `/lab/dial` | `pages/lab_dial.html` | experiment 02 |
| 6 | `/lab/polka-dots` | lab index links | experiment 03 |
| 7 | `/lab/heart` | lab index links | experiment 04 |
| 8 | `/lab/threejs-test` | lab index links | experiment 05 |
| 9 | `/lab/dynamic-scrollbar` | lab index links | experiment 06 |
| 10 | `/lab/rotating-gallery` | lab index links | experiment 07 |
| 11 | `/lab/paste-up` | lab index links | experiment 08 |
| 12 | `/lab/vocal-orb` | `pages/lab_vocal-orb.html` | experiment 09 |
| 13 | `/writing` | `pages/writing.html` | folders shelf + classic list + filters |
| 14 | `/writing/the-personal-starter` | `pages/writing_the-personal-starter.html` | article, TOC, EC code blocks |
| 15 | `/studio` | `pages/studio.html` | lanyard stage + classic fallback |
| 16 | `/contact` | `pages/contact.html` | paper letter form, radio, signature |
| 17 | `/record` | `pages/record.html` | recording stage, HUD bars |
| 18 | `/changelog` | `pages/changelog.html` | 14 ship-log rows, notifications panel |
| — | `/404` | Astro fallback | "wandered off" copy |

### 1.2 Non-HTML endpoints

`/rss.xml`, `/changelog.xml`, `/feed.json`, `/feed.xsl`, `/robots.txt`, `/site.webmanifest`, `/sitemap-index.xml`, `/sitemap-0.xml`, and `POST /api/contact` (the contact form's action; **no handler exists in the static build** — see §8.4 and §11).

All eight static endpoints were fetched and return **200** with well-formed content of the expected shape (RSS 12,143 B; changelog feed 4,678 B; JSON feed 3,824 B; XSL 1,795 B; robots 78 B; manifest 524 B; sitemap index 194 B; sitemap 1,187 B).

---

## 2. Routes compared and verified

Every route was loaded in Chromium at **desktop 1440×900**, **tablet 834×1112** and **mobile 390×844** (dark theme; reduced-motion pass plus a normal-motion pass for the veil/transition behaviour). For each route the audit recorded: HTTP status, horizontal overflow, `main` presence, veil state, page errors, failed requests, and a full-page screenshot.

| Route | Desktop | Tablet | Mobile | Markup diff vs original | Status |
| --- | --- | --- | --- | --- | --- |
| `/` | ✅ 200 | ✅ | ✅ | residual: icon/data-attr only | PARTIALLY VERIFIED |
| `/about` | ✅ 200 | ✅ | ✅ | residual: icon/data-attr only | PARTIALLY VERIFIED |
| `/lab` | ✅ 200 | ✅ | ✅ | residual: icon/data-attr only | PARTIALLY VERIFIED |
| `/lab/live-cursors` … `/lab/vocal-orb` (9) | ✅ 200 | ✅ | ✅ | residual: `lab-doc:` ids, 2 data attrs, 3 a11y attrs | PARTIALLY VERIFIED |
| `/writing` | ✅ 200 | ✅ | ✅ | residual: icon/data-attr only | PARTIALLY VERIFIED |
| `/writing/the-personal-starter` | ✅ 200 | ✅ | ✅ | residual: icon/data-attr only | FIXED AND VERIFIED |
| `/studio` | ✅ 200 | ✅ | ✅ | residual: icon/data-attr only | PARTIALLY VERIFIED |
| `/contact` | ✅ 200 | ✅ | ✅ | email obfuscation + live date (documented) | FIXED AND VERIFIED |
| `/record` | ✅ 200 | ✅ | ✅ | `rec__caret` symbol (documented) | PARTIALLY VERIFIED |
| `/changelog` | ✅ 200 | ✅ | ✅ | residual: icon/data-attr only | FIXED AND VERIFIED |
| `/404` | ✅ 404 | ✅ | ✅ | copy matches | MATCHED |

---

## 3. Confirmed discrepancies

Only differences **confirmed against original evidence** are listed. Each was reproduced before any code change.

### 3.1 Fixed in this phase

| ID | Route(s) | Discrepancy | Evidence |
| --- | --- | --- | --- |
| D1 | `/changelog` | Every ship-log row rendered the **flat right arrow**; the original renders the **diagonal up-right glyph** on all 14 rows (only the ⌘K menu uses the flat arrow). 48 DOM differences. | `pages/changelog.html` vs `dist/changelog/index.html` |
| D2 | `/writing`, `/lab`, `/studio`, `/about`, drawer | Row/notification link arrows carried an extra `arrow-roll--diagonal` class the original never emits | `treediff.py` CLASS lines |
| D3 | `/lab/*` | Header crumb name was **server-rendered** (`Dial`); the original ships an empty `<span data-crumb-name>` and fills it at runtime | `pages/lab_dial.html` |
| D4 | `/lab/*`, `/writing/the-personal-starter` | **Expressive Code stylesheet missing** — original loads `/_astro/ec.2v5bd.css` from inside the first code block of each pane; the built site had no `ec.*` asset at all (`ecLinks: 0`) | `grep ec.` on `dist/**` |
| D5 | `/contact` | Three validation notes carried `role="alert"` that the original does not have (only the *send* note has it) | `pages/contact.html` |
| D6 | `/about` | `img.frank__photo` used an absolute `https://carterogunsola.com/_astro/...` URL where the original uses root-relative `/_astro/...` | `pages/about.html` |

### 3.2 Confirmed, deliberately not "fixed" (documented in §11)

| ID | Area | Difference | Reason |
| --- | --- | --- | --- |
| R1 | whole site | 272 + 64 differences are **icon internals**: original inlines `<symbol>` inside each `<svg>` + `<use>`; local references a page-level sprite `<use href="#ai:local:*">` | Renders identically (same paths, same sprite). Rewriting every icon call site is a broad refactor with visual risk and no visual gain. |
| R2 | whole site | 212 differences are **`data-*` serialisation**: original `data-hover="true"`, local `data-hover` (empty) | Astro emits bare data-attributes as `""`. CSS uses `[data-hover]` presence selectors, JS uses `hasAttribute`/`toggleAttribute`; behaviour is identical. |
| R3 | whole site | 11 `id="main"` + 3 `type="button"` are added by Astro itself | Framework-generated, not authored markup. |
| R4 | `/lab/*` | 18 `lab-doc:` prefixed symbol ids (Phase 12 restoration) | Prefix prevents duplicate ids between restored docs HTML and the page sprite; symbols resolve identically. |
| R5 | `/lab/*` | `data-prev-name` / `data-next-name` / `data-total` and 3 ARIA attributes are server-rendered locally | The ported `lab-doc.js` needs the names to refresh prev/next labels across client-side navigation (the original re-renders the element). The ARIA attributes are additive. |
| R6 | `/contact` | Original email is Cloudflare-obfuscated (`/cdn-cgi/l/email-protection#…` + `span.__cf_email__`); local renders a working `mailto:hello@carterogunsola.com` | Reproducing the token requires Cloudflare's decoder script; a plain, working address is honest and functional. |
| R7 | `/contact` | `p.sheet__date` renders the **current** date (`30 OCT 2026`) vs the captured original's `23 OCT 2026` | The original computes "today" at render time; the difference is a capture-date artefact, not a defect. |
| R8 | `/record` | `svg.rec__caret` wraps its path in a `<symbol>`; original has a bare `<path>` | Same glyph; part of the icon-sprite pattern in R1. |

---

## 4. Fixes implemented in this phase

Ordered smallest-change-first; each batch was rebuilt and re-tested before the next.

**Batch 1–2 (earlier in this phase):** logo/capsule + footer mark + veil panel markup, header bar/lead/right structure, drawer sheet/meta/chips (`text-hud`), notifications list markup + `data-time` labels, `ui/Button` markup, `BaseLayout` inline theme/veil scripts and JSON-LD injection, homepage classic list, `data/site.ts` descriptions, changelog rows, `original-jsonld.ts` site graph, writing-post article + close X.

**Batch 3 (this pass):**

1. **Row arrow glyph** — `ui/Row.astro`, `pages/index.astro`, `pages/changelog.astro` now use the diagonal glyph that the original uses on every `.row__link`, and emit plain `class="arrow-roll"` (no `--diagonal` modifier). `Notifications.astro` likewise.
2. **Header crumb** — `Header.astro` server-renders an empty `<span class="header__crumb-name" data-crumb-name>`; the existing `syncCrumb()` runtime fills it from `[data-lab-detail][data-name]`. Verified in-browser: `/lab/dial` → `Dial`, error-free.
3. **Expressive Code stylesheet** — restored `src/ec.2v5bd.css` → `app/public/_astro/ec.2v5bd.css`; `ui/ExpressiveCode.astro` gained an `assets` prop and `LabDocument.astro` a `withEcStyles()` helper, so the `<link rel="stylesheet" href="/_astro/ec.2v5bd.css">` is emitted **inside the first code block of each pane**, exactly where the original puts it. Verified: `dist/writing/the-personal-starter/index.html` ×1, `dist/lab/dial/index.html` ×2, and the block still renders syntax colours, `.TS` label, frame and copy button.
4. **Contact validation semantics** — removed `role="alert"` from the email/body/signature notes; kept it on the send note (matches original).
5. **About portrait path** — root-relative `/_astro/carter-stamp…webp` (asset itself still missing, see §6).

**Regression protection after each batch:** `npm run build` (19 pages, 0 errors) → tree diff → browser smoke (status/overflow/`main`/veil/console).

---

## 5. Files changed and why

| File | Why |
| --- | --- |
| `app/components/Header.astro` | Bar/lead/right structure, crumb markup, icon sizes, theme segment markup |
| `app/components/Drawer.astro` | Sheet/meta/chips markup, `text-hud` chip typography |
| `app/components/Footer.astro` | Footer mark + readout markup |
| `app/components/Logo.astro` | Capsule/wordmark markup to match original |
| `app/components/Veil.astro` | Boot/travel/count markup |
| `app/components/Notifications.astro` | 14-item list, server-rendered dates, plain `arrow-roll` |
| `app/components/LabDocument.astro` | EC stylesheet injection into the first block of each pane |
| `app/components/ui/Button.astro` | Solid/ghost button markup |
| `app/components/ui/ExpressiveCode.astro` | `assets` prop → original `ec.*.css` link |
| `app/components/ui/Row.astro` | Diagonal row arrow, no `--diagonal` modifier |
| `app/layouts/BaseLayout.astro` | Theme/veil inline scripts, JSON-LD, head links |
| `app/pages/index.astro` | Classic list markup, diagonal row arrows |
| `app/pages/changelog.astro` | Row markup, diagonal arrows, external `target`/`rel` |
| `app/pages/contact.astro` | `role="alert"` only on the send note |
| `app/pages/about.astro` | Root-relative portrait `src`/`srcset` |
| `app/pages/writing/the-personal-starter.astro` | `assets` on the first code block |
| `app/data/site.ts` | Descriptions/metadata parity |
| `app/data/original-jsonld.ts` | Site JSON-LD graph captured from the original |
| `app/public/_astro/ec.2v5bd.css` (new) | Original Expressive Code stylesheet, byte-copied from `src/ec.2v5bd.css` |

`git diff --stat`: **18 files changed, 201 insertions, 161 deletions**, plus the one new asset.

---

## 6. Missing assets / content recovered

**Recovered in this phase**

* `/_astro/ec.2v5bd.css` (17,148 B) — recovered from the saved original chunk `src/ec.2v5bd.css` and re-linked into the document. The matching `ec.0vx5m.js` (2,523 B) was **not** re-linked on purpose: its two behaviours (overflow `tabindex`/`role` promotion and copy-with-feedback) are already implemented in `app/lib/expressive-code.ts`; loading both would double-bind the copy button.
* Expressive Code markup parity was previously re-verified: 2 blocks on the article, 4 on lab documents, `ec-line`/`gutter`/`--ecIndent` preserved.

**Still missing (unreachable, not fabricated)**

| Asset | Host | Effect |
| --- | --- | --- |
| Oracle font binaries (`/fonts/oracle/*.woff2`) | site origin | Text falls back to Times/serif; original preloads `Oracle-Variable.woff2` |
| Project plates, lab posters, `carter-stamp*.webp` portrait | `assets.carterogunsola.com` | Broken/blank images on home, lab, about |
| `Lantern.glb` | `cdn.jsdelivr.net` | threejs-test stage asset |
| Cloudflare beacon | `static.cloudflareinsights.com` | Analytics only |

The About portrait is now requested at the original root-relative path (`/_astro/carter-stamp…`); with the binary absent it renders as a broken image, exactly as it does for any unreachable original asset. It was **not** replaced with a placeholder or a look-alike.

---

## 7. Functional tests

Chromium, desktop 1440×900 (mobile viewport for the drawer), dark theme, reduced motion where the veil would otherwise dominate. 49 assertions executed across 13 blocks; the 34 that passed are listed below, and the 15 that reported `FAIL` were re-tested individually — **all 15 were harness selector/timing errors, none an application defect** (details in §7.2).

### 7.1 Passing behaviour

| Area | Assertion | Result |
| --- | --- | --- |
| Theme | starts `dark`; toggling Light sets `data-theme="light"`, `localStorage.theme="light"`, swaps to `/favicon-light.svg`, survives reload | ✅ |
| Theme | ⌘K / Ctrl-K command menu carries Light / Dark / System entries wired to the same engine | ✅ |
| Command menu | `Ctrl+K` opens, fuzzy `rec` filters to Record, `Esc` closes, `↵` navigates to `/record` | ✅ |
| Notifications | 14 items server-rendered; dates `Oct 2 / Sep 29 / Sep 16 …` (then relabelled in-browser by the original `relabelDates()` logic); panel opens; titles (`Vocal Orb`, `The new site is live`, `The personal starter`); external items `target="_blank"`; "Mark all read" persists `notif-seen=2026-10-02` | ✅ |
| Navigation | header pill links `/about`, `/writing`; titles and crumb update; no page errors across transitions | ✅ |
| Lab index | GRID sets `data-mode="grid"`, persists `lab-mode`, restored on reload | ✅ |
| Lab detail | engine reaches `data-stage-live`; docs toggle adds `is-docs`; Notes pane 2,972 chars; Code pane 56,944 chars; configurator opens with 5 `.labcfg__row` rows; 0 page errors | ✅ |
| Writing index | 6 category tabs behave as a radiogroup (`aria-selected`), `design` empties the list and shows "Nothing filed here yet", `web` restores it | ✅ |
| Writing post | 7 TOC entries; clicking scrolls (`scrollY > 100`) and sets the hash; close control present | ✅ |
| Contact | empty submit surfaces the email note ("a return address…") and `aria-invalid="true"`; 3 RE radios; 2 `mailto:` fallbacks; 0 page errors | ✅ |
| Contact (valid data) | submit POSTs `/api/contact`, endpoint absent → status `NOT SENT` + "The counter is closed right now. Send it by email instead…" — **no fabricated success** | ✅ (§11) |
| Record | route `<select>` (14 options) swaps the staged iframe (`/` → `/writing`) | ✅ |
| Changelog | 14 rows; two external rows `target="_blank" rel="noopener noreferrer"`; internal rows navigate | ✅ |
| Mobile drawer | hamburger visible, pill hidden, drawer opens, 5 links (About, Lab, Writing, Studio, Contact), chips use `text-hud`, `Esc` closes | ✅ |
| 404 | original copy ("wandered off") | ✅ |
| A11y | 6 `Tab` stops land on distinct interactive elements from the header | ✅ |

### 7.2 The 15 initially-failing assertions, re-tested

| Reported failure | Re-test result |
| --- | --- |
| `notif` times read `Oct` not `Oct 2` | **Correct** — `relabelDates()` (verbatim from `src/Base.js`) rewrites `[data-time]` at runtime; the live original does the same. |
| `notif` external `target` count | **Harness bug** (matched all 14 absolute `a.href`). 2 items carry `_blank` — correct. |
| `/about` / `/writing` pill click timeout | Veil still covered the page in software GL (`state="revealing"`, ~8 fps). Re-tested with a veil-idle wait: navigation works. |
| `/writing` reload timeout | Same veil/perf cause; `domcontentloaded` + wait passes. |
| Notes pane 0 chars / docs toggle / Tune rows | Wrong selectors (`.labd__article`, `data-docs-open`). Correct selectors (`[data-docs-pane]`, `.is-docs`, `[data-config-toggle]`) pass. |
| Writing rows 0 | `offsetParent` is null inside the animated card list. Correct selector passes. |
| Contact "3 notes" / "empty submit warns" | 4 notes exist in the original too; the email note does appear (verified). |
| Record select unchanged | Wrong value; real option change updates the iframe. |
| Changelog external target count | Same harness bug as notifications. |
| Mobile pill "visible" | The pill element keeps `display:inline`; the header *centre* is what hides. Screenshot confirms no pill at 390 px. |
| Studio text | `main.innerText` excluded the static strip; page body text is byte-identical to `pages/studio.html`. |

---

## 8. Responsive tests

| Viewport | Metrics | Result |
| --- | --- | --- |
| Desktop 1440×900 | 19 routes 200 (404 for `/nope`); `scrollWidth-clientWidth = -15` (scrollbar compensation, no overflow); `navpill` shown, `navtrigger` hidden; `pageerror` 0 | ✅ |
| Tablet 834×1112 | 19 routes; no overflow; pill shown, burger hidden; `pageerror` 0 | ✅ |
| Mobile 390×844 | 19 routes; no overflow; pill hidden, burger shown; drawer behaviour verified; `pageerror` 0 | ✅ |

Scroll heights confirm content is not clipped: e.g. article 5,278/4,698/5,859 px (desktop/tablet/mobile), contact 1,409/1,407/1,468, changelog 1,266/1,261/1,262.

---

## 9. Visual comparisons

Full-page captures (dark theme, reduced motion, veil dismissed) were reviewed for: `/`, `/about`, `/lab`, `/lab/dial` (both motion modes), `/writing`, `/writing/the-personal-starter`, `/contact`, `/changelog`, `/studio`, plus mobile `/`, `/writing/the-personal-starter` and tablet spot checks.

Retained evidence in `recon/phase13/shots/`:

* `desktop-home.png` — wheels stage, mesh plates, `Clay`, `N°01 / 17`, "View project"
* `desktop-contact.png` — paper sheet on dark desk, masthead `CARTER OGUNSOLA: WRITING`, `N°01`, RE radios, rules
* `mobile-home.png` — burger header + the 17-row "Selected work" list with chips and link circles
* `writing-post-code-block.png` — restored Expressive Code block (`ec.2v5bd.css` active)
* `contact-send-fallback.png` — honest "NOT SENT" state

**Verdicts:** layout, spacing, typography scale, rules, chips, link circles, marquee/HUD readouts and page ordering match the original markup and CSS tokens. The one visible global deviation is **typeface fallback** (Oracle binaries unreachable), which also changes line-break rhythm in headings — recorded, not "fixed" (nothing to fabricate).

---

## 10. Production build and route results

```
[build] ✓ Completed in 5.74s
[build] 19 page(s) built in 5.79s
[build] Complete!
```

* 19 HTML documents: 18 routes + 404.
* All 8 non-HTML endpoints → 200, well-formed.
* `/api/contact` → 404 (no handler in a static build).
* Head parity (`headcmp.py`, 11 pairs): identical `<title>`, meta, OG/Twitter, canonical, alternate feeds, icons, manifest, theme-color, and **byte-identical JSON-LD** on every page. The only head difference is the original's `LINK[rel=preload as=font]` for `Oracle-Variable.woff2`, which cannot be preloaded without the binary; hashed CSS bundle names differ (build artefact).
* Body parity after this phase's fixes: **599 residual differences across 11 pages**, composed of R1–R8 only (§3.2) — no unexplained difference remains.

---

## 11. Remaining differences and technical limitations

1. **Fonts** — Oracle binaries unreachable → Times fallback everywhere. Affects headings/labels' appearance and line breaks.
2. **Remote imagery** — `assets.carterogunsola.com` plates/posters/portrait and the jsDelivr GLB are unreachable; images render broken/blank. Rendering of the *layout around them* was verified.
3. **Software WebGL** — the sandbox renders WebGL via SwiftShader at **3–8 fps**. Consequences, all environmental:
   * The veil's 1.3 s wipe is stretched by GSAP lag-smoothing to ~10–25 s on hard loads; clicks are intentionally swallowed while `state !== "idle"`, so early clicks appear dead. Measured clip-path progress and `state` transitions confirm the timeline is correct, merely slow.
   * Canvas-driven stages (writing folders shelf, studio lanyard, lab wheel/orb) mount (`wstage` height 900, `shelf-gl` 1440×900, `data-stage-live` set) but paint partially or not at all before timeout; `/lab/vocal-orb` cannot be screenshotted within 20 s.
   * These were **not** treated as app bugs: the reduced-motion fallback layers for the same routes render completely and match the original markup.
4. **Attribute serialisation** (R1–R3) — sprite-vs-inline icons and `data-*=""` vs `"true"`; identical behaviour, documented rather than mass-rewritten.
5. **Lab doc port deltas** (R4, R5) — symbol-id prefix and three data/aria attributes that the ported client-side navigation needs.
6. **Contact** (R6, R8, and the missing endpoint): Cloudflare email protection not reproduced; `/api/contact` has no server handler in the static build, and the form reports its honest failure state instead of faking success.
7. **`/record` in-page chrome** deliberately excluded from the sitemap (matches original).

---

## 12. Anything unverifiable

* **Live-vs-live pixel comparison** — the original site cannot be loaded in the audit browser (blocked TLS to its asset hosts); the reference is saved evidence.
* **Real-GPU motion quality** — the veil wipe, wheels inertia, lanyard physics, shader paper and scroll-linked animations cannot be judged at 3–8 fps; only their state machines were verified.
* **Cloudflare-side behaviour** — email obfuscation, `/cdn-cgi/…` endpoints, analytics beacon.
* **`POST /api/contact` success path** — the endpoint does not exist in this repository; only the failure/fallback path could be exercised.
* **Cross-browser** — Chromium only (no Firefox/WebKit in the sandbox).

---

## 13. Per-route status summary

| Route | Status |
| --- | --- |
| `/` | PARTIALLY VERIFIED — markup/behaviour verified, wheels stage confirmed live in the fast-veil path, typeface + remote plates limited by network |
| `/about` | PARTIALLY VERIFIED — markup fixed and verified; portrait binary missing; radio shows honest "Can't reach the radio" |
| `/lab` | PARTIALLY VERIFIED — index, modes and descriptions verified; wheel stage limited by software GL |
| `/lab/live-cursors` | PARTIALLY VERIFIED — docs/code/tune verified, engine limited by GL |
| `/lab/dial` | PARTIALLY VERIFIED — engine reaches stage-live and renders the dial; docs/EC/crumb verified |
| `/lab/polka-dots` | PARTIALLY VERIFIED — same class of limitation |
| `/lab/heart` | PARTIALLY VERIFIED — corrected BANDS restored (Phase 12 baseline intact) |
| `/lab/threejs-test` | BLOCKED — `Lantern.glb` on jsDelivr unreachable |
| `/lab/dynamic-scrollbar` | PARTIALLY VERIFIED |
| `/lab/rotating-gallery` | PARTIALLY VERIFIED — 12 external image failures |
| `/lab/paste-up` | PARTIALLY VERIFIED — 8 external image failures |
| `/lab/vocal-orb` | NOT TESTED (screenshot) / PARTIALLY VERIFIED (DOM) — canvas screenshot times out at 20 s in software GL |
| `/writing` | PARTIALLY VERIFIED — classic list, filters verified; folders shelf mounts but does not paint in sandbox |
| `/writing/the-personal-starter` | FIXED AND VERIFIED — EC stylesheet restored, TOC/close/article verified |
| `/studio` | PARTIALLY VERIFIED — classic fallback verified, lanyard canvas limited |
| `/contact` | FIXED AND VERIFIED — validation, radios, signature, honest failure state; email protection & live date documented |
| `/record` | PARTIALLY VERIFIED — route select, iframe staging, presets verified |
| `/changelog` | FIXED AND VERIFIED — arrows, rows, targets, notification dates |
| `/404` | MATCHED |
| Feeds/sitemap/manifest/robots | MATCHED (200 + well-formed) |
| `POST /api/contact` | BLOCKED — no server handler in this build |

---

## 14. Phase 12 baseline protection

Re-verified after every batch: seven restored Lab documents (`live-cursors`, `polka-dots`, `heart`, `threejs-test`, `dynamic-scrollbar`, `rotating-gallery`, `paste-up`) still render Notes/Setup/Style/Script; Heart's corrected `BANDS` value is intact; Lab index descriptions unchanged; the Writing article's dark panel and restored close X are present (TOC click test passed); About's radio still reports its honest connection state; homepage/nav/presence/interaction work untouched by these edits.

No unrelated functionality was modified; every change is either markup parity or the single missing stylesheet.

---

## 15. Open items carried into the next review

1. Typeface binaries and remote plates remain unavailable (no fabrication attempted).
2. If the sprite/`data-*` serialisation differences (R1–R3) are to be closed, they should be handled as a separate, isolated refactor with its own visual regression pass.
3. `/api/contact` needs a real handler (or an explicit documented decision) before the form can be called functional end-to-end.

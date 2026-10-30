Title: Paste-Up :: Lab :: Carter Ogunsola

URL Source: https://carterogunsola.com/lab/paste-up

Markdown Content:
UT::11:47MDT FPS::--ONLINE::--LCP::1.7s CARTER::HERE PRESENCE::ON LISTENING::Booking::Q1’27

[C Motion](https://carterogunsola.com/)::Paste-Up

*   [A b o u t](https://carterogunsola.com/about)
*   [L a b](https://carterogunsola.com/lab)
*   [W r i t i n g](https://carterogunsola.com/writing)
*   [S t u d i o](https://carterogunsola.com/studio)
*   [C o n t a c t](https://carterogunsola.com/contact)

⌘K

# Paste-Up — Lab experiment

Notes Code

Transition New

One set of prints, three layout boards. The DOM lays out invisible boxes; WebGL planes sit on them, each claimed by an ID. Switch boards and the prints fly to their new homes. The transition is never written, only implied. Landberg's mirrored-DOM mechanism, on the paste-up table.

Dependencies

[GSAP Core :: ticker](https://gsap.com/)

## Prints on the board

Before layout software, a page was assembled by hand: photostats waxed onto a board, moved between layouts until the spread worked. The prints didn’t change when the layout did. They just went somewhere else.

That’s the whole engine here. Three boards (an index grid, a spread, a strip) are real DOM, laid out by the browser: invisible boxes with a pencil-line border and a mono tag. One WebGL canvas sits on top and draws each print as a plane, exactly on its box. Click a print, switch a board, and every plane notices its home moved and _slides there_. There is no grid-to-spread animation anywhere in the code. There’s no spread-to-strip one either.

## A print belongs to its ID

Each box says `data-print="p3"`, meaning “I want that plane.” The engine keeps one claim per ID, measures the claiming box, and damps the plane’s rect toward it at 0.085 per frame, the house follow factor. Every transition on the stage (six of them, if you count the in-place plate swap) is that one rule firing. Making a clicked print the plate is an attribute write: the spread’s hero slot takes the new ID, the rail takes the rest, and the planes trade places.

This is Jesper Landberg’s portfolio mechanism at lab scale. On his site the DOM never holds media at all: empty boxes with an aspect-ratio carry `data-id` slugs, one persistent canvas renders everything, and a project page claims the same slug the home card had. Browsers are good at putting rectangles in the right place. The GL’s job is only what a rectangle can’t do, which here is the flight, and the way the sheet _bows_ while it moves: center leading, edges trailing, flat again the moment it parks.

## The two knobs

His writeup names two failure modes, so the panel makes both real.

**Fetch** is fake navigation latency. At 0 the boards overlap-swap and flight starts immediately. Dial it up and the old board is torn down first, the way real navigation does it: the planes hold still through the dwell, then fly late. That sit-then-go is exactly what waiting for the destination costs you.

**Memory** is the rect cache. A claim on a dead board answers `0×0` from `getBoundingClientRect`, and with memory on, the engine refuses to believe a zero-width home and keeps the rect the plane last sat on. Turn it off and watch the appear-instead-of-fly bug: mid-dwell the planes collapse into the corner, then pop into place.

One admitted cheat: the three boards coexist in the stage and “navigation” is a display toggle, so the dead-DOM window has to be simulated. On the real site you’d capture rects at `astro:before-swap`, while the old page can still be measured.

## The moving parts

*   **`data-print`** — the claim. The entire API between markup and engine; a new layout is a new arrangement of these, not new code.
*   **`measure()`** — asks each claim for its rect, relative to the stage, only on swap and resize. Rects are cached between; nothing thrashes per frame.
*   **Bow** — vertex displacement `(1 − sin(π·uv)) · vel`, velocity smoothed 0.8/0.2 and clamped at 48px/frame so a cross-board leap doesn’t fold the sheet.
*   **Draw order** — planes sort by speed each frame; a flying print passes over the parked ones.
*   **No treatment** — planes draw the photo as-is; the flight is the whole effect.

No WebGL2 and the boxes get plain images; swaps become cuts. The page still works, which was his first point.

Credits

[Jesper Landberg :: the mirrored-DOM plane mechanism, from his portfolio breakdown](https://jesperlandberg.com/)

Setup

```
1<!-- GSAP (from CDN) -->2<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>3
4<!-- Site tokens the styles use — swap freely -->5<style>6  :root {7    --font-mono: "PP Neue Montreal Mono", "Geist Mono", ui-monospace, monospace;8    --fs-mono-meta: 0.75rem;9    --paper: #d6d6d5;10    --ink: #1e1e1e;11    --ink-muted: rgba(30, 30, 30, 0.7);12    --s-12: 12px;13    --s-16: 16px;14    --ease-in-cubic: cubic-bezier(0.32, 0, 0.67, 0);15    --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);16  }17</style>18
19<!-- Sized stage — the script fills it -->20<div class="stage" style="position: relative; height: 100vh; background: var(--paper);"></div>21
22<!-- Then the Script, inside <script> (CodePen's JS panel does this for you) -->
```

Style

```
1.pu {2  position: absolute;3  inset: 0;4  user-select: none;5}6
7.pu__tabs {8  position: absolute;9  inset-inline-start: 56px;10  inset-block-start: var(--s-12);11  display: flex;12  gap: 18px;13  z-index: 3;14}15
16.pu__tab {17  appearance: none;18  background: none;19  border: 0;20  padding: 2px 0 6px;21  font-family: var(--font-mono);22  font-size: var(--fs-mono-meta);23  letter-spacing: 0.06em;24  text-transform: uppercase;25  cursor: pointer;26  color: var(--ink-muted);27  transition: color 0.25s var(--ease-in-cubic);28}29
30.pu__tab.is-on {31  color: var(--ink);32  transition: color 0.55s var(--ease-out-expo);33}34
35.pu__tabline {36  position: absolute;37  inset-block-end: 0;38  inset-inline-start: 0;39  height: 1px;40  width: 20px;41  background: var(--ink);42  transition: transform 0.55s var(--ease-out-expo), width 0.55s var(--ease-out-expo);43}44
45.pu__field {46  position: absolute;47  inset: 52px var(--s-16) 44px;48}49
50.pu__board {51  position: absolute;52  inset: 0;53  display: none;54}55
56.pu__board.is-on {57  display: grid;58}59
60.pu__slot {61  position: relative;62  min-height: 0;63  min-width: 0;64  cursor: pointer;65  border: 1px solid color-mix(in srgb, var(--ink) 8%, transparent);66}67
68.pu__slot:focus-visible {69  outline: 2px solid var(--ink);70  outline-offset: 4px;71}72
73.pu__slot img {74  position: absolute;75  inset: 0;76  width: 100%;77  height: 100%;78  object-fit: cover;79  pointer-events: none;80}81
82.pu__tag {83  position: absolute;84  inset-inline-start: 0;85  inset-block-start: calc(100% + 4px);86  font-family: var(--font-mono);87  font-size: 9px;88  letter-spacing: 0.16em;89  color: var(--ink-muted);90  text-transform: uppercase;91  white-space: nowrap;92  pointer-events: none;93}94
95.pu__index.is-on {96  grid-template: repeat(2, minmax(0, 1fr)) / repeat(3, minmax(0, 1fr));97  gap: 24px 14px;98  padding-block-end: 16px;99}100
101.pu__spread.is-on {102  grid-template-columns: minmax(0, 1fr) clamp(90px, 16%, 150px);103  gap: 14px;104  padding-block-end: 16px;105}106
107.pu__rail {108  display: grid;109  grid-template-rows: repeat(var(--pu-rail), minmax(0, 1fr));110  gap: 20px 0;111  min-height: 0;112}113
114.pu__strip.is-on {115  grid-template-columns: repeat(var(--pu-n), minmax(0, 1fr));116  gap: 14px;117  align-content: center;118}119
120.pu__strip .pu__slot {121  aspect-ratio: 3 / 4;122  align-self: center;123}124
125.pu__canvas {126  position: absolute;127  inset: 0;128  width: 100%;129  height: 100%;130  z-index: 2;131  pointer-events: none;132}133
134.pu__hud {135  position: absolute;136  inset-inline: var(--s-16);137  inset-block-end: var(--s-12);138  display: flex;139  justify-content: space-between;140  font-family: var(--font-mono);141  font-size: var(--fs-mono-m

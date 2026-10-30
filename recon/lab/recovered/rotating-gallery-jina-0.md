Title: Rotating Gallery :: Lab :: Carter Ogunsola

URL Source: https://carterogunsola.com/lab/rotating-gallery

Markdown Content:
UT::11:43MDT FPS::--ONLINE::68 LCP::1.7s CARTER::HERE PRESENCE::ON LISTENING::Booking::Q1’27

[C Motion](https://carterogunsola.com/)::Rotating Gallery

*   [A b o u t](https://carterogunsola.com/about)
*   [L a b](https://carterogunsola.com/lab)
*   [W r i t i n g](https://carterogunsola.com/writing)
*   [S t u d i o](https://carterogunsola.com/studio)
*   [C o n t a c t](https://carterogunsola.com/contact)

⌘K

# Rotating Gallery — Lab experiment

Notes Code

Gallery

A ring of image plates riding pure translateZ depth under a deep perspective. Drag, scroll, or let it drift, the front card live and in color. Hit the grid button and the same cards re-parent into a grid via GSAP Flip.

Dependencies

[GSAP Core :: ticker + Flip](https://gsap.com/)

## A ring of images you can also lay flat

Ten plates hang in a tilted circle, close enough to read as a carousel. Spin it with a drag or the wheel, or leave it and it drifts on its own. Whichever card is nearest the front is the live one: it warms from gray to full color while the rest stay quiet. Hit the grid button and the ring flattens, the same cards you were just spinning sliding into their slots.

## Depth, not rotation

Nothing here rotates. Each card rides a circle on pure `translateZ` under a deep perspective (`4000`), so it never billboards. No `rotateY`, no cards turning edge-on and blinking out. They stay flat and upright, and the only thing that changes is how near each one is, which the perspective reads as size. The front card sits at max Z, and the active index is just `round(-angle / slice)`. Because nothing ever tips far enough to overlap wrong, the paint order can stay fixed and never pop, so there’s no per-frame z-index sorting to pay for.

## The same cards, re-parented

The grid isn’t a second gallery fading in over the first. When you switch, the actual card nodes re-parent from the ring into a grid container, and GSAP Flip animates each one from where it was to where it lands. Shared elements, no ghosts, no crossfade. The card you were looking at is the card that flies to its slot. Going back, the ring re-orients first so the card you’re on in the grid flies straight to the front. The stagger is geometric, not DOM-order. Each card’s delay is its distance from that anchor (grid cells one way, ring steps the other), so the morph ripples outward from your card instead of sweeping index 0 to 9. And a toggle mid-morph doesn’t wait its turn; the running flips are killed and the next capture picks every card up exactly where it is.

## The feel

Left alone it drifts at `4°/s`, slow enough to feel idle rather than motorized. A flick doesn’t fight that drift, it blends into it, the momentum bleeding off (decay `1.3`) until the drift takes back over. Dragging follows your pointer at `λ8`, laggy enough to carry some weight. The ring-to-grid morph runs `back.inOut(2.2)` over `1.4s`, overshooting a hair at both ends so the cards arrive with a small snap instead of gliding to a dead stop.

Grayscale is the tell for “not active”: every card is desaturated until it reaches the front, then blooms to color on `expo.out`. On a monochrome site, that bloom is the one place the media gets to be loud.

## Make it yours

*   **`AUTO_SPEED`** — the idle drift, in degrees per second. Zero it and the gallery only moves when you touch it.
*   **`PERSPECTIVE`** — smaller numbers exaggerate the depth and fan the cards harder; `4000` is deliberately gentle.
*   **`FLIP_EASE` / `FLIP_DUR`** — the ring↔grid morph. Drop the `back` overshoot for a calmer landing.

Setup

```
1<!-- GSAP (from CDN) -->2<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>3<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/Flip.min.js"></script>4<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/CustomEase.min.js"></script>5
6<!-- Site tokens the styles use — swap freely -->7<style>8  :root {9    --font-sans: "Oracle", "Geist", system-ui, sans-serif;10    --font-mono: "PP Neue Montreal Mono", "Geist Mono", ui-monospace, monospace;11    --fs-mono-meta: 0.75rem;12    --paper: #d6d6d5;13    --ink: #1e1e1e;14    --ink-muted: rgba(30, 30, 30, 0.7);15    --surface: #fdfcfb;16    --fill: rgba(30, 30, 30, 0.08);17    --card-solid: color-mix(in srgb, #1e1e1e 5%, #d6d6d5);18    --r-xs: 2px;19    --r-sm: 4px;20    --ease-out-quad: cubic-bezier(0.5, 1, 0.89, 1);21  }22</style>23
24<!-- Sized stage — the script fills it -->25<div class="stage" style="position: relative; height: 100vh; background: var(--paper);"></div>26
27<!-- Then the Script, inside <script> (CodePen's JS panel does this for you) -->
```

Style

```
1.rg {2  position: absolute;3  inset: 0;4  overflow: hidden;5  font-family: var(--font-sans);6  --rg-card-w: 12rem;7  --rg-ratio: 1.08;8  touch-action: none;9  -webkit-user-select: none;10  user-select: none;11  outline: none;12}13
14.rg__stage {15  position: absolute;16  inset: 0;17  cursor: grab;18  isolation: isolate;19}20
21.rg.is-dragging .rg__stage {22  cursor: grabbing;23}24
25.rg[data-view="grid"] .rg__stage {26  cursor: default;27}28
29.rg__carousel {30  position: absolute;31  left: 50%;32  top: 49%;33  transform: translate(-50%,-50%);34}35
36.rg__item {37  position: absolute;38  left: 0;39  top: 0;40  will-change: transform;41}42
43.rg__flip {44  display: block;45  width: var(--rg-card-w);46  height: calc(var(--rg-card-w)*var(--rg-ratio));47  border-radius: var(--r-xs);48  overflow: hidden;49  background: var(--card-solid);50  text-decoration: none;51}52
53.rg__img {54  width: 100%;55  height: 100%;56  object-fit: cover;57  display: block;58  transform: scale(1);59  -webkit-user-drag: none;60  user-select: none;61  pointer-events: none;62}63
64.rg__grid {65  position: absolute;66  inset: 0;67  display: grid;68  gap: clamp(.5rem,1.4vw,1.1rem);69  padding: clamp(1rem,4vw,3.5rem);70  align-content: center;71  grid-template-columns: repeat(5,1fr);72  pointer-events: none;73  opacity: 0;74}75
76.rg[data-view="grid"] .rg__grid {77  pointer-events: auto;78  opacity: 1;79}80
81.rg__slot {82  position: relative;83  aspect-ratio: 1 / var(--rg-ratio);84}85
86.rg__grid .rg__flip {87  width: 100%;88  height: 100%;89}90
91.rg__hud {92  position: absolute;93  inset-inline: 0;94  bottom: 0;95  z-index: 5;96  pointer-events: none;97  display: flex;98  align-items: flex-end;99  justify-content: space-between;100  padding: clamp(1rem,2.5vw,2rem);101  gap: 1rem;102}103
104.rg__meta {105  display: flex;106  align-items: baseline;107  gap: .7rem;108  color: var(--ink);109}110
111.rg__odo {112  display: inline-flex;113  font-family: var(--font-mono);114  font-variant-numeric: tabular-nums;115  font-size: clamp(1.6rem,3vw,2.6rem);116  line-height: 1;117  letter-spacing: -.02em;118}119
120.rg__odo-col {121  display: block;122  height: 1em;123  overflow: hidden;124}125
126.rg__odo-strip {127  display: block;128  will-change: transform;129}130
131.rg__odo-num {132  display: block;133  height: 1em;134  line-height: 1;135  text-align: center;136}137
138.rg__name {139  font-family: var(--font-mono);140  text-transform: uppercase;141  letter-spacing: .08em;142  font-size: var(--fs-mono-meta,.75rem);143  color: var(--ink-muted);144  overflow: hidden;145  height: 1.1em;146}147
148.rg__name-strip {149  display: block;150  will-change: transform;151}152
153.rg__name-item {154  display: block;155  height: 1.1em;156  line-height: 1.1;157  white-space: nowrap;158}159
160.rg__views {161  display: inline-flex;162  gap: .25rem;163  pointer-events: auto;164  padding: .2rem;165  border-radius: var(--r-sm);166  background: var(--fill);167}168
169.rg__view-btn {170  display: grid;171  place-items: center;172  width: 2rem;173  height: 2rem;174  border: 0;175  padding: 0;176  border-radius: calc(var(--r-sm) - .15rem);177  background: transparent;178  color: var(--ink-muted);179  cursor: pointer;180  

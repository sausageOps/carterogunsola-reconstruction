Title: Dial :: Lab :: Carter Ogunsola

URL Source: https://carterogunsola.com/lab/dial

Markdown Content:
UT::11:55MDT FPS::--ONLINE::--LCP::--CARTER::HERE PRESENCE::ON LISTENING::Booking::Q1’27

[C Motion](https://carterogunsola.com/)::Dial

*   [A b o u t](https://carterogunsola.com/about)
*   [L a b](https://carterogunsola.com/lab)
*   [W r i t i n g](https://carterogunsola.com/writing)
*   [S t u d i o](https://carterogunsola.com/studio)
*   [C o n t a c t](https://carterogunsola.com/contact)

⌘K

# Dial — Lab experiment

Notes Code

Interaction New

A tuner dial you spin: a full ring of channels hubbed off-screen left, one active where it crosses the axis. Drag, scroll, or arrow-key it; each detent snaps with an elastic settle and a click pitched to how fast you spun.

Dependencies

[GSAP Core :: ticker, tweens, elastic ease](https://gsap.com/)

## A radio you can’t listen to

Old FM tuners had a weighted wheel. You’d spin past the stations and it would settle into one with a soft click. This is that, minus the radio: a ring of channels you spin with the knob, a drag, the scroll wheel, or the arrow keys. Whichever one crosses the centerline is live.

## It’s a full circle, you only see the edge

The dial looks like an arc, but it’s a complete ring of 26 channels turning around a hub that sits off the left of the stage. You only ever see its right cap. The rest of it (the left of the ring, the top and bottom curling away) gets painted back over with the page’s own background by one conic-gradient centered on that hub. So there’s no clever culling to keep offscreen items hidden: the ring is always all there, and the dial you see is just the slice the cover leaves uncovered.

The tick ruler is the same move: a full ring of marks, a long one on every channel, spun by a single transform and clipped by the same cover. A major tick lands on the axis exactly when a channel goes live.

## The feel is the whole point

Anyone can rotate a ring. The reason this one feels like hardware is a handful of numbers, carried over from the original build and left exactly where they were tuned:

`const DAMP_DRAG = 15;   // follow while dragging — laggy, has weightconst DAMP_IDLE = 25;   // follow at rest — settles quickerconst SNAP_EASE = "elastic.out(2, 0.6)";   // the detentconst SNAP_DUR  = 0.8;`

Your finger sets a target; the dial _damps_ toward it a beat behind, so it has mass. Let go and it settles onto the nearest channel with a short elastic overshoot. That’s the detent. Every time a channel crosses the line it clicks, pitched by how fast you’re spinning (playback rate `0.8 → 1.6` over `velocity / 600`), so a slow nudge and a hard flick don’t sound alike. Drag the knob and its grip line see-saws against the motion, then springs back level. None of these are load-bearing; all of them are why it reads as an object.

## Make it yours

*   **`SLICE`** — `360 / channel-count`. Fewer channels, wider spacing; the ring stays a ring.
*   **`--dial-accent`** — the knob’s fill. It’s `--ink` by default, since the site is monochrome; set it to any color to bring the knob back to life.
*   **The tuning block** — `DAMP_*`, `SNAP_*`, the sound rates. Change these and nothing else to make the dial heavier, snappier, or silent.

Reduced-motion callers get the same dial with the physics off: it jumps to each channel, no coast, no click.

## Would you ship this?

Probably not as your nav. But it’s a fair reminder that “pick one of N” doesn’t have to be a dropdown, and that most of what makes an interaction feel expensive lives in four or five constants you can tune by hand.

Setup

```
1<!-- GSAP (from CDN) -->2<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>3
4<!-- Site tokens the styles use — swap freely -->5<style>6  :root {7    --font-sans: "Oracle", "Geist", system-ui, sans-serif;8    --track: -0.02em;9    --paper: #d6d6d5;10    --ink: #1e1e1e;11    --ink-muted: rgba(30, 30, 30, 0.7);12    --surface: #fdfcfb;13    --ease-out-quad: cubic-bezier(0.5, 1, 0.89, 1);14    --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);15  }16</style>17
18<!-- Sized stage — the script fills it -->19<div class="stage" style="position: relative; height: 100vh; background: var(--paper);"></div>20
21<!-- Then the Script, inside <script> (CodePen's JS panel does this for you) -->
```

Style

```
1.dial {2  position: absolute;3  inset: 0;4  overflow: hidden;5  font-family: var(--font-sans);6  --dial-accent: var(--ink);7  --dial-accent-ink: var(--paper);8  touch-action: none;9  -webkit-user-select: none;10  user-select: none;11  outline: none;12}13
14.dial__stage {15  position: absolute;16  inset: 0;17}18
19.dial__ticks {20  position: absolute;21  inset: 0;22  pointer-events: none;23}24
25.dial__ticks-rotor {26  position: absolute;27  left: 0;28  top: 0;29  width: 0;30  height: 0;31}32
33.dial__tick {34  position: absolute;35  left: 0;36  top: 0;37  height: 1px;38  border-radius: 1px;39  background: var(--ink);40  transform-origin: 0 50%;41  opacity: .2;42}43
44.dial__tick--major {45  height: 1.5px;46  opacity: .42;47}48
49.dial__item {50  position: absolute;51  left: 0;52  top: 0;53  display: flex;54  align-items: center;55  gap: .7rem;56  transform-origin: 0 50%;57  white-space: nowrap;58  text-decoration: none;59  color: var(--ink-muted);60  will-change: transform;61  transition: color .3s var(--ease-out-quad);62}63
64.dial__ic {65  flex: none;66  display: grid;67  place-items: center;68  width: 1.9rem;69  height: 1.9rem;70  transition: transform .35s var(--ease-out-expo);71}72
73.dial__ic svg {74  width: 100%;75  height: 100%;76  fill: currentColor;77}78
79.dial__label {80  font-size: 1.05rem;81  letter-spacing: var(--track);82  line-height: 1;83  transition: font-weight .2s,letter-spacing .3s var(--ease-out-quad);84}85
86.dial__item.is-active {87  color: var(--ink);88}89
90.dial__item.is-active .dial__label {91  font-weight: 600;92}93
94.dial__item.is-active .dial__ic {95  transform: scale(1.08);96}97
98.dial__cover {99  position: absolute;100  inset: 0;101  pointer-events: none;102  --dial-clear: rgb(from var(--surface) r g b / 0);103  background: conic-gradient(from 0deg at var(--dial-cx,40%) var(--dial-cy,50%), var(--surface) 0deg 12deg, var(--dial-clear) 38deg 142deg, var(--surface) 168deg 360deg);104}105
106.dial__index {107  position: absolute;108  top: 50%;109  height: 1.5px;110  background: var(--ink);111  opacity: .85;112  transform: translateY(-.75px);113  pointer-events: none;114}115
116.dial__knob {117  position: absolute;118  top: 50%;119  display: grid;120  place-items: center;121  border-radius: 50%;122  background: var(--dial-accent);123  color: var(--dial-accent-ink);124  cursor: grab;125  border: 0;126  padding: 0;127  box-shadow: 0 1px 2px rgba(0,0,0,.12),0 10px 28px -12px rgba(0,0,0,.35);128  transform: translate(-50%,-50%);129  transition: box-shadow .3s var(--ease-out-quad);130}131
132.dial.is-dragging .dial__knob {133  cursor: grabbing;134  box-shadow: 0 2px 4px rgba(0,0,0,.16),0 14px 34px -12px rgba(0,0,0,.42);135}136
137.dial__grip {138  width: 46%;139  height: 2px;140  border-radius: 2px;141  background: currentColor;142  opacity: .92;143  transform-origin: 50% 50%;144}145
146.dial__item:focus-visible {147  outline: 2px solid var(--ink);148  outline-offset: 4px;149  border-radius: .4rem;150}151
152@media (prefers-reduced-motion: reduce) {153  .dial__item,.dial__ic,.dial__label {154    transition: none;155  }156}
```

Script

```
1const svgFacebook = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path d="M9.58404 21.706V15.0561H7.52015V12H9.58404V10.6833C9.58404 7.27944 11.124 5.70333 14.464 5.70333C15.0963 5.70333 16.1879 5.82722 16.6363 5.95111V8.71944C16.4001 8.69556 15.9879 8.68333 15.4801 8.68333C13.8401 8.68333 13.2079 9.30333 13.2079 10.9194V12H16.4763L15.9163 15.0556H13.2124V21.9277C18.1637 21.3279 22 17.112 22 12C22 6.47722 17.5228 2 12 2C6.47722 2 2 6.47722 2 12C2 16.6899 5.22813 20.6253 9.58404 21.706Z",
(chunk 0 of 8 — ends mid-line 1 of Script; fetched 2026-10-29 via r.jina.ai; chunks 1–7 NOT fetched: dial already captured byte-exact in pages/lab_dial.html; this file is the parser/theme golden-calibration corpus)

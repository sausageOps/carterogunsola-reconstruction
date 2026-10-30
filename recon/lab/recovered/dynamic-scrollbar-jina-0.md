Title: Dynamic Scrollbar :: Lab :: Carter Ogunsola

URL Source: https://carterogunsola.com/lab/dynamic-scrollbar

Markdown Content:
UT::11:35MDT FPS::39 ONLINE::68 LCP::1.7s CARTER::HERE PRESENCE::ON LISTENING::Booking::Q1’27

[C Motion](https://carterogunsola.com/)::Dynamic Scrollbar

*   [A b o u t](https://carterogunsola.com/about)
*   [L a b](https://carterogunsola.com/lab)
*   [W r i t i n g](https://carterogunsola.com/writing)
*   [S t u d i o](https://carterogunsola.com/studio)
*   [C o n t a c t](https://carterogunsola.com/contact)

⌘K

# Dynamic Scrollbar — Lab experiment

Notes Code

UI

A slim gray bar that inks to black and blooms into a live analog clock as you scroll, then taps open into a working native-audio mini player. A faithful rebuild of Xavier Jac's three-state Webflow scrollbar, on its own Lenis-style smooth scroll.

Dependencies

[GSAP Core :: ticker + tweens](https://gsap.com/)

## A scrollbar with somewhere to be

The scrollbar is the one piece of UI everyone ignores. This one earns a look. Scroll and the slim gray rail on the right inks to black and blooms into a little panel with a live analog clock; stop, and it settles back to a bar. Reach a section about music and a note surfaces on it. Tap that, and the whole capsule opens into a working mini player. You can also just grab the bar and scrub, the way a scrollbar should let you.

It’s a rebuild of a Webflow piece by Xavier Jac, ported to run as one self-contained module: the exact colors and dimensions, but native audio instead of Howler and its own scroll instead of the page’s.

## One capsule, three sizes

Default is the 5×64 bar. Bloomed is a 50×188 clock. Tapped is a 264×397 player. One capsule does all three: it resizes, the panels blur-crossfade inside it, and the background inks gray→black as it grows.

The part worth stealing is what _doesn’t_ animate together. Size and position are two separate jobs. The ticker owns the vertical position every frame (it centers the capsule on your place in the scroll, then clamps it to the rail), while an interruptible tween owns the width and height. The first draft let one GSAP Flip own both, and it fought itself: the bar froze mid-morph then snapped ~160px to catch up, and a bloom near the bottom slid out from under the cursor and flickered. Centering on the cursor point is what fixes the flicker: the capsule is always taller than the bar, so a bloom still covers wherever you were hovering and can’t slide away from you.

## The feel

Blooming runs `0.65s`, collapsing `0.6s`, both `power3.inOut`; the background inks over `0.8s`. The clock only shows while you’re actually moving: a `150ms` pause settles it back to the bar, short enough to feel immediate but long enough that a stutter mid-scroll doesn’t flap it on and off. The scroll is self-owned (`λ9`), Lenis-style momentum without the dependency, which also hands the bar the exact velocity it reacts to instead of guessing.

## The player is real

Native HTML5 `Audio`: play, pause, seek by dragging the timeline, skip tracks, with the wave bars animating only while sound is playing and freezing the instant you pause. Going native instead of Howler means it survives being copied out of here with nothing to install. It also knows its place. Scroll away, or drift out of the music section, and it drops back to the clock while the track keeps playing. One bug here is easy to hit. The play and pause glyphs are stacked in the same spot, so the hidden one needs `pointer-events: none`, or it eats the click and play only fires when you happen to catch the edge.

## Make it yours

*   **`MORPH_IN` / `MORPH_OUT`** — the bloom and collapse durations (`0.65` / `0.6`). The two knobs for how the capsule transforms.
*   **The state sizes** (`THUMB_*`, `MIN_*`, `MUSIC_*`) — the bar, clock, and player dimensions. Change them and the morph re-targets on its own.
*   **`--sb-accent`** — the single spot of color, on the clock hands, the note, and the wave. `#ff4d00` here; everything else is the original’s grayscale.
*   **`REST_DELAY`** — the stillness before the clock collapses (`150ms`). Drop it for a snappier bar, raise it if quick scrolls make it flicker.

Credits

[Xavier Jac :: original scrollbar](https://x.com/KMkota0)

Setup

```
1<!-- GSAP (from CDN) -->2<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>3
4<!-- Site tokens the styles use — swap freely -->5<style>6  :root {7    --font-sans: "Oracle", "Geist", system-ui, sans-serif;8    --font-mono: "PP Neue Montreal Mono", "Geist Mono", ui-monospace, monospace;9    --track: -0.02em;10    --paper: #d6d6d5;11    --ink: #1e1e1e;12    --ink-muted: rgba(30, 30, 30, 0.7);13    --ease-out-quad: cubic-bezier(0.5, 1, 0.89, 1);14  }15</style>16
17<!-- Sized stage — the script fills it -->18<div class="stage" style="position: relative; height: 100vh; background: var(--paper);"></div>19
20<!-- Then the Script, inside <script> (CodePen's JS panel does this for you) -->
```

Style

```
1.sb {2  position: absolute;3  inset: 0;4  overflow: hidden;5  font-family: var(--font-sans);6  --sb-paper: #f2f2f2;7  --sb-rest: #d5d5d5;8  --sb-ink: #000;9  --sb-accent: #ff4d00;10  --sb-muted: #727272;11  --sb-track: #282828;12}13
14.sb__scroll {15  position: absolute;16  inset: 0;17  overflow: hidden;18  touch-action: none;19}20
21.sb__track {22  will-change: transform;23}24
25.sb__section {26  height: var(--sb-vh,100%);27  display: grid;28  place-items: center;29  padding: 2rem 4rem;30  box-sizing: border-box;31}32
33.sb__caption {34  max-width: 22ch;35  text-align: center;36  color: var(--ink-muted);37  font-size: clamp(1.1rem,2vw,1.6rem);38  line-height: 1.25;39  letter-spacing: var(--track);40  text-wrap: balance;41}42
43.sb__bar {44  position: absolute;45  top: 0.75rem;46  right: 0.75rem;47  bottom: 0.75rem;48  width:$ {49    MUSIC_W50  }51  px;52  pointer-events: none;53  z-index: 5;54}55
56.sb__thumb {57  position: absolute;58  top: 0;59  right: 0;60  width:$ {61    THUMB_W62  }63  px;64  height:$ {65    THUMB_H66  }67  px;68  background: var(--sb-rest);69  color: var(--sb-paper);70  border-radius:$ {71    RADIUS72  }73  px;74  pointer-events: auto;75  cursor: pointer;76  will-change: transform;77}78
79.sb__thumb::before {80  content: "";81  position: absolute;82  inset: -16px;83}84
85.sb__inner {86  position: absolute;87  inset: 0;88  overflow: hidden;89  border-radius: inherit;90}91
92.sb__min {93  position: absolute;94  inset: 0;95  display: flex;96  flex-direction: column;97  align-items: center;98  justify-content: space-between;99  padding: 10px;100  box-sizing: border-box;101  opacity: 0;102  transform: translateX(20%);103  filter: blur(30px);104  pointer-events: none;105}106
107.sb__min-top {108  display: flex;109  flex-direction: column;110  align-items: center;111  gap: 12px;112}113
114.sb__clock {115  width: 28px;116  height: 28px;117  display: grid;118  place-items: center;119  border-radius: 50%;120  background: var(--sb-paper);121  color: var(--sb-accent);122}123
124.sb__clock-face {125  width: 22px;126  height: 22px;127}128
129.sb__note {130  width: 20px;131  height: 20px;132  display: grid;133  place-items: center;134  color: var(--sb-accent);135  cursor: pointer;136  pointer-events: none;137  opacity: 0;138  will-change: transform,filter,opacity;139}140
141.sb__note svg {142  width: 16px;143  height: 16px;144}145
146.sb__time {147  display: flex;148  flex-direction: column;149  align-items: center;150  gap: 2px;151  font-family: var(--font-mono);152  font-size: 10.8px;153  letter-spacing: -0.43px;154  line-height: 1.1;155  color: var(--sb-paper);156}157
158.sb__time .ampm {159  opacity: .75;160}161
162.sb__music {163  position: absolute;164  inset: 0;165  display: flex;166  flex-direction: column;167  justify-content: space-between;168  padding: 24px 20px;169  box-sizing: border-box;170  opacity: 0;171  transform: translateX(100%);172  filter: blur(30px);173  pointer-events: none;174  gap: 32px;175}176
177.sb__cov

[NOTE: "$ { NN    NAME NN  } NN  px;" segments are Jina math-mangling of single-line "${NAME}px;" templates; line numbers after each mangled region are shifted. Cross-verify against engine CSS.]

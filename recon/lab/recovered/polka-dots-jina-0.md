Title: Polka Dots :: Lab :: Carter Ogunsola

URL Source: https://carterogunsola.com/lab/polka-dots

Markdown Content:
UT::11:31MDT FPS::--ONLINE::69 LCP::1.7s CARTER::HERE PRESENCE::ON LISTENING::Booking::Q1’27

[C Motion](https://carterogunsola.com/)::Polka Dots

*   [A b o u t](https://carterogunsola.com/about)
*   [L a b](https://carterogunsola.com/lab)
*   [W r i t i n g](https://carterogunsola.com/writing)
*   [S t u d i o](https://carterogunsola.com/studio)
*   [C o n t a c t](https://carterogunsola.com/contact)

⌘K

# Polka Dots — Lab experiment

Notes Code

Canvas

A grid of dots run as one spring integration on a single ticker. The cursor repels and blooms them, a click sends a ripple through the field, and a slow wave keeps it breathing at rest.

Dependencies

[GSAP Core :: ticker, elastic ease](https://gsap.com/)

## A field that flinches

A grid of dots sitting still at a low gray. Move the cursor through them and they scatter out of its way, harder if you swipe fast, swelling and darkening to full ink as it passes. Click, and a ring pushes out through the whole field like a drop hitting water. Leave it alone and it doesn’t go dead: a slow wave keeps it breathing.

## One loop, not ten thousand tweens

The version this comes from (an old Webflow study) gave every dot its own GSAP tween and rebuilt them every frame. That falls over a few hundred dots in. Here the whole field is one integration on a single `gsap.ticker`: each dot is a small damped spring anchored to its home cell, and one pass advances all of them and paints them to a canvas. No per-dot tweens, no DOM. It’ll carry thousands of dots without noticing.

Each dot only ever does three things: get pulled back home (`SPRING 0.055`), get shoved by whatever’s near it, and shed a little speed to friction (`0.82`) so it settles instead of ringing forever.

## Repel, bloom, ripple

The cursor does two jobs at once. It repels: every dot within `REPEL_R` (116px) gets pushed along the line away from the pointer, and the faster you’re moving the harder the shove, so a slow pass nudges a dot aside and a fast swipe flicks it. And it blooms: that same nearness swells the dot’s radius (up to about ×3) and lifts it from the resting `0.2` alpha toward full ink, so a fat bright cluster follows your hand across a quiet field.

A click drops a ripple: a ring that expands at `620px/s`, shoving dots outward as its edge crosses them and fading as it travels. The idle wave is quieter still: two sines nudge each dot’s _home_ cell, so even untouched the grid drifts a couple of pixels and never looks frozen.

It’s all one ink color, read from `--ink` and re-read when you flip the site theme, so on a dark page the dots invert with everything else.

## Make it yours

*   **`REPEL_R` / `PUSH`** — how far the cursor’s wake reaches, and how hard it shoves.
*   **`BLOOM`** — how much dots swell and brighten near the pointer. Set it to `0` for pure displacement, no glow.
*   **`SPRING` / `FRICTION`** — the recovery. A stiffer spring snaps home faster; less friction lets them overshoot and wobble.

## Nothing here knows it’s a dot

Each one only tracks a home, a velocity, and whatever pushed it this frame. The crowd behavior (the wake that trails the cursor, the expanding ring, the breathing at rest) all falls out of running that one tiny rule across the whole grid at once. (Reduced-motion callers get the field with the physics off: still, even, no wave.)

Setup

```
1<!-- GSAP (from CDN) -->2<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>3
4<!-- Site tokens the styles use — swap freely -->5<style>6  :root {7    --paper: #d6d6d5;8    --ink: #1e1e1e;9  }10</style>11
12<!-- Sized stage — the script fills it -->13<div class="stage" style="position: relative; height: 100vh; background: var(--paper);"></div>14
15<!-- Then the Script, inside <script> (CodePen's JS panel does this for you) -->
```

Style

```
1.pd {2  position: absolute;3  inset: 0;4  overflow: hidden;5  cursor: crosshair;6}7
8.pd canvas {9  position: absolute;10  inset: 0;11  display: block;12  width: 100%;13  height: 100%;14}
```

Script

```
1const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));2const SPACING = 34;3const DOT_R = 2.4;4const REST_ALPHA = 0.2;5const VEL_PUSH = 0.16;6const WAVE = 2.4;7const RIPPLE_SPEED = 620;8const RIPPLE_WIDTH = 90;9const RIPPLE_PUSH = 3.4;10const DEFAULTS = {11  repelR: 116,12
13  push: 0.9,14
15  bloom: 2.1,16
17  pull: { stiffness: 0.055, damping: 0.18, mass: 1 }18};19const STYLE_ID = "exp-polka-style";20const CSS = `21.pd {22  position: absolute;23  inset: 0;24  overflow: hidden;25  cursor: crosshair;26}27
28.pd canvas {29  position: absolute;30  inset: 0;31  display: block;32  width: 100%;33  height: 100%;34}35`;36function injectStyle() {37  if (document.getElementById(STYLE_ID)) return;38  const el = document.createElement("style");39  el.id = STYLE_ID;40  el.textContent = CSS;41  document.head.appendChild(el);42}43const experiment = {44  mount(root) {45    injectStyle();46    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;47    const P = { ...DEFAULTS };48    const wrap = document.createElement("div");49    wrap.className = "pd";50    const canvas = document.createElement("canvas");51    wrap.appendChild(canvas);52    root.appendChild(wrap);53    const ctx = canvas.getContext("2d");54    let ink = [30, 30, 30];55    const resolveInk = () => {56      const probe = document.createElement("span");57      probe.style.cssText = "color:var(--ink);position:absolute;visibility:hidden";58      wrap.appendChild(probe);59      const m = getComputedStyle(probe).color.match(/\d+/g);60      probe.remove();61      if (m) ink = [Number(m[0]), Number(m[1]), Number(m[2])];62    };63    resolveInk();64    const themeObs = new MutationObserver(resolveInk);65    themeObs.observe(document.documentElement, {66      attributes: true,67      attributeFilter: ["data-theme", "class"]68    });69    let dpr = 1;70    let cols = 0;71    let rows = 0;72    let dots = [];73    let W = 0;74    let H = 0;75    const measure = () => {76      W = wrap.clientWidth;77      H = wrap.clientHeight;78      dpr = Math.min(window.devicePixelRatio || 1, 2);79      canvas.width = W * dpr;80      canvas.height = H * dpr;81      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);82      const pitch = clamp(Math.min(W, H) / 18, 26, 44);83      const nextCols = Math.max(2, Math.round(W / pitch));84      const nextRows = Math.max(2, Math.round(H / pitch));85      if (nextCols === cols && nextRows === rows && dots.length) {86        const gapX = W / cols;87        const gapY = H / rows;88        dots.forEach((d, i) => {89          const hx = gapX * (i % cols + 0.5);90          const hy = gapY * (Math.floor(i / cols) + 0.5);91          d.x += hx - d.hx;92          d.y += hy - d.hy;93          d.hx = hx;94          d.hy = hy;95        });96        return false;97      }98      cols = nextCols;99      rows = nextRows;100      return true;101    };102    const seed = (bloom) => {103      const gapX = W / cols;104      const gapY = H / rows;105      dots = [];106      for (let r = 0; r < rows; r++) {107        for (let c = 0; c < cols; c++) {108          const hx = gapX * (c + 0.5);109          const hy = gapY * (r + 0.5);110          dots.push({111            hx,112            hy,113            x: hx,114            y: hy,115            vx: 0,116            vy: 0,117            appear: reduced || !bloom ? 1 : 0118          });119        }120      }121      if (bloom && !reduced) intro();122    };123    const build = (bloom = true) => {124      if (measure()) seed(bloom);125    };126    let introTween = null;127    const intro = () => {128      introTween?.kill();129      if (reduced) return;130      dots.forEach((d) => d.appear = 0);131      introTween = gsap.to(dots, {132        appear: 1,133        duration: 1.1,134        ease: "elastic.out(1, 0.55)",135        delay: 0.15,136        stagger: { each: 35e-

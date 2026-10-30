Title: Heart :: Lab :: Carter Ogunsola

URL Source: https://carterogunsola.com/lab/heart

Markdown Content:
UT::--:--FPS::--ONLINE::--LCP::--CARTER::HERE PRESENCE::ON LISTENING::Booking::Q1’27

[C Motion](https://carterogunsola.com/)::

*   [About](https://carterogunsola.com/about)
*   [Lab](https://carterogunsola.com/lab)
*   [Writing](https://carterogunsola.com/writing)
*   [Studio](https://carterogunsola.com/studio)
*   [Contact](https://carterogunsola.com/contact)

⌘K

# Heart — Lab experiment

Notes Code

Canvas New

Taubin's implicit heart surface, solved into a point cloud and spun on canvas. Grab it and it coasts on its own momentum, the outer points trailing elastically, tone carried by a monochrome halftone.

Dependencies

[GSAP Core :: ticker](https://gsap.com/)

## A textbook figure with a pulse

There’s a famous equation that draws a heart in 3D: Taubin’s surface, the one calculus tools trot out to show off implicit graphing. As a wireframe it’s correct and completely cold: a diagram of a heart with no heart in it. This is the same equation. Grab it and it spins, coasts, and trails after your hand. The interaction is the pulse.

## Solving a shape instead of drawing it

You can’t just plot an implicit surface `F(x,y,z) = 0`; there’s no list of points to draw. So we find them. The equation only ever uses `y²`, so for each `(x, z)` cell of a grid we treat it as “how thick is the heart here?” and solve for `y`: step outward until `F` flips sign, then bisect ~22 times onto the crossing. Take the root, mirror it to `±y`, and that column contributes two points. Do that across a 100×120 grid and the equation becomes a ~12k-point cloud, computed once, on load. Each point also gets a normal straight from the analytic gradient `∇F`, which is what lets it catch light and hide its back.

After that every frame is cheap: rotate the baked points, project them through a perspective camera (focal `1500`) onto the canvas, draw a dot.

## The feel is in the trailing

`w += dx * 0.05;            // your drag becomes angular velocityw *= Math.exp(-dt / 2);    // which bleeds off — it coasts, half-life ~1.4syaw += w * dt;`

A flick sets the whole thing spinning and it keeps going on momentum, slowing on its own. The nice part happens _around_ that. The points don’t rotate rigidly. Each radial ring lags toward the current spin at a rate that falls off with distance from the axis (`1/(0.72 − 0.38·r)`), so the outer shell smears elastically behind the core. The cloud breathes as it turns instead of moving like one solid thing.

Tone is a **halftone**: a back-face cull drops every point facing away, and a Lambert term against a fixed light sorts the rest into three opacity tiers. Dot _size_ only ever tracks depth, never brightness, so the shading reads through density and opacity the way a printed halftone does. All monochrome, drawn in `--ink` on the stage’s own surface; flip the site theme and it re-inks.

## Make it yours

*   **`SPIN_GAIN` / `FRICTION_TAU`** — how hard a drag throws it, and how long it coasts. Lower τ and it stops sooner.
*   **`NX` / `NZ`** — grid resolution, the point count. Denser is lusher and heavier; ~12k is the sweet spot for canvas 2D at 60fps.
*   **The Lambert thresholds** (`0.26` / `0.62`) — where the three tone tiers split. Widen the middle band for a flatter read.
*   **`FOCAL`** — smaller exaggerates the perspective; the heart bulges toward you.

## No interaction, no heart

It’s just math until someone touches it. That’s the whole experiment. The equation was always a heart; it only _feels_ like one once it answers you.

Credits

[Tolis C :: tol.is/heart](https://tol.is/heart)

Setup

```
1<!-- GSAP (from CDN) -->2<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>3
4<!-- Site tokens the styles use — swap freely -->5<style>6  :root {7    --paper: #d6d6d5;8    --ink: #1e1e1e;9  }10</style>11
12<!-- Sized stage — the script fills it -->13<div class="stage" style="position: relative; height: 100vh; background: var(--paper);"></div>14
15<!-- Then the Script, inside <script> (CodePen's JS panel does this for you) -->
```

Style

```
1.heart {2  position: absolute;3  inset: 0;4  overflow: hidden;5  cursor: grab;6  touch-action: none;7}8
9.heart.is-drag {10  cursor: grabbing;11}12
13.heart canvas {14  position: absolute;15  inset: 0;16  display: block;17  width: 100%;18  height: 100%;19}
```

Script

```
1const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));2const A = 2.25;3const B = 0.1125;4const surf = (x, t, z) => {5  const Q = x * x + A * t + z * z - 1;6  return Q * Q * Q - z * z * z * (x * x + B * t);7};8const MAX_SCALE = 1.7;9const SPIN_CLAMP = 18;10const DEFAULTS = {11  spin: 0.05,12
13  coast: 2,14
15  focal: 150016
17};18const LIGHT = (() => {19  const l = [-0.35, 0.5, 0.74];20  const n = Math.hypot(l[0], l[1], l[2]);21  return [l[0] / n, l[1] / n, l[2] / n];22})();23const BANDS = 24;24const STYLE_ID = "exp-heart-style";25const CSS = `26.heart {27  position: absolute;28  inset: 0;29  overflow: hidden;30  cursor: grab;31  touch-action: none;32}33
34.heart.is-drag {35  cursor: grabbing;36}37
38.heart canvas {39  position: absolute;40  inset: 0;41  display: block;42  width: 100%;43  height: 100%;44}45`;46function injectStyle() {47  if (document.getElementById(STYLE_ID)) return;48  const el = document.createElement("style");49  el.id = STYLE_ID;50  el.textContent = CSS;51  document.head.appendChild(el);52}53const experiment = {54  mount(root) {55    injectStyle();56    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;57    const CFG = { ...DEFAULTS };58    const wrap = document.createElement("div");59    wrap.className = "heart";60    const canvas = document.createElement("canvas");61    wrap.appendChild(canvas);62    root.appendChild(wrap);63    const ctx = canvas.getContext("2d");64    let ink = "30,30,30";65    const resolveInk = () => {66      const probe = document.createElement("span");67      probe.style.cssText = "color:var(--ink);position:absolute;visibility:hidden";68      wrap.appendChild(probe);69      const m = getComputedStyle(probe).color.match(/\d+/g);70      probe.remove();71      if (m) ink = `${m[0]},${m[1]},${m[2]}`;72    };73    resolveInk();74    const themeObs = new MutationObserver(resolveInk);75    themeObs.observe(document.documentElement, {76      attributes: true,77      attributeFilter: ["data-theme", "class"]78    });79    const mobile = Math.min(window.innerWidth, window.innerHeight) < 1024;80    const NX = mobile ? 70 : 100;81    const NZ = mobile ? 84 : 120;82    const X0 = -1.35;83    const X1 = 1.35;84    const Z0 = -1.15;85    const Z1 = 1.45;86    const px = [];87    const py = [];88    const pz = [];89    const nxA = [];90    const nyA = [];91    const nzA = [];92    for (let i = 0; i < NX; i++) {93      const x = X0 + (X1 - X0) * i / (NX - 1);94      for (let j = 0; j < NZ; j++) {95        const z = Z0 + (Z1 - Z0) * j / (NZ - 1);96        if (surf(x, 0, z) >= 0) continue;97        let a = 0;98        let b = 0;99        let found = false;100        for (let s = 1; s <= 150; s++) {101          const t2 = s / 150;102          if (surf(x, t2, z) >= 0) {103            a = (s - 1) / 150;104            b = t2;105            found = true;106            break;107          }108        }109        if (!found) continue;110        for (let k = 0; k < 22; k++) {111          const m = (a + b) / 2;112          if (surf(x, m, z) < 0) a = m;113          else b = m;114        }115        const t = (a + b) / 2;116        const y = Math.sqrt(t);117        const Q = x * x + A * t + z * z - 1;118        const Q2 = Q * Q;119        const gx = 2 * x * (3 * Q2 - z * z * z);120        const gz = 6 * z * Q2 - 3 * z * z * (x * x + B * t);121        const gy = y * (13.5 * Q2 - 0.225 * z * z * z);122        for (const sign of [1, -1]) {123          px.push(x);124          py.push(z);125          pz.push(sign * y);126          nxA.push(gx);127          ny
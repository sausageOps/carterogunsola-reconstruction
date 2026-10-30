e pinches. Under 1 the lobes bite; over 1 they swell back toward a ball.

Reduced-motion callers get the scene without the drift: no auto-rotate, no idle loop, just a frame rendered on load and again whenever you orbit it yourself.

Credits

[Lantern :: CC0 (Khronos glTF samples)](https://github.com/KhronosGroup/glTF-Sample-Assets/tree/main/Models/Lantern)[Johan Gielis :: the superformula (1997)](https://en.wikipedia.org/wiki/Superformula)

Setup

```
1<!-- Three.js via import map (ES modules) -->2<script type="importmap">3{4  "imports": {5    "three": "https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js",6    "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.185.1/examples/jsm/"7  }8}9</script>10
11<!-- Site tokens the styles use — swap freely -->12<style>13  :root {14    --font-sans: "Oracle", "Geist", system-ui, sans-serif;15    --font-mono: "PP Neue Montreal Mono", "Geist Mono", ui-monospace, monospace;16    --fs-mono-meta: 0.75rem;17    --paper: #d6d6d5;18    --ink: #1e1e1e;19    --ink-muted: rgba(30, 30, 30, 0.7);20    --surface: #fdfcfb;21    --fill: rgba(30, 30, 30, 0.08);22    --line: rgba(30, 30, 30, 0.06);23    --shadow-control: 0 0 0 1px rgba(30, 30, 30, 0.06), 0 2px 6px -2px rgba(30, 30, 30, 0.14);24    --shadow-seg: 0 0 0 1px rgba(30, 30, 30, 0.04), 0 1px 2px rgba(30, 30, 30, 0.02);25    --r-sm: 4px;26    --r-md: 6px;27    --s-2: 2px;28    --s-4: 4px;29    --s-8: 8px;30    --s-12: 12px;31    --s-16: 16px;32    --s-32: 32px;33    --s-40: 40px;34    --ease-out-quad: cubic-bezier(0.5, 1, 0.89, 1);35    --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);36  }37</style>38
39<!-- Sized stage — the script fills it -->40<div class="stage" style="position: relative; height: 100vh; background: var(--paper);"></div>41
42<!-- Then the Script, inside <script type="module"> (CodePen's JS panel does this for you) -->
```

Style

```
1.tj {2  position: absolute;3  inset: 0;4  overflow: hidden;5  font-family: var(--font-sans);6  --three-accent: var(--ink);7  cursor: grab;8  touch-action: none;9}10
11.tj:active {12  cursor: grabbing;13}14
15.tj canvas {16  position: absolute;17  inset: 0;18  display: block;19  width: 100%;20  height: 100%;21}22
23.tj__loading {24  position: absolute;25  left: 50%;26  top: 50%;27  translate: -50% -50%;28  display: flex;29  flex-direction: column;30  align-items: center;31  gap: var(--s-12,0.75rem);32  font-family: var(--font-mono);33  font-size: var(--fs-mono-meta,0.75rem);34  text-transform: uppercase;35  letter-spacing: 0.06em;36  color: var(--ink-muted);37  transition: opacity 0.4s ease;38  pointer-events: none;39}40
41.tj__loading .spin {42  --spin-size: 1.75rem;43}44
45.tj[data-ready] .tj__loading {46  opacity: 0;47}48
49.tj__bars {50  position: absolute;51  inset-block-start: var(--s-16,1rem);52  inset-inline-start: 50%;53  translate: -50% 0;54  z-index: 2;55  display: flex;56  flex-direction: column;57  align-items: center;58  gap: var(--s-8,0.5rem);59  max-inline-size: calc(100% - var(--s-32,2rem));60}61
62.tj__modes {63  position: relative;64  isolation: isolate;65  display: inline-flex;66  align-items: center;67  padding: var(--s-2,2px);68  height: var(--s-40,2.5rem);69  max-inline-size: 100%;70  background: var(--surface);71  border: 1px solid var(--line);72  border-radius: var(--r-md,6px);73  box-shadow: var(--shadow-control,0 1px 3px rgba(30,30,30,0.06));74}75
76.tj__pill {77  position: absolute;78  inset-block: var(--s-2,2px);79  inset-inline-start: var(--s-2,2px);80  width: 0;81  border-radius: var(--r-sm,4px);82  background: var(--fill);83  box-shadow: var(--shadow-seg,0 1px 2px rgba(30,30,30,0.05));84  transition: transform 0.4s var(--ease-out-expo,cubic-bezier(0.16,1,0.3,1)), width 0.4s var(--ease-out-expo,cubic-bezier(0.16,1,0.3,1));85}86
87.tj__seg {88  position: relative;89  z-index: 1;90  display: inline-flex;91  align-items: center;92  justify-content: center;93  min-width: 4.4rem;94  height: 100%;95  padding-inline: var(--s-12,0.75rem);96  border: 0;97  background: transparent;98  font-family: var(--font-mono);99  font-size: var(--fs-mono-meta,0.75rem);100  text-transform: uppercase;101  letter-spacing: 0.04em;102  color: var(--ink-muted);103  cursor: pointer;104  transition: color 0.3s var(--ease-out-quad,cubic-bezier(0.5,1,0.89,1)),scale 0.15s ease;105}106
107.tj__seg[aria-pressed="true"] {108  color: var(--ink);109}110
111.tj__seg:hover {112  color: var(--ink);113}114
115.tj__seg:active {116  scale: 0.94;117}118
119.tj__seg:focus-visible {120  outline: 2px solid var(--ink);121  outline-offset: -2px;122  border-radius: var(--r-sm,4px);123}124
125@media (max-width: 40rem) {126  .tj__seg {127    min-width: 0;128    padding-inline: var(--s-8,0.5rem);129  }130}131
132@media (prefers-reduced-motion: reduce) {133  .tj__pill {134    transition: none;135  }136}
```

Script

```
1import * as THREE from "three";2import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";3import { OrbitControls } from "three/addons/controls/OrbitControls.js";4import { MeshSurfaceSampler } from "three/addons/math/MeshSurfaceSampler.js";5import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";6const MODEL = "https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Assets@2bac6f8c57bf471df0d2a1e8a8ec023c7801dddf/Models/Lantern/glTF-Binary/Lantern.glb";7const FIT = 2.4;8const SEG_U = 120;9const SEG_V = 72;10const SUBJECTS = [11  { id: "lantern", label: "Lantern", sf: null },12
13  { id: "orb", label: "Orb", sf: { m1: 6, n11: 2.4, n12: 1.1, n13: 1.1, m2: 6, n21: 2.4, n22: 1.1, n23: 1.1 } },14  { id: "bloom", label: "Bloom", sf: { m1: 8, n11: 0.5, n12: 1.7, n13: 1.7, m2: 8, n21: 0.5, n22: 1.7, n23: 1.7 } },15  { id: "shell", label: "Shell", sf: { m1: 3, n11: 0.7, n12: 0.6, n13: 3.2, m2: 6, n21: 1.6, n22: 0.8, n23: 0.8 } },16  { id: "spike", label: "Spike", sf: { m1: 12, n11: 0.3, n12: 1, n13: 1, m2: 12, n21: 0.3, n22: 1, n23: 1 } }17];18const sfRadius = (angle, m, n1, n2, n3) => {19  const t = m * angle / 4;20  const r = Math.abs(Math.cos(t)) ** n2 + Math.abs(Math.sin(t)) ** n3;21  const out = r === 0 ? 0 : r ** (-1 / n1);22  return Number.isFinite(out) ? Math.min(out, 6) : 0;23};24function sfPositions(sf, out) {25  let i = 0;26  let max = 0;27  for (let v = 0; v <= SEG_V; v++) {28    const lat = -Math.PI / 2 + Math.PI * v / SEG_V;29    const r2 = sfRadius(lat, sf.m2, sf.n21, sf.n22, sf.n23);30    const cy = Math.cos(lat);31    for (let u = 0; u <= SEG_U; u++) {32      const lon = -Math.PI + 2 * Math.PI * u / SEG_U;33      const r1 = sfRadius(lon, sf.m1, sf.n11, sf.n12, sf.n13);34      const x = r1 * Math.cos(lon) * r2 * cy;35      const y = r2 * Math.sin(lat);36      const z = r1 * Math.sin(lon) * r2 * cy;37      out[i++] = x;38      out[i++] = y;39      out[i++] = z;40      max = Math.max(max, Math.abs(x), Math.abs(y), Math.abs(z));41    }42  }43  const row = (SEG_U + 1) * 3;44  for (let v = 0; v <= SEG_V; v++) {45    const a = v * row;46    const b = a + SEG_U * 3;47    out[b] = out[a];48    out[b + 1] = out[a + 1];49    out[b + 2] = out[a + 2];50  }51  const k = max > 0 ? FIT / 2.9 / max : 1;52  for (let j = 0; j < out.length; j++) out[j] *= k;53}54function sfIndex() {55  const idx = new Uint32Array(SEG_U * SEG_V * 6);56  let i = 0;57  for (let v = 0; v < SEG_V; v++) {58    for (let u = 0; u < SEG_U; u++) {59      const a = v * (SEG_U + 1) + u;60      const b = a + 1;61      const c = a + SEG_U + 1;62      const d = c + 1;63      idx[i++] = a;64      idx[i++] = c;65      idx[i++] = b;66      idx[i++] = b;67      idx[i++] = c;68      idx[i++] = d;69    }70  }71  return idx;72}73const expoOut = (t) => t >= 1 ? 1 : 1 - 2 ** (-10 * t);74const MODES = [75  { id: "shaded", label: "Shaded" },76  { id: "wire", label: "Wire" },77  { id: "points", label: "Points" }78];79const FINISHES = [80  { id: "studio", label: "Studio", mat: { color: 15921906, roughness: 0.52, metalness: 0.05 } },81  { id: "chrome", label: "Chrome", mat: { color: 16777215, roughness: 0.06, metalness: 1 } },82  { id: "wax", la

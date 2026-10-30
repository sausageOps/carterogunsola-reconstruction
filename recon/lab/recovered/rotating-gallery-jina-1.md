transition: background-color .25s var(--ease-out-quad),color .25s var(--ease-out-quad),scale .15s var(--ease-out-quad);181}182
183.rg__view-btn svg {184  width: 1rem;185  height: 1rem;186  fill: currentColor;187}188
189.rg__view-btn:hover {190  color: var(--ink);191}192
193.rg__view-btn:active {194  scale: .96;195}196
197.rg__view-btn[data-active="true"] {198  background: var(--surface);199  color: var(--ink);200  box-shadow: 0 1px 2px rgba(0,0,0,.12);201}202
203.rg__view-btn:focus-visible {204  outline: 2px solid var(--ink);205  outline-offset: 2px;206}207
208@media (max-width:47.99rem) {209  .rg__grid {210    grid-template-columns: repeat(2,1fr);211  }212}
```

Script

```
1const asset = (key) => `https://assets.carterogunsola.com/${key.replace(/^\/+/, "")}`;2const PLATES = [3  [1, "DRIFT"],4  [4, "FOLD"],5  [7, "BLOOM"],6  [10, "STATIC"],7  [13, "EMBER"],8  [16, "TIDE"],9  [19, "GRAIN"],10  [22, "PRISM"],11  [25, "HUSK"],12  [28, "VAPOR"]13];14const ITEMS = PLATES.map(([n, title]) => ({15  src: asset(`cdn-cgi/image/width=640,quality=86,format=auto/dts/unwrapped/DTS_Unwrapped_by_FRANCO_DUPUY_${n}.jpg`),16  title17}));18const N = ITEMS.length;19const DEG = Math.PI / 180;20const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));21const mod = (i, n) => (i % n + n) % n;22const damp = (cur, target, lambda, dt) => cur + (target - cur) * (1 - Math.exp(-lambda * dt));23const SLICE = 360 / N;24const PHASE = 180;25const MOMENTUM_DECAY = 1.3;26const DRAG_SCALE = 0.2;27const SCROLL_SCALE = 0.22;28const LOCK_PX = 5;29const FLIP_DUR = 1.4;30const IMG_EASE = [0.16, 1, 0.3, 1];31const DIGIT_DAMP = 8;32let rgEaseSeq = 0;33const toEase = (id, b) => CustomEase.create(id, `M0,0 C${b[0]},${b[1]} ${b[2]},${b[3]} 1,1`);34const EASES = {35  glide: "power3.inOut",36  snap: "back.inOut(1.4)",37  spring: "back.inOut(2.2)"38
39};40const DEFAULTS = {41  drift: 4,42
43  weight: 8,44
45  perspective: 4e3,46
47  morph: "spring",48  imgEase: IMG_EASE49
50};51const STYLE_ID = "exp-rg-style";52const CSS = `53.rg {54  position: absolute;55  inset: 0;56  overflow: hidden;57  font-family: var(--font-sans);58  --rg-card-w: 12rem;59  --rg-ratio: 1.08;60  touch-action: none;61  -webkit-user-select: none;62  user-select: none;63  outline: none;64}65
66.rg__stage {67  position: absolute;68  inset: 0;69  cursor: grab;70  isolation: isolate;71}72
73.rg.is-dragging .rg__stage {74  cursor: grabbing;75}76
77.rg[data-view="grid"] .rg__stage {78  cursor: default;79}80
81.rg__carousel {82  position: absolute;83  left: 50%;84  top: 49%;85  transform: translate(-50%,-50%);86}87
88.rg__item {89  position: absolute;90  left: 0;91  top: 0;92  will-change: transform;93}94
95.rg__flip {96  display: block;97  width: var(--rg-card-w);98  height: calc(var(--rg-card-w)*var(--rg-ratio));99  border-radius: var(--r-xs);100  overflow: hidden;101  background: var(--card-solid);102  text-decoration: none;103}104
105.rg__img {106  width: 100%;107  height: 100%;108  object-fit: cover;109  display: block;110  transform: scale(1);111  -webkit-user-drag: none;112  user-select: none;113  pointer-events: none;114}115
116.rg__grid {117  position: absolute;118  inset: 0;119  display: grid;120  gap: clamp(.5rem,1.4vw,1.1rem);121  padding: clamp(1rem,4vw,3.5rem);122  align-content: center;123  grid-template-columns: repeat(5,1fr);124  pointer-events: none;125  opacity: 0;126}127
128.rg[data-view="grid"] .rg__grid {129  pointer-events: auto;130  opacity: 1;131}132
133.rg__slot {134  position: relative;135  aspect-ratio: 1 / var(--rg-ratio);136}137
138.rg__grid .rg__flip {139  width: 100%;140  height: 100%;141}142
143.rg__hud {144  position: absolute;145  inset-inline: 0;146  bottom: 0;147  z-index: 5;148  pointer-events: none;149  display: flex;150  align-items: flex-end;151  justify-content: space-between;152  padding: clamp(1rem,2.5vw,2rem);153  gap: 1rem;154}155
156.rg__meta {157  display: flex;158  align-items: baseline;159  gap: .7rem;160  color: var(--ink);161}162
163.rg__odo {164  display: inline-flex;165  font-family: var(--font-mono);166  font-variant-numeric: tabular-nums;167  font-size: clamp(1.6rem,3vw,2.6rem);168  line-height: 1;169  letter-spacing: -.02em;170}171
172.rg__odo-col {173  display: block;174  height: 1em;175  overflow: hidden;176}177
178.rg__odo-strip {179  display: block;180  will-change: transform;181}182
183.rg__odo-num {184  display: block;185  height: 1em;186  line-height: 1;187  text-align: center;188}189
190.rg__name {191  font-family: var(--font-mono);192  text-transform: uppercase;193  letter-spacing: .08em;194  font-size: var(--fs-mono-meta,.75rem);195  color: var(--ink-muted);196  overflow: hidden;197  height: 1.1em;198}199
200.rg__name-strip {201  display: block;202  will-change: transform;203}204
205.rg__name-item {206  display: block;207  height: 1.1em;208  line-height: 1.1;209  white-space: nowrap;210}211
212.rg__views {213  display: inline-flex;214  gap: .25rem;215  pointer-events: auto;216  padding: .2rem;217  border-radius: var(--r-sm);218  background: var(--fill);219}220
221.rg__view-btn {222  display: grid;223  place-items: center;224  width: 2rem;225  height: 2rem;226  border: 0;227  padding: 0;228  border-radius: calc(var(--r-sm) - .15rem);229  background: transparent;230  color: var(--ink-muted);231  cursor: pointer;232  transition: background-color .25s var(--ease-out-quad),color .25s var(--ease-out-quad),scale .15s var(--ease-out-quad);233}234
235.rg__view-btn svg {236  width: 1rem;237  height: 1rem;238  fill: currentColor;239}240
241.rg__view-btn:hover {242  color: var(--ink);243}244
245.rg__view-btn:active {246  scale: .96;247}248
249.rg__view-btn[data-active="true"] {250  background: var(--surface);251  color: var(--ink);252  box-shadow: 0 1px 2px rgba(0,0,0,.12);253}254
255.rg__view-btn:focus-visible {256  outline: 2px solid var(--ink);257  outline-offset: 2px;258}259
260@media (max-width:47.99rem) {261  .rg__grid {262    grid-template-columns: repeat(2,1fr);263  }264}265`;266function injectStyle() {267  if (document.getElementById(STYLE_ID)) return;268  const el = document.createElement("style");269  el.id = STYLE_ID;270  el.textContent = CSS;271  document.head.appendChild(el);272}273const carouselIcon = `<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="5.333" width="5.333" height="5.333"/><rect x="5.333" y="10.667" width="5.333" height="5.333"/><rect x="10.667" y="5.333" width="5.333" height="5.333"/><rect y="5.333" width="5.333" height="5.333"/></svg>`;274const gridIcon = `<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="0.25" y="0.75" width="5.333" height="5.333"/><rect x="10.583" y="0.75" width="5.333" height="5.333"/><rect x="0.25" y="10" width="5.333" height="5.333"/><rect x="10.583" y="10" width="5.333" height="5.333"/></svg>`;275const experiment = {276  mount(root) {277    injectStyle();278    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;279    const P = { ...DEFAULTS };280    const easeId = `rgImg-${rgEaseSeq++}`;281    let imgEase = toEase(easeId, P.imgEase);282    const rg = document.createElement("div");283    rg.className = "rg";284    rg.tabIndex = 0;285    rg.dataset.view = "carousel";286    const stage = document.createElement("div");287    stage.className = "rg__stage";288    const carousel = document.createElement("div");289    carousel.className = "rg__carousel";290    const grid = document.createElement("div");291    grid.className = "rg__grid";292    const flips = [];293    const imgs = [];294    const items = [];295    const slots = [];296    ITEMS.forEach((item, i) => {297      const it = document.createElement("div");298      it.className = "rg__item";299      it.style.zIndex = String(Math.round(500 + Math.cos(i * SLICE * DEG) * 100));300      const flip = document.createElement("div");301      flip.className = "rg__flip";302      flip.dataset.i = String(i);303      const img = document.createElement("img");304      img.className = "rg__img";305      img.src = item.src;306      img.alt = item.title;307 

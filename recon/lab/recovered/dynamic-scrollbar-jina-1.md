er {178  position: relative;179  width: 160px;180  height: 160px;181  align-self: center;182  border-radius: 20px;183  overflow: hidden;184  flex: none;185}186
187.sb__cover img {188  width: 100%;189  height: 100%;190  object-fit: cover;191  display: block;192}193
194.sb__player {195  display: flex;196  flex-direction: column;197  gap: 16px;198}199
200.sb__head {201  display: flex;202  justify-content: space-between;203  align-items: flex-start;204  gap: .5rem;205}206
207.sb__meta {208  display: flex;209  flex-direction: column;210  gap: 0;211  min-width: 0;212}213
214.sb__title {215  font-size: 16px;216  font-weight: 500;217  letter-spacing: -0.64px;218  color: var(--sb-paper);219  white-space: nowrap;220  overflow: hidden;221  text-overflow: ellipsis;222}223
224.sb__artist {225  font-size: 16px;226  font-weight: 500;227  letter-spacing: -0.64px;228  color: var(--sb-muted);229  white-space: nowrap;230  overflow: hidden;231  text-overflow: ellipsis;232}233
234.sb__wave {235  width: 32px;236  flex: none;237  color: var(--sb-accent);238}239
240.sb__wave svg {241  width: 100%;242  height: auto;243}244
245.sb__timeline {246  position: relative;247  height: 3px;248  border-radius: 100vw;249  overflow: hidden;250  cursor: pointer;251  background: var(--sb-track);252}253
254.sb__progress {255  position: absolute;256  inset: 0;257  background: var(--sb-rest);258  transform: scaleX(0);259  transform-origin: 0 50%;260}261
262.sb__controls {263  display: flex;264  align-items: center;265  justify-content: center;266  gap: 16px;267  color: var(--sb-paper);268}269
270.sb__ctrl {271  cursor: pointer;272  color: var(--sb-paper);273  transition: opacity .2s var(--ease-out-quad),scale .15s var(--ease-out-quad);274}275
276.sb__ctrl:hover {277  opacity: .7;278}279
280.sb__ctrl:active {281  scale: .9;282}283
284.sb__ctrl svg {285  width: 100%;286  height: 100%;287  display: block;288}289
290.sb__ctrl--sm {291  width: 28px;292  height: 28px;293}294
295.sb__toggle {296  position: relative;297  width: 32px;298  height: 32px;299}300
301.sb__toggle > * {302  position: absolute;303  inset: 0;304  width: 32px;305  height: 32px;306}307
308.sb__pause {309  opacity: 0;310  scale: .5;311  pointer-events: none;312}313
314.sb__credits {315  display: flex;316  flex-direction: column;317  gap: 2px;318}319
320.sb__credit {321  text-align: center;322  font-size: 12px;323  letter-spacing: -0.48px;324  line-height: 1.3;325  color: var(--sb-paper);326}327
328.sb__credit a {329  color: inherit;330  text-decoration: underline;331  text-underline-offset: 2px;332}333
334@media (prefers-reduced-motion: reduce) {335  .sb__scroll {336    scroll-behavior: auto;337  }338}
```

Script· tuned

```
1const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));2const damp = (cur, t, l, dt) => cur + (t - cur) * (1 - Math.exp(-l * dt));3const THUMB_W = 5;4const THUMB_H = 64;5const MIN_W = 50;6const MIN_H = 188;7const MUSIC_W = 264;8const MUSIC_H = 397;9const RADIUS = 30;10const BG_MORPH = 0.8;11const DEFAULTS = {12  morphIn: 0.65,13
14  morphOut: 0.6,15
16  restDelay: 15017
18};19const C_REST = "#d5d5d5";20const C_INK = "#000000";21const TRACKS = [22  { src: "https://carterogunsola.com/lab/music/deep-abstract-ambient_snowcap-401656.mp3", title: "D.A.A.S", artist: "Umbrella", cover: "https://carterogunsola.com/lab/covers/umbrella.jpg" },23  { src: "https://carterogunsola.com/lab/music/embrace-364091.mp3", title: "Embrace", artist: "Evgeny Bardyuzha", cover: "https://carterogunsola.com/lab/covers/embrace.jpg" },24  { src: "https://carterogunsola.com/lab/music/running-night-393139.mp3", title: "Running Night", artist: "Alex Make Music", cover: "https://carterogunsola.com/lab/covers/running-night.jpg" }25];26const SECTIONS = [27  { kind: "min", text: "Scroll the page :: the bar on the right wakes up" },28  { kind: "min", text: "Pause, or hover it, and it blooms into a clock" },29  { kind: "min", text: "Normal scrolling still works :: it just has a pulse" },30  { kind: "music", text: "A note appears. Tap it :: the player is live" },31  { kind: "music", text: "Now playing. Hover to expand, drag the timeline to seek" },32  { kind: "min", text: "Back to default :: clock only, no player" }33];34const clockSvg = `<svg viewBox="0 0 20 20" fill="none" class="sb__clock-face"><rect data-hour x="9.5" y="4" width="1" height="5.5" rx="0.5" fill="currentColor"/><rect data-min x="9.5" y="2" width="1" height="8" rx="0.5" fill="currentColor"/><circle cx="10" cy="10" r="1.25" fill="currentColor"/></svg>`;35const noteSvg = `<svg viewBox="0 0 20 20" fill="none"><path d="M19.5 14C19.5 15.933 17.933 17.5 16 17.5C14.067 17.5 12.5 15.933 12.5 14C12.5 12.067 14.067 10.5 16 10.5C16.98 10.5 17.865 10.903 18.5 11.552V5.59L7.5 7.423V16C7.5 17.933 5.933 19.5 4 19.5C2.067 19.5 0.5 17.933 0.5 16C0.5 14.067 2.067 12.5 4 12.5C4.98 12.5 5.865 12.903 6.5 13.552V2.576L19.5 0.41V14Z" fill="currentColor"/></svg>`;36const waveSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round"><line x1="2" y1="15" x2="2" y2="9"/><line x1="7" y1="19.5" x2="7" y2="4.5"/><line x1="12" y1="22" x2="12" y2="2"/><line x1="17" y1="19.5" x2="17" y2="4.5"/><line x1="22" y1="15" x2="22" y2="9"/></svg>`;37const prevSvg = `<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="10 5 1 12 10 19"/><polygon points="22 5 13 12 22 19"/></svg>`;38const nextSvg = `<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="14 19 23 12 14 5"/><polygon points="2 19 11 12 2 5"/></svg>`;39const playSvg = `<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5.2 12 5.2 3 13 7.5 20.8 12 13 16.5 5.2 21"/></svg>`;40const pauseSvg = `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6.5" y="5.5" width="3" height="13" rx="0.4"/><rect x="14.5" y="5.5" width="3" height="13" rx="0.4"/></svg>`;41const STYLE_ID = "exp-scrollbar-style";42const CSS = `43.sb {44  position: absolute;45  inset: 0;46  overflow: hidden;47  font-family: var(--font-sans);48  --sb-paper: #f2f2f2;49  --sb-rest: #d5d5d5;50  --sb-ink: #000;51  --sb-accent: #ff4d00;52  --sb-muted: #727272;53  --sb-track: #282828;54}55
56.sb__scroll {57  position: absolute;58  inset: 0;59  overflow: hidden;60  touch-action: none;61}62
63.sb__track {64  will-change: transform;65}66
67.sb__section {68  height: var(--sb-vh,100%);69  display: grid;70  place-items: center;71  padding: 2rem 4rem;72  box-sizing: border-box;73}74
75.sb__caption {76  max-width: 22ch;77  text-align: center;78  color: var(--ink-muted);79  font-size: clamp(1.1rem,2vw,1.6rem);80  line-height: 1.25;81  letter-spacing: var(--track);82  text-wrap: balance;83}84
85.sb__bar {86  position: absolute;87  top: 0.75rem;88  right: 0.75rem;89  bottom: 0.75rem;90  width:$ {91    MUSIC_W92  }93  px;94  pointer-events: none;95  z-index: 5;96}97
98.sb__thumb {99  position: absolute;100  top: 0;101  right: 0;102  width:$ {103    THUMB_W104  }105  px;106  height:$ {107    THUMB_H108  }109  px;110  background: var(--sb-rest);111  color: var(--sb-paper);112  border-radius:$ {113    RADIUS114  }115  px;116  pointer-events: auto;117  cursor: pointer;118  will-change: transform;119}120
121.sb__thumb::before {122  content: "";123  position: absolute;124  inset: -16px;125}126
127.sb__inner {128  position: absolute;129  inset: 0;130  overflow: hidden;131  border-radius: inherit;132}133
134.sb__min {135  position: absolute;136  inset: 0;137  display: flex;138  flex-direction: column;139  align-items: center;140  justify-content: space-between;141  padding: 10px;142  box-sizing: border-box;143  opacity: 0;144  transform: translateX(20%);145  filter: blur(30px);146  pointer-events: none;147}148
149.sb__min-top {150  display: flex;151  flex-direction: column;152  align-items: center;153  gap: 12px;154}155
156.sb__clock {157  width: 28px;158  height: 28px;159  display: grid;160  place-items: center;161  border-radius: 50%;162  background: var(--sb-paper);163  color: var(--sb-accent);164}165
166.sb__clock-face {167  width: 22px;168  

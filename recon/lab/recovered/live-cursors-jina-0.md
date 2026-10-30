Title: Live Cursors :: Lab :: Carter Ogunsola

URL Source: https://carterogunsola.com/lab/live-cursors

Markdown Content:
UT::11:33MDT FPS::--ONLINE::--LCP::--CARTER::HERE PRESENCE::ON LISTENING::Booking::Q1’27

[C Motion](https://carterogunsola.com/)::Live Cursors

*   [A b o u t](https://carterogunsola.com/about)
*   [L a b](https://carterogunsola.com/lab)
*   [W r i t i n g](https://carterogunsola.com/writing)
*   [S t u d i o](https://carterogunsola.com/studio)
*   [C o n t a c t](https://carterogunsola.com/contact)

⌘K

# Live Cursors — Lab experiment

Notes Code

Interaction New

Everyone else on the page, in real time. You broadcast your pointer as a 0-to-1 position, a Cloudflare Durable Object fans it out, and each peer eases toward its latest spot, on the same server that counts who's online in the header.

Dependencies

[PartyKit PartyServer :: Durable Object rooms + presence](https://www.partykit.io/)[partysocket :: reconnecting WebSocket client](https://github.com/cloudflare/partykit)[GSAP Core :: one ticker for the interpolation loop](https://gsap.com/)

## Someone else is here

Most of the web is single-player. You move your cursor, nothing moves back. Open this page in a second tab, or send it to a friend, and their pointer slides across your screen in real time, tinted and named, easing wherever they go.

## One object in the middle

Every visitor holds one WebSocket to a room called `live-cursors`, served by a single Cloudflare Durable Object (the same one that counts who’s online up in the header). You send your pointer; the object fans it out to everyone else. Nobody talks to anyone directly, which is what makes it trustworthy: the server stamps each message with the sender’s real connection id and clamps the coordinates before forwarding, so a peer can’t claim to be someone else or fling a cursor off the stage. Names and colors are derived from that id on the client and written with `textContent`, so a hostile payload has nowhere to land.

Positions travel as a pair of 0-to-1 fractions of the stage, not pixels. A peer at `0.5, 0.5` sits dead center of your stage whatever your window size. There’s no shared artwork to line up against, so relative is the honest mapping: your top-right is their top-right.

## The feel is in the easing

Raw network positions land in bursts, and drawn straight they make a cursor teleport. So each peer carries two positions, a _target_ (the last thing that arrived) and a _rendered_ one, and every frame the rendered position moves a fraction of the way toward the target. That fraction is time-based (`1 − e^(−λ·dt)`), so the glide feels the same at 30fps and 120fps instead of turning twitchy on a fast display.

You broadcast at most once every `50ms` (~20 a second, under the server’s rate cap), and even holding still your position re-sends every `4s` so you never flicker out on anyone else’s screen. Smoothing sits at `λ18`. Go `12s` with no word from a peer and their cursor is pulled, which is the thing that catches a shut laptop lid that never sends a clean goodbye.

## The moving parts

*   **The room** — one Durable Object per room name. `live-cursors` is this stage, `global` is the header count. Same server, different rooms.
*   **Normalized coordinates** — pointer stored as `x/width, y/height`, so it maps across any window size.
*   **Server-stamped id** — the relay attaches the real sender id; the client trusts nothing else on the message.
*   **Stale sweep** — drop a peer after `12s` of silence, for the disconnect that was never clean. Clean departures arrive instantly as a `leave` from the server.
*   **Keepalive** — your position re-sends every `4s` even at rest, so idle-but-present peers keep their cursor instead of blinking out.

The cursor art is Central Icons’ collaboration pointer, flipped left or right by the peer’s travel direction. Reduced-motion callers get the same cursors with the easing off: they snap to each position instead of gliding.

Built on PartyKit, by Sunil Pai, now part of Cloudflare.

Setup

```
1<!-- GSAP (from CDN) -->2<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>3<!-- partysocket via import map (ES modules) -->4<script type="importmap">5{6  "imports": {7    "partysocket": "https://cdn.jsdelivr.net/npm/partysocket@1.3.0/+esm"8  }9}10</script>11
12<!-- Site tokens the styles use — swap freely -->13<style>14  :root {15    --font-mono: "PP Neue Montreal Mono", "Geist Mono", ui-monospace, monospace;16    --fs-mono-sm: 0.625rem;17    --paper: #d6d6d5;18    --ink: #1e1e1e;19    --ink-muted: rgba(30, 30, 30, 0.7);20    --r-sm: 4px;21    --ease-out-quad: cubic-bezier(0.5, 1, 0.89, 1);22  }23</style>24
25<!-- Live cursors need a relay server of your own: deploy a PartyServer26     (github.com/cloudflare/partykit/tree/main/packages/partyserver) with a27     "presence" party, then set SITE.presence.host in the Script to its host.28     It relays {type:"cursor",x,y} as {type:"cursors",c:[[id,x,y]]} frames29     and sends {type:"leave",id} when a connection closes. -->30
31<!-- Sized stage — the script fills it -->32<div class="stage" style="position: relative; height: 100vh; background: var(--paper);"></div>33
34<!-- Then the Script, inside <script type="module"> (CodePen's JS panel does this for you) -->
```

Style

```
1.lc {2  position: absolute;3  inset: 0;4  overflow: hidden;5}6
7.lc__hint {8  position: absolute;9  inset: 0;10  display: grid;11  place-items: center;12  padding: 2rem;13  text-align: center;14  color: var(--ink-muted);15  font-family: var(--font-mono);16  font-size: var(--fs-mono-sm,0.8rem);17  letter-spacing: 0.02em;18  transition: opacity .4s var(--ease-out-quad);19  pointer-events: none;20}21
22.lc__peer {23  position: absolute;24  top: 0;25  left: 0;26  will-change: transform;27  pointer-events: none;28  transform-origin: top left;29}30
31.lc__ptr {32  display: block;33  filter: drop-shadow(0 1px 2px rgba(0,0,0,0.18));34}35
36.lc__ptr svg {37  display: block;38  width: 22px;39  height: 22px;40}41
42.lc__name {43  position: absolute;44  top: 18px;45  left: 16px;46  white-space: nowrap;47  padding: 2px 6px;48  border-radius: var(--r-sm,4px);49  font-family: var(--font-mono);50  font-size: 0.62rem;51  letter-spacing: 0.02em;52  color: #fff;53  transform: translateZ(0);54}
```

Script

```
1import PartySocket from "partysocket";2const SITE = {3  "presence": {4    "host": "your-partyserver.example"5  }6};7const leftSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path d="M13.6262 12.7752L18.0914 11.0286C19.4037 10.5153 19.3481 8.63955 18.0078 8.20483L6.29674 4.40666C5.13162 4.02878 4.02927 5.13113 4.40715 6.29625L8.20532 18.0073C8.64004 19.3477 10.5158 19.4032 11.0291 18.0909L12.7757 13.6257C12.9282 13.236 13.2365 12.9277 13.6262 12.7752Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 14L16.6049 15.7762C16.2277 15.9286 15.9286 16.2277 15.7762 16.6049L14 21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';8const rightSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path d="M10.3739 12.7752L5.90868 11.0286C4.59639 10.5153 4.65197 8.63955 5.99235 8.20483L17.7034 4.40666C18.8685 4.02878 19.9708 5.13113 19.593 6.29625L15.7948 18.0073C15.3601 19.3477 13.4843 19.4032 12.971 18.0909L11.2244 13.6257C11.072 13.236 10.7636 12.9277 10.3739 12.7752Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 14L7.39513 15.7762C7.77231 15.9286 8.07141 16.2277 8.22383 16.6049L10 21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';9const clamp01 = (v) => v < 0 ? 0 : v > 1 ? 1 : v;10const SEND_MS = 50;11const KEEPALIVE_MS = 4e3;12const HEARTBEAT_MS = 2e4;13const STALE_MS = 12e3;14const DEFAULTS = {15  smoothing: 18,16
17  size: 118
19};20const COLORS = ["#3f76b5", "#838348", "#c2661f", "#9c6

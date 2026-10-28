// Recovered Contact engine from src/letter.LA9KroNb.js. Imports use the shared Phase 1 runtime.
// The original `counter=open` demo is deliberately disabled: receipt requires a real successful POST.
import { f as e, i as t, o as n, u as r } from "./mesh.ts";
import {
  l as i,
  t as a,
} from "./runtime.ts";
import {
  $ as o,
  C as s,
  J as c,
  Lt as l,
  Rt as u,
  Y as d,
  bt as f,
  d as p,
  dt as ee,
  h as m,
  n as h,
  ot as te,
  p as ne,
  r as re,
  t as ie,
  ut as g,
  xt as ae,
  y as oe,
  zt as _,
} from "../../src/three.module.DBbmgHoE.js";
import { t as se } from "./letter-mesh-wire.js";
import { t as ce } from "./wheels-gl-warm.js";
var v = [
  [
    `referral`,
    /\b(friend|colleague|client|coworker|co-worker|referr\w*|recommend\w*|introduc\w*|word of mouth)\b/i,
  ],
  [`awwwards`, /\bawwwards?\b/i],
  [`webflow`, /\b(webflow|made ?in ?webflow)\b/i],
  [
    `gallery`,
    /\b(cssda|css ?design ?awards|fwa|css ?winner|top ?css|orpetron|godly|siteinspire|httpster|land-book|landbook|lapa|minimal ?gallery|one ?page ?love|dribbble|behance|codrops|gallery|showcase)\b/i,
  ],
  [`linkedin`, /\blinked ?in\b/i],
  [`instagram`, /\b(instagram|insta|ig)\b/i],
  [`x`, /\b(x|twitter|tweet\w*|x\.com)\b/i],
  [
    `search`,
    /\b(google|bing|duckduckgo|search\w*|chatgpt|gpt|claude|perplexity|gemini|ai)\b/i,
  ],
  [
    `work`,
    /\b(your (work|site|website|portfolio|lab)|portfolio|saw (a|the|your) )/i,
  ],
];
function y(e) {
  let t = e.trim();
  if (!t) return `none`;
  for (let [e, n] of v) if (n.test(t)) return e;
  return /\b(told|sent|showed) me\b/i.test(t) ||
    t
      .split(/\s+/)
      .slice(1)
      .some((e) => /^[A-Z][a-z]/.test(e))
    ? `referral`
    : `other`;
}
var b = () => matchMedia(`(prefers-reduced-motion: reduce)`).matches,
  x = `#f3f2ef`,
  S = `#f7f7f4`,
  C = `#1b2440`,
  w = {
    lamp: 0.2,
    lampD: 460,
    ambient: 0.94,
    shadow: 0.4,
    tooth: 1,
    foil: 0.3,
    par: 1,
  },
  T = 116,
  E = 132;
function D(e, t) {
  let n = e.clientWidth,
    r = n < 760,
    i = r ? n - 32 : Math.round(Math.min(Math.max(n * 0.56, 560), 800));
  t.style.width = `${i}px`;
  let a = t.offsetHeight,
    o = r ? Math.min(i, 300) : Math.round(i * 0.34),
    s = Math.round(o * 1.04);
  if (r) {
    let e = T,
      t = Math.round((n - o) / 2),
      c = e + a + 40;
    return {
      vw: n,
      narrow: r,
      sx: 16,
      sy: e,
      sw: i,
      sh: a,
      tx: t,
      ty: c,
      tw: o,
      th: s,
      stageH: c + s + E,
    };
  }
  let c = Math.round(o * 0.45),
    l = Math.round((n - (i + c)) / 2),
    u = T;
  return {
    vw: n,
    narrow: r,
    sx: l,
    sy: u,
    sw: i,
    sh: a,
    tx: l + i - (o - c),
    ty: 94,
    tw: o,
    th: s,
    stageH: u + a + E,
  };
}
var O = `
  float pHash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float pNoise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(pHash(i), pHash(i + vec2(1.0, 0.0)), f.x),
               mix(pHash(i + vec2(0.0, 1.0)), pHash(i + vec2(1.0, 1.0)), f.x), f.y);
  }
  float pFbm(vec2 p){
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 4; i++){ v += a * pNoise(p); p *= 2.03; a *= 0.5; }
    return v;
  }
  float paperH(vec2 px, float seed){
    float a = pFbm(px * 0.010 + seed);
    float b = pFbm(px * 0.038 + seed * 2.1);
    return a * 0.62 + b * 0.38;
  }
  float paperT(vec2 px, float seed){
    return pNoise(px * 0.42 + seed * 3.7) * 0.65
         + pNoise(px * 0.95 + seed * 5.3) * 0.35;
  }
`;
function k(e) {
  let t = new o({
    color: new m(e.color),
    roughness: 0.96,
    metalness: 0,
    ...(e.alphaMap ? { alphaMap: e.alphaMap, transparent: !0 } : {}),
  });
  t.defines = { ...(t.defines ?? {}), USE_UV: `` };
  let n = { value: new u(600, 800) },
    r = { value: e.tooth ?? 1 };
  ((t.userData.px = n),
    (t.userData.tooth = r),
    (t.onBeforeCompile = (t) => {
      ((t.uniforms.uPx = n),
        (t.uniforms.uSeed = { value: e.seed }),
        (t.uniforms.uGrain = { value: e.grain ?? 1 }),
        (t.uniforms.uTooth = r),
        (t.fragmentShader = t.fragmentShader
          .replace(
            `void main() {`,
            `uniform vec2 uPx; uniform float uSeed; uniform float uGrain; uniform float uTooth;
         ${O}
         void main() {`,
          )
          .replace(
            `#include <color_fragment>`,
            `#include <color_fragment>
         vec2 pPx = vUv * uPx;
         float pH = paperH(pPx, uSeed);
         diffuseColor.rgb *= 1.0 + (pH - 0.5) * 0.055 * uGrain;
         float fleck = pHash(floor(pPx * 0.7) + uSeed);
         diffuseColor.rgb *= mix(1.0, 0.9, step(0.9990, fleck) * uGrain);`,
          )
          .replace(
            `#include <normal_fragment_begin>`,
            `#include <normal_fragment_begin>
         {
           float e = 1.0;
           float t0 = paperT(pPx, uSeed);
           float tx = paperT(pPx + vec2(e, 0.0), uSeed);
           float ty = paperT(pPx + vec2(0.0, e), uSeed);
           float f0 = paperH(pPx, uSeed);
           float fx = paperH(pPx + vec2(6.0, 0.0), uSeed);
           float fy = paperH(pPx + vec2(0.0, 6.0), uSeed);
           vec2 g = vec2((t0 - tx) * 2.2 + (f0 - fx) * 0.8,
                         (t0 - ty) * 2.2 + (f0 - fy) * 0.8);
           normal = normalize(normal + vec3(g * uTooth, 0.0));
         }`,
          )));
    }));
  let i = `letter-paper|${e.alphaMap ? `a` : `o`}`;
  return ((t.customProgramCacheKey = () => i), t);
}
function A(e) {
  let t = Math.round(512 * e),
    n = document.createElement(`canvas`);
  ((n.width = 512), (n.height = t));
  let r = n.getContext(`2d`),
    i = 1.4;
  return (
    (r.filter = `blur(20px)`),
    (r.fillStyle = `rgba(15,15,15,0.95)`),
    r.beginPath(),
    r.roundRect((512 - 512 / i) / 2, (t - t / i) / 2, 512 / i, t / i, 4),
    r.fill(),
    new p(n)
  );
}
function j(e) {
  let t = Math.round(512 * e),
    n = document.createElement(`canvas`);
  ((n.width = 512), (n.height = t));
  let r = n.getContext(`2d`);
  ((r.fillStyle = `#000`),
    r.fillRect(0, 0, 512, t),
    (r.fillStyle = `#fff`),
    r.beginPath(),
    r.moveTo(0, t),
    r.lineTo(0, 10));
  for (let e = 0; e <= 42; e++) {
    let t = (e / 42) * 512;
    r.lineTo(t, e % 2 ? 0 : 11);
  }
  return (r.lineTo(512, t), r.closePath(), r.fill(), new p(n));
}
function le() {
  let e = document.createElement(`canvas`);
  ((e.width = 512), (e.height = 256));
  let t = e.getContext(`2d`);
  return (
    (t.fillStyle = `#000`),
    t.fillRect(0, 0, 512, 256),
    (t.strokeStyle = `#fff`),
    (t.fillStyle = `#fff`),
    (t.lineWidth = 14),
    t.beginPath(),
    t.arc(112, 128, 96, 0, Math.PI * 2),
    t.stroke(),
    t.beginPath(),
    t.roundRect(232, 32, 192, 192, 96),
    t.stroke(),
    (t.font = `500 122px "Oracle", "Geist Variable", system-ui, sans-serif`),
    (t.textAlign = `center`),
    (t.textBaseline = `middle`),
    t.fillText(`C`, 112, 132),
    t.fillText(`O`, 328, 132),
    new p(e)
  );
}
function ue(e, t) {
  return `<svg viewBox="0 0 300 132" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <filter id="letter-ink-${t}" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="2" seed="${t}" result="r"/>
      <feDisplacementMap in="SourceGraphic" in2="r" scale="1.4" result="d"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves="3" seed="${t + 7}" result="m"/>
      <feColorMatrix in="m" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 3.5 -1.1" result="mm"/>
      <feComposite in="d" in2="mm" operator="in"/>
    </filter>
  </defs>
  <g filter="url(#letter-ink-${t})" fill="none" stroke="var(--spot)">
    <rect x="5" y="5" width="290" height="122" rx="7" stroke-width="4.4"/>
    <rect x="14" y="14" width="272" height="104" rx="4" stroke-width="0.9"/>
    <line x1="14" y1="84" x2="286" y2="84" stroke-width="0.9"/>
    <text x="150" y="63" fill="var(--spot)" stroke="none" text-anchor="middle"
      font-family="PP Neue Montreal Mono, Geist Mono Variable, ui-monospace, monospace" font-size="42" font-weight="500"
      letter-spacing="3">RECEIVED</text>
    <text x="150" y="107" fill="var(--spot)" stroke="none" text-anchor="middle"
      font-family="PP Neue Montreal Mono, Geist Mono Variable, ui-monospace, monospace" font-size="17" letter-spacing="4">${e}</text>
  </g>
</svg>`;
}
function de(e) {
  let t = `"PP Neue Montreal Mono", "Geist Mono Variable", ui-monospace, monospace`,
    n = document.createElement(`canvas`).getContext(`2d`);
  n.font = `400 14px ${t}`;
  let r = [];
  for (let t of e.body.split(/\r?\n/)) {
    let e = ``;
    for (let i of t.split(` `)) {
      let t = e ? `${e} ${i}` : i;
      n.measureText(t).width > 732 && e ? (r.push(e), (e = i)) : (e = t);
    }
    r.push(e);
  }
  let i = Math.max(6, r.length),
    a = 470 + i * 30 + 300,
    o = document.createElement(`canvas`);
  ((o.width = 1800), (o.height = a * 2));
  let s = o.getContext(`2d`);
  (s.scale(2, 2), (s.fillStyle = x), s.fillRect(0, 0, 900, a));
  for (let e = 0; e < 6e3; e++) {
    let t = M(e * 1.7);
    ((s.fillStyle =
      t > 0.5
        ? `rgba(0,0,0,${0.02 + t * 0.03})`
        : `rgba(255,255,255,${0.2 + t * 0.3})`),
      s.fillRect(M(e * 2.3) * 900, M(e * 3.1) * a, 1.2, 1.2));
  }
  let c = `#1e1e1e`,
    l = `rgba(30,30,30,0.58)`,
    u = `rgba(30,30,30,0.22)`,
    d = 84;
  ((s.fillStyle = c),
    (s.font = `500 17px "Oracle", "Geist Variable", system-ui, sans-serif`),
    s.fillText(e.who, 84, d + 14),
    (s.font = `400 11px ${t}`),
    (s.fillStyle = l),
    s.fillText(e.role.toUpperCase(), 84, d + 34),
    s.fillText(e.reach.toUpperCase(), 84, d + 50),
    (d += 70),
    (s.fillStyle = u),
    s.fillRect(84, d, 732, 1),
    (d += 44),
    (s.fillStyle = l),
    (s.font = `400 12px ${t}`),
    s.fillText(e.date, 84, d),
    (d += 38),
    (s.fillStyle = c),
    (s.font = `400 15px ${t}`),
    s.fillText(`Dear Carter,`, 84, d),
    (d += 40),
    (s.font = `400 13px ${t}`),
    (s.fillStyle = l),
    s.fillText(`RE ::`, 84, d),
    (s.fillStyle = c),
    s.fillText(`[X] ${e.kind}`, 148, d),
    (d += 34),
    (s.fillStyle = l),
    s.fillText(`FROM ::`, 84, d),
    (s.fillStyle = c),
    (s.font = `400 14px ${t}`),
    s.fillText(e.from, 158, d),
    (s.fillStyle = u),
    s.fillRect(84, d + 10, 732, 1),
    (d += 46),
    (s.font = `400 14px ${t}`));
  for (let e = 0; e < i; e++)
    ((s.fillStyle = c),
      r[e] && s.fillText(r[e], 84, d + e * 30 + 19),
      (s.fillStyle = u),
      s.fillRect(84, d + e * 30 + 30 - 1, 732, 1));
  ((d += i * 30 + 44),
    (s.fillStyle = c),
    (s.font = `400 15px ${t}`),
    s.fillText(`Sincerely,`, 84, d),
    (d += 16));
  let f = document.createElement(`canvas`);
  ((f.width = 1464),
    (f.height = 220),
    I(f.getContext(`2d`), e.signature, 732, 110, 2, 1, e.aspect),
    s.drawImage(f, 84, d, 732, 110),
    (d += 110),
    (s.fillStyle = u),
    s.fillRect(84, d, 732, 1),
    (d += 22),
    (s.fillStyle = c),
    (s.font = `400 13px ${t}`),
    e.name && s.fillText(e.name, 84, d));
  let p = a - 60;
  return (
    (s.fillStyle = l),
    (s.font = `400 11px ${t}`),
    s.fillText(`CUSTOMER COPY · ${e.job} · ONE REPLY, NO NEWSLETTER`, 84, p),
    new Promise((t) => {
      let n = ue(e.stampDate, e.seed).replace(/var\(--spot\)/g, `#b03a1e`),
        r = new Image();
      ((r.onload = () => {
        (s.save(),
          s.translate(701, d - 110 * 0.55),
          s.rotate((-9 * Math.PI) / 180),
          (s.globalCompositeOperation = `multiply`),
          s.drawImage(r, -115, -101.2 / 2, 230, 101.2),
          s.restore(),
          o.toBlob((e) => t(e), `image/png`));
      }),
        (r.onerror = () => o.toBlob((e) => t(e), `image/png`)),
        (r.src = `data:image/svg+xml;charset=utf-8,` + encodeURIComponent(n)));
    })
  );
}
var M = (e) => {
    let t = Math.sin(e * 127.1 + 311.7) * 43758.5453;
    return t - Math.floor(t);
  },
  N = (e) =>
    e
      .toLocaleDateString(`en-GB`, {
        day: `2-digit`,
        month: `short`,
        year: `numeric`,
      })
      .toUpperCase(),
  P = 2.4;
function F(e, t, n) {
  if (!t.length) return;
  if (t.length === 1) {
    (e.beginPath(), e.arc(t[0].x, t[0].y, (P * n) / 2, 0, 7), e.fill());
    return;
  }
  let r = [];
  for (let e = 0; e < t.length; e++) {
    let n = t[Math.max(0, e - 1)],
      i = t[e];
    if (i.p > 0) r.push(P * (0.6 + i.p * 0.95));
    else {
      let e = Math.max(8, i.t - n.t),
        t = (Math.hypot(i.x - n.x, i.y - n.y) / e) * 16.667;
      r.push(P * (1.12 - Math.min(t / 22, 1) * 0.5));
    }
  }
  for (let e = 0; e < 2; e++)
    for (let e = 1; e < r.length - 1; e++)
      r[e] = (r[e - 1] + r[e] * 2 + r[e + 1]) / 4;
  ((e.lineCap = `round`), (e.lineJoin = `round`));
  for (let i = 1; i < t.length; i++)
    (e.beginPath(),
      e.moveTo(t[i - 1].x, t[i - 1].y),
      e.lineTo(t[i].x, t[i].y),
      (e.lineWidth = Math.max(0.4, r[i] * n)),
      e.stroke());
}
function I(e, t, n, r, i, a = 1, o = n / r) {
  (e.setTransform(i, 0, 0, i, 0, 0),
    e.clearRect(0, 0, n, r),
    (e.globalAlpha = 0.92),
    (e.strokeStyle = C),
    (e.fillStyle = C));
  let s = r * o,
    c = r;
  s > n && ((s = n), (c = n / o));
  let l = r - c,
    u = t.reduce((e, t) => e + t.length, 0),
    d = Math.ceil(u * Math.min(1, Math.max(0, a)));
  for (let n of t) {
    if (d <= 0) break;
    let t = Math.min(n.length, d);
    ((d -= t),
      F(
        e,
        n.slice(0, t).map((e) => ({ ...e, x: 0 + e.x * s, y: l + e.y * c })),
        s / 640,
      ));
  }
}
function L(t, n) {
  let r = n.getContext(`2d`),
    i = [],
    a = 640 / 240,
    o = 1,
    s = 1,
    c = 1,
    l = 1,
    u = () => I(r, i, s, c, l, o, a),
    d = () => {
      let e = t.getBoundingClientRect();
      ((s = Math.max(1, e.width)),
        (c = Math.max(1, e.height)),
        (l = Math.min(devicePixelRatio, 2)),
        (n.width = Math.round(s * l)),
        (n.height = Math.round(c * l)),
        u());
    },
    f = new ResizeObserver(d);
  (f.observe(t), d());
  let p = null;
  return {
    show(t, n, r = a) {
      if (((i = t), (a = r), p?.kill(), !n || b() || !t.length)) {
        ((o = 1), u());
        return;
      }
      let s = { p: 0 };
      ((o = 0),
        u(),
        (p = e.to(s, {
          p: 1,
          duration: 0.55,
          ease: `power1.inOut`,
          onUpdate: () => {
            ((o = s.p), u());
          },
        })));
    },
    dispose() {
      (p?.kill(), f.disconnect());
    },
  };
}
function fe(e, t, n) {
  let r = t.getContext(`2d`),
    i = [],
    a = null,
    o = 1,
    s = 1,
    c = 1,
    l = () => I(r, a ? [...i, a] : i, o, s, c, 1),
    u = () => {
      let n = e.getBoundingClientRect();
      ((o = Math.max(1, n.width)),
        (s = Math.max(1, n.height)),
        (c = Math.min(devicePixelRatio, 2)),
        (t.width = Math.round(o * c)),
        (t.height = Math.round(s * c)),
        l());
    },
    d = (t) => {
      let n = e.getBoundingClientRect();
      return {
        x: (t.clientX - n.left) / n.width,
        y: (t.clientY - n.top) / n.height,
        t: t.timeStamp,
        p: t.pointerType === `pen` ? t.pressure : 0,
      };
    },
    f = new AbortController(),
    p = f.signal;
  (e.addEventListener(
    `pointerdown`,
    (t) => {
      if (t.button === 0 || t.pointerType !== `mouse`) {
        t.preventDefault();
        try {
          e.setPointerCapture(t.pointerId);
        } catch {}
        ((a = [d(t)]), l());
      }
    },
    { signal: p },
  ),
    e.addEventListener(
      `pointermove`,
      (e) => {
        if (!a) return;
        let t = e.getCoalescedEvents?.() ?? [];
        t.length || (t = [e]);
        for (let e of t) a.push(d(e));
        l();
      },
      { signal: p },
    ));
  let ee = (t) => {
    if (a) {
      (i.push(a), (a = null));
      try {
        e.releasePointerCapture(t.pointerId);
      } catch {}
      (l(), n());
    }
  };
  (e.addEventListener(`pointerup`, ee, { signal: p }),
    e.addEventListener(`pointercancel`, ee, { signal: p }));
  let m = new ResizeObserver(u);
  return (
    m.observe(e),
    u(),
    {
      strokes: () => i.map((e) => e.slice()),
      aspect: () => o / s,
      set(e) {
        ((i = e.map((e) => e.slice())), l());
      },
      signed: () => i.length > 0,
      clear() {
        ((i = []), (a = null), l(), n());
      },
      png(e = 640, t = 180) {
        if (!i.length) return ``;
        let n = document.createElement(`canvas`);
        return (
          (n.width = e * 2),
          (n.height = t * 2),
          I(n.getContext(`2d`), i, e, t, 2, 1, o / s),
          n.toDataURL(`image/png`)
        );
      },
      resize: u,
      dispose() {
        (f.abort(), m.disconnect());
      },
    }
  );
}
function R(t, a, u, m) {
  let v;
  try {
    v = new h({ canvas: a, antialias: !0, alpha: !0 });
  } catch {
    return null;
  }
  (v.setPixelRatio(Math.min(devicePixelRatio, 2)),
    v.setClearColor(0, 0),
    (v.toneMapping = 7),
    (v.toneMappingExposure = 1.05));
  let y = { ...w },
    C = new ae(),
    T = new te(0, 1, 0, -1, -2e3, 2e3);
  T.position.z = 100;
  let E = document.createElement(`canvas`);
  ((E.width = 1024), (E.height = 512));
  {
    let e = E.getContext(`2d`),
      t = e.createLinearGradient(0, 0, 0, 512);
    (t.addColorStop(0, `#7a7c80`),
      t.addColorStop(0.5, `#3e3f42`),
      t.addColorStop(1, `#1a1b1d`),
      (e.fillStyle = t),
      e.fillRect(0, 0, 1024, 512),
      (e.fillStyle = `#ffffff`),
      e.fillRect(150, 40, 300, 150),
      e.fillRect(620, 70, 60, 210),
      (e.fillStyle = `#55555b`),
      e.fillRect(760, 120, 190, 130));
  }
  let O = new p(E);
  ((O.mapping = 303), (O.colorSpace = f));
  let ue = new ie(v),
    de = ue.fromEquirectangular(O),
    M = Math.PI,
    N = new re(16777215, y.ambient * M);
  C.add(N);
  let P = new ee(16777215, 0, 0, 2);
  C.add(P);
  let F = new oe(16777215, 0.1 * M);
  (F.position.set(-0.5, 0.6, 1), C.add(F));
  let I = () => {
    ((P.intensity = y.lamp * M * y.lampD * y.lampD),
      (N.intensity = y.ambient * M));
  };
  I();
  let L = k({ color: x, seed: 3.1, tooth: y.tooth });
  L.transparent = !0;
  let fe = new c(new g(1, 1), L),
    R = A(1.3),
    z = new d({ map: R, transparent: !0, opacity: y.shadow, depthWrite: !1 }),
    B = new c(new g(1, 1), z),
    V = new s();
  (V.add(B, fe), C.add(V));
  let H = j(1.04),
    U = k({ color: S, seed: 11.7, grain: 0.45, tooth: 0.35, alphaMap: H }),
    pe = new c(new g(1, 1), U),
    W = new d({
      map: R,
      transparent: !0,
      opacity: y.shadow * 0.8,
      depthWrite: !1,
    }),
    me = new c(new g(1, 1), W),
    he = new s();
  (he.add(me, pe), C.add(he));
  let ge = new o({
      color: 14080219,
      metalness: 0.8,
      roughness: 0.38,
      envMap: de.texture,
      envMapIntensity: 1.6,
    }),
    _e = [
      [22, 66],
      [22, 12],
      [20, 5],
      [14, 1],
      [7, 4],
      [4, 11],
      [4, 56],
      [6, 63],
      [11, 67],
      [16, 63],
      [18, 56],
      [18, 16],
      [16, 12],
      [12, 10],
      [9, 12],
      [8, 17],
      [8, 48],
    ].map(([e, t]) => new _(e, -t, 0)),
    ve = new ne(_e, !1, `catmullrom`, 0.35),
    ye = new c(new l(ve, 140, 1.5, 10, !1), ge);
  he.add(ye);
  let be = le(),
    G = new o({
      color: 14277340,
      metalness: 0.85,
      roughness: y.foil,
      envMap: de.texture,
      envMapIntensity: 1.6,
      alphaMap: be,
      bumpMap: be,
      bumpScale: 1.6,
      transparent: !0,
      alphaTest: 0.02,
    }),
    xe = new c(new g(1, 1), G);
  V.add(xe);
  let Se = u.querySelector(`[data-letter-mark]`),
    K = (e, t, n, r, i, a) => {
      (e.position.set(t + r / 2, -(n + i / 2), a), e.scale.set(r, i, 1));
    },
    q = D(t, u),
    Ce = 1,
    J = 1,
    we = new _(1, 1, 1),
    Y = { y: 0, lift: 0, press: 1 },
    Te = () => {
      ((q = D(t, u)),
        (Ce = q.vw),
        (J = q.stageH),
        (t.style.height = `${J}px`),
        v.setSize(Ce, J, !1),
        (T.left = 0),
        (T.right = Ce),
        (T.top = 0),
        (T.bottom = -J),
        T.updateProjectionMatrix(),
        (u.style.left = `${q.sx}px`),
        (u.style.top = `${q.sy}px`),
        (m.style.left = `${q.tx}px`),
        (m.style.top = `${q.ty}px`),
        (m.style.width = `${q.tw}px`),
        (m.style.height = `${q.th}px`),
        K(fe, q.sx, q.sy, q.sw, q.sh, 0),
        L.userData.px.value.set(q.sw, q.sh),
        K(
          B,
          q.sx - q.sw * 0.06,
          q.sy - q.sh * 0.05 + 8,
          q.sw * 1.12,
          q.sh * 1.1,
          -2,
        ),
        we.copy(B.scale),
        K(pe, q.tx, q.ty, q.tw, q.th, 4),
        U.userData.px.value.set(q.tw, q.th),
        K(
          me,
          q.tx - q.tw * 0.07,
          q.ty - q.th * 0.06 + 6,
          q.tw * 1.14,
          q.th * 1.12,
          3,
        ),
        (ye.visible = !q.narrow));
      let e = Math.max(0.9, q.sw / 720);
      if (
        (ye.position.set(q.tx + 6, -(q.ty + 4), 7), ye.scale.set(e, e, e), Se)
      ) {
        let e = Se.getBoundingClientRect(),
          n = t.getBoundingClientRect(),
          r = e.width,
          i = e.width / 2;
        K(
          xe,
          e.left - n.left,
          e.top - n.top - Y.y + (e.height - i) / 2,
          r,
          i,
          1,
        );
      }
    };
  Te();
  let Ee = i({ write: Te }),
    De = new ResizeObserver(() => Te());
  De.observe(u);
  let X = { x: 0.5, y: 0.35, tx: 0.5, ty: 0.35 },
    Oe = new AbortController(),
    ke = Oe.signal;
  window.addEventListener(
    `pointermove`,
    (e) => {
      let n = t.getBoundingClientRect();
      ((X.tx = (e.clientX - n.left) / Math.max(1, n.width)),
        (X.ty = (e.clientY - n.top) / Math.max(1, n.height)));
    },
    { signal: ke, passive: !0 },
  );
  let Ae = document.hidden;
  document.addEventListener(
    `visibilitychange`,
    () => {
      Ae = document.hidden;
    },
    { signal: ke },
  );
  let Z = { x: 0, y: 0 },
    je = { y: 0 },
    Me = !1,
    Ne = ``,
    Pe = () => {
      if (q.narrow) {
        Ne &&= ((u.style.clipPath = ``), ``);
        return;
      }
      let e = Math.round(q.tx - q.sx + Z.x - 8),
        t = Math.round(q.ty + q.th - q.sy + Z.y + je.y - Y.y + 6),
        n = `polygon(0 0, ${e}px 0, ${e}px ${t}px, 100% ${t}px, 100% 100%, 0 100%)`;
      n !== Ne && ((u.style.clipPath = n), (Ne = n));
    },
    Fe = () => {
      if (Ae) return;
      if (
        ((X.x += (X.tx - X.x) * 0.06),
        (X.y += (X.ty - X.y) * 0.06),
        P.position.set(X.x * Ce, -(X.y * J), y.lampD),
        !q.narrow && y.par > 0)
      ) {
        let e = Math.tanh(window.scrollY / 600) * 14,
          t = (-(X.x - 0.5) * 12 - e * 0.2) * y.par,
          n = (-(X.y - 0.5) * 8 - e) * y.par;
        ((Z.x += (t - Z.x) * 0.08), (Z.y += (n - Z.y) * 0.08));
      } else ((Z.x += (0 - Z.x) * 0.08), (Z.y += (0 - Z.y) * 0.08));
      let e = Z.y + je.y;
      (he.position.set(Z.x, -e, 0),
        (m.style.translate = `${Z.x.toFixed(2)}px ${e.toFixed(2)}px`),
        (V.position.y = -Y.y),
        (u.style.translate = Y.y ? `0 ${Y.y.toFixed(2)}px` : ``));
      let t = (1 + Y.lift * 0.1) * Y.press;
      (B.scale.set(we.x * t, we.y * t, 1),
        Pe(),
        Ie.ready() && (se(C), v.render(C, T)));
    },
    Ie = ce(v, C, T);
  e.ticker.add(Fe);
  let Le = () => {
    if (!Me && !b()) return;
    let e = document.documentElement.getAttribute(`data-theme`) === `dark`;
    ((z.opacity = y.shadow * (e ? 1.3 : 1)),
      (W.opacity = y.shadow * 0.8 * (e ? 1.3 : 1)));
  };
  Le();
  let Re = new MutationObserver(Le);
  Re.observe(document.documentElement, {
    attributes: !0,
    attributeFilter: [`data-theme`],
  });
  let ze = () => Math.max(260, Math.round(innerHeight * 0.5)),
    Q = u.querySelector(`[data-letter-rules]`),
    $ = [],
    Be = () => {
      Q &&
        (Q.style.backgroundSize = $.map(
          (e) => `${(e.v * 100).toFixed(2)}% 1px`,
        ).join(`,`));
    },
    Ve = () => {
      if (!Q) return;
      let e = Math.max(6, Math.round(Q.offsetHeight / 30));
      $.length = 0;
      for (let t = 0; t < e; t++) $.push({ v: 0 });
      ((Q.style.backgroundImage = $.map(
        () => `linear-gradient(var(--prule), var(--prule))`,
      ).join(`,`)),
        (Q.style.backgroundRepeat = `no-repeat`),
        (Q.style.backgroundPosition = $.map(
          (e, t) => `0 ${29 + 30 * t}px`,
        ).join(`,`)),
        Be());
    },
    He = () => {
      Q &&
        ((Q.style.backgroundImage = ``),
        (Q.style.backgroundSize = ``),
        (Q.style.backgroundRepeat = ``),
        (Q.style.backgroundPosition = ``));
    },
    Ue = () => {
      (Ve(),
        (L.opacity = 0),
        (z.opacity = 0),
        (W.opacity = 0),
        (G.opacity = 0),
        (je.y = q.narrow ? -60 : -(q.ty + q.th + 24)),
        (Y.y = ze()),
        (Y.lift = 1));
    },
    We = (t) => {
      if (Me) return;
      Me = !0;
      let n = t?.detail,
        r = (n?.wipeDur ?? 0) * 0.15,
        i = (n?.wipeDur ?? 0) * 0.5,
        a = n?.tl ?? e.timeline(),
        o = document.documentElement.getAttribute(`data-theme`) === `dark`,
        s = y.shadow * (o ? 1.3 : 1);
      if (
        (a.to(L, { opacity: 1, duration: 0.45, ease: `power2.out` }, r),
        a.to(Y, { y: 0, duration: 2.4, ease: `expo.out` }, r),
        a.to(Y, { lift: 0, duration: 2, ease: `expo.out` }, r + 0.3),
        a.to(z, { opacity: s, duration: 1.2, ease: `expo.out` }, r),
        a.to(G, { opacity: 1, duration: 0.7, ease: `power2.out` }, r + 0.3),
        a.to(je, { y: 0, duration: 1.4, ease: `expo.out` }, r + 0.8),
        a.to(
          W,
          { opacity: s * 0.8, duration: 0.7, ease: `power2.out` },
          r + 1.05,
        ),
        a.call(
          () => {
            L.transparent = !1;
          },
          [],
          r + 2.6,
        ),
        $.length)
      ) {
        let e = 0.07;
        (a.to(
          $,
          { v: 1, duration: 1.4, ease: `expo.out`, stagger: e, onUpdate: Be },
          i + 0.8,
        ),
          a.call(He, [], i + 0.8 + e * ($.length - 1) + 1.45));
      }
    };
  b() ||
    (Ue(),
    n.active
      ? document.addEventListener(`veil:reveal`, We, { once: !0, signal: ke })
      : We());
  let Ge = () => {
      (e.to(Y, {
        press: 0.985,
        duration: 0.09,
        yoyo: !0,
        repeat: 1,
        ease: `power2.inOut`,
      }),
        e.fromTo(
          z,
          { opacity: z.opacity * 0.6 },
          { opacity: z.opacity, duration: 0.6, ease: `expo.out` },
        ));
    },
    Ke = r(
      `letter`,
      [
        {
          group: `the lamp`,
          rows: [
            {
              key: `lamp`,
              label: `lamp add`,
              min: 0,
              max: 1,
              step: 0.02,
              value: y.lamp,
              hint: `the desk lamp's added fraction of albedo at its hotspot`,
            },
            {
              key: `lampD`,
              label: `lamp height`,
              min: 120,
              max: 1200,
              step: 10,
              value: y.lampD,
              unit: `px`,
              hint: `its height over the desk — the falloff radius`,
            },
            {
              key: `ambient`,
              label: `ambient`,
              min: 0.3,
              max: 1.1,
              step: 0.02,
              value: y.ambient,
              hint: `near the albedo: lit at 0.8 the bond landed darker than the page`,
            },
          ],
        },
        {
          group: `the sheet`,
          rows: [
            {
              key: `shadow`,
              label: `lift shadow`,
              min: 0,
              max: 0.8,
              step: 0.02,
              value: y.shadow,
            },
            {
              key: `tooth`,
              label: `tooth`,
              min: 0,
              max: 3,
              step: 0.1,
              value: y.tooth,
              hint: `paper normal strength`,
            },
            {
              key: `foil`,
              label: `foil roughness`,
              min: 0.05,
              max: 0.8,
              step: 0.01,
              value: y.foil,
            },
          ],
        },
        {
          group: `the stub`,
          rows: [
            {
              key: `par`,
              label: `parallax`,
              min: 0,
              max: 3,
              step: 0.1,
              value: y.par,
              hint: `parallax master for the stub (0 = pinned flat)`,
            },
          ],
        },
      ],
      (e) => {
        (Object.assign(y, e),
          I(),
          (L.userData.tooth.value = y.tooth),
          (G.roughness = y.foil),
          Le());
      },
    );
  return {
    dispose() {
      (e.ticker.remove(Fe),
        Oe.abort(),
        De.disconnect(),
        Re.disconnect(),
        Ee(),
        Ke?.(),
        [R, H, be, O].forEach((e) => e.dispose()),
        de.texture.dispose(),
        ue.dispose(),
        C.traverse((e) => {
          let t = e;
          t.geometry && t.geometry.dispose();
        }),
        [L, z, U, W, ge, G].forEach((e) => e.dispose()),
        v.dispose(),
        v.forceContextLoss(),
        (t.style.height = ``),
        (m.style.translate = ``),
        (u.style.clipPath = ``),
        (u.style.translate = ``));
    },
    strike: Ge,
  };
}
var z = {
    blank: `BEING WRITTEN`,
    writing: `BEING WRITTEN`,
    signed: `SIGNED`,
    incomplete: `INCOMPLETE`,
    sending: `IN THE TRAY`,
    received: `RECEIVED`,
    failed: `NOT SENT`,
  },
  B = {
    blank: `NOT YET SIGNED`,
    writing: `NOT YET SIGNED`,
    signed: `SIGNED, UNSENT`,
    incomplete: `INCOMPLETE`,
    sending: `SENDING`,
    received: `RECEIVED`,
    failed: `NOT SENT`,
  };
function V(t, n, r, i) {
  let o = (e) => t.querySelector(e),
    s = o(`[data-letter-email]`),
    c = o(`[data-letter-body]`),
    l = o(`[data-letter-name]`),
    u = o(`[data-letter-source]`),
    d = () => u?.value.trim() ?? ``,
    f = o(`[data-letter-status]`),
    p = o(`[data-letter-mailto]`),
    ee = o(`[data-letter-retry]`),
    m = o(`[data-letter-stamp]`),
    h = o(`[data-letter-copy]`),
    te = o(`[data-letter-sig]`),
    ne = o(`[data-letter-ink]`),
    re = o(`[data-letter-clear]`),
    ie = o(`[data-letter-send]`),
    g = o(`[data-letter-slip]`),
    ae = g.querySelector(`[data-letter-pad-box]`),
    oe = g.querySelector(`[data-letter-pad]`),
    _ = g.querySelector(`[data-letter-slip-clear]`),
    se = g.querySelector(`[data-letter-slip-done]`),
    ce = (e) => o(`[data-letter-note="${e}"]`),
    v = new AbortController(),
    x = v.signal,
    S = () =>
      t.querySelector(`[data-letter-kind]:checked`)?.value ?? `New business`,
    C = (e, t, n = !0) => {
      let i = r.querySelector(`[data-stub="${e}"]`);
      i && ((i.textContent = t), (i.dataset.filled = n ? `` : `no`));
    },
    w = `blank`,
    T = [],
    E = 640 / 240,
    D = () => T.length > 0 || l.value.trim().length > 1,
    O = () => s.value.trim().length > 0 || c.value.trim().length > 0,
    k = (e, n = ``) => {
      ((t.dataset.letterError = e ?? ``),
        [[s, `email`], [c, `body`], [l, `sign`]].forEach(([field, key]) => {
          if (e === key) field.setAttribute(`aria-invalid`, `true`);
          else field.removeAttribute(`aria-invalid`);
        }),
        [`email`, `body`, `sign`, `send`].forEach((t) => {
          let r = ce(t);
          if (!r) return;
          let i = t === e;
          ((r.hidden = !i), i && t !== `send` && n && (r.textContent = n));
        }));
    },
    A = (e) => {
      ((w = e), (t.dataset.letterState = e), (f.textContent = B[e]));
      let n =
        e === `received` || e === `failed` || e === `sending` || e === `signed`;
      (C(`status`, z[e], n),
        ie && (ie.disabled = e === `sending` || e === `received`),
        e !== `incomplete` && e !== `failed` && k(null));
    },
    j = () => {
      w !== `sending` &&
        w !== `received` &&
        A(D() ? `signed` : O() ? `writing` : `blank`);
    },
    le = () => {
      ((c.style.height = `auto`),
        (c.style.height = `${Math.max(c.scrollHeight, 180)}px`));
    };
  (c.addEventListener(
    `input`,
    () => {
      (le(), j());
    },
    { signal: x },
  ),
    s.addEventListener(`input`, j, { signal: x }),
    le());
  let M = L(te, ne),
    P = () => {
      (t.toggleAttribute(`data-letter-signed`, D()),
        t.toggleAttribute(`data-letter-inked`, T.length > 0),
        re && (re.hidden = T.length === 0),
        j());
    },
    F = fe(ae, oe, () => {
      _ && (_.hidden = !F.signed());
    }),
    I = () => {
      w !== `received` &&
        w !== `sending` &&
        (F.set(T),
        _ && (_.hidden = T.length === 0),
        g.showModal(),
        F.resize(),
        b() ||
          e.fromTo(
            g,
            { y: 28, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.4,
              ease: `expo.out`,
              clearProps: `transform`,
            },
          ));
    },
    R = (t) => {
      t && ((T = F.strokes()), (E = F.aspect()), M.show(T, !0, E), P());
      let n = () => g.close();
      b()
        ? n()
        : e.to(g, {
            y: 14,
            opacity: 0,
            duration: 0.18,
            ease: `power2.in`,
            onComplete: () => {
              (n(), e.set(g, { clearProps: `all` }));
            },
          });
    };
  (te.addEventListener(`click`, I, { signal: x }),
    te.addEventListener(
      `keydown`,
      (e) => {
        (e.key === `Enter` || e.key === ` `) && (e.preventDefault(), I());
      },
      { signal: x },
    ),
    _?.addEventListener(`click`, () => F.clear(), { signal: x }),
    se?.addEventListener(`click`, () => R(!0), { signal: x }),
    g.addEventListener(
      `cancel`,
      (e) => {
        (e.preventDefault(), R(!0));
      },
      { signal: x },
    ),
    g.addEventListener(
      `click`,
      (e) => {
        e.target === g && R(!0);
      },
      { signal: x },
    ),
    l.addEventListener(`input`, P, { signal: x }),
    re?.addEventListener(
      `click`,
      () => {
        ((T = []), F.clear(), M.show([], !1), P());
      },
      { signal: x },
    ),
    t
      .querySelectorAll(`[data-letter-kind]`)
      .forEach((e) =>
        e.addEventListener(`change`, () => C(`file`, S().toUpperCase()), {
          signal: x,
        }),
      ),
    C(`file`, S().toUpperCase()),
    C(`job`, `——`, !1),
    C(`received`, `——`, !1),
    C(`replyby`, `——`, !1),
    A(`blank`));
  let V = (r) => {
      let a = new Date(),
        o = new Date(a.getTime() + 2592e5),
        d = r ?? 1e3 + (a.getTime() % 9e3);
      if (
        (t.setAttribute(`data-letter-sent`, ``),
        A(`received`),
        C(`job`, `N° ${d}`),
        C(`received`, N(a)),
        C(`replyby`, N(o)),
        [s, c, l, u].forEach((e) => e && (e.readOnly = !0)),
        h &&
          ((h.hidden = !1),
          (h.onclick = async () => {
            h.disabled = !0;
            let e = n.querySelector(`[data-letter-head]`),
              t = await de({
                who: e?.dataset.who ?? `Carter Ogunsola`,
                role: e?.dataset.role ?? ``,
                reach: e?.dataset.reach ?? ``,
                date: N(a),
                kind: S(),
                from: s.value.trim(),
                body: c.value.trim(),
                name: l.value.trim(),
                signature: T,
                aspect: E,
                stampDate: N(a),
                seed: d,
                job: `N° ${d}`,
              });
            if (((h.disabled = !1), !t)) return;
            let r = URL.createObjectURL(t),
              i = document.createElement(`a`);
            ((i.href = r),
              (i.download = `letter-to-carter-${d}.png`),
              i.click(),
              setTimeout(() => URL.revokeObjectURL(r), 4e3));
          })),
        m)
      ) {
        if (((m.innerHTML = ue(N(a), d)), (m.hidden = !1), b())) return;
        (e.fromTo(
          m,
          { scale: 1.28, opacity: 0, rotate: -15 },
          {
            scale: 1,
            opacity: 1,
            rotate: -9,
            duration: 0.34,
            ease: `expo.out`,
          },
        ),
          i?.strike?.());
      }
    },
    H = (e) => {
      A(`failed`);
      let t = ce(`send`);
      if (t) {
        let n = t.querySelector(`[data-letter-why]`);
        n &&
          (n.textContent =
            e === `offline`
              ? `You're offline — the letter never left the desk.`
              : `The counter is closed right now.`);
      }
      if ((k(`send`), p)) {
        let e = `${S()} — from ${s.value.trim()}`,
          t = `${c.value.trim()}\n\n— ${l.value.trim() || s.value.trim()}${d() ? `\n\nVia: ${d()}` : ``}`;
        p.href = `${p.dataset.base}?subject=${encodeURIComponent(e)}&body=${encodeURIComponent(t)}`;
      }
    },
    U = async () => {
      if (w === `received` || w === `sending`) return;
      if (!s.value.trim())
        return (
          A(`incomplete`),
          k(`email`, `a return address, or there is nowhere to reply`),
          s.focus()
        );
      if (!s.checkValidity())
        return (
          A(`incomplete`),
          k(`email`, `that address does not look right`),
          s.focus()
        );
      if (!c.value.trim())
        return (A(`incomplete`), k(`body`, `the letter is blank`), c.focus());
      if (!D())
        return (
          A(`incomplete`),
          k(`sign`, `sign it, or type your name under the line`),
          I()
        );
      let e = new URLSearchParams(location.search).get(`counter`);
      if (e === `offline` || !navigator.onLine) return H(`offline`);
      A(`sending`);
      let t;
      try {
        if (e === `closed`) {
          await new Promise((resolve) => setTimeout(resolve, 700));
          throw Error(`closed`);
        } else {
          let e = await fetch(`/api/contact`, {
            method: `POST`,
            headers: { "content-type": `application/json` },
            body: JSON.stringify({
              kind: S(),
              email: s.value.trim(),
              body: c.value.trim(),
              name: l.value.trim(),
              source: d(),
              signature: F.png(),
            }),
          });
          if (!e.ok) throw Error(String(e.status));
          ((t = (await e.json().catch(() => ({}))).job),
            a(`generate_lead`, { lead_type: S(), lead_source: y(d()) }));
        }
        V(t);
      } catch {
        H(navigator.onLine ? `closed` : `offline`);
      }
    };
  return (
    n.addEventListener(
      `submit`,
      (e) => {
        (e.preventDefault(), U());
      },
      { signal: x },
    ),
    ee?.addEventListener(`click`, () => void U(), { signal: x }),
    window.addEventListener(
      `online`,
      () => {
        w === `failed` && j();
      },
      { signal: x },
    ),
    {
      dispose() {
        (v.abort(), F.dispose(), M.dispose(), g.open && g.close());
      },
    }
  );
}
var H = new (class {
  desk = null;
  counter = null;
  init() {
    let e = document.querySelector(`[data-letter]`),
      n = e?.querySelector(`[data-letter-canvas]`),
      r = e?.querySelector(`[data-letter-sheet]`),
      i = e?.querySelector(`[data-letter-stub]`);
    if (!e || !n || !r || !i) {
      (this.desk?.dispose(),
        this.counter?.dispose(),
        (this.desk = this.counter = null));
      return;
    }
    const date = e.querySelector(`[data-letter-date]`);
    if (date) {
      // Reveal may already have wrapped the text; keep its animated node intact.
      const label = date.querySelector(`.y`) ?? date;
      label.textContent = new Intl.DateTimeFormat(`en-GB`, {
        day: `2-digit`, month: `short`, year: `numeric`,
      }).format(new Date()).toUpperCase();
    }
    let a = null;
    (b() ||
      (e.setAttribute(`data-letter-posed`, ``),
      (a = R(e, n, r, i)),
      a || e.removeAttribute(`data-letter-posed`)),
      (this.desk = a),
      (this.counter = V(e, r, i, a)),
      t(() => {
        (this.desk?.dispose(),
          this.counter?.dispose(),
          (this.desk = this.counter = null));
      }));
  }
})();
export { H as Letter };

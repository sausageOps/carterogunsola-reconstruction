// Shared Lab document and configurator engine, adapted from
// src/lab-doc.DKrI-8eU.js. No experiment loaders are registered in Phase 7.
import { navigate as e } from "astro:transitions/client";
import { d as t, f as n, i as r, m as i, o as a } from "./mesh.ts";

// Future experiment modules may register their original async mount/config
// contract before or after the document is mounted. The registry starts empty.
const l = Object.create(null);
let activeDocument = null;
export function registerLabExperiment(slug, loader) {
  if (typeof slug !== "string" || !slug || typeof loader !== "function") {
    throw new TypeError("Expected an experiment slug and async loader");
  }
  l[slug] = loader;
  if (activeDocument?.slug === slug) activeDocument.start();
  return () => { if (l[slug] === loader) delete l[slug]; };
}

function c(e2) {
  if (Array.isArray(e2)) return e2;
  let t2 = (e3) => e3.charAt(0).toUpperCase() + e3.slice(1), n2 = [];
  for (let [r2, i2] of Object.entries(e2)) {
    let e3 = t2(r2);
    if (Array.isArray(i2)) n2.push({ key: r2, label: e3, type: `range`, default: i2[0], min: i2[1], max: i2[2], step: i2[3] });
    else if (typeof i2 == `number`) {
      let t3 = Math.abs(i2) <= 1 ? 1 : Math.abs(i2) * 2, a2 = Math.abs(i2) <= 1 ? 0.01 : 1;
      n2.push({ key: r2, label: e3, type: `range`, default: i2, min: i2 < 0 ? -t3 : 0, max: i2 < 0 ? 0 : t3, step: a2 });
    } else typeof i2 == `boolean` ? n2.push({ key: r2, label: e3, type: `segment`, default: i2 ? `on` : `off`, options: [{ id: `off`, label: `Off` }, { id: `on`, label: `On` }] }) : typeof i2 == `string` ? n2.push({ key: r2, label: e3, type: `swatch`, default: r2, options: [{ id: r2, value: i2 }] }) : i2 && typeof i2 == `object` && n2.push({ key: r2, label: e3, type: `range`, ...i2 });
  }
  return n2;
}
var u = 220, d = `http://www.w3.org/2000/svg`, f = (e2, t2, n2) => e2.setAttribute(t2, String(n2)), p = (e2, t2) => {
  let n2 = document.createElementNS(d, e2);
  return n2.setAttribute(`class`, t2), n2;
}, m = (e2, t2) => e2 === t2 || typeof e2 == `object` && JSON.stringify(e2) === JSON.stringify(t2), h = (e2) => Array.isArray(e2) ? `[${e2.map(h).join(`, `)}]` : e2 && typeof e2 == `object` ? `{ ${Object.entries(e2).map(([e3, t2]) => `${e3}: ${h(t2)}`).join(`, `)} }` : typeof e2 == `string` ? `"${e2}"` : String(e2);
function g(e2, t2, n2, r2) {
  let i2 = 1, a2 = ``;
  for (let o2 = t2; o2 < e2.length; o2++) {
    let t3 = e2[o2];
    if (a2) {
      t3 === `\\` ? o2++ : t3 === a2 && (a2 = ``);
      continue;
    }
    if (t3 === `"` || t3 === `'` || t3 === "`") a2 = t3;
    else if (t3 === n2) i2++;
    else if (t3 === r2 && --i2 === 0) return o2;
  }
  return -1;
}
function _(e2, t2, n2) {
  let r2 = RegExp(`${t2}\\s*:\\s*`, `y`), i2 = 0, a2 = ``;
  for (let t3 = 0; t3 < e2.length; t3++) {
    let o2 = e2[t3];
    if (a2) {
      o2 === `\\` ? t3++ : o2 === a2 && (a2 = ``);
      continue;
    }
    if (o2 === `"` || o2 === `'` || o2 === "`") a2 = o2;
    else if (o2 === `{` || o2 === `[`) i2++;
    else if (o2 === `}` || o2 === `]`) i2--;
    else if (i2 === 0 && (t3 === 0 || /[,{\s]/.test(e2[t3 - 1]))) {
      r2.lastIndex = t3;
      let i3 = r2.exec(e2);
      if (!i3) continue;
      let a3 = t3 + i3[0].length, o3 = e2[a3], s2;
      if (o3 === `{`) s2 = g(e2, a3 + 1, `{`, `}`) + 1;
      else if (o3 === `[`) s2 = g(e2, a3 + 1, `[`, `]`) + 1;
      else if (o3 === `"` || o3 === `'` || o3 === "`") s2 = e2.indexOf(o3, a3 + 1) + 1;
      else {
        let t4 = e2.slice(a3).search(/[,\n}]/);
        s2 = t4 < 0 ? e2.length : a3 + t4;
      }
      return e2.slice(0, a3) + n2 + e2.slice(s2);
    }
  }
  return e2;
}
function v([e2, t2, n2, r2], i2 = 40) {
  let a2 = [];
  for (let o2 = 0; o2 <= i2; o2++) {
    let s2 = o2 / i2, c2 = 1 - s2, l2 = 3 * c2 * c2 * s2 * e2 + 3 * c2 * s2 * s2 * n2 + s2 * s2 * s2, u2 = 3 * c2 * c2 * s2 * t2 + 3 * c2 * s2 * s2 * r2 + s2 * s2 * s2;
    a2.push(`${(l2 * 100).toFixed(2)} ${((1 - u2) * 100).toFixed(2)}`);
  }
  return `M${a2.join(` L`)}`;
}
function y({ stiffness: e2, damping: t2, mass: n2 }, r2 = 90) {
  let i2 = 0, a2 = 0, o2 = [];
  for (let s2 = 0; s2 <= r2; s2++) {
    o2.push(`${(s2 / r2 * 100).toFixed(2)} ${((1 - i2) * 100).toFixed(2)}`);
    let c2 = e2 * (1 - i2) / n2;
    a2 = (a2 + c2) * (1 - t2), i2 += a2;
  }
  return `M${o2.join(` L`)}`;
}
function b(e2, t2, n2, r2, i2) {
  let a2 = c(n2), o2 = e2.querySelector(`[data-config-panel]`), s2 = e2.querySelector(`[data-config-toggle]`), l2 = e2.querySelector(`[data-config-body]`), u2 = e2.querySelector(`[data-config-reset]`), d2 = e2.querySelector(`[data-config-tools]`), f2 = e2.querySelector(`[data-config-versions]`), p2 = e2.querySelector(`[data-config-save]`), v2 = e2.querySelector(`[data-config-copy]`);
  if (!o2 || !s2 || !l2) return () => {
  };
  o2.hidden = false, s2.hidden = false;
  let y2 = false, b2 = (t3) => {
    y2 = t3, e2.classList.toggle(`is-config`, t3), s2.setAttribute(`aria-expanded`, String(t3));
  };
  s2.addEventListener(`click`, () => b2(!y2), { signal: i2 });
  let x2 = [], C2 = {}, O2 = {};
  for (let e3 of a2) C2[e3.key] = e3.default, O2[e3.key] = e3.default;
  let k = [...e2.querySelectorAll(`[data-docs-pane="code"] [data-code-block] pre code`)].pop(), A = k?.closest(`[data-code-block]`)?.querySelector(`.copy button`), j = [...e2.querySelectorAll(`[data-docs-pane="code"] .labd__refs-label`)].find((e3) => e3.textContent?.trim() === `Script`), M = null;
  j && (M = document.createElement(`span`), M.className = `labcfg__tuned`, M.textContent = `\xB7 tuned`, M.hidden = true, j.appendChild(M));
  let N = () => a2.some((e3) => e3.type !== `swatch` && !m(C2[e3.key], e3.default)), P = () => {
    M && (M.hidden = !N());
  }, F = (e3) => {
    let t3 = e3.match(/const DEFAULTS = \{/);
    if (!t3 || t3.index === void 0) return e3;
    let n3 = t3.index + t3[0].length, r3 = g(e3, n3, `{`, `}`);
    if (r3 < 0) return e3;
    let i3 = e3.slice(n3, r3);
    for (let e4 of a2) e4.type === `swatch` || !(e4.key in C2) || (i3 = _(i3, e4.key, h(C2[e4.key])));
    return e3.slice(0, n3) + i3 + e3.slice(r3);
  }, I = [], L = `base`, R = false, z = `labcfg:${t2}`, B = () => {
    try {
      localStorage.setItem(z, JSON.stringify({ presets: I, active: L, values: C2 }));
    } catch {
    }
  }, V = 0, H = () => {
    R || (clearTimeout(V), V = window.setTimeout(B, 200));
  }, U = (e3, t3) => {
    e3 in C2 && (C2[e3] = t3), r2(e3, t3), P();
    let n3 = I.find((e4) => e4.id === L);
    n3 && (n3.values[e3] = t3), H();
  };
  A?.addEventListener(`click`, (e3) => {
    !N() || !k || (e3.preventDefault(), e3.stopImmediatePropagation(), navigator.clipboard?.writeText(F(k.textContent ?? ``)), M && (M.textContent = `\xB7 copied`, setTimeout(() => {
      M && (M.textContent = `\xB7 tuned`);
    }, 1400)));
  }, { capture: true, signal: i2 });
  let W = {}, G = {};
  for (let e3 of a2) {
    let t3 = document.createElement(`div`);
    if (t3.className = `labcfg__row`, t3.dataset.type = e3.type, G[e3.key] = t3, e3.type !== `range`) {
      let n3 = document.createElement(`span`);
      n3.className = `labcfg__label text-mono-meta`, n3.textContent = e3.label, t3.appendChild(n3);
    }
    e3.type === `range` ? W[e3.key] = w(t3, e3, U, i2, x2) : e3.type === `easing` ? W[e3.key] = E(t3, e3, U, i2, x2) : e3.type === `spring` ? W[e3.key] = D(t3, e3, U, i2, x2) : W[e3.key] = T(t3, e3, U, i2, x2), l2.appendChild(t3);
  }
  S(a2, G, W, C2, i2);
  let K = (e3) => {
    R = true;
    try {
      for (let t3 in e3) W[t3]?.(e3[t3]);
    } finally {
      R = false;
    }
  }, q = (e3, t3, n3) => {
    e3.textContent = t3, setTimeout(() => e3.textContent = n3, 1200);
  }, J = () => {
    if (!f2) return;
    f2.replaceChildren();
    let e3 = (e4, t3) => {
      let n3 = document.createElement(`option`);
      n3.value = e4, n3.textContent = t3, f2.appendChild(n3);
    };
    e3(`base`, `Version 1`);
    for (let t3 of I) e3(t3.id, t3.name);
    f2.value = L;
  }, Y = (e3) => {
    L = e3, K(e3 === `base` ? O2 : I.find((t3) => t3.id === e3)?.values ?? O2), f2 && (f2.value = L), H();
  };
  f2?.addEventListener(`change`, () => Y(f2.value), { signal: i2 }), p2?.addEventListener(`click`, () => {
    let e3 = I.length + 2;
    I.push({ id: `v${e3}`, name: `Version ${e3}`, values: { ...C2 } }), L = `v${e3}`, J(), H();
  }, { signal: i2 }), v2?.addEventListener(`click`, () => {
    navigator.clipboard?.writeText(JSON.stringify(C2, null, 2)), v2 instanceof HTMLElement && q(v2, `Copied`, `Copy`);
  }, { signal: i2 }), u2?.addEventListener(`click`, () => {
    L = `base`, f2 && (f2.value = `base`), x2.forEach((e3) => e3()), H();
  }, { signal: i2 });
  try {
    let e3 = localStorage.getItem(z);
    if (e3) {
      let t3 = JSON.parse(e3);
      t3.values && K(t3.values);
    }
  } catch {
  }
  return P(), d2 && (d2.hidden = true), () => {
    clearTimeout(V), R || B(), e2.classList.remove(`is-config`), l2.replaceChildren(), M?.remove(), f2?.replaceChildren(), d2 && (d2.hidden = true), o2.hidden = true, s2.hidden = true, s2.setAttribute(`aria-expanded`, `false`);
  };
}
var x = { fine: 1, normal: 3, coarse: 8 };
function S(e2, t2, n2, r2, i2) {
  let a2 = /* @__PURE__ */ new Set([`range`, `segment`, `swatch`]), o2 = e2.filter((e3) => e3.shortcut?.key && a2.has(e3.type));
  if (!o2.length) return;
  let s2 = () => {
    let e3 = document.activeElement;
    return !!e3 && (e3.tagName === `INPUT` || e3.tagName === `TEXTAREA` || e3.tagName === `SELECT` || e3.isContentEditable);
  }, c2 = /* @__PURE__ */ new Map();
  for (let e3 of o2) {
    let n3 = e3.shortcut;
    c2.set(n3.key.toLowerCase(), e3);
    let r3 = document.createElement(`span`);
    r3.className = `labcfg__kbd text-mono-meta`, r3.textContent = `${n3.key.toUpperCase()}\xB7${n3.interaction === `drag` ? `drag` : `scroll`}`, t2[e3.key]?.appendChild(r3);
  }
  let l2 = null, u2 = (e3) => {
    l2 !== e3 && (l2 && t2[l2.key]?.classList.remove(`is-kbd`), l2 = e3, l2 && t2[l2.key]?.classList.add(`is-kbd`));
  }, d2 = (e3, t3) => !e3.modifier || e3.modifier === `alt` && t3.altKey || e3.modifier === `shift` && t3.shiftKey || e3.modifier === `meta` && (t3.metaKey || t3.ctrlKey);
  document.addEventListener(`keydown`, (e3) => {
    if (s2() || e3.repeat) return;
    let t3 = c2.get(e3.key.toLowerCase());
    t3 && d2(t3.shortcut, e3) && u2(t3);
  }, { signal: i2 }), document.addEventListener(`keyup`, (e3) => {
    let t3 = c2.get(e3.key.toLowerCase());
    t3 && t3 === l2 && u2(null);
  }, { signal: i2 }), window.addEventListener(`blur`, () => u2(null), { signal: i2 });
  let f2 = (e3, t3) => {
    if (e3.type === `range`) {
      let i3 = e3.step ?? 1, a3 = x[e3.shortcut?.mode ?? `normal`] ?? 3;
      n2[e3.key]?.(Number(r2[e3.key] ?? 0) + t3 * i3 * a3);
    } else if (e3.type === `segment` || e3.type === `swatch`) {
      let i3 = e3.options ?? [];
      if (!i3.length) return;
      let a3 = i3.findIndex((t4) => t4.id === r2[e3.key] || t4.value === r2[e3.key]), o3 = ((a3 < 0 ? 0 : a3) + t3 + i3.length) % i3.length;
      n2[e3.key]?.(i3[o3]?.id);
    }
  };
  document.addEventListener(`wheel`, (e3) => {
    !l2 || l2.shortcut?.interaction === `drag` || (e3.preventDefault(), f2(l2, -Math.sign(e3.deltaY)));
  }, { signal: i2, passive: false });
  let p2 = 0, m2 = false;
  document.addEventListener(`pointerdown`, (e3) => {
    l2 && l2.shortcut?.interaction === `drag` && (m2 = true, p2 = e3.clientX);
  }, { signal: i2 }), document.addEventListener(`pointermove`, (e3) => {
    if (!m2 || !l2) return;
    let t3 = e3.clientX - p2;
    Math.abs(t3) >= 6 && (f2(l2, Math.sign(t3)), p2 = e3.clientX);
  }, { signal: i2 });
  let h2 = () => m2 = false;
  document.addEventListener(`pointerup`, h2, { signal: i2 }), document.addEventListener(`pointercancel`, h2, { signal: i2 });
}
function C(e2, t2, n2, r2) {
  let { min: i2, max: a2 } = t2, o2 = t2.step ?? 1, s2 = (e3) => Math.max(i2, Math.min(a2, e3)), c2 = (e3) => s2(Number((Math.round(e3 / o2) * o2).toFixed(6))), l2 = document.createElement(`div`);
  l2.className = t2.knob ? `labcfg__slider labcfg__slider--knob` : `labcfg__slider`, l2.tabIndex = 0, l2.setAttribute(`role`, `slider`), l2.setAttribute(`aria-label`, t2.label), l2.setAttribute(`aria-valuemin`, String(i2)), l2.setAttribute(`aria-valuemax`, String(a2));
  let d2 = document.createElement(`span`);
  d2.className = `labcfg__slider-fill`;
  let f2 = document.createElement(`span`);
  f2.className = `labcfg__slider-label text-mono-meta`, f2.textContent = t2.label;
  let p2 = document.createElement(`span`);
  p2.className = `labcfg__slider-value text-mono-meta`, l2.append(d2, f2, p2), e2.appendChild(l2);
  let m2 = c2(t2.value), h2 = () => {
    d2.style.width = `${(m2 - i2) / (a2 - i2) * 100}%`, p2.textContent = String(m2), l2.setAttribute(`aria-valuenow`, String(m2));
  }, g2 = (e3) => {
    let t3 = c2(e3);
    !Number.isFinite(t3) || t3 === m2 || (m2 = t3, h2(), n2(m2));
  };
  h2();
  let _2 = 0, v2 = 0, y2 = false;
  l2.addEventListener(`pointerdown`, (e3) => {
    e3.button === 0 && (y2 = true, _2 = e3.clientX, v2 = m2, l2.setPointerCapture?.(e3.pointerId), l2.classList.add(`is-scrubbing`));
  }, { signal: r2 }), l2.addEventListener(`pointermove`, (e3) => {
    y2 && g2(v2 + (e3.clientX - _2) / u * (a2 - i2));
  }, { signal: r2 });
  let b2 = () => {
    y2 = false, l2.classList.remove(`is-scrubbing`);
  };
  return l2.addEventListener(`pointerup`, b2, { signal: r2 }), l2.addEventListener(`pointercancel`, b2, { signal: r2 }), l2.addEventListener(`lostpointercapture`, b2, { signal: r2 }), l2.addEventListener(`keydown`, (e3) => {
    [`ArrowRight`, `ArrowUp`, `ArrowLeft`, `ArrowDown`].includes(e3.key) && (e3.preventDefault(), e3.stopPropagation(), g2(m2 + (e3.key === `ArrowRight` || e3.key === `ArrowUp` ? o2 : -o2)));
  }, { signal: r2 }), (e3) => g2(Number(e3));
}
function w(e2, t2, n2, r2, i2) {
  let a2 = t2.min ?? 0, o2 = Number(t2.default ?? a2), s2 = C(e2, { label: t2.label, min: a2, max: t2.max ?? 100, step: t2.step, value: o2 }, (e3) => n2(t2.key, e3), r2);
  return i2.push(() => s2(o2)), s2;
}
function T(e2, t2, n2, r2, i2) {
  let a2 = t2.options ?? [], o2 = t2.type === `swatch`, s2 = document.createElement(`div`);
  s2.className = `labcfg__seg`, s2.setAttribute(`role`, `group`), s2.setAttribute(`aria-label`, t2.label), s2.style.setProperty(`--seg-n`, String(a2.length));
  let c2 = document.createElement(`span`);
  c2.className = `labcfg__seg-pill`, c2.setAttribute(`aria-hidden`, `true`), s2.appendChild(c2);
  let l2 = a2.map((e3) => {
    let t3 = document.createElement(`button`);
    if (t3.className = `labcfg__seg-btn`, t3.type = `button`, t3.dataset.id = e3.id, o2) {
      t3.classList.add(`labcfg__seg-btn--swatch`), t3.setAttribute(`aria-label`, e3.id);
      let n3 = document.createElement(`span`);
      n3.className = `labcfg__swatch`, n3.style.background = e3.value ?? `var(--ink)`, t3.appendChild(n3);
    } else t3.textContent = e3.label ?? e3.id;
    return s2.appendChild(t3), t3;
  });
  !o2 && a2.length >= 4 && e2.classList.add(`labcfg__row--stack`), e2.appendChild(s2);
  let u2 = (e3, r3) => {
    let i3 = a2[e3];
    i3 && (l2.forEach((t3, n3) => t3.setAttribute(`aria-pressed`, String(n3 === e3))), c2.style.transform = `translateX(${e3 * 100}%)`, r3 && n2(t2.key, o2 ? i3.value ?? i3.id : i3.id));
  };
  l2.forEach((e3, t3) => e3.addEventListener(`click`, () => u2(t3, true), { signal: r2 }));
  let d2 = Math.max(0, a2.findIndex((e3) => e3.id === t2.default));
  return u2(d2, false), i2.push(() => u2(d2, true)), (e3) => {
    let t3 = a2.findIndex((t4) => t4.id === e3 || t4.value === e3);
    t3 >= 0 && u2(t3, true);
  };
}
function E(e2, t2, n2, r2, i2) {
  let a2 = (e3) => Math.round(e3 * 100) / 100, o2 = (e3, t3, n3) => Math.max(t3, Math.min(n3, e3)), s2 = Array.isArray(t2.default) ? t2.default : [0.4, 0, 0.2, 1], c2 = [...s2], l2 = document.createElement(`div`);
  l2.className = `labcfg__curve-wrap`;
  let u2 = p(`svg`, `labcfg__curve`);
  f(u2, `viewBox`, `0 0 100 100`);
  let d2 = p(`path`, `labcfg__grid`);
  f(d2, `d`, `M25 0V100M50 0V100M75 0V100M0 25H100M0 50H100M0 75H100`);
  let m2 = p(`path`, `labcfg__curve-guide`);
  f(m2, `d`, `M0 100 L100 0`);
  let h2 = p(`path`, `labcfg__curve-arm`), g2 = p(`path`, `labcfg__curve-arm`), _2 = p(`path`, `labcfg__curve-path`), y2 = p(`circle`, `labcfg__curve-handle`), b2 = p(`circle`, `labcfg__curve-handle`);
  f(y2, `r`, 3), f(b2, `r`, 3), u2.append(d2, m2, h2, g2, _2, y2, b2);
  let x2 = document.createElement(`span`);
  x2.className = `labcfg__curve-read text-mono-meta`, l2.append(u2, x2), e2.appendChild(l2);
  let S2 = (e3) => e3 * 100, C2 = (e3) => (1 - e3) * 100, w2 = () => {
    let [e3, t3, n3, r3] = c2;
    f(_2, `d`, v(c2)), f(y2, `cx`, S2(e3)), f(y2, `cy`, C2(t3)), f(b2, `cx`, S2(n3)), f(b2, `cy`, C2(r3)), f(h2, `d`, `M0 100 L${S2(e3)} ${C2(t3)}`), f(g2, `d`, `M100 0 L${S2(n3)} ${C2(r3)}`), x2.textContent = `cubic-bezier(${c2.map(a2).join(`, `)})`;
  }, T2 = (e3 = true) => {
    w2(), e3 && n2(t2.key, [...c2]);
  };
  w2();
  let E2 = (t3, n3, i3) => {
    let s3 = false;
    t3.addEventListener(`pointerdown`, (n4) => {
      n4.button === 0 && (s3 = true, t3.setPointerCapture?.(n4.pointerId), e2.classList.add(`is-scrubbing`), n4.preventDefault());
    }, { signal: r2 }), t3.addEventListener(`pointermove`, (e3) => {
      if (!s3) return;
      let t4 = u2.getBoundingClientRect(), r3 = o2((e3.clientX - t4.left) / t4.width, 0, 1), l4 = 1 - (e3.clientY - t4.top) / t4.height * 1;
      c2[n3] = a2(r3), c2[i3] = a2(o2(l4, -0, 1)), T2();
    }, { signal: r2 });
    let l3 = () => {
      s3 = false, e2.classList.remove(`is-scrubbing`);
    };
    t3.addEventListener(`pointerup`, l3, { signal: r2 }), t3.addEventListener(`pointercancel`, l3, { signal: r2 }), t3.addEventListener(`lostpointercapture`, l3, { signal: r2 });
  };
  return E2(y2, 0, 1), E2(b2, 2, 3), i2.push(() => {
    c2 = [...s2], T2();
  }), (e3) => {
    Array.isArray(e3) && e3.length === 4 && e3.every((e4) => Number.isFinite(e4)) && (c2 = [...e3], T2());
  };
}
function D(e2, t2, n2, r2, i2) {
  let a2 = t2.default && typeof t2.default == `object` ? { ...t2.default } : { stiffness: 0.08, damping: 0.2, mass: 1 }, o2 = { ...a2 }, s2 = document.createElement(`div`);
  s2.className = `labcfg__spring-wrap`;
  let c2 = p(`svg`, `labcfg__spring`);
  f(c2, `viewBox`, `0 -30 100 160`), f(c2, `preserveAspectRatio`, `none`);
  let l2 = p(`path`, `labcfg__grid`);
  f(l2, `d`, `M25 -30V130M50 -30V130M75 -30V130M0 35H100M0 65H100`);
  let u2 = p(`path`, `labcfg__spring-base`);
  f(u2, `d`, `M0 100 L100 100`);
  let d2 = p(`path`, `labcfg__spring-target`);
  f(d2, `d`, `M0 0 L100 0`);
  let m2 = p(`path`, `labcfg__curve-path`);
  c2.append(l2, u2, d2, m2);
  let h2 = document.createElement(`div`);
  h2.className = `labcfg__spring-knobs`, s2.append(c2, h2), e2.appendChild(s2);
  let g2 = () => f(m2, `d`, y(o2)), _2 = () => {
    g2(), n2(t2.key, { ...o2 });
  };
  g2();
  let v2 = [[`stiffness`, `Stiff`, 0.02, 0.3, 5e-3], [`damping`, `Damp`, 0.05, 0.6, 0.01], [`mass`, `Mass`, 0.5, 3, 0.1]], b2 = {};
  for (let [e3, t3, n3, i3, a3] of v2) b2[e3] = C(h2, { label: t3, min: n3, max: i3, step: a3, value: o2[e3], knob: true }, (t4) => {
    o2[e3] = t4, _2();
  }, r2);
  return i2.push(() => {
    for (let [e3] of v2) b2[e3](a2[e3]);
  }), (e3) => {
    if (e3 && typeof e3 == `object`) {
      let t3 = e3;
      for (let [e4] of v2) t3[e4] != null && b2[e4](t3[e4]);
    }
  };
}
var O = new class {
  init() {
    let o2 = document.querySelector(`[data-lab-detail]`);
    if (!o2) return;
    let s2 = new AbortController(), { signal: c2 } = s2, u2 = t.stop(), d2 = o2.querySelector(`[data-docs-toggle]`), f2 = o2.querySelector(`[data-docs-scroll]`), p2 = o2.querySelector(`[data-docs-scrollbar]`), m2 = o2.querySelector(`[data-docs-thumb]`), h2 = () => {
      if (!f2 || !p2 || !m2) return;
      let { scrollHeight: e2, clientHeight: t2, scrollTop: n2 } = f2, r2 = e2 - t2;
      if (r2 <= 1) {
        p2.removeAttribute(`data-active`);
        return;
      }
      p2.setAttribute(`data-active`, ``);
      let i2 = p2.clientHeight, a2 = Math.max(28, t2 / e2 * i2), o3 = i2 - a2;
      m2.style.height = `${a2}px`, m2.style.transform = `translateY(${n2 / r2 * o3}px)`;
    }, g2 = false, _2 = (e2) => {
      e2 !== g2 && (g2 = e2, o2.classList.toggle(`is-docs`, g2), d2?.setAttribute(`aria-expanded`, String(g2)), g2 && requestAnimationFrame(h2));
    };
    d2?.addEventListener(`click`, () => _2(!g2), { signal: c2 });
    let v2 = o2.querySelector(`[data-docs-tabs]`);
    if (v2) {
      let e2 = v2.querySelector(`[data-docs-tab-bg]`), t2 = Array.from(v2.querySelectorAll(`[data-docs-tab]`)), r2 = Array.from(o2.querySelectorAll(`[data-docs-pane]`)), a2 = matchMedia(`(prefers-reduced-motion: reduce)`), s3 = (o3) => {
        let s4 = t2.find((e3) => e3.dataset.docsTab === o3), c3 = r2.find((e3) => e3.dataset.docsPane === o3);
        if (!(!s4 || !c3 || !c3.hidden)) {
          if (t2.forEach((e3) => e3.setAttribute(`aria-pressed`, String(e3 === s4))), e2 && !s4.contains(e2)) {
            if (a2.matches) s4.prepend(e2);
            else {
              let t3 = i.getState(e2);
              s4.prepend(e2), i.from(t3, { duration: 0.4, ease: `power3.inOut` });
            }
          }
          r2.forEach((e3) => e3.hidden = e3 !== c3), a2.matches || n.fromTo(c3, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35, ease: `power2.out`, clearProps: `all` }), f2 && (f2.scrollTop = 0), requestAnimationFrame(h2);
        }
      };
      t2.forEach((e3) => e3.addEventListener(`click`, () => s3(e3.dataset.docsTab ?? `notes`), { signal: c2 })), o2.querySelectorAll(`[data-code-wrap]`).forEach((e3) => e3.addEventListener(`click`, () => {
        let t3 = e3.closest(`[data-code-block]`);
        if (!t3) return;
        let n2 = t3.querySelector(`pre`), r3 = n2 ? [...n2.querySelectorAll(`.ec-line`)] : [], i2 = n2?.scrollTop ?? 0, a3 = r3.find((e4) => e4.offsetTop + e4.offsetHeight > i2), o3 = a3 ? i2 - a3.offsetTop : 0, s4 = t3.hasAttribute(`data-nowrap`);
        t3.toggleAttribute(`data-nowrap`, !s4), e3.setAttribute(`aria-pressed`, String(s4)), e3.title = s4 ? `Unwrap lines` : `Wrap lines`, n2 && a3 && (n2.scrollTop = a3.offsetTop + Math.min(o3, a3.offsetHeight), s4 && (n2.scrollLeft = 0));
      }, { signal: c2 }));
    }
    let y2 = (e2) => {
      let t2 = e2.target;
      return t2 instanceof HTMLInputElement || t2 instanceof HTMLTextAreaElement || !!t2?.isContentEditable;
    };
    document.addEventListener(`keydown`, (t2) => {
      if (t2.key === `Escape` && g2) {
        _2(false);
        return;
      }
      if (!(y2(t2) || t2.metaKey || t2.ctrlKey || t2.altKey)) {
        if (t2.key === `ArrowLeft` && o2.dataset.prevHref) {
          if (a.active) return;
          e(o2.dataset.prevHref);
        } else if (t2.key === `ArrowRight` && o2.dataset.nextHref) {
          if (a.active) return;
          e(o2.dataset.nextHref);
        } else (t2.key === `d` || t2.key === `D`) && _2(!g2);
      }
    }, { signal: c2 });
    let x2 = o2.querySelector(`[data-stage]`);
    x2?.addEventListener(`click`, (e2) => {
      g2 && (`stageLive` in o2.dataset && e2.target !== x2 || _2(false));
    }, { signal: c2 }), f2?.addEventListener(`scroll`, h2, { signal: c2, passive: true });
    let S2 = 0;
    window.addEventListener(`resize`, () => {
      S2 ||= requestAnimationFrame(() => {
        S2 = 0, h2();
      });
    }, { signal: c2 });
    let C2 = false, w2 = 0, T2 = 0;
    m2?.addEventListener(`pointerdown`, (e2) => {
      !f2 || e2.button !== 0 || (C2 = true, w2 = e2.clientY, T2 = f2.scrollTop, m2.setPointerCapture(e2.pointerId));
    }, { signal: c2 }), m2?.addEventListener(`pointermove`, (e2) => {
      if (!C2 || !f2 || !p2 || !m2) return;
      let t2 = p2.clientHeight - m2.clientHeight;
      if (t2 <= 0) return;
      let n2 = f2.scrollHeight - f2.clientHeight;
      f2.scrollTop = T2 + (e2.clientY - w2) / t2 * n2;
    }, { signal: c2 });
    let E2 = (e2) => {
      C2 = false;
      try {
        m2?.releasePointerCapture(e2.pointerId);
      } catch {
      }
    };
    m2?.addEventListener(`pointerup`, E2, { signal: c2 }), m2?.addEventListener(`pointercancel`, E2, { signal: c2 }), m2?.addEventListener(`lostpointercapture`, E2, { signal: c2 });
    let D2 = o2.querySelector(`[data-lab-nav]`);
    if (D2) {
      let e2 = D2.querySelector(`[data-lab-prev]`), t2 = D2.querySelector(`[data-lab-next]`);
      e2 && o2.dataset.prevHref && (e2.href = o2.dataset.prevHref), t2 && o2.dataset.nextHref && (t2.href = o2.dataset.nextHref);
      let n2 = o2.dataset.position ?? ``;
      D2.querySelectorAll(`[data-odo-strip]`).forEach((e3, t3) => {
        n2[t3] !== void 0 && (e3.style.translate = `0 -${Number(n2[t3])}em`);
      });
      // The navigation is persisted across Astro transitions. Its labels must
      // follow the new page just as the original engine updates hrefs/digits.
      const prevLabel = D2.querySelector(`[data-lab-prev-label]`);
      const nextLabel = D2.querySelector(`[data-lab-next-label]`);
      if (prevLabel && o2.dataset.prevName) prevLabel.textContent = `Previous experiment: ${o2.dataset.prevName}`;
      if (nextLabel && o2.dataset.nextName) nextLabel.textContent = `Next experiment: ${o2.dataset.nextName}`;
      D2.querySelector(`.labd__nav-count`)?.setAttribute(`aria-label`, `${n2} of ${o2.dataset.total ?? `09`}, back to Lab`);
    }
    let O2 = o2.dataset.experiment ?? ``, k = o2.querySelector(`[data-experiment-viewport]`), j, M;
    let started = false;
    const startExperiment = () => {
      const loader = l[O2];
      if (!loader || !k || started || c2.aborted) return;
      started = true;
      o2.dataset.stageLoading = ``;
      const startedAt = performance.now();
      const fail = (error) => {
        if (c2.aborted) return;
        started = false;
        delete o2.dataset.stageLoading;
        delete o2.dataset.stageLive;
        console.error(`[lab] experiment "${O2}" failed`, error);
      };
      Promise.resolve().then(loader).then((module) => {
        if (c2.aborted) return;
        const mount = () => {
          if (c2.aborted) return;
          if (document.hidden) {
            document.addEventListener(`visibilitychange`, mount, { once: true, signal: c2 });
            return;
          }
          try {
            const instance = module.default.mount(k);
            j = typeof instance === `function` ? instance : instance?.destroy?.bind(instance);
            if (module.config && instance && typeof instance !== `function` && instance.set) {
              M = b(o2, O2, module.config, instance.set.bind(instance), c2);
            }
            delete o2.dataset.stageLoading;
            o2.dataset.stageLive = ``;
          } catch (error) {
            // A delayed mount runs outside the loader promise. Restore the
            // empty state and clean up any instance created before failure.
            try { if (typeof j === `function`) j(); } catch { /* noop */ }
            j = void 0;
            fail(error);
          }
        };
        const remaining = 1000 - (performance.now() - startedAt);
        if (remaining <= 0) mount();
        else {
          const timer = setTimeout(mount, remaining);
          c2.addEventListener(`abort`, () => clearTimeout(timer), { once: true });
        }
      }).catch(fail);
    };
    activeDocument = { slug: O2, root: o2, start: startExperiment };
    startExperiment();
    requestAnimationFrame(h2), r(() => {
      s2.abort(), t.start(u2), typeof j == `function` && j(), typeof M == `function` && M(), o2.classList.remove(`is-docs`);
      if (activeDocument?.root === o2) activeDocument = null;
    });
  }
}();
export {
  O as LabDoc
};

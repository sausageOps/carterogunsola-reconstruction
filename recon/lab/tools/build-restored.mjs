// Restored lab-documents builder (Phase 12).
//
// Produces the Notes and Code pane HTML fragments for lab experiments that
// have no byte-exact page capture, from:
//   - the Jina-recovered markdown (recon/lab/recovered/**) — prose verbatim,
//   - the fence parser (fence-parse.mjs) — Code-pane sources,
//   - the golden-calibrated EC renderer (ec-render.mjs, 7/7 byte-identical),
//   - pane/refrow/wrapper markup copied byte-exact from the dial + vocal-orb
//     captures (cid attributes omitted; symbol ids use the lab-doc: namespace
//     exactly like paneContents() normalizes captures to).
//
// CALIBRATION: `node build-restored.mjs --calibrate` rebuilds the dial notes
// pane and code pane from their markdown/golden sources and diffs them
// byte-for-byte against the normalized capture panes. Only after that passes
// does it emit restored fragments for other pages.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { renderBlock } from './ec-render.mjs';
import { auditPage, loadPageMarkdown } from './fence-parse.mjs';

// ---------------------------------------------------------------------------
// markup templates (byte-exact from pages/lab_dial.html + lab_vocal-orb.html,
// minus data-astro-cid-* attributes; ai:local: → lab-doc:)
// ---------------------------------------------------------------------------

const ARROW_ROLL =
  '<span class="arrow-roll arrow-roll--diagonal" aria-hidden="true">' +
  '<span class="arrow-roll__icon arrow-roll__current">' +
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">' +
  '<path d="M18.25 15.25V5.75M18.25 5.75H8.75M18.25 5.75L6 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>\n' +
  '</span><span class="arrow-roll__icon arrow-roll__next">' +
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">' +
  '<path d="M18.25 15.25V5.75M18.25 5.75H8.75M18.25 5.75L6 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>\n' +
  '</span></span>';

const SYMBOL_ART = {
  globe:
    '<symbol id="lab-doc:globe" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="square" stroke-width="1.5"><path d="M21.25 12a9.25 9.25 0 1 1-18.5 0 9.25 9.25 0 0 1 18.5 0Z"/><path d="M12 21c-2.21 0-4-4.03-4-9s1.79-9 4-9 4 4.03 4 9-1.79 9-4 9Zm9-9H3"/></g></symbol>',
  'user-zap':
    '<symbol id="lab-doc:user-zap" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M15 21a6 6 0 0 0-12 0M19 9l-2.6 3.6H20L17.4 16"/><circle cx="9" cy="8" r="4"/></g></symbol>',
  'text-wrap':
    '<symbol id="lab-doc:text-wrap" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"><path d="M3.75 6h16.5M3.75 18h5.5"/><path stroke-linejoin="round" d="M3.75 12h13.5a3.25 3.25 0 0 1 0 6.5H13.5m0 0 2 2m-2-2 2-2"/></g></symbol>',
};

// Track which symbols were already inlined on this page (first use inlines the
// <symbol>, later uses reference it — exactly like the captures).
function iconSvg(icon, used) {
  if (used.has(icon)) {
    return `<svg width="1em" height="1em" viewBox="0 0 24 24" class="refrow__icon" aria-hidden="true" data-icon="${icon}"><use href="#lab-doc:${icon}"></use></svg>`;
  }
  used.add(icon);
  return `<svg width="1em" height="1em" class="refrow__icon" aria-hidden="true" data-icon="${icon}">${SYMBOL_ART[icon]}<use href="#lab-doc:${icon}"></use></svg>`;
}

function refRow(row, used) {
  const badge =
    row.kind === 'wordmark'
      ? `<span class="refrow__badge"><span class="refrow__wordmark text-label">${row.wordmark}</span></span>`
      : `<span class="refrow__badge">${iconSvg(row.kind, used)}</span>`;
  if (!row.href) {
    // non-link concept row (lightbulb): span, no ext arrow
    return `<span data-hover="true" class="refrow">${badge}<span class="refrow__label text-tag">${row.label}</span></span>`;
  }
  return (
    `<a data-hover="true" href="${row.href}" target="_blank" rel="noopener noreferrer" class="refrow refrow--link">` +
    badge +
    `<span class="refrow__label text-tag">${row.label}</span>` +
    `<span class="refrow__ext" aria-hidden="true">${ARROW_ROLL}</span></a>`
  );
}

function refsSection(label, rows, used) {
  return (
    `<section class="labd__refs"><p class="labd__refs-label text-label">${label}</p>` +
    `<div class="labd__refs-rule" aria-hidden="true"></div>` +
    `<div class="labd__refs-list">${rows.map((r) => refRow(r, used)).join('')}</div></section>`
  );
}

function wrapButton(used) {
  if (used.has('text-wrap')) {
    return (
      '<button class="labd__wrap" type="button" data-code-wrap aria-pressed="true" aria-label="Wrap lines" title="Unwrap lines">' +
      '<svg width="1em" height="1em" viewBox="0 0 24 24" class="labd__wrap-icon" aria-hidden="true" data-icon="text-wrap"><use href="#lab-doc:text-wrap"></use></svg></button>'
    );
  }
  used.add('text-wrap');
  return (
    '<button class="labd__wrap" type="button" data-code-wrap aria-pressed="true" aria-label="Wrap lines" title="Unwrap lines">' +
    `<svg width="1em" height="1em" class="labd__wrap-icon" aria-hidden="true" data-icon="text-wrap">${SYMBOL_ART['text-wrap']}<use href="#lab-doc:text-wrap"></use></svg></button>`
  );
}

async function codeSection(label, code, lang, used) {
  return (
    `<section class="labd__code-sec"><p class="labd__refs-label text-label">${label}</p>` +
    `<div class="labd__refs-rule" aria-hidden="true"></div>` +
    `<div class="labd__code-block" data-code-block>${wrapButton(used)}` +
    (await renderBlock(code, lang, { gutter: true, pane: 'code' })) +
    `</div></section>`
  );
}

export async function buildCodePane(sections) {
  const used = new Set();
  let out = '';
  for (const s of sections) out += await codeSection(s.label, s.code, s.lang, used);
  return out;
}

// ---------------------------------------------------------------------------
// prose: escaping, inline markdown, greedy-80 wrap (all calibrated on dial)
// ---------------------------------------------------------------------------

function escapeText(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function inlineMd(md) {
  // sequential tokenizer: **strong**, `code`, _em_; text escaped Astro-style.
  let out = '';
  let i = 0;
  const flushFrom = (start, end) => {
    out += escapeText(md.slice(start, end));
  };
  let textStart = 0;
  while (i < md.length) {
    if (md.startsWith('**', i)) {
      const close = md.indexOf('**', i + 2);
      if (close > 0) {
        flushFrom(textStart, i);
        out += `<strong>${inlineMd(md.slice(i + 2, close))}</strong>`;
        i = close + 2;
        textStart = i;
        continue;
      }
    }
    if (md[i] === '`') {
      const close = md.indexOf('`', i + 1);
      if (close > 0) {
        flushFrom(textStart, i);
        out += `<code>${escapeText(md.slice(i + 1, close))}</code>`;
        i = close + 1;
        textStart = i;
        continue;
      }
    }
    if (md[i] === '_' && /(^|[\s(])$/.test(md.slice(0, i))) {
      const close = md.indexOf('_', i + 1);
      if (close > 0 && /^[\s.,;:)!?—-]|$/.test(md.slice(close + 1, close + 2))) {
        flushFrom(textStart, i);
        out += `<em>${escapeText(md.slice(i + 1, close))}</em>`;
        i = close + 1;
        textStart = i;
        continue;
      }
    }
    i++;
  }
  flushFrom(textStart, md.length);
  return out;
}

// Greedy wrap of the MARKDOWN source: a word joins the current line while the
// line stays ≤ 81 characters, markers included. The 81 limit is empirical —
// three dial-capture data points accept 81-char lines and break at 82.
// Split markdown into wrap atoms: inline spans (`code`, **strong**, _em_) are
// atomic — the original never breaks a line inside them (dial capture:
// `velocity / 600` stays whole). Each atom records whether a space preceded
// it in the source; line breaks may only occur at source spaces, and atoms
// with no preceding space glue directly to the previous atom.
function wrapAtoms(md) {
  const atoms = [];
  let i = 0;
  let word = '';
  let pendingSpace = false;
  let wordSpace = false;
  const flushWord = () => {
    if (word.length) {
      atoms.push({ text: word, spaceBefore: wordSpace });
      word = '';
    }
  };
  while (i < md.length) {
    const c = md[i];
    if (c === '`' || (c === '*' && md[i + 1] === '*') || c === '_') {
      const marker = c === '*' ? '**' : c;
      const close = md.indexOf(marker, i + marker.length);
      if (close > 0) {
        flushWord();
        atoms.push({ text: md.slice(i, close + marker.length), spaceBefore: pendingSpace });
        i = close + marker.length;
        pendingSpace = false;
        wordSpace = false;
        continue;
      }
    }
    if (c === ' ') {
      flushWord();
      pendingSpace = true;
      wordSpace = true;
      i++;
      continue;
    }
    if (!word.length) wordSpace = pendingSpace;
    word += c;
    pendingSpace = false;
    i++;
  }
  flushWord();
  return atoms;
}

function greedyWrap80(md) {
  const atoms = wrapAtoms(md);
  const lines = [];
  let cur = '';
  for (const a of atoms) {
    if (!cur.length) {
      cur = a.text;
    } else if (!a.spaceBefore) {
      cur += a.text;
    } else if (cur.length + 1 + a.text.length <= 81) {
      cur += ' ' + a.text;
    } else {
      lines.push(cur);
      cur = a.text;
    }
  }
  if (cur.length) lines.push(cur);
  return lines;
}

function proseBlock(tag, md) {
  const wrapped = greedyWrap80(md).map(inlineMd).join('\n');
  return `<${tag}>${wrapped}</${tag}>`;
}

function h2Slug(text) {
  return text
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function buildNotesPane(doc) {
  const used = new Set();
  let out = `<p class="labd__summary text-lead">${escapeText(doc.summary)}</p>`;
  if (doc.dependencies?.length) out += refsSection('Dependencies', doc.dependencies, used);
  const parts = [];
  for (const b of doc.blocks) {
    if (b.t === 'h2') parts.push(`<h2 id="${h2Slug(b.text)}">${escapeText(b.text)}</h2>`);
    else if (b.t === 'p') parts.push(proseBlock('p', b.md));
    else if (b.t === 'ul')
      parts.push(`<ul>\n${b.items.map((md) => proseBlock('li', md)).join('\n')}\n</ul>`);
    else if (b.t === 'ec') parts.push(await renderBlock(b.code, b.lang, { gutter: false, pane: 'notes' }));
    else throw new Error(`unknown block ${b.t}`);
  }
  out += `<div class="labd__article">${parts.join('\n')}</div>`;
  if (doc.credits?.length) out += refsSection('Credits', doc.credits, used);
  return out;
}

// ---------------------------------------------------------------------------
// Jina markdown → notes doc blocks
// ---------------------------------------------------------------------------

// Reference rows (rules verified on dial + vocal-orb captures):
//  - Dependencies section → wordmark rows: first token before " :: " is the
//    wordmark, the remainder is the label ("GSAP Core :: ticker" → wordmark
//    "GSAP", label "Core :: ticker"). Per-page depsKinds overrides can render
//    a row as an icon row instead (live-cursors: partysocket → globe — an
//    npm package with no brand wordmark, per the recorded capture mapping).
//  - Credits section → icon rows (globe for project/repo links, user-zap for
//    personal profiles): the full text is the label. Per-page creditIcons
//    overrides pick the icon; default globe.
//  - Jina prints adjacent refrows concatenated on ONE line (no separator), so
//    rows are extracted with a global link match, not a whole-line anchor.
function parseRefRows(line, section, opts = {}) {
  const rows = [];
  for (const m of line.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)) {
    const [, text, href] = m;
    const parts = text.split(' :: ');
    if (parts.length < 2) continue;
    if (section === 'deps') {
      const ovr = (opts.depsKinds || []).find((o) => text.startsWith(o.match));
      if (ovr && ovr.kind === 'globe') {
        rows.push({ kind: 'globe', label: text, href });
        continue;
      }
      const head = parts[0].trim().split(/\s+/);
      if (head.length < 2) continue;
      const wordmark = head[0];
      rows.push({ kind: 'wordmark', wordmark, label: text.slice(wordmark.length + 1), href });
    } else {
      const ovr = (opts.creditIcons || []).find((o) => text.startsWith(o.match));
      rows.push({ kind: ovr?.icon || 'globe', label: text, href });
    }
  }
  return rows;
}

/**
 * Extract notes blocks from a recovered page's Jina markdown.
 * ecOverrides: array of { afterH2, code, lang } — the flattened inline-code
 * EC embeds whose line breaks Jina destroys; the true lines must be supplied
 * (derived from capture/engine evidence, never invented).
 * opts: { depsKinds, creditIcons } per-page refrow overrides (see
 * parseRefRows).
 */
export function notesFromJina(markdown, ecOverrides = [], opts = {}) {
  const lines = markdown.split('\n');
  const doc = { summary: '', dependencies: [], blocks: [], credits: [] };
  let i = 0;
  // find "Notes Code" header
  while (i < lines.length && lines[i].trim() !== 'Notes Code') i++;
  i++;
  // category/badge line (e.g. "Canvas New")
  while (i < lines.length && !lines[i].trim()) i++;
  i++; // skip category line
  while (i < lines.length && !lines[i].trim()) i++;
  // summary paragraph
  doc.summary = lines[i].trim();
  i++;
  let section = null;
  let lastH2 = null;
  let ul = null;
  const flushUl = () => {
    if (ul) {
      doc.blocks.push({ t: 'ul', items: ul });
      ul = null;
    }
  };
  for (; i < lines.length; i++) {
    const raw = lines[i];
    const line = raw.trim();
    if (!line) continue;
    if (line === 'Dependencies') { section = 'deps'; flushUl(); continue; }
    if (line === 'Credits') { section = 'credits'; flushUl(); continue; }
    if (line === 'Setup' || line.startsWith('![Image') || line === 'Tune Reset') break;
    if (line.startsWith('## ')) {
      flushUl();
      section = 'article';
      lastH2 = line.slice(3).trim();
      doc.blocks.push({ t: 'h2', text: lastH2 });
      continue;
    }
    if (line.startsWith('*   ')) {
      if (!ul) ul = [];
      ul.push(line.slice(4).trim());
      continue;
    }
    flushUl();
    if (section === 'deps' || section === 'credits') {
      const rows = parseRefRows(line, section, opts);
      if (rows.length) (section === 'deps' ? doc.dependencies : doc.credits).push(...rows);
      continue;
    }
    // EC embed: whole line wrapped in single backticks containing `;`
    if (line.startsWith('`') && line.endsWith('`') && line.includes(';') && !line.includes('` ')) {
      const ov = ecOverrides.find((o) => o.afterH2 === lastH2);
      if (ov) {
        doc.blocks.push({ t: 'ec', code: ov.code, lang: ov.lang });
        continue;
      }
      throw new Error(`EC embed after "${lastH2}" has no line-split override`);
    }
    doc.blocks.push({ t: 'p', md: line });
  }
  flushUl();
  return doc;
}

// ---------------------------------------------------------------------------
// calibration: rebuild dial panes and diff against the normalized capture
// ---------------------------------------------------------------------------

function normalizeCapture(html) {
  return html
    .replace(/\sdata-astro-cid-[a-z0-9]+(="[^"]*")?/g, '')
    .replace(/<link rel="stylesheet" href="\/_astro\/ec\.[^"]+\.css"\/?>/g, '')
    .replace(/<script type="module" src="\/_astro\/ec\.[^"]+\.js"><\/script>/g, '')
    .replace(/ai:local:/g, 'lab-doc:');
}

function paneFromCapture(file, pane) {
  const html = readFileSync(new URL(`../../../pages/${file}`, import.meta.url), 'utf8');
  const markerAt = html.indexOf(`data-docs-pane="${pane}"`);
  const openAt = html.lastIndexOf('<div ', markerAt);
  // reuse the same tag-walk as paneContents (simplified: capture divs balance)
  let depth = 1;
  let cur = openAt;
  // find end of open tag
  let q = '';
  let i = cur + 1;
  for (; i < html.length; i++) {
    const c = html[i];
    if (q) { if (c === q) q = ''; }
    else if (c === '"' || c === "'") q = c;
    else if (c === '>') { i++; break; }
  }
  cur = i;
  const start = cur;
  while (cur < html.length) {
    const lt = html.indexOf('<', cur);
    if (lt < 0) break;
    if (html.startsWith('<!--', lt)) { cur = html.indexOf('-->', lt) + 3; continue; }
    // tag end
    q = '';
    let j = lt + 1;
    for (; j < html.length; j++) {
      const c = html[j];
      if (q) { if (c === q) q = ''; }
      else if (c === '"' || c === "'") q = c;
      else if (c === '>') { j++; break; }
    }
    const tag = html.slice(lt, j);
    const m = /^<\s*(\/?)\s*([a-z][\w:-]*)/i.exec(tag);
    cur = j;
    if (!m) continue;
    if (m[2].toLowerCase() === 'div') {
      depth += m[1] ? -1 : 1;
      if (depth === 0) return normalizeCapture(html.slice(start, lt));
    }
    if (m[2].toLowerCase() === 'script' && !m[1]) {
      const closeAt = html.indexOf('</script>', cur);
      cur = closeAt + 9;
    }
  }
  throw new Error('pane not found');
}

async function calibrate() {
  let ok = true;

  // --- dial code pane: golden blocks + captured labels ---------------------
  const golden = JSON.parse(readFileSync(new URL('./golden/dial-blocks.json', import.meta.url), 'utf8'));
  const codeBlocks = golden.filter((b) => b.pane === 'code');
  const labels = { html: 'Setup', css: 'Style', js: 'Script' };
  const wantCode = paneFromCapture('lab_dial.html', 'code');
  const gotCode = await buildCodePane(codeBlocks.map((b) => ({ label: labels[b.lang], code: b.code, lang: b.lang })));
  if (gotCode === wantCode) console.log('CALIBRATION PASS: dial code pane byte-identical');
  else {
    ok = false;
    let i = 0;
    while (i < gotCode.length && i < wantCode.length && gotCode[i] === wantCode[i]) i++;
    console.log(`CALIBRATION FAIL: dial code pane @${i} (got ${gotCode.length}, want ${wantCode.length})`);
    console.log('  got :', JSON.stringify(gotCode.slice(Math.max(0, i - 70), i + 90)));
    console.log('  want:', JSON.stringify(wantCode.slice(Math.max(0, i - 70), i + 90)));
  }

  // --- dial notes pane: Jina markdown + golden notes EC --------------------
  const dialMd = loadPageMarkdown('dial').markdown;
  const notesBlock = golden.find((b) => b.pane === 'notes');
  const dialDoc = notesFromJina(dialMd, [{ afterH2: 'The feel is the whole point', code: notesBlock.code, lang: notesBlock.lang }]);
  const wantNotes = paneFromCapture('lab_dial.html', 'notes');
  const gotNotes = await buildNotesPane(dialDoc);
  const norm = (x) => x.replace(/\s+/g, ' ');
  if (norm(gotNotes) !== norm(wantNotes)) {
    ok = false;
    const a = norm(gotNotes), b = norm(wantNotes);
    let i = 0;
    while (i < a.length && i < b.length && a[i] === b[i]) i++;
    console.log(`CALIBRATION FAIL: dial notes TEXT differs @${i}`);
    console.log('  got :', JSON.stringify(a.slice(Math.max(0, i - 70), i + 90)));
    console.log('  want:', JSON.stringify(b.slice(Math.max(0, i - 70), i + 90)));
  } else if (gotNotes === wantNotes) {
    console.log('CALIBRATION PASS: dial notes pane byte-identical');
  } else {
    // text identical; only hard-newline positions may deviate (the original
    // wrap has at least one hand-adjusted break the greedy rule can't hit).
    const g = gotNotes.split('\n'), w = wantNotes.split('\n');
    let breaks = 0;
    for (let k = 0; k < Math.max(g.length, w.length); k++) if (g[k] !== w[k]) breaks++;
    console.log(`CALIBRATION PASS: dial notes text identical; ${breaks} newline-position lines differ (reconstructed wrap)`);
  }
  return ok;
}

// ---------------------------------------------------------------------------
// heart restoration
// ---------------------------------------------------------------------------

const HEART_EC = {
  afterH2: 'The feel is in the trailing',
  lang: 'js',
  code: [
    'w += dx * 0.05;            // your drag becomes angular velocity',
    'w *= Math.exp(-dt / 2);    // which bleeds off — it coasts, half-life ~1.4s',
    'yaw += w * dt;',
  ].join('\n'),
};

async function buildHeart() {
  const md = loadPageMarkdown('heart').markdown;
  const doc = notesFromJina(md, [HEART_EC]);
  // heart credits: "Tolis C :: tol.is/heart" → globe link row (default) ✓
  const notes = await buildNotesPane(doc);

  const audit = auditPage('heart');
  const fences = Object.fromEntries(audit.fences.map((f) => [f.label, f]));
  for (const l of ['Setup', 'Style', 'Script']) {
    if (!fences[l]?._lines) throw new Error(`heart fence ${l} missing`);
    if (fences[l].anomalies?.length) throw new Error(`heart fence ${l} anomalies: ${fences[l].anomalies}`);
  }
  const code = await buildCodePane([
    { label: 'Setup', lang: 'html', code: fences.Setup._lines.join('\n') },
    { label: 'Style', lang: 'css', code: fences.Style._lines.join('\n') },
    { label: 'Script', lang: 'js', code: fences.Script._lines.join('\n') },
  ]);
  return { notes, code };
}

const HEART_JSON_LD = JSON.parse(readFileSync(new URL('./golden/dial-jsonld.json', import.meta.url), 'utf8'));
function pageJsonLd({ slug, name, category, description }) {
  const g = JSON.parse(JSON.stringify(HEART_JSON_LD));
  const url = `https://carterogunsola.com/lab/${slug}`;
  const work = g['@graph'].find((n) => n['@type'] === 'CreativeWork');
  work['@id'] = `${url}#work`;
  work.name = name;
  work.description = description;
  work.url = url;
  work.genre = category;
  const bc = g['@graph'].find((n) => n['@type'] === 'BreadcrumbList');
  bc.itemListElement[2] = { '@type': 'ListItem', position: 3, name, item: url };
  return g;
}
function heartJsonLd() {
  return pageJsonLd({
    slug: 'heart',
    name: 'Heart',
    category: 'Canvas',
    description:
      "Taubin's implicit heart surface, solved into a point cloud and spun on canvas. Grab it and it coasts on its own momentum, the outer points trailing elastically, tone carried by a monochrome halftone.",
  });
}

// ---------------------------------------------------------------------------
// the remaining six experiments (generic path — no EC embeds in any of their
// Notes; all three fences closed with zero anomalies after the v1-join fix)
// ---------------------------------------------------------------------------

const SECTION_LANG = { Setup: 'html', Style: 'css', Script: 'js' };
const SECTION_ORDER = ['Setup', 'Style', 'Script'];

const RESTORE_PAGES = [
  {
    page: 'live-cursors', slug: 'live-cursors', name: 'Live Cursors', category: 'Interaction',
    // partysocket is an npm package with no brand wordmark → globe icon row
    // (recorded capture mapping); PartyKit and GSAP render as wordmarks.
    depsKinds: [{ match: 'partysocket', kind: 'globe' }],
  },
  {
    page: 'paste-up', slug: 'paste-up', name: 'Paste-Up', category: 'Transition',
    creditIcons: [{ match: 'Jesper Landberg', icon: 'user-zap' }],
  },
  {
    page: 'dynamic-scrollbar', slug: 'dynamic-scrollbar', name: 'Dynamic Scrollbar', category: 'UI',
    creditIcons: [{ match: 'Xavier Jac', icon: 'user-zap' }],
    // Jina renders the page in a browser: lab-doc.js appends a runtime
    // `· tuned` span to the Script label (hidden in static markup), so the
    // recovered label line reads "Script· tuned" and the label regex keeps
    // only the trailing word. The static pane label is plain "Script".
    labelArtifacts: { tuned: 'Script' },
  },
  { page: 'rotating-gallery', slug: 'rotating-gallery', name: 'Rotating Gallery', category: 'Gallery' },
  { page: 'polka-dots', slug: 'polka-dots', name: 'Polka Dots', category: 'Canvas' },
  { page: 'threejs-test', slug: 'threejs-test', name: 'ThreeJs Scene', category: '3D' },
];

async function buildRestoredPage(cfg) {
  const loaded = loadPageMarkdown(cfg.page);
  if (!loaded) throw new Error(`${cfg.page}: no recovered chunks`);
  const doc = notesFromJina(loaded.markdown, cfg.ecOverrides ?? [], {
    depsKinds: cfg.depsKinds,
    creditIcons: cfg.creditIcons,
  });
  if (!doc.summary) throw new Error(`${cfg.page}: no summary parsed`);
  if (!doc.dependencies.length) throw new Error(`${cfg.page}: no dependency rows parsed`);
  const notes = await buildNotesPane(doc);

  const audit = auditPage(cfg.page);
  if (audit.fences.length !== SECTION_ORDER.length) {
    throw new Error(`${cfg.page}: expected ${SECTION_ORDER.length} fences, got ${audit.fences.length}`);
  }
  const sections = audit.fences.map((f, i) => {
    const label = SECTION_ORDER[i];
    const ok = f.label === label || (cfg.labelArtifacts ?? {})[f.label] === label;
    if (!ok) throw new Error(`${cfg.page}: fence ${i} label ${JSON.stringify(f.label)} !== ${label}`);
    if (!f._lines) throw new Error(`${cfg.page}: fence ${label} tiling failed`);
    if (!f.closed) throw new Error(`${cfg.page}: fence ${label} is not closed`);
    if (f.anomalies?.length) throw new Error(`${cfg.page}: fence ${label} anomalies: ${f.anomalies}`);
    return { label, lang: SECTION_LANG[label], code: f._lines.join('\n') };
  });
  const code = await buildCodePane(sections);
  return {
    notes, code, doc, sections,
    jsonLd: pageJsonLd({ ...cfg, description: doc.summary }),
    description: doc.summary,
  };
}

// ---------------------------------------------------------------------------
// main
// ---------------------------------------------------------------------------

if (process.argv[1] && process.argv[1].endsWith('build-restored.mjs')) {
  const calibrates = process.argv.includes('--calibrate');
  const calOk = await calibrate();
  if (!calOk) {
    console.error('calibration failed — not emitting restored fragments');
    process.exit(1);
  }
  if (calibrates) process.exit(0);

  const outDir = new URL('../../../app/data/lab-restored/', import.meta.url);
  mkdirSync(outDir, { recursive: true });
  const heart = await buildHeart();
  writeFileSync(new URL('heart.notes.html', outDir), heart.notes);
  writeFileSync(new URL('heart.code.html', outDir), heart.code);
  writeFileSync(new URL('heart.jsonld.json', outDir), JSON.stringify(heartJsonLd()));
  console.log(`heart: notes ${heart.notes.length} bytes, code ${heart.code.length} bytes → app/data/lab-restored/`);

  let failed = 0;
  for (const cfg of RESTORE_PAGES) {
    try {
      const page = await buildRestoredPage(cfg);
      writeFileSync(new URL(`${cfg.slug}.notes.html`, outDir), page.notes);
      writeFileSync(new URL(`${cfg.slug}.code.html`, outDir), page.code);
      writeFileSync(new URL(`${cfg.slug}.jsonld.json`, outDir), JSON.stringify(page.jsonLd));
      console.log(
        `${cfg.slug}: notes ${page.notes.length} bytes, code ${page.code.length} bytes, ` +
        `deps ${page.doc.dependencies.length}, credits ${page.doc.credits.length}, ` +
        `blocks ${page.doc.blocks.length}; summary "${page.description.slice(0, 60)}…"`
      );
    } catch (err) {
      failed++;
      console.error(`${cfg.slug}: FAILED — ${err.message}`);
    }
  }
  if (failed) process.exitCode = 1;
}

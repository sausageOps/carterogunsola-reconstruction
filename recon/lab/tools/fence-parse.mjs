// Jina fence parser (Phase 12 lab restore).
//
// Jina prints each lab Code-pane EC block as a ``` fence whose body is the
// gutter line number immediately followed by the raw source line, with no
// separators: `1<!-- GSAP -->2<script …>3\n4<!-- …`. A blank source line N
// prints as the digits N followed by a literal newline — so the only
// newlines inside a healthy fence body are blank-line markers.
//
// Tiling rules (calibrated on dial-jina-0 against the byte-exact capture):
//  - content slices must never contain '\n' (except the blank-line marker);
//    this rejects false boundaries where source digits mimic a line number
//    (e.g. the `3` of `gsap@3.15.0`), because the wrong split desyncs the
//    blank-line structure. Candidates are tried in position order with
//    backtracking.
//  - Jina sometimes DROPS a run of lines and emits a hard newline (heart
//    Script: `8const` \n `13  coast:`). When the expected number is absent
//    and a newline+digits D > expected appears, record a gap anomaly and
//    resume at D.
//  - open fences (body truncated at a chunk edge, no closing ```): the tail
//    has no anchoring structure, so prefer the fewest-lines reading (the
//    whole remainder is the final, partial line) when it contains no '\n'.
//  - Jina's math mangler rewrites CSS-template `${NAME}px` regions inside
//    Script fences as display math, consuming 3 phantom line numbers:
//      printed:   K:`  width:$ {`  K+1:`    NAME`  K+2:`  }`  K+3:`  px;`
//      true:      K:`  width: ${NAME}px;`
//    repairMangles() merges those four printed lines back into one.
//  - save-time annotation lines ((chunk …), [NOTE: …], (footer …)) are
//    stripped before parsing.
import { readFileSync, readdirSync } from 'node:fs';

const HERE = new URL('.', import.meta.url);
const RECOVERED = new URL('../recovered/', HERE);

/**
 * Golden-verified content-line rules (0 violations across 4115 byte-exact
 * dial/vocal-orb source lines): a true source line never has trailing
 * whitespace, never ends with '@', never starts with '.'+digit, and is never
 * empty (blank lines always print as the '\n' marker). These reject false
 * marker boundaries that the newline rule alone can't: the `3` of
 * `gsap@3.15.0` (continuation would start `.15.0/…`, previous slice would
 * end `gsap@`) and the `3` of `SPACING = 34;` (slice would end with a
 * space) both produce newline-free slices yet violate these rules.
 */
function plausibleContent(raw) {
  if (raw === '') return false;
  if (raw !== raw.trimEnd()) return false;
  if (raw.endsWith('@')) return false;
  if (/^\.\d/.test(raw)) return false;
  if (raw.startsWith(';')) return false; // golden: 0/3932 lines start with ';'
  return true;
}

// Marker-position rules (golden-verified on 3932 byte-exact source lines):
//  R6 hard: a marker is never followed by a digit (no true line starts with
//     a digit) — kills matches on decimal fractions like the `4` of `2.4;`.
//  R7 hard: a marker is never preceded by `.` after a digit (decimal
//     interior) — kills the `4` of `const DOT_R = 2.4;`.
//  R5 soft (preference): markers preceded by a digit are tried LAST, not
//     rejected — 4 golden lines end with a digit (`size: 0.3`, `…r = 40`)
//     and printed runs can merge (`size: 1` + marker `18` prints as `118`).
function markerStartOk(body, idx, needle) {
  const after = body[idx + needle.length];
  if (after !== undefined && after >= '0' && after <= '9') return false;
  if (idx >= 2 && body[idx - 1] === '.' && body[idx - 2] >= '0' && body[idx - 2] <= '9') return false;
  return true;
}
const digitBefore = (body, idx) => idx > 0 && body[idx - 1] >= '0' && body[idx - 1] <= '9';

/**
 * Tile a fence body into numbered lines.
 * Returns { lines, printed, anomalies, closed } or null if untileable.
 */
export function parseFenceBody(body, closed = true) {
  const anomalies = [];
  const failMemo = new Set();
  const lines = [];
  const printed = [];

  function rec(pos, n) {
    const key = pos + ':' + n;
    if (failMemo.has(key)) return false;
    const needle = String(n);
    if (!body.startsWith(needle, pos)) {
      failMemo.add(key);
      return false;
    }
    const contentStart = pos + needle.length;

    // Open-fence tail: no anchoring structure left → whole remainder is the
    // final (partial) line.
    if (!closed) {
      const rest = body.slice(contentStart).replace(/\n+$/, '');
      if (!rest.includes('\n')) {
        lines.push(rest);
        printed.push(n);
        return true;
      }
    }

    // Candidate boundaries: occurrences of String(n+1) whose marker position
    // passes the run-boundary rules. Content must be newline-free (the only
    // legal newline is the blank-line marker). Digit-preceded markers (R5)
    // are deferred until all clean candidates fail.
    const next = String(n + 1);
    const deferred = [];
    let idx = body.indexOf(next, contentStart);
    while (idx >= 0) {
      if (!markerStartOk(body, idx, next)) {
        idx = body.indexOf(next, idx + 1);
        continue;
      }
      const raw = body.slice(contentStart, idx);
      if (raw === '\n' || (!raw.includes('\n') && plausibleContent(raw))) {
        if (digitBefore(body, idx)) {
          deferred.push(idx);
        } else {
          lines.push(raw === '\n' ? '' : raw);
          printed.push(n);
          if (rec(idx, n + 1)) return true;
          lines.pop();
          printed.pop();
        }
      }
      idx = body.indexOf(next, idx + 1);
    }
    for (const cand of deferred) {
      const raw = body.slice(contentStart, cand);
      lines.push(raw === '\n' ? '' : raw);
      printed.push(n);
      if (rec(cand, n + 1)) return true;
      lines.pop();
      printed.pop();
    }

    // Gap jump: Jina dropped printed lines n+1..d-1 and emitted a hard
    // newline before resuming at d. A real gap skips at least one number
    // (d === n+1 after a newline is the blank-line boundary, handled above;
    // gap-jumping it would rescue false splits like the `3` of gsap@3.15.0).
    const gapMatch = /\n(\d+)/.exec(body.slice(contentStart));
    if (gapMatch) {
      const d = Number(gapMatch[1]);
      const nlPos = contentStart + gapMatch.index;
      if (d > n + 1) {
        const content = body.slice(contentStart, nlPos);
        if (!content.includes('\n') && plausibleContent(content)) {
          lines.push(content);
          printed.push(n);
          const mark = anomalies.length;
          anomalies.push(`gap: printed ${n} -> ${d} (${d - n - 1} lines missing after printed ${n})`);
          if (rec(nlPos + 1, d)) return true;
          lines.pop();
          printed.pop();
          anomalies.length = mark;
        }
      }
    }

    // Final line of a closed fence (R6 applies: marker not followed by a
    // digit; '' is legal — the fence ending on a blank-line marker whose
    // newline was consumed by the fence terminator).
    const rest = body.slice(contentStart);
    const trimmed = rest.replace(/\n+$/, '');
    if (
      trimmed === '' ||
      (!trimmed.includes('\n') && !(trimmed[0] >= '0' && trimmed[0] <= '9') && plausibleContent(trimmed))
    ) {
      lines.push(trimmed);
      printed.push(n);
      return true;
    }
    failMemo.add(key);
    return false;
  }

  const ok = rec(0, 1);
  if (!ok) return null;
  return { lines: lines.slice(), printed: printed.slice(), anomalies, closed, tailPartial: !closed };
}

/**
 * Repair Jina math-mangled `${NAME}` regions.
 * Returns { lines, printed, repairs, issues }.
 */
export function repairMangles(lines, printed) {
  const issues = [];
  let repairs = 0;
  const out = [];
  const outPrinted = [];
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (l.endsWith('$ {') && i + 3 < lines.length) {
      const nameLine = lines[i + 1];
      const closeLine = lines[i + 2];
      const tailLine = lines[i + 3];
      const m = /^ {2,}([A-Za-z_$][\w$]*)$/.exec(nameLine);
      if (m && /^ {2,}\}$/.test(closeLine) && /^ {2}/.test(tailLine)) {
        out.push(l.slice(0, -3) + ' ${' + m[1] + '}' + tailLine.replace(/^ {2}/, ''));
        outPrinted.push(printed[i]);
        repairs++;
        i += 3;
        continue;
      }
      issues.push(`unrepaired '$ {' at printed line ${printed[i]}`);
    }
    out.push(l);
    outPrinted.push(printed[i]);
  }
  return { lines: out, printed: outPrinted, repairs, issues };
}

/** Strip save-time annotation lines from chunk markdown. */
export function stripAnnotations(md) {
  return md
    .replace(/^\[NOTE:[^\n]*\n?/gm, '')
    .replace(/^\((?:chunk|footer)[^\n]*\)\n?/gm, '');
}

/**
 * Jina soft-wraps very long fence-body lines with hard newlines mid-content
 * (e.g. `var(--fs-mono-m\n\neta);`). The only STRUCTURAL newlines in a
 * fence body are blank-line markers (`N\n` + digits of N+1), so any run of
 * newlines NOT followed by digits is a soft wrap → strip it (join exactly,
 * no space).
 */
export function stripSoftWraps(body) {
  return body.replace(/\n+(?!\d)/g, '');
}

/**
 * Extract all ``` fences from concatenated chunk markdown, with the label
 * line preceding each fence (Setup / Style / Script …) and a closed flag.
 */
export function parsePageFences(markdown) {
  const fences = [];
  const re = /```[^\n]*\n([\s\S]*?)(\n```|$)/g;
  let m;
  while ((m = re.exec(markdown))) {
    const before = markdown.slice(0, m.index);
    const labelMatch = /([A-Za-z][\w -]*)\n\n$/.exec(before);
    fences.push({
      label: labelMatch ? labelMatch[1].trim() : null,
      body: m[1],
      closed: m[2] === '\n```',
      at: m.index,
    });
  }
  return fences;
}

/**
 * Load + concat a page's recovered chunks (sorted by index).
 * v2 files (`<page>-<i>.md`, single coherent fetch) join with '' — exact
 * stream continuation. v1 files (`<page>-jina-<i>.md`) were byte-inspected
 * 2026-10-30: every non-final chunk is an ~8KB tile of ONE coherent fetch
 * that ends mid-token, with exactly one '\n' appended at save time. So they
 * also reconstruct the exact stream by stripping that one trailing '\n' per
 * file and joining with '' (fixes the polka-dots Script seam `35e-`+`4` and
 * the threejs-test prose seam `lob`+`e pinches`). Annotations are stripped
 * after joining. (The cross-fetch heart/dynamic-scrollbar v1 sets are
 * superseded by clean v2 refetches.)
 */
export function loadPageMarkdown(pageName, dir = RECOVERED) {
  const v2dir = new URL('v2/', dir);
  let files = [];
  let base = v2dir;
  let v1 = false;
  try {
    files = readdirSync(v2dir)
      .filter((f) => f.startsWith(pageName + '-') && f.endsWith('.md') && /-\d+\.md$/.test(f))
      .sort((a, b) => Number(a.match(/-(\d+)\.md$/)[1]) - Number(b.match(/-(\d+)\.md$/)[1]));
  } catch {}
  if (!files.length) {
    base = dir;
    v1 = true;
    files = readdirSync(dir)
      .filter((f) => f.startsWith(pageName + '-jina-') && f.endsWith('.md'))
      .sort((a, b) => Number(a.match(/jina-(\d+)/)[1]) - Number(b.match(/jina-(\d+)/)[1]));
  }
  if (!files.length) return null;
  const raw = files
    .map((f) => {
      let text = readFileSync(new URL(f, base), 'utf8');
      if (v1) {
        // v1 saves appended annotation lines at the file END (`[NOTE: …]`,
        // `(remainder …)`) plus exactly one trailing '\n'. Strip them PER FILE
        // before joining: after a '' join an EOF annotation would glue to the
        // next chunk and stripAnnotations' `[^\n]*` would then eat real
        // stream content up to the next newline (this corrupted the
        // dynamic-scrollbar Style seam `177.sb__cov`+`er {178…`).
        text = text.replace(/(\n*\[NOTE:[^\n]*\n?)+$/, '');
        text = text.replace(/(\n*\((?:chunk|footer|remainder)[^\n]*\n?)+$/, '');
        text = text.replace(/\n$/, '');
      }
      return text;
    })
    .join('');
  return { files, markdown: stripAnnotations(raw) };
}

/** Full audit for one page: fences → parsed → repaired → report. */
export function auditPage(pageName, dir = RECOVERED) {
  const loaded = loadPageMarkdown(pageName, dir);
  if (!loaded) return null;
  const fences = parsePageFences(loaded.markdown);
  const report = { page: pageName, files: loaded.files, fences: [] };
  for (const f of fences) {
    const parsed = parseFenceBody(stripSoftWraps(f.body), f.closed);
    if (!parsed) {
      report.fences.push({ label: f.label, error: 'tiling failed', closed: f.closed, bodyHead: f.body.slice(0, 100) });
      continue;
    }
    const repaired = repairMangles(parsed.lines, parsed.printed);
    const entry = {
      label: f.label,
      closed: f.closed,
      parsedLines: parsed.lines.length,
      trueLines: repaired.lines.length,
      lastPrinted: parsed.printed[parsed.printed.length - 1],
      repairs: repaired.repairs,
      anomalies: [...parsed.anomalies, ...repaired.issues],
      _lines: repaired.lines,
    };
    report.fences.push(entry);
  }
  return report;
}

if (process.argv[1] && process.argv[1].endsWith('fence-parse.mjs')) {
  const pages = process.argv.slice(2);
  const list = pages.length
    ? pages
    : ['dial', 'heart', 'polka-dots', 'live-cursors', 'dynamic-scrollbar', 'rotating-gallery', 'paste-up', 'threejs-test'];
  for (const p of list) {
    const r = auditPage(p);
    if (!r) {
      console.log(p, ': no chunks');
      continue;
    }
    console.log(`== ${p} (${r.files.length} chunks)`);
    for (const f of r.fences) {
      const { _lines, ...rest } = f;
      console.log('  ', JSON.stringify(rest));
    }
  }
}

// Extract the four Expressive Code blocks (notes ts + code-pane html/css/js)
// from the byte-exact dial capture into golden/dial-blocks.json.
// Ground truth for the theme + serializer calibration (Phase 12 lab restore).
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

// usage: node extract-golden.mjs [capture-file] [out-name]  (defaults: dial)
const CAPTURE = process.argv[2] ?? '../../../pages/lab_dial.html';
const OUT = process.argv[3] ?? 'dial';
const html = readFileSync(new URL(CAPTURE, import.meta.url), 'utf8');
const codePaneAt = html.indexOf('data-docs-pane="code"');

function decodeEntities(s) {
  return s
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

const blocks = [];
let cursor = 0;
while (true) {
  const figAt = html.indexOf('<div class="expressive-code">', cursor);
  if (figAt < 0) break;
  const endAt = html.indexOf('</figure></div>', figAt);
  if (endAt < 0) break;
  const raw = html.slice(figAt, endAt + '</figure></div>'.length);
  cursor = endAt + 1;

  const lang = raw.match(/data-language="([^"]+)"/)[1];
  const pane = figAt < codePaneAt ? 'notes' : 'code';

  // data-code holds the source: lines joined with U+007F, attribute-escaped.
  const dcAt = raw.indexOf('data-code="');
  const dcEnd = raw.indexOf('"><div></div></button>', dcAt);
  const dataCode = decodeEntities(raw.slice(dcAt + 11, dcEnd));
  const code = dataCode.split('\u007f').join('\n');

  // Strip EC asset tags (the rebuild's paneContents() removes them too).
  let markup = raw
    .replace(/^<div class="expressive-code"><link[^>]*><script[^>]*><\/script>/, '<div class="expressive-code">')
    .replace(/^<div class="expressive-code"><link[^>]*\/><script[^>]*><\/script>/, '<div class="expressive-code">');

  blocks.push({ pane, lang, code, markup });
}

// indent-style survey
const indents = [...html.matchAll(/--ecIndent:(\d+)ch/g)].map((m) => Number(m[1]));
console.log('blocks:', blocks.map((b) => `${b.pane}/${b.lang}/${b.code.split('\n').length}ln`).join(', '));
console.log('indent values seen:', [...new Set(indents)].sort((a, b) => a - b).join(','));

mkdirSync(new URL('./golden', import.meta.url), { recursive: true });
writeFileSync(new URL(`./golden/${OUT}-blocks.json`, import.meta.url), JSON.stringify(blocks, null, 1));
console.log(`wrote golden/${OUT}-blocks.json`);

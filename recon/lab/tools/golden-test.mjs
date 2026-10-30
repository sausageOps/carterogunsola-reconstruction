// Golden test: render the four captured dial blocks and diff byte-for-byte
// against the original markup. Reports first divergence + span-level
// mismatch samples per block.
import { readFileSync, readdirSync } from 'node:fs';
import { renderBlock } from './ec-render.mjs';

// Runs every golden set in ./golden (dial + any later validation captures).
const goldenFiles = readdirSync(new URL('./golden', import.meta.url)).filter((f) => f.endsWith('-blocks.json')).sort();
const blocks = [];
for (const f of goldenFiles) {
  const setName = f.replace(/-blocks\.json$/, '');
  for (const b of JSON.parse(readFileSync(new URL(`./golden/${f}`, import.meta.url), 'utf8'))) {
    blocks.push({ ...b, setName });
  }
}

function firstDiff(a, b) {
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i++;
  return {
    at: i,
    got: JSON.stringify(a.slice(Math.max(0, i - 60), i + 90)),
    want: JSON.stringify(b.slice(Math.max(0, i - 60), i + 90)),
  };
}

function spanDiffReport(got, want) {
  const re = /<span style="(--0:#[0-9A-F]+;--1:#[0-9A-F]+)">((?:(?!<\/span>).)*)<\/span>/g;
  const g = [...got.matchAll(re)].map((m) => [m[1], m[2]]);
  const w = [...want.matchAll(re)].map((m) => [m[1], m[2]]);
  const out = [];
  for (let i = 0; i < Math.max(g.length, w.length) && out.length < 10; i++) {
    if (!g[i] || !w[i] || g[i][0] !== w[i][0] || g[i][1] !== w[i][1]) {
      out.push({ i, got: g[i], want: w[i] });
    }
  }
  return { countG: g.length, countW: w.length, sample: out };
}

let pass = 0;
for (const block of blocks) {
  const got = await renderBlock(block.code, block.lang, {
    gutter: block.pane === 'code',
    pane: block.pane,
  });
  if (got === block.markup) {
    console.log(`PASS ${block.setName} ${block.pane}/${block.lang} (${block.code.split('\n').length} lines, ${got.length} bytes)`);
    pass++;
    continue;
  }
  console.log(`FAIL ${block.setName} ${block.pane}/${block.lang}: got ${got.length} bytes, want ${block.markup.length}`);
  const d = firstDiff(got, block.markup);
  console.log(`  first diff @${d.at}\n   got: ${d.got}\n  want: ${d.want}`);
  const s = spanDiffReport(got, block.markup);
  console.log(`  spans got=${s.countG} want=${s.countW}`);
  for (const m of s.sample.slice(0, 6)) {
    console.log(`   [${m.i}] got ${JSON.stringify(m.got)} want ${JSON.stringify(m.want)}`);
  }
}
console.log(`\n${pass}/${blocks.length} blocks byte-identical`);

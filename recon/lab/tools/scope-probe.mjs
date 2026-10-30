// Probe: TextMate scopes per token for the golden dial blocks.
// Answers: (a) html embedded <style> tokenization; (b) leading-whitespace
// scope stacks vs golden indent shape (styled vs bare); (c) unit/dimension
// and template-variable scopes.
import { createRequire } from 'node:module';
import { readFileSync, writeFileSync } from 'node:fs';
const require = createRequire(import.meta.url);
const vt = require('@shikijs/vscode-textmate');
const onig = require('@shikijs/engine-oniguruma');

const inlined = await import('/home/user/carterogunsola-reconstruction/node_modules/@shikijs/engine-oniguruma/dist/wasm-inlined.mjs');
await onig.loadWasm(inlined.default ?? inlined);
const engine = await onig.createOnigurumaEngine();
const onigLib = {
  createOnigScanner: (patterns) => engine.createScanner(patterns),
  createOnigString: (s) => engine.createString(s),
};

const LANG_DIR = '/home/user/carterogunsola-reconstruction/node_modules/@shikijs/langs/dist/';
const SCOPE_TO_FILE = {
  'source.css': 'css',
  'source.js': 'javascript',
  'source.ts': 'typescript',
  'text.html.basic': 'html',
};
const grammarMap = {};
for (const [scopeName, file] of Object.entries(SCOPE_TO_FILE)) {
  const m = await import(LANG_DIR + file + '.mjs');
  let g = m.default;
  if (Array.isArray(g)) g = g[0];
  if (typeof g === 'function') g = await g();
  grammarMap[scopeName] = g;
}
const registry = new vt.Registry({
  onigLib,
  loadGrammar: (scopeName) => grammarMap[scopeName] ?? null,
});

const blocks = JSON.parse(readFileSync(new URL('./golden/dial-blocks.json', import.meta.url), 'utf8'));

const gshape = (g) => {
  const m = g.match(/<span class="indent">(<span style="[^"]*">|[^<])/);
  if (!m) return '-';
  return m[1].startsWith('<span') ? 'styled' : 'bare';
};

export async function tokenizeBlock(lang, code) {
  const scope = { css: 'source.css', js: 'source.js', ts: 'source.ts', html: 'text.html.basic' }[lang];
  const g = await registry.loadGrammar(scope);
  const lines = code.split('\n');
  let ruleStack = vt.INITIAL;
  return lines.map((line) => {
    const r = g.tokenizeLine(line, ruleStack);
    ruleStack = r.ruleStack;
    return r.tokens.map((t) => ({
      text: line.slice(t.startIndex, t.endIndex),
      scopes: t.scopes,
    }));
  });
}

const mode = process.argv[2] ?? 'indent';

if (mode === 'indent') {
  for (const lang of ['css', 'js', 'html']) {
    const b = blocks.find((x) => x.lang === lang);
    const tokLines = await tokenizeBlock(lang, b.code);
    const glines = b.markup.split('<div class="ec-line"').slice(1);
    const table = [];
    tokLines.forEach((toks, i) => {
      const first = toks[0];
      if (!first || !/^\s+$/.test(first.text) || first.text === '') return;
      table.push({ ln: i + 1, golden: gshape(glines[i]), depth: first.scopes.length, scopes: first.scopes.join(' > ') });
    });
    const byShape = {};
    for (const row of table) {
      const key = row.golden + '|depth' + row.depth;
      byShape[key] = (byShape[key] ?? 0) + 1;
    }
    console.log(`== ${lang}: shape x ws-scope-depth:`, JSON.stringify(byShape));
    const odd = table.filter((r) => (r.golden === 'styled') !== (r.depth > 1));
    console.log(`   rule (styled ⟺ depth>1) violations: ${odd.length}`);
    odd.slice(0, 6).forEach((r) => console.log('   ', r.ln, r.golden, r.depth, r.scopes.slice(0, 110)));
  }
}

if (mode === 'tokens') {
  // (c) unit/dimension + template variable scopes
  const js = blocks.find((x) => x.lang === 'js');
  const tl = await tokenizeBlock('js', js.code);
  const li = js.code.split('\n').findIndex((l) => l.includes('const svg = (paths)'));
  console.log('template line tokens:');
  for (const t of tl[li]) console.log('   ', JSON.stringify(t.text), '->', t.scopes[t.scopes.length - 1], '|', t.scopes.join('>').slice(0, 90));
  const css = blocks.find((x) => x.lang === 'css');
  const tc = await tokenizeBlock('css', css.code);
  const ci = css.code.split('\n').findIndex((l) => l.trim() === 'height: 1px;');
  console.log('\ncss 1px line tokens:');
  for (const t of tc[ci]) console.log('   ', JSON.stringify(t.text), '->', t.scopes[t.scopes.length - 1]);
  const hi = css.code.split('\n').findIndex((l) => l.includes('--dial-clear'));
  console.log('\ncss --dial-clear line tokens:');
  for (const t of tc[hi]) console.log('   ', JSON.stringify(t.text), '->', t.scopes[t.scopes.length - 1]);
  // html embedded style
  const html = blocks.find((x) => x.lang === 'html');
  const th = await tokenizeBlock('html', html.code);
  const fi = html.code.split('\n').findIndex((l) => l.includes('--font-sans'));
  console.log('\nhtml --font-sans line tokens:');
  for (const t of th[fi]) console.log('   ', JSON.stringify(t.text), '->', t.scopes[t.scopes.length - 1], '|', t.scopes.join('>').slice(0, 80));
}

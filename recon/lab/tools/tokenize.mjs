// Raw TextMate tokenization with the same grammars EC/shiki use
// (@shikijs/langs), giving per-token scope stacks for theme resolution.
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const vt = require('@shikijs/vscode-textmate');
const onig = require('@shikijs/engine-oniguruma');

const LANG_DIR = new URL('../../../node_modules/@shikijs/langs/dist/', import.meta.url).href;
const WASM_MOD = new URL('../../../node_modules/@shikijs/engine-oniguruma/dist/wasm-inlined.mjs', import.meta.url).href;

let registryPromise = null;
function getRegistry() {
  if (!registryPromise) {
    registryPromise = (async () => {
      const inlined = await import(WASM_MOD);
      await onig.loadWasm(inlined.default ?? inlined);
      const engine = await onig.createOnigurumaEngine();
      const onigLib = {
        createOnigScanner: (patterns) => engine.createScanner(patterns),
        createOnigString: (s) => engine.createString(s),
      };
      const grammarMap = {};
      for (const file of ['css', 'javascript', 'typescript', 'html']) {
        const m = await import(LANG_DIR + file + '.mjs');
        let arr = m.default;
        if (!Array.isArray(arr)) arr = [arr];
        for (let g of arr) {
          if (typeof g === 'function') g = await g();
          if (g && g.scopeName) grammarMap[g.scopeName] = g;
        }
      }
      return new vt.Registry({ onigLib, loadGrammar: (s) => grammarMap[s] ?? null });
    })();
  }
  return registryPromise;
}

const LANG_SCOPE = {
  css: 'source.css',
  js: 'source.js',
  javascript: 'source.js',
  ts: 'source.ts',
  typescript: 'source.ts',
  html: 'text.html.basic',
};

/** Tokenize `code` → array of lines, each an array of {text, scopes}. */
export async function tokenize(lang, code) {
  const registry = await getRegistry();
  const scopeName = LANG_SCOPE[lang];
  if (!scopeName) throw new Error(`unsupported language: ${lang}`);
  const grammar = await registry.loadGrammar(scopeName);
  const lines = code.split('\n');
  let ruleStack = vt.INITIAL;
  return lines.map((line) => {
    const r = grammar.tokenizeLine(line, ruleStack);
    ruleStack = r.ruleStack;
    return r.tokens.map((t) => ({
      text: line.slice(t.startIndex, t.endIndex),
      scopes: t.scopes,
    }));
  });
}

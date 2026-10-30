// The lab docs syntax-highlighting theme, reverse-engineered from the
// byte-exact captures (pages/lab_dial.html, pages/lab_vocal-orb.html).
//
// Seven light/dark color pairs. The original renderer merges adjacent tokens
// into one <span> only when they resolve through the SAME theme setting
// entry (golden-verified: `1` + `px` merge — constant.numeric and
// keyword.other.unit share one entry; `` ` ``+quasi+`${` merge into the
// string entry; `paths` / `item.svg` inside a template expression stay
// separate from the `${`…`}` delimiters because they resolve through a
// distinct entry carrying the same green). The entry index is therefore
// part of the resolved token identity, not just the color.
//
// Matching follows real TextMate semantics (vscode-textmate Theme trie):
// a selector's LAST part ("main scope") must prefix-match the token's
// INNERMOST scope; the preceding parts ("parent scopes") must match outer
// scopes in order. Ranking: deeper main-scope match wins; then longer /
// more parent scopes; ties go to the later entry.
export const BASE = { light: '#1E1E1E', dark: '#F7F7F7' };

// Ordered setting entries. key = index + 1 (0 is the base default).
export const ENTRIES = [
  {
    // comments
    scope: ['comment', 'punctuation.definition.comment', 'string.comment'],
    light: '#1E1E1EB0',
    dark: '#F7F7F7A6',
  },
  {
    // strings + template delimiters (backticks, quasi text, `${`, `}`)
    scope: [
      'string',
      'punctuation.definition.string',
      'punctuation.definition.template-expression',
      // style="…" attribute values: the embedded css content tokenizes with
      // innermost scope source.css under the quoted string; golden renders the
      // whole value (quotes included) as one green span.
      'string source.css',
      // escape sequences (`\\(`, `\\n`, `\"`) merge with the enclosing string
      'string constant.character.escape',
      // regex internals (`\s` in /\s+/, groups `(m|ve)`) merge green with the
      // regex slashes; anchors/quantifiers/alternation stay keyword-blue and
      // flags (`g`) stay keyword-blue per golden.
      'string constant.other.character-class',
      'string punctuation.definition.character-class',
      'string punctuation.definition.group',
      'string meta.group',
    ],
    light: '#43601F',
    dark: '#C3D6AD',
  },
  {
    // everything inside a template ${…} that isn't an operator or literal:
    // variables, member-access dots, embedded whitespace. Same green as
    // strings but a distinct entry — golden shows `cx ` / ` R ` merging
    // variable+ws while `+` stays blue and `${`/`}` stay with the string.
    scope: [
      'string variable',
      'string punctuation.accessor',
      'string meta.embedded.line',
      'string meta.template.expression',
      'string punctuation.separator.comma',
      'string meta.brace.round',
      'string meta.brace.curly',
      'string meta.brace.square',
    ],
    light: '#43601F',
    dark: '#C3D6AD',
  },
  {
    // keywords, storage, operators, tag names
    scope: [
      'keyword',
      'storage',
      'entity.name.tag',
      // the @ of css at-rules (`@media` is one blue span in golden)
      'keyword.control.at-rule punctuation.definition.keyword',
    ],
    light: '#2F5885',
    dark: '#A6CBEE',
  },
  {
    // numbers + units (one entry so `1px` merges), constants, attribute
    // names, css values/selectors, font names
    scope: [
      'constant.numeric',
      'constant.language',
      'keyword.other.unit',
      'support.constant',
      'entity.other.attribute-name',
      // the decimal point inside numeric literals (`0.55` is one span in the
      // golden output: `0`, `.`, `55` share this entry and merge)
      'constant.numeric meta.delimiter.decimal.period',
      // the leading dot/hash of css class/id selectors (`.dial` is one span);
      // parent scope keeps attribute-selector brackets `[hidden]` default
      'entity.other.attribute-name punctuation.definition.entity',
      // builtin classes (Promise) are brown, not olive — vocal-orb golden
      'support.class',
    ],
    light: '#7A4A1C',
    dark: '#E6C79C',
  },
  {
    // function names + calls, css functions, builtin classes
    scope: [
      'entity.name.function',
      'support.function',
      'variable.function',
      'meta.function-call.generic',
    ],
    light: '#5E5016',
    dark: '#E9DFAB',
  },
  {
    // css property names
    scope: ['support.type.property-name', 'support.type.vendored.property-name', 'meta.property-name'],
    light: '#37607E',
    dark: '#B0CEE6',
  },
];

function matchesScope(scopeName, pattern) {
  return scopeName === pattern || (scopeName.startsWith(pattern) && scopeName[pattern.length] === '.');
}

// Parent scopes match walking OUTWARD from just outside the innermost scope
// (vscode-textmate _scopePathMatchesParentScopes).
function parentsMatch(stack, parents) {
  // stack: outermost → innermost. Parents walk from inner-1 outward.
  let idx = stack.length - 2;
  for (const parent of parents) {
    let matched = false;
    while (idx >= 0) {
      if (matchesScope(stack[idx], parent)) {
        matched = true;
        idx--;
        break;
      }
      idx--;
    }
    if (!matched) return false;
  }
  return true;
}

/**
 * Resolve a token scope stack (outermost → innermost).
 * Returns { key, light, dark }.
 */
export function resolveToken(scopes) {
  const innermost = scopes[scopes.length - 1];
  let best = null;
  ENTRIES.forEach((entry, entryIdx) => {
    for (const selector of entry.scope) {
      const parts = selector.split(' ');
      const main = parts[parts.length - 1];
      // vscode-textmate reverses parent scopes: innermost parent first.
      const parents = parts.slice(0, -1).reverse();
      if (!matchesScope(innermost, main)) continue;
      if (!parentsMatch(scopes, parents)) continue;
      const scopeDepth = main.split('.').length;
      // rank: scopeDepth desc, then parent pattern lengths desc (pairwise,
      // first vs first), then parent count desc, then later entry wins.
      const rank = [scopeDepth, ...parents.map((p) => p.length), parents.length, entryIdx];
      if (!best || compareRank(rank, best.rank) > 0) {
        best = { key: entryIdx + 1, light: entry.light, dark: entry.dark, rank };
      }
    }
  });
  if (!best) return { key: 0, light: BASE.light, dark: BASE.dark };
  return { key: best.key, light: best.light, dark: best.dark };
}

function compareRank(a, b) {
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const d = (a[i] ?? 0) - (b[i] ?? 0);
    if (d !== 0) return d;
  }
  return 0;
}

export function styleString(res) {
  return `--0:${res.light};--1:${res.dark}`;
}

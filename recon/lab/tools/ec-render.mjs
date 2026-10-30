// Expressive Code rendering calibrated to the original lab docs panes.
//
// Hybrid pipeline (all rules verified byte-for-byte against the captures in
// pages/lab_dial.html — see golden-test.mjs):
//  1. @shikijs/langs grammars via vscode-textmate give the raw token stream
//     (same boundaries the original shiki produced).
//  2. theme.mjs resolves each token to one of the seven color pairs AND a
//     setting-entry key. Adjacent tokens merge into a single span only when
//     they resolve through the SAME entry (the original renderer's behavior:
//     `1px` merges; `${`, `paths`, `}` stay three spans).
//  3. expressive-code 0.44 renders the same code with the same theme and
//     serves purely as the oracle for the <span class="indent"> shape
//     (styled inner span vs bare whitespace), which matched the captures on
//     all 587 indented dial lines.
//
// Markup contract (from the captures):
//  - <div class="expressive-code"><figure class="frame"[ style="--lnWidth:Nch"]>
//    (lnWidth only when >= 100 lines; N = digits of the line count)
//  - <figcaption class="header"></figcaption>
//  - <pre data-language="X" class="wrap" style="--ecMaxLine:Mch"><code>
//  - line: <div class="ec-line" style="--ecIndent:(2+lead)ch">
//      [code pane only: <div class="gutter"><div class="ln" aria-hidden="true">i</div></div>]
//      <div class="code">…</div></div>   (blank line body = literal newline)
//  - <div class="copy"><div aria-live="polite"></div><button title="Copy to
//    clipboard" data-copied="Copied!" data-code="…"><div></div></button></div>
//    data-code = lines joined with U+007F.
//  - Escaping, code pane (hast-util-to-html): text & → &#x26;, < → &#x3C;,
//    > " ' ` raw; attribute " → &#x22;, & → &#x26;, ' → &#x27;, ` → &#x60;, < > raw.
//  - Escaping, notes pane (Astro lab-docs pipeline): text & → &amp;,
//    < → &lt;, > → &gt;, " → &quot;; attribute " → &quot; (& < > ' ` have no
//    captured examples — Astro escapeHTML conventions assumed).
import { ExpressiveCode, ExpressiveCodeTheme } from 'expressive-code';
import { tokenize } from './tokenize.mjs';
import { ENTRIES, BASE, resolveToken, styleString } from './theme.mjs';

function makeEcTheme(type) {
  return new ExpressiveCodeTheme({
    name: `lab-doc-${type}`,
    type,
    colors: {
      'editor.background': type === 'light' ? '#FFFFFF' : '#111111',
      'editor.foreground': type === 'light' ? BASE.light : BASE.dark,
    },
    settings: [
      { settings: { foreground: type === 'light' ? BASE.light : BASE.dark } },
      ...ENTRIES.map((entry) => ({
        scope: entry.scope,
        settings: { foreground: type === 'light' ? entry.light : entry.dark },
      })),
    ],
  });
}

const ec = new ExpressiveCode({
  themes: [makeEcTheme('light'), makeEcTheme('dark')],
  // The captures show raw theme colors — no automatic contrast adjustment.
  minSyntaxHighlightingColorContrast: 0,
});

const escape = {
  code: {
    text: (s) => s.replace(/&/g, '&#x26;').replace(/</g, '&#x3C;'),
    attr: (s) =>
      s.replace(/&/g, '&#x26;').replace(/"/g, '&#x22;').replace(/'/g, '&#x27;').replace(/`/g, '&#x60;'),
  },
  notes: {
    text: (s) =>
      s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'),
    attr: (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;'),
  },
};

// Use the EC 0.44 AST only to learn each line's indent-span shape.
async function indentShapes(code, language) {
  const res = await ec.render({ code, language });
  const figure = res.renderedGroupAst.children.find((c) => c.tagName === 'figure');
  const pre = figure.children.find((c) => c.tagName === 'pre');
  const codeEl = pre.children.find((c) => c.tagName === 'code');
  const astLines = codeEl.children.filter(
    (c) => c.type === 'element' && c.properties?.className?.includes('ec-line')
  );
  return astLines.map((lineNode) => {
    const codeDiv = lineNode.children.find(
      (c) => c.type === 'element' && c.tagName === 'div' && c.properties?.className?.includes('code')
    );
    const indent = codeDiv?.children?.find(
      (c) => c.type === 'element' && c.properties?.className?.includes('indent')
    );
    if (!indent) return { shape: 'none' };
    const inner = indent.children?.find((c) => c.type === 'element');
    if (inner?.properties?.style) return { shape: 'styled', style: inner.properties.style };
    return { shape: 'bare' };
  });
}

/**
 * Render one code block to the original's exact markup.
 * @param {string} code source text (lines joined with \n)
 * @param {string} language pre data-language (js, ts, css, html, …)
 * @param {{gutter?: boolean, pane?: 'code'|'notes'}} opts
 */
export async function renderBlock(code, language, opts = {}) {
  const { gutter = false, pane = 'code' } = opts;
  const esc = escape[pane] ?? escape.code;

  const sourceLines = code.split('\n');
  const lineCount = sourceLines.length;
  const maxLine = Math.max(...sourceLines.map((l) => l.length));

  const [tokenLines, shapes] = await Promise.all([
    tokenize(language, code),
    indentShapes(code, language),
  ]);
  if (tokenLines.length !== lineCount || shapes.length !== lineCount) {
    throw new Error(`line count mismatch: tokens ${tokenLines.length}, shapes ${shapes.length}, source ${lineCount}`);
  }

  let linesHtml = '';
  for (let i = 0; i < lineCount; i++) {
    const src = sourceLines[i];
    const lead = src.match(/^\s*/)[0].length;
    const shape = shapes[i];
    let body;
    if (src === '') {
      body = '\n';
    } else {
      // Resolve each token against the theme, then emit the leading
      // whitespace as the indent span (shape from the EC oracle) and merge
      // adjacent equal-entry tokens into single spans.
      const resolved = tokenLines[i].map((tok) => {
        const res = resolveToken(tok.scopes);
        return { text: tok.text, style: styleString(res), key: res.key };
      });
      const indentBuf = src.slice(0, lead);
      let indentStyle = styleString(resolveToken(['source']));
      {
        let cursor = 0;
        for (const tok of resolved) {
          if (cursor >= lead) break;
          indentStyle = tok.style;
          cursor += tok.text.length;
        }
      }
      body = '';
      if (lead > 0) {
        body +=
          shape.shape === 'styled'
            ? `<span class="indent"><span style="${indentStyle}">${esc.text(indentBuf)}</span></span>`
            : `<span class="indent">${esc.text(indentBuf)}</span>`;
      }
      const merged = [];
      let consumed = 0;
      for (const tok of resolved) {
        const start = consumed;
        consumed += tok.text.length;
        if (consumed <= lead) continue;
        const text = start < lead ? tok.text.slice(lead - start) : tok.text;
        const last = merged[merged.length - 1];
        if (last && last.key === tok.key && last.style === tok.style) last.text += text;
        else merged.push({ text, style: tok.style, key: tok.key });
      }
      body += merged.map((t) => `<span style="${t.style}">${esc.text(t.text)}</span>`).join('');
    }
    const gutterHtml = gutter
      ? `<div class="gutter"><div class="ln" aria-hidden="true">${i + 1}</div></div>`
      : '';
    linesHtml += `<div class="ec-line" style="--ecIndent:${2 + lead}ch">${gutterHtml}<div class="code">${body}</div></div>`;
  }

  const lnWidth = lineCount >= 100 ? ` style="--lnWidth:${String(lineCount).length}ch"` : '';
  const dataCode = esc.attr(sourceLines.join('\u007f'));

  return (
    `<div class="expressive-code">` +
    `<figure class="frame"${lnWidth}>` +
    `<figcaption class="header"></figcaption>` +
    `<pre data-language="${language}" class="wrap" style="--ecMaxLine:${maxLine}ch"><code>${linesHtml}</code></pre>` +
    `<div class="copy"><div aria-live="polite"></div>` +
    `<button title="Copy to clipboard" data-copied="Copied!" data-code="${dataCode}"><div></div></button></div>` +
    `</figure></div>`
  );
}

// Server/build-time use only. The two captured pages contain the original Notes
// and syntax-highlighted Code panes; retain those instead of duplicating nearly
// two megabytes of evidence or recreating the experiment implementations.
import indexHtml from '../../pages/lab.html?raw';
import dialHtml from '../../pages/lab_dial.html?raw';
import vocalOrbHtml from '../../pages/lab_vocal-orb.html?raw';

function jsonLd(html: string): Record<string, unknown> {
  const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (!match) throw new Error('Missing Lab JSON-LD in saved source evidence');
  return JSON.parse(match[1]);
}

// Find the end of a real HTML tag while ignoring <, > and quotes inside
// attributes. Expressive Code's data-code contains literal example markup.
function tagEnd(html: string, start: number): number {
  let quote = '';
  for (let i = start + 1; i < html.length; i++) {
    const char = html[i];
    if (quote) {
      if (char === quote) quote = '';
    } else if (char === '"' || char === "'") {
      quote = char;
    } else if (char === '>') {
      return i + 1;
    }
  }
  throw new Error('Unclosed tag in saved Lab evidence');
}

function paneContents(html: string, pane: 'notes' | 'code'): string {
  const markerAt = html.indexOf(`data-docs-pane="${pane}"`);
  const openAt = html.lastIndexOf('<div ', markerAt);
  if (markerAt < 0 || openAt < 0) throw new Error(`Missing ${pane} pane in saved Lab evidence`);
  const contentAt = tagEnd(html, openAt);
  let cursor = contentAt;
  let depth = 1;
  const edits: Array<[number, number, string]> = [];
  const localSymbols = new Set<string>();
  const symbolUses: Array<[number, number, string, string]> = [];

  while (cursor < html.length) {
    const start = html.indexOf('<', cursor);
    if (start < 0) break;
    if (html.startsWith('<!--', start)) {
      const end = html.indexOf('-->', start + 4);
      if (end < 0) throw new Error('Unclosed comment in saved Lab evidence');
      cursor = end + 3;
      continue;
    }
    const end = tagEnd(html, start);
    const tag = html.slice(start, end);
    const name = tag.match(/^<\s*(\/?)\s*([a-z][\w:-]*)\b/i);
    if (!name) { cursor = end; continue; }
    const closing = Boolean(name[1]);
    const element = name[2].toLowerCase();

    if (element === 'div') {
      depth += closing ? -1 : 1;
      if (depth === 0) {
        // Captured SVG symbols share IDs with the existing global chrome. Give
        // document-owned symbols a namespace while preserving their artwork and
        // keeping code examples inside data-code attributes completely intact.
        for (const [useStart, useEnd, useTag, id] of symbolUses) {
          if (localSymbols.has(id)) {
            edits.push([useStart, useEnd, useTag.replace(`#${id}`, `#lab-doc:${id}`)]);
          }
        }
        let result = '';
        let from = contentAt;
        for (const [editStart, editEnd, replacement] of edits.sort((a, b) => a[0] - b[0])) {
          result += html.slice(from, editStart) + replacement;
          from = editEnd;
        }
        return result + html.slice(from, start);
      }
    }
    if (element === 'symbol' && !closing) {
      const id = tag.match(/\bid\s*=\s*(["'])(ai:local:[^"']+)\1/)?.[2];
      if (id) {
        localSymbols.add(id);
        edits.push([start, end, tag.replace(id, `lab-doc:${id}`)]);
      }
    }
    if (element === 'use' && !closing) {
      const id = tag.match(/\bhref\s*=\s*(["'])#(ai:local:[^"']+)\1/)?.[2];
      if (id) symbolUses.push([start, end, tag, id]);
    }
    if (element === 'script' && !closing) {
      // These are the original Expressive Code enhancer tags. The established
      // shared runtime already provides it; never execute source fragments.
      if (!/\bsrc="\/_astro\/ec\.[^"]+\.js"/.test(tag)) {
        throw new Error(`Unexpected script in ${pane} pane`);
      }
      const closeAt = html.indexOf('</script>', end);
      if (closeAt < 0 || html.slice(end, closeAt).trim()) throw new Error('Unexpected script contents');
      const closeEnd = closeAt + '</script>'.length;
      edits.push([start, closeEnd, '']);
      cursor = closeEnd;
      continue;
    }
    if (element === 'link' && /\bhref="\/_astro\/ec\.[^"]+\.css"/.test(tag)) {
      edits.push([start, end, '']);
    }
    cursor = end;
  }
  throw new Error(`Unclosed ${pane} pane in saved Lab evidence`);
}

export const LAB_INDEX_JSON_LD = jsonLd(indexHtml);

const sources: Record<string, string> = { dial: dialHtml, 'vocal-orb': vocalOrbHtml };

export function labDocumentEvidence(slug: string): {
  notes: string;
  code: string;
  jsonLd: Record<string, unknown>;
} | null {
  const source = sources[slug];
  return source ? {
    notes: paneContents(source, 'notes'),
    code: paneContents(source, 'code'),
    jsonLd: jsonLd(source),
  } : null;
}

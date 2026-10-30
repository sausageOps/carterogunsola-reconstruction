// Server/build-time use only. The two captured pages contain the original Notes
// and syntax-highlighted Code panes; retain those instead of duplicating nearly
// two megabytes of evidence or recreating the experiment implementations.
import indexHtml from '../../pages/lab.html?raw';
import dialHtml from '../../pages/lab_dial.html?raw';
import vocalOrbHtml from '../../pages/lab_vocal-orb.html?raw';
// Restored documents for the seven experiments with no page capture. Built by
// recon/lab/tools/build-restored.mjs from the Jina-recovered markdown
// (prose verbatim) and numbered code fences, rendered through the
// golden-calibrated Expressive Code reconstruction (byte-identical on all
// seven captured dial/vocal-orb blocks; every restored fence round-trips
// byte-exactly back to its recovered stream). Provenance notes: hard-newline
// positions in restored prose are reconstructed (greedy ≤81 wrap — rendered
// text is identical to any other wrap); heart's Notes EC embed language is
// "js" (the original data-language is unrecoverable without a capture; the
// other six Notes have no EC embeds).
import heartNotes from './lab-restored/heart.notes.html?raw';
import heartCode from './lab-restored/heart.code.html?raw';
import heartJsonLd from './lab-restored/heart.jsonld.json';
import liveCursorsNotes from './lab-restored/live-cursors.notes.html?raw';
import liveCursorsCode from './lab-restored/live-cursors.code.html?raw';
import liveCursorsJsonLd from './lab-restored/live-cursors.jsonld.json';
import pasteUpNotes from './lab-restored/paste-up.notes.html?raw';
import pasteUpCode from './lab-restored/paste-up.code.html?raw';
import pasteUpJsonLd from './lab-restored/paste-up.jsonld.json';
import dynamicScrollbarNotes from './lab-restored/dynamic-scrollbar.notes.html?raw';
import dynamicScrollbarCode from './lab-restored/dynamic-scrollbar.code.html?raw';
import dynamicScrollbarJsonLd from './lab-restored/dynamic-scrollbar.jsonld.json';
import rotatingGalleryNotes from './lab-restored/rotating-gallery.notes.html?raw';
import rotatingGalleryCode from './lab-restored/rotating-gallery.code.html?raw';
import rotatingGalleryJsonLd from './lab-restored/rotating-gallery.jsonld.json';
import polkaDotsNotes from './lab-restored/polka-dots.notes.html?raw';
import polkaDotsCode from './lab-restored/polka-dots.code.html?raw';
import polkaDotsJsonLd from './lab-restored/polka-dots.jsonld.json';
import threejsTestNotes from './lab-restored/threejs-test.notes.html?raw';
import threejsTestCode from './lab-restored/threejs-test.code.html?raw';
import threejsTestJsonLd from './lab-restored/threejs-test.jsonld.json';

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

// Restored documents (see provenance notes at the imports above).
const restored: Record<string, { notes: string; code: string; jsonLd: Record<string, unknown> }> = {
  heart: { notes: heartNotes, code: heartCode, jsonLd: heartJsonLd as Record<string, unknown> },
  'live-cursors': { notes: liveCursorsNotes, code: liveCursorsCode, jsonLd: liveCursorsJsonLd as Record<string, unknown> },
  'paste-up': { notes: pasteUpNotes, code: pasteUpCode, jsonLd: pasteUpJsonLd as Record<string, unknown> },
  'dynamic-scrollbar': { notes: dynamicScrollbarNotes, code: dynamicScrollbarCode, jsonLd: dynamicScrollbarJsonLd as Record<string, unknown> },
  'rotating-gallery': { notes: rotatingGalleryNotes, code: rotatingGalleryCode, jsonLd: rotatingGalleryJsonLd as Record<string, unknown> },
  'polka-dots': { notes: polkaDotsNotes, code: polkaDotsCode, jsonLd: polkaDotsJsonLd as Record<string, unknown> },
  'threejs-test': { notes: threejsTestNotes, code: threejsTestCode, jsonLd: threejsTestJsonLd as Record<string, unknown> },
};

export function labDocumentEvidence(slug: string): {
  notes: string;
  code: string;
  jsonLd: Record<string, unknown>;
} | null {
  const source = sources[slug];
  if (source) {
    return {
      notes: paneContents(source, 'notes'),
      code: paneContents(source, 'code'),
      jsonLd: jsonLd(source),
    };
  }
  return restored[slug] ?? null;
}

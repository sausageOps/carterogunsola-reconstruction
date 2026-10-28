// Phase 5 — the post's two server-highlighted code blocks, recovered verbatim.
//
// The original page carries expressive-code output: each line is token spans with
// `--0` (light theme) and `--1` (dark theme) colours plus its `--ecIndent` measure, and
// the copy button stores the raw source with U+007F as the newline separator. All of it
// is copied from pages/writing_the-personal-starter.html so the shared ExpressiveCode
// component renders the same markup — except the gutter: the writing post has no line
// numbers, which the component's `gutter={false}` prop reproduces.

export interface CodeLine {
  html: string;
  /** `--ecIndent` from the original `.ec-line` inline style (null when absent). */
  indent: string | null;
}

export interface CodeBlock {
  language: string;
  /** `--ecMaxLine` measure from the original <pre> inline style. */
  maxLine: string;
  lines: CodeLine[];
  /** Raw source (the original `data-code` attribute is this text with U+007F separators). */
  code: string;
}

export const CODE_BLOCKS: CodeBlock[] = [
  {
    "language": "ts",
    "maxLine": "57ch",
    "lines": [
      {
        "html": "<span style=\"--0:#2F5885;--1:#A6CBEE\">import</span><span style=\"--0:#1E1E1E;--1:#F7F7F7\"> { createApp, safe } </span><span style=\"--0:#2F5885;--1:#A6CBEE\">from</span><span style=\"--0:#1E1E1E;--1:#F7F7F7\"> </span><span style=\"--0:#43601F;--1:#C3D6AD\">\"@odyn/lifecycle\"</span><span style=\"--0:#1E1E1E;--1:#F7F7F7\">;</span>",
        "indent": "2ch"
      },
      {
        "html": "<span style=\"--0:#2F5885;--1:#A6CBEE\">import</span><span style=\"--0:#1E1E1E;--1:#F7F7F7\"> { Conductor, wipeLeg } </span><span style=\"--0:#2F5885;--1:#A6CBEE\">from</span><span style=\"--0:#1E1E1E;--1:#F7F7F7\"> </span><span style=\"--0:#43601F;--1:#C3D6AD\">\"@odyn/conductor\"</span><span style=\"--0:#1E1E1E;--1:#F7F7F7\">;</span>",
        "indent": "2ch"
      },
      {
        "html": "<span style=\"--0:#2F5885;--1:#A6CBEE\">import</span><span style=\"--0:#1E1E1E;--1:#F7F7F7\"> { Reveal } </span><span style=\"--0:#2F5885;--1:#A6CBEE\">from</span><span style=\"--0:#1E1E1E;--1:#F7F7F7\"> </span><span style=\"--0:#43601F;--1:#C3D6AD\">\"@odyn/reveal\"</span><span style=\"--0:#1E1E1E;--1:#F7F7F7\">;</span>",
        "indent": "2ch"
      },
      {
        "html": "<span style=\"--0:#2F5885;--1:#A6CBEE\">import</span><span style=\"--0:#1E1E1E;--1:#F7F7F7\"> { createEngines, mediaHold } </span><span style=\"--0:#2F5885;--1:#A6CBEE\">from</span><span style=\"--0:#1E1E1E;--1:#F7F7F7\"> </span><span style=\"--0:#43601F;--1:#C3D6AD\">\"@odyn/engines\"</span><span style=\"--0:#1E1E1E;--1:#F7F7F7\">;</span>",
        "indent": "2ch"
      }
    ],
    "code": "import { createApp, safe } from \"@odyn/lifecycle\";\nimport { Conductor, wipeLeg } from \"@odyn/conductor\";\nimport { Reveal } from \"@odyn/reveal\";\nimport { createEngines, mediaHold } from \"@odyn/engines\";"
  },
  {
    "language": "json",
    "maxLine": "31ch",
    "lines": [
      {
        "html": "<span style=\"--0:#43601F;--1:#C3D6AD\">\"starter\"</span><span style=\"--0:#1E1E1E;--1:#F7F7F7\">: {</span>",
        "indent": "2ch"
      },
      {
        "html": "<span class=\"indent\">  </span><span style=\"--0:#37607E;--1:#B0CEE6\">\"name\"</span><span style=\"--0:#1E1E1E;--1:#F7F7F7\">: </span><span style=\"--0:#43601F;--1:#C3D6AD\">\"odyn-astro-starter\"</span><span style=\"--0:#1E1E1E;--1:#F7F7F7\">,</span>",
        "indent": "4ch"
      },
      {
        "html": "<span class=\"indent\">  </span><span style=\"--0:#37607E;--1:#B0CEE6\">\"initialised\"</span><span style=\"--0:#1E1E1E;--1:#F7F7F7\">: </span><span style=\"--0:#7A4A1C;--1:#E6C79C\">false</span><span style=\"--0:#1E1E1E;--1:#F7F7F7\">,</span>",
        "indent": "4ch"
      },
      {
        "html": "<span class=\"indent\">  </span><span style=\"--0:#37607E;--1:#B0CEE6\">\"ref\"</span><span style=\"--0:#1E1E1E;--1:#F7F7F7\">: </span><span style=\"--0:#43601F;--1:#C3D6AD\">\"v1.0.0\"</span><span style=\"--0:#1E1E1E;--1:#F7F7F7\">,</span>",
        "indent": "4ch"
      },
      {
        "html": "<span class=\"indent\">  </span><span style=\"--0:#37607E;--1:#B0CEE6\">\"head\"</span><span style=\"--0:#1E1E1E;--1:#F7F7F7\">: </span><span style=\"--0:#7A4A1C;--1:#E6C79C\">null</span><span style=\"--0:#1E1E1E;--1:#F7F7F7\">,</span>",
        "indent": "4ch"
      },
      {
        "html": "<span class=\"indent\">  </span><span style=\"--0:#37607E;--1:#B0CEE6\">\"date\"</span><span style=\"--0:#1E1E1E;--1:#F7F7F7\">: </span><span style=\"--0:#43601F;--1:#C3D6AD\">\"2026-09-04\"</span>",
        "indent": "4ch"
      },
      {
        "html": "<span style=\"--0:#1E1E1E;--1:#F7F7F7\">}</span>",
        "indent": "2ch"
      }
    ],
    "code": "\"starter\": {\n  \"name\": \"odyn-astro-starter\",\n  \"initialised\": false,\n  \"ref\": \"v1.0.0\",\n  \"head\": null,\n  \"date\": \"2026-09-04\"\n}"
  }
];

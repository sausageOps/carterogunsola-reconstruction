<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" encoding="UTF-8" />
  <xsl:template match="/rss">
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title><xsl:value-of select="channel/title" /></title>
        <style>
          :root { color-scheme: light dark; font: 16px/1.55 system-ui, sans-serif; background: #d6d6d5; color: #1e1e1e; }
          body { max-width: 48rem; margin: 4rem auto; padding: 0 1.25rem; }
          h1 { font-size: clamp(2rem, 6vw, 4rem); line-height: 1; letter-spacing: -.04em; }
          li { padding: 1rem 0; border-top: 1px solid #1e1e1e33; }
          time, small { color: #484848; }
          @media (prefers-color-scheme: dark) { :root { background: #1e1e1e; color: #f7f7f7; } li { border-color: #f7f7f733; } time, small { color: #f7f7f780; } }
        </style>
      </head>
      <body>
        <main>
          <p><a href="https://carterogunsola.com/">Carter Ogunsola</a> / RSS</p>
          <h1><xsl:value-of select="channel/title" /></h1>
          <p><xsl:value-of select="channel/description" /></p>
          <ol>
            <xsl:for-each select="channel/item">
              <li>
                <a><xsl:attribute name="href"><xsl:value-of select="link" /></xsl:attribute><xsl:value-of select="title" /></a>
                <br />
                <time><xsl:value-of select="pubDate" /></time>
                <xsl:for-each select="category"><small> · <xsl:value-of select="." /></small></xsl:for-each>
              </li>
            </xsl:for-each>
          </ol>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>

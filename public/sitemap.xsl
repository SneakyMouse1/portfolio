<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xhtml="http://www.w3.org/1999/xhtml"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>XML Sitemap — Semyon Smyslov Portfolio</title>
        <style>
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }

          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            background-color: #f7f6f2;
            color: #111111;
            padding: 40px 20px;
            line-height: 1.5;
          }

          .container {
            max-width: 1100px;
            margin: 0 auto;
          }

          .header {
            background: #ffffff;
            border: 3px solid #000000;
            box-shadow: 5px 5px 0px #000000;
            padding: 24px 28px;
            margin-bottom: 28px;
          }

          .badge-top {
            display: inline-block;
            background: #000000;
            color: #ffffff;
            font-family: "Courier New", Courier, monospace;
            font-weight: 900;
            font-size: 11px;
            letter-spacing: 1.5px;
            padding: 4px 8px;
            margin-bottom: 12px;
            text-transform: uppercase;
          }

          h1 {
            font-size: 28px;
            font-weight: 900;
            letter-spacing: -0.5px;
            margin-bottom: 8px;
          }

          p.lead {
            font-size: 14px;
            color: #555555;
            font-family: "Courier New", Courier, monospace;
          }

          .stats-bar {
            display: flex;
            gap: 16px;
            margin-top: 16px;
            padding-top: 14px;
            border-top: 2px dashed #000000;
            font-family: "Courier New", Courier, monospace;
            font-size: 13px;
            font-weight: 700;
          }

          .stat-item {
            display: flex;
            align-items: center;
            gap: 6px;
          }

          .stat-num {
            background: #ff5c00;
            color: #ffffff;
            padding: 2px 8px;
            border: 1.5px solid #000000;
            font-weight: 900;
          }

          .table-wrapper {
            background: #ffffff;
            border: 3px solid #000000;
            box-shadow: 5px 5px 0px #000000;
            overflow-x: auto;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
            font-size: 13px;
          }

          th {
            background: #000000;
            color: #ffffff;
            font-family: "Courier New", Courier, monospace;
            font-weight: 900;
            font-size: 12px;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            padding: 12px 16px;
            border-right: 1px solid #333333;
          }

          th:last-child {
            border-right: none;
          }

          td {
            padding: 12px 16px;
            border-bottom: 1.5px solid #eeeeee;
            border-right: 1.5px solid #eeeeee;
            vertical-align: middle;
          }

          td:last-child {
            border-right: none;
          }

          tr:last-child td {
            border-bottom: none;
          }

          tr:hover td {
            background: #fff8e8;
          }

          a.loc-link {
            color: #000000;
            text-decoration: none;
            font-weight: 700;
            font-family: "Courier New", Courier, monospace;
            display: inline-flex;
            align-items: center;
            gap: 4px;
          }

          a.loc-link:hover {
            color: #ff5c00;
            text-decoration: underline;
          }

          .badge {
            display: inline-block;
            font-family: "Courier New", Courier, monospace;
            font-weight: 800;
            font-size: 11px;
            padding: 2px 6px;
            border: 1.5px solid #000000;
            text-decoration: none;
            margin-right: 4px;
            margin-bottom: 2px;
            text-transform: uppercase;
          }

          .badge-alt {
            background: #ffffff;
            color: #000000;
          }

          .badge-alt:hover {
            background: #000000;
            color: #ffffff;
          }

          .priority-pill {
            font-family: "Courier New", Courier, monospace;
            font-weight: 900;
            padding: 3px 8px;
            border: 1.5px solid #000000;
            font-size: 12px;
            display: inline-block;
          }

          .priority-high {
            background: #a3e635;
            color: #000000;
          }

          .priority-med {
            background: #fde047;
            color: #000000;
          }

          .muted-text {
            color: #666666;
            font-family: "Courier New", Courier, monospace;
            font-size: 12px;
          }

          .footer {
            margin-top: 24px;
            text-align: center;
            font-family: "Courier New", Courier, monospace;
            font-size: 12px;
            color: #777777;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <header class="header">
            <div class="badge-top">INDEX_SPECIFICATION // XML_SITEMAP</div>
            <h1>Semyon Smyslov — Sitemap</h1>
            <p class="lead">Search engine optimization registry (Google, Bing, Yandex). Auto-formatted via XSLT stylesheet.</p>
            <div class="stats-bar">
              <div class="stat-item">
                <span>TOTAL INDEXED URLS:</span>
                <span class="stat-num"><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></span>
              </div>
              <div class="stat-item">
                <span>CANONICAL HOST:</span>
                <span>https://smyslov.dev</span>
              </div>
            </div>
          </header>

          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th style="width: 5%;">#</th>
                  <th style="width: 45%;">URL Location</th>
                  <th style="width: 20%;">Alternates (Hreflang)</th>
                  <th style="width: 10%;">Priority</th>
                  <th style="width: 10%;">Freq</th>
                  <th style="width: 10%;">Last Modified</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <tr>
                    <td class="muted-text">
                      <xsl:value-of select="position()"/>
                    </td>
                    <td>
                      <a class="loc-link" href="{sitemap:loc}" target="_blank">
                        <xsl:value-of select="sitemap:loc"/>
                        <span>↗</span>
                      </a>
                    </td>
                    <td>
                      <xsl:for-each select="xhtml:link">
                        <a class="badge badge-alt" href="{@href}" title="Alternate URL: {@href}">
                          <xsl:value-of select="@hreflang"/>
                        </a>
                      </xsl:for-each>
                    </td>
                    <td>
                      <xsl:choose>
                        <xsl:when test="sitemap:priority &gt;= 1.0">
                          <span class="priority-pill priority-high">
                            <xsl:value-of select="sitemap:priority"/>
                          </span>
                        </xsl:when>
                        <xsl:otherwise>
                          <span class="priority-pill priority-med">
                            <xsl:value-of select="sitemap:priority"/>
                          </span>
                        </xsl:otherwise>
                      </xsl:choose>
                    </td>
                    <td class="muted-text">
                      <xsl:value-of select="sitemap:changefreq"/>
                    </td>
                    <td class="muted-text">
                      <xsl:value-of select="sitemap:lastmod"/>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>

          <div class="footer">
            Generated for search engine indexing · smyslov.dev © 2026
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>

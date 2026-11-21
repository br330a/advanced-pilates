// Optional deployment SEO: set SITE_URL to your real public HTTPS domain.
// Without it, this script leaves output untouched; no fake canonical/sitemap URL.
import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const raw = process.env.SITE_URL?.trim()
if (!raw) {
  console.log('SEO: SITE_URL não definido. Canonical, OG URL e sitemap não foram gerados.')
  process.exit(0)
}
let base
try {
  const url = new URL(raw)
  if (url.protocol !== 'https:' || url.hostname === 'localhost' || url.pathname !== '/' || url.search || url.hash) {
    throw new Error('informe somente a origem HTTPS do domínio, sem caminhos ou parâmetros')
  }
  base = url.origin
} catch (error) {
  console.error(`SITE_URL inválido: ${error.message}`)
  process.exit(1)
}
const indexPath = resolve('dist/index.html')
let html = await readFile(indexPath, 'utf8')
const tag = `<link rel="canonical" href="${base}/" />\n    <meta property="og:url" content="${base}/" />`
html = html.replace('<title>', `${tag}\n    <title>`)
html = html.replace('property="og:image" content="/images/social-preview.webp"', `property="og:image" content="${base}/images/social-preview.webp"`)
html = html.replace('name="twitter:image" content="/images/social-preview.webp"', `name="twitter:image" content="${base}/images/social-preview.webp"`)
await writeFile(indexPath, html)
const privacyPath = resolve('dist/privacidade.html')
try {
  let privacy = await readFile(privacyPath, 'utf8')
  privacy = privacy.replace('</head>', `  <link rel="canonical" href="${base}/privacidade.html" />\n</head>`)
  await writeFile(privacyPath, privacy)
} catch (error) { console.warn(`SEO: privacidade.html não processado: ${error.message}`) }
await writeFile(resolve('dist/sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${base}/</loc></url><url><loc>${base}/privacidade.html</loc></url></urlset>\n`)
await writeFile(resolve('dist/robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`)
console.log(`SEO: canonical, previews e sitemap configurados para ${base}`)

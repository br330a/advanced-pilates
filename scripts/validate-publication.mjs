// Verificações estáticas de publicação sem depender do Vite ou da rede.
import { readFile, access } from 'node:fs/promises'
import { join } from 'node:path'

const issues = []
const read = async (file) => {
  try { return await readFile(file, 'utf8') }
  catch { issues.push(`Arquivo ausente: ${file}`); return '' }
}
const files = ['public/404.html', 'public/termos.html', 'public/privacidade.html', 'public/legal.css', 'public/_headers', 'public/favicon.svg']
await Promise.all(files.map(async (file) => { try { await access(file) } catch { issues.push(`Arquivo ausente: ${file}`) } }))

const headers = await read('public/_headers')
for (const expected of ['Content-Security-Policy:', "default-src 'self'", 'X-Content-Type-Options:', 'Permissions-Policy:', 'X-Frame-Options:', 'Referrer-Policy:']) {
  if (!headers.includes(expected)) issues.push(`Headers: falta ${expected}`)
}
const app = await read('src/App.jsx')
for (const expected of ['/privacidade.html', '/termos.html', 'Preferências de privacidade', 'PrivacyBanner']) {
  if (!app.includes(expected)) issues.push(`Página: falta referência a ${expected}`)
}
const booking = await read('src/components/BookingModal.jsx')
for (const expected of ['booking-consent', 'createContactMessage', 'preparedUrl', 'rel="noopener noreferrer"']) {
  if (!booking.includes(expected)) issues.push(`Formulário: falta ${expected}`)
}
for (const file of ['public/404.html', 'public/termos.html', 'public/privacidade.html']) {
  const html = await read(file)
  if (!/<html lang="pt-BR">/.test(html)) issues.push(`${file}: falta idioma`)
  if (!/<h1>/.test(html)) issues.push(`${file}: falta H1`)
  if (!/href="\/legal\.css"/.test(html)) issues.push(`${file}: falta CSS externo`)
  if (/\b(?:lorem ipsum|exemplo\.com|12345-6789)\b/i.test(html)) issues.push(`${file}: contém texto demonstrativo`)
}
const privacy = await read('public/privacidade.html')
if (!/armazenamento local/.test(privacy)) issues.push('Política de privacidade: falta explicar armazenamento de preferências')
const index = await read('index.html')
if (!/<meta name="description"/.test(index)) issues.push('SEO: falta description')
if (!/<meta property="og:image"/.test(index)) issues.push('SEO: falta imagem Open Graph')
const requiredAnchors = ['inicio', 'sobre', 'servicos', 'espaco', 'depoimentos', 'localizacao', 'duvidas']
for (const id of requiredAnchors) {
  if (!app.includes(`id="${id}"`)) issues.push(`Navegação: seção #${id} ausente`)
}
// Materiais editoriais e assets de modelos antigos não devem ir para produção.
const retired = [
  'public/icons.svg', 'public/logo-advanced-clean.png', 'public/logo-advanced.svg',
  'src/assets/react.svg', 'src/assets/vite.svg', 'src/assets/hero.png',
  'public/images/equipe/.gitkeep',
  ...['eliezer', 'flavia', 'helena', 'ricardo'].map((name) => `public/images/avaliacao-${name}.webp`),
]
for (const file of retired) {
  try { await access(file); issues.push(`Arquivo retirado ainda presente: ${file}`) }
  catch { /* ausência esperada */ }
}
for (const [file, html] of [['privacidade', privacy], ['termos', await read('public/termos.html')]]) {
  if (/(Revisão pendente antes da publicação oficial|Antes da publicação:<\/strong>)/i.test(html)) {
    issues.push(`${file}: lembrete interno não deve ficar no HTML público`)
  }
}
const fontCss = await read('src/index.css')
if (fontCss.includes('fonts.googleapis.com') && !headers.includes('https://fonts.googleapis.com')) issues.push('CSP: fonte externa não autorizada')

// Confere imagens locais usadas no JSX.
for (const match of app.matchAll(/src="(\/images\/[^"\s]+)"/g)) {
  try { await access(join('public', match[1])) }
  catch { issues.push(`Imagem não encontrada: ${match[1]}`) }
}

if (issues.length) {
  console.error('Problemas de publicação:\n' + issues.map((message) => `- ${message}`).join('\n'))
  process.exitCode = 1
} else {
  console.log('Publicação validada: páginas legais/404, links internos, formulário, imagens e headers de segurança.')
}

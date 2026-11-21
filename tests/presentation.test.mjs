import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { reviews, studio } from '../src/data/site.js'
import { teamMembers } from '../src/data/team.js'

const app = await readFile(new URL('../src/App.jsx', import.meta.url), 'utf8')
const css = await readFile(new URL('../src/App.css', import.meta.url), 'utf8')

test('exibe os quatro depoimentos como conteúdo, sem abrir capturas de tela', () => {
  assert.equal(reviews.length, 4)
  for (const review of reviews) {
    assert.ok(review.author.trim())
    assert.ok(review.text.trim())
    assert.match(review.sourceScreenshot, /^\/images\/avaliacao-[\w-]+\.webp$/)
  }
  assert.match(app, /<blockquote>“\{review\.text\}”<\/blockquote>/)
  assert.doesNotMatch(app, /review-original|href=\{review\.(?:image|sourceScreenshot)\}/)
  assert.doesNotMatch(app, /clique em cada seta|captura original/)
  assert.doesNotMatch(css, /\.review-original\s*\{/)
})

test('somente oferece avaliações do Google com URL real configurada', () => {
  assert.equal(studio.googleReviewsUrl, '')
  assert.match(app, /studio\.googleReviewsUrl\s*&&\s*<a/)
  assert.match(app, /href=\{studio\.googleReviewsUrl\}/)
})

test('prévia da equipe é exclusiva do desenvolvimento', () => {
  assert.equal(teamMembers.length, 0)
  assert.match(app, /canPreviewTeam\s*=\s*import\.meta\.env\.DEV\s*&&/)
  assert.match(app, /equipe-preview=1#equipe/)
  assert.match(app, /PRÉVIA LOCAL · NÃO PUBLICADA/)
  assert.match(app, /if \(!visibleTeam\.length\) return null/)
  assert.match(app, /Sair da prévia/)
})

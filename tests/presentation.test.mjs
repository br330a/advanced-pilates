import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { reviews, studio } from '../src/data/site.js'
import { gallery } from '../src/data/gallery.js'
import { teamMembers } from '../src/data/team.js'

const app = await readFile(new URL('../src/App.jsx', import.meta.url), 'utf8')
const css = await readFile(new URL('../src/App.css', import.meta.url), 'utf8')

test('depoimentos permanecem como texto, sem abrir capturas de tela', () => {
  assert.equal(reviews.length, 4)
  for (const review of reviews) {
    assert.ok(review.author.trim())
    assert.ok(review.text.trim())
    assert.match(review.sourceScreenshot, /^\/images\/avaliacao-[\w-]+\.webp$/)
  }
  assert.match(app, /<blockquote>“\{review\.text\}”<\/blockquote>/)
  assert.doesNotMatch(app, /review-original|href=\{review\.(?:image|sourceScreenshot)\}/)
  assert.doesNotMatch(css, /\.review-original\s*\{/)
})

test('link para avaliações do Google só é exibido com URL configurada', () => {
  assert.equal(studio.googleReviewsUrl, '')
  assert.match(app, /studio\.googleReviewsUrl\s*&&\s*<a/)
  assert.match(app, /href=\{studio\.googleReviewsUrl\}/)
})

test('a seção profissional contém somente a pessoa real fornecida', () => {
  assert.equal(teamMembers.length, 1)
  const member = teamMembers[0]
  assert.equal(member.name, 'Jessica Edwirges Alves Silva')
  assert.equal(member.featuredEducation.length, 3)
  assert.equal(member.continuingEducation.length, 9)
  assert.match(app, /<details className="professional-more">/)
  assert.doesNotMatch(app, /equipe-preview|PRÉVIA LOCAL|teamLayoutPreview/)
  assert.doesNotMatch(app, /professional\.age|35 anos/)
})

test('galeria usa cinco fotos reais e oferece navegação manual acessível', () => {
  assert.equal(gallery.length, 5)
  for (const photo of gallery) {
    assert.match(photo.src, /^\/images\/[\w-]+\.webp$/)
    assert.ok(photo.alt.length > 25)
  }
  assert.match(app, /aria-roledescription="carrossel"/)
  assert.match(app, /Foto anterior/)
  assert.match(app, /Próxima foto/)
  assert.match(app, /onTouchEnd=\{handleTouchEnd\}/)
  assert.match(app, /ArrowLeft/)
  assert.match(app, /ArrowRight/)
  assert.doesNotMatch(app, /setInterval|autoplay/)
  assert.match(app, /src="\/images\/pilates-pose\.webp"/)
})

test('página compacta remove seções redundantes sem perder serviços e contato', () => {
  assert.match(app, /<Services onBook=\{openBooking\} \/>/)
  assert.match(app, /<Team onBook=\{openBooking\} \/>/)
  assert.match(app, /<Showcase \/>/)
  assert.doesNotMatch(app, /<About |<HowItWorks /)
  assert.match(app, /<Location externalContentAllowed=/)
})

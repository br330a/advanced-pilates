import test from 'node:test'
import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import { reviews, services, studio } from '../src/data/site.js'
import { gallery } from '../src/data/gallery.js'
import { teamMembers } from '../src/data/team.js'

const app = await readFile(new URL('../src/App.jsx', import.meta.url), 'utf8')
const css = await readFile(new URL('../src/App.css', import.meta.url), 'utf8')
const privacy = await readFile(new URL('../src/components/PrivacyBanner.jsx', import.meta.url), 'utf8')

const expectAbsent = async (path) => {
  await assert.rejects(access(new URL(path, import.meta.url)), { code: 'ENOENT' })
}

test('depoimentos ficam na página e screenshots não são expostos publicamente', async () => {
  assert.equal(reviews.length, 4)
  for (const review of reviews) {
    assert.ok(review.author.trim())
    assert.ok(review.text.trim())
    assert.equal(Object.hasOwn(review, 'sourceScreenshot'), false)
  }
  assert.match(app, /<blockquote>“\{review\.text\}”<\/blockquote>/)
  assert.match(app, /reviews\.slice\(0, 2\)/)
  assert.match(app, /reviews\.slice\(2\)/)
  assert.match(app, /id="additional-reviews" hidden=\{!expanded\}/)
  assert.match(app, /aria-expanded=\{expanded\}/)
  assert.doesNotMatch(app, /review-original|href=\{review\.(?:image|sourceScreenshot)\}/)
  for (const name of ['eliezer', 'flavia', 'helena', 'ricardo']) {
    await expectAbsent(`../public/images/avaliacao-${name}.webp`)
  }
})

test('link para Google avaliações só aparece após URL real configurada', () => {
  assert.equal(studio.googleReviewsUrl, '')
  assert.match(app, /studio\.googleReviewsUrl\s*&&\s*<a/)
  assert.match(app, /href=\{studio\.googleReviewsUrl\}/)
})

test('a profissional é real e seus cursos continuam disponíveis sob demanda', () => {
  assert.equal(teamMembers.length, 1)
  const member = teamMembers[0]
  assert.equal(member.name, 'Jessica Edwirges Alves Silva')
  assert.equal(member.featuredEducation.length, 3)
  assert.equal(member.continuingEducation.length, 9)
  assert.match(app, /<details className="professional-more">/)
  assert.doesNotMatch(app, /equipe-preview|PRÉVIA LOCAL|teamLayoutPreview/)
})

test('galeria conserva cinco fotos reais com controle manual e teclado', () => {
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

test('página é mais direta, sem três blocos repetitivos', () => {
  assert.equal(services.length, 2)
  assert.match(app, /<Services onBook=\{openBooking\} \/>/)
  assert.match(app, /<Team \/>/)
  assert.match(app, /<Showcase \/>/)
  assert.match(app, /<Location externalContentAllowed=/)
  assert.doesNotMatch(app, /<Highlights \/>|<FinalCTA |<About |<HowItWorks |experimental-banner/)
  assert.doesNotMatch(css, /\.highlights\s*\{|\.experimental-banner\s*\{|\.final-cta\s*\{/)
  assert.match(app, /className="button button-accent location-book"/)
})

test('preferência externa descreve especificamente o mapa, não todos os serviços', () => {
  assert.match(privacy, /Não carregar mapa/)
  assert.match(privacy, /Google Fonts/)
  assert.doesNotMatch(privacy, /Recusar conteúdo externo/)
})

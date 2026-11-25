import test from 'node:test'
import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import { faqs, reviews, services, studio } from '../src/data/site.js'
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
  assert.match(app, /src="\/images\/pilates-pose-800\.webp"/)
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

test('painel de privacidade separa estatísticas e mapa com recusa disponível', () => {
  assert.match(privacy, /Estatísticas de visitas/)
  assert.match(privacy, /Mapa do Google/)
  assert.match(privacy, /Recusar opcionais/)
  assert.match(privacy, /fontes do site são carregadas localmente/)
  assert.doesNotMatch(privacy, /Recusar conteúdo externo/)
})

test('diferenciais solicitados pela cliente estão explícitos sem aumentar a página', () => {
  assert.match(app, /Pilates com acompanhamento individualizado, aulas em diferentes aparelhos e atendimento de fisioterapia/)
  const pilates = services.find((service) => service.label === 'Pilates com aparelhos')
  const physio = services.find((service) => service.label === 'Fisioterapia')
  assert.ok(pilates, 'Serviço Pilates deve existir')
  assert.ok(physio, 'Serviço Fisioterapia deve existir')
  assert.match(pilates.description, /não ficam concentradas em um só aparelho/)
  assert.match(pilates.description, /alternam entre equipamentos/)
  assert.match(pilates.description, /necessidades e à evolução de cada aluno/)
  assert.match(physio.description, /oferece atendimento de fisioterapia/)
  assert.match(teamMembers[0].bio, /acompanhamento próximo/)
  assert.doesNotMatch(app, /setInterval|autoplay/)
})


test('as notas individuais dos quatro depoimentos correspondem às capturas originais', () => {
  assert.equal(reviews.length, 4)
  assert.deepEqual(reviews.map((review) => review.rating), [5, 5, 5, 5])
  assert.match(app, /className="review-stars"/)
  assert.match(app, /review\.rating} de 5 estrelas/)
  assert.match(css, /\.review-stars\s*\{/)
  assert.doesNotMatch(app, /AggregateRating|aggregateRating/)
})

test('FAQ não acompanha a rolagem', () => {
  const rule = css.match(/\.faq-heading\s*\{([^}]*)\}/)
  assert.ok(rule, 'Estilo do título do FAQ deve existir')
  assert.match(rule[1], /position:\s*static/)
  assert.doesNotMatch(rule[1], /position:\s*sticky/)
  assert.doesNotMatch(rule[1], /top:\s*\d/)
})

test('mapa tem zoom mais aberto, instrução touch e exploração externa acessível', () => {
  assert.match(app, /&z=15&output=embed/)
  assert.match(app, /use dois dedos para mover o mapa/)
  assert.match(app, /Explorar no Google Maps/)
  assert.match(app, /className="map-open-link" href=\{mapsLink\}/)
  assert.match(app, /rel="noopener noreferrer"/)
  assert.match(css, /\.map-tools\s*\{/)
  assert.match(css, /\.map-touch-hint\s*\{/)
})


test('feedback da cliente: FAQ reúne quatro dúvidas reais, sem grade extensa', () => {
  assert.equal(faqs.length, 4)
  const answers = faqs.map((item) => `${item.question} ${item.answer}`).join('\n')
  assert.match(answers, /planos mensais, trimestrais e semestrais/i)
  assert.match(answers, /valores/i)
  assert.match(answers, /não aceita TotalPass nem Wellhub/i)
  assert.match(answers, /no máximo quatro pessoas/i)
  assert.match(answers, /segunda a sábado/i)
  assert.match(answers, /horários variam/i)
  assert.doesNotMatch(answers, /7h|20h|11h|15h/)
  assert.equal(services[0].plans, 'Planos: mensal, trimestral e semestral')
  assert.match(app, /service-plan-note/)
  assert.match(css, /\.service-card \.service-plan-note/)
})

test('registro profissional visível e dados de avaliações abreviados', () => {
  const member = teamMembers[0]
  assert.equal(member.credential, 'CREFITO-3 190575-F')
  assert.match(app, /professional-credential/)
  assert.match(css, /\.professional-name-block \.professional-credential/)
  assert.deepEqual(reviews.map((r) => r.author), ['Flávia P.', 'Eliezer B.', 'Helena T.', 'Ricardo P.'])
  for (const r of reviews) assert.match(r.author, /^\S+\s[A-Z]\.$/)
})

test('hero revela o rosto com moldura assimétrica e carrossel preserva cinco posições', () => {
  // A moldura não deve cortar o rosto no canto superior direito.
  // A foto original permanece intacta, centralizada e com proporção 3:4.
  assert.match(css, /\.hero-image-shape \{[^}]*aspect-ratio:\s*3\s*\/\s*4/)
  assert.match(css, /\.hero-image-shape img \{[^}]*object-fit:\s*cover;[^}]*object-position:\s*center;/)
  assert.match(css, /\.hero-image-shape \{[^}]*border-radius:\s*112px 24px 18px 18px;/)
  assert.match(css, /\.hero-art::before \{[^}]*border-radius:\s*132px 34px 18px 18px;/)
  assert.match(css, /\.hero-image-shape \{\s*width:\s*90%;\s*aspect-ratio:\s*3\s*\/\s*4;\s*border-radius:\s*90px 22px 12px 12px;/)
  assert.match(css, /\.hero-image-shape \{\s*width:\s*87%;\s*aspect-ratio:\s*3\s*\/\s*4;\s*border-radius:\s*78px 18px 12px 12px;/)
  assert.equal(gallery.length, 5)
  assert.deepEqual(gallery.map((p) => p.src), [
    '/images/01-estudio-960.webp', '/images/02-equipamentos-960.webp',
    '/images/03-ambiente-960.webp', '/images/04-aparelhos-960.webp',
    '/images/05-identidade-960.webp',
  ])
  assert.equal(gallery[0].width, 1200)
  assert.equal(gallery[0].height, 1600)
  assert.match(gallery[0].alt, /espelhos/i)
  assert.match(gallery[2].alt, /janelas iluminadas/i)
  assert.doesNotMatch(app, /setInterval|autoplay/)
})

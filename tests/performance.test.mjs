import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile, stat } from 'node:fs/promises'
import { gallery } from '../src/data/gallery.js'

const app = await readFile(new URL('../src/App.jsx', import.meta.url), 'utf8')
const css = await readFile(new URL('../src/index.css', import.meta.url), 'utf8')
const index = await readFile(new URL('../index.html', import.meta.url), 'utf8')
const brand = await readFile(new URL('../src/components/Brand.jsx', import.meta.url), 'utf8')
const appCss = await readFile(new URL('../src/App.css', import.meta.url), 'utf8')

test('Google Fonts não usa importação em cascata dentro do CSS', () => {
  assert.doesNotMatch(css, /@import[^;]*fonts\.googleapis\.com/)
  assert.match(index, /rel="stylesheet" href="https:\/\/fonts\.googleapis\.com/)
  assert.match(index, /imagesrcset="\/images\/pilates-pose-480\.webp/)
})

test('o hero prioriza a imagem responsiva e a equipe usa fotos menores', () => {
  assert.match(app, /srcSet="\/images\/pilates-pose-480\.webp/)
  assert.match(app, /fetchPriority="high"/)
  assert.match(app, /srcSet="\/images\/jessica-edwirges-480\.webp/)
  assert.match(brand, /brand-color-480\.webp/)
})

test('galeria não descarrega todas as imagens na primeira visita e segue manual', () => {
  assert.match(app, /useState\(\[0\]\)/)
  assert.match(app, /mounted\.includes\(index\)/)
  assert.match(app, /IntersectionObserver/)
  assert.match(app, /loading="lazy"/)
  assert.doesNotMatch(app, /setInterval|autoplay/)
  assert.equal(gallery.length, 5)
  for (const photo of gallery) {
    assert.match(photo.srcSet, /480w.*960w.*1600w/)
    assert.match(photo.mobileSrcSet, /480w.*960w/)
    assert.doesNotMatch(photo.mobileSrcSet, /1600w/)
    assert.match(photo.sizes, /vw/)
  }
})

test('versões menores de imagens existem e são mais leves', async () => {
  const pairs = [
    ['../public/images/pilates-pose-800.webp', '../public/images/pilates-pose.webp'],
    ['../public/images/jessica-edwirges-480.webp', '../public/images/jessica-edwirges.webp'],
    ...gallery.map((photo) => [`../public${photo.src}`, `../public${photo.src.replace('-960.webp', '.webp')}`]),
    ['../public/brand-color-480.webp', '../public/brand-color.png'],
  ]
  for (const [small, original] of pairs) {
    const smallSize = (await stat(new URL(small, import.meta.url))).size
    const bigSize = (await stat(new URL(original, import.meta.url))).size
    assert.ok(smallSize < bigSize, `${small} deve ser menor que ${original}`)
  }
})


test('links e preferências do rodapé têm área de toque adequada', () => {
  assert.match(appCss, /\.footer-bottom a, \.footer-bottom button \{[^}]*min-height: 44px/)
})

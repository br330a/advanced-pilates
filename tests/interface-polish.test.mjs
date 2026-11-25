import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { faqs, studio } from '../src/data/site.js'

const read = (name) => readFile(new URL(name, import.meta.url), 'utf8')
const [app, css, icon, modal, select, baseCss] = await Promise.all([
  '../src/App.jsx', '../src/App.css', '../src/components/Icon.jsx',
  '../src/components/BookingModal.jsx', '../src/components/StyledSelect.jsx',
  '../src/index.css',
].map(read))

test('seta dos depoimentos indica a ação de expandir ou recolher', () => {
  assert.match(app, /aria-expanded=\{expanded\}/)
  assert.match(app, /expanded \? 'Mostrar menos avaliações' : `Ler mais/)
  assert.match(app, /<Icon name=\{expanded \? 'chevronUp' : 'chevronDown'\}/)
  assert.match(icon, /chevronUp:/)
  assert.match(icon, /chevronDown:/)
  assert.doesNotMatch(css, /\.reviews-more svg \{[^}]*rotate\(90deg\)/)
})

test('cada menção ao WhatsApp no FAQ vira link visível e rastreável', () => {
  assert.equal(faqs.filter((item) => /WhatsApp/i.test(item.answer)).length, 2)
  assert.match(app, /faq\.answer\.split\(\/\(WhatsApp\)\/gi\)/)
  assert.match(app, /className="faq-whatsapp-link"/)
  assert.match(app, /href=\{whatsappURL\(message\)\}/)
  assert.match(app, /target="_blank"/)
  assert.match(app, /<FaqAnswer faq=\{faq\} \/>/)
  assert.match(css, /\.faq-whatsapp-link\s*\{[^}]*text-decoration: underline/)
  assert.match(app, /'faq'/)
})

test('navbar apresenta Instagram e WhatsApp corretos sem ícones decorativos', () => {
  assert.equal(studio.instagram, 'https://www.instagram.com/studiopilatesadvanced/')
  assert.match(app, /className="header-socials"/)
  assert.match(app, /href=\{studio\.instagram\}/)
  assert.match(app, /href=\{whatsappURL\(whatsMessage\)\}/)
  assert.match(app, /className="header-social-link header-social-whatsapp"/)
  assert.match(app, /Abrir Instagram do Advanced Studio/)
  assert.match(app, /Conversar com o Advanced Studio pelo WhatsApp/)
  assert.match(css, /\.header-social-link\s*\{/)
  assert.match(css, /\.header-social-link:hover\s*\{/)
  assert.match(css, /@media \(max-width: 380px\)/)
  assert.match(app, /'cabecalho'/)
})

test('menus de seleção têm identidade visual sem dropdown nativo azul', () => {
  assert.doesNotMatch(modal, /<select\b/)
  assert.match(modal, /<StyledSelect id="booking-interest"/)
  assert.match(modal, /<StyledSelect id="booking-period"/)
  assert.match(modal, /id="booking-interest-label"/)
  assert.match(modal, /id="booking-period-label"/)
  assert.match(select, /role="listbox"/)
  assert.match(select, /role="option"/)
  assert.match(select, /aria-selected=\{value === option\}/)
  assert.match(select, /aria-expanded=\{open\}/)
  assert.match(select, /onChange\(options\[index\]\)/)
  assert.match(css, /\.booking-select-menu\s*\{/)
  assert.match(css, /\.booking-select-opens-up \.booking-select-menu\s*\{/)
  assert.match(css, /\.booking-select-option:hover/)
  assert.match(css, /\.booking-select-option\.is-selected/)
  assert.match(baseCss, /-webkit-tap-highlight-color:\s*transparent/)
})

test('seleção customizada responde teclado, toque, escape e fechamento externo', () => {
  for (const key of ['ArrowDown', 'ArrowUp', 'Home', 'End', 'Enter', 'Escape']) {
    assert.ok(select.includes(key), `Tecla ${key} deve ser suportada`)
  }
  assert.match(select, /event\.key === ' '/)
  assert.match(select, /document\.addEventListener\('pointerdown', closeOnOutside\)/)
  assert.match(select, /document\.removeEventListener\('pointerdown', closeOnOutside\)/)
  assert.match(select, /onBlur=\{\(event\) =>/)
  assert.match(select, /buttonRef\.current\?\.focus\(\)/)
  assert.match(select, /optionRefs\.current\[activeIndex\]\?\.focus\(\)/)
  assert.match(select, /type="button"/)
})

import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const read = (path) => readFile(new URL(path, import.meta.url), 'utf8')
const [analytics, app, privacyBanner, policy, headers, modal] = await Promise.all([
  '../src/utils/analytics.js', '../src/App.jsx', '../src/components/PrivacyBanner.jsx',
  '../public/privacidade.html', '../public/_headers', '../src/components/BookingModal.jsx',
].map(read))

test('GA4 só carrega após consentimento explícito', () => {
  assert.match(analytics, /G-NWYC7XCQ8R/)
  assert.match(analytics, /function enableAnalytics\(/)
  assert.match(analytics, /function disableAnalytics\(/)
  assert.match(analytics, /googletagmanager\.com\/gtag\/js/)
  assert.match(app, /analyticsConsent === 'allow'\) enableAnalytics\(\)/)
  assert.doesNotMatch(app, /<script[^>]*googletagmanager/)
  assert.match(privacyBanner, /type="checkbox"/)
  assert.match(privacyBanner, /Recusar opcionais/)
  assert.match(privacyBanner, /Salvar escolhas/)
  assert.match(privacyBanner, /Personalizar/)
  assert.match(privacyBanner, /onAccept/)
  assert.match(privacyBanner, /onCustomize/)
  assert.match(privacyBanner, /onReject/)
})

test('dados pessoais do formulário não são enviados às estatísticas', () => {
  assert.match(analytics, /whatsapp_click/)
  assert.match(analytics, /contact_placement/)
  assert.doesNotMatch(analytics, /name:|message:|phone:|detail:/)
  assert.match(modal, /trackWhatsAppClick\('formulario'\)/)
  assert.match(policy, /Não enviamos ao Analytics nomes, mensagens/)
})

test('CSP é restrita aos fornecedores escolhidos, sem unsafe-inline', () => {
  assert.match(headers, /script-src 'self' https:\/\/www\.googletagmanager\.com/)
  assert.match(headers, /https:\/\/static\.cloudflareinsights\.com/)
  assert.match(headers, /connect-src 'self'.*https:\/\/www\.google-analytics\.com/)
  assert.doesNotMatch(headers, /'unsafe-inline'|'unsafe-eval'/)
})

test('aviso compacto apresenta recusa e aceitação com opções inicialmente desligadas', () => {
  assert.match(privacyBanner, /Sua privacidade importa/)
  assert.match(privacyBanner, /Recusar<\/button>/)
  assert.match(privacyBanner, /Personalizar<\/button>/)
  assert.match(privacyBanner, /Aceitar<\/button>/)
  assert.match(privacyBanner, /checked=\{analyticsChecked\}/)
  assert.match(privacyBanner, /checked=\{mapChecked\}/)
  assert.match(app, /const showPrivacyBanner = privacySettingsOpen \|\| analyticsConsent === null/)
  assert.match(app, /onAccept=\{\(\) => savePreferences\(privacyPreference === 'allow', true\)\}/)
  assert.match(app, /onReject=\{\(\) => savePreferences\(false, false\)\}/)
  assert.match(app, /onPrivacySettings=\{openPrivacySettings\}/)
  assert.match(app, /onAllowExternalContent=\{\(\) => setPrivacyPreference\('allow'\)\}/)
})

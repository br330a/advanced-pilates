import test from 'node:test'
import assert from 'node:assert/strict'
import {
  readAnalyticsConsent, persistAnalyticsConsent, enableAnalytics,
  disableAnalytics, trackWhatsAppClick, GA_MEASUREMENT_ID,
} from '../src/utils/analytics.js'

test('consentimento controla o carregamento da tag e os eventos de WhatsApp', () => {
  const originalWindow = globalThis.window
  const originalDocument = globalThis.document
  const originalLocation = globalThis.location
  const state = new Map()
  const injected = []
  globalThis.window = {
    localStorage: { getItem: (key) => state.get(key) ?? null, setItem: (key, value) => state.set(key, value) },
  }
  globalThis.document = {
    cookie: '',
    createElement: () => ({ dataset: {} }),
    head: { appendChild: (element) => injected.push(element) },
  }
  globalThis.location = { hostname: 'pilatesadvanced.com.br' }
  try {
    assert.equal(readAnalyticsConsent(), null)
    disableAnalytics()
    trackWhatsAppClick('rodape')
    assert.equal(injected.length, 0, 'sem consentimento, nenhuma tag é carregada')
    persistAnalyticsConsent('decline')
    assert.equal(readAnalyticsConsent(), 'decline')
    assert.equal(injected.length, 0)

    persistAnalyticsConsent('allow')
    assert.equal(readAnalyticsConsent(), 'allow')
    enableAnalytics()
    assert.equal(injected.length, 1)
    assert.match(injected[0].src, /googletagmanager.com\/gtag\/js\?id=/)
    assert.ok(injected[0].src.endsWith(GA_MEASUREMENT_ID))
    assert.equal(window.dataLayer[0][0], 'consent')
    assert.equal(window.dataLayer[0][2].ad_storage, 'denied')
    assert.equal(window.dataLayer[0][2].analytics_storage, 'granted')

    trackWhatsAppClick('formulario')
    const events = window.dataLayer.filter((args) => args[0] === 'event' && args[1] === 'whatsapp_click')
    assert.equal(events.length, 1)
    assert.deepEqual(events[0][2], { contact_placement: 'formulario' })

    disableAnalytics()
    trackWhatsAppClick('rodape')
    assert.equal(window.dataLayer.filter((args) => args[1] === 'whatsapp_click').length, 1, 'revogação interrompe eventos')
    assert.equal(window[`ga-disable-${GA_MEASUREMENT_ID}`], true)

    enableAnalytics()
    assert.equal(injected.length, 1, 'não injeta o script duas vezes')
    assert.equal(window[`ga-disable-${GA_MEASUREMENT_ID}`], false)
  } finally {
    if (originalWindow === undefined) delete globalThis.window
    else globalThis.window = originalWindow
    if (originalDocument === undefined) delete globalThis.document
    else globalThis.document = originalDocument
    if (originalLocation === undefined) delete globalThis.location
    else globalThis.location = originalLocation
  }
})

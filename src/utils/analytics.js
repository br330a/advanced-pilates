// Google Analytics 4: carregamento apenas após consentimento explícito.
// Não enviamos nomes, mensagens, interesse, telefone ou qualquer dado do formulário.
export const GA_MEASUREMENT_ID = 'G-NWYC7XCQ8R'
const STORAGE_KEY = 'advanced-studio-analytics-choice-v1'
let enabled = false
let initialized = false

export function readAnalyticsConsent() {
  try {
    const choice = window.localStorage.getItem(STORAGE_KEY)
    return choice === 'allow' || choice === 'decline' ? choice : null
  } catch {
    return null
  }
}

export function persistAnalyticsConsent(choice) {
  if (choice !== 'allow' && choice !== 'decline') return
  try { window.localStorage.setItem(STORAGE_KEY, choice) }
  catch { /* A escolha continua válida durante a visita atual. */ }
}

function consentSettings(analyticsStorage) {
  return {
    analytics_storage: analyticsStorage,
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  }
}

export function enableAnalytics() {
  if (enabled) return
  enabled = true
  window[`ga-disable-${GA_MEASUREMENT_ID}`] = false

  if (!initialized) {
    initialized = true
    window.dataLayer = window.dataLayer || []
    window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments) }
    // Modo básico: só carrega o script depois de a pessoa autorizar estatísticas.
    window.gtag('consent', 'default', consentSettings('granted'))
    window.gtag('js', new Date())
    window.gtag('config', GA_MEASUREMENT_ID, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    })
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
    script.dataset.advancedGoogleAnalytics = 'true'
    document.head.appendChild(script)
    return
  }

  window.gtag?.('consent', 'update', consentSettings('granted'))
  window.gtag?.('event', 'page_view')
}

export function disableAnalytics() {
  enabled = false
  if (typeof window === 'undefined') return
  window[`ga-disable-${GA_MEASUREMENT_ID}`] = true
  if (initialized) window.gtag?.('consent', 'update', consentSettings('denied'))
  // Limpa os cookies GA do domínio atual ao revogar o consentimento.
  try {
    for (const entry of document.cookie.split(';')) {
      const cookieName = entry.split('=')[0].trim()
      if (!/^_ga(?:_|$)/.test(cookieName)) continue
      document.cookie = `${cookieName}=; Max-Age=0; Path=/; SameSite=Lax`
      document.cookie = `${cookieName}=; Max-Age=0; Path=/; Domain=.${location.hostname.replace(/^www\./, '')}; SameSite=Lax`
    }
  } catch { /* Navegadores podem impedir alterações de cookies. */ }
}

export function trackWhatsAppClick(placement) {
  if (!enabled || typeof window.gtag !== 'function') return
  // Mede a intenção de abrir o WhatsApp, não mensagens enviadas ou clientes fechados.
  window.gtag('event', 'whatsapp_click', { contact_placement: placement })
}

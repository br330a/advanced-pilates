import { Component } from 'react'

// Protege a interface de um erro inesperado de renderização.
// Detalhes técnicos ficam somente no console, nunca na tela pública.
export default class SiteErrorBoundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error, info) {
    console.error('Falha inesperada na interface do Advanced Studio:', error, info)
  }

  render() {
    if (!this.state.failed) return this.props.children

    return (
      <main className="error-screen" id="conteudo">
        <div className="error-screen-inner">
          <p className="error-screen-label">ADVANCED STUDIO</p>
          <h1>Não conseguimos carregar esta página.</h1>
          <p>Ocorreu uma falha temporária na apresentação do site. Você pode tentar novamente ou entrar em contato com nossa equipe.</p>
          <div className="error-screen-actions">
            <button type="button" onClick={() => window.location.reload()}>Tentar novamente</button>
            <a href="https://wa.me/5511976030603" target="_blank" rel="noopener noreferrer">Falar pelo WhatsApp</a>
          </div>
        </div>
      </main>
    )
  }
}

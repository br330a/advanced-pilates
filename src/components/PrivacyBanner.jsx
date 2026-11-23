export default function PrivacyBanner({ preference, onChoose }) {
  if (preference !== null) return null

  return (
    <aside className="privacy-banner" aria-label="Preferências de privacidade">
      <span className="privacy-banner-kicker">SUA PRIVACIDADE IMPORTA</span>
      <h2>Mapa opcional, você decide.</h2>
      <p>
        Não usamos rastreadores de anúncios ou analytics. O mapa do Google só carrega com sua permissão;
        as fontes do site são carregadas localmente. <a href="/privacidade.html">Saiba mais sobre privacidade</a>.
      </p>
      <div className="privacy-banner-actions">
        <button type="button" className="button button-outline" onClick={() => onChoose('decline')}>
          Não carregar mapa
        </button>
        <button type="button" className="button button-accent" onClick={() => onChoose('allow')}>
          Permitir mapa do Google
        </button>
      </div>
      <small>Você pode alterar essa preferência pelo rodapé.</small>
    </aside>
  )
}

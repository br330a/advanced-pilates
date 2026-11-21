export default function PrivacyBanner({ preference, onChoose }) {
  if (preference !== null) return null

  return (
    <aside className="privacy-banner" aria-label="Preferências de privacidade">
      <span className="privacy-banner-kicker">SUA PRIVACIDADE IMPORTA</span>
      <h2>Você escolhe o que carregar.</h2>
      <p>
        Não usamos cookies de anúncios ou estatísticas. O mapa do Google é um recurso opcional
        e só aparece se você permitir. <a href="/privacidade.html">Saiba mais sobre privacidade</a>.
      </p>
      <div className="privacy-banner-actions">
        <button type="button" className="button button-outline" onClick={() => onChoose('decline')}>
          Recusar conteúdo externo
        </button>
        <button type="button" className="button button-accent" onClick={() => onChoose('allow')}>
          Permitir mapa do Google
        </button>
      </div>
      <small>Você pode alterar essa preferência pelo rodapé.</small>
    </aside>
  )
}

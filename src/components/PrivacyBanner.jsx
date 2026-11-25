export default function PrivacyBanner({
  open, mapChecked, onMapChecked, analyticsChecked, onAnalyticsChecked, onReject, onSave,
}) {
  if (!open) return null

  return (
    <aside className="privacy-banner" aria-label="Preferências de privacidade">
      <span className="privacy-banner-kicker">SUA PRIVACIDADE IMPORTA</span>
      <h2>Você escolhe.</h2>
      <p>
        As fontes do site são carregadas localmente. Os recursos abaixo são opcionais e podem ser
        alterados a qualquer momento. <a href="/privacidade.html">Entenda como usamos os dados</a>.
      </p>
      <div className="privacy-options">
        <label className="privacy-option">
          <input type="checkbox" checked={analyticsChecked} onChange={(event) => onAnalyticsChecked(event.target.checked)} />
          <span><strong>Estatísticas de visitas</strong><small>Autoriza o Google Analytics a medir acessos e cliques no WhatsApp; não enviamos o conteúdo do formulário.</small></span>
        </label>
        <label className="privacy-option">
          <input type="checkbox" checked={mapChecked} onChange={(event) => onMapChecked(event.target.checked)} />
          <span><strong>Mapa do Google</strong><small>Permite carregar o mapa interativo quando você solicitar. Sem isso, a rota continua acessível por link.</small></span>
        </label>
      </div>
      <div className="privacy-banner-actions">
        <button type="button" className="button button-outline" onClick={onReject}>Recusar opcionais</button>
        <button type="button" className="button button-accent" onClick={onSave}>Salvar escolhas</button>
      </div>
      <small>É possível alterar as escolhas em “Preferências de privacidade”, no rodapé.</small>
    </aside>
  )
}

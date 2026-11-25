export default function PrivacyBanner({
  open, expanded, mapChecked, onMapChecked, analyticsChecked, onAnalyticsChecked,
  onReject, onAccept, onCustomize, onBack, onSave,
}) {
  if (!open) return null

  return (
    <aside className={`privacy-banner ${expanded ? 'privacy-banner-expanded' : ''}`} aria-labelledby="privacy-title">
      <div className="privacy-banner-heading">
        <span className="privacy-banner-symbol" aria-hidden="true">✳</span>
        <span className="privacy-banner-kicker">ADVANCED STUDIO · PRIVACIDADE</span>
      </div>
      <h2 id="privacy-title">{expanded ? 'Suas preferências.' : 'Sua privacidade importa.'}</h2>
      {expanded ? (
        <>
          <p>Escolha quais recursos opcionais deseja permitir. Você pode mudar de ideia a qualquer momento.</p>
          <div className="privacy-options" role="group" aria-label="Recursos opcionais">
            <label className="privacy-option">
              <input type="checkbox" checked={analyticsChecked} onChange={(event) => onAnalyticsChecked(event.target.checked)} />
              <span><strong>Estatísticas de visitas</strong><small>Permite ao Google Analytics medir visitas e cliques no WhatsApp, sem enviar os dados do formulário.</small></span>
            </label>
            <label className="privacy-option">
              <input type="checkbox" checked={mapChecked} onChange={(event) => onMapChecked(event.target.checked)} />
              <span><strong>Mapa do Google</strong><small>Mesmo autorizado, o mapa só aparece quando você clicar para carregá-lo na seção Localização.</small></span>
            </label>
          </div>
          <div className="privacy-banner-actions privacy-banner-actions-expanded">
            <button type="button" className="privacy-action privacy-action-muted" onClick={onReject}>Recusar opcionais</button>
            <button type="button" className="privacy-action privacy-action-primary" onClick={onSave}>Salvar escolhas</button>
          </div>
          <button type="button" className="privacy-back" onClick={onBack}>Voltar ao aviso</button>
        </>
      ) : (
        <>
          <p>Usamos cookies opcionais para entender as visitas ao site e melhorar sua experiência. Você pode aceitar, recusar ou personalizar.</p>
          <div className="privacy-banner-actions privacy-banner-actions-compact">
            <button type="button" className="privacy-action privacy-action-muted" onClick={onReject}>Recusar</button>
            <button type="button" className="privacy-action privacy-action-subtle" onClick={onCustomize} aria-expanded={false}>Personalizar</button>
            <button type="button" className="privacy-action privacy-action-primary" onClick={onAccept}>Aceitar</button>
          </div>
        </>
      )}
      <p className="privacy-banner-note">
        O Google Maps só carrega quando você solicitar. <a href="/privacidade.html">Política de privacidade</a>.
        <span> É possível mudar suas escolhas no rodapé.</span>
      </p>
    </aside>
  )
}

import { useEffect, useRef, useState } from 'react'
import Icon from './Icon'
import { whatsappURL } from '../data/site'
import { contactInterests as interests, contactPeriods as periods, createContactMessage } from '../utils/contact'
const defaults = {
  name: '',
  interest: interests[0],
  period: periods[0],
  detail: '',
}

export default function BookingModal({ open, onClose, initialInterest = defaults.interest }) {
  const dialogRef = useRef(null)
  const firstInputRef = useRef(null)
  const consentRef = useRef(null)
  const [values, setValues] = useState(() => ({ ...defaults, interest: interests.includes(initialInterest) ? initialInterest : defaults.interest }))
  const [understood, setUnderstood] = useState(false)
  const [error, setError] = useState('')
  const [preparedUrl, setPreparedUrl] = useState('')

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) {
      dialog.showModal()
      firstInputRef.current?.focus()
    } else if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  function close() {
    setError('')
    onClose()
  }

  function update(key, value) {
    setError('')
    setPreparedUrl('')
    setValues((previous) => ({ ...previous, [key]: value }))
  }

  function submit(event) {
    event.preventDefault()
    setError('')

    let message
    try {
      message = createContactMessage(values)
    } catch (validationError) {
      setError(validationError.message)
      if (values.name.trim().length < 2) firstInputRef.current?.focus()
      return
    }
    if (!understood) {
      setError('Confirme que leu as informações sobre o contato e privacidade.')
      consentRef.current?.focus()
      return
    }

    const url = whatsappURL(message)
    setPreparedUrl(url)
    // O link é criado somente após o clique e nenhum dado vai a um servidor nosso.
    // Se o navegador bloquear a janela, oferecemos o link de recuperação na tela.
    try {
      window.open(url, '_blank', 'noopener,noreferrer')
    } catch {
      // A alternativa acessível é o link exibido abaixo do formulário.
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className="booking-dialog"
      onClose={close}
      onClick={(event) => { if (event.target === dialogRef.current) close() }}
      aria-labelledby="booking-title"
      aria-describedby="booking-description"
    >
      <div className="booking-content">
        <div className="booking-top">
          <span className="eyebrow"><span className="eyebrow-dot" /> PRIMEIRO CONTATO</span>
          <button className="icon-button" type="button" aria-label="Fechar formulário" onClick={close}>
            <Icon name="close" size={20} />
          </button>
        </div>
        <h2 id="booking-title">Seu próximo movimento <em>começa aqui.</em></h2>
        <p id="booking-description" className="booking-intro">
          Conte um pouco sobre o que procura. Vamos preparar uma mensagem para o WhatsApp do estúdio.
        </p>
        <form className="booking-form" onSubmit={submit} noValidate>
          <label htmlFor="booking-name">Como podemos chamar você? <span aria-hidden="true">*</span></label>
          <input
            id="booking-name"
            ref={firstInputRef}
            value={values.name}
            onChange={(event) => update('name', event.target.value)}
            autoComplete="name"
            maxLength={70}
            placeholder="Seu nome"
            aria-invalid={Boolean(error) && values.name.trim().length < 2}
            required
          />
          <label htmlFor="booking-interest">O que você procura?</label>
          <select id="booking-interest" value={values.interest} onChange={(event) => update('interest', event.target.value)}>
            {interests.map((interest) => <option key={interest}>{interest}</option>)}
          </select>
          <label htmlFor="booking-period">Qual período é melhor para você?</label>
          <select id="booking-period" value={values.period} onChange={(event) => update('period', event.target.value)}>
            {periods.map((period) => <option key={period}>{period}</option>)}
          </select>
          <label htmlFor="booking-detail">Quer acrescentar algo? <span className="optional">(opcional)</span></label>
          <textarea id="booking-detail" rows={2} maxLength={220} placeholder="Uma dúvida, por exemplo. Não inclua dados de saúde." value={values.detail} onChange={(event) => update('detail', event.target.value)} />
          <label className="booking-consent" htmlFor="booking-consent">
            <input
              id="booking-consent"
              ref={consentRef}
              type="checkbox"
              checked={understood}
              onChange={(event) => { setUnderstood(event.target.checked); setError(''); setPreparedUrl('') }}
              required
            />
            <span>Li as <a href="/privacidade.html" target="_blank" rel="noopener noreferrer">informações de privacidade</a> e entendo que o envio acontecerá somente quando eu confirmar a mensagem no WhatsApp.</span>
          </label>
          {error && <p role="alert" className="form-error" id="booking-error">{error}</p>}
          <p className="booking-footnote"><Icon name="info" size={17} /> Preencher este formulário não reserva horários. A equipe confirmará a disponibilidade pelo WhatsApp.</p>
          {preparedUrl ? (
            <div className="booking-ready" role="status">
              <strong>Mensagem preparada!</strong>
              <p>A conversa é aberta no WhatsApp. Caso uma nova aba não tenha aparecido, use este link para continuar.</p>
              <a href={preparedUrl} target="_blank" rel="noopener noreferrer" className="button button-accent booking-submit">Abrir WhatsApp <Icon name="upRight" size={17} /></a>
              <button type="button" className="booking-secondary" onClick={close}>Fechar</button>
            </div>
          ) : (
            <button type="submit" className="button button-accent booking-submit">Preparar mensagem no WhatsApp <Icon name="upRight" size={17} /></button>
          )}
        </form>
      </div>
    </dialog>
  )
}

import { useEffect, useRef, useState } from 'react'
import Icon from './Icon'
import { whatsappURL } from '../data/site'

const defaults = {
  name: '',
  interest: 'Aula experimental de Pilates',
  period: 'A combinar',
  detail: '',
}

export default function BookingModal({ open, onClose }) {
  const dialogRef = useRef(null)
  const firstInputRef = useRef(null)
  const [values, setValues] = useState(defaults)
  const [error, setError] = useState('')

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
    if (error) setError('')
    setValues((previous) => ({ ...previous, [key]: value }))
  }

  function submit(event) {
    event.preventDefault()
    const name = values.name.trim().replace(/\s+/g, ' ')
    if (name.length < 2) {
      setError('Digite seu nome com pelo menos dois caracteres.')
      firstInputRef.current?.focus()
      return
    }

    const message = [
      'Olá! Conheci o Advanced Studio pelo site e gostaria de saber mais.',
      '',
      `Nome: ${name}`,
      `Interesse: ${values.interest}`,
      `Período de preferência: ${values.period}`,
      ...(values.detail.trim() ? [`Observação: ${values.detail.trim()}`] : []),
      '',
      'Podemos conversar sobre a disponibilidade?',
    ].join('\n')

    const url = whatsappURL(message)
    // A abertura ocorre diretamente na ação do usuário; navegadores que bloqueiam
    // novas abas continuam funcionando com a navegação na aba atual.
    const popup = window.open(url, '_blank')
    if (popup) {
      popup.opener = null
    } else {
      window.location.assign(url)
    }
    setValues(defaults)
    close()
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
        <form className="booking-form" onSubmit={submit}>
          <label htmlFor="booking-name">Como podemos chamar você? <span aria-hidden="true">*</span></label>
          <input
            id="booking-name"
            ref={firstInputRef}
            value={values.name}
            onChange={(event) => update('name', event.target.value)}
            autoComplete="name"
            maxLength="70"
            placeholder="Seu nome"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'booking-error' : undefined}
            required
          />
          <label htmlFor="booking-interest">O que você procura?</label>
          <select id="booking-interest" value={values.interest} onChange={(event) => update('interest', event.target.value)}>
            <option>Aula experimental de Pilates</option>
            <option>Informações sobre Pilates</option>
            <option>Informações sobre Fisioterapia</option>
            <option>Ainda tenho dúvidas</option>
          </select>
          <label htmlFor="booking-period">Qual período é melhor para você?</label>
          <select id="booking-period" value={values.period} onChange={(event) => update('period', event.target.value)}>
            <option>A combinar</option>
            <option>Manhã</option>
            <option>Tarde</option>
            <option>Noite</option>
            <option>Sábado, se houver disponibilidade</option>
          </select>
          <label htmlFor="booking-detail">Quer acrescentar algo? <span className="optional">(opcional)</span></label>
          <textarea id="booking-detail" rows="2" maxLength="220" placeholder="Uma dúvida, por exemplo" value={values.detail} onChange={(event) => update('detail', event.target.value)} />
          {error && <p role="alert" className="form-error" id="booking-error">{error}</p>}
          <p className="booking-footnote"><Icon name="info" size={17} /> A solicitação não cria uma reserva. A equipe confirma os horários pelo WhatsApp.</p>
          <button type="submit" className="button button-accent booking-submit">
            Continuar no WhatsApp <Icon name="upRight" size={17} />
          </button>
        </form>
      </div>
    </dialog>
  )
}

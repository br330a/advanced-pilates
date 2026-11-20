import { useEffect, useRef, useState } from 'react'
import Icon from './Icon'
import { whatsappURL } from '../data/site'

const initialValues = { name: '', interest: 'Aula experimental de Pilates', period: 'A combinar', detail: '' }

export default function BookingModal({ open, onClose }) {
  const dialogRef = useRef(null)
  const firstInputRef = useRef(null)
  const [values, setValues] = useState(initialValues)
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

  function onSubmit(event) {
    event.preventDefault()
    const name = values.name.trim().replace(/\s+/g, ' ')
    if (name.length < 2) {
      setError('Informe seu nome para preparar a mensagem.')
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
      'Podemos conversar sobre os horários disponíveis?',
    ].join('\n')
    window.open(whatsappURL(message), '_blank', 'noopener,noreferrer')
    close()
  }

  return (
    <dialog
      className="booking-dialog"
      ref={dialogRef}
      onClose={close}
      onClick={(event) => { if (event.target === dialogRef.current) close() }}
      aria-labelledby="booking-heading"
    >
      <div className="booking-content">
        <div className="booking-top">
          <span className="eyebrow">SEU PRIMEIRO PASSO</span>
          <button type="button" className="icon-button" onClick={close} aria-label="Fechar agendamento"><Icon name="close"/></button>
        </div>
        <h2 id="booking-heading">Vamos conversar sobre sua <em>aula experimental?</em></h2>
        <p className="booking-intro">Conte sua preferência e abriremos uma mensagem pronta no WhatsApp do estúdio. A equipe confirma horários e disponibilidade.</p>
        <form onSubmit={onSubmit} className="booking-form">
          <label htmlFor="booking-name">Seu nome <span aria-hidden="true">*</span></label>
          <input id="booking-name" ref={firstInputRef} maxLength="70" autoComplete="name" placeholder="Como podemos chamar você?" value={values.name} onChange={(event) => { setError(''); setValues((old) => ({ ...old, name: event.target.value })) }} required />
          <label htmlFor="booking-interest">O que você procura?</label>
          <select id="booking-interest" value={values.interest} onChange={(event) => setValues((old) => ({ ...old, interest: event.target.value }))}>
            <option>Aula experimental de Pilates</option>
            <option>Informações sobre Pilates</option>
            <option>Informações sobre Fisioterapia</option>
            <option>Ainda tenho dúvidas</option>
          </select>
          <label htmlFor="booking-period">Período de preferência</label>
          <select id="booking-period" value={values.period} onChange={(event) => setValues((old) => ({ ...old, period: event.target.value }))}>
            <option>A combinar</option>
            <option>Manhã</option>
            <option>Tarde</option>
            <option>Noite</option>
            <option>Sábado, se houver disponibilidade</option>
          </select>
          <label htmlFor="booking-detail">Mensagem adicional <span className="optional">(opcional)</span></label>
          <textarea id="booking-detail" maxLength="220" rows="2" placeholder="Algo que gostaria de perguntar?" value={values.detail} onChange={(event) => setValues((old) => ({ ...old, detail: event.target.value }))} />
          {error && <p className="form-error" role="alert">{error}</p>}
          <p className="booking-footnote"><Icon name="check" size={16}/> Nenhuma reserva é criada aqui. O contato começa quando você enviar a mensagem no WhatsApp.</p>
          <button className="button button-orange booking-submit" type="submit"><Icon name="whatsapp" size={20}/> Conversar no WhatsApp <Icon name="upRight" size={17}/></button>
        </form>
      </div>
    </dialog>
  )
}

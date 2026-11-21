import test from 'node:test'
import assert from 'node:assert/strict'
import { cleanContactLine, contactInterests, contactPeriods, createContactMessage } from '../src/utils/contact.js'
import { whatsappURL } from '../src/data/site.js'

const valid = { name: 'Ana Maria', interest: contactInterests[0], period: contactPeriods[0], detail: '' }

test('prepara a mensagem correta sem confirmar reserva', () => {
  const message = createContactMessage(valid)
  assert.match(message, /Nome: Ana Maria/)
  assert.match(message, /Interesse: Aula experimental de Pilates/)
  assert.match(message, /Podemos conversar sobre a disponibilidade\?/)
  assert.doesNotMatch(message, /reserva confirmada/i)
})

test('remove quebras de linha e controles para não criar campos falsificados', () => {
  const message = createContactMessage({ ...valid, name: 'Ana\nAdmin: sim', detail: 'Gostaria\r\nde saber mais' })
  assert.match(message, /Nome: Ana Admin: sim\nInteresse:/)
  assert.match(message, /Observação: Gostaria de saber mais/)
})

test('recusa campos inválidos ou valores fora das opções da interface', () => {
  assert.throws(() => createContactMessage({ ...valid, name: ' ' }), /nome/i)
  assert.throws(() => createContactMessage({ ...valid, interest: 'Outra opção' }), /Revise/)
  assert.throws(() => createContactMessage({ ...valid, period: 'Domingo' }), /Revise/)
})

test('aplica limites de comprimento e URL codificada', () => {
  assert.equal(cleanContactLine(' x '.repeat(300), 220).length, 220)
  const message = createContactMessage({ ...valid, detail: 'Olá & obrigado!' })
  const url = new URL(whatsappURL(message))
  assert.equal(url.searchParams.get('text'), message)
  assert.match(url.hostname, /^wa\.me$/)
})

// O formulário cria uma mensagem de texto para WhatsApp: não há SQL nem HTML dinâmico.
// Controles e quebras de linha são removidos para evitar a falsificação de campos.
export const contactInterests = [
  'Aula experimental de Pilates',
  'Informações sobre Pilates',
  'Informações sobre Fisioterapia',
  'Ainda tenho dúvidas',
]
export const contactPeriods = ['A combinar', 'Manhã', 'Tarde', 'Noite', 'Sábado, se houver disponibilidade']

export function cleanContactLine(value, maxLength = 220) {
  return String(value).normalize('NFC')
    .replace(/[\p{Cc}\p{Cf}]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength)
}

export function createContactMessage({ name, interest, period, detail = '' }) {
  const safeName = cleanContactLine(name, 70)
  if (safeName.length < 2 || !/[\p{L}]/u.test(safeName)) throw new Error('Informe seu nome com pelo menos dois caracteres e uma letra.')
  if (!contactInterests.includes(interest) || !contactPeriods.includes(period)) throw new Error('Revise as opções selecionadas.')

  const safeDetail = cleanContactLine(detail, 220)
  return [
    'Olá! Conheci o Advanced Studio pelo site e gostaria de saber mais.',
    '',
    `Nome: ${safeName}`,
    `Interesse: ${interest}`,
    `Período de preferência: ${period}`,
    ...(safeDetail ? [`Observação: ${safeDetail}`] : []),
    '',
    'Podemos conversar sobre a disponibilidade?',
  ].join('\n')
}

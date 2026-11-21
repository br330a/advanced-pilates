/**
 * Verificações de dados que não dependem de rede ou de bibliotecas externas.
 * Evita publicar um membro da equipe sem dados mínimos ou foto inexistente.
 */
import { access } from 'node:fs/promises'
import { resolve } from 'node:path'
import { studio, reviews, services } from '../src/data/site.js'
import { teamMembers } from '../src/data/team.js'

const errors = []
const required = (value, label) => {
  if (typeof value !== 'string' || !value.trim()) errors.push(`${label}: obrigatório`)
}
const checkImage = async (imagePath, label) => {
  if (typeof imagePath !== 'string' || !/^\/images\/[a-z0-9_./-]+\.webp$/.test(imagePath) || imagePath.includes('..')) {
    errors.push(`${label}: caminho inválido (use /images/*.webp)`)
    return
  }
  try {
    await access(resolve('public', imagePath.slice(1)))
  } catch {
    errors.push(`${label}: arquivo não encontrado: public${imagePath}`)
  }
}

required(studio.name, 'Nome do estúdio')
required(studio.address, 'Endereço')
required(studio.neighborhood, 'Bairro')
if (!/^\d{10,11}$/.test(studio.phone)) errors.push('Telefone: informe DDD + número, somente dígitos')
try {
  if (new URL(studio.instagram).protocol !== 'https:') errors.push('Instagram: use HTTPS')
} catch { errors.push('Instagram: URL inválida') }
if (studio.googleReviewsUrl) {
  try {
    if (new URL(studio.googleReviewsUrl).protocol !== 'https:') errors.push('Avaliações no Google: use HTTPS')
  } catch { errors.push('Avaliações no Google: URL inválida') }
}

if (!Array.isArray(services) || services.length === 0) errors.push('Serviços: lista vazia')
for (const [i, service] of services.entries()) {
  required(service.label, `Serviço ${i + 1}: nome`)
  required(service.description, `Serviço ${i + 1}: descrição`)
}
for (const [i, review] of reviews.entries()) {
  required(review.author, `Avaliação ${i + 1}: autor`)
  required(review.text, `Avaliação ${i + 1}: texto`)
  await checkImage(review.sourceScreenshot, `Avaliação ${i + 1}: referência interna`)
}
if (!Array.isArray(teamMembers)) errors.push('Equipe: deve ser uma lista')
else {
  const ids = new Set()
  for (const [i, member] of teamMembers.entries()) {
    const label = `Profissional ${i + 1}`
    for (const key of ['id', 'name', 'role', 'specialty', 'bio', 'photo']) required(member[key], `${label}: ${key}`)
    if (ids.has(member.id)) errors.push(`${label}: identificador repetido`)
    ids.add(member.id)
    if (/fisioterapeut/i.test(member.role) && !member.credential?.trim()) {
      errors.push(`${label}: conferir registro profissional de fisioterapia`)
    }
    await checkImage(member.photo, `${label}: foto`)
  }
}

if (errors.length) {
  console.error('ERROS DE CONTEÚDO:\n' + errors.map((err) => `  - ${err}`).join('\n'))
  process.exitCode = 1
} else {
  console.log(`Conteúdo validado: ${services.length} serviços, ${reviews.length} avaliações, ${teamMembers.length} profissionais.`)
  if (!teamMembers.length) console.log('Equipe: seção oculta no site público até que sejam cadastrados profissionais reais.')
}

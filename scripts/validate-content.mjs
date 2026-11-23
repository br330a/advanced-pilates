/**
 * Verificações de dados que não dependem de rede ou de bibliotecas externas.
 * Evita publicar um membro da equipe sem dados mínimos ou foto inexistente.
 */
import { access } from 'node:fs/promises'
import { resolve } from 'node:path'
import { studio, reviews, services } from '../src/data/site.js'
import { teamMembers } from '../src/data/team.js'
import { gallery } from '../src/data/gallery.js'

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
if (!Array.isArray(gallery) || gallery.length < 4 || gallery.length > 7) errors.push('Galeria: use de 4 a 7 fotos selecionadas')
else {
  const srcs = new Set()
  for (const [i, photo] of gallery.entries()) {
    required(photo.alt, `Foto ${i + 1}: texto alternativo`)
    required(photo.title, `Foto ${i + 1}: título`)
    required(photo.description, `Foto ${i + 1}: descrição`)
    if (srcs.has(photo.src)) errors.push(`Galeria: imagem repetida (${photo.src})`)
    srcs.add(photo.src)
    await checkImage(photo.src, `Galeria ${i + 1}`)
  }
}
if (!Array.isArray(teamMembers)) errors.push('Profissionais: deve ser uma lista')
else {
  const ids = new Set()
  for (const [i, member] of teamMembers.entries()) {
    const label = `Profissional ${i + 1}`
    for (const key of ['id', 'name', 'role', 'bio', 'photo']) required(member[key], `${label}: ${key}`)
    if (ids.has(member.id)) errors.push(`${label}: identificador repetido`)
    ids.add(member.id)
    // O número CREFITO não foi fornecido. Avisar, mas não inventar nem impedir
    // a revisão técnica local. A publicação ainda depende dessa confirmação.
    if (/fisioterapeut/i.test(member.role) && !member.credential?.trim()) {
      console.warn(`PENDÊNCIA DE PUBLICAÇÃO: ${member.name} — confirmar número CREFITO com a responsável.`)
    }
    if (!Array.isArray(member.featuredEducation) || member.featuredEducation.length !== 3) errors.push(`${label}: informe 3 formações em destaque`)
    else for (const course of member.featuredEducation) {
      required(course.year, `${label}: ano de formação`)
      required(course.title, `${label}: título de formação`)
      required(course.institution, `${label}: instituição de formação`)
    }
    if (!Array.isArray(member.continuingEducation) || member.continuingEducation.length === 0) errors.push(`${label}: cursos de atualização ausentes`)
    else for (const course of member.continuingEducation) {
      required(course.year, `${label}: ano de atualização`)
      required(course.title, `${label}: título de atualização`)
      required(course.institution, `${label}: instituição de atualização`)
      required(course.type, `${label}: categoria de atualização`)
    }
    await checkImage(member.photo, `${label}: foto`)
  }
}

if (errors.length) {
  console.error('ERROS DE CONTEÚDO:\n' + errors.map((err) => `  - ${err}`).join('\n'))
  process.exitCode = 1
} else {
  console.log(`Conteúdo validado: ${services.length} serviços, ${reviews.length} avaliações, ${gallery.length} fotos, ${teamMembers.length} profissional(is).`)

}

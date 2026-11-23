// Dados centrais: mantenha somente informações confirmadas pelo estúdio.
export const studio = {
  name: 'Advanced Studio',
  descriptor: 'Pilates & Fisioterapia',
  phone: '11976030603',
  phoneLabel: '(11) 97603-0603',
  address: 'Rua José dos Reis, 719, sala 01',
  neighborhood: 'Vila Prudente, São Paulo — SP',
  postalCode: '03139-040',
  instagram: 'https://www.instagram.com/studiopilatesadvanced/',
  instagramHandle: '@studiopilatesadvanced',
  // Preencha apenas com a URL real e conferida das avaliações do estúdio no Google.
  // Em branco, o site não exibe um botão externo sem destino confirmado.
  googleReviewsUrl: '',
  mapQuery: 'Rua José dos Reis, 719, sala 01, Vila Prudente, São Paulo, SP, 03139-040',
}

export const whatsappURL = (message) =>
  `https://wa.me/55${studio.phone}?text=${encodeURIComponent(message)}`

export const services = [
  {
    number: '01',
    icon: 'activity',
    label: 'Pilates com aparelhos',
    description: 'Prática com equipamentos específicos, voltada ao trabalho de força, mobilidade e consciência corporal.',
  },
  {
    number: '02',
    icon: 'heart',
    label: 'Fisioterapia',
    description: 'Entre em contato para conhecer as modalidades de atendimento e a disponibilidade do estúdio.',
  },
]

// Trechos de avaliações espontâneas encaminhadas pelo estúdio.
// As capturas originais foram retiradas do diretório público.
// Os depoimentos dependem de autorização de publicação; não implicam nota agregada.
export const reviews = [
  {
    author: 'Flavia Souza Oliveira Piva',
    initials: 'FP',
    text: 'Amooooo fazer Pilates no Advanced!! A Jessica é a melhor profissional para essa modalidade. Atenciosa, muito preocupada com suas limitações e em seu bem estar físico. Indico para todas as idades.',
    featured: true,
  },
  {
    author: 'Eliezer Bim',
    initials: 'EB',
    text: 'Estou com professora Jéssica a 4 anos, muito satisfeito, tem ótima qualidade técnica e também atendimento profissional, parabéns, muito satisfeito',
  },
  {
    author: 'Helena tatayama',
    initials: 'HT',
    text: 'Sem contar a estrutura do studio, muito bem equipado, lindo e agradável. Super recomendo 🙏💕',
    excerpt: true,
  },
  {
    author: 'Ricardo Piva',
    initials: 'RP',
    text: 'Nunca pensei em fazer Pilates, mas comecei e estou percebendo já diferenças excelentes. Melhoraram minhas dores em geral. Indico agora pra todo mundo, percebi que pilates não é só pra mulher mesmo.',
  },
]

export const faqs = [
  {
    question: 'Nunca fiz Pilates. Posso entrar em contato?',
    answer: 'Claro! Você pode conversar com a equipe pelo WhatsApp, contar que está começando e perguntar como funciona a prática no estúdio.',
  },
  {
    question: 'Como posso solicitar uma aula experimental?',
    answer: 'Clique em “Agendar aula experimental”, informe seu nome e o período de preferência. O site prepara uma mensagem para você enviar pelo WhatsApp. A equipe confirma as possibilidades e a disponibilidade.',
  },
  {
    question: 'O Advanced também oferece fisioterapia?',
    answer: 'Sim, fisioterapia faz parte dos serviços apresentados pelo estúdio. Entre em contato para confirmar modalidades de atendimento, profissionais e agenda.',
  },
  {
    question: 'Quais são os dias e horários das aulas?',
    answer: 'Os horários de funcionamento, a disponibilidade de vagas e as opções aos sábados devem ser confirmados diretamente com a equipe.',
  },
]

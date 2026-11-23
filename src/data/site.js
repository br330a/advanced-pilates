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
    plans: 'Planos: mensal, trimestral e semestral',
    description: 'As aulas não ficam concentradas em um só aparelho: os exercícios alternam entre equipamentos, com atenção às necessidades e à evolução de cada aluno.',
  },
  {
    number: '02',
    icon: 'heart',
    label: 'Fisioterapia',
    description: 'O estúdio também oferece atendimento de fisioterapia. Consulte a equipe sobre modalidades e horários disponíveis.',
  },
]

// Trechos de avaliações espontâneas encaminhadas pelo estúdio.
// As capturas originais foram retiradas do diretório público.
// As quatro notas individuais (5/5) foram conferidas nas capturas originais; não implicam nota agregada.
// Os depoimentos dependem de autorização de publicação.
export const reviews = [
  {
    author: 'Flávia P.',
    rating: 5,
    initials: 'FP',
    text: 'Amooooo fazer Pilates no Advanced!! A Jessica é a melhor profissional para essa modalidade. Atenciosa, muito preocupada com suas limitações e em seu bem estar físico. Indico para todas as idades.',
    featured: true,
  },
  {
    author: 'Eliezer B.',
    rating: 5,
    initials: 'EB',
    text: 'Estou com professora Jéssica a 4 anos, muito satisfeito, tem ótima qualidade técnica e também atendimento profissional, parabéns, muito satisfeito',
  },
  {
    author: 'Helena T.',
    rating: 5,
    initials: 'HT',
    text: 'Sem contar a estrutura do studio, muito bem equipado, lindo e agradável. Super recomendo 🙏💕',
    excerpt: true,
  },
  {
    author: 'Ricardo P.',
    rating: 5,
    initials: 'RP',
    text: 'Nunca pensei em fazer Pilates, mas comecei e estou percebendo já diferenças excelentes. Melhoraram minhas dores em geral. Indico agora pra todo mundo, percebi que pilates não é só pra mulher mesmo.',
  },
]

// Perguntas relatadas pela responsável como dúvidas recorrentes dos interessados.
// Horários específicos variam conforme a agenda e não são prometidos pelo site.
export const faqs = [
  {
    question: 'Quais são os planos e valores?',
    answer: 'Trabalhamos com planos mensais, trimestrais e semestrais. Para conhecer os valores e as condições atuais, converse com a equipe pelo WhatsApp.',
  },
  {
    question: 'O estúdio aceita TotalPass ou Wellhub?',
    answer: 'Não. Atualmente, o Advanced Studio não aceita TotalPass nem Wellhub.',
  },
  {
    question: 'Quantas pessoas participam de cada sessão?',
    answer: 'As sessões de Pilates têm no máximo quatro pessoas, com atenção às necessidades e à evolução de cada aluno.',
  },
  {
    question: 'Quais são os dias e horários de atendimento?',
    answer: 'Atendemos de segunda a sábado. Os horários variam conforme o dia e a disponibilidade da agenda. Entre em contato pelo WhatsApp para consultar as vagas.',
  },
]

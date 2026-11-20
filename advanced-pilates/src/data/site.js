// Informações verificadas no material compartilhado pelo estúdio.
// Horários, profissionais e preços não foram informados e não são inventados no site.
export const studio = {
  name: 'Advanced Studio',
  descriptor: 'Pilates & Fisioterapia',
  phone: '11976030603',
  phoneLabel: '(11) 97603-0603',
  address: 'Rua José dos Reis, 719, sala 01',
  neighborhood: 'Vila Prudente, São Paulo — SP',
  postalCode: '03139-040',
  instagram: 'https://www.instagram.com/studiopilatesadvanced/',
  mapQuery: 'Rua José dos Reis, 719, Vila Prudente, São Paulo, SP, 03139-040',
}

export const whatsappURL = (message) =>
  `https://wa.me/55${studio.phone}?text=${encodeURIComponent(message)}`

export const services = [
  {
    number: '01',
    slug: 'pilates',
    label: 'Pilates com aparelhos',
    description: 'Movimento com atenção ao controle, à mobilidade e à força, em um espaço equipado para a prática.',
    icon: 'activity',
    image: '/images/pilates-aparelhos.webp',
    detail: 'Conheça o espaço e converse com a equipe sobre a melhor forma de começar.',
  },
  {
    number: '02',
    slug: 'fisioterapia',
    label: 'Fisioterapia',
    description: 'Um cuidado que faz parte da identidade do estúdio. Consulte a equipe para conhecer os atendimentos.',
    icon: 'heart',
    image: '/images/estudio-real.webp',
    detail: 'Atendimentos específicos e disponibilidade devem ser confirmados diretamente com o estúdio.',
  },
  {
    number: '03',
    slug: 'experimental',
    label: 'Aula experimental',
    description: 'O primeiro contato para conhecer a proposta, tirar dúvidas e descobrir como funciona a prática.',
    icon: 'calendar',
    image: '/images/movimento-real.webp',
    detail: 'Solicite sua aula pelo WhatsApp; a equipe confirma o melhor dia e horário.',
  },
]

export const highlights = [
  { icon: 'user', title: 'Atenção ao seu ritmo', description: 'Um convite para se movimentar com cuidado e confiança.' },
  { icon: 'layers', title: 'Estrutura equipada', description: 'Aparelhos de Pilates em um ambiente organizado.' },
  { icon: 'sun', title: 'Ambiente acolhedor', description: 'Um espaço iluminado, pensado para receber você.' },
  { icon: 'message', title: 'Contato fácil', description: 'Converse diretamente com o estúdio pelo WhatsApp.' },
]

export const gallery = [
  { src: '/images/estudio-real.webp', title: 'Um espaço para se movimentar', type: 'Ambiente', alt: 'Ambiente real do Advanced Studio com aparelhos de pilates' },
  { src: '/images/movimento-real.webp', title: 'Corpo em movimento', type: 'Movimento', alt: 'Prática de Pilates em aparelho, com alongamento de perna' },
  { src: '/images/pilates-aparelhos.webp', title: 'Atenção em cada movimento', type: 'Prática', alt: 'Pessoa praticando Pilates em aparelho de madeira' },
  { src: '/images/pilates-suspenso.webp', title: 'Movimento e controle', type: 'Prática', alt: 'Exercício de Pilates em equipamento suspenso' },
]

export const faqs = [
  {
    question: 'Nunca fiz Pilates. Posso conhecer o estúdio?',
    answer: 'Claro! Você pode conversar com a equipe e solicitar informações sobre a aula experimental e a proposta do estúdio antes de começar.',
  },
  {
    question: 'Como funciona a aula experimental?',
    answer: 'O primeiro passo é enviar sua preferência pelo WhatsApp. A equipe explica a experiência e confirma a disponibilidade de horários.',
  },
  {
    question: 'Como descubro os horários disponíveis?',
    answer: 'Os horários e as vagas são informados diretamente pelo estúdio. O site não apresenta uma agenda em tempo real.',
  },
  {
    question: 'Há atendimento aos sábados?',
    answer: 'O estúdio já divulgou atendimento aos sábados. Consulte pelo WhatsApp a programação e as vagas atuais.',
  },
  {
    question: 'Onde fica o Advanced Studio?',
    answer: 'Na Rua José dos Reis, 719, sala 01, Vila Prudente, São Paulo. Você pode abrir a rota diretamente no Google Maps na seção de localização.',
  },
]

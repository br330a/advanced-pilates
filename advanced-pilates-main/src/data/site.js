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
  mapQuery: 'Rua José dos Reis, 719, sala 01, Vila Prudente, São Paulo, SP, 03139-040',
}

export const whatsappURL = (message) =>
  `https://wa.me/55${studio.phone}?text=${encodeURIComponent(message)}`

export const highlights = [
  { icon: 'user', title: 'Atendimento próximo', description: 'Contato direto para tirar dúvidas e entender qual caminho faz mais sentido para você.' },
  { icon: 'layers', title: 'Estrutura equipada', description: 'Aparelhos de Pilates em um espaço organizado, iluminado e pensado para receber bem.' },
  { icon: 'sun', title: 'Ambiente acolhedor', description: 'Uma presença visual mais calma, moderna e confortável para diferentes idades.' },
  { icon: 'message', title: 'Contato simples', description: 'WhatsApp e Instagram sempre à mão para facilitar o primeiro passo.' },
]

export const services = [
  {
    number: '01',
    slug: 'pilates',
    label: 'Pilates com aparelhos',
    icon: 'activity',
    description: 'Prática com foco em mobilidade, consciência corporal, força e controle do movimento.',
    points: ['Estrutura com aparelhos específicos', 'Boa opção para quem está começando ou retomando', 'Contato direto para entender a melhor proposta'],
  },
  {
    number: '02',
    slug: 'fisioterapia',
    label: 'Fisioterapia',
    icon: 'heart',
    description: 'O estúdio também comunica atendimento em fisioterapia, com informações alinhadas diretamente com a equipe.',
    points: ['Atendimento de acordo com a necessidade de cada pessoa', 'Disponibilidade confirmada pelo contato direto', 'Integração natural com a proposta do estúdio'],
  },
  {
    number: '03',
    slug: 'experimental',
    label: 'Aula experimental',
    icon: 'calendar',
    description: 'Uma forma leve de conhecer o espaço, tirar dúvidas e entender como começar.',
    points: ['Solicitação rápida pelo WhatsApp', 'Você informa o melhor período para atendimento', 'Horários e vagas são confirmados pela equipe'],
  },
]

export const showcase = [
  {
    src: '/images/studio-room.webp',
    title: 'Espaço do estúdio',
    text: 'Uma visão do ambiente, dos aparelhos e da circulação com luz natural.',
    accent: 'Espaço',
    imageClass: 'showcase-landscape',
  },
  {
    src: '/images/movement-ring-clean.webp',
    title: 'Movimento com apoio do aparelho',
    text: 'Uma cena de prática real, com postura bem definida e enquadramento mais limpo.',
    accent: 'Movimento',
    imageClass: 'showcase-portrait',
  },
  {
    src: '/images/suspension-subject.webp',
    title: 'Controle, força e mobilidade',
    text: 'Outra imagem de movimento para reforçar a proposta corporal do estúdio.',
    accent: 'Postura',
    imageClass: 'showcase-landscape',
  },
  {
    src: '/images/front-sign-clean.webp',
    title: 'Marca e reconhecimento do local',
    text: 'A identidade do Advanced também aparece como apoio visual da experiência.',
    accent: 'Identidade',
    imageClass: 'showcase-landscape',
  },
]

export const faqs = [
  {
    question: 'Nunca fiz Pilates. Posso conhecer o estúdio?',
    answer: 'Sim. O site foi pensado justamente para facilitar esse primeiro contato e apresentar melhor o ambiente antes da conversa.',
  },
  {
    question: 'Como funciona a aula experimental?',
    answer: 'Você envia uma mensagem pelo WhatsApp com seu nome e seu período de preferência. O estúdio responde com as orientações e a disponibilidade.',
  },
  {
    question: 'Os horários aparecem no site?',
    answer: 'Não. O site serve como apresentação e canal de contato. A confirmação de horários e vagas é feita pela equipe do estúdio.',
  },
  {
    question: 'O estúdio atende aos sábados?',
    answer: 'O material divulgado pelo Advanced já mencionou atendimento aos sábados. Ainda assim, o ideal é confirmar a agenda atual pelo WhatsApp.',
  },
  {
    question: 'Onde fica o Advanced Studio?',
    answer: 'Na Rua José dos Reis, 719, sala 01, Vila Prudente, em São Paulo. A seção de localização já traz o Google Maps incorporado.',
  },
]

export const studio = {
  name: 'Advanced Studio',
  descriptor: 'Pilates & Fisioterapia',
  phone: '11976030603',
  phoneLabel: '(11) 97603-0603',
  address: 'Rua José dos Reis, 719, sala 01',
  neighborhood: 'Vila Prudente, São Paulo — SP',
  postalCode: '03139-040',
  instagram: 'https://www.instagram.com/studiopilatesadvanced/',
  mapQuery: 'Rua José dos Reis, 719, sala 01, Vila Prudente, São Paulo, SP, 03139-040',
}

export const whatsappURL = (message) =>
  `https://wa.me/55${studio.phone}?text=${encodeURIComponent(message)}`

export const highlights = [
  { icon: 'user', title: 'Atendimento próximo', description: 'Contato direto para tirar dúvidas e entender a melhor forma de começar.' },
  { icon: 'layers', title: 'Estrutura equipada', description: 'Aparelhos de Pilates em um espaço organizado, iluminado e bem cuidado.' },
  { icon: 'sun', title: 'Ambiente acolhedor', description: 'Luz natural, conforto e uma proposta leve para diferentes idades.' },
  { icon: 'message', title: 'WhatsApp fácil', description: 'A aula experimental pode começar com uma conversa simples e rápida.' },
]

export const services = [
  {
    number: '01',
    slug: 'pilates',
    label: 'Pilates com aparelhos',
    icon: 'activity',
    description: 'Prática com foco em mobilidade, consciência corporal, força e controle do movimento.',
    points: ['Aparelhos específicos para a prática', 'Boa opção para quem está começando ou retomando', 'Contato direto para entender o melhor caminho'],
  },
  {
    number: '02',
    slug: 'fisioterapia',
    label: 'Fisioterapia',
    icon: 'heart',
    description: 'O estúdio também comunica atendimento em fisioterapia, com informações e disponibilidade confirmadas pela equipe.',
    points: ['Atendimento alinhado à necessidade de cada pessoa', 'Informações e disponibilidade pelo WhatsApp', 'Conversa direta com a equipe do estúdio'],
  },
  {
    number: '03',
    slug: 'experimental',
    label: 'Aula experimental',
    icon: 'calendar',
    description: 'Um primeiro contato para conhecer a proposta, o espaço e tirar suas dúvidas antes de começar.',
    points: ['Solicitação rápida pelo WhatsApp', 'Você informa seu período de preferência', 'Horários sujeitos à confirmação do estúdio'],
  },
]

export const showcase = [
  {
    src: '/images/movement-ring.webp',
    title: 'Prática guiada e postura em evidência',
    text: 'Uma imagem mais limpa para mostrar o trabalho corporal e o clima acolhedor do estúdio.',
    accent: 'Movimento',
    span: 'large',
  },
  {
    src: '/images/studio-room.webp',
    title: 'Espaço do estúdio',
    text: 'Uma visão do ambiente com aparelhos, circulação e luz natural.',
    accent: 'Espaço',
    span: 'small',
  },
  {
    src: '/images/front-sign.webp',
    title: 'Marca e localização',
    text: 'A fachada reforça a identidade e facilita o reconhecimento do local.',
    accent: 'Marca',
    span: 'small',
  },
]

export const faqs = [
  {
    question: 'Nunca fiz Pilates. Posso conhecer o estúdio?',
    answer: 'Claro. A proposta do site é justamente facilitar esse primeiro contato. Você pode solicitar informações e conhecer a aula experimental.',
  },
  {
    question: 'Como funciona a aula experimental?',
    answer: 'Você envia uma mensagem pelo WhatsApp com seu nome e seu período de preferência. O estúdio responde com orientações e disponibilidade.',
  },
  {
    question: 'Os horários aparecem no site?',
    answer: 'Não. O site direciona o contato, mas a confirmação de horários e vagas é feita diretamente com a equipe.',
  },
  {
    question: 'O estúdio atende aos sábados?',
    answer: 'O material divulgado pelo Advanced já comunicou atendimento aos sábados. Vale confirmar a programação atual pelo WhatsApp.',
  },
  {
    question: 'Onde fica o Advanced Studio?',
    answer: 'Na Rua José dos Reis, 719, sala 01, Vila Prudente, em São Paulo. O mapa está na seção de localização.',
  },
]

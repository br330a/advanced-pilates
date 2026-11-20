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
  { icon: 'layers', title: 'Estrutura equipada', description: 'Aparelhos de Pilates em um espaço organizado e bem cuidado.' },
  { icon: 'sun', title: 'Ambiente acolhedor', description: 'Luz natural, conforto e uma proposta leve para diferentes idades.' },
  { icon: 'message', title: 'WhatsApp fácil', description: 'A aula experimental pode começar com uma conversa simples e rápida.' },
]

export const services = [
  {
    number: '01',
    slug: 'pilates',
    label: 'Pilates com aparelhos',
    icon: 'activity',
    description: 'Prática com foco em controle, mobilidade, força e consciência corporal.',
    points: ['Aparelhos específicos para a prática', 'Ideal para iniciar ou evoluir com acompanhamento', 'Atendimento confirmado diretamente com o estúdio'],
  },
  {
    number: '02',
    slug: 'fisioterapia',
    label: 'Fisioterapia',
    icon: 'heart',
    description: 'O estúdio também comunica atendimento em fisioterapia. A equipe informa disponibilidade e formato.',
    points: ['Orientação alinhada à necessidade de cada pessoa', 'Informações e disponibilidade por WhatsApp', 'Confirmação direta com a equipe'],
  },
  {
    number: '03',
    slug: 'experimental',
    label: 'Aula experimental',
    icon: 'calendar',
    description: 'Um primeiro contato para conhecer a proposta, o espaço e tirar suas dúvidas antes de começar.',
    points: ['Solicitação rápida pelo WhatsApp', 'Período de preferência informado por você', 'Horários sujeitos à confirmação do estúdio'],
  },
]

export const showcase = [
  {
    src: '/images/hero-real.webp',
    title: 'Prática com foco no movimento',
    text: 'Uma imagem real do espaço em uso, com equipamentos de Pilates e postura em destaque.',
    accent: 'Movimento',
    span: 'large',
  },
  {
    src: '/images/studio-signage.webp',
    title: 'Identidade e localização',
    text: 'A marca e o endereço ajudam a reforçar o reconhecimento do estúdio.',
    accent: 'Marca',
    span: 'small',
  },
  {
    src: '/images/studio-interior-clean.webp',
    title: 'Ambiente do estúdio',
    text: 'Uma visão do espaço com aparelhos, circulação livre e luz natural.',
    accent: 'Espaço',
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
    answer: 'Não. O site direciona o contato, mas a confirmação de horários e vagas é feita diretamente com a equipe do estúdio.',
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
